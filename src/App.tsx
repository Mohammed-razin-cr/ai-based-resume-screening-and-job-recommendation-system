import React, { useState, useEffect, useRef } from "react";
import {
  FileText, Upload, Sparkles, AlertTriangle, CheckCircle, TrendingUp, BarChart3,
  Search, Briefcase, MapPin, DollarSign, ExternalLink, RefreshCw, Trophy, Users,
  MessageSquare, BookOpen, Layers, Award, User, HelpCircle, ArrowRight, Video,
  X, Play, Edit3, Key, Mail, ShieldAlert, ChevronRight, LogOut, FileCode, Check, Send, Download
} from "lucide-react";

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
    setActionMessage({ type: "info", text: "Analyzing resume against over 2,000 ATS keyword patterns..." });

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

      setActionMessage({ type: "success", text: "Resume uploaded & parsed perfectly! Opening deep report." });
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
    if (score >= 80) return "text-teal-400 bg-teal-500/10 border-teal-500/20";
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* ------------------- NOTIFICATION TOAST BAR ------------------- */}
      {actionMessage.text && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-xl animate-bounce flex items-center gap-3 max-w-md ${
          actionMessage.type === "error" 
            ? "bg-rose-950/90 border-rose-500/30 text-rose-200" 
            : actionMessage.type === "success"
            ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
            : "bg-indigo-950/90 border-indigo-500/30 text-indigo-200"
        }`}>
          {actionMessage.type === "error" ? <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400" /> : <Sparkles className="h-5 w-5 shrink-0 text-indigo-400" />}
          <div className="text-sm font-medium">{actionMessage.text}</div>
        </div>
      )}

      {/* ------------------- HEADER BRAND RAILS ------------------- */}
      <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Resume Intelligence
            </span>
            <span className="text-xs block text-slate-400 font-mono">ATS ENGINE PRO</span>
          </div>
        </div>

        {/* Global Key status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300">
          <Key className="h-3.5 w-3.5 text-indigo-400" />
          <span>Core AI:</span>
          {secretsConfig.hasKey ? (
            <span className="text-emerald-400 font-semibold">Gemini 3.5 Active</span>
          ) : (
            <span className="text-slate-400">Standard Matcher</span>
          )}
        </div>

        <nav className="flex items-center gap-3">
          {currentUser ? (
            <>
              <button 
                onClick={() => { setActiveTab("dashboard"); fetchStats(); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "dashboard" ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-300 hover:text-white"
                }`}
              >
                My Console
              </button>
              
              <button 
                onClick={() => setActiveTab("ats")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "ats" ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-300 hover:text-white"
                }`}
              >
                Scores
              </button>

              <button 
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "jobs" ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-300 hover:text-white"
                }`}
              >
                Jobs
              </button>

              <div className="h-6 w-[1px] bg-slate-800 mx-1"></div>

              {/* User badge */}
              <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 pl-3 pr-2 py-1 rounded-xl">
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                  alt="Avatar" 
                  className="h-7 w-7 rounded-lg object-cover" 
                />
                <span className="text-xs text-slate-200 font-medium hidden md:inline">{currentUser.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
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
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => setAuthMode("register")}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all font-medium shadow-md shadow-indigo-600/15"
              >
                Register
              </button>
              <button 
                onClick={loginDemoAccount}
                className="px-3.5 py-2 text-sm text-indigo-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-semibold"
              >
                Try Demo
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* ------------------- AUTHENTICATION DIALOG (GLASS PRESENCE) ------------------- */}
      {authMode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 text-center bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500"></div>
            
            <button 
              onClick={() => setAuthMode(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
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
                  AI Resume Intelligence Enterprise SSO Pipeline
                </p>
              </div>

              {authStatus.message && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                  authStatus.type === "error" 
                    ? "bg-rose-500/10 text-rose-300 border-rose-500/20" 
                    : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                }`}>
                  {authStatus.message}
                </div>
              )}

              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email coordinate</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="alex.rivera@techflow.io"
                  className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {authMode !== "forgot" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}

              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Confirm Password</label>
                  <input 
                    type="password" 
                    required
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors text-sm shadow-lg shadow-indigo-600/30"
              >
                {authMode === "login" && "Authenticate Access"}
                {authMode === "register" && "Create Candidate Account"}
                {authMode === "forgot" && "Recover Security Credentials"}
              </button>

              <div className="flex items-center justify-between mt-2 text-xs font-medium">
                {authMode === "login" ? (
                  <>
                    <button type="button" onClick={() => { setAuthMode("forgot"); setAuthStatus({type:"",message:""}); }} className="text-slate-400 hover:text-white">Forgot password?</button>
                    <button type="button" onClick={() => { setAuthMode("register"); setAuthStatus({type:"",message:""}); }} className="text-indigo-400 hover:text-white">Create an account</button>
                  </>
                ) : (
                  <button type="button" onClick={() => { setAuthMode("login"); setAuthStatus({type:"",message:""}); }} className="text-indigo-400 hover:text-white w-full text-center">Already signed up? Log In</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------- MAIN AREA ------------------- */}
      <main className="flex-1 w-full flex flex-col">
        {isLoading && (
          <div className="py-4 bg-slate-800/30 border-b border-slate-800 flex items-center justify-center gap-3">
            <RefreshCw className="h-5 w-5 text-indigo-400 animate-spin" />
            <span className="text-sm text-slate-300 font-mono">Running high-performance cloud compilation engines...</span>
          </div>
        )}

        {/* ------------------- 1. LANDING PAGE VIEW ------------------- */}
        {activeTab === "landing" && (
          <div className="flex flex-col">
            {/* HERO HERO SECTION */}
            <section className="relative overflow-hidden px-6 lg:px-24 py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
              <div className="absolute top-0 left-1/4 h-72 w-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 h-80 w-80 bg-sky-500/10 rounded-full blur-3xl"></div>

              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs text-indigo-400 font-semibold mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>The Next Generation ATS Analytics Protocol</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
                  Resume Screening, <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    Elevated by AI
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
                  Analyze resumes, calculate ATS scores, discover jobs, identify skill gaps, generate interview questions, and accelerate your career with AI.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {currentUser ? (
                    <button 
                      onClick={() => setActiveTab("dashboard")}
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 mr-2"
                    >
                      Enter Console Dashboard
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setAuthMode("register")}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/30"
                      >
                        Create Account
                      </button>
                      <button 
                        onClick={loginDemoAccount}
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-all border border-slate-700/80"
                      >
                        Try Demo Dashboard
                      </button>
                    </>
                  )}
                </div>

                {/* Features list bullet layout banner */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-16 lg:mt-24 border-t border-slate-800/80 pt-10 text-center">
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">ATS Optimization</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">AI Career Coach</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">Resume Builder</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">Job Matching</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">Interview AI</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/10 border border-slate-800/30">
                    <p className="text-white font-semibold text-sm">Skill Roadmap</p>
                  </div>
                </div>
              </div>
            </section>

            {/* PLATFORM OVERVIEW & DEMO HERO MOCK */}
            <section className="px-6 lg:px-24 py-16 bg-slate-950 border-t border-slate-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-white">Full-Stack Capability Overview</h2>
                  <p className="text-slate-400 mt-2 max-w-lg mx-auto">Explore the tools requested for high-performance job processing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Deep ATS Analysis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Evaluate structural compatibility, keyword density, and overall industry alignment out of 100 on multi-page files instantly.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Batch Benchmarking</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Upload up to 50 resumes simultaneously to build sorted leaderboards and identify top matches for open roles.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Video className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">AI Mock Interview</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Interactive voice mock mode evaluates communication, tech confidence, and content relevance to accelerate confidence in interviews.
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
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Parser Intake Hub</h2>
                    <p className="text-xs text-slate-400">Intest resumes for deep NLP structure indexing.</p>
                  </div>
                  <button 
                    onClick={() => setIsBuildingResume(true)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-indigo-400 rounded-lg flex items-center gap-1 border border-slate-700"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Dynamic Builder</span>
                  </button>
                </div>

                {isBuildingResume ? (
                  <form onSubmit={triggerDynamicResumeBuilder} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-indigo-950/40 pb-2">
                      <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Construct Pro-Formatted Info</h4>
                      <button type="button" onClick={() => setIsBuildingResume(false)} className="text-slate-400 hover:text-white text-xs">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Candidate Name</label>
                        <input required value={builderData.fullName} onChange={(e) => setBuilderData({...builderData, fullName: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="Alex Rivera" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Target Role</label>
                        <input required value={builderData.targetRole} onChange={(e) => setBuilderData({...builderData, targetRole: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="Lead Full Stack Architect" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Email Address</label>
                        <input type="email" required value={builderData.email} onChange={(e) => setBuilderData({...builderData, email: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="alex@techflow.io" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400">Phone</label>
                        <input required value={builderData.phone} onChange={(e) => setBuilderData({...builderData, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="+1 555-019-2834" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Keywords / Skills (Comma Separated)</label>
                      <textarea required rows={2} value={builderData.skills} onChange={(e) => setBuilderData({...builderData, skills: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white font-mono" placeholder="React, Node.js, TypeScript, PostgreSQL, Docker, Kubernetes, AWS" />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Work History Recap</label>
                      <textarea required rows={2} value={builderData.experience} onChange={(e) => setBuilderData({...builderData, experience: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="Senior React developer at Netflix. Engineered high-efficiency UI components improving page cold start benchmarks." />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-slate-400 block mb-1">Projects Portfolio</label>
                      <textarea rows={2} value={builderData.projects} onChange={(e) => setBuilderData({...builderData, projects: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="MentiTracker: Collaborative task metrics tracker scaling natively on container clusters." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] uppercase text-slate-400 block mb-1">Education</label>
                        <input value={builderData.education} onChange={(e) => setBuilderData({...builderData, education: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="B.S. Computer Science, Stanford (2022)" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-slate-400 block mb-1">Certifications</label>
                        <input value={builderData.certifications} onChange={(e) => setBuilderData({...builderData, certifications: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-white" placeholder="AWS Solution Architect, GCP Developer" />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs text-white font-semibold transition-colors mt-2">Build & Import into Dashboard</button>
                  </form>
                ) : (
                  <form onSubmit={handleFileUpload} className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1">File Name Identity</label>
                        <input 
                          value={uploadFileName}
                          onChange={(e) => setUploadFileName(e.target.value)}
                          className="w-full bg-slate-950/80 text-xs border border-slate-800 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1">Intake format</label>
                        <span className="bg-slate-800 text-[11px] select-none text-indigo-400 px-3 py-2 border border-slate-700 rounded-xl block font-bold font-mono">TEXT_PDF_DOCX</span>
                      </div>
                    </div>

                    {/* DRAG AND DROP AREA */}
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleFileDrop}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        isDragOver ? "bg-slate-800/60 border-indigo-500/70" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <Upload className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
                      <p className="text-xs font-semibold text-slate-200">Drag & Drop Resume text or file here</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Accepts standard resume copy, system details, markdown formats.</p>
                      
                      <div className="h-[1px] bg-slate-800 my-4 max-w-xs mx-auto"></div>
                      <span className="text-[11px] font-bold text-indigo-400 hover:underline">Browse text copy method instead</span>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold block uppercase tracking-widest text-slate-400 mb-1">Paste Raw Transcript (Or extracted text)</label>
                      <textarea 
                        rows={6}
                        required
                        value={uploadTextContent}
                        onChange={(e) => setUploadTextContent(e.target.value)}
                        placeholder="Alex Rivera | Software Engineer | Email: alex@techflow.io | Skills: HTML, CSS, React, TypeScript..."
                        className="w-full bg-slate-950 text-xs font-mono p-3 border border-slate-800 focus:outline-none focus:border-indigo-500 rounded-xl text-slate-300 leading-relaxed"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4 text-sky-300" />
                      <span>Instantiate Analytical Scan</span>
                    </button>
                  </form>
                )}
              </div>

              {/* CANDIDATE LIST MATRIX FOR COMPILING & BATCH PROCESSING */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">Parser Intake Catalog</h3>
                    <p className="text-xs text-slate-400">Total resumes compiled: {resumes.length}. Select target items to trigger compares.</p>
                  </div>
                  <button 
                    onClick={runBatchAnalysis}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-lg shadow-indigo-600/15"
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Run Batch Leaderboard Board</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumes.length === 0 ? (
                    <div className="col-span-full py-10 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                      <p className="text-slate-400 text-sm">No resumes parsed yet. Upload standard text files above, or click 'Try Demo'.</p>
                    </div>
                  ) : (
                    resumes.map(r => {
                      const isChecked = selectedResumeIds.includes(r.id);
                      return (
                        <div key={r.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 relative">
                          
                          {/* Checked badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-md ${getScoreColor(r.atsReport.score)}`}>
                              ATS {r.atsReport.score}
                            </span>
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleResumeSelection(r.id)}
                              className="h-4.5 w-4.5 rounded border-slate-800 text-indigo-600 focus:ring-0 cursor-pointer"
                              title="Select for comparison"
                            />
                          </div>

                          <div>
                            <p className="text-white font-bold text-sm leading-tight pr-14">{r.parsedData.fullName || r.fileName}</p>
                            <p className="text-[11px] text-slate-400 font-mono mt-1 mb-2 max-w-[200px] truncate">{r.parsedData.email || r.fileName}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {r.parsedData.skills.slice(0, 4).map((s, idx) => (
                                <span key={idx} className="bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono">{s}</span>
                              ))}
                              {r.parsedData.skills.length > 4 && (
                                <span className="text-[9px] text-indigo-400 self-center font-mono font-bold">+{r.parsedData.skills.length - 4}</span>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-slate-800/80 pt-3 mt-1 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">Uploaded: {new Date(r.uploadedAt).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => { setActiveResume(r); setActiveTab("ats"); }}
                                className="px-2 py-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 rounded-md transition-colors border border-indigo-500/10"
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
              <div className="bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl"></div>
                <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-1">Career Copilot Hub</h4>
                <h3 className="text-lg font-extrabold text-white leading-tight">Elevate with Specialized Instruments</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Toggle on-demand generators developed dynamically to assist with professional transitions.
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <button onClick={() => { setActiveTab("career"); }} className="p-3 w-full rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4.5 w-4.5 text-indigo-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-indigo-400">Roadmap / Skill Gap Analyzer</p>
                        <p className="text-[10px] text-slate-500">Plan milestones step-by-step</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("chatbot"); }} className="p-3 w-full rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4.5 w-4.5 text-sky-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-indigo-400">AI Career Coach Thread</p>
                        <p className="text-[10px] text-slate-500">Instant feedback 24/7</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("interviews"); }} className="p-3 w-full rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <Video className="h-4.5 w-4.5 text-rose-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-indigo-400">Mock Interview Station</p>
                        <p className="text-[10px] text-slate-500">Verify reply confidence levels</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>

                  <button onClick={() => { setActiveTab("admin"); }} className="p-3 w-full rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-700 text-left flex items-center justify-between transition-all group">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4.5 w-4.5 text-emerald-400" />
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-indigo-400 font-mono text-emerald-400">SysAdmin Core Trends</p>
                        <p className="text-[10px] text-slate-500">ATS database aggregates</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* DEMO VERIFICATION SEEDS PANEL */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
                <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Interactive Verification Info</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verify or reset profile parameters directly to evaluate dynamic layout updates.
                </p>

                {currentUser && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">SSO Email Coordinate:</span>
                      <span className="text-white font-mono">{currentUser.email}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Verification state:</span>
                      {currentUser.isVerified ? (
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Verified Code</span>
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
                          className="text-[10px] text-indigo-400 hover:underline"
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab("dashboard")} 
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg"
                >
                  Back to Hub
                </button>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Advanced ATS Score Meter</h2>
                  <p className="text-xs text-slate-400">Active Resume: <span className="font-mono text-indigo-400 font-semibold">{activeResume?.fileName || "Alex_Rivera_FullStack.pdf"}</span></p>
                </div>
              </div>

              {/* Selection switch dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Intest Resume Profile:</span>
                <select 
                  className="bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-xs font-mono text-white"
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
                  <div className="bg-slate-900 border border-slate-805 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
                            className={`${activeResume.atsReport.score >= 80 ? "text-indigo-400" : "text-yellow-400"}`}
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * activeResume.atsReport.score) / 100}
                            fill="transparent" 
                          />
                        </svg>
                        <div className="text-center z-10">
                          <span className="text-4xl font-extrabold text-white font-mono leading-none">{activeResume.atsReport.score}</span>
                          <span className="text-xs text-slate-500 block font-mono mt-1">PERCENT</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${getScoreColor(activeResume.atsReport.score)}`}>
                          Grade: {activeResume.atsReport.gradeCategory}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Score Metrics breakdown</h3>
                      
                      {/* Structure score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Aesthetic Structure Compatibility</span>
                          <span>{activeResume.atsReport.structureScore}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${activeResume.atsReport.structureScore}%` }}></div>
                        </div>
                      </div>

                      {/* Formatting score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Scanner Readability Indexes</span>
                          <span>{activeResume.atsReport.formattingScore}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-sky-400 h-full rounded-full" style={{ width: `${activeResume.atsReport.formattingScore}%` }}></div>
                        </div>
                      </div>

                      {/* Keyword score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Target Keyword Density</span>
                          <span>{activeResume.atsReport.keywordDensity}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-400 h-full rounded-full" style={{ width: `${activeResume.atsReport.keywordDensity}%` }}></div>
                        </div>
                      </div>

                      {/* Skills score */}
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Skills Match Accuracy</span>
                          <span>{activeResume.atsReport.skillsMatch}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${activeResume.atsReport.skillsMatch}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PARSED INTENSE DATA PREVIEW */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
                    <div>
                      <h3 className="text-md font-bold text-white">Parsed Metadata Representation</h3>
                      <p className="text-xs text-slate-400 leading-tight">These parameters are extracted sequentially by our parsing engine.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Candidate Coordinates</span>
                        <p className="text-white font-bold text-sm mt-1">{activeResume.parsedData.fullName || "N/A"}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{activeResume.parsedData.email || "N/A"}</p>
                        <p className="text-xs text-slate-400 font-mono">{activeResume.parsedData.phone || "N/A"}</p>
                      </div>

                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Integrated Links</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">LinkedIn: {activeResume.parsedData.links.linkedin || "No trace found."}</p>
                        <p className="text-xs text-slate-300 font-mono">GitHub: {activeResume.parsedData.links.github || "No trace found."}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-2">Detailed Work History</h4>
                      <div className="flex flex-col gap-3">
                        {activeResume.parsedData.experience.map((exp, idx) => (
                          <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-850">
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
                      <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-2">Projects & Academic Metadata</h4>
                      <div className="flex flex-col gap-2">
                        {activeResume.parsedData.projects.map((proj, idx) => (
                          <div key={idx} className="p-3 bg-slate-950/25 border border-slate-850 rounded-lg">
                            <span className="text-xs text-white font-bold block">{proj.title}</span>
                            <div className="flex flex-wrap gap-1 my-1">
                              {proj.tech.map((t, tIdx) => (
                                <span key={tIdx} className="text-[9px] font-mono bg-slate-900 border border-slate-850 text-indigo-300 px-1 rounded">{t}</span>
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
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <span>AI Improvement engine</span>
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Targeted suggestions to excel against specialized parsing filters.</p>

                    <div className="flex flex-col gap-4">
                      
                      {/* Identified Missing Keywords */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
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
                          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex flex-col gap-2 mb-2">
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
                      <div className="bg-indigo-950/20 p-4 border border-indigo-500/15 rounded-xl">
                        <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 block mb-2">Remedial Action Steps</span>
                        <ul className="text-xs text-slate-300 leading-relaxed space-y-2 list-decimal list-inside">
                          {activeResume.atsReport.improvementRoadmap.map((imp, idx) => (
                            <li key={idx}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* TEMPLATE DECORATION COMPILER */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
                    <span className="text-xs uppercase font-mono font-bold text-yellow-400 flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>ATS Friendly Layout Matching</span>
                    </span>
                    <p className="text-xs text-slate-400 leading-tight">These modern premium design layouts guarantee 100% scanner accessibility.</p>
                    
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                      <p className="text-xs font-bold text-white">Vercel Slate Minimalist</p>
                      <span className="text-[10px] text-slate-500 block font-mono">Recommend for: Software & Data Engineers</span>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-[10px] font-mono text-emerald-400">ATS compatible: 98%</span>
                        <button 
                          onClick={() => downloadCoverLetterText("Vercel_Slate_Template", "Header layout specifications:\n- Single column structure\n- Times New Roman or Inter font family\n- Size 10-11 text")}
                          className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Fetch Spec</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="py-20 text-center bg-slate-900 border border-slate-800 rounded-3xl">
                <p className="text-slate-400">Please select an active resume first on your primary console dashboard.</p>
              </div>
            )}
          </div>
        )}

        {/* ------------------- 4. MULTI-RESUME COMPARE & LEADERBOARD ------------------- */}
        {activeTab === "leaderboard" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Resume Comparison Leaderboard</h2>
                <p className="text-xs text-slate-400">Side-by-side metric comparison charts for multiple candidate uploads.</p>
              </div>
              <button onClick={() => setActiveTab("dashboard")} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-xl">
                Close Benchmark
              </button>
            </div>

            {batchLeaderboard.length === 0 ? (
              <div className="py-20 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 mb-4">Please select target resumes from the Parser intake catalog block to run rankings.</p>
                <button onClick={() => setActiveTab("dashboard")} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs text-white">Choose Resumes</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Sorted candidate board */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4">Ranked Candidates List</h3>
                  
                  <div className="flex flex-col gap-3">
                    {batchLeaderboard.map((item) => (
                      <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-855 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold font-mono text-slate-400">
                            #{item.rank}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{item.name}</p>
                            <span className="text-xs text-slate-500 font-mono italic max-w-sm block truncate">{item.experienceRoles}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">ATS SCORE</span>
                            <span className="text-lg font-extrabold text-indigo-400 font-mono">{item.atsScore}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">JOB MATCH</span>
                            <span className="text-lg font-extrabold text-emerald-400 font-mono">{item.jobMatch}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard insights & remedies */}
                <div className="flex flex-col gap-6">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                    <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest">Coaching Insights Overview</h4>
                    
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Strongest Candidate</span>
                      <p className="text-sm text-emerald-400 font-bold leading-tight">{batchInsights.topWinner}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Weak Candidate recommendation</span>
                      <p className="text-sm text-rose-300 font-bold leading-tight">{batchInsights.weakWarning}</p>
                    </div>

                    <div className="p-4 bg-indigo-950/20 text-xs border border-indigo-500/15 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono block mb-2">Remedial layout guidance</span>
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Job Finder Engine</h2>
                <p className="text-xs text-slate-400 font-mono">Simulate vacancy matching streams from LinkedIn, Naukri, Indeed, Internshala.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Filters Sidebar */}
              <div className="flex flex-col gap-6">
                
                {/* Search text match block */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
                  <span className="text-xs uppercase font-mono font-bold text-indigo-400">Search keywords</span>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Google, Programmer, Cloud..."
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                      className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl pl-8 pr-3 py-2 focus:outline-none"
                    />
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.remote}
                        onChange={(e) => setJobFilters({...jobFilters, remote: e.target.checked})}
                        className="rounded bg-slate-950 border-slate-850 text-indigo-600 focus:ring-0"
                      />
                      <span>Only remote roles</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.hybrid}
                        onChange={(e) => setJobFilters({...jobFilters, hybrid: e.target.checked})}
                        className="rounded bg-slate-950 border-slate-850 text-indigo-600 focus:ring-0"
                      />
                      <span>Only hybrid roles</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={jobFilters.onsite}
                        onChange={(e) => setJobFilters({...jobFilters, onsite: e.target.checked})}
                        className="rounded bg-slate-950 border-slate-850 text-indigo-600 focus:ring-0"
                      />
                      <span>Only On-Site roles</span>
                    </label>
                  </div>
                </div>

                {/* PROFILE MATCHED RECOMMENDATIONS */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
                  <span className="text-xs uppercase font-mono font-bold text-emerald-400">Your AI Recommended Roles</span>
                  
                  <div className="flex flex-col gap-3">
                    {jobRecommendations.length === 0 ? (
                      <p className="text-xs text-slate-500">Matches populate after you upload/parse a resume profile.</p>
                    ) : (
                      jobRecommendations.map((r, idx) => (
                        <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-855">
                          <p className="text-xs font-bold text-white leading-tight">{r.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{r.company} (Match Score: {r.matchScore}%)</p>
                          <a href={r.link} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-400 font-bold hover:underline flex items-center gap-1 mt-2">
                            <span>Open career details</span>
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
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest">Live vacancies search feeds</h3>
                    <span className="text-xs text-slate-400">Found {vacancies.length} live matches</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacancies.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-500 text-xs">
                        No active match patterns aligned. Try adjusting filters or typing alternative criteria.
                      </div>
                    ) : (
                      vacancies.map(vac => (
                        <div key={vac.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-slate-800 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-indigo-400 uppercase font-mono">{vac.source}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-bold bg-slate-900 border border-slate-850 px-2 rounded-md">{vac.type}</span>
                            </div>

                            <p className="text-sm font-bold text-white mt-1 leading-tight">{vac.title}</p>
                            <p className="text-[11px] text-slate-400 font-semibold">{vac.company}</p>
                            
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-3 font-mono">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-600" /> {vac.location}</span>
                              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-slate-600" /> {vac.salary}</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-850 pt-3 mt-3 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-mono">XP criteria: {vac.experience}</span>
                            <a 
                              href={vac.applyLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="px-3 py-1 bg-indigo-600/10 hover:bg-slate-800 text-[10px] font-bold text-white rounded border border-indigo-500/20"
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
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest">Suggested Companies actively hiring</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companies.map((c, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">{c.company}</p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-lg inline-block mt-1">Status: {c.hiringStatus}</span>
                          <span className="text-[11px] text-slate-400 block mt-2">Open Roles: {c.openRoles} Positions</span>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {c.targetSkills.map((s: string, sIdx: number) => (
                              <span key={sIdx} className="text-[9px] font-mono bg-slate-900 text-slate-400 px-1.5 rounded">{s}</span>
                            ))}
                          </div>
                        </div>

                        <a href={c.careerPage} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1 mt-4">
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Career Growth Hub</h2>
                <p className="text-xs text-slate-400 font-mono">Calculate skill gaps, compile beautiful cover letters, and optimize social metrics.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Skill gap inputs */}
              <div className="flex flex-col gap-6">
                
                {/* ROADMAP TARGET FORM */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest mb-3">Define target path</h3>
                  <form onSubmit={handleRoadmapGeneration} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">Target Professional Role</label>
                      <input 
                        required
                        value={targetRoleInput}
                        onChange={(e) => setTargetRoleInput(e.target.value)}
                        placeholder="Lead DevOps Architect"
                        className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">My Current Skills Stock</label>
                      <input 
                        required
                        value={currentSkillsInput}
                        onChange={(e) => setCurrentSkillsInput(e.target.value)}
                        placeholder="HTML, CSS, JavaScript"
                        className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white select-none transition-colors">
                      Evaluate Skill Gaps & Roadmap
                    </button>
                  </form>
                </div>

                {/* COVER LETTER TOOL */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-sm font-mono font-bold text-sky-400 uppercase tracking-widest mb-3">AI Cover Letter Builder</h3>
                  <form onSubmit={handleCoverLetter} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Target Role</label>
                      <input required value={clRole} onChange={(e) => setClRole(e.target.value)} className="w-full bg-slate-950 text-xs rounded-xl border border-slate-800 p-2 text-white" />
                    </div>
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Company Name</label>
                      <input required value={clCompany} onChange={(e) => setClCompany(e.target.value)} className="w-full bg-slate-950 text-xs rounded-xl border border-slate-800 p-2 text-white" />
                    </div>
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400">Open Job specs Criteria</label>
                      <textarea rows={3} value={clJobDesc} onChange={(e) => setClJobDesc(e.target.value)} className="w-full bg-slate-950 text-xs rounded-xl border border-slate-800 p-2 text-slate-300" />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white transition-colors">Generate Cover Letter</button>
                  </form>
                </div>
              </div>

              {/* Dynamic displays */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* DISPLAY ACTIVE SKILL GAP ROADMAP */}
                {activeRoadmap && (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-5">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <h3 className="text-md font-bold text-white">Target Career Path: {activeRoadmap.targetRole}</h3>
                        <p className="text-xs text-slate-400 leading-tight">Calculated roadmap milestones based on current skill vectors.</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 font-bold">Intake compiled</span>
                    </div>

                    {/* Missing Skills block */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-rose-400 font-mono tracking-widest block mb-2">Identified Skill Gaps</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeRoadmap.missingSkills.map((s: string, idx: number) => (
                          <span key={idx} className="bg-rose-500/15 text-rose-300 text-xs font-mono px-2.5 py-0.5 rounded border border-rose-500/25">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* 30-60-90 DAYS LAYOUT */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="text-[11px] font-mono leading-none font-bold text-indigo-400 block mb-3">DAYS 1-30: Initial foundation</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan30Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="text-[11px] font-mono leading-none font-bold text-indigo-400 block mb-3">DAYS 31-60: Implementation</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan60Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="text-[11px] font-mono leading-none font-bold text-indigo-400 block mb-3">DAYS 61-90: Deployment test</span>
                        <ul className="text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5">
                          {activeRoadmap.roadmap.plan90Days.map((task: string, idx: number) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Resources clickable links */}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2 font-bold">Suggested Education Resources</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {activeRoadmap.roadmap.learningResources.map((res: any, idx: number) => (
                          <a key={idx} href={res.url} target="_blank" rel="noreferrer" className="p-3 bg-slate-950 hover:bg-slate-900 rounded-lg border border-slate-850 text-left block">
                            <span className="text-[11px] font-bold text-white block truncate leading-tight">{res.name}</span>
                            <span className="text-[10px] text-indigo-400 font-mono mt-1 inline-block">{res.type}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* DISPLAY ACTIVE COVER LETTER */}
                {generatedCl && (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-indigo-950/40 pb-3">
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{generatedCl.title}</span>
                      <button 
                        onClick={() => downloadCoverLetterText(generatedCl.title, generatedCl.content)}
                        className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-300 bg-slate-800 rounded flex items-center gap-1 hover:text-white"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download Letter</span>
                      </button>
                    </div>

                    <p className="bg-slate-950 p-4 border border-slate-850 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
                      {generatedCl.content}
                    </p>
                  </div>
                )}

                {/* PROFILE OPTIMIZER FORM */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-mono font-bold text-yellow-500 uppercase tracking-widest">LinkedIn / GitHub optimization suite</h3>
                    <p className="text-xs text-slate-400">Revamp profiles to double candidate views.</p>
                  </div>

                  <form onSubmit={handleProfileOptimize} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200">
                        <input type="radio" checked={optProvider === "linkedin"} onChange={() => setOptProvider("linkedin")} name="optProv" className="text-indigo-600 bg-slate-950 border-slate-850" />
                        <span>LinkedIn profile</span>
                      </label>
                      <label className="flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200">
                        <input type="radio" checked={optProvider === "github"} onChange={() => setOptProvider("github")} name="optProv" className="text-indigo-600 bg-slate-950 border-slate-850" />
                        <span>GitHub summary</span>
                      </label>
                    </div>

                    <textarea 
                      rows={2}
                      required
                      value={optContent}
                      onChange={(e) => setOptContent(e.target.value)}
                      placeholder="My Headline: Software developer looking for jobs. Bio: I build apps."
                      className="w-full bg-slate-950 text-xs border border-slate-800 p-3 rounded-xl focus:border-indigo-500"
                    />

                    <button type="submit" className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20 text-xs rounded-lg transition-colors select-none self-start">
                      Calculate parameters
                    </button>
                  </form>

                  {optResult && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Optimized Headline Title</span>
                        <p className="text-xs text-white font-bold font-mono mt-0.5 leading-tight">{optResult.headline}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">Aesthetic Summary Bio</span>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-mono">{optResult.summary}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Remedial Action Steps</span>
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">AI Interview & Mock evaluator</h2>
                <p className="text-xs text-slate-400 font-mono">Verify tech competency in real-time answering simulated question streams.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form trigger panel */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest">Setup Interview Profile</h3>
                
                <div>
                  <label className="text-[10px] block uppercase font-bold text-slate-500 mb-1">Target professional role</label>
                  <input value={interviewRole} onChange={(e) => setInterviewRole(e.target.value)} className="w-full bg-slate-950 text-xs text-white border border-slate-800 p-2 rounded-xl focus:border-indigo-500" />
                </div>

                <div>
                  <label className="text-[10px] block uppercase font-bold text-slate-500 mb-1">Technical Stack Skills</label>
                  <input value={interviewSkills} onChange={(e) => setInterviewSkills(e.target.value)} className="w-full bg-slate-950 text-xs text-white border border-slate-800 p-2 rounded-xl font-mono focus:border-indigo-500" />
                </div>

                <button onClick={loadInterviewQuestions} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white">
                  Instantiate Question Stream
                </button>
              </div>

              {/* Central question feed */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {activeInterview.length > 0 ? (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-5">
                    
                    {/* Header metrics */}
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold text-rose-400 uppercase font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        Category: {activeInterview[currentQuestionIndex]?.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">Question {currentQuestionIndex + 1} of 5</span>
                    </div>

                    {/* Display active question */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850">
                      <p className="text-sm font-bold text-white leading-relaxed">{activeInterview[currentQuestionIndex]?.question}</p>
                    </div>

                    {/* Text Answer input block */}
                    <div>
                      <label className="text-[10px] block uppercase font-bold text-slate-400 mb-1">Dictate or write response answer</label>
                      <textarea 
                        rows={5}
                        required
                        value={userAnswerInput}
                        onChange={(e) => setUserAnswerInput(e.target.value)}
                        placeholder="I utilize Virtual DOM on react components to batch lifecycle repaints..."
                        className="w-full bg-slate-950 text-xs p-3 border border-slate-850 rounded-xl text-slate-300 focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={evaluateMockAnswer}
                        disabled={isEvaluatingMock}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white"
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
                          className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-xs font-bold text-white rounded-xl"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setActiveInterview([]);
                            alert("Thank you for completing the comprehensive AI Mock Interview run! Check admin tab to inspect details.");
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl"
                        >
                          Finish Session
                        </button>
                      )}
                    </div>

                    {/* CRITIQUE DISPLAY DIALOG */}
                    {mockFeedback && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">AI Mock evaluation report</span>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Confidence</span>
                            <span className="text-sm font-mono text-emerald-400 font-bold">{mockFeedback.metrics.confidence}%</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Relevance</span>
                            <span className="text-sm font-mono text-emerald-400 font-bold">{mockFeedback.metrics.relevance}%</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Communication</span>
                            <span className="text-sm font-mono text-sky-400 font-bold">{mockFeedback.metrics.communication}%</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                            <span className="text-[9px] uppercase block font-bold text-slate-400">Overall</span>
                            <span className="text-sm font-mono text-indigo-400 font-bold">{mockFeedback.metrics.overall}%</span>
                          </div>
                        </div>

                        <div className="border-t border-slate-800/80 pt-3">
                          <span className="text-[9px] uppercase font-bold text-slate-500">Tutor Critique & Better Suggested Phrasing</span>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed font-mono">{mockFeedback.critique}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-slate-900 border border-slate-800 rounded-3xl">
                    <p className="text-slate-400">Align your target professional roles on the left panel & click 'Instantiate Question Stream' to launch interview mockup.</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ------------------- 8. AI CAREER COACH CHATBOT (THREAD PERSIST) ------------------- */}
        {activeTab === "chatbot" && (
          <div className="max-w-4xl mx-auto w-full px-6 py-8 flex flex-col gap-6 flex-1">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-white">AI Career Coach Thread</h2>
              <p className="text-xs text-slate-400 leading-tight">24/7 NLP AI consultant powered by Google Gemini heuristics.</p>
            </div>

            <div className="bg-slate-900 border border-slate-850 rounded-2xl flex flex-col h-[520px] overflow-hidden">
              
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
                          ? "bg-indigo-600 text-white rounded-tr-none" 
                          : "bg-slate-950 text-slate-200 rounded-tl-none border border-slate-850"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form input dock */}
              <form onSubmit={handleSendChatMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
                <input 
                  type="text"
                  required
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="How can I improve my structural coordinate rating?"
                  className="flex-1 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all">
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- 9. ADMIN SYSTEM CONSOLE & ANALYTICS ------------------- */}
        {activeTab === "admin" && (
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1">
            <div className="flex justify-between items-center border-b border-slate-800 pb-5 flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white font-mono text-indigo-400 uppercase tracking-widest">SysAdmin Console Metrics</h2>
                <p className="text-xs text-slate-400">Calculated database row aggregations and overall analytics demand trends.</p>
              </div>
              <button onClick={() => setActiveTab("dashboard")} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg">
                Back Dashboard
              </button>
            </div>

            {/* Quick tally stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-900 border border-slate-805 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Aggregated System Users</span>
                <span className="text-3xl font-extrabold text-white font-mono block mt-1">{stats.totalUsers}</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5">● Active Session state verified</span>
              </div>

              <div className="p-5 bg-slate-900 border border-slate-805 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Total Parsed Index Resumes</span>
                <span className="text-3xl font-extrabold text-indigo-400 font-mono block mt-1">{stats.totalResumes}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Mock files and seeding files</span>
              </div>

              <div className="p-5 bg-slate-900 border border-slate-805 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">ATS Scans Executed</span>
                <span className="text-3xl font-extrabold text-sky-400 font-mono block mt-1">{stats.totalATSAnalyses}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Output parameters calculated</span>
              </div>
            </div>

            {/* CHARTS GRAPH DATA VISUALIZATION SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Popular skills and demands */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Most Searched Industry Skills Demand</h3>
                
                <div className="flex flex-col gap-3">
                  {analyticsData.skillDemand.map((sd, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-1 font-mono">
                        <span>{sd.name}</span>
                        <span>{sd.demand}% Demand Rating</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${sd.demand}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Quality Trends graph mockup */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Monthly Average Resume Score Trends</h3>
                  <p className="text-xs text-slate-500">Calculated composite index trends on active months.</p>
                </div>

                {/* SVG Visual graph bar */}
                <div className="h-44 w-full flex items-end justify-between gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                  {analyticsData.qualityTrends.map((qt, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[9px] font-mono text-indigo-400 font-semibold">{qt.avgScore}</div>
                      <div 
                        className="w-full bg-indigo-500/80 hover:bg-indigo-400 transition-all rounded-t" 
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
      <footer className="bg-slate-950 border-t border-slate-850 px-6 py-6 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span>&copy; 2026 AI Resume Intelligence Platform. Manufactured in sandbox cluster.</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span>Enterprise edition v2.4.0</span>
          <span>● Pipeline: cloud-run-standard</span>
        </div>
      </footer>

    </div>
  );
}
