import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json({ limit: "25mb" }));

app.use((req, res, next) => {
  console.log(`[API REQUEST] ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(`[API RESPONSE] ${req.method} ${req.url} -> ${res.statusCode}`);
  });
  next();
});

// ---------------------------------------------------------
// MONGOOSE SCHEMAS & MODELS
// ---------------------------------------------------------

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  avatar: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() }
});
const _UserModel = mongoose.model("User", UserSchema);

const ResumeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadedAt: { type: String, default: () => new Date().toISOString() },
  parsedData: {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    skills: [{ type: String }],
    education: [{ degree: String, institution: String, year: String }],
    experience: [{ role: String, company: String, duration: String, description: String }],
    certifications: [{ type: String }],
    projects: [{ title: String, tech: [String], description: String }],
    links: { linkedin: String, github: String, portfolio: String }
  },
  atsReport: {
    score: { type: Number, default: 0 },
    structureScore: { type: Number, default: 0 },
    formattingScore: { type: Number, default: 0 },
    keywordDensity: { type: Number, default: 0 },
    skillsMatch: { type: Number, default: 0 },
    grammarScore: { type: Number, default: 0 },
    readabilityScore: { type: Number, default: 0 },
    gradeCategory: { type: String, default: "Needs Improvement" },
    missingSkills: [{ type: String }],
    missingKeywords: [{ type: String }],
    improvementRoadmap: [{ type: String }],
    suggestedRewrites: [{ Section: String, Before: String, After: String }]
  }
});
const _ResumeModel = mongoose.model("Resume", ResumeSchema);

const ChatMessageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  role: { type: String, enum: ["user", "model"], required: true },
  message: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toISOString() }
});
const _ChatMessageModel = mongoose.model("ChatMessage", ChatMessageSchema);

const SavedJobSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  salary: { type: String },
  matchScore: { type: Number },
  type: { type: String },
  link: { type: String }
});
const _SavedJobModel = mongoose.model("SavedJob", SavedJobSchema);

const CoverLetterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  generatedAt: { type: String, default: () => new Date().toISOString() }
});
const _CoverLetterModel = mongoose.model("CoverLetter", CoverLetterSchema);

const InterviewPrepSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  role: { type: String, required: true },
  questions: [{
    id: String,
    category: String,
    question: String,
    sampleAnswer: String,
    userAnswer: String,
    evalScore: Number,
    evalFeedback: String
  }],
  timestamp: { type: String, default: () => new Date().toISOString() }
});
const _InterviewPrepModel = mongoose.model("InterviewPrep", InterviewPrepSchema);

const SkillGapReportSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  targetRole: { type: String, required: true },
  currentSkills: [{ type: String }],
  missingSkills: [{ type: String }],
  roadmap: {
    plan30Days: [{ type: String }],
    plan60Days: [{ type: String }],
    plan90Days: [{ type: String }],
    learningResources: [{ name: String, url: String, type: String }]
  },
  createdAt: { type: String, default: () => new Date().toISOString() }
});
const _SkillGapReportModel = mongoose.model("SkillGapReport", SkillGapReportSchema);

// ---------------------------------------------------------
// LOCAL FILE DATABASE FALLBACK SYSTEM
// ---------------------------------------------------------
import * as fsLib from "fs";

let useLocalDB = false;
const LOCAL_DB_PATH = path.join(process.cwd(), "db.json");
let localDBData: DatabaseSchema = {
  users: [],
  resumes: [],
  chats: [],
  jobs: [],
  coverLetters: [],
  interviews: [],
  skillGaps: []
};

function loadLocalDB() {
  if (fsLib.existsSync(LOCAL_DB_PATH)) {
    try {
      localDBData = JSON.parse(fsLib.readFileSync(LOCAL_DB_PATH, "utf8"));
      console.log("✓ Loaded local database from db.json");
      return;
    } catch (e) {
      console.error("Error parsing db.json, re-initializing:", e);
    }
  }
  localDBData = getSeededDB();
  saveLocalDB();
  console.log("✓ Initialized local database with seed data");
}

function saveLocalDB() {
  try {
    fsLib.writeFileSync(LOCAL_DB_PATH, JSON.stringify(localDBData, null, 2), "utf8");
  } catch (e) {
    console.error("Error saving local database:", e);
  }
}

function getNestedValue(obj: any, pathStr: string) {
  return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function matchQuery(item: any, query: any): boolean {
  if (!query) return true;
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      let val = query[key];
      const itemVal = getNestedValue(item, key);
      if (val && typeof val === "object" && !Array.isArray(val) && !(val instanceof RegExp)) {
        if ("$in" in val) {
          const arr = val.$in;
          if (Array.isArray(arr)) {
            if (Array.isArray(itemVal)) {
              if (!itemVal.some(v => arr.includes(v))) return false;
            } else {
              if (!arr.includes(itemVal)) return false;
            }
          }
        } else if ("$gt" in val) {
          if (!(itemVal > val.$gt)) return false;
        } else if ("$lt" in val) {
          if (!(itemVal < val.$lt)) return false;
        } else if ("$gte" in val) {
          if (!(itemVal >= val.$gte)) return false;
        } else if ("$lte" in val) {
          if (!(itemVal <= val.$lte)) return false;
        }
      } else {
        if (itemVal !== val) return false;
      }
    }
  }
  return true;
}

function createModelWrapper<T>(mongoModel: any, collectionKey: keyof DatabaseSchema) {
  return {
    async find(query: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        return items.filter(item => matchQuery(item, query));
      }
      return await mongoModel.find(query);
    },

    async findOne(query: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        return items.find(item => matchQuery(item, query)) || null;
      }
      return await mongoModel.findOne(query);
    },

    async create(doc: any) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        if (Array.isArray(doc)) {
          items.push(...doc);
        } else {
          items.push(doc);
        }
        saveLocalDB();
        return doc;
      }
      return await mongoModel.create(doc);
    },

    async deleteOne(query: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        const idx = items.findIndex(item => matchQuery(item, query));
        if (idx !== -1) {
          items.splice(idx, 1);
          saveLocalDB();
          return { deletedCount: 1 };
        }
        return { deletedCount: 0 };
      }
      return await mongoModel.deleteOne(query);
    },

    async deleteMany(query: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        const initialLen = items.length;
        const remaining = items.filter(item => !matchQuery(item, query));
        localDBData[collectionKey] = remaining as any;
        saveLocalDB();
        return { deletedCount: initialLen - remaining.length };
      }
      return await mongoModel.deleteMany(query);
    },

    async countDocuments(query: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        return items.filter(item => matchQuery(item, query)).length;
      }
      return await mongoModel.countDocuments(query);
    },

    async updateOne(query: any, update: any) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        const item = items.find(item => matchQuery(item, query));
        if (item) {
          const setFields = update.$set || update;
          Object.assign(item, setFields);
          saveLocalDB();
          return { modifiedCount: 1 };
        }
        return { modifiedCount: 0 };
      }
      return await mongoModel.updateOne(query, update);
    },

    async findByIdAndUpdate(id: string, update: any, options: any = {}) {
      if (useLocalDB) {
        let items = localDBData[collectionKey] as any[];
        const item = items.find(item => item.id === id || item._id === id);
        if (item) {
          const setFields = update.$set || update;
          Object.assign(item, setFields);
          saveLocalDB();
          return item;
        }
        return null;
      }
      return await mongoModel.findByIdAndUpdate(id, update, options);
    }
  };
}

const UserModel = createModelWrapper(_UserModel, "users");
const ResumeModel = createModelWrapper(_ResumeModel, "resumes");
const ChatMessageModel = createModelWrapper(_ChatMessageModel, "chats");
const SavedJobModel = createModelWrapper(_SavedJobModel, "jobs");
const CoverLetterModel = createModelWrapper(_CoverLetterModel, "coverLetters");
const InterviewPrepModel = createModelWrapper(_InterviewPrepModel, "interviews");
const SkillGapReportModel = createModelWrapper(_SkillGapReportModel, "skillGaps");

// ---------------------------------------------------------
// DATABASE & SESSION ENGINE (TypeScript Interfaces)
// ---------------------------------------------------------

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
}

interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  parsedData: {
    fullName: string;
    email: string;
    phone: string;
    skills: string[];
    education: { degree: string; institution: string; year: string }[];
    experience: { role: string; company: string; duration: string; description: string }[];
    certifications: string[];
    projects: { title: string; tech: string[]; description: string }[];
    links: { linkedin?: string; github?: string; portfolio?: string };
  };
  atsReport: {
    score: number;
    structureScore: number;
    formattingScore: number;
    keywordDensity: number;
    skillsMatch: number;
    grammarScore: number;
    readabilityScore: number;
    gradeCategory: string;
    missingSkills: string[];
    missingKeywords: string[];
    improvementRoadmap: string[];
    suggestedRewrites: { Section: string; Before: string; After: string }[];
  };
}

interface ChatMessage {
  id: string;
  userId: string;
  role: "user" | "model";
  message: string;
  timestamp: string;
}

interface SavedJob {
  id: string;
  userId: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  type: string;
  link: string;
}

interface CoverLetter {
  id: string;
  userId: string;
  title: string;
  content: string;
  generatedAt: string;
}

interface InterviewPrep {
  id: string;
  userId: string;
  role: string;
  questions: {
    id: string;
    category: "HR" | "Technical" | "Project" | "Coding" | "Behavioral";
    question: string;
    sampleAnswer: string;
    userAnswer?: string;
    evalScore?: number;
    evalFeedback?: string;
  }[];
  timestamp: string;
}

interface SkillGapReport {
  id: string;
  userId: string;
  targetRole: string;
  currentSkills: string[];
  missingSkills: string[];
  roadmap: {
    plan30Days: string[];
    plan60Days: string[];
    plan90Days: string[];
    learningResources: { name: string; url: string; type: string }[];
  };
  createdAt: string;
}

interface DatabaseSchema {
  users: User[];
  resumes: Resume[];
  chats: ChatMessage[];
  jobs: SavedJob[];
  coverLetters: CoverLetter[];
  interviews: InterviewPrep[];
  skillGaps: SkillGapReport[];
}

// Seed database with highly realistic candidates
function getSeededDB(): DatabaseSchema {
  const seedUsers: User[] = [
    {
      id: "seed-user-1",
      name: "Alex Rivera",
      email: "alex.rivera@techflow.io",
      passwordHash: "seed",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "seed-user-2",
      name: "Siddharth Mehta",
      email: "sid.mehta@devspace.com",
      passwordHash: "seed",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "seed-user-3",
      name: "Elena Rostova",
      email: "elena.r@analytics.org",
      passwordHash: "seed",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const seedResumes: Resume[] = [
    {
      id: "seed-resume-1",
      userId: "seed-user-1",
      fileName: "Alex_Rivera_FullStack.pdf",
      fileType: "application/pdf",
      uploadedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      parsedData: {
        fullName: "Alex Rivera",
        email: "alex.rivera@techflow.io",
        phone: "+1 (555) 019-2834",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "TypeScript", "PostgreSQL", "Docker", "Git"],
        education: [{ degree: "B.S. Computer Science", institution: "Stanford University", year: "2022" }],
        experience: [
          {
            role: "Software Engineer",
            company: "Stripe",
            duration: "2022 - Present",
            description: "Developed secure transactional pipelines and integrated interactive checkout boards using TypeScript."
          }
        ],
        certifications: ["AWS Certified Developer"],
        projects: [
          {
            title: "TaskPulse Portal",
            tech: ["React", "Tailwind", "Node.js"],
            description: "Built collaborative project board scaling to secondary container groups easily."
          }
        ],
        links: { linkedin: "linkedin.com/in/alex-rivera", github: "github.com/alexrivera" }
      },
      atsReport: {
        score: 92,
        structureScore: 95,
        formattingScore: 90,
        keywordDensity: 88,
        skillsMatch: 92,
        grammarScore: 94,
        readabilityScore: 92,
        gradeCategory: "Excellent",
        missingSkills: ["Kubernetes", "GraphQL", "MongoDB"],
        missingKeywords: ["Agile Methodology", "Resource Throttling", "High-Availability"],
        improvementRoadmap: [
          "Include quantitative achievements for experience metrics",
          "Structure header fields vertically for faster parsed categorization"
        ],
        suggestedRewrites: [
          {
            Section: "Summary",
            Before: "Enthusiastic React developer looking to write full-stack code.",
            After: "Results-driven Full Stack Engineer with robust competency in high-availability React architectures and Express microservices. Proven capacity to scale transaction workflows."
          }
        ]
      }
    },
    {
      id: "seed-resume-2",
      userId: "seed-user-2",
      fileName: "Sid_Mehta_DataAnalyst.pdf",
      fileType: "application/pdf",
      uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      parsedData: {
        fullName: "Siddharth Mehta",
        email: "sid.mehta@devspace.com",
        phone: "+91 98765 43210",
        skills: ["Python", "SQL", "Tableau", "PowerBI", "Pandas", "Excel", "A/B Testing", "Machine Learning"],
        education: [{ degree: "B.Tech Information Technology", institution: "IIT Bombay", year: "2021" }],
        experience: [
          {
            role: "Data Analyst",
            company: "Flipkart",
            duration: "2021 - 2023",
            description: "Automated business intelligence trends and developed high-fidelity radar displays for operational managers."
          }
        ],
        certifications: ["Google Data Analytics Professional"],
        projects: [
          {
            title: "Retail Analytics Pipeline",
            tech: ["Python", "PostgreSQL", "Tableau"],
            description: "Built predictive insights dashboard on seasonal buying patterns increasing customer engagement."
          }
        ],
        links: { linkedin: "linkedin.com/in/sidmehta", github: "github.com/sidm-data" }
      },
      atsReport: {
        score: 84,
        structureScore: 85,
        formattingScore: 80,
        keywordDensity: 82,
        skillsMatch: 86,
        grammarScore: 88,
        readabilityScore: 82,
        gradeCategory: "Strong",
        missingSkills: ["Spark", "Hadoop", "Scala"],
        missingKeywords: ["Data Governance", "Predictive Analytics", "Statistically Significant"],
        improvementRoadmap: [
          "Separate tech stacked labels cleanly using bullet parameters",
          "Ensure bullet points start with strong action-verbs instead of descriptive nouns"
        ],
        suggestedRewrites: [
          {
            Section: "Experience",
            Before: "Was responsible for pulling records and making powerpoint slides.",
            After: "Optimized relational query schedules in PostgreSQL and engineered Tableau display metrics to streamline quarterly pipeline calculations."
          }
        ]
      }
    },
    {
      id: "seed-resume-3",
      userId: "seed-user-3",
      fileName: "Elena_R_MobileDev.pdf",
      fileType: "application/pdf",
      uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      parsedData: {
        fullName: "Elena Rostova",
        email: "elena.r@analytics.org",
        phone: "+7 999 432-11-22",
        skills: ["Kotlin", "Swift", "SwiftUI", "Flutter", "Objective-C", "Android SDK", "iOS Development", "Firebase"],
        education: [{ degree: "M.S. Software Engineering", institution: "Moscow State University", year: "2020" }],
        experience: [
          {
            role: "Mobile Engineer",
            company: "Yandex",
            duration: "2020 - Present",
            description: "Engineered ultra-optimized audio capture pipelines and offline-first mobile synchronization."
          }
        ],
        certifications: ["Associate Android Developer"],
        projects: [
          {
            title: "Bento Tracker App",
            tech: ["Kotlin", "Firebase", "Motion"],
            description: "Developed modular nutrition dashboard logging calorie metadata sequentially in standard mobile schemas."
          }
        ],
        links: { linkedin: "linkedin.com/in/elenarostova", github: "github.com/elena-codes" }
      },
      atsReport: {
        score: 76,
        structureScore: 78,
        formattingScore: 72,
        keywordDensity: 75,
        skillsMatch: 78,
        grammarScore: 80,
        readabilityScore: 75,
        gradeCategory: "Good",
        missingSkills: ["Fastlane", "CI/CD", "GraphQL"],
        missingKeywords: ["App Store Deployment", "Unit Testing", "Memory Leak Prevention"],
        improvementRoadmap: [
          "Provide distinct visual layouts with standard font tracking to excel on scanner parsers",
          "Mention continuous integration workflows to strengthen operational authority"
        ],
        suggestedRewrites: [
          {
            Section: "Summary",
            Before: "Mobile app lover who writes Kotlin and SwiftUI codes.",
            After: "Aesthetic Mobile Core Engineer with five years of production exposure delivering low-profile Swift and modular Android SDK modules."
          }
        ]
      }
    }
  ];

  return {
    users: seedUsers,
    resumes: seedResumes,
    chats: [],
    jobs: [
      {
        id: "seed-job-1",
        userId: "seed-user-1",
        title: "Senior React Engineer",
        company: "Vercel",
        location: "San Francisco, CA (Remote)",
        salary: "$140,000 - $180,000",
        matchScore: 94,
        type: "Remote",
        link: "https://linkedin.com/company/vercel/jobs"
      },
      {
        id: "seed-job-2",
        userId: "seed-user-1",
        title: "Full Stack Engineer",
        company: "Linear",
        location: "New York, NY (Hybrid)",
        salary: "$120,000 - $160,000",
        matchScore: 88,
        type: "Hybrid",
        link: "https://linkedin.com/company/linear/jobs"
      },
      {
        id: "seed-job-3",
        userId: "seed-user-2",
        title: "Lead Data Scientist",
        company: "Notion",
        location: "Remote",
        salary: "$150,000 - $190,000",
        matchScore: 91,
        type: "Remote",
        link: "https://linkedin.com/company/notion/jobs"
      }
    ],
    coverLetters: [],
    interviews: [],
    skillGaps: []
  };
}

async function seedDatabaseIfEmpty() {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log("No users found in MongoDB. Seeding database with default candidates...");
      const seed = getSeededDB();
      
      for (const u of seed.users) {
        await UserModel.create(u);
      }
      for (const r of seed.resumes) {
        await ResumeModel.create(r);
      }
      for (const j of seed.jobs) {
        await SavedJobModel.create(j);
      }
      console.log("Database seeded successfully!");
    } else {
      console.log("MongoDB database contains existing records. Skipping seeding.");
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

// ---------------------------------------------------------
// INITIALIZE GEMINI API SERVER-SIDE (with Telemetry User-Agent)
// ---------------------------------------------------------
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Successfully initialized Gemini SDK server-side with process.env.GEMINI_API_KEY");
  } catch (err) {
    console.error("Error setting up Gemini Client", err);
  }
} else {
  console.log("No custom GEMINI_API_KEY detected. Standing by on intelligent analytical heuristics.");
}

async function queryGemini(prompt: string, systemInstruction?: string, isJson = false): Promise<string> {
  if (!ai) {
    return "";
  }
  try {
    const config: any = {};
    if (systemInstruction) config.systemInstruction = systemInstruction;
    if (isJson) {
      config.responseMimeType = "application/json";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: config
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini prompt error, using heuristics: ", error);
    return "";
  }
}

// ---------------------------------------------------------
// COMPREHENSIVE SERVER ROUTING
// ---------------------------------------------------------

function getUserIdFromHeaders(req: express.Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.replace("Bearer ", "").trim();
  return token || null;
}

// --- USER AUTHENTICATION ENDPOINTS ---
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required fields." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered. Please login instead." });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash: password,
      isVerified: false,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    };

    await UserModel.create(newUser);

    return res.json({
      message: "Registration successful! A mock verification email was dispatched. Please review status.",
      user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, isVerified: false }
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Mail coordinate and security credentials are required." });
  }

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: "Invalid email or credentials. Please verify data." });
    }

    return res.json({
      message: "Authentication successful.",
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, isVerified: user.isVerified },
      token: user.id
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/auth/verify-email", async (req, res) => {
  const userId = getUserIdFromHeaders(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized active session." });

  try {
    const user = await UserModel.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: "Candidate not located." });

    user.isVerified = true;
    await user.save();

    return res.json({ message: "SaaS email coordinate verified successfully!", user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, isVerified: user.isVerified } });
  } catch (err) {
    console.error("Verify email error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email coordinate required." });

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "No profile matching that email could be found." });
    }

    return res.json({
      message: "A password restructural key has been generated and dispatched to your simulated inbox! Verify prompt inside settings."
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing required fields." });

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "Candidate not found." });

    user.passwordHash = password;
    await user.save();
    return res.json({ message: "Security parameters successfully reset. Log in with your new password." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- PROFILE & SETTINGS ---
app.get("/api/profile", async (req, res) => {
  const userId = getUserIdFromHeaders(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized session." });

  try {
    const user = await UserModel.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: "Profile not found." });

    const userResumes = await ResumeModel.find({ userId: userId });
    const userChats = await ChatMessageModel.find({ userId: userId });
    const userJobs = await SavedJobModel.find({ userId: userId });
    const userCoverLetters = await CoverLetterModel.find({ userId: userId });
    const userInterviews = await InterviewPrepModel.find({ userId: userId });
    const userSkillGaps = await SkillGapReportModel.find({ userId: userId });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, isVerified: user.isVerified, avatar: user.avatar, createdAt: user.createdAt },
      statistics: {
        totalResumes: userResumes.length,
        averageAts: userResumes.length ? Math.round(userResumes.reduce((acc, cr) => acc + (cr.atsReport?.score || 0), 0) / userResumes.length) : 0,
        totalInterviews: userInterviews.length,
        savedJobs: userJobs.length,
        chatThreads: userChats.length
      },
      resumes: userResumes,
      jobs: userJobs,
      coverLetters: userCoverLetters,
      interviews: userInterviews,
      skillGaps: userSkillGaps
    });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/profile/update", async (req, res) => {
  const userId = getUserIdFromHeaders(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized access." });

  const { name, email, avatar } = req.body;
  try {
    const user = await UserModel.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: "Candidate profile not found." });

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (avatar) user.avatar = avatar;

    await user.save();
    return res.json({ message: "Enterprise profile parameters updated successfully.", user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, isVerified: user.isVerified } });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- RESUME UPLOAD AND PARSING ENGINE + ADVANCED ATS SCORING ENGINE ---
app.post("/api/resumes/upload", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { fileName, fileType, textContent } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "Critical file details (fileName, fileType) missing." });
  }

  const rawText = textContent || `Resume: ${fileName}
  Contact: contact@example.com, +1-555-467-3321
  Experience: Lead Developer at Netflix, Software Intern at Slack.
  Skills: JavaScript, Node.js, React, HTML, CSS, TypeScript.`;

  let parsedName = "Unknown Candidate";
  let parsedEmail = "contact@agency.com";
  let parsedPhone = "+1 (555) 000-0000";
  let parsedSkills = ["HTML", "CSS", "JavaScript", "React"];
  let parsedEducation = [{ degree: "B.S. in Computer Science", institution: "Tech State University", year: "2023" }];
  let parsedExperience = [{ role: "Junior Developer", company: "Local Agency", duration: "1 Year", description: "Maintained React features and styling." }];
  let parsedCertifications = ["FreeCodeCamp Javascript Certificate"];
  let parsedProjects = [{ title: "My Portfolio", tech: ["HTML", "CSS"], description: "Simple SaaS visual landing layout details." }];
  let parsedLinks = { linkedin: "", github: "", portfolio: "" };

  let atsScore = 65;
  let scoreStructure = 70;
  let scoreFormatting = 65;
  let scoreKeywords = 60;
  let scoreSkills = 65;
  let scoreGrammar = 75;
  let scoreReadability = 70;
  let missingSkills = ["GraphQL", "Docker", "MongoDB"];
  let missingKeywords = ["Cloud Deployments", "API Lifecycle", "Secure Hashing"];
  let improvements = [
    "Increase descriptions for structural bullet parameters.",
    "Formulate high-profile objective statements pointing directly to software roles."
  ];
  let recommendations = [
    { Section: "Experience Description", Before: "Did programming daily and debugged.", After: "Synthesized responsive client widgets utilizing React Hooks and optimized daily container cold-starts." }
  ];

  if (ai) {
    const geminiPrompt = `
      You are an expert Enterprise Applicant Tracking System (ATS) Parser and Career Coach. 
      Analyze the following raw text representation of an uploaded resume:
      ---
      ${rawText}
      ---
      
      Generate a precise, structured JSON containing:
      - Raw details (fullName, email, phone, skills (array), education (array with degree, institution, year), experience (array with role, company, duration, description), certifications (array), projects (array with title, tech (array), description), links (object with linkedin, github, portfolio)).
      - Complete ATS evaluations:
        * score (0 to 100)
        * structureScore (0 to 100)
        * formattingScore (0 to 100)
        * keywordDensity (0 to 100)
        * skillsMatch (0 to 100)
        * grammarScore (0 to 100)
        * readabilityScore (0 to 100)
        * missingSkills (array of standard computer/tech skills not found in resume but highly requested)
        * missingKeywords (array of enterprise workflow terminology)
        * improvementRoadmap (array of 3 distinct actionable items)
        * suggestedRewrites (array of objects with { Section, Before, After })
        
      Rules:
      - Respond ONLY with valid, raw JSON. Do not include markdown wraps (like \`\`\`json).
      - Ensure all fields are filled with appropriate parsed values. If data is missing in the uploaded text, infer or recommend standard career metrics suited for a software/tech applicant.
    `;

    try {
      const gOutput = await queryGemini(geminiPrompt, "You are a professional ATS scanner. Respond only in raw JSON framework format mapping exactly the schema proposed.");
      const cleaned = gOutput.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed) {
        parsedName = parsed.fullName || parsedName;
        parsedEmail = parsed.email || parsedEmail;
        parsedPhone = parsed.phone || parsedPhone;
        parsedSkills = parsed.skills || parsedSkills;
        parsedEducation = parsed.education || parsedEducation;
        parsedExperience = parsed.experience || parsedExperience;
        parsedCertifications = parsed.certifications || parsedCertifications;
        parsedProjects = parsed.projects || parsedProjects;
        parsedLinks = parsed.links || parsedLinks;

        atsScore = typeof parsed.score === "number" ? parsed.score : atsScore;
        scoreStructure = typeof parsed.structureScore === "number" ? parsed.structureScore : scoreStructure;
        scoreFormatting = typeof parsed.formattingScore === "number" ? parsed.formattingScore : scoreFormatting;
        scoreKeywords = typeof parsed.keywordDensity === "number" ? parsed.keywordDensity : scoreKeywords;
        scoreSkills = typeof parsed.skillsMatch === "number" ? parsed.skillsMatch : scoreSkills;
        scoreGrammar = typeof parsed.grammarScore === "number" ? parsed.grammarScore : scoreGrammar;
        scoreReadability = typeof parsed.readabilityScore === "number" ? parsed.readabilityScore : scoreReadability;
        missingSkills = parsed.missingSkills || missingSkills;
        missingKeywords = parsed.missingKeywords || missingKeywords;
        improvements = parsed.improvementRoadmap || improvements;
        recommendations = parsed.suggestedRewrites || recommendations;
      }
    } catch (err) {
      console.error("Gemini failed to parse resume details. Falling back to heuristic parse evaluation.", err);
      if (rawText.toLowerCase().includes("react")) parsedSkills.push("React", "Tailwind");
      if (rawText.toLowerCase().includes("node")) parsedSkills.push("Node.js", "Express");
      if (rawText.toLowerCase().includes("python")) parsedSkills.push("Python", "NLP");
    }
  } else {
    if (rawText.toLowerCase().includes("react")) parsedSkills.push("React", "Tailwind CSS", "Redux");
    if (rawText.toLowerCase().includes("python")) parsedSkills.push("Python", "Pandas", "Scikit-Learn");
    if (rawText.toLowerCase().includes("lead")) {
      atsScore = 88;
      scoreKeywords = 84;
    }
  }

  let gradeCategory = "Needs Improvement";
  if (atsScore >= 90) gradeCategory = "Excellent";
  else if (atsScore >= 80) gradeCategory = "Strong";
  else if (atsScore >= 70) gradeCategory = "Good";
  else if (atsScore >= 60) gradeCategory = "Average";

  try {
    const newResumeItem = {
      id: `res-${Date.now()}`,
      userId,
      fileName,
      fileType,
      uploadedAt: new Date().toISOString(),
      parsedData: {
        fullName: parsedName,
        email: parsedEmail,
        phone: parsedPhone,
        skills: [...new Set(parsedSkills)],
        education: parsedEducation,
        experience: parsedExperience,
        certifications: parsedCertifications,
        projects: parsedProjects,
        links: parsedLinks
      },
      atsReport: {
        score: atsScore,
        structureScore: scoreStructure,
        formattingScore: scoreFormatting,
        keywordDensity: scoreKeywords,
        skillsMatch: scoreSkills,
        grammarScore: scoreGrammar,
        readabilityScore: scoreReadability,
        gradeCategory,
        missingSkills,
        missingKeywords,
        improvementRoadmap: improvements,
        suggestedRewrites: recommendations
      }
    };

    await ResumeModel.create(newResumeItem);

    return res.json({
      message: "Resume parsed, compiled, and integrated in Cloud ATS history successfully!",
      resume: newResumeItem
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/resumes/list", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  try {
    const resumes = await ResumeModel.find({
      $or: [
        { userId: userId },
        { id: { $regex: /^seed-/ } }
      ]
    });
    return res.json({ resumes });
  } catch (err) {
    console.error("List resumes error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/api/resumes/:id", async (req, res) => {
  const resumeId = req.params.id;
  try {
    const result = await ResumeModel.deleteOne({ id: resumeId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Resume profile not found." });
    }
    return res.json({ message: "Resume successfully deleted from SaaS analysis indexes." });
  } catch (err) {
    console.error("Delete resume error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/resumes/batch-analyze", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { resumeIds } = req.body;
  if (!Array.isArray(resumeIds) || resumeIds.length === 0) {
    return res.status(400).json({ error: "Requires an array of resume IDs requested for leaderboard ranking." });
  }

  try {
    const selectedResumes = await ResumeModel.find({ id: { $in: resumeIds } });

    if (selectedResumes.length === 0) {
      return res.status(400).json({ error: "None of the specified resume identifiers were recovered." });
    }

    const leaderboard = selectedResumes
      .map((r) => {
        const matchScore = Math.min(98, 50 + (r.parsedData?.skills?.length || 0) * 4);
        return {
          rank: 0,
          id: r.id,
          name: r.parsedData?.fullName || r.fileName,
          fileName: r.fileName,
          atsScore: r.atsReport?.score || 0,
          skillsCount: r.parsedData?.skills?.length || 0,
          jobMatch: matchScore,
          experienceRoles: r.parsedData?.experience?.map((e: any) => e.role).join(", ") || "No experience reported."
        };
      })
      .sort((a, b) => b.atsScore - a.atsScore);

    leaderboard.forEach((item, index) => {
      item.rank = index + 1;
    });

    const topCandidate = leaderboard[0];
    const weakCandidate = leaderboard[leaderboard.length - 1];

    const topResume = selectedResumes.find(r => r.id === topCandidate.id);
    const weakResume = selectedResumes.find(r => r.id === weakCandidate.id);

    const feedbackInsights = {
      topWinner: topCandidate ? `${topCandidate.name} showcases stellar ATS compatibility with an elegant structure score of ${topResume?.atsReport?.structureScore || 0}%.` : "No leader outstanding.",
      weakWarning: weakCandidate && weakCandidate !== topCandidate ? `We recommend optimizing ${weakCandidate.name}'s resume, as its skills match score of ${weakResume?.atsReport?.skillsMatch || 0}% falls behind active industry keywords.` : "Leaderboard balances stably.",
      remedySteps: [
        "Normalize header configurations across all candidate templates",
        "Ensure text contrasts remain legible without utilizing double vertical borders or nested layouts"
      ]
    };

    return res.json({
      leaderboard,
      comparisonMetrics: {
        totalCandidates: selectedResumes.length,
        averageAts: Math.round(selectedResumes.reduce((sum, r) => sum + (r.atsReport?.score || 0), 0) / selectedResumes.length),
        topCandidate: topCandidate ? topCandidate.name : "N/A",
        weakCandidate: weakCandidate ? weakCandidate.name : "N/A"
      },
      insights: feedbackInsights
    });
  } catch (err) {
    console.error("Batch analyze error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- JOB & COMPANY RECOMMENDATION ENGINES ---
app.get("/api/jobs/recommendations", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  try {
    const candidateResumes = await ResumeModel.find({ userId: userId });
    let activeResume = candidateResumes[candidateResumes.length - 1];
    if (!activeResume) {
      activeResume = await ResumeModel.findOne({ userId: "seed-user-1" }) as any;
    }

    const skills = activeResume ? activeResume.parsedData.skills : ["HTML", "JavaScript", "React", "Node.js"];
    const list: any[] = [];
    const lowercaseSkills = skills.map((s: string) => s.toLowerCase());

    if (lowercaseSkills.includes("python") || lowercaseSkills.includes("machine learning") || lowercaseSkills.includes("pandas")) {
      list.push({
        id: "rec-job-1",
        title: "Data Analyst & Python Architect",
        company: "Netflix",
        skillsRequired: ["Python", "SQL", "Tableau", "Pandas"],
        salary: "$120k - $145k",
        experience: "2+ Years",
        type: "Remote",
        matchScore: 92,
        link: "https://linkedin.com/company/netflix/jobs"
      });
      list.push({
        id: "rec-job-2",
        title: "Junior Data Engineer",
        company: "Snowflake",
        skillsRequired: ["Python", "SQL", "Spark"],
        salary: "$110k - $130k",
        experience: "Entry Level",
        type: "Hybrid",
        matchScore: 81,
        link: "https://linkedin.com/company/snowflake/jobs"
      });
    }

    if (lowercaseSkills.includes("react") || lowercaseSkills.includes("javascript") || lowercaseSkills.includes("typescript")) {
      list.push({
        id: "rec-job-3",
        title: "Frontend Developer (React / Next.js)",
        company: "Vercel",
        skillsRequired: ["React", "TypeScript", "Tailwind CSS"],
        salary: "$115k - $140k",
        experience: "1-3 Years",
        type: "Remote",
        matchScore: 96,
        link: "https://linkedin.com/company/vercel/jobs"
      });
      list.push({
        id: "rec-job-4",
        title: "Full Stack Engineer (Node/React)",
        company: "Stripe",
        skillsRequired: ["React", "Node.js", "Express", "TypeScript"],
        salary: "$130k - $165k",
        experience: "3+ Years",
        type: "Onsite",
        matchScore: 89,
        link: "https://linkedin.com/company/stripe/jobs"
      });
    }

    if (list.length === 0) {
      list.push({
        id: "rec-job-5",
        title: "Associate Software Engineer",
        company: "Atlassian",
        skillsRequired: ["JavaScript", "HTML", "CSS", "Git"],
        salary: "$95k - $120k",
        experience: "Entry Level",
        type: "Remote",
        matchScore: 78,
        link: "https://linkedin.com/company/atlassian/jobs"
      });
      list.push({
        id: "rec-job-6",
        title: "Product Operations Lead",
        company: "Notion",
        skillsRequired: ["Agile", "Product Lifecycles", "Excel"],
        salary: "$105k - $125k",
        experience: "2+ Years",
        type: "Hybrid",
        matchScore: 71,
        link: "https://linkedin.com/company/notion/jobs"
      });
    }

    return res.json({ recommendations: list });
  } catch (err) {
    console.error("Job recommendations error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/jobs/vacancies", (req, res) => {
  const { remote, hybrid, onsite, search } = req.query;

  let vacancies = [
    { id: "vac-1", company: "Google", title: "Cloud Technical Program Manager", location: "Mountain View, CA (Hybrid)", salary: "$160,000 - $210,000", experience: "5+ Years", type: "Hybrid", source: "LinkedIn", applyLink: "https://linkedin.com/company/google/jobs" },
    { id: "vac-2", company: "Zomato", title: "Backend Systems Developer (Python/Go)", location: "Gurugram, India (Onsite)", salary: "₹18,00,000 - ₹24,00,000", experience: "3+ Years", type: "Onsite", source: "Naukri", applyLink: "https://naukri.com" },
    { id: "vac-3", company: "Figma", title: "Product Designer - UI/UX Team", location: "San Francisco, CA (Remote)", salary: "$130,000 - $165,000", experience: "2+ Years", type: "Remote", source: "Indeed", applyLink: "https://indeed.com" },
    { id: "vac-4", company: "Razorpay", title: "Frontend Platform Engineer", location: "Bengaluru, India (Hybrid)", salary: "₹12,0,000 - ₹16,00,000", experience: "1-3 Years", type: "Hybrid", source: "Internshala", applyLink: "https://internshala.com" },
    { id: "vac-5", company: "Meta", title: "React Infrastructure Engineer", location: "Remote, US", salary: "$170,000 - $220,000", experience: "4+ years", type: "Remote", source: "Indeed", applyLink: "https://indeed.com" },
    { id: "vac-6", company: "CRED", title: "React Native Lead Engineer", location: "Bengaluru, India (Onsite)", salary: "₹24,0,00,000 - ₹32,0,00,000", experience: "5+ Years", type: "Onsite", source: "Naukri", applyLink: "https://naukri.com" }
  ];

  if (remote === "true" || hybrid === "true" || onsite === "true") {
    vacancies = vacancies.filter(v => {
      if (remote === "true" && v.type === "Remote") return true;
      if (hybrid === "true" && v.type === "Hybrid") return true;
      if (onsite === "true" && v.type === "Onsite") return true;
      return false;
    });
  }

  if (search) {
    const q = (search as string).toLowerCase();
    vacancies = vacancies.filter(v => v.title.toLowerCase().includes(q) || v.company.toLowerCase().includes(q) || v.location.toLowerCase().includes(q));
  }

  return res.json({ vacancies });
});

app.get("/api/jobs/companies", (req, res) => {
  const companiesList = [
    { company: "Stripe", openRoles: 14, hiringStatus: "Aggressive", salaryRange: "$130,000 - $190,000", careerPage: "https://stripe.com/jobs", targetSkills: ["React", "Ruby", "TypeScript"] },
    { company: "Notion", openRoles: 6, hiringStatus: "Active", salaryRange: "$120,000 - $170,000", careerPage: "https://notion.so/careers", targetSkills: ["React", "Express", "PostgreSQL"] },
    { company: "BrowserStack", openRoles: 22, hiringStatus: "Very High", salaryRange: "₹15L - ₹30L", careerPage: "https://browserstack.com/careers", targetSkills: ["Node.js", "Ruby", "AWS"] },
    { company: "Canva", openRoles: 9, hiringStatus: "Stable", salaryRange: "$110,000 - $160,000", careerPage: "https://canva.com/careers", targetSkills: ["Java", "React", "TypeScript"] },
    { company: "OpenAI", openRoles: 18, hiringStatus: "Hypergrowth", salaryRange: "$200,000 - $350,000", careerPage: "https://openai.com/careers", targetSkills: ["Python", "Kubernetes", "PyTorch"] }
  ];
  return res.json({ companies: companiesList });
});

// --- CAREER ROADMAP & SKILL GAP ANALYSIS ENGINE ---
app.post("/api/career/roadmap", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { targetRole, currentSkillsRaw } = req.body;

  if (!targetRole) return res.status(400).json({ error: "Please enter your Target Career Role to chart a personalized roadmap." });

  const currentSkills = currentSkillsRaw
    ? (Array.isArray(currentSkillsRaw) ? currentSkillsRaw : currentSkillsRaw.split(",").map((s: string) => s.trim()))
    : ["HTML", "CSS", "JavaScript"];

  let missing = ["React", "Node.js", "MongoDB", "Git", "Docker"];
  let plan30Colors = ["Review intermediate Javascript concepts (ES6+, asynchronous hooks, promises)", "Learn basic styling templates using Tailwind utility classes", "Implement functional SPA using vanilla state parameters"];
  let plan60Colors = ["Integrate state management using state managers or browser indices", "Write full-stack modular server APIs using Node.js and Express", "Connect backend channels securely using database tables and queries"];
  let plan90Colors = ["Set up continuous integrations (such as GitHub Actions or Docker containers)", "Build end-to-end cloud deploys with environment parameters securely hidden", "Engage in mock mockups and technical tests daily"];
  let resources = [
    { name: "Full Stack Open - University of Helsinki", url: "https://fullstackopen.com/en/", type: "Course" },
    { name: "The Odin Project - Comprehensive Javascript Roadmap", url: "https://theodinproject.com", type: "Tutorial" },
    { name: "Interactive Git Scenarios and Sandbox Sandbox", url: "https://github.com", type: "Practice" }
  ];

  if (ai) {
    const aiPrompt = `
      You are an expert Career Mentor and Technical Recruiter.
      A student wants to become a "${targetRole}". 
      Their current skill-set is: [${currentSkills.join(", ")}].
      
      Generate a customized visual career roadmap in JSON format.
      Return EXACTLY this JSON structure, with no markdown tags surrounding it:
      {
        "missingSkills": ["skill1", "skill2", "skill3"],
        "plan30Days": ["Task 1", "Task 2"],
        "plan60Days": ["Task 1", "Task 2"],
        "plan90Days": ["Task 1", "Task 2"],
        "learningResources": [
          {"name": "Course Name", "url": "https://...", "type": "Course | Book | Platform"}
        ]
      }
    `;

    try {
      const respText = await queryGemini(aiPrompt, "Deliver only raw valid JSON complying exactly to the requested keys. No extra commentary.");
      const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
      const obj = JSON.parse(cleaned);
      if (obj) {
        missing = obj.missingSkills || missing;
        plan30Colors = obj.plan30Days || plan30Colors;
        plan60Colors = obj.plan60Days || plan60Colors;
        plan90Colors = obj.plan90Days || plan90Colors;
        resources = obj.learningResources || resources;
      }
    } catch (ignore) {}
  }

  try {
    const subReport = {
      id: `gap-${Date.now()}`,
      userId,
      targetRole,
      currentSkills,
      missingSkills: missing,
      roadmap: {
        plan30Days: plan30Colors,
        plan60Days: plan60Colors,
        plan90Days: plan90Colors,
        learningResources: resources
      },
      createdAt: new Date().toISOString()
    };

    await SkillGapReportModel.create(subReport as any);

    return res.json({ report: subReport });
  } catch (err) {
    console.error("Roadmap error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- AI INTERVIEW ASSISTANT & MOCK INTERVIEW EVALUATION ---
app.post("/api/interview/questions", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { roleName, skillsRaw } = req.body;

  const targetRole = roleName || "Full Stack Developer";
  const skills = skillsRaw || "React, JavaScript, Node.js, Express, databases";

  let questionSet = [
    { id: "q1", category: "HR" as const, question: "Why do you want to join our organization and what value parameters do you represent?", sampleAnswer: "I aim to combine my software dexterity with your agile products to optimize high-performance loops and customer dashboards." },
    { id: "q2", category: "Technical" as const, question: "Briefly explain the structural difference between Virtual DOM and Shadow DOM when compiling React client instances.", sampleAnswer: "Virtual DOM tracks state differentials sequentially to batch repaint components on demand, while Shadow DOM encapsulates local stylesheets securely within native custom Web Elements." },
    { id: "q3", category: "Coding" as const, question: "Write a high-performance function to check the matching sequence of brackets in a given stream parameter.", sampleAnswer: "Push opening tokens into local arrays, then pop active brackets to evaluate symmetry against mapping constants." },
    { id: "q4", category: "Project" as const, question: "What was the most challenging technical project you designed, and how did you resolve scaling issues?", sampleAnswer: "I built an offline-first mobile sync tool. We resolved concurrency using unique timestamp markers on database rows." },
    { id: "q5", category: "Behavioral" as const, question: "Describe a scenario where key project criteria changed overnight. How did you organize teamwork under pressure?", sampleAnswer: "I coordinated daily standups to isolate active variables first, enabling our engineering branch to secure key features on time." }
  ];

  if (ai) {
    const aiPrompt = `
      You are an elite interview conductor. Generate 5 highly realistic interview questions tailored for the role of "${targetRole}" with tech stack: [${skills}].
      Produce one question for EACH category: "HR", "Technical", "Project", "Coding", "Behavioral".
      Include high-fidelity "sampleAnswer" for each.
      
      Respond EXACTLY in this JSON sequence (do not attach any markdown headers):
      [
        {
          "id": "q1",
          "category": "HR | Technical | Project | Coding | Behavioral",
          "question": "The question content",
          "sampleAnswer": "Suggested professional answer"
        }
      ]
    `;

    try {
      const respText = await queryGemini(aiPrompt, "Deliver only raw valid JSON matching the interview question array structure requested.");
      const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        questionSet = parsed;
      }
    } catch (ignore) {}
  }

  try {
    const subPrep = {
      id: `int-${Date.now()}`,
      userId,
      role: targetRole,
      questions: questionSet,
      timestamp: new Date().toISOString()
    };

    await InterviewPrepModel.create(subPrep);

    return res.json({ interviewId: subPrep.id, role: subPrep.role, questions: subPrep.questions });
  } catch (err) {
    console.error("Questions error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/interview/mock-evaluate", async (req, res) => {
  const { answerText, questionText } = req.body;
  if (!answerText) return res.status(400).json({ error: "Please write or dictate an answer to receive feedback." });

  let confidenceScore = 75;
  let relevanceScore = 70;
  let communicationScore = 75;
  let combinedScore = 73;
  let feedbackText = "Excellent responsive entry. Focus on articulating numerical percentages or deployment methods to secure leadership authority.";

  if (ai) {
    const aiPrompt = `
      Evaluate this candidate response during a live Mock Interview:
      Question: "${questionText || "What are your core technical competencies?"}"
      Candidate Answer: "${answerText}"
      
      Generate a professional critique JSON containing:
      - confidence (number 0 to 100)
      - relevance (number 0 to 100)
      - communication (number 0 to 100)
      - combinedScore (average of the three)
      - feedback (solid text providing key optimizations and a better suggested wording)
      
      Respond only with raw JSON. No markdown wrappings.
    `;

    try {
      const respText = await queryGemini(aiPrompt, "Evaluate technical replies with objective metrics. Deliver raw JSON.");
      const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (parsed) {
        confidenceScore = parsed.confidence || confidenceScore;
        relevanceScore = parsed.relevance || relevanceScore;
        communicationScore = parsed.communication || communicationScore;
        combinedScore = parsed.combinedScore || combinedScore;
        feedbackText = parsed.feedback || feedbackText;
      }
    } catch (ignore) {}
  }

  return res.json({
    metrics: {
      confidence: confidenceScore,
      relevance: relevanceScore,
      communication: communicationScore,
      overall: combinedScore
    },
    critique: feedbackText
  });
});

// --- AI COVER LETTER GENERATOR ---
app.post("/api/career/cover-letter", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { targetRole, companyName, jobDescription, resumeText } = req.body;

  if (!targetRole || !companyName) {
    return res.status(400).json({ error: "Target Role and Company Name are required fields." });
  }

  let formattedLetter = `Dear Hiring Manager,

Please accept this application as representing my eager candidate parameters for the position of Open Role at your company. 
I have robust skills in web development and enterprise workflow calculations. 

I look forward to discussing how my experience can expand your product pipelines.

Warm regards,
Creative Candidate`;

  if (ai) {
    const aiPrompt = `
      Write an elegant, professional, highly captivating Cover Letter to get hired.
      Target Role: "${targetRole}"
      Target Company: "${companyName}"
      Job Criteria: "${jobDescription || "Not specified"}"
      Resume Context: "${resumeText || "Competent full-stack software engineer with technical design expertise."}"
      
      Format beautifully. Output the visual cover letter text directly. No other details.
    `;

    try {
      const resp = await queryGemini(aiPrompt, "You are a professional executive resume writer. Generate stellar, personalized cover letters.");
      if (resp) formattedLetter = resp;
    } catch (ignore) {}
  }

  try {
    const letterItem = {
      id: `letter-${Date.now()}`,
      userId,
      title: `Cover Letter - ${companyName} (${targetRole})`,
      content: formattedLetter,
      generatedAt: new Date().toISOString()
    };

    await CoverLetterModel.create(letterItem);

    return res.json({ letter: letterItem });
  } catch (err) {
    console.error("Cover letter error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- PROFILE OPTIMIZER (LinkedIn & GitHub Analyzers) ---
app.post("/api/profile/optimize", async (req, res) => {
  const { provider, dataToAnalyze } = req.body;

  let headline = "Software Engineer | Specializing in Agile Full-Stack Products";
  let summary = "Highly energetic coder engineering responsive SPA interfaces and server APIs.";
  let recommendations = [
    "List specific repositories highlighting database migrations.",
    "Introduce quantitative success rates inside LinkedIn bullet indices."
  ];

  if (provider === "linkedin") {
    if (ai) {
      const aiPrompt = `
        Analyze this LinkedIn profile text: "${dataToAnalyze || "Software candidate looking for entry jobs"}".
        Optimized details requested:
        - Better Headline
        - Elegant Profile Summary
        - Recommended Optimization Steps (array of 3 items)
        
        Respond only with JSON format:
        { "headline": "...", "summary": "...", "recommendations": ["...", "..."] }
      `;
      try {
        const respText = await queryGemini(aiPrompt, "Respond only with raw JSON.");
        const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        if (parsed) {
          headline = parsed.headline || headline;
          summary = parsed.summary || summary;
          recommendations = parsed.recommendations || recommendations;
        }
      } catch (ignore) {}
    }
  } else {
    headline = "Active GitHub Contributor | Node.js Systems";
    summary = "Developer deploying multi-container services with integrated CI/CD channels.";
    recommendations = [
      "Ensure your topmost repositories possess clear README files with architecture visuals.",
      "Add license types and active status indicators inside metadata fields."
    ];

    if (ai && dataToAnalyze) {
      const aiPrompt = `
        Analyze this GitHub profile content: "${dataToAnalyze}".
         Optimized details requested:
        - Better Repo Title / Bio Headline
        - Robust Project Profile Summary
        - Recommended repository styling criteria (array of 3 items)
        
        Respond only with JSON format:
        { "headline": "...", "summary": "...", "recommendations": ["...", "..."] }
      `;
      try {
        const respText = await queryGemini(aiPrompt, "Respond only with raw JSON.");
        const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        if (parsed) {
          headline = parsed.headline || headline;
          summary = parsed.summary || summary;
          recommendations = parsed.recommendations || recommendations;
        }
      } catch (ignore) {}
    }
  }

  return res.json({ headline, summary, recommendations });
});

// --- AI CAREER CHATBOT ---
app.post("/api/chatbot/message", async (req, res) => {
  const userId = getUserIdFromHeaders(req) || "guest-session";
  const { text, history } = req.body;

  if (!text) return res.status(400).json({ error: "Please say something." });

  let aiAnswer = "Excellent query. I highly recommend conducting an ATS keyword density scan and aligning your resume formatting vertically so primary bots parse your education metadata seamlessly.";

  if (ai) {
    const formattedHistory = (history || []).map((h: any) => `${h.sender === "user" ? "User" : "Coach"}: ${h.text}`).join("\n");
    const aiPrompt = `
      You are the elite "Career Coach Assistant". 
      An active SaaS client is asking for resume tips, salary structures, or career roadmaps.
      Prior Conversation Context:
      ${formattedHistory}
      
      Client Current Message: "${text}"
      
      Formulate a highly specialized, concise, actionable response guiding their technical career. Keep details clean and scannable of around 150 words.
    `;

    try {
      const resp = await queryGemini(aiPrompt, "You are a professional career coach. Empower and guide the user professionally with clear layouts.");
      if (resp) aiAnswer = resp;
    } catch (ignore) {}
  }

  try {
    const msgUser = { id: `chat-${Date.now()}-u`, userId, role: "user" as const, message: text, timestamp: new Date().toISOString() };
    const msgModel = { id: `chat-${Date.now()}-a`, userId, role: "model" as const, message: aiAnswer, timestamp: new Date().toISOString() };

    await ChatMessageModel.create(msgUser);
    await ChatMessageModel.create(msgModel);

    return res.json({ reply: aiAnswer });
  } catch (err) {
    console.error("Chat message error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// --- ANALYTICS & ADMIN OVERVIEW ENDPOINTS ---
app.get("/api/admin/stats", async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalResumes = await ResumeModel.countDocuments();
    const totalATSAnalyses = await ResumeModel.countDocuments({ "atsReport.score": { $gt: 0 } });

    const allResumes = await ResumeModel.find({});
    const skillsCountMap: Record<string, number> = {};
    allResumes.forEach(r => {
      if (r.parsedData && r.parsedData.skills) {
        r.parsedData.skills.forEach(skill => {
          const key = skill.trim();
          skillsCountMap[key] = (skillsCountMap[key] || 0) + 1;
        });
      }
    });

    const commonSkills = Object.entries(skillsCountMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const jobTally: Record<string, number> = {
      "Full Stack Developer": 12,
      "Frontend Developer": 9,
      "Python Developer": 8,
      "Data Analyst": 6,
      "Machine Learning Engineer": 4
    };

    const userAct = [
      { day: "Mon", count: 18 },
      { day: "Tue", count: 24 },
      { day: "Wed", count: 32 },
      { day: "Thu", count: 28 },
      { day: "Fri", count: 41 },
      { day: "Sat", count: 15 },
      { day: "Sun", count: 22 }
    ];

    return res.json({
      totalUsers: totalUsers || 3,
      totalResumes: totalResumes || 3,
      totalATSAnalyses: totalATSAnalyses || 3,
      mostCommonSkills: commonSkills.length ? commonSkills : [{ name: "React", count: 3 }, { name: "JavaScript", count: 3 }, { name: "Python", count: 2 }, { name: "SQL", count: 2 }, { name: "TypeScript", count: 1 }],
      mostRecommendedJobs: Object.entries(jobTally).map(([name, count]) => ({ name, count })),
      userActivity: userAct
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/analytics/trends", async (req, res) => {
  try {
    const allResumes = await ResumeModel.find({});
    
    let excellent = 0;
    let strong = 0;
    let good = 0;
    let average = 0;
    let needsImprovement = 0;

    allResumes.forEach(r => {
      const s = r.atsReport?.score || 0;
      if (s >= 90) excellent++;
      else if (s >= 80) strong++;
      else if (s >= 70) good++;
      else if (s >= 60) average++;
      else needsImprovement++;
    });

    return res.json({
      scoreCategories: [
        { name: "Excellent (90-100)", value: excellent || 1 },
        { name: "Strong (80-89)", value: strong || 1 },
        { name: "Good (70-79)", value: good || 1 },
        { name: "Average (60-69)", value: average || 0 },
        { name: "Needs Improvement (<60)", value: needsImprovement || 0 }
      ],
      skillDemand: [
        { name: "React", demand: 94 },
        { name: "Node.js", demand: 86 },
        { name: "Python", demand: 89 },
        { name: "SQL", demand: 82 },
        { name: "Docker", demand: 68 },
        { name: "TypeScript", demand: 91 }
      ],
      qualityTrends: [
        { month: "Jan", avgScore: 68 },
        { month: "Feb", avgScore: 72 },
        { month: "Mar", avgScore: 75 },
        { month: "Apr", avgScore: 79 },
        { month: "May", avgScore: 84 },
        { month: "Jun", avgScore: 86 }
      ]
    });
  } catch (err) {
    console.error("Trends error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/dev/secrets-config", (req, res) => {
  res.json({
    hasKey: !!apiKey && apiKey !== "MY_GEMINI_API_KEY",
    appUrl: process.env.APP_URL || `http://localhost:${PORT}`
  });
});

// ---------------------------------------------------------
// VITE AND STATIC ASSETS ROUTING MIDDLEWARE
// ---------------------------------------------------------
async function startServer() {
  console.log("Connecting to MongoDB...");
  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume_screening");
    console.log("Connected to MongoDB successfully!");
    await seedDatabaseIfEmpty();
  } catch (err) {
    console.error("MongoDB connection failed, falling back to local file database:", err);
    useLocalDB = true;
    loadLocalDB();
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting robustly on http://localhost:${PORT}`);
  });
}

startServer();
