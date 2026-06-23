import React, { useState, useEffect, useRef } from "react";
import {
  FileText, Upload, Sparkles, AlertTriangle, CheckCircle, TrendingUp, BarChart3,
  Search, Briefcase, MapPin, DollarSign, ExternalLink, RefreshCw, Trophy, Users,
  MessageSquare, BookOpen, Layers, Award, User, HelpCircle, ArrowRight, Video,
  X, Play, Edit3, Key, Mail, ShieldAlert, ChevronRight, LogOut, FileCode, Check, Send, Download
} from "lucide-react";


// ── Animated Background Particles ──────────────────────────────────────
function AnimatedBackground() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.2) % 90}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${8 + (i * 1.3) % 10}s`,
    size: `${2 + (i % 3)}px`,
    color: i % 3 === 0 ? 'rgba(236,72,153,0.6)' : i % 3 === 1 ? 'rgba(139,92,246,0.5)' : 'rgba(244,114,182,0.4)',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient blobs */}
      <div className="bg-blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.12) 0%, transparent 70%)' }} />
      <div className="bg-blob-2 absolute top-[20%] right-[-8%] w-[600px] h-[600px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />
      <div className="bg-blob-3 absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particle ${p.duration} ${p.delay} ease-in infinite`,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]"
           style={{ backgroundImage: 'linear-gradient(rgba(236,72,153,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
}

// ── Animated 3D Orb ─────────────────────────────────────────────────────
function Animated3DOrb() {
  const orbRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const el = orbRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 14}deg)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="animate-orb-float relative flex items-center justify-center select-none"
         style={{ width: 320, height: 320 }}>
      {/* Glow beneath */}
      <div className="absolute inset-0 rounded-full"
           style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(219,39,119,0.35) 0%, transparent 65%)', filter: 'blur(16px)' }} />
      <svg
        ref={orbRef}
        viewBox="0 0 300 300"
        width="300"
        height="300"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease', willChange: 'transform' }}
      >
        <defs>
          {/* Core sphere gradient */}
          <radialGradient id="sphereGrad" cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#6d28d9" stopOpacity="0.80" />
            <stop offset="100%" stopColor="#1e0533" stopOpacity="0.95" />
          </radialGradient>
          {/* Specular highlight */}
          <radialGradient id="specular" cx="30%" cy="28%" r="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {/* Inner glow */}
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0abfc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          {/* Ring gradient */}
          <linearGradient id="ring1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="ring2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ring3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
          {/* Scan line clip */}
          <clipPath id="orbClip">
            <circle cx="150" cy="150" r="96" />
          </clipPath>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Outer ambient glow ring */}
        <circle cx="150" cy="150" r="118" fill="none" stroke="rgba(236,72,153,0.08)" strokeWidth="24" />
        <circle cx="150" cy="150" r="105" fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="16" />

        {/* Orbit Ring 1 */}
        <g className="orb-ring-1" style={{ transformOrigin: '150px 150px' }}>
          <ellipse cx="150" cy="150" rx="130" ry="36" fill="none" stroke="url(#ring1Grad)" strokeWidth="1.8" />
        </g>
        {/* Orbit Ring 2 */}
        <g className="orb-ring-2" style={{ transformOrigin: '150px 150px' }}>
          <ellipse cx="150" cy="150" rx="118" ry="28" fill="none" stroke="url(#ring2Grad)" strokeWidth="1.4" />
        </g>
        {/* Orbit Ring 3 */}
        <g className="orb-ring-3" style={{ transformOrigin: '150px 150px' }}>
          <ellipse cx="150" cy="150" rx="142" ry="20" fill="none" stroke="url(#ring3Grad)" strokeWidth="1.1" />
        </g>

        {/* Core sphere */}
        <circle cx="150" cy="150" r="90" fill="url(#sphereGrad)" />
        {/* Inner glow overlay */}
        <circle cx="150" cy="150" r="90" fill="url(#innerGlow)" />
        {/* Specular highlight */}
        <circle cx="150" cy="150" r="90" fill="url(#specular)" />

        {/* Latitude lines on sphere */}
        <g clipPath="url(#orbClip)" opacity="0.15" filter="url(#softBlur)">
          {[-55,-35,-15,5,25,45,65].map((offset, i) => (
            <ellipse key={i} cx="150" cy={150 + offset} rx="90" ry={Math.max(4, 90 * Math.cos(Math.asin(Math.min(1, Math.abs(offset)/90))))} fill="none" stroke="white" strokeWidth="0.6" />
          ))}
          {/* Longitude lines */}
          {[0,30,60,90,120,150].map((angle, i) => (
            <ellipse key={`lon-${i}`} cx="150" cy="150" rx={6 + (i*2)} ry="90" fill="none" stroke="white" strokeWidth="0.5" transform={`rotate(${angle} 150 150)`} />
          ))}
        </g>

        {/* Scan line effect */}
        <g clipPath="url(#orbClip)">
          <rect className="orb-scan" x="54" y="0" width="192" height="8"
                fill="none" stroke="rgba(240,171,252,0.5)" strokeWidth="1" />
        </g>

        {/* Floating data dots on surface */}
        {[
          { cx: 185, cy: 120, r: 3, color: '#f472b6', delay: '0s' },
          { cx: 118, cy: 175, r: 2.5, color: '#a78bfa', delay: '0.8s' },
          { cx: 200, cy: 160, r: 2, color: '#34d399', delay: '1.6s' },
          { cx: 105, cy: 128, r: 2, color: '#60a5fa', delay: '2.4s' },
          { cx: 165, cy: 200, r: 3, color: '#f59e0b', delay: '3.2s' },
        ].map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color}
                  style={{ animation: `particleDrift ${2 + i * 0.5}s ${dot.delay} ease-in-out infinite` }}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i * 0.4}s`} begin={dot.delay} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Center sparkle */}
        <g transform="translate(150,150)">
          <line x1="0" y1="-12" x2="0" y2="12" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <line x1="-8" y1="-8" x2="8" y2="8" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
          <line x1="8" y1="-8" x2="-8" y2="8" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
          <circle cx="0" cy="0" r="3" fill="white" opacity="0.9" />
        </g>
      </svg>

      {/* Floating stat chips around the orb */}
      <div className="absolute top-4 right-[-20px] glass-panel rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 border border-emerald-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <span className="block text-[10px] text-slate-500 font-normal">ATS Score</span>
        92/100
      </div>
      <div className="absolute bottom-8 left-[-24px] glass-panel rounded-xl px-3 py-2 text-xs font-bold text-pink-400 border border-pink-500/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <span className="block text-[10px] text-slate-500 font-normal">Match Rate</span>
        87%
      </div>
      <div className="absolute top-1/2 left-[-32px] glass-panel rounded-xl px-3 py-2 text-xs font-bold text-purple-400 border border-purple-500/20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="block text-[10px] text-slate-500 font-normal">Skills</span>
        24 Found
      </div>
    </div>
  );
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
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

export default function App() {
  // Session / Authentication state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot" | null>(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authStatus, setAuthStatus] = useState({ type: "", message: "" });

  // Core database items loaded from API
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [selectedResumeIds, setSelectedResumeIds] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 3,
    totalResumes: 3,
    totalATSAnalyses: 3,
    mostCommonSkills: [] as { name: string; count: number }[],
    mostRecommendedJobs: [] as { name: string; count: number }[],
    userActivity: [] as { day: string; count: number }[]
  });
  const [analyticsData, setAnalyticsData] = useState({
    scoreCategories: [] as { name: string; value: number }[],
    skillDemand: [] as { name: string; demand: number }[],
    qualityTrends: [] as { month: string; avgScore: number }[]
  });

  // UI state
  const [activeTab, setActiveTab] = useState<"landing" | "dashboard" | "ats" | "leaderboard" | "jobs" | "career" | "interviews" | "chatbot" | "admin">("landing");
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  // Resume Upload Form State
  const [uploadTextContent, setUploadTextContent] = useState("");
  const [uploadFileName, setUploadFileName] = useState("My_Resume.txt");
  const [isDragOver, setIsDragOver] = useState(false);

  // Resume Builder state
  const [isBuildingResume, setIsBuildingResume] = useState(false);
  const [builderData, setBuilderData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
    targetRole: ""
  });

  // Job Vacancies & Recs State
  const [jobSearch, setJobSearch] = useState("");
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [jobRecommendations, setJobRecommendations] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [jobFilters, setJobFilters] = useState({ remote: false, hybrid: false, onsite: false });

  // Batch analysis state
  const [batchLeaderboard, setBatchLeaderboard] = useState<any[]>([]);
  const [batchInsights, setBatchInsights] = useState<any>({ topWinner: "", weakWarning: "", remedySteps: [] });

  // Career roadmap state
  const [targetRoleInput, setTargetRoleInput] = useState("Full Stack Developer");
  const [currentSkillsInput, setCurrentSkillsInput] = useState("HTML, CSS, JavaScript");
  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);

  // Cover letter generator state
  const [clRole, setClRole] = useState("Full Stack Engineer");
  const [clCompany, setClCompany] = useState("Linear");
  const [clJobDesc, setClJobDesc] = useState("Build premium Glassmorphic application using React.");
  const [generatedCl, setGeneratedCl] = useState<any>(null);

  // Profile Optimizer state
  const [optProvider, setOptProvider] = useState<"linkedin" | "github">("linkedin");
  const [optContent, setOptContent] = useState("I build beautiful web experiences occasionally coding python scripts.");
  const [optResult, setOptResult] = useState<any>(null);

  // Chatbot state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: "coach", text: "Hello! I am your 24/7 AI Career Coach. Ask me how to increase your ATS rating, optimize your skills, or prepare for interviews!" }
  ]);

  // Interview Center state
  const [interviewRole, setInterviewRole] = useState("Full Stack Engineer");
  const [interviewSkills, setInterviewSkills] = useState("React, Tailwind, Node.js");
  const [activeInterview, setActiveInterview] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswerInput, setUserAnswerInput] = useState("");
  const [isEvaluatingMock, setIsEvaluatingMock] = useState(false);
  const [mockFeedback, setMockFeedback] = useState<any>(null);

  // Secret state info from server
  const [secretsConfig, setSecretsConfig] = useState({ hasKey: false, appUrl: "" });

  // Fetch secrets, templates & seeded stats on mount
  useEffect(() => {
    // Check local storage for persistent mock session
    const savedToken = localStorage.getItem("ats_saas_token");
    const savedUser = localStorage.getItem("ats_saas_user");
    if (savedToken && savedUser) {
      setSessionToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      setActiveTab("dashboard");
    }

    fetchSecrets();
    fetchStats();
    fetchResumes();
    fetchVacancies();
    fetchCompanies();
  }, []);

  const fetchSecrets = async () => {
    try {
      const res = await fetch("/api/dev/secrets-config");
      const data = await res.json();
      setSecretsConfig(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStats = async () => {
    try {
      const [statsRes, trendRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/analytics/trends")
      ]);
      const sData = await statsRes.json();
      const tData = await trendRes.json();
      setStats(sData);
      setAnalyticsData(tData);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchResumes = async (token?: string) => {
    try {
      const activeTok = token || sessionToken || "";
      const res = await fetch("/api/resumes/list", {
        headers: { "Authorization": `Bearer ${activeTok}` }
      });
      const data = await res.json();
      if (data.resumes) {
        setResumes(data.resumes);
        if (data.resumes.length > 0 && !activeResume) {
          setActiveResume(data.resumes[0]);
          setSelectedResumeIds([data.resumes[0].id]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVacancies = async () => {
    try {
      const query = new URLSearchParams();
      if (jobFilters.remote) query.append("remote", "true");
      if (jobFilters.hybrid) query.append("hybrid", "true");
      if (jobFilters.onsite) query.append("onsite", "true");
      if (jobSearch) query.append("search", jobSearch);

      const res = await fetch(`/api/jobs/vacancies?${query.toString()}`);
      const data = await res.json();
      setVacancies(data.vacancies || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecommendations = async (token?: string) => {
    try {
      const activeTok = token || sessionToken || "";
      const res = await fetch("/api/jobs/recommendations", {
        headers: { "Authorization": `Bearer ${activeTok}` }
      });
      const data = await res.json();
      setJobRecommendations(data.recommendations || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch("/api/jobs/companies");
      const data = await res.json();
      setCompanies(data.companies || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger search whenever search query or filters change
  useEffect(() => {
    fetchVacancies();
  }, [jobSearch, jobFilters]);

  // Handle Authentication submit
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus({ type: "info", message: "Processing security authorization..." });

    try {
      if (authMode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: authName,
            email: authEmail,
            password: authPassword,
            confirmPassword: authConfirmPassword
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed registration");

        setAuthStatus({ type: "success", message: data.message });
        setTimeout(() => setAuthMode("login"), 2000);
      } else if (authMode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: authEmail, password: authPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed login");

        setSessionToken(data.token);
        setCurrentUser(data.user);
        localStorage.setItem("ats_saas_token", data.token);
        localStorage.setItem("ats_saas_user", JSON.stringify(data.user));

        setAuthStatus({ type: "success", message: "Successfully logged in. Enjoy premium ATS dashboard!" });
        fetchResumes(data.token);
        fetchRecommendations(data.token);
        setAuthMode(null);
        setActiveTab("dashboard");
      } else if (authMode === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: authEmail })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed email request");

        setAuthStatus({ type: "success", message: data.message });
      }
    } catch (err: any) {
      setAuthStatus({ type: "error", message: err.message });
    }
  };

  // Logout routine
  const handleLogout = () => {
    setCurrentUser(null);
    setSessionToken(null);
    setResumes([]);
    setActiveResume(null);
    localStorage.removeItem("ats_saas_token");
    localStorage.removeItem("ats_saas_user");
    setActiveTab("landing");
  };

  // Demo entry bypassing sign-up constraints
  const loginDemoAccount = () => {
    const mockToken = "usr-demo-session";
    const userSeedObj = {
      id: "seed-user-1",
      name: "Alex Rivera",
      email: "alex.rivera@techflow.io",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    setSessionToken(mockToken);
    setCurrentUser(userSeedObj);
    localStorage.setItem("ats_saas_token", mockToken);
    localStorage.setItem("ats_saas_user", JSON.stringify(userSeedObj));
    fetchResumes(mockToken);
    fetchRecommendations(mockToken);
    setActiveTab("dashboard");
  };

  // Raw file drag-and-drop / manual text reading
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTextContent.trim()) {
      alert("Please provide the resume text content or import standard file formats.");
      return;
    }

    setIsLoading(true);
    setActionMessage({ type: "info", text: "Analyzing your resume..." });

    try {
      const res = await fetch("/api/resumes/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          fileName: uploadFileName,
          fileType: "text/plain",
          textContent: uploadTextContent
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Resume upload failed");

      setActionMessage({ type: "success", text: "Resume uploaded successfully! Opening your score report." });
      setResumes(prev => [data.resume, ...prev]);
      setActiveResume(data.resume);
      setSelectedResumeIds(prev => [data.resume.id, ...prev]);
      setUploadTextContent("");

      // Switch screen automatically to display scores page
      setTimeout(() => {
        setActionMessage({ type: "", text: "" });
        setActiveTab("ats");
      }, 1500);

    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated drag-and-drop file processing
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setUploadTextContent(evt.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  // Perform multi-resume ranking upload
  const handleBatchFileUploads = async (files: FileList) => {
    if (files.length === 0) return;
    setIsLoading(true);
    setActionMessage({ type: "info", text: `Reading 0 of ${files.length} files...` });

    const uploadedIds: string[] = [];
    const readAndUpload = async (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (evt) => {
          try {
            const contentText = evt.target?.result as string || "";
            const res = await fetch("/api/resumes/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken || "guest-session"}`
              },
              body: JSON.stringify({
                fileName: file.name,
                fileType: "text/plain",
                textContent: contentText
              })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");
            uploadedIds.push(data.resume.id);
            setResumes(prev => [data.resume, ...prev]);
            resolve();
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = () => reject(new Error("File read error"));
        reader.readAsText(file);
      });
    };

    try {
      for (let i = 0; i < files.length; i++) {
        setActionMessage({
          type: "info",
          text: `Analyzing resume ${i + 1} of ${files.length}: ${files[i].name}...`
        });
        await readAndUpload(files[i]);
      }

      setActionMessage({ type: "info", text: "Sorting and ranking all candidate resumes..." });
      const res = await fetch("/api/resumes/batch-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({ resumeIds: uploadedIds })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBatchLeaderboard(data.leaderboard);
      setBatchInsights(data.insights);
      setSelectedResumeIds(uploadedIds);
      setActiveTab("leaderboard");
      setActionMessage({ type: "success", text: `Successfully ranked all ${files.length} candidates!` });
      setTimeout(() => setActionMessage({ type: "", text: "" }), 2500);
    } catch (err: any) {
      setActionMessage({ type: "error", text: "Batch error: " + err.message });
      setTimeout(() => setActionMessage({ type: "", text: "" }), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleBatchFileUploads(files);
    }
  };

  const handleBatchFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleBatchFileUploads(files);
    }
  };

  // Perform multi-resume ranking leaderboard
  const runBatchAnalysis = async () => {
    if (selectedResumeIds.length === 0) {
      alert("Please check/select at least one candidate resume from your active catalog below.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/resumes/batch-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({ resumeIds: selectedResumeIds })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBatchLeaderboard(data.leaderboard);
      setBatchInsights(data.insights);
      setActiveTab("leaderboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle selection state for resumes comparison
  const toggleResumeSelection = (id: string) => {
    setSelectedResumeIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Trigger skill gap analysis
  const handleRoadmapGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/career/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          targetRole: targetRoleInput,
          currentSkillsRaw: currentSkillsInput
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActiveRoadmap(data.report);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cover Letter generation trigger
  const handleCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/career/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          targetRole: clRole,
          companyName: clCompany,
          jobDescription: clJobDesc,
          resumeText: activeResume ? JSON.stringify(activeResume.parsedData) : ""
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setGeneratedCl(data.letter);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Profile optimizing suggestions
  const handleProfileOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: optProvider, dataToAnalyze: optContent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOptResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Chat message delivery
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user", text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          text: userMsg.text,
          history: chatMessages
        })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: "coach", text: data.reply }]);
    } catch (ignore) {
      setChatMessages(prev => [...prev, { sender: "coach", text: "Apologies, my NLP parameters timed out. Please try sending again." }]);
    }
  };

  // Pull interview queries
  const loadInterviewQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/interview/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          roleName: interviewRole,
          skillsRaw: interviewSkills
        })
      });
      const data = await res.json();
      setActiveInterview(data.questions);
      setCurrentQuestionIndex(0);
      setUserAnswerInput("");
      setMockFeedback(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Evaluate candidate mock transcription
  const evaluateMockAnswer = async () => {
    if (!userAnswerInput.trim()) {
      alert("Please enter or dictate a candidate answer first.");
      return;
    }

    setIsEvaluatingMock(true);
    try {
      const res = await fetch("/api/interview/mock-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answerText: userAnswerInput,
          questionText: activeInterview[currentQuestionIndex]?.question
        })
      });
      const data = await res.json();
      setMockFeedback(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsEvaluatingMock(false);
    }
  };

  // Automatically create custom resume from state inputs
  const triggerDynamicResumeBuilder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Package details into standard text representation and send to parser
      const structuredDoc = `
        Candidate Name: ${builderData.fullName || "John Doe"}
        Email Address: ${builderData.email || "john.doe@example.com"}
        Phone Coordinate: ${builderData.phone || "+1 555-555-1212"}
        Skills Stack: ${builderData.skills || "N/A"}
        Education History: ${builderData.education || "N/A"}
        Professional Experience: ${builderData.experience || "N/A"}
        Project Credentials: ${builderData.projects || "N/A"}
        Certifications: ${builderData.certifications || "N/A"}
        Target Career: ${builderData.targetRole || "Software Engineer"}
      `;

      const res = await fetch("/api/resumes/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken || "guest-session"}`
        },
        body: JSON.stringify({
          fileName: `${builderData.fullName.replace(/\s+/g, "_") || "Created"}_ATS_Resume.txt`,
          fileType: "text/plain",
          textContent: structuredDoc
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResumes(prev => [data.resume, ...prev]);
      setActiveResume(data.resume);
      setSelectedResumeIds(prev => [data.resume.id, ...prev]);
      setIsBuildingResume(false);
      setActiveTab("ats");
      alert("High-fidelity ATS resume successfully built and processed inside dashboard!");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple PDF file download simulated generator
  const downloadCoverLetterText = (title: string, body: string) => {
    const blob = new Blob([body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.txt`;
    link.click();
  };

  // Helper score categories returns
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 80) return "text-purple-400 bg-teal-500/10 border-teal-500/20";
    if (score >= 70) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    if (score >= 60) return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 80) return "bg-teal-500";
    if (score >= 70) return "bg-yellow-500";
    if (score >= 60) return "bg-orange-500";
    return "bg-rose-500";
  };

  const isSidebarLayout = currentUser && activeTab !== "landing";

  const getLoadingMessage = () => {
    if (actionMessage.text) return actionMessage.text;
    switch (activeTab) {
      case "ats":
        return "Analyzing ATS structure and keyword density maps...";
      case "leaderboard":
        return "Benchmarking candidate resumes and sorting leaderboard rankings...";
      case "jobs":
        return "Scanning live vacancy listings and calculating match coefficients...";
      case "career":
        return "Constructing personalized 30-60-90 day skill roadmap milestones...";
      case "interviews":
        return "Compiling specialized AI mock interview question stream...";
      case "chatbot":
        return "Processing career query with Google Gemini AI models...";
      default:
        return "Scanning candidate data & executing neural models...";
    }
  };

  return (
    <div className={`min-h-screen bg-[#0c020a] text-slate-100 flex ${isSidebarLayout ? "h-screen overflow-hidden" : "flex-col"} font-sans relative selection:bg-pink-500/30 selection:text-pink-200`}>
      
      {/* Animated Background — particles, blobs, grid */}
      <AnimatedBackground />

      {/* ------------------- NOTIFICATION TOAST BAR ------------------- */}
      {actionMessage.text && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-xl animate-bounce flex items-center gap-3 max-w-md ${
          actionMessage.type === "error" 
            ? "bg-rose-950/90 border-rose-500/30 text-rose-200" 
            : actionMessage.type === "success"
            ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
            : "bg-pink-950/90 border-pink-500/30 text-pink-200"
        }`}>
          {actionMessage.type === "error" ? <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400" /> : <Sparkles className="h-5 w-5 shrink-0 text-pink-400" />}
          <div className="text-sm font-medium">{actionMessage.text}</div>
        </div>
      )}

      {/* ------------------- NEW FULL SCREEN PAGE LOADER OVERLAY ------------------- */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#0a0108]/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-fade-in">
          <div className="relative flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="h-28 w-28 rounded-full border-2 border-t-pink-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
            {/* Inner pulsing glow circle */}
            <div className="absolute h-18 w-18 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 blur-md opacity-35 animate-pulse"></div>
            {/* Central icon */}
            <div className="absolute h-16 w-16 rounded-full bg-[#160312] border border-pink-500/30 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Sparkles className="h-7 w-7 text-pink-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center max-w-sm px-6">
            <h3 className="text-sm font-bold text-white tracking-widest bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              AI SYSTEM ENGINE
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed min-h-[36px]">
              {getLoadingMessage()}
            </p>
            <div className="w-48 h-1 bg-purple-950/40 rounded-full mx-auto mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- AUTHENTICATION DIALOG (GLASS PRESENCE) ------------------- */}
      {authMode && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12030f]/95 border border-pink-500/25 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden glass-panel">
            <div className="absolute top-0 inset-x-0 h-1 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
            
            <button 
              onClick={() => setAuthMode(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-pink-950/30"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleAuth} className="p-6 md:p-8 flex flex-col gap-5">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">
                  {authMode === "login" && "Welcome Back"}
                  {authMode === "register" && "Instantiate SECURE Account"}
                  {authMode === "forgot" && "Recover Security Pin"}
                </h3>
                <p className="text-xs text-slate-400 tracking-tight mt-1">
                  Sign in to your account
                </p>
              </div>

              {authStatus.message && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                  authStatus.type === "error" 
                    ? "bg-rose-500/10 text-rose-300 border-rose-500/20" 
                    : "bg-pink-500/10 text-pink-300 border-pink-500/20"
                }`}>
                  {authStatus.message}
                </div>
              )}

              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="alex.rivera@techflow.io"
                  className="w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              {authMode !== "forgot" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              )}

              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5">Confirm Password</label>
                  <input 
                    type="password" 
                    required
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-semibold transition-all text-sm shadow-lg shadow-pink-600/30"
              >
                {authMode === "login" && "Authenticate Access"}
                {authMode === "register" && "Create Candidate Account"}
                {authMode === "forgot" && "Recover Security Credentials"}
              </button>

              <div className="flex items-center justify-between mt-2 text-xs font-medium">
                {authMode === "login" ? (
                  <>
                    <button type="button" onClick={() => { setAuthMode("forgot"); setAuthStatus({type:"",message:""}); }} className="text-slate-400 hover:text-white">Forgot password?</button>
                    <button type="button" onClick={() => { setAuthMode("register"); setAuthStatus({type:"",message:""}); }} className="text-pink-400 hover:text-white">Create an account</button>
                  </>
                ) : (
                  <button type="button" onClick={() => { setAuthMode("login"); setAuthStatus({type:"",message:""}); }} className="text-pink-400 hover:text-white w-full text-center">Already signed up? Log In</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------- LAYOUT ROUTING (SIDEBAR vs HEADER TOP) ------------------- */}
      {isSidebarLayout && (
        <aside className="w-68 bg-[#12030f]/85 border-r border-pink-500/10 flex flex-col justify-between shrink-0 glass-panel relative z-20">
          <div>
            {/* Sidebar logo brand */}
            <div className="p-5 border-b border-pink-500/10 flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                  AI Resume Intel
                </span>
                <span className="text-[10px] block text-pink-400 font-mono tracking-widest font-bold">ATS ENGINE</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="p-4 flex flex-col gap-1.5">
              {[
                { id: "dashboard", label: "Dashboard", icon: Layers },
                { id: "ats", label: "ATS Score", icon: FileText },
                { id: "leaderboard", label: "Compare Resumes", icon: Trophy },
                { id: "jobs", label: "Find Jobs", icon: Briefcase },
                { id: "career", label: "Career Tools", icon: BookOpen },
                { id: "interviews", label: "Interview Prep", icon: Video },
                { id: "chatbot", label: "AI Chat Coach", icon: MessageSquare },
                { id: "admin", label: "Analytics", icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      if (tab.id === "dashboard") fetchStats();
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3.5 transition-all duration-205 text-left cursor-pointer ${
                      isActive 
                        ? "text-pink-400 bg-pink-500/10 border border-pink-500/20 shadow-md shadow-pink-500/5 translate-x-1" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-pink-950/20 border border-transparent"
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-pink-400" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar User profile card */}
          <div className="p-4 border-t border-pink-500/10 bg-[#0a0108]/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                alt="Avatar" 
                className="h-9 w-9 rounded-xl object-cover border border-pink-500/20 shrink-0" 
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate leading-none mt-1 font-mono">{currentUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all shrink-0 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Right Area (Header + Scrollable Main Content) */}
      <div className={`flex-1 flex flex-col ${isSidebarLayout ? "overflow-hidden h-full" : ""}`}>
        
        {/* Workspace Header or Top Header */}
        {isSidebarLayout ? (
          <header className="h-16 border-b border-pink-500/10 bg-[#12030f]/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "ats" && "ATS Score Report"}
                {activeTab === "leaderboard" && "Compare Resumes"}
                {activeTab === "jobs" && "Find Jobs"}
                {activeTab === "career" && "Career Tools"}
                {activeTab === "interviews" && "Interview Prep"}
                {activeTab === "chatbot" && "AI Chat Coach"}
                {activeTab === "admin" && "Analytics"}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/20 border border-purple-500/15 text-[11px] text-purple-200 font-semibold">
                <Key className="h-3.5 w-3.5 text-pink-400" />
                <span className="hidden md:inline">AI Engine:</span>
                {secretsConfig.hasKey ? (
                  <span className="text-pink-400">Gemini AI Active ✓</span>
                ) : (
                  <span className="text-slate-400">Basic Mode</span>
                )}
              </div>
              <button 
                onClick={() => setActiveTab("landing")}
                className="px-3.5 py-1.5 text-xs font-semibold text-pink-300 bg-[#1c0717] hover:bg-[#2c0b26] border border-pink-500/15 rounded-xl transition-all cursor-pointer"
              >
                Landing
              </button>
            </div>
          </header>
        ) : (
          <header className="sticky top-0 z-40 bg-[#0c020a]/80 backdrop-blur-md border-b border-pink-500/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                  AI Resume Intelligence
                </span>
                <span className="text-xs block text-pink-400 font-mono font-bold tracking-wider">ATS ENGINE PRO</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/20 border border-purple-500/15 text-xs text-purple-200">
              <Key className="h-3.5 w-3.5 text-pink-400" />
              <span>AI Engine:</span>
              {secretsConfig.hasKey ? (
                <span className="text-pink-400 font-bold">Gemini AI Active ✓</span>
              ) : (
                <span className="text-slate-400 font-mono">Basic Mode</span>
              )}
            </div>

            <nav className="flex items-center gap-3">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => { setActiveTab("dashboard"); fetchStats(); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "dashboard" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    My Console
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("ats")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "ats" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Scores
                  </button>

                  <button 
                    onClick={() => setActiveTab("jobs")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "jobs" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Jobs
                  </button>

                  <div className="h-6 w-[1px] bg-pink-500/10 mx-1"></div>

                  <div className="flex items-center gap-3 bg-purple-950/20 border border-pink-500/10 pl-3 pr-2 py-1 rounded-xl">
                    <img 
                      src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                      alt="Avatar" 
                      className="h-7 w-7 rounded-lg object-cover border border-pink-500/20" 
                    />
                    <span className="text-xs text-slate-200 font-medium hidden md:inline">{currentUser.name}</span>
                    <button 
                      onClick={handleLogout} 
                      className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setAuthMode("login")}
                    className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setAuthMode("register")}
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl transition-all font-medium shadow-md shadow-pink-600/15 cursor-pointer"
                  >
                    Register
                  </button>
                  <button 
                    onClick={loginDemoAccount}
                    className="px-3.5 py-2 text-sm text-pink-300 bg-purple-950/20 border border-pink-500/15 hover:bg-pink-900/20 rounded-xl transition-colors font-semibold cursor-pointer"
                  >
                    Try Demo
                  </button>
                </div>
              )}
            </nav>
          </header>
        )}

        <main className={`flex-1 w-full flex flex-col ${isSidebarLayout ? "overflow-y-auto bg-gradient-to-b from-[#130310]/30 to-[#0c020a] p-6" : ""}`}>
        {/* ------------------- 1. LANDING PAGE VIEW ------------------- */}
        {activeTab === "landing" && (
          <div className="flex flex-col">
            {/* HERO HERO SECTION */}
            <section className="relative overflow-hidden px-6 lg:px-24 py-20 lg:py-32">
              <div className="absolute top-0 left-1/4 h-72 w-72 bg-pink-600/8 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-1/4 h-80 w-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-7xl mx-auto relative z-10">
                {/* Two-column layout: text left, orb right */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  {/* Left: text content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/20 border border-pink-500/10 text-xs text-pink-400 font-semibold mb-6">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Powered by Google Gemini AI</span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
                      Resume Screening,<br />
                      <span className="text-shimmer">Elevated by AI</span>
                    </h1>

                    <p className="text-lg text-slate-300 max-w-xl mb-10 font-normal leading-relaxed mx-auto lg:mx-0">
                      Analyze resumes, calculate ATS scores, discover jobs, identify skill gaps, generate interview questions, and accelerate your career with AI.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                      {currentUser ? (
                        <button 
                          onClick={() => setActiveTab("dashboard")}
                          className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5"
                        >
                          Go to Dashboard →
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => setAuthMode("register")}
                            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-pink-600/20 hover:-translate-y-0.5"
                          >
                            Get Started Free
                          </button>
                          <button 
                            onClick={loginDemoAccount}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl font-semibold transition-all border border-pink-500/20 hover:border-pink-500/35"
                          >
                            Try Demo →
                          </button>
                        </>
                      )}
                    </div>

                    {/* Stat row */}
                    <div className="flex gap-6 justify-center lg:justify-start text-center">
                      {[
                        { val: '10K+', label: 'Resumes Analyzed' },
                        { val: '98%', label: 'ATS Accuracy' },
                        { val: '3x', label: 'Faster Screening' },
                      ].map((stat, i) => (
                        <div key={i}>
                          <p className="text-2xl font-extrabold text-white">{stat.val}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: 3D Orb */}
                  <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                    <Animated3DOrb />
                  </div>
                </div>

                {/* Features list bottom banner */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-16 lg:mt-20 border-t border-pink-500/10 pt-10 text-center">
                  {['ATS Optimization','AI Career Coach','Resume Builder','Job Matching','Interview AI','Skill Roadmap'].map((feat, i) => (
                    <div key={i} className="px-3 py-2 rounded-xl glass-panel border border-pink-500/15 hover:border-pink-500/30 transition-colors">
                      <p className="text-white font-semibold text-sm">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PLATFORM OVERVIEW & DEMO HERO MOCK */}
            <section className="px-6 lg:px-24 py-16 glass-card-inset border-t border-pink-500/10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-white">Everything You Need</h2>
                  <p className="text-slate-400 mt-2 max-w-lg mx-auto">One platform to analyze, improve, and land your dream job.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">ATS Score Analysis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Get a detailed score showing how well your resume matches ATS systems and job requirements.
                    </p>
                  </div>

                  <div className="p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-fuchsia-400 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Compare Candidates</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Upload multiple resumes and rank them side-by-side to find the best candidate.
                    </p>
                  </div>

                  <div className="p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-purple-400 flex items-center justify-center">
                      <Video className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">AI Mock Interview</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Practice interview questions with AI that scores your answers and gives personalized feedback.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ------------------- 2. CONSOLE DASHBOARD VIEW ------------------- */}
        {activeTab === "dashboard" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
            
            {/* Left side upload and candidate selection */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* UPLOAD FORM PANEL */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-pink-500"></div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Upload Resume</h2>
                    <p className="text-xs text-slate-400">Upload your resume for instant AI analysis and scoring.</p>
                  </div>
                  <button 
                    onClick={() => setIsBuildingResume(true)}
                    className="px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-pink-400 rounded-lg flex items-center gap-1 border border-pink-500/20"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Build Resume Instead</span>
                  </button>
                </div>

                {isBuildingResume ? (
                  <form onSubmit={triggerDynamicResumeBuilder} className="glass-card-inset p-4 rounded-xl border border-pink-500/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-indigo-950/40 pb-2">
                      <h4 className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">Build Your Resume</h4>
                      <button type="button" onClick={() => setIsBuildingResume(false)} className="text-slate-400 hover:text-white text-xs">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Your Name</label>
                        <input required value={builderData.fullName} onChange={(e) => setBuilderData({...builderData, fullName: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="Alex Rivera" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Job Title You're Targeting</label>
                        <input required value={builderData.targetRole} onChange={(e) => setBuilderData({...builderData, targetRole: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="Lead Full Stack Architect" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Email</label>
                        <input type="email" required value={builderData.email} onChange={(e) => setBuilderData({...builderData, email: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="alex@techflow.io" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Phone</label>
                        <input required value={builderData.phone} onChange={(e) => setBuilderData({...builderData, phone: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="+1 555-019-2834" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Your Skills (comma separated)</label>
                      <textarea required rows={2} value={builderData.skills} onChange={(e) => setBuilderData({...builderData, skills: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white font-mono" placeholder="React, Node.js, TypeScript, PostgreSQL, Docker, Kubernetes, AWS" />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Work Experience</label>
                      <textarea required rows={2} value={builderData.experience} onChange={(e) => setBuilderData({...builderData, experience: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="Senior React developer at Netflix. Engineered high-efficiency UI components improving page cold start benchmarks." />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Projects</label>
                      <textarea rows={2} value={builderData.projects} onChange={(e) => setBuilderData({...builderData, projects: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="MentiTracker: Collaborative task metrics tracker scaling natively on container clusters." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] uppercase text-slate-400 block mb-1">Education</label>
                        <input value={builderData.education} onChange={(e) => setBuilderData({...builderData, education: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="B.S. Computer Science, Stanford (2022)" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400 block mb-1">Certifications</label>
                        <input value={builderData.certifications} onChange={(e) => setBuilderData({...builderData, certifications: e.target.value})} className="w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white" placeholder="AWS Solution Architect, GCP Developer" />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg text-xs text-white font-semibold transition-colors mt-2">Build & Analyze Resume</button>
                  </form>
                ) : (
                  <form onSubmit={handleFileUpload} className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1">File Name Identity</label>
                        <input 
                          value={uploadFileName}
                          onChange={(e) => setUploadFileName(e.target.value)}
                          className="w-full glass-card-inset/80 text-xs border border-pink-500/10 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1">Intake format</label>
                        <span className="bg-[#1a0516]/65 text-[11px] select-none text-pink-400 px-3 py-2 border border-pink-500/20 rounded-xl block font-bold font-mono">TEXT_PDF_DOCX</span>
                      </div>
                    </div>

                    {/* DRAG AND DROP AREA */}
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleFileDrop}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        isDragOver ? "bg-[#1a0516]/65/60 border-indigo-500/70" : "glass-card-inset/50 border-pink-500/10 hover:border-pink-500/20"
                      }`}
                    >
                      <Upload className="h-10 w-10 text-pink-400 mx-auto mb-3" />
                      <p className="text-xs font-semibold text-slate-200">Drag & Drop Your Resume Here</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Supports .txt, .pdf, .docx files or paste text below.</p>
                      
                      <div className="h-[1px] bg-[#1a0516]/65 my-4 max-w-xs mx-auto"></div>
                      <span className="text-[11px] font-bold text-pink-400 hover:underline">Or paste text below ↓</span>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold block uppercase tracking-widest text-slate-400 mb-1">Paste Resume Text</label>
                      <textarea 
                        rows={6}
                        required
                        value={uploadTextContent}
                        onChange={(e) => setUploadTextContent(e.target.value)}
                        placeholder="Paste your full resume text here — name, contact info, work experience, skills, education..."
                        className="w-full glass-card-inset text-xs font-mono p-3 border border-pink-500/10 focus:outline-none focus:border-indigo-500 rounded-xl text-slate-300 leading-relaxed"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4 text-sky-300" />
                      <span>🔍 Analyze My Resume</span>
                    </button>
                  </form>
                )}
              </div>

              {/* CANDIDATE LIST MATRIX FOR COMPILING & BATCH PROCESSING */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">Your Resumes</h3>
                    <p className="text-xs text-slate-400">You have {resumes.length} resume(s). Check boxes to compare candidates.</p>
                  </div>
                  <button 
                    onClick={runBatchAnalysis}
                    className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-lg shadow-pink-600/10"
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Compare Resumes</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumes.length === 0 ? (
                    <div className="col-span-full py-10 text-center border border-dashed border-pink-500/10 rounded-xl glass-card-inset/20">
                      <p className="text-slate-400 text-sm">No resumes yet. Upload a resume above or click "Try Demo" to explore.</p>
                    </div>
                  ) : (
                    resumes.map(r => {
                      const isChecked = selectedResumeIds.includes(r.id);
                      return (
                        <div key={r.id} className="glass-card-inset p-4 rounded-xl border border-pink-500/10 flex flex-col justify-between hover:border-pink-500/20 relative">
                          
                          {/* Checked badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-md ${getScoreColor(r.atsReport.score)}`}>
                              ATS {r.atsReport.score}
                            </span>
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleResumeSelection(r.id)}
                              className="h-4.5 w-4.5 rounded border-pink-500/10 text-indigo-600 focus:ring-0 cursor-pointer"
                              title="Select for comparison"
                            />
                          </div>

                          <div>
                            <p className="text-white font-bold text-sm leading-tight pr-14">{r.parsedData.fullName || r.fileName}</p>
                            <p className="text-[11px] text-slate-400 font-mono mt-1 mb-2 max-w-[200px] truncate">{r.parsedData.email || r.fileName}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {r.parsedData.skills.slice(0, 4).map((s, idx) => (
                                <span key={idx} className="bg-[#130310]/60 border border-purple-500/15 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono">{s}</span>
                              ))}
                              {r.parsedData.skills.length > 4 && (
                                <span className="text-[9px] text-pink-400 self-center font-mono font-bold">+{r.parsedData.skills.length - 4}</span>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-pink-500/10 pt-3 mt-1 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">Uploaded: {new Date(r.uploadedAt).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => { setActiveResume(r); setActiveTab("ats"); }}
                                className="px-2 py-1 text-[10px] font-bold text-pink-400 bg-pink-500/5 hover:from-pink-500 hover:to-purple-500/10 rounded-md transition-colors border border-pink-500/10"
                              >
                                View Analytics
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right side coaching and quick setup metrics */}
            <div className="flex flex-col gap-6">
              
              {/* SAAS PREMIUM CARD */}
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl"></div>
                <h4 className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest mb-1">Quick Tools</h4>
                <h3 className="text-lg font-extrabold text-white leading-tight">AI-Powered Career Tools</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Use these AI tools to boost your career.
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <button onClick={() => { setActiveTab("career"); }} className="p-3 w-full rounded-xl bg-[#130310]/60/60 border border-pink-500/10 hover:border-pink-500/20 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4.5 w-4.5 text-pink-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-pink-400">Roadmap / Skill Gap Analyzer</p>
                        <p className="text-[10px] text-slate-500">Plan milestones step-by-step</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("chatbot"); }} className="p-3 w-full rounded-xl bg-[#130310]/60/60 border border-pink-500/10 hover:border-pink-500/20 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4.5 w-4.5 text-fuchsia-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-pink-400">AI Career Coach</p>
                        <p className="text-[10px] text-slate-500">Instant feedback 24/7</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("interviews"); }} className="p-3 w-full rounded-xl bg-[#130310]/60/60 border border-pink-500/10 hover:border-pink-500/20 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <Video className="h-4.5 w-4.5 text-rose-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-pink-400">Mock Interview Station</p>
                        <p className="text-[10px] text-slate-500">Verify reply confidence levels</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("admin"); }} className="p-3 w-full rounded-xl bg-[#130310]/60/60 border border-purple-500/15 hover:border-pink-500/20 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4.5 w-4.5 text-emerald-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-pink-400 font-mono text-emerald-400">SysAdmin Core Trends</p>
                        <p className="text-[10px] text-slate-500">ATS database aggregates</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* DEMO VERIFICATION SEEDS PANEL */}
              <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3">
                <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Account Info</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your account details and verification status.
                </p>

                {currentUser && (
                  <div className="glass-card-inset p-3 rounded-xl border border-purple-500/15 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-white font-mono">{currentUser.email}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Status:</span>
                      {currentUser.isVerified ? (
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Verified ✓</span>
                      ) : (
                        <button 
                          onClick={async () => {
                            try {
                              const res = await fetch("/api/auth/verify-email", {
                                method: "POST",
                                headers: { "Authorization": `Bearer ${sessionToken}` }
                              });
                              const data = await res.json();
                              setCurrentUser({...currentUser, isVerified: true});
                              alert(data.message);
                            } catch (e) { console.error(e); }
                          }}
                          className="text-[10px] text-pink-400 hover:underline"
                        >
                          Simulate Verify Link
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------- 3. SCORES METERS VIEW ------------------- */}
        {activeTab === "ats" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            
            {/* Quick check header */}
            <div className="flex items-center justify-between border-b border-pink-500/10 pb-5 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab("dashboard")} 
                  className="px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-lg"
                >
                  Back to Hub
                </button>
                <div>
                  <h2 className="text-xl font-extrabold text-white">ATS Score Report</h2>
                  <p className="text-xs text-slate-400">Viewing: <span className="font-mono text-pink-400 font-semibold">{activeResume?.fileName || "Alex_Rivera_FullStack.pdf"}</span></p>
                </div>
              </div>

              {/* Selection switch dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Select Resume:</span>
                <select 
                  className="glass-card-inset border border-purple-500/15 px-3 py-1.5 rounded-lg text-xs font-mono text-white"
                  value={activeResume?.id || ""}
                  onChange={(e) => {
                    const matched = resumes.find(r => r.id === e.target.value);
                    if (matched) setActiveResume(matched);
                  }}
                >
                  {resumes.map(r => (
                    <option key={r.id} value={r.id}>{r.parsedData.fullName || r.fileName}</option>
                  ))}
                </select>
              </div>
            </div>

            {activeResume ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* ATS METERS CARDS */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* CENTRAL ATS SCORE DIAL */}
                  <div className="glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="text-center relative py-6 flex flex-col items-center justify-center">
                      
                      {/* Circular Gauge mockup container */}
                      <div className="relative h-40 w-40 flex items-center justify-center">
                        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            stroke="currentColor" 
                            strokeWidth="8" 
                            className={`${activeResume.atsReport.score >= 80 ? "text-pink-400" : "text-yellow-400"}`}
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * activeResume.atsReport.score) / 100}
                            fill="transparent" 
                          />
                        </svg>
                        <div className="text-center z-10">
                          <span className="text-4xl font-extrabold text-white font-mono leading-none">{activeResume.atsReport.score}</span>
                          <span className="text-xs text-slate-500 block font-mono mt-1">%</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${getScoreColor(activeResume.atsReport.score)}`}>
                          Grade: {activeResume.atsReport.gradeCategory}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Score Breakdown</h3>
                      
                      {/* Structure score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Structure</span>
                          <span>{activeResume.atsReport.structureScore}%</span>
                        </div>
                        <div className="w-full glass-card-inset h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style={{ width: `${activeResume.atsReport.structureScore}%` }}></div>
                        </div>
                      </div>

                      {/* Formatting score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Readability</span>
                          <span>{activeResume.atsReport.formattingScore}%</span>
                        </div>
                        <div className="w-full glass-card-inset h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full" style={{ width: `${activeResume.atsReport.formattingScore}%` }}></div>
                        </div>
                      </div>

                      {/* Keyword score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Keyword Density</span>
                          <span>{activeResume.atsReport.keywordDensity}%</span>
                        </div>
                        <div className="w-full glass-card-inset h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-full rounded-full" style={{ width: `${activeResume.atsReport.keywordDensity}%` }}></div>
                        </div>
                      </div>

                      {/* Skills score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Skills Match</span>
                          <span>{activeResume.atsReport.skillsMatch}%</span>
                        </div>
                        <div className="w-full glass-card-inset h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full" style={{ width: `${activeResume.atsReport.skillsMatch}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PARSED INTENSE DATA PREVIEW */}
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-6">
                    <div>
                      <h3 className="text-md font-bold text-white">Resume Details</h3>
                      <p className="text-xs text-slate-400 leading-tight">Information we extracted from your resume.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 glass-card-inset rounded-xl border border-purple-500/15">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Contact Info</span>
                        <p className="text-white font-bold text-sm mt-1">{activeResume.parsedData.fullName || "N/A"}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{activeResume.parsedData.email || "N/A"}</p>
                        <p className="text-xs text-slate-400 font-mono">{activeResume.parsedData.phone || "N/A"}</p>
                      </div>

                      <div className="p-3.5 glass-card-inset rounded-xl border border-purple-500/15">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Links</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">LinkedIn: {activeResume.parsedData.links.linkedin || "Not found"}</p>
                        <p className="text-xs text-slate-300 font-mono">GitHub: {activeResume.parsedData.links.github || "Not found"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase text-pink-400 tracking-wider mb-2">Work Experience</h4>
                      <div className="flex flex-col gap-3">
                        {activeResume.parsedData.experience.map((exp, idx) => (
                          <div key={idx} className="p-4 glass-card-inset/60 rounded-xl border border-purple-500/15">
                            <div className="flex justify-between items-start flex-wrap gap-1">
                              <span className="text-xs font-bold text-slate-200">{exp.role} @ {exp.company}</span>
                              <span className="text-[10px] font-mono text-slate-500">{exp.duration}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase text-pink-400 tracking-wider mb-2">Projects & Academic Metadata</h4>
                      <div className="flex flex-col gap-2">
                        {activeResume.parsedData.projects.map((proj, idx) => (
                          <div key={idx} className="p-3 glass-card-inset/25 border border-purple-500/15 rounded-lg">
                            <span className="text-xs text-white font-bold block">{proj.title}</span>
                            <div className="flex flex-wrap gap-1 my-1">
                              {proj.tech.map((t, tIdx) => (
                                <span key={tIdx} className="text-[9px] font-mono bg-[#130310]/60 border border-purple-500/15 text-pink-300 px-1 rounded">{t}</span>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI RESUME IMPROVEMENT SUGGESTIONS Column */}
                <div className="flex flex-col gap-6">
                  
                  {/* GITHUB PROFILE IMPROVEMENTS */}
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-pink-400" />
                      <span>AI Improvement engine</span>
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Targeted suggestions to excel against specialized parsing filters.</p>

                    <div className="flex flex-col gap-4">
                      
                      {/* Identified Missing Keywords */}
                      <div className="glass-card-inset p-3.5 rounded-xl border border-purple-500/15">
                        <span className="text-[10px] font-mono uppercase font-bold text-rose-400 block mb-2">Missing Priority Keywords</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeResume.atsReport.missingKeywords.map((k, idx) => (
                            <span key={idx} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-md font-mono">{k}</span>
                          ))}
                        </div>
                      </div>

                      {/* Suggested Rewrites */}
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block mb-2">Suggested Action Rewrites</span>
                        {activeResume.atsReport.suggestedRewrites.map((rew, idx) => (
                          <div key={idx} className="glass-card-inset p-3.5 rounded-xl border border-purple-500/15 flex flex-col gap-2 mb-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{rew.Section}</p>
                            <div className="text-[11px] leading-relaxed text-rose-400 line-through">
                              &ldquo;{rew.Before}&rdquo;
                            </div>
                            <div className="text-[11px] leading-relaxed text-emerald-400 font-medium">
                              &ldquo;{rew.After}&rdquo;
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action items roadmap */}
                      <div className="bg-pink-950/20 p-4 border border-pink-500/15 rounded-xl">
                        <span className="text-[10px] font-mono uppercase font-bold text-pink-400 block mb-2">Action Steps</span>
                        <ul className="text-xs text-slate-300 leading-relaxed space-y-2 list-decimal list-inside">
                          {activeResume.atsReport.improvementRoadmap.map((imp, idx) => (
                            <li key={idx}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* TEMPLATE DECORATION COMPILER */}
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3">
                    <span className="text-xs uppercase font-mono font-bold text-yellow-400 flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>ATS Friendly Layout Matching</span>
                    </span>
                    <p className="text-xs text-slate-400 leading-tight">These modern premium design layouts guarantee 100% scanner accessibility.</p>
                    
                    <div className="p-3 glass-card-inset border border-purple-500/15 rounded-xl">
                      <p className="text-xs font-bold text-white">Vercel Slate Minimalist</p>
                      <span className="text-[10px] text-slate-500 block font-mono">Recommend for: Software & Data Engineers</span>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-[10px] font-mono text-emerald-400">ATS compatible: 98%</span>
                        <button 
                          onClick={() => downloadCoverLetterText("Classic_Template", "Header layout specifications:\n- Single column structure\n- Times New Roman or Inter font family\n- Size 10-11 text")}
                          className="text-[10px] text-pink-400 hover:underline flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="py-20 text-center glass-panel glass-panel-hover rounded-3xl">
                <p className="text-slate-400">Please upload a resume first from the Dashboard.</p>
              </div>
            )}
          </div>
        )}

        {/* ------------------- 4. MULTI-RESUME COMPARE & LEADERBOARD ------------------- */}
        {activeTab === "leaderboard" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex items-center justify-between border-b border-pink-500/10 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white font-sans tracking-tight">Resume Comparison & Rankings</h2>
                <p className="text-xs text-slate-400">Upload multiple resumes to instantly compare candidates and find the best match.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab("landing")} className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-400 rounded-xl border border-white/8 flex items-center gap-1.5 transition-colors">
                  🏠 Home
                </button>
                <button onClick={() => setActiveTab("dashboard")} className="px-3.5 py-2 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-xl border border-pink-500/15">
                  Dashboard
                </button>
              </div>
            </div>

            {/* BATCH UPLOAD ZONE */}
            <div className="card p-6 flex flex-col gap-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">⚡ Direct Batch Upload & Ranking</h3>
                <p className="text-xs text-slate-400 mt-1">Select or drop multiple resume files to instantly parse, analyze, and compile candidate rankings.</p>
              </div>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleBatchFileDrop}
                className={`drop-zone flex flex-col items-center justify-center gap-4 py-8 border-2 border-dashed rounded-2xl transition-all ${
                  isDragOver 
                    ? "border-pink-500 bg-pink-500/10" 
                    : "border-slate-700 bg-[#16051c]/30 hover:border-pink-500/50 hover:bg-pink-500/5"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <Upload className="h-6 w-6 animate-bounce" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">Drag & Drop Resume Files Here</p>
                  <p className="text-xs text-slate-400 mt-1">Supports TXT, PDF, DOCX formats. Select multiple files together.</p>
                </div>
                <label className="btn-primary py-2 px-5 text-xs cursor-pointer inline-flex items-center gap-2">
                  <span>Select Files</span>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleBatchFileChange} 
                    className="hidden" 
                    accept=".txt,.pdf,.docx"
                  />
                </label>
              </div>
            </div>

            {batchLeaderboard.length === 0 ? (
              <div className="py-12 text-center card p-8 flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">No candidate rankings compiled yet</p>
                  <p className="text-xs text-slate-500 mt-1">Upload resumes above, or check resumes on the Dashboard and click "Compare Resumes".</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Sorted candidate board */}
                <div className="lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-mono font-bold text-pink-400 uppercase tracking-widest">🏆 Candidate Rankings</h3>
                  <span className="text-xs text-slate-500">{batchLeaderboard.length} candidates ranked</span>
                </div>
                  
                  <div className="flex flex-col gap-3">
                    {batchLeaderboard.map((item) => {
                      const medalEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : null;
                      const rankClass = item.rank === 1 ? 'rank-1' : item.rank === 2 ? 'rank-2' : item.rank === 3 ? 'rank-3' : '';
                      const atsColor = item.atsScore >= 85 ? 'text-emerald-400' : item.atsScore >= 65 ? 'text-yellow-400' : 'text-rose-400';
                      const atsBarColor = item.atsScore >= 85 ? 'progress-fill-green' : 'progress-fill';
                      const matchColor = item.jobMatch >= 80 ? 'text-emerald-400' : item.jobMatch >= 60 ? 'text-yellow-400' : 'text-slate-400';
                      return (
                        <div key={item.id} className={`rank-card p-5 animate-fade-up ${rankClass}`} style={{ animationDelay: `${(item.rank - 1) * 0.07}s` }}>
                          <div className="flex items-start gap-4 flex-wrap">
                            {/* Rank badge */}
                            <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[48px]">
                              {medalEmoji ? (
                                <span className="text-2xl">{medalEmoji}</span>
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold font-mono text-slate-400 text-sm">
                                  #{item.rank}
                                </div>
                              )}
                            </div>

                            {/* Name & roles */}
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-bold text-white leading-tight">{item.name}</p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-xs">{item.experienceRoles}</p>
                              
                              {/* Skills chips */}
                              {item.skills && item.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {item.skills.slice(0, 5).map((skill: string, si: number) => (
                                    <span key={si} className="skill-tag">{skill}</span>
                                  ))}
                                  {item.skills.length > 5 && (
                                    <span className="text-[10px] text-pink-400 self-center font-mono">+{item.skills.length - 5}</span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Scores */}
                            <div className="flex items-center gap-6 flex-shrink-0">
                              {/* ATS Score */}
                              <div className="text-right w-24">
                                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1">ATS Score</span>
                                <span className={`text-xl font-extrabold font-mono ${atsColor}`}>{item.atsScore}</span>
                                <div className="progress-track mt-1.5">
                                  <div className={atsBarColor} style={{ width: `${item.atsScore}%` }} />
                                </div>
                              </div>

                              {/* Job Match */}
                              <div className="text-right w-24">
                                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1">Job Match</span>
                                <span className={`text-xl font-extrabold font-mono ${matchColor}`}>{item.jobMatch}%</span>
                                <div className="progress-track mt-1.5">
                                  <div className="progress-fill-green" style={{ width: `${item.jobMatch}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Leaderboard insights & remedies */}
                <div className="flex flex-col gap-6">
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4">
                    <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest">AI Insights</h4>
                    
                    <div className="glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Top Candidate</span>
                      <p className="text-sm text-emerald-400 font-bold leading-tight">{batchInsights.topWinner}</p>
                    </div>

                    <div className="glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Needs Improvement</span>
                      <p className="text-sm text-rose-300 font-bold leading-tight">{batchInsights.weakWarning}</p>
                    </div>

                    <div className="p-4 bg-pink-950/20 text-xs border border-pink-500/15 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-pink-400 font-mono block mb-2">Recommendations</span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                        {batchInsights.remedySteps.map((step: string, idx: number) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ------------------- 5. JOB FINDER METRIC PANELS ------------------- */}
        {activeTab === "jobs" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex justify-between items-center border-b border-pink-500/10 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Job Search</h2>
                <p className="text-xs text-slate-400 font-mono">Browse job listings matched to your skills.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Filters Sidebar */}
              <div className="flex flex-col gap-6">
                
                {/* Search text match block */}
                <div className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col gap-4">
                  <span className="text-xs uppercase font-mono font-bold text-pink-400">Search Jobs</span>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Google, Programmer, Cloud..."
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                      className="w-full glass-card-inset text-xs border border-pink-500/10 rounded-xl pl-8 pr-3 py-2 focus:outline-none"
                    />
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.remote}
                        onChange={(e) => setJobFilters({...jobFilters, remote: e.target.checked})}
                        className="rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0"
                      />
                      <span>Remote only</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.hybrid}
                        onChange={(e) => setJobFilters({...jobFilters, hybrid: e.target.checked})}
                        className="rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0"
                      />
                      <span>Hybrid only</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.onsite}
                        onChange={(e) => setJobFilters({...jobFilters, onsite: e.target.checked})}
                        className="rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0"
                      />
                      <span>On-Site only</span>
                    </label>
                  </div>
                </div>

                {/* PROFILE MATCHED RECOMMENDATIONS */}
                <div className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col gap-4">
                  <span className="text-xs uppercase font-mono font-bold text-emerald-400">Recommended for You</span>
                  
                  <div className="flex flex-col gap-3">
                    {jobRecommendations.length === 0 ? (
                      <p className="text-xs text-slate-500">Upload a resume to see personalized recommendations.</p>
                    ) : (
                      jobRecommendations.map((r, idx) => (
                        <div key={idx} className="glass-card-inset p-3 rounded-xl border border-slate-855">
                          <p className="text-xs font-bold text-white leading-tight">{r.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{r.company} (Match Score: {r.matchScore}%)</p>
                          <a href={r.link} target="_blank" rel="noreferrer" className="text-[10px] text-pink-400 font-bold hover:underline flex items-center gap-1 mt-2">
                            <span>View Job</span>
                            <ExternalLink className="h-2 w-2" />
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Vacancy Center Listings */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                
                {/* VACANCY FEED LISTING */}
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4 border-b border-pink-500/10 pb-3">
                    <h3 className="text-sm font-mono font-bold text-pink-400 uppercase tracking-widest">Job Listings</h3>
                    <span className="text-xs text-slate-400">Found {vacancies.length} jobs</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacancies.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-500 text-xs">
                        No active match patterns aligned. Try adjusting filters or typing alternative criteria.
                      </div>
                    ) : (
                      vacancies.map(vac => (
                        <div key={vac.id} className="glass-card-inset p-4 rounded-xl border border-purple-500/15 hover:border-pink-500/10 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-pink-400 uppercase font-mono">{vac.source}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-bold bg-[#130310]/60 border border-purple-500/15 px-2 rounded-md">{vac.type}</span>
                            </div>

                            <p className="text-sm font-bold text-white mt-1 leading-tight">{vac.title}</p>
                            <p className="text-[11px] text-slate-400 font-semibold">{vac.company}</p>
                            
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-3 font-mono">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-600" /> {vac.location}</span>
                              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-slate-600" /> {vac.salary}</span>
                            </div>
                          </div>

                          <div className="border-t border-purple-500/15 pt-3 mt-3 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono">Experience: {vac.experience}</span>
                            <a 
                              href={vac.applyLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600/10 hover:bg-[#1a0516]/65 text-[10px] font-bold text-white rounded border border-pink-500/20"
                            >
                              Simulate Apply link
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* COMPANY RECOMMENDATION ENGINE CARDS */}
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest">Companies Hiring</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companies.map((c, idx) => (
                      <div key={idx} className="p-4 glass-card-inset rounded-xl border border-purple-500/15 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">{c.company}</p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-lg inline-block mt-1">Status: {c.hiringStatus}</span>
                          <span className="text-[11px] text-slate-400 block mt-2">Open Roles: {c.openRoles} Positions</span>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {c.targetSkills.map((s: string, sIdx: number) => (
                              <span key={sIdx} className="text-[9px] font-mono bg-[#130310]/60 text-slate-400 px-1.5 rounded">{s}</span>
                            ))}
                          </div>
                        </div>

                        <a href={c.careerPage} target="_blank" rel="noreferrer" className="text-[10px] text-pink-400 hover:underline flex items-center gap-1 mt-4">
                          <span>View Career profiles</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ------------------- 6. CAREER HUB, COVER LETTERS & PROFILES ------------------- */}
        {activeTab === "career" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex justify-between items-center border-b border-pink-500/10 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Career Tools</h2>
                <p className="text-xs text-slate-400 font-mono">Plan your career, write cover letters, and optimize your LinkedIn & GitHub.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Skill gap inputs */}
              <div className="flex flex-col gap-6">
                
                {/* ROADMAP TARGET FORM */}
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
                  <h3 className="text-sm font-mono font-bold text-pink-400 uppercase tracking-widest mb-3">Career Roadmap</h3>
                  <form onSubmit={handleRoadmapGeneration} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">Target Job Role</label>
                      <input 
                        required
                        value={targetRoleInput}
                        onChange={(e) => setTargetRoleInput(e.target.value)}
                        placeholder="Lead DevOps Architect"
                        className="w-full glass-card-inset text-xs text-white border border-pink-500/10 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">Your Current Skills</label>
                      <input 
                        required
                        value={currentSkillsInput}
                        onChange={(e) => setCurrentSkillsInput(e.target.value)}
                        placeholder="HTML, CSS, JavaScript"
                        className="w-full glass-card-inset text-xs text-white border border-pink-500/10 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white select-none transition-colors">
                      Evaluate Skill Gaps & Roadmap
                    </button>
                  </form>
                </div>

                {/* COVER LETTER TOOL */}
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
                  <h3 className="text-sm font-mono font-bold text-fuchsia-400 uppercase tracking-widest mb-3">Cover Letter Generator</h3>
                  <form onSubmit={handleCoverLetter} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Job Title You're Targeting</label>
                      <input required value={clRole} onChange={(e) => setClRole(e.target.value)} className="w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-white" />
                    </div>
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Company Name</label>
                      <input required value={clCompany} onChange={(e) => setClCompany(e.target.value)} className="w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-white" />
                    </div>
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Job Description</label>
                      <textarea rows={3} value={clJobDesc} onChange={(e) => setClJobDesc(e.target.value)} className="w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-slate-300" />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white transition-colors">Generate Letter</button>
                  </form>
                </div>
              </div>

              {/* Dynamic displays */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* DISPLAY ACTIVE SKILL GAP ROADMAP */}
                {activeRoadmap && (
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-5">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <h3 className="text-md font-bold text-white">Roadmap: {activeRoadmap.targetRole}</h3>
                        <p className="text-xs text-slate-400 leading-tight">Your personalized learning plan.</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 font-bold">Ready</span>
                    </div>

                    {/* Missing Skills block */}
                    <div className="glass-card-inset p-4 rounded-xl border border-purple-500/15">
                      <span className="text-[10px] uppercase font-bold text-rose-400 font-mono tracking-widest block mb-2">Skills to Learn</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeRoadmap.missingSkills.map((s: string, idx: number) => (
                          <span key={idx} className="bg-rose-500/15 text-rose-300 text-xs font-mono px-2.5 py-0.5 rounded border border-rose-500/25">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 30-60-90 DAYS LAYOUT */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 glass-card-inset rounded-xl border border-purple-500/15">
                        <span className="text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3">Month 1: Getting Started</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan30Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 glass-card-inset rounded-xl border border-purple-500/15">
                        <span className="text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3">Month 2: Building Skills</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan60Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 glass-card-inset rounded-xl border border-purple-500/15">
                        <span className="text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3">Month 3: Going Pro</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan90Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Resources clickable links */}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2 font-bold">Learning Resources</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {activeRoadmap.roadmap.learningResources.map((res: any, idx: number) => (
                          <a key={idx} href={res.url} target="_blank" rel="noreferrer" className="p-3 glass-card-inset hover:bg-[#130310]/60 rounded-lg border border-purple-500/15 text-left block">
                            <span className="text-[11px] font-bold text-white block truncate leading-tight">{res.name}</span>
                            <span className="text-[10px] text-pink-400 font-mono mt-1 inline-block">{res.type}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* DISPLAY ACTIVE COVER LETTER */}
                {generatedCl && (
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-indigo-950/40 pb-3">
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{generatedCl.title}</span>
                      <button 
                        onClick={() => downloadCoverLetterText(generatedCl.title, generatedCl.content)}
                        className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-300 bg-[#1a0516]/65 rounded flex items-center gap-1 hover:text-white"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download Letter</span>
                      </button>
                    </div>

                    <p className="glass-card-inset p-4 border border-purple-500/15 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
                      {generatedCl.content}
                    </p>
                  </div>
                )}

                {/* PROFILE OPTIMIZER FORM */}
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4">
                  <div className="border-b border-pink-500/10 pb-2">
                    <h3 className="text-sm font-mono font-bold text-yellow-500 uppercase tracking-widest">LinkedIn & GitHub Optimizer</h3>
                    <p className="text-xs text-slate-400">Improve your online profiles to get more views.</p>
                  </div>

                  <form onSubmit={handleProfileOptimize} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200">
                        <input type="radio" checked={optProvider === "linkedin"} onChange={() => setOptProvider("linkedin")} name="optProv" className="text-indigo-600 glass-card-inset border-purple-500/15" />
                        <span>LinkedIn</span>
                      </label>
                      <label className="flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200">
                        <input type="radio" checked={optProvider === "github"} onChange={() => setOptProvider("github")} name="optProv" className="text-indigo-600 glass-card-inset border-purple-500/15" />
                        <span>GitHub</span>
                      </label>
                    </div>

                    <textarea 
                      rows={2}
                      required
                      value={optContent}
                      onChange={(e) => setOptContent(e.target.value)}
                      placeholder="My Headline: Software developer looking for jobs. Bio: I build apps."
                      className="w-full glass-card-inset text-xs border border-pink-500/10 p-3 rounded-xl focus:border-indigo-500"
                    />

                    <button type="submit" className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20 text-xs rounded-lg transition-colors select-none self-start">
                      Calculate parameters
                    </button>
                  </form>

                  {optResult && (
                    <div className="glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">Improved Headline</span>
                        <p className="text-xs text-white font-bold font-mono mt-0.5 leading-tight">{optResult.headline}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-fuchsia-400 tracking-wider">Improved Bio</span>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-mono">{optResult.summary}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Action Steps</span>
                        <ul className="text-xs text-slate-400 space-y-1 mt-1 list-disc list-inside">
                          {optResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ------------------- 7. AI INTERVIEWS & MOCK FEEDBACK ------------------- */}
        {activeTab === "interviews" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex justify-between items-center border-b border-pink-500/10 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Interview Practice</h2>
                <p className="text-xs text-slate-400 font-mono">Practice answering interview questions with AI feedback.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form trigger panel */}
              <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-mono font-bold text-pink-400 uppercase tracking-widest">Interview Settings</h3>
                
                <div>
                  <label className="text-[10px] block uppercase font-bold text-slate-500 mb-1">Job Role</label>
                  <input value={interviewRole} onChange={(e) => setInterviewRole(e.target.value)} className="w-full glass-card-inset text-xs text-white border border-pink-500/10 p-2 rounded-xl focus:border-indigo-500" />
                </div>

                <div>
                  <label className="text-[10px] block uppercase font-bold text-slate-500 mb-1">Your Tech Skills</label>
                  <input value={interviewSkills} onChange={(e) => setInterviewSkills(e.target.value)} className="w-full glass-card-inset text-xs text-white border border-pink-500/10 p-2 rounded-xl font-mono focus:border-indigo-500" />
                </div>

                <button onClick={loadInterviewQuestions} className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white">
                  Instantiate Question Stream
                </button>
              </div>

              {/* Central question feed */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {activeInterview.length > 0 ? (
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-5">
                    
                    {/* Header metrics */}
                    <div className="flex justify-between items-center border-b border-pink-500/10 pb-3">
                      <span className="text-xs font-bold text-rose-400 uppercase font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        Category: {activeInterview[currentQuestionIndex]?.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">Question {currentQuestionIndex + 1} / 5</span>
                    </div>

                    {/* Display active question */}
                    <div className="glass-card-inset p-5 rounded-2xl border border-purple-500/15">
                      <p className="text-sm font-bold text-white leading-relaxed">{activeInterview[currentQuestionIndex]?.question}</p>
                    </div>

                    {/* Text Answer input block */}
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">Your Answer</label>
                      <textarea 
                        rows={5}
                        required
                        value={userAnswerInput}
                        onChange={(e) => setUserAnswerInput(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full glass-card-inset text-xs p-3 border border-purple-500/15 rounded-xl text-slate-300 focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={evaluateMockAnswer}
                        disabled={isEvaluatingMock}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl text-xs font-bold text-white"
                      >
                        {isEvaluatingMock ? "Evaluating confidence level..." : "Evaluate answer"}
                      </button>

                      {currentQuestionIndex < 4 ? (
                        <button 
                          onClick={() => {
                            setCurrentQuestionIndex(prev => prev + 1);
                            setUserAnswerInput("");
                            setMockFeedback(null);
                          }}
                          className="px-4 py-2 bg-[#20071c]/70 hover:bg-[#1a0516]/65 text-xs font-bold text-white rounded-xl"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setActiveInterview([]);
                            alert("Thank you for completing the comprehensive AI Mock Interview run! Check admin tab to inspect details.");
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-xs font-bold text-white rounded-xl"
                        >
                          Finish Session
                        </button>
                      )}
                    </div>

                    {/* CRITIQUE DISPLAY DIALOG */}
                    {mockFeedback && (
                      <div className="glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">Your Score</span>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Confidence</span>
                            <span className="text-sm font-mono text-emerald-400 font-bold">{mockFeedback.metrics.confidence}%</span>
                          </div>
                          <div className="bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Relevance</span>
                            <span className="text-sm font-mono text-emerald-400 font-bold">{mockFeedback.metrics.relevance}%</span>
                          </div>
                          <div className="bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Communication</span>
                            <span className="text-sm font-mono text-fuchsia-400 font-bold">{mockFeedback.metrics.communication}%</span>
                          </div>
                          <div className="bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Overall</span>
                            <span className="text-sm font-mono text-pink-400 font-bold">{mockFeedback.metrics.overall}%</span>
                          </div>
                        </div>

                        <div className="border-t border-pink-500/10 pt-3">
                          <span className="text-[9px] uppercase font-bold text-slate-500">Coach Feedback</span>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed font-mono">{mockFeedback.critique}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-24 text-center glass-panel glass-panel-hover rounded-3xl">
                    <p className="text-slate-400">Set your job role and skills on the left, then click 'Start Interview' to launch interview mockup.</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ------------------- 8. AI CAREER COACH CHATBOT (THREAD PERSIST) ------------------- */}
        {activeTab === "chatbot" && (
          <div className="max-w-4xl mx-auto w-full px-6 py-8 flex flex-col gap-6 flex-1">
            <div className="border-b border-pink-500/10 pb-3">
              <h2 className="text-xl font-bold text-white">AI Career Coach</h2>
              <p className="text-xs text-slate-400 leading-tight">Ask anything about your career, resume, or interview prep.</p>
            </div>

            <div className="bg-[#130310]/60 border border-purple-500/15 rounded-2xl flex flex-col h-[520px] overflow-hidden">
              
              {/* Message scroll viewport */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {chatMessages.map((msg, idx) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col max-w-lg ${
                        isUser ? "self-end align-right" : "self-start align-left"
                      }`}
                    >
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest ml-2 mb-1">
                        {isUser ? "Candidate Player" : "SaaS AI Coach"}
                      </span>
                      <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                        isUser 
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-none" 
                          : "glass-card-inset text-slate-200 rounded-tl-none border border-purple-500/15"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form input dock */}
              <form onSubmit={handleSendChatMessage} className="p-4 glass-card-inset border-t border-pink-500/10 flex gap-3">
                <input 
                  type="text"
                  required
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything — How do I improve my ATS score?"
                  className="flex-1 glass-panel glass-panel-hover px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button type="submit" className="p-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white transition-all">
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- 9. ADMIN SYSTEM CONSOLE & ANALYTICS ------------------- */}
        {activeTab === "admin" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex justify-between items-center border-b border-pink-500/10 pb-5 flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white font-mono text-pink-400 uppercase tracking-widest">Analytics Overview</h2>
                <p className="text-xs text-slate-400">Usage stats and skill trends across all resumes.</p>
              </div>
              <button onClick={() => setActiveTab("dashboard")} className="px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-lg">
                Back Dashboard
              </button>
            </div>

            {/* Quick tally stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 glass-panel rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Total Users</span>
                <span className="text-3xl font-extrabold text-white font-mono block mt-1">{stats.totalUsers}</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5">● Active</span>
              </div>

              <div className="p-5 glass-panel rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Resumes Uploaded</span>
                <span className="text-3xl font-extrabold text-pink-400 font-mono block mt-1">{stats.totalResumes}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Total uploads</span>
              </div>

              <div className="p-5 glass-panel rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">ATS Scans Done</span>
                <span className="text-3xl font-extrabold text-fuchsia-400 font-mono block mt-1">{stats.totalATSAnalyses}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Scans completed</span>
              </div>
            </div>

            {/* CHARTS GRAPH DATA VISUALIZATION SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Popular skills and demands */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">In-Demand Skills</h3>
                
                <div className="flex flex-col gap-3">
                  {analyticsData.skillDemand.map((sd, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-1 font-mono">
                        <span>{sd.name}</span>
                        <span>{sd.demand}% Demand Rating</span>
                      </div>
                      <div className="w-full glass-card-inset h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style={{ width: `${sd.demand}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Quality Trends graph mockup */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Monthly Score Trends</h3>
                  <p className="text-xs text-slate-500">Average resume quality over time.</p>
                </div>

                {/* SVG Visual graph bar */}
                <div className="h-44 w-full flex items-end justify-between gap-2 glass-card-inset p-4 rounded-xl border border-purple-500/15">
                  {analyticsData.qualityTrends.map((qt, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[9px] font-mono text-pink-400 font-semibold">{qt.avgScore}</div>
                      <div 
                        className="w-full bg-pink-500/80 hover:bg-pink-400 transition-all rounded-t" 
                        style={{ height: `${qt.avgScore * 1.2}px` }}
                      ></div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1">{qt.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        </main>

        {/* ------------------- FOOTER SYSTEM RAILS ------------------- */}
        {!isSidebarLayout && (
          <footer className="bg-[#0a0108] border-t border-pink-500/10 px-6 py-6 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span>&copy; 2026 AI Resume Intelligence Platform. Manufactured in sandbox cluster.</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <span>v2.4.0</span>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
}
