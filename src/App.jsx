import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { FileText, Upload, Sparkles, BarChart3, Search, Briefcase, MapPin, DollarSign, ExternalLink, Trophy, Users, MessageSquare, BookOpen, Layers, Award, Video, X, Edit3, Key, ShieldAlert, ChevronRight, LogOut, Check, Send, Download, Palette } from "lucide-react";
// ── Animated Background Particles ──────────────────────────────────────
function AnimatedBackground() {
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${8 + (i * 5.1) % 84}%`,
        top: `${10 + (i * 7.7) % 78}%`,
        delay: `${(i * 0.35) % 4}s`,
        size: `${6 + (i % 4) * 2}px`,
        color: ['#ff99cc', '#7bbbff', '#ffcc99', '#99ffcc'][i % 4],
    }));
    return (_jsxs("div", { className: "fixed inset-0 pointer-events-none overflow-hidden z-[-1] animated-bg", children: [_jsx("div", { className: "bg-flow bg-flow-mint" }), _jsx("div", { className: "bg-flow bg-flow-sky" }), _jsx("div", { className: "bg-flow bg-flow-peach" }), _jsx("div", { className: "bg-scan-grid" }), particles.map(p => (_jsx("div", { className: "absolute hatch-confetti", style: {
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    animationDelay: p.delay,
                } }, p.id))), _jsx("div", { className: "absolute left-[4%] bottom-[12%] h-16 w-28 hatch-swash opacity-70" }), _jsx("div", { className: "absolute right-[8%] top-[18%] h-12 w-24 hatch-swash hatch-swash-pink opacity-60" })] }));
}
// ── Animated 3D Orb ─────────────────────────────────────────────────────
function Animated3DOrb() {
    return (_jsxs("div", { className: "hatch-illustration relative select-none", children: [_jsxs("svg", { viewBox: "0 0 360 320", width: "360", height: "320", role: "img", "aria-label": "Playful resume screening illustration", children: [_jsx("defs", { children: _jsxs("filter", { id: "roughPaper", children: [_jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.02", numOctaves: "2", result: "noise" }), _jsx("feDisplacementMap", { in: "SourceGraphic", in2: "noise", scale: "1.2" })] }) }), _jsx("rect", { x: "18", y: "38", width: "282", height: "222", rx: "18", fill: "#f5f4f0", stroke: "#000", strokeWidth: "2", filter: "url(#roughPaper)" }), _jsx("path", { d: "M66 92 C116 120 144 158 178 174", fill: "none", stroke: "#ffcc99", strokeWidth: "4", strokeLinecap: "round" }), _jsx("path", { d: "M70 206 C118 182 144 164 178 174", fill: "none", stroke: "#7bbbff", strokeWidth: "4", strokeLinecap: "round" }), _jsx("path", { d: "M252 92 C220 122 202 150 178 174", fill: "none", stroke: "#ff99cc", strokeWidth: "4", strokeLinecap: "round" }), _jsx("path", { d: "M254 216 C222 198 202 184 178 174", fill: "none", stroke: "#99ffcc", strokeWidth: "4", strokeLinecap: "round" }), [{ x: 64, y: 92, t: 'ATS' }, { x: 64, y: 206, t: 'CV' }, { x: 252, y: 92, t: 'JOB' }, { x: 252, y: 216, t: 'AI' }].map((n) => (_jsxs("g", { children: [_jsx("rect", { x: n.x - 28, y: n.y - 18, width: "56", height: "36", rx: "14", fill: "#fff", stroke: "#000", strokeWidth: "2" }), _jsx("text", { x: n.x, y: n.y + 5, textAnchor: "middle", fontSize: "13", fontWeight: "700", fill: "#000", children: n.t })] }, n.t))), _jsxs("g", { className: "hatch-play", children: [_jsx("circle", { cx: "178", cy: "174", r: "42", fill: "#99ffcc", stroke: "#000", strokeWidth: "2.5" }), _jsx("path", { d: "M166 152 L204 174 L166 196 Z", fill: "#000" })] }), _jsxs("g", { className: "hatch-mascot", children: [_jsx("path", { d: "M258 196 C303 176 344 198 344 239 C344 278 307 298 268 282 L239 300 L248 268 C222 235 229 208 258 196 Z", fill: "#7bbbff", stroke: "#000", strokeWidth: "2.5" }), _jsx("path", { d: "M252 225 C246 206 257 191 277 187", fill: "none", stroke: "#ff99cc", strokeWidth: "9", strokeLinecap: "round" }), _jsx("path", { d: "M317 190 C337 194 347 211 340 231", fill: "none", stroke: "#ff99cc", strokeWidth: "9", strokeLinecap: "round" }), _jsx("circle", { cx: "278", cy: "239", r: "4", fill: "#000" }), _jsx("path", { d: "M308 236 C316 230 325 232 330 240", fill: "none", stroke: "#000", strokeWidth: "3", strokeLinecap: "round" }), _jsx("path", { d: "M286 260 C297 269 312 269 324 258", fill: "none", stroke: "#000", strokeWidth: "3", strokeLinecap: "round" })] }), _jsx("circle", { cx: "38", cy: "42", r: "6", fill: "#ff99cc" }), _jsx("circle", { cx: "318", cy: "70", r: "8", fill: "#ffcc99" }), _jsx("circle", { cx: "310", cy: "286", r: "6", fill: "#99ffcc" })] }), _jsxs("div", { className: "absolute top-5 right-0 hatch-stat-chip animate-fade-in", style: { animationDelay: '0.2s' }, children: [_jsx("span", { children: "ATS Score" }), "92/100"] }), _jsxs("div", { className: "absolute bottom-7 left-0 hatch-stat-chip hatch-stat-chip-peach animate-fade-in", style: { animationDelay: '0.5s' }, children: [_jsx("span", { children: "Match Rate" }), "87%"] })] }));
}
export default function App() {
    // Theme state with localStorage persistence
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('ats-theme');
        return saved || 'hatch';
    });
    // Update localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('ats-theme', theme);
    }, [theme]);
    // Session / Authentication state
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionToken, setSessionToken] = useState(null);
    const [authMode, setAuthMode] = useState(null);
    const [authName, setAuthName] = useState("");
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authConfirmPassword, setAuthConfirmPassword] = useState("");
    const [authStatus, setAuthStatus] = useState({ type: "", message: "" });
    // Core database items loaded from API
    const [resumes, setResumes] = useState([]);
    const [activeResume, setActiveResume] = useState(null);
    const [selectedResumeIds, setSelectedResumeIds] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 1247,
        totalResumes: 3892,
        totalATSAnalyses: 5120,
        mostCommonSkills: [
            { name: "React", count: 1240 },
            { name: "JavaScript", count: 980 },
            { name: "TypeScript", count: 850 },
            { name: "Node.js", count: 720 },
            { name: "Tailwind CSS", count: 680 }
        ],
        mostRecommendedJobs: [
            { name: "Frontend Developer", count: 480 },
            { name: "Full Stack Developer", count: 390 },
            { name: "Backend Developer", count: 280 }
        ],
        userActivity: [
            { day: "Mon", count: 850 },
            { day: "Tue", count: 920 },
            { day: "Wed", count: 1050 },
            { day: "Thu", count: 880 },
            { day: "Fri", count: 720 },
            { day: "Sat", count: 450 },
            { day: "Sun", count: 380 }
        ]
    });
    const [analyticsData, setAnalyticsData] = useState({
        scoreCategories: [
            { name: "Excellent (90-100)", value: 1200 },
            { name: "Good (70-89)", value: 2100 },
            { name: "Average (50-69)", value: 1400 },
            { name: "Needs Improvement (<50)", value: 420 }
        ],
        skillDemand: [
            { name: "React", demand: 95 },
            { name: "TypeScript", demand: 90 },
            { name: "Node.js", demand: 85 },
            { name: "Cloud (AWS/GCP)", demand: 82 },
            { name: "System Design", demand: 78 }
        ],
        qualityTrends: [
            { month: "Jan", avgScore: 68 },
            { month: "Feb", avgScore: 72 },
            { month: "Mar", avgScore: 75 },
            { month: "Apr", avgScore: 78 },
            { month: "May", avgScore: 82 },
            { month: "Jun", avgScore: 85 }
        ]
    });
    // UI state
    const [activeTab, setActiveTab] = useState("landing");
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
    const [vacancies, setVacancies] = useState([
        {
            id: "vac-1",
            source: "LinkedIn",
            title: "Senior Frontend Engineer",
            company: "Vercel",
            location: "San Francisco, CA",
            salary: "$150k - $200k",
            experience: "5+ years",
            type: "Remote",
            applyLink: "https://vercel.com/careers"
        },
        {
            id: "vac-2",
            source: "Indeed",
            title: "Full Stack Developer",
            company: "Linear",
            location: "New York, NY",
            salary: "$130k - $180k",
            experience: "3+ years",
            type: "Hybrid",
            applyLink: "https://linear.app/careers"
        },
        {
            id: "vac-3",
            source: "Glassdoor",
            title: "Product Designer",
            company: "Figma",
            location: "Remote",
            salary: "$120k - $160k",
            experience: "4+ years",
            type: "Remote",
            applyLink: "https://figma.com/careers"
        },
        {
            id: "vac-4",
            source: "AngelList",
            title: "Backend Engineer",
            company: "Stripe",
            location: "San Francisco, CA",
            salary: "$160k - $220k",
            experience: "6+ years",
            type: "On-site",
            applyLink: "https://stripe.com/jobs"
        }
    ]);
    const [jobRecommendations, setJobRecommendations] = useState([
        { title: "React Developer", company: "Vercel", matchScore: 92, link: "https://vercel.com/careers" },
        { title: "Full Stack Engineer", company: "Linear", matchScore: 88, link: "https://linear.app/careers" },
        { title: "Frontend Engineer", company: "Figma", matchScore: 85, link: "https://figma.com/careers" }
    ]);
    const [companies, setCompanies] = useState([
        { company: "Vercel", hiringStatus: "Hiring", openRoles: 12, targetSkills: ["React", "TypeScript", "Next.js"], careerPage: "https://vercel.com/careers" },
        { company: "Linear", hiringStatus: "Hiring", openRoles: 8, targetSkills: ["React", "GraphQL", "TypeScript"], careerPage: "https://linear.app/careers" },
        { company: "Stripe", hiringStatus: "Hiring", openRoles: 24, targetSkills: ["React", "Node.js", "TypeScript"], careerPage: "https://stripe.com/jobs" },
        { company: "Figma", hiringStatus: "Hiring", openRoles: 15, targetSkills: ["React", "WebGL", "Design Systems"], careerPage: "https://figma.com/careers" }
    ]);
    const [jobFilters, setJobFilters] = useState({ remote: false, hybrid: false, onsite: false });
    // Batch analysis state
    const [batchLeaderboard, setBatchLeaderboard] = useState([]);
    const [batchInsights, setBatchInsights] = useState({ topWinner: "", weakWarning: "", remedySteps: [] });
    // Career roadmap state
    const [targetRoleInput, setTargetRoleInput] = useState("Full Stack Developer");
    const [currentSkillsInput, setCurrentSkillsInput] = useState("HTML, CSS, JavaScript");
    const [activeRoadmap, setActiveRoadmap] = useState(null);
    // Cover letter generator state
    const [clRole, setClRole] = useState("Full Stack Engineer");
    const [clCompany, setClCompany] = useState("Linear");
    const [clJobDesc, setClJobDesc] = useState("Build premium Glassmorphic application using React.");
    const [generatedCl, setGeneratedCl] = useState(null);
    // Profile Optimizer state
    const [optProvider, setOptProvider] = useState("linkedin");
    const [optContent, setOptContent] = useState("I build beautiful web experiences occasionally coding python scripts.");
    const [optResult, setOptResult] = useState(null);
    // Chatbot state
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState([
        { sender: "coach", text: "Hello! I am your 24/7 AI Career Coach. Ask me how to increase your ATS rating, optimize your skills, or prepare for interviews!" }
    ]);
    // Interview Center state
    const [interviewRole, setInterviewRole] = useState("Full Stack Engineer");
    const [interviewSkills, setInterviewSkills] = useState("React, Tailwind, Node.js");
    const [activeInterview, setActiveInterview] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswerInput, setUserAnswerInput] = useState("");
    const [isEvaluatingMock, setIsEvaluatingMock] = useState(false);
    const [mockFeedback, setMockFeedback] = useState(null);
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
            setActiveTab("career");
        }
        else {
            // Auto-login demo user for immediate UI visibility
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
            setActiveTab("career");
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
        }
        catch (e) {
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
            setStats({
                totalUsers: sData?.totalUsers ?? 0,
                totalResumes: sData?.totalResumes ?? 0,
                totalATSAnalyses: sData?.totalATSAnalyses ?? 0,
                mostCommonSkills: Array.isArray(sData?.mostCommonSkills) ? sData.mostCommonSkills : [],
                mostRecommendedJobs: Array.isArray(sData?.mostRecommendedJobs) ? sData.mostRecommendedJobs : [],
                userActivity: Array.isArray(sData?.userActivity) ? sData.userActivity : []
            });
            setAnalyticsData({
                scoreCategories: Array.isArray(tData?.scoreCategories) ? tData.scoreCategories : [],
                skillDemand: Array.isArray(tData?.skillDemand) ? tData.skillDemand : [],
                qualityTrends: Array.isArray(tData?.qualityTrends) ? tData.qualityTrends : []
            });
        }
        catch (e) {
            console.error(e);
        }
    };
    const fetchResumes = async (token) => {
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
        }
        catch (e) {
            console.error(e);
        }
    };
    const fetchVacancies = async () => {
        try {
            const query = new URLSearchParams();
            if (jobFilters.remote)
                query.append("remote", "true");
            if (jobFilters.hybrid)
                query.append("hybrid", "true");
            if (jobFilters.onsite)
                query.append("onsite", "true");
            if (jobSearch)
                query.append("search", jobSearch);
            const res = await fetch(`/api/jobs/vacancies?${query.toString()}`);
            const data = await res.json();
            setVacancies(data.vacancies || []);
        }
        catch (e) {
            console.error(e);
        }
    };
    const fetchRecommendations = async (token) => {
        try {
            const activeTok = token || sessionToken || "";
            const res = await fetch("/api/jobs/recommendations", {
                headers: { "Authorization": `Bearer ${activeTok}` }
            });
            const data = await res.json();
            setJobRecommendations(data.recommendations || []);
        }
        catch (e) {
            console.error(e);
        }
    };
    const fetchCompanies = async () => {
        try {
            const res = await fetch("/api/jobs/companies");
            const data = await res.json();
            setCompanies(data.companies || []);
        }
        catch (e) {
            console.error(e);
        }
    };
    // Trigger search whenever search query or filters change
    useEffect(() => {
        fetchVacancies();
    }, [jobSearch, jobFilters]);
    // Handle Authentication submit
    const handleAuth = async (e) => {
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
                if (!res.ok)
                    throw new Error(data.error || "Failed registration");
                setAuthStatus({ type: "success", message: data.message });
                setTimeout(() => setAuthMode("login"), 2000);
            }
            else if (authMode === "login") {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: authEmail, password: authPassword })
                });
                const data = await res.json();
                if (!res.ok)
                    throw new Error(data.error || "Failed login");
                setSessionToken(data.token);
                setCurrentUser(data.user);
                localStorage.setItem("ats_saas_token", data.token);
                localStorage.setItem("ats_saas_user", JSON.stringify(data.user));
                setAuthStatus({ type: "success", message: "Successfully logged in. Enjoy premium ATS dashboard!" });
                fetchResumes(data.token);
                fetchRecommendations(data.token);
                setAuthMode(null);
                setActiveTab("dashboard");
            }
            else if (authMode === "forgot") {
                const res = await fetch("/api/auth/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: authEmail })
                });
                const data = await res.json();
                if (!res.ok)
                    throw new Error(data.error || "Failed email request");
                setAuthStatus({ type: "success", message: data.message });
            }
        }
        catch (err) {
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
    const handleFileUpload = async (e) => {
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
            if (!res.ok)
                throw new Error(data.error || "Resume upload failed");
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
        }
        catch (err) {
            setActionMessage({ type: "error", text: err.message });
        }
        finally {
            setIsLoading(false);
        }
    };
    // Simulated drag-and-drop file processing
    const handleFileDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setUploadFileName(file.name);
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (evt.target?.result) {
                    setUploadTextContent(evt.target.result);
                }
            };
            reader.readAsText(file);
        }
    };
    // Handle standard file input selection
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUploadFileName(file.name);
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (evt.target?.result) {
                    setUploadTextContent(evt.target.result);
                }
            };
            reader.readAsText(file);
        }
    };
    // Perform multi-resume ranking upload
    const handleBatchFileUploads = async (files) => {
        if (files.length === 0)
            return;
        setIsLoading(true);
        setActionMessage({ type: "info", text: `Reading 0 of ${files.length} files...` });
        const uploadedIds = [];
        const readAndUpload = async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (evt) => {
                    try {
                        const contentText = evt.target?.result || "";
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
                        if (!res.ok)
                            throw new Error(data.error || "Upload failed");
                        uploadedIds.push(data.resume.id);
                        setResumes(prev => [data.resume, ...prev]);
                        resolve();
                    }
                    catch (e) {
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
            if (!res.ok)
                throw new Error(data.error);
            setBatchLeaderboard(data.leaderboard);
            setBatchInsights(data.insights);
            setSelectedResumeIds(uploadedIds);
            setActiveTab("leaderboard");
            setActionMessage({ type: "success", text: `Successfully ranked all ${files.length} candidates!` });
            setTimeout(() => setActionMessage({ type: "", text: "" }), 2500);
        }
        catch (err) {
            setActionMessage({ type: "error", text: "Batch error: " + err.message });
            setTimeout(() => setActionMessage({ type: "", text: "" }), 3000);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleBatchFileDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleBatchFileUploads(files);
        }
    };
    const handleBatchFileChange = (e) => {
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
            if (!res.ok)
                throw new Error(data.error);
            setBatchLeaderboard(data.leaderboard);
            setBatchInsights(data.insights);
            setActiveTab("leaderboard");
        }
        catch (err) {
            alert(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Toggle selection state for resumes comparison
    const toggleResumeSelection = (id) => {
        setSelectedResumeIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            else {
                return [...prev, id];
            }
        });
    };
    // Trigger skill gap analysis
    const handleRoadmapGeneration = async (e) => {
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
            if (!res.ok)
                throw new Error(data.error);
            setActiveRoadmap(data.report);
        }
        catch (err) {
            // Fallback to mock data
            const currentSkills = currentSkillsInput.split(",").map(s => s.trim());
            const missingSkills = ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker"].filter(s => !currentSkills.includes(s));
            setActiveRoadmap({
                targetRole: targetRoleInput,
                missingSkills: missingSkills,
                roadmap: {
                    plan30Days: ["Learn TypeScript basics", "Build a small project with Next.js"],
                    plan60Days: ["Master React hooks and context", "Learn Node.js and Express"],
                    plan90Days: ["Build a full-stack application", "Deploy to Vercel"]
                },
                learningResources: [
                    { name: "TypeScript Docs", type: "Documentation", url: "https://www.typescriptlang.org/docs/" },
                    { name: "Next.js Learn", type: "Course", url: "https://nextjs.org/learn" },
                    { name: "Node.js Guide", type: "Guide", url: "https://nodejs.org/en/docs/guides/" }
                ]
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    // Cover Letter generation trigger
    const handleCoverLetter = async (e) => {
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
            if (!res.ok)
                throw new Error(data.error);
            setGeneratedCl(data.letter);
        }
        catch (err) {
            // Fallback to mock data
            const mockLetter = `Dear Hiring Manager,

I am excited to apply for the ${clRole} position at ${clCompany}. With my experience in building modern web applications, I am confident I can contribute to your team's success.

In my previous roles, I have developed expertise in React, JavaScript, and creating intuitive user interfaces. I am passionate about writing clean, maintainable code and delivering exceptional user experiences.

Thank you for considering my application. I look forward to the opportunity to discuss how I can help ${clCompany} achieve its goals.

Sincerely,
Applicant`;
            setGeneratedCl({
                title: `${clRole} Cover Letter - ${clCompany}`,
                content: mockLetter
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    // Profile optimizing suggestions
    const handleProfileOptimize = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/profile/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ provider: optProvider, dataToAnalyze: optContent })
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.error);
            setOptResult(data);
        }
        catch (err) {
            // Fallback to mock data
            setOptResult({
                headline: optProvider === "linkedin"
                    ? "Full Stack Developer | Building Modern Web Applications"
                    : "Full Stack Developer | React & Node.js Enthusiast",
                summary: "Passionate developer with experience in building scalable web applications. Expertise in React, JavaScript, and modern development practices.",
                recommendations: [
                    "Add more project details and links",
                    "Include metrics and achievements",
                    "Highlight technical skills with examples",
                    "Add a professional profile photo"
                ]
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    // Chat message delivery
    const handleSendChatMessage = async (e) => {
        e.preventDefault();
        if (!chatInput.trim())
            return;
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
        }
        catch (ignore) {
            // Fallback responses
            const fallbackResponses = [
                "Great question! Let me help you with that. First, make sure your resume includes relevant keywords from the job description.",
                "To improve your ATS score, focus on using standard section headings and avoid tables or images.",
                "For interview prep, practice talking about your projects with specific examples and metrics.",
                "Your LinkedIn profile should have a clear headline, detailed experience sections, and recommendations if possible.",
                "When building your skill roadmap, start with the fundamentals and gradually work your way up to more advanced topics."
            ];
            const randomReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            setChatMessages(prev => [...prev, { sender: "coach", text: randomReply }]);
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
        }
        catch (err) {
            // Fallback to mock data
            setActiveInterview([
                { category: "Technical", question: "Explain the difference between useState and useRef in React." },
                { category: "Technical", question: "How would you optimize a slow React application?" },
                { category: "Behavioral", question: "Tell me about a time you had to resolve a conflict on your team." },
                { category: "System Design", question: "How would you design a URL shortening service?" },
                { category: "Technical", question: "Explain the concept of closures in JavaScript." }
            ]);
            setCurrentQuestionIndex(0);
            setUserAnswerInput("");
            setMockFeedback(null);
        }
        finally {
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
        }
        catch (err) {
            // Fallback to mock data
            const answerLength = userAnswerInput.length;
            const confidence = Math.min(95, Math.max(60, 60 + Math.floor(answerLength / 20)));
            const relevance = Math.min(92, Math.max(55, 55 + Math.floor(answerLength / 30)));
            const communication = Math.min(90, Math.max(65, 65 + Math.floor(answerLength / 25)));
            const overall = Math.floor((confidence + relevance + communication) / 3);
            setMockFeedback({
                metrics: {
                    confidence: confidence,
                    relevance: relevance,
                    communication: communication,
                    overall: overall
                },
                critique: overall >= 80
                    ? "Great answer! You covered the key points clearly and concisely. Consider adding a specific example to make it even stronger."
                    : overall >= 65
                        ? "Good answer, but could use some improvement. Try to be more specific and structure your response better."
                        : "Your answer is a bit brief. Make sure to address all parts of the question and provide concrete examples."
            });
        }
        finally {
            setIsEvaluatingMock(false);
        }
    };
    // Automatically create custom resume from state inputs
    const triggerDynamicResumeBuilder = async (e) => {
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
            if (!res.ok)
                throw new Error(data.error);
            setResumes(prev => [data.resume, ...prev]);
            setActiveResume(data.resume);
            setSelectedResumeIds(prev => [data.resume.id, ...prev]);
            setIsBuildingResume(false);
            setActiveTab("ats");
            alert("High-fidelity ATS resume successfully built and processed inside dashboard!");
        }
        catch (err) {
            alert(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Simple PDF file download simulated generator
    const downloadCoverLetterText = (title, body) => {
        const blob = new Blob([body], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title.replace(/\s+/g, "_")}.txt`;
        link.click();
    };
    // Helper score categories returns
    const getScoreColor = (score) => {
        if (score >= 90)
            return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        if (score >= 80)
            return "text-purple-400 bg-teal-500/10 border-teal-500/20";
        if (score >= 70)
            return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        if (score >= 60)
            return "text-orange-400 bg-orange-500/10 border-orange-500/20";
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    };
    const getScoreBg = (score) => {
        if (score >= 90)
            return "bg-emerald-500";
        if (score >= 80)
            return "bg-teal-500";
        if (score >= 70)
            return "bg-yellow-500";
        if (score >= 60)
            return "bg-orange-500";
        return "bg-rose-500";
    };
    const isSidebarLayout = currentUser && activeTab !== "landing";
    const getLoadingMessage = () => {
        if (actionMessage.text)
            return actionMessage.text;
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
                return "Processing career query with AI models...";
            default:
                return "Scanning candidate data & executing neural models...";
        }
    };
    const navigateToTab = (tabId) => {
        setActiveTab(tabId);
        if (tabId === "dashboard") {
            fetchStats();
            fetchResumes();
        }
        if (tabId === "ats" && !activeResume && resumes.length > 0) {
            setActiveResume(resumes[0]);
        }
        if (tabId === "leaderboard") {
            if (!activeResume && resumes.length > 0)
                setActiveResume(resumes[0]);
            if (selectedResumeIds.length === 0 && resumes.length > 0) {
                setSelectedResumeIds(resumes.slice(0, 3).map((resume) => resume.id));
            }
        }
        if (tabId === "jobs") {
            fetchVacancies();
            fetchRecommendations();
            fetchCompanies();
        }
        if (tabId === "admin") {
            fetchStats();
        }
    };
    return (_jsxs("div", { className: `min-h-screen flex ${isSidebarLayout ? "h-screen overflow-hidden" : "flex-col"} font-sans relative selection:bg-pink-500/30 selection:text-pink-200 ${theme === 'hatch' ? 'hatch-theme' : 'bg-[#0c020a] text-slate-100'}`, children: [_jsx(AnimatedBackground, {}), actionMessage.text && (_jsxs("div", { className: `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-xl animate-bounce flex items-center gap-3 max-w-md ${actionMessage.type === "error"
                    ? "bg-rose-950/90 border-rose-500/30 text-rose-200"
                    : actionMessage.type === "success"
                        ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
                        : "bg-pink-950/90 border-pink-500/30 text-pink-200"}`, children: [actionMessage.type === "error" ? _jsx(ShieldAlert, { className: "h-5 w-5 shrink-0 text-rose-400" }) : _jsx(Sparkles, { className: "h-5 w-5 shrink-0 text-pink-400" }), _jsx("div", { className: "text-sm font-medium", children: actionMessage.text })] })), isLoading && (_jsxs("div", { className: "fixed inset-0 z-50 bg-[#0a0108]/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-fade-in", children: [_jsxs("div", { className: "relative flex items-center justify-center", children: [_jsx("div", { className: "h-28 w-28 rounded-full border-2 border-t-pink-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin" }), _jsx("div", { className: "absolute h-18 w-18 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 blur-md opacity-35 animate-pulse" }), _jsx("div", { className: "absolute h-16 w-16 rounded-full bg-[#160312] border border-pink-500/30 flex items-center justify-center shadow-lg shadow-pink-500/20", children: _jsx(Sparkles, { className: "h-7 w-7 text-pink-400 animate-pulse" }) })] }), _jsxs("div", { className: "text-center max-w-sm px-6", children: [_jsx("h3", { className: "text-sm font-bold text-white tracking-widest bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 bg-clip-text text-transparent", children: "AI SYSTEM ENGINE" }), _jsx("p", { className: "text-xs text-slate-400 mt-2 font-mono leading-relaxed min-h-[36px]", children: getLoadingMessage() }), _jsx("div", { className: "w-48 h-1 bg-purple-950/40 rounded-full mx-auto mt-4 overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse", style: { width: '80%' } }) })] })] })), authMode && (_jsx("div", { className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-[#12030f]/95 border border-pink-500/25 max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden glass-panel", children: [_jsx("div", { className: "absolute top-0 inset-x-0 h-1 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" }), _jsx("button", { onClick: () => setAuthMode(null), className: "absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-pink-950/30", children: _jsx(X, { className: "h-5 w-5" }) }), _jsxs("form", { onSubmit: handleAuth, className: "p-6 md:p-8 flex flex-col gap-5", children: [_jsxs("div", { className: "text-center", children: [_jsxs("h3", { className: "text-xl font-bold text-white", children: [authMode === "login" && "Welcome Back", authMode === "register" && "Instantiate SECURE Account", authMode === "forgot" && "Recover Security Pin"] }), _jsx("p", { className: "text-xs text-slate-400 tracking-tight mt-1", children: "Sign in to your account" })] }), authStatus.message && (_jsx("div", { className: `p-3 rounded-lg text-xs leading-relaxed border ${authStatus.type === "error"
                                        ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                                        : "bg-pink-500/10 text-pink-300 border-pink-500/20"}`, children: authStatus.message })), authMode === "register" && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5", children: "Full Name" }), _jsx("input", { type: "text", required: true, value: authName, onChange: (e) => setAuthName(e.target.value), placeholder: "Alex Rivera", className: "w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors" })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5", children: "Email Address" }), _jsx("input", { type: "email", required: true, value: authEmail, onChange: (e) => setAuthEmail(e.target.value), placeholder: "alex.rivera@techflow.io", className: "w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors" })] }), authMode !== "forgot" && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5", children: "Password" }), _jsx("input", { type: "password", required: true, value: authPassword, onChange: (e) => setAuthPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors" })] })), authMode === "register" && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5", children: "Confirm Password" }), _jsx("input", { type: "password", required: true, value: authConfirmPassword, onChange: (e) => setAuthConfirmPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full bg-[#0a0108] text-white border border-pink-500/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition-colors" })] })), _jsxs("button", { type: "submit", className: "w-full py-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-semibold transition-all text-sm shadow-lg shadow-pink-600/30", children: [authMode === "login" && "Authenticate Access", authMode === "register" && "Create Candidate Account", authMode === "forgot" && "Recover Security Credentials"] }), _jsx("div", { className: "flex items-center justify-between mt-2 text-xs font-medium", children: authMode === "login" ? (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: () => { setAuthMode("forgot"); setAuthStatus({ type: "", message: "" }); }, className: "text-slate-400 hover:text-white", children: "Forgot password?" }), _jsx("button", { type: "button", onClick: () => { setAuthMode("register"); setAuthStatus({ type: "", message: "" }); }, className: "text-pink-400 hover:text-white", children: "Create an account" })] })) : (_jsx("button", { type: "button", onClick: () => { setAuthMode("login"); setAuthStatus({ type: "", message: "" }); }, className: "text-pink-400 hover:text-white w-full text-center", children: "Already signed up? Log In" })) })] })] }) })), isSidebarLayout && (_jsxs("aside", { className: "w-68 bg-[#12030f]/85 border-r border-pink-500/10 flex flex-col justify-between shrink-0 glass-panel relative z-20", children: [_jsxs("div", { children: [_jsxs("div", { className: "p-5 border-b border-pink-500/10 flex items-center gap-3 cursor-pointer", onClick: () => setActiveTab("landing"), children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20", children: _jsx(Layers, { className: "h-5 w-5 text-white" }) }), _jsxs("div", { children: [_jsx("span", { className: "text-sm font-bold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent", children: "AI Resume Intel" }), _jsx("span", { className: "text-[10px] block text-pink-400 font-mono tracking-widest font-bold", children: "ATS ENGINE" })] })] }), _jsx("nav", { className: "p-4 flex flex-col gap-1.5", children: [
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
                                    return (_jsxs("button", { type: "button", onClick: () => {
                                            navigateToTab(tab.id);
                                        }, className: `w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3.5 transition-all duration-205 text-left cursor-pointer ${isActive
                                            ? "text-pink-400 bg-pink-500/10 border border-pink-500/20 shadow-md shadow-pink-500/5 translate-x-1"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-pink-950/20 border border-transparent"}`, children: [_jsx(Icon, { className: `h-4.5 w-4.5 shrink-0 ${isActive ? "text-pink-400" : "text-slate-400"}` }), _jsx("span", { children: tab.label })] }, tab.id));
                                }) })] }), _jsxs("div", { className: "p-4 border-t border-pink-500/10 bg-[#0a0108]/60 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx("img", { src: currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", alt: "Avatar", className: "h-9 w-9 rounded-xl object-cover border border-pink-500/20 shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs font-bold text-slate-200 truncate leading-tight", children: currentUser.name }), _jsx("p", { className: "text-[10px] text-slate-500 truncate leading-none mt-1 font-mono", children: currentUser.email })] })] }), _jsx("button", { onClick: handleLogout, className: "p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all shrink-0 cursor-pointer", title: "Sign Out", children: _jsx(LogOut, { className: "h-4 w-4" }) })] }), _jsxs("button", { onClick: () => setTheme(theme === 'dark' ? 'hatch' : 'dark'), className: "w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-[#0a0108]/40 hover:bg-[#0a0108]/80 transition-all cursor-pointer border border-pink-500/10", title: "Toggle Theme", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Palette, { className: "h-3.5 w-3.5 text-pink-400" }), _jsx("span", { children: "Switch Theme" })] }), _jsx("span", { className: "text-[10px] font-mono text-slate-500 uppercase", children: theme === 'dark' ? 'Dark' : 'Hatch' })] })] })] })), _jsxs("div", { className: `flex-1 flex flex-col ${isSidebarLayout ? "overflow-hidden h-full" : ""}`, children: [isSidebarLayout ? (_jsxs("header", { className: "h-16 border-b border-pink-500/10 bg-[#12030f]/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsxs("h2", { className: "text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent", children: [activeTab === "dashboard" && "Dashboard", activeTab === "ats" && "ATS Score Report", activeTab === "leaderboard" && "Compare Resumes", activeTab === "jobs" && "Find Jobs", activeTab === "career" && "Career Tools", activeTab === "interviews" && "Interview Prep", activeTab === "chatbot" && "AI Chat Coach", activeTab === "admin" && "Analytics"] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/20 border border-purple-500/15 text-[11px] text-purple-200 font-semibold", children: [_jsx(Key, { className: "h-3.5 w-3.5 text-pink-400" }), _jsx("span", { className: "hidden md:inline", children: "AI Engine:" }), secretsConfig.hasKey ? (_jsx("span", { className: "text-pink-400", children: "AI Active \u2713" })) : (_jsx("span", { className: "text-slate-400", children: "Basic Mode" }))] }), _jsx("button", { onClick: () => setActiveTab("landing"), className: "px-3.5 py-1.5 text-xs font-semibold text-pink-300 bg-[#1c0717] hover:bg-[#2c0b26] border border-pink-500/15 rounded-xl transition-all cursor-pointer", children: "Landing" })] })] })) : (_jsxs("header", { className: "sticky top-0 z-40 bg-[#0c020a]/80 backdrop-blur-md border-b border-pink-500/10 px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 cursor-pointer", onClick: () => setActiveTab("landing"), children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20", children: _jsx(Layers, { className: "h-5 w-5 text-white" }) }), _jsxs("div", { children: [_jsx("span", { className: "text-lg font-bold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent", children: "AI Resume Intelligence" }), _jsx("span", { className: "text-xs block text-pink-400 font-mono font-bold tracking-wider", children: "ATS ENGINE PRO" })] })] }), _jsxs("div", { className: "hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/20 border border-purple-500/15 text-xs text-purple-200", children: [_jsx(Key, { className: "h-3.5 w-3.5 text-pink-400" }), _jsx("span", { children: "AI Engine:" }), secretsConfig.hasKey ? (_jsx("span", { className: "text-pink-400 font-bold", children: "AI Active \u2713" })) : (_jsx("span", { className: "text-slate-400 font-mono", children: "Basic Mode" }))] }), _jsxs("nav", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setTheme(theme === 'dark' ? 'hatch' : 'dark'), className: "p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer", title: "Toggle Theme", children: _jsx(Palette, { className: "h-4 w-4" }) }), currentUser ? (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: () => navigateToTab("dashboard"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === "dashboard" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"}`, children: "My Console" }), _jsx("button", { type: "button", onClick: () => navigateToTab("ats"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === "ats" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"}`, children: "Scores" }), _jsx("button", { type: "button", onClick: () => navigateToTab("jobs"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === "jobs" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-slate-300 hover:text-white"}`, children: "Jobs" }), _jsx("div", { className: "h-6 w-[1px] bg-pink-500/10 mx-1" }), _jsxs("div", { className: "flex items-center gap-3 bg-purple-950/20 border border-pink-500/10 pl-3 pr-2 py-1 rounded-xl", children: [_jsx("img", { src: currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", alt: "Avatar", className: "h-7 w-7 rounded-lg object-cover border border-pink-500/20" }), _jsx("span", { className: "text-xs text-slate-200 font-medium hidden md:inline", children: currentUser.name }), _jsx("button", { onClick: handleLogout, className: "p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer", title: "Sign Out", children: _jsx(LogOut, { className: "h-4 w-4" }) })] })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setAuthMode("login"), className: "px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer", children: "Log In" }), _jsx("button", { onClick: () => setAuthMode("register"), className: "px-4 py-2 text-sm text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl transition-all font-medium shadow-md shadow-pink-600/15 cursor-pointer", children: "Register" }), _jsx("button", { onClick: loginDemoAccount, className: "px-3.5 py-2 text-sm text-pink-300 bg-purple-950/20 border border-pink-500/15 hover:bg-pink-900/20 rounded-xl transition-colors font-semibold cursor-pointer", children: "Try Demo" })] }))] })] })), _jsxs("main", { className: `flex-1 w-full flex flex-col ${isSidebarLayout ? "overflow-y-auto bg-gradient-to-b from-[#130310]/30 to-[#0c020a] p-6" : ""}`, children: [activeTab === "landing" && (_jsxs("div", { className: "flex flex-col", children: [_jsxs("section", { className: "relative overflow-hidden px-6 lg:px-24 py-20 lg:py-32", children: [_jsx("div", { className: "absolute top-0 left-1/4 h-72 w-72 bg-pink-600/8 rounded-full blur-3xl pointer-events-none" }), _jsx("div", { className: "absolute bottom-0 right-1/4 h-80 w-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [_jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12 lg:gap-16", children: [_jsxs("div", { className: "flex-1 text-center lg:text-left", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/20 border border-pink-500/10 text-xs text-pink-400 font-semibold mb-6", children: [_jsx(Sparkles, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Powered by AI" })] }), _jsxs("h1", { className: "text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none", children: ["Resume Screening,", _jsx("br", {}), _jsx("span", { className: "text-shimmer", children: "Elevated by AI" })] }), _jsx("p", { className: "text-lg text-slate-300 max-w-xl mb-10 font-normal leading-relaxed mx-auto lg:mx-0", children: "Analyze resumes, calculate ATS scores, discover jobs, identify skill gaps, generate interview questions, and accelerate your career with AI." }), _jsx("div", { className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8", children: currentUser ? (_jsx("button", { type: "button", onClick: () => navigateToTab("dashboard"), className: "px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5", children: "Go to Dashboard \u2192" })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setAuthMode("register"), className: "px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-pink-600/20 hover:-translate-y-0.5", children: "Get Started Free" }), _jsx("button", { onClick: loginDemoAccount, className: "px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl font-semibold transition-all border border-pink-500/20 hover:border-pink-500/35", children: "Try Demo \u2192" })] })) }), _jsx("div", { className: "flex gap-6 justify-center lg:justify-start text-center", children: [
                                                                            { val: '10K+', label: 'Resumes Analyzed' },
                                                                            { val: '98%', label: 'ATS Accuracy' },
                                                                            { val: '3x', label: 'Faster Screening' },
                                                                        ].map((stat, i) => (_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-extrabold text-white", children: stat.val }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: stat.label })] }, i))) })] }), _jsx("div", { className: "flex-shrink-0 flex items-center justify-center w-full lg:w-auto", children: _jsx(Animated3DOrb, {}) })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-3 mt-16 lg:mt-20 border-t border-pink-500/10 pt-10 text-center", children: ['ATS Optimization', 'AI Career Coach', 'Resume Builder', 'Job Matching', 'Interview AI', 'Skill Roadmap'].map((feat, i) => (_jsx("div", { className: "px-3 py-2 rounded-xl glass-panel border border-pink-500/15 hover:border-pink-500/30 transition-colors", children: _jsx("p", { className: "text-white font-semibold text-sm", children: feat }) }, i))) })] })] }), _jsx("section", { className: "px-6 lg:px-24 py-16 glass-card-inset border-t border-pink-500/10", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-extrabold text-white", children: "Everything You Need" }), _jsx("p", { className: "text-slate-400 mt-2 max-w-lg mx-auto", children: "One platform to analyze, improve, and land your dream job." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center", children: _jsx(FileText, { className: "h-5 w-5" }) }), _jsx("h3", { className: "text-lg font-bold text-white", children: "ATS Score Analysis" }), _jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "Get a detailed score showing how well your resume matches ATS systems and job requirements." })] }), _jsxs("div", { className: "p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-fuchsia-400 flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5" }) }), _jsx("h3", { className: "text-lg font-bold text-white", children: "Compare Candidates" }), _jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "Upload multiple resumes and rank them side-by-side to find the best candidate." })] }), _jsxs("div", { className: "p-6 glass-panel glass-panel-hover rounded-2xl flex flex-col gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-purple-400 flex items-center justify-center", children: _jsx(Video, { className: "h-5 w-5" }) }), _jsx("h3", { className: "text-lg font-bold text-white", children: "AI Mock Interview" }), _jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "Practice interview questions with AI that scores your answers and gives personalized feedback." })] })] })] }) })] })), activeTab === "dashboard" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1", children: [_jsxs("div", { className: "lg:col-span-2 flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-2 h-full bg-pink-500" }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Upload Resume" }), _jsx("p", { className: "text-xs text-slate-400", children: "Upload your resume for instant AI analysis and scoring." })] }), _jsxs("button", { onClick: () => setIsBuildingResume(true), className: "px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-pink-400 rounded-lg flex items-center gap-1 border border-pink-500/20", children: [_jsx(Edit3, { className: "h-3 w-3" }), _jsx("span", { children: "Build Resume Instead" })] })] }), isBuildingResume ? (_jsxs("form", { onSubmit: triggerDynamicResumeBuilder, className: "glass-card-inset p-4 rounded-xl border border-pink-500/10 flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-indigo-950/40 pb-2", children: [_jsx("h4", { className: "text-xs font-mono font-bold text-pink-400 uppercase tracking-widest", children: "Build Your Resume" }), _jsx("button", { type: "button", onClick: () => setIsBuildingResume(false), className: "text-slate-400 hover:text-white text-xs", children: "Cancel" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3.5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400", children: "Your Name" }), _jsx("input", { required: true, value: builderData.fullName, onChange: (e) => setBuilderData({ ...builderData, fullName: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "Alex Rivera" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400", children: "Job Title You're Targeting" }), _jsx("input", { required: true, value: builderData.targetRole, onChange: (e) => setBuilderData({ ...builderData, targetRole: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "Lead Full Stack Architect" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400", children: "Email" }), _jsx("input", { type: "email", required: true, value: builderData.email, onChange: (e) => setBuilderData({ ...builderData, email: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "alex@techflow.io" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400", children: "Phone" }), _jsx("input", { required: true, value: builderData.phone, onChange: (e) => setBuilderData({ ...builderData, phone: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "+1 555-019-2834" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400 block mb-1", children: "Your Skills (comma separated)" }), _jsx("textarea", { required: true, rows: 2, value: builderData.skills, onChange: (e) => setBuilderData({ ...builderData, skills: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white font-mono", placeholder: "React, Node.js, TypeScript, PostgreSQL, Docker, Kubernetes, AWS" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400 block mb-1", children: "Work Experience" }), _jsx("textarea", { required: true, rows: 2, value: builderData.experience, onChange: (e) => setBuilderData({ ...builderData, experience: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "Senior React developer at Netflix. Engineered high-efficiency UI components improving page cold start benchmarks." })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400 block mb-1", children: "Projects" }), _jsx("textarea", { rows: 2, value: builderData.projects, onChange: (e) => setBuilderData({ ...builderData, projects: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "MentiTracker: Collaborative task metrics tracker scaling natively on container clusters." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3.5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400 block mb-1", children: "Education" }), _jsx("input", { value: builderData.education, onChange: (e) => setBuilderData({ ...builderData, education: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "B.S. Computer Science, Stanford (2022)" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[11px] uppercase text-slate-400 block mb-1", children: "Certifications" }), _jsx("input", { value: builderData.certifications, onChange: (e) => setBuilderData({ ...builderData, certifications: e.target.value }), className: "w-full glass-panel glass-panel-hover rounded-lg text-xs p-2 text-white", placeholder: "AWS Solution Architect, GCP Developer" })] })] }), _jsx("button", { type: "submit", className: "w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg text-xs text-white font-semibold transition-colors mt-2", children: "Build & Analyze Resume" })] })) : (_jsxs("form", { onSubmit: handleFileUpload, className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex gap-4 items-center", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1", children: "File Name Identity" }), _jsx("input", { value: uploadFileName, onChange: (e) => setUploadFileName(e.target.value), placeholder: "e.g. My_Resume.pdf", className: "w-full glass-card-inset/80 text-xs border border-pink-500/10 rounded-xl px-3 py-2 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] items-center text-slate-400 font-bold block uppercase tracking-widest mb-1", children: "Intake format" }), _jsxs("div", { className: "flex gap-1.5 py-1.5", children: [_jsx("span", { className: "text-[9px] font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono shadow-sm", children: ".PDF" }), _jsx("span", { className: "text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono shadow-sm", children: ".DOCX" }), _jsx("span", { className: "text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono shadow-sm", children: ".TXT" })] })] })] }), _jsx("input", { type: "file", id: "resume-file-picker", className: "hidden", accept: ".txt,.pdf,.docx,.doc", onChange: handleFileSelect }), _jsxs("div", { onDragOver: (e) => { e.preventDefault(); setIsDragOver(true); }, onDragLeave: () => setIsDragOver(false), onDrop: handleFileDrop, onClick: () => document.getElementById("resume-file-picker")?.click(), className: `futuristic-dropzone text-center transition-all cursor-pointer ${isDragOver ? "drag-active" : ""}`, children: [_jsx(Upload, { className: "h-10 w-10 text-pink-400 mx-auto mb-3 animate-float-gentle" }), _jsxs("p", { className: "text-xs font-semibold text-slate-200", children: ["Drag & Drop Your Resume or ", _jsx("span", { className: "text-pink-400 underline decoration-pink-500/35 hover:text-pink-300", children: "Browse Files" })] }), _jsx("p", { className: "text-[10px] text-slate-500 font-mono mt-1.5", children: "Supports PDF, DOCX, TXT formats (auto-extracts text)" }), _jsx("div", { className: "h-[1px] bg-gradient-to-r from-transparent via-pink-500/15 to-transparent my-3.5 max-w-xs mx-auto" }), _jsx("span", { className: "text-[10px] font-bold text-pink-400/80 hover:text-pink-400 transition-colors uppercase tracking-widest font-mono", children: "Or paste text below \u2193" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] font-bold block uppercase tracking-widest text-slate-400 mb-1", children: "Paste Resume Text" }), _jsx("textarea", { rows: 6, required: true, value: uploadTextContent, onChange: (e) => setUploadTextContent(e.target.value), placeholder: "Paste your full resume text here \u2014 name, contact info, work experience, skills, education...", className: "w-full glass-card-inset text-xs font-mono p-3 border border-pink-500/10 focus:outline-none focus:border-indigo-500 rounded-xl text-slate-300 leading-relaxed" })] }), _jsxs("button", { type: "submit", className: "btn-shimmer w-full py-3 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-pink-500/20 flex items-center justify-center gap-2 cursor-pointer", children: [_jsx(Sparkles, { className: "h-4 w-4 text-sky-300" }), _jsx("span", { children: "Analyze My Resume" })] })] }))] }), _jsxs("div", { className: "glass-panel glass-panel-hover rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Your Resumes" }), _jsxs("p", { className: "text-xs text-slate-400", children: ["You have ", resumes.length, " resume(s). Check boxes to compare candidates."] })] }), _jsxs("button", { onClick: runBatchAnalysis, className: "px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-lg shadow-pink-600/10", children: [_jsx(Trophy, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Compare Resumes" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: resumes.length === 0 ? (_jsx("div", { className: "col-span-full py-10 text-center border border-dashed border-pink-500/10 rounded-xl glass-card-inset/20", children: _jsx("p", { className: "text-slate-400 text-sm", children: "No resumes yet. Upload a resume above or click \"Try Demo\" to explore." }) })) : (resumes.map(r => {
                                                            const isChecked = selectedResumeIds.includes(r.id);
                                                            return (_jsxs("div", { className: "glowing-card glass-card-inset p-5 rounded-xl border border-pink-500/10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#12020e]/60 to-[#090108]/90 group", children: [_jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2 z-10", children: [_jsxs("span", { className: `text-[10px] font-mono font-bold border px-2 py-0.5 rounded-md shadow-sm ${getScoreColor(r.atsReport.score)}`, children: ["ATS ", r.atsReport.score] }), _jsx("input", { type: "checkbox", checked: isChecked, onChange: () => toggleResumeSelection(r.id), className: "h-4.5 w-4.5 rounded border-pink-500/25 text-indigo-600 focus:ring-0 cursor-pointer", title: "Select for comparison" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx(FileText, { className: "h-4 w-4 text-pink-400 mt-0.5 shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-white font-extrabold text-sm leading-tight pr-14 truncate group-hover:text-pink-400 transition-colors", children: r.parsedData.fullName || r.fileName }), _jsx("p", { className: "text-[10px] text-slate-400 font-mono mt-1 mb-2 max-w-[200px] truncate", children: r.parsedData.email || r.fileName })] })] }), _jsxs("div", { className: "flex flex-wrap gap-1.5 mb-3 mt-1", children: [r.parsedData.skills.slice(0, 4).map((s, idx) => (_jsx("span", { className: "bg-purple-950/20 border border-purple-500/15 px-2 py-0.5 rounded text-[9px] text-purple-300 font-mono shadow-sm", children: s }, idx))), r.parsedData.skills.length > 4 && (_jsxs("span", { className: "text-[9px] text-pink-400 self-center font-mono font-bold bg-pink-500/5 px-1.5 py-0.5 rounded border border-pink-500/10", children: ["+", r.parsedData.skills.length - 4] }))] })] }), _jsxs("div", { className: "border-t border-pink-500/10 pt-3.5 mt-2 flex items-center justify-between", children: [_jsxs("span", { className: "text-[9px] text-slate-500 font-mono", children: ["Uploaded: ", new Date(r.uploadedAt).toLocaleDateString()] }), _jsx("div", { className: "flex gap-2", children: _jsx("button", { onClick: () => { setActiveResume(r); setActiveTab("ats"); }, className: "px-2.5 py-1 text-[10px] font-bold text-pink-400 bg-pink-500/5 hover:bg-pink-500/15 rounded-md transition-colors border border-pink-500/15 cursor-pointer shadow-sm", children: "View Analytics" }) })] })] }, r.id));
                                                        })) })] })] }), _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel p-6 rounded-2xl relative overflow-hidden", children: [_jsx("div", { className: "absolute -right-10 -bottom-10 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl" }), _jsx("h4", { className: "text-xs font-mono font-bold text-pink-400 uppercase tracking-widest mb-1", children: "Quick Tools" }), _jsx("h3", { className: "text-lg font-extrabold text-white leading-tight", children: "AI-Powered Career Tools" }), _jsx("p", { className: "text-xs text-slate-400 mt-2 leading-relaxed", children: "Use these AI tools to boost your career." }), _jsxs("div", { className: "flex flex-col gap-2.5 mt-4", children: [_jsxs("button", { onClick: () => { setActiveTab("career"); }, className: "w-full rounded-xl bg-gradient-to-r from-[#170515]/80 to-[#12020e]/60 border border-pink-500/10 hover:border-pink-500/30 text-left flex items-center justify-between p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/5 group cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shadow-inner group-hover:bg-pink-500/20 transition-all shrink-0", children: _jsx(BookOpen, { className: "h-4.5 w-4.5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-white group-hover:text-pink-300 transition-colors", children: "Roadmap / Skill Gap Analyzer" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Plan milestones step-by-step" })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" })] }), _jsxs("button", { onClick: () => { setActiveTab("chatbot"); }, className: "w-full rounded-xl bg-gradient-to-r from-[#170515]/80 to-[#12020e]/60 border border-pink-500/10 hover:border-pink-500/30 text-left flex items-center justify-between p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/5 group cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center shadow-inner group-hover:bg-fuchsia-500/20 transition-all shrink-0", children: _jsx(MessageSquare, { className: "h-4.5 w-4.5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-white group-hover:text-pink-300 transition-colors", children: "AI Career Coach" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Instant feedback 24/7" })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" })] }), _jsxs("button", { onClick: () => { setActiveTab("interviews"); }, className: "w-full rounded-xl bg-gradient-to-r from-[#170515]/80 to-[#12020e]/60 border border-pink-500/10 hover:border-pink-500/30 text-left flex items-center justify-between p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/5 group cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shadow-inner group-hover:bg-rose-500/20 transition-all shrink-0", children: _jsx(Video, { className: "h-4.5 w-4.5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-white group-hover:text-pink-300 transition-colors", children: "Mock Interview Station" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Verify reply confidence levels" })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" })] }), _jsxs("button", { onClick: () => { setActiveTab("admin"); }, className: "w-full rounded-xl bg-gradient-to-r from-[#170515]/80 to-[#12020e]/60 border border-purple-500/15 hover:border-pink-500/30 text-left flex items-center justify-between p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/5 group cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner group-hover:bg-emerald-500/20 transition-all shrink-0", children: _jsx(BarChart3, { className: "h-4.5 w-4.5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-emerald-400 group-hover:text-pink-300 transition-colors", children: "SysAdmin Core Trends" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "ATS database aggregates" })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" })] })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3", children: [_jsxs("h4", { className: "text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1", children: [_jsx(ShieldAlert, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Account Info" })] }), _jsx("p", { className: "text-xs text-slate-400 leading-relaxed", children: "Your account details and verification status." }), currentUser && (_jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 flex items-center gap-4", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("img", { src: currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", alt: "Avatar", className: "h-12 w-12 rounded-xl object-cover border-2 border-pink-500/25 shadow-md" }), currentUser.isVerified && (_jsx("span", { className: "absolute -bottom-1 -right-1 h-4.5 w-4.5 bg-emerald-500 border-2 border-[#12030f] rounded-full flex items-center justify-center text-[9px] text-white font-bold pulse-verified", title: "Verified", children: "\u2713" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-xs font-bold text-white leading-snug", children: currentUser.name || "Alex Rivera" }), _jsx("p", { className: "text-[10px] text-slate-400 font-mono truncate leading-none mt-1", children: currentUser.email }), _jsx("div", { className: "flex items-center gap-2 mt-2", children: currentUser.isVerified ? (_jsxs("span", { className: "text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 shadow-sm", children: [_jsx(Check, { className: "h-2.5 w-2.5" }), "Verified Candidate"] })) : (_jsx("button", { onClick: async () => {
                                                                                try {
                                                                                    const res = await fetch("/api/auth/verify-email", {
                                                                                        method: "POST",
                                                                                        headers: { "Authorization": `Bearer ${sessionToken}` }
                                                                                    });
                                                                                    const data = await res.json();
                                                                                    setCurrentUser({ ...currentUser, isVerified: true });
                                                                                    alert(data.message);
                                                                                }
                                                                                catch (e) {
                                                                                    console.error(e);
                                                                                }
                                                                            }, className: "text-[9px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full hover:bg-amber-500/20 transition-all cursor-pointer", children: "Verify Profile" })) })] })] }))] })] })] })), activeTab === "ats" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-pink-500/10 pb-5 flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: () => setActiveTab("dashboard"), className: "px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-lg", children: "Back to Hub" }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-extrabold text-white", children: "ATS Score Report" }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Viewing: ", _jsx("span", { className: "font-mono text-pink-400 font-semibold", children: activeResume?.fileName || "Alex_Rivera_FullStack.pdf" })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Select Resume:" }), _jsx("select", { className: "glass-card-inset border border-purple-500/15 px-3 py-1.5 rounded-lg text-xs font-mono text-white", value: activeResume?.id || "", onChange: (e) => {
                                                            const matched = resumes.find(r => r.id === e.target.value);
                                                            if (matched)
                                                                setActiveResume(matched);
                                                        }, children: resumes.map(r => (_jsx("option", { value: r.id, children: r.parsedData.fullName || r.fileName }, r.id))) })] })] }), activeResume ? (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center", children: [_jsxs("div", { className: "text-center relative py-6 flex flex-col items-center justify-center", children: [_jsxs("div", { className: "relative h-40 w-40 flex items-center justify-center", children: [_jsxs("svg", { className: "absolute inset-0 transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", className: "text-slate-800", fill: "transparent" }), _jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", className: `${activeResume.atsReport.score >= 80 ? "text-pink-400" : "text-yellow-400"}`, strokeDasharray: "251.2", strokeDashoffset: 251.2 - (251.2 * activeResume.atsReport.score) / 100, fill: "transparent" })] }), _jsxs("div", { className: "text-center z-10", children: [_jsx("span", { className: "text-4xl font-extrabold text-white font-mono leading-none", children: activeResume.atsReport.score }), _jsx("span", { className: "text-xs text-slate-500 block font-mono mt-1", children: "%" })] })] }), _jsx("div", { className: "mt-4", children: _jsxs("span", { className: `px-3 py-1 rounded-full text-xs font-bold font-mono border ${getScoreColor(activeResume.atsReport.score)}`, children: ["Grade: ", activeResume.atsReport.gradeCategory] }) })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-400", children: "Score Breakdown" }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-xs font-mono text-slate-300 mb-1", children: [_jsx("span", { children: "Structure" }), _jsxs("span", { children: [activeResume.atsReport.structureScore, "%"] })] }), _jsx("div", { className: "w-full glass-card-inset h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full", style: { width: `${activeResume.atsReport.structureScore}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-xs font-mono text-slate-300 mb-1", children: [_jsx("span", { children: "Readability" }), _jsxs("span", { children: [activeResume.atsReport.formattingScore, "%"] })] }), _jsx("div", { className: "w-full glass-card-inset h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full", style: { width: `${activeResume.atsReport.formattingScore}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-xs font-mono text-slate-300 mb-1", children: [_jsx("span", { children: "Keyword Density" }), _jsxs("span", { children: [activeResume.atsReport.keywordDensity, "%"] })] }), _jsx("div", { className: "w-full glass-card-inset h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-fuchsia-500 to-pink-500 h-full rounded-full", style: { width: `${activeResume.atsReport.keywordDensity}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-xs font-mono text-slate-300 mb-1", children: [_jsx("span", { children: "Skills Match" }), _jsxs("span", { children: [activeResume.atsReport.skillsMatch, "%"] })] }), _jsx("div", { className: "w-full glass-card-inset h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full", style: { width: `${activeResume.atsReport.skillsMatch}%` } }) })] })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-md font-bold text-white", children: "Resume Details" }), _jsx("p", { className: "text-xs text-slate-400 leading-tight", children: "Information we extracted from your resume." })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-3.5 glass-card-inset rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[10px] text-slate-500 uppercase block font-bold", children: "Contact Info" }), _jsx("p", { className: "text-white font-bold text-sm mt-1", children: activeResume.parsedData.fullName || "N/A" }), _jsx("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: activeResume.parsedData.email || "N/A" }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: activeResume.parsedData.phone || "N/A" })] }), _jsxs("div", { className: "p-3.5 glass-card-inset rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[10px] text-slate-500 uppercase block font-bold", children: "Links" }), _jsxs("p", { className: "text-xs text-slate-300 mt-2 font-mono", children: ["LinkedIn: ", activeResume.parsedData.links.linkedin || "Not found"] }), _jsxs("p", { className: "text-xs text-slate-300 font-mono", children: ["GitHub: ", activeResume.parsedData.links.github || "Not found"] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-mono uppercase text-pink-400 tracking-wider mb-2", children: "Work Experience" }), _jsx("div", { className: "flex flex-col gap-3", children: activeResume.parsedData.experience.map((exp, idx) => (_jsxs("div", { className: "p-4 glass-card-inset/60 rounded-xl border border-purple-500/15", children: [_jsxs("div", { className: "flex justify-between items-start flex-wrap gap-1", children: [_jsxs("span", { className: "text-xs font-bold text-slate-200", children: [exp.role, " @ ", exp.company] }), _jsx("span", { className: "text-[10px] font-mono text-slate-500", children: exp.duration })] }), _jsx("p", { className: "text-xs text-slate-400 leading-relaxed mt-2", children: exp.description })] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-mono uppercase text-pink-400 tracking-wider mb-2", children: "Projects & Academic Metadata" }), _jsx("div", { className: "flex flex-col gap-2", children: activeResume.parsedData.projects.map((proj, idx) => (_jsxs("div", { className: "p-3 glass-card-inset/25 border border-purple-500/15 rounded-lg", children: [_jsx("span", { className: "text-xs text-white font-bold block", children: proj.title }), _jsx("div", { className: "flex flex-wrap gap-1 my-1", children: proj.tech.map((t, tIdx) => (_jsx("span", { className: "text-[9px] font-mono bg-[#130310]/60 border border-purple-500/15 text-pink-300 px-1 rounded", children: t }, tIdx))) }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: proj.description })] }, idx))) })] })] })] }), _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl", children: [_jsxs("h3", { className: "text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-pink-400" }), _jsx("span", { children: "AI Improvement engine" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-4", children: "Targeted suggestions to excel against specialized parsing filters." }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "glass-card-inset p-3.5 rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[10px] font-mono uppercase font-bold text-rose-400 block mb-2", children: "Missing Priority Keywords" }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: activeResume.atsReport.missingKeywords.map((k, idx) => (_jsx("span", { className: "bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-md font-mono", children: k }, idx))) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-mono uppercase font-bold text-emerald-400 block mb-2", children: "Suggested Action Rewrites" }), activeResume.atsReport.suggestedRewrites.map((rew, idx) => (_jsxs("div", { className: "glass-card-inset p-3.5 rounded-xl border border-purple-500/15 flex flex-col gap-2 mb-2", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-500 uppercase", children: rew.Section }), _jsxs("div", { className: "text-[11px] leading-relaxed text-rose-400 line-through", children: ["\u201C", rew.Before, "\u201D"] }), _jsxs("div", { className: "text-[11px] leading-relaxed text-emerald-400 font-medium", children: ["\u201C", rew.After, "\u201D"] })] }, idx)))] }), _jsxs("div", { className: "bg-pink-950/20 p-4 border border-pink-500/15 rounded-xl", children: [_jsx("span", { className: "text-[10px] font-mono uppercase font-bold text-pink-400 block mb-2", children: "Action Steps" }), _jsx("ul", { className: "text-xs text-slate-300 leading-relaxed space-y-2 list-decimal list-inside", children: activeResume.atsReport.improvementRoadmap.map((imp, idx) => (_jsx("li", { children: imp }, idx))) })] })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3", children: [_jsxs("span", { className: "text-xs uppercase font-mono font-bold text-yellow-400 flex items-center gap-1", children: [_jsx(Award, { className: "h-4 w-4" }), _jsx("span", { children: "ATS Friendly Layout Matching" })] }), _jsx("p", { className: "text-xs text-slate-400 leading-tight", children: "These modern premium design layouts guarantee 100% scanner accessibility." }), _jsxs("div", { className: "p-3 glass-card-inset border border-purple-500/15 rounded-xl", children: [_jsx("p", { className: "text-xs font-bold text-white", children: "Vercel Slate Minimalist" }), _jsx("span", { className: "text-[10px] text-slate-500 block font-mono", children: "Recommend for: Software & Data Engineers" }), _jsxs("div", { className: "flex justify-between items-center mt-3", children: [_jsx("span", { className: "text-[10px] font-mono text-emerald-400", children: "ATS compatible: 98%" }), _jsxs("button", { onClick: () => downloadCoverLetterText("Classic_Template", "Header layout specifications:\n- Single column structure\n- Times New Roman or Inter font family\n- Size 10-11 text"), className: "text-[10px] text-pink-400 hover:underline flex items-center gap-1", children: [_jsx(Download, { className: "h-3 w-3" }), _jsx("span", { children: "Download" })] })] })] })] })] })] })) : (_jsx("div", { className: "py-20 text-center glass-panel glass-panel-hover rounded-3xl", children: _jsx("p", { className: "text-slate-400", children: "Please upload a resume first from the Dashboard." }) }))] })), activeTab === "leaderboard" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-pink-500/10 pb-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white font-sans tracking-tight", children: "Resume Comparison & Rankings" }), _jsx("p", { className: "text-xs text-slate-400", children: "Upload multiple resumes to instantly compare candidates and find the best match." })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setActiveTab("landing"), className: "px-3.5 py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-400 rounded-xl border border-white/8 flex items-center gap-1.5 transition-colors", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: () => setActiveTab("dashboard"), className: "px-3.5 py-2 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-xl border border-pink-500/15", children: "Dashboard" })] })] }), _jsxs("div", { className: "card p-6 flex flex-col gap-4 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold text-white uppercase tracking-wider", children: "\u26A1 Direct Batch Upload & Ranking" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Select or drop multiple resume files to instantly parse, analyze, and compile candidate rankings." })] }), _jsxs("div", { onDragOver: (e) => { e.preventDefault(); setIsDragOver(true); }, onDragLeave: () => setIsDragOver(false), onDrop: handleBatchFileDrop, className: `drop-zone flex flex-col items-center justify-center gap-4 py-8 border-2 border-dashed rounded-2xl transition-all ${isDragOver
                                                    ? "border-pink-500 bg-pink-500/10"
                                                    : "border-slate-700 bg-[#16051c]/30 hover:border-pink-500/50 hover:bg-pink-500/5"}`, children: [_jsx("div", { className: "h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400", children: _jsx(Upload, { className: "h-6 w-6 animate-bounce" }) }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm font-semibold text-white", children: "Drag & Drop Resume Files Here" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Supports TXT, PDF, DOCX formats. Select multiple files together." })] }), _jsxs("label", { className: "btn-primary py-2 px-5 text-xs cursor-pointer inline-flex items-center gap-2", children: [_jsx("span", { children: "Select Files" }), _jsx("input", { type: "file", multiple: true, onChange: handleBatchFileChange, className: "hidden", accept: ".txt,.pdf,.docx" })] })] })] }), batchLeaderboard.length === 0 ? (_jsxs("div", { className: "py-12 text-center card p-8 flex flex-col items-center justify-center gap-4 animate-fade-in", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400", children: _jsx(Trophy, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-300 font-medium", children: "No candidate rankings compiled yet" }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Upload resumes above, or check resumes on the Dashboard and click \"Compare Resumes\"." })] })] })) : (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 glass-panel glass-panel-hover rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-pink-400 uppercase tracking-widest", children: "\uD83C\uDFC6 Candidate Rankings" }), _jsxs("span", { className: "text-xs text-slate-500", children: [batchLeaderboard.length, " candidates ranked"] })] }), _jsx("div", { className: "flex flex-col gap-3", children: batchLeaderboard.map((item) => {
                                                            const medalEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : null;
                                                            const rankClass = item.rank === 1 ? 'rank-1' : item.rank === 2 ? 'rank-2' : item.rank === 3 ? 'rank-3' : '';
                                                            const atsColor = item.atsScore >= 85 ? 'text-emerald-400' : item.atsScore >= 65 ? 'text-yellow-400' : 'text-rose-400';
                                                            const atsBarColor = item.atsScore >= 85 ? 'progress-fill-green' : 'progress-fill';
                                                            const matchColor = item.jobMatch >= 80 ? 'text-emerald-400' : item.jobMatch >= 60 ? 'text-yellow-400' : 'text-slate-400';
                                                            return (_jsx("div", { className: `rank-card p-5 animate-fade-up ${rankClass}`, style: { animationDelay: `${(item.rank - 1) * 0.07}s` }, children: _jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [_jsx("div", { className: "flex-shrink-0 flex flex-col items-center justify-center min-w-[48px]", children: medalEmoji ? (_jsx("span", { className: "text-2xl", children: medalEmoji })) : (_jsxs("div", { className: "h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold font-mono text-slate-400 text-sm", children: ["#", item.rank] })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-base font-bold text-white leading-tight", children: item.name }), _jsx("p", { className: "text-xs text-slate-500 font-mono mt-0.5 truncate max-w-xs", children: item.experienceRoles }), item.skills && item.skills.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1.5 mt-2", children: [item.skills.slice(0, 5).map((skill, si) => (_jsx("span", { className: "skill-tag", children: skill }, si))), item.skills.length > 5 && (_jsxs("span", { className: "text-[10px] text-pink-400 self-center font-mono", children: ["+", item.skills.length - 5] }))] }))] }), _jsxs("div", { className: "flex items-center gap-6 flex-shrink-0", children: [_jsxs("div", { className: "text-right w-24", children: [_jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1", children: "ATS Score" }), _jsx("span", { className: `text-xl font-extrabold font-mono ${atsColor}`, children: item.atsScore }), _jsx("div", { className: "progress-track mt-1.5", children: _jsx("div", { className: atsBarColor, style: { width: `${item.atsScore}%` } }) })] }), _jsxs("div", { className: "text-right w-24", children: [_jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1", children: "Job Match" }), _jsxs("span", { className: `text-xl font-extrabold font-mono ${matchColor}`, children: [item.jobMatch, "%"] }), _jsx("div", { className: "progress-track mt-1.5", children: _jsx("div", { className: "progress-fill-green", style: { width: `${item.jobMatch}%` } }) })] })] })] }) }, item.id));
                                                        }) })] }), _jsx("div", { className: "flex flex-col gap-6", children: _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4", children: [_jsx("h4", { className: "text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest", children: "AI Insights" }), _jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-2", children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-slate-500", children: "Top Candidate" }), _jsx("p", { className: "text-sm text-emerald-400 font-bold leading-tight", children: batchInsights.topWinner })] }), _jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-2", children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-slate-500", children: "Needs Improvement" }), _jsx("p", { className: "text-sm text-rose-300 font-bold leading-tight", children: batchInsights.weakWarning })] }), _jsxs("div", { className: "p-4 bg-pink-950/20 text-xs border border-pink-500/15 rounded-xl", children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-pink-400 font-mono block mb-2", children: "Recommendations" }), _jsx("ul", { className: "space-y-1.5 list-disc list-inside text-slate-300", children: batchInsights.remedySteps.map((step, idx) => (_jsx("li", { children: step }, idx))) })] })] }) })] }))] })), activeTab === "jobs" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsx("div", { className: "flex justify-between items-center border-b border-pink-500/10 pb-5", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Job Search" }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: "Browse job listings matched to your skills." })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col gap-4", children: [_jsx("span", { className: "text-xs uppercase font-mono font-bold text-pink-400", children: "Search Jobs" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "Google, Programmer, Cloud...", value: jobSearch, onChange: (e) => setJobSearch(e.target.value), className: "w-full glass-card-inset text-xs border border-pink-500/10 rounded-xl pl-8 pr-3 py-2 focus:outline-none" }), _jsx(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" })] }), _jsxs("div", { className: "flex flex-col gap-2 mt-2", children: [_jsxs("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: jobFilters.remote, onChange: (e) => setJobFilters({ ...jobFilters, remote: e.target.checked }), className: "rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0" }), _jsx("span", { children: "Remote only" })] }), _jsxs("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: jobFilters.hybrid, onChange: (e) => setJobFilters({ ...jobFilters, hybrid: e.target.checked }), className: "rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0" }), _jsx("span", { children: "Hybrid only" })] }), _jsxs("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: jobFilters.onsite, onChange: (e) => setJobFilters({ ...jobFilters, onsite: e.target.checked }), className: "rounded glass-card-inset border-purple-500/15 text-indigo-600 focus:ring-0" }), _jsx("span", { children: "On-Site only" })] })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col gap-4", children: [_jsx("span", { className: "text-xs uppercase font-mono font-bold text-emerald-400", children: "Recommended for You" }), _jsx("div", { className: "flex flex-col gap-3", children: jobRecommendations.length === 0 ? (_jsx("p", { className: "text-xs text-slate-500", children: "Upload a resume to see personalized recommendations." })) : (jobRecommendations.map((r, idx) => (_jsxs("div", { className: "glass-card-inset p-3 rounded-xl border border-slate-855", children: [_jsx("p", { className: "text-xs font-bold text-white leading-tight", children: r.title }), _jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [r.company, " (Match Score: ", r.matchScore, "%)"] }), _jsxs("a", { href: r.link, target: "_blank", rel: "noreferrer", className: "text-[10px] text-pink-400 font-bold hover:underline flex items-center gap-1 mt-2", children: [_jsx("span", { children: "View Job" }), _jsx(ExternalLink, { className: "h-2 w-2" })] })] }, idx)))) })] })] }), _jsxs("div", { className: "lg:col-span-3 flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 border-b border-pink-500/10 pb-3", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-pink-400 uppercase tracking-widest", children: "Job Listings" }), _jsxs("span", { className: "text-xs text-slate-400", children: ["Found ", vacancies.length, " jobs"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: vacancies.length === 0 ? (_jsx("div", { className: "col-span-full py-16 text-center text-slate-500 text-xs", children: "No active match patterns aligned. Try adjusting filters or typing alternative criteria." })) : (vacancies.map(vac => (_jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 hover:border-pink-500/10 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("span", { className: "text-xs font-bold text-pink-400 uppercase font-mono", children: vac.source }), _jsx("span", { className: "text-[10px] text-slate-500 uppercase font-bold bg-[#130310]/60 border border-purple-500/15 px-2 rounded-md", children: vac.type })] }), _jsx("p", { className: "text-sm font-bold text-white mt-1 leading-tight", children: vac.title }), _jsx("p", { className: "text-[11px] text-slate-400 font-semibold", children: vac.company }), _jsxs("div", { className: "flex items-center gap-3 text-[10px] text-slate-500 mt-3 font-mono", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3 text-slate-600" }), " ", vac.location] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(DollarSign, { className: "h-3 w-3 text-slate-600" }), " ", vac.salary] })] })] }), _jsxs("div", { className: "border-t border-purple-500/15 pt-3 mt-3 flex justify-between items-center", children: [_jsxs("span", { className: "text-[10px] text-slate-500 font-mono", children: ["Experience: ", vac.experience] }), _jsx("a", { href: vac.applyLink, target: "_blank", rel: "noreferrer", className: "px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600/10 hover:bg-[#1a0516]/65 text-[10px] font-bold text-white rounded border border-pink-500/20", children: "Simulate Apply link" })] })] }, vac.id)))) })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-emerald-400 uppercase tracking-widest", children: "Companies Hiring" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: companies.map((c, idx) => (_jsxs("div", { className: "p-4 glass-card-inset rounded-xl border border-purple-500/15 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-white", children: c.company }), _jsxs("span", { className: "text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-lg inline-block mt-1", children: ["Status: ", c.hiringStatus] }), _jsxs("span", { className: "text-[11px] text-slate-400 block mt-2", children: ["Open Roles: ", c.openRoles, " Positions"] }), _jsx("div", { className: "flex flex-wrap gap-1 mt-3", children: c.targetSkills.map((s, sIdx) => (_jsx("span", { className: "text-[9px] font-mono bg-[#130310]/60 text-slate-400 px-1.5 rounded", children: s }, sIdx))) })] }), _jsxs("a", { href: c.careerPage, target: "_blank", rel: "noreferrer", className: "text-[10px] text-pink-400 hover:underline flex items-center gap-1 mt-4", children: [_jsx("span", { children: "View Career profiles" }), _jsx(ExternalLink, { className: "h-3 w-3" })] })] }, idx))) })] })] })] })] })), activeTab === "career" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsx("div", { className: "flex justify-between items-center border-b border-pink-500/10 pb-5", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Career Tools" }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: "Plan your career, write cover letters, and optimize your LinkedIn & GitHub." })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-pink-400 uppercase tracking-widest mb-3", children: "Career Roadmap" }), _jsxs("form", { onSubmit: handleRoadmapGeneration, className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400 mb-1", children: "Target Job Role" }), _jsx("input", { required: true, value: targetRoleInput, onChange: (e) => setTargetRoleInput(e.target.value), placeholder: "Lead DevOps Architect", className: "w-full glass-card-inset text-xs text-white border border-pink-500/10 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400 mb-1", children: "Your Current Skills" }), _jsx("input", { required: true, value: currentSkillsInput, onChange: (e) => setCurrentSkillsInput(e.target.value), placeholder: "HTML, CSS, JavaScript", className: "w-full glass-card-inset text-xs text-white border border-pink-500/10 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-indigo-500" })] }), _jsx("button", { type: "submit", className: "w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white select-none transition-colors", children: "Evaluate Skill Gaps & Roadmap" })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-fuchsia-400 uppercase tracking-widest mb-3", children: "Cover Letter Generator" }), _jsxs("form", { onSubmit: handleCoverLetter, className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400", children: "Job Title You're Targeting" }), _jsx("input", { required: true, value: clRole, onChange: (e) => setClRole(e.target.value), className: "w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400", children: "Company Name" }), _jsx("input", { required: true, value: clCompany, onChange: (e) => setClCompany(e.target.value), className: "w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400", children: "Job Description" }), _jsx("textarea", { rows: 3, value: clJobDesc, onChange: (e) => setClJobDesc(e.target.value), className: "w-full glass-card-inset text-xs rounded-xl border border-pink-500/10 p-2 text-slate-300" })] }), _jsx("button", { type: "submit", className: "w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white transition-colors", children: "Generate Letter" })] })] }), _jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4", children: [_jsxs("div", { className: "border-b border-pink-500/10 pb-2", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-yellow-500 uppercase tracking-widest", children: "LinkedIn & GitHub Optimizer" }), _jsx("p", { className: "text-xs text-slate-400", children: "Improve your online profiles to get more views." })] }), _jsxs("form", { onSubmit: handleProfileOptimize, className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: "flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200", children: [_jsx("input", { type: "radio", checked: optProvider === "linkedin", onChange: () => setOptProvider("linkedin"), name: "optProv", className: "text-indigo-600 glass-card-inset border-purple-500/15" }), _jsx("span", { children: "LinkedIn" })] }), _jsxs("label", { className: "flex items-center gap-1 text-xs font-semibold cursor-pointer text-slate-200", children: [_jsx("input", { type: "radio", checked: optProvider === "github", onChange: () => setOptProvider("github"), name: "optProv", className: "text-indigo-600 glass-card-inset border-purple-500/15" }), _jsx("span", { children: "GitHub" })] })] }), _jsx("textarea", { rows: 2, required: true, value: optContent, onChange: (e) => setOptContent(e.target.value), placeholder: "My Headline: Software developer looking for jobs. Bio: I build apps.", className: "w-full glass-card-inset text-xs border border-pink-500/10 p-3 rounded-xl focus:border-indigo-500" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20 text-xs rounded-lg transition-colors select-none self-start", children: "Calculate parameters" })] }), optResult && (_jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-3", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-pink-400 tracking-wider", children: "Improved Headline" }), _jsx("p", { className: "text-xs text-white font-bold font-mono mt-0.5 leading-tight", children: optResult.headline })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-fuchsia-400 tracking-wider", children: "Improved Bio" }), _jsx("p", { className: "text-xs text-slate-300 mt-0.5 leading-relaxed font-mono", children: optResult.summary })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-emerald-400 tracking-wider", children: "Action Steps" }), _jsx("ul", { className: "text-xs text-slate-400 space-y-1 mt-1 list-disc list-inside", children: optResult.recommendations.map((rec, idx) => (_jsx("li", { children: rec }, idx))) })] })] }))] })] }), _jsxs("div", { className: "flex flex-col gap-6", children: [activeRoadmap && (_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-5", children: [_jsxs("div", { className: "flex justify-between items-center flex-wrap gap-2", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-md font-bold text-white", children: ["Roadmap: ", activeRoadmap.targetRole] }), _jsx("p", { className: "text-xs text-slate-400 leading-tight", children: "Your personalized learning plan." })] }), _jsx("span", { className: "text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 font-bold", children: "Ready" })] }), _jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-rose-400 font-mono tracking-widest block mb-2", children: "Skills to Learn" }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: activeRoadmap.missingSkills.map((s, idx) => (_jsx("span", { className: "bg-rose-500/15 text-rose-300 text-xs font-mono px-2.5 py-0.5 rounded border border-rose-500/25", children: s }, idx))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 glass-card-inset rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3", children: "Month 1: Getting Started" }), _jsx("ul", { className: "text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5", children: activeRoadmap.roadmap.plan30Days.map((task, idx) => (_jsx("li", { children: task }, idx))) })] }), _jsxs("div", { className: "p-4 glass-card-inset rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3", children: "Month 2: Building Skills" }), _jsx("ul", { className: "text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5", children: activeRoadmap.roadmap.plan60Days.map((task, idx) => (_jsx("li", { children: task }, idx))) })] }), _jsxs("div", { className: "p-4 glass-card-inset rounded-xl border border-purple-500/15", children: [_jsx("span", { className: "text-[11px] font-mono leading-none font-bold text-pink-400 block mb-3", children: "Month 3: Going Pro" }), _jsx("ul", { className: "text-[11px] text-slate-400 leading-relaxed list-disc list-inside space-y-1.5", children: activeRoadmap.roadmap.plan90Days.map((task, idx) => (_jsx("li", { children: task }, idx))) })] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-mono uppercase text-slate-500 block mb-2 font-bold", children: "Learning Resources" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: activeRoadmap.roadmap.learningResources.map((res, idx) => (_jsxs("a", { href: res.url, target: "_blank", rel: "noreferrer", className: "p-3 glass-card-inset hover:bg-[#130310]/60 rounded-lg border border-purple-500/15 text-left block", children: [_jsx("span", { className: "text-[11px] font-bold text-white block truncate leading-tight", children: res.name }), _jsx("span", { className: "text-[10px] text-pink-400 font-mono mt-1 inline-block", children: res.type })] }, idx))) })] })] })), generatedCl && (_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4", children: [_jsxs("div", { className: "flex justify-between items-center border-b border-indigo-950/40 pb-3", children: [_jsx("span", { className: "text-xs font-bold text-emerald-400 uppercase font-mono", children: generatedCl.title }), _jsxs("button", { onClick: () => downloadCoverLetterText(generatedCl.title, generatedCl.content), className: "px-2.5 py-1 text-[10px] uppercase font-bold text-slate-300 bg-[#1a0516]/65 rounded flex items-center gap-1 hover:text-white", children: [_jsx(Download, { className: "h-3 w-3" }), _jsx("span", { children: "Download Letter" })] })] }), _jsx("p", { className: "glass-card-inset p-4 border border-purple-500/15 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-300", children: generatedCl.content })] }))] })] })] })), activeTab === "interviews" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsx("div", { className: "flex justify-between items-center border-b border-pink-500/10 pb-5", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Interview Practice" }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: "Practice answering interview questions with AI feedback." })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-pink-400 uppercase tracking-widest", children: "Interview Settings" }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-500 mb-1", children: "Job Role" }), _jsx("input", { value: interviewRole, onChange: (e) => setInterviewRole(e.target.value), className: "w-full glass-card-inset text-xs text-white border border-pink-500/10 p-2 rounded-xl focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-500 mb-1", children: "Your Tech Skills" }), _jsx("input", { value: interviewSkills, onChange: (e) => setInterviewSkills(e.target.value), className: "w-full glass-card-inset text-xs text-white border border-pink-500/10 p-2 rounded-xl font-mono focus:border-indigo-500" })] }), _jsx("button", { onClick: loadInterviewQuestions, className: "w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white", children: "Instantiate Question Stream" })] }), _jsx("div", { className: "lg:col-span-2 flex flex-col gap-6", children: activeInterview.length > 0 ? (_jsxs("div", { className: "glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-5", children: [_jsxs("div", { className: "flex justify-between items-center border-b border-pink-500/10 pb-3", children: [_jsxs("span", { className: "text-xs font-bold text-rose-400 uppercase font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20", children: ["Category: ", activeInterview[currentQuestionIndex]?.category] }), _jsxs("span", { className: "text-xs font-mono text-slate-500", children: ["Question ", currentQuestionIndex + 1, " / 5"] })] }), _jsx("div", { className: "glass-card-inset p-5 rounded-2xl border border-purple-500/15", children: _jsx("p", { className: "text-sm font-bold text-white leading-relaxed", children: activeInterview[currentQuestionIndex]?.question }) }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] block uppercase font-bold text-slate-400 mb-1", children: "Your Answer" }), _jsx("textarea", { rows: 5, required: true, value: userAnswerInput, onChange: (e) => setUserAnswerInput(e.target.value), placeholder: "Type your answer here...", className: "w-full glass-card-inset text-xs p-3 border border-purple-500/15 rounded-xl text-slate-300 focus:outline-none" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: evaluateMockAnswer, disabled: isEvaluatingMock, className: "px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl text-xs font-bold text-white", children: isEvaluatingMock ? "Evaluating confidence level..." : "Evaluate answer" }), currentQuestionIndex < 4 ? (_jsx("button", { onClick: () => {
                                                                        setCurrentQuestionIndex(prev => prev + 1);
                                                                        setUserAnswerInput("");
                                                                        setMockFeedback(null);
                                                                    }, className: "px-4 py-2 bg-[#20071c]/70 hover:bg-[#1a0516]/65 text-xs font-bold text-white rounded-xl", children: "Next Question" })) : (_jsx("button", { onClick: () => {
                                                                        setActiveInterview([]);
                                                                        alert("Thank you for completing the comprehensive AI Mock Interview run! Check admin tab to inspect details.");
                                                                    }, className: "px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-xs font-bold text-white rounded-xl", children: "Finish Session" }))] }), mockFeedback && (_jsxs("div", { className: "glass-card-inset p-4 rounded-xl border border-purple-500/15 flex flex-col gap-3", children: [_jsx("span", { className: "text-[10px] uppercase font-bold text-pink-400 tracking-wider", children: "Your Score" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 text-center", children: [_jsxs("div", { className: "bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15", children: [_jsx("span", { className: "text-[9px] uppercase block font-bold text-slate-400", children: "Confidence" }), _jsxs("span", { className: "text-sm font-mono text-emerald-400 font-bold", children: [mockFeedback.metrics.confidence, "%"] })] }), _jsxs("div", { className: "bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15", children: [_jsx("span", { className: "text-[9px] uppercase block font-bold text-slate-400", children: "Relevance" }), _jsxs("span", { className: "text-sm font-mono text-emerald-400 font-bold", children: [mockFeedback.metrics.relevance, "%"] })] }), _jsxs("div", { className: "bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15", children: [_jsx("span", { className: "text-[9px] uppercase block font-bold text-slate-400", children: "Communication" }), _jsxs("span", { className: "text-sm font-mono text-fuchsia-400 font-bold", children: [mockFeedback.metrics.communication, "%"] })] }), _jsxs("div", { className: "bg-[#130310]/60 p-2 rounded-lg border border-purple-500/15", children: [_jsx("span", { className: "text-[9px] uppercase block font-bold text-slate-400", children: "Overall" }), _jsxs("span", { className: "text-sm font-mono text-pink-400 font-bold", children: [mockFeedback.metrics.overall, "%"] })] })] }), _jsxs("div", { className: "border-t border-pink-500/10 pt-3", children: [_jsx("span", { className: "text-[9px] uppercase font-bold text-slate-500", children: "Coach Feedback" }), _jsx("p", { className: "text-xs text-slate-300 mt-1 leading-relaxed font-mono", children: mockFeedback.critique })] })] }))] })) : (_jsx("div", { className: "py-24 text-center glass-panel glass-panel-hover rounded-3xl", children: _jsx("p", { className: "text-slate-400", children: "Set your job role and skills on the left, then click 'Start Interview' to launch interview mockup." }) })) })] })] })), activeTab === "chatbot" && (_jsxs("div", { className: "max-w-4xl mx-auto w-full px-6 py-8 flex flex-col gap-6 flex-1", children: [_jsxs("div", { className: "border-b border-pink-500/10 pb-3", children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "AI Career Coach" }), _jsx("p", { className: "text-xs text-slate-400 leading-tight", children: "Ask anything about your career, resume, or interview prep." })] }), _jsxs("div", { className: "bg-[#130310]/60 border border-purple-500/15 rounded-2xl flex flex-col h-[520px] overflow-hidden", children: [_jsx("div", { className: "flex-1 overflow-y-auto p-6 flex flex-col gap-4", children: chatMessages.map((msg, idx) => {
                                                    const isUser = msg.sender === "user";
                                                    return (_jsxs("div", { className: `flex flex-col max-w-lg ${isUser ? "self-end align-right" : "self-start align-left"}`, children: [_jsx("span", { className: "text-[9px] text-slate-500 uppercase tracking-widest ml-2 mb-1", children: isUser ? "Candidate Player" : "SaaS AI Coach" }), _jsx("div", { className: `p-4 rounded-xl text-xs leading-relaxed ${isUser
                                                                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-none"
                                                                    : "glass-card-inset text-slate-200 rounded-tl-none border border-purple-500/15"}`, children: msg.text })] }, idx));
                                                }) }), _jsxs("form", { onSubmit: handleSendChatMessage, className: "p-4 glass-card-inset border-t border-pink-500/10 flex gap-3", children: [_jsx("input", { type: "text", required: true, value: chatInput, onChange: (e) => setChatInput(e.target.value), placeholder: "Ask anything \u2014 How do I improve my ATS score?", className: "flex-1 glass-panel glass-panel-hover px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono" }), _jsx("button", { type: "submit", className: "p-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white transition-all", children: _jsx(Send, { className: "h-4.5 w-4.5" }) })] })] })] })), activeTab === "admin" && (_jsxs("div", { className: "max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 flex-1", children: [_jsxs("div", { className: "flex justify-between items-center border-b border-pink-500/10 pb-5 flex-wrap gap-2", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white font-mono text-pink-400 uppercase tracking-widest", children: "Analytics Overview" }), _jsx("p", { className: "text-xs text-slate-400", children: "Usage stats and skill trends across all resumes." })] }), _jsx("button", { onClick: () => setActiveTab("dashboard"), className: "px-3 py-1.5 bg-[#1a0516]/65 hover:bg-[#2c0b26] text-xs text-slate-300 rounded-lg", children: "Back Dashboard" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "p-5 glass-panel rounded-2xl", children: [_jsx("span", { className: "text-[10px] uppercase text-slate-500 font-bold block", children: "Total Users" }), _jsx("span", { className: "text-3xl font-extrabold text-white font-mono block mt-1", children: stats.totalUsers }), _jsx("span", { className: "text-[10px] text-emerald-400 font-mono mt-0.5", children: "\u25CF Active" })] }), _jsxs("div", { className: "p-5 glass-panel rounded-2xl", children: [_jsx("span", { className: "text-[10px] uppercase text-slate-500 font-bold block", children: "Resumes Uploaded" }), _jsx("span", { className: "text-3xl font-extrabold text-pink-400 font-mono block mt-1", children: stats.totalResumes }), _jsx("span", { className: "text-[10px] text-slate-500 font-mono mt-0.5", children: "Total uploads" })] }), _jsxs("div", { className: "p-5 glass-panel rounded-2xl", children: [_jsx("span", { className: "text-[10px] uppercase text-slate-500 font-bold block", children: "ATS Scans Done" }), _jsx("span", { className: "text-3xl font-extrabold text-fuchsia-400 font-mono block mt-1", children: stats.totalATSAnalyses }), _jsx("span", { className: "text-[10px] text-slate-500 font-mono mt-0.5", children: "Scans completed" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col gap-4", children: [_jsx("h3", { className: "text-sm font-mono font-bold text-white uppercase tracking-wider", children: "In-Demand Skills" }), _jsx("div", { className: "flex flex-col gap-3", children: analyticsData.skillDemand.map((sd, idx) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center text-xs text-slate-300 mb-1 font-mono", children: [_jsx("span", { children: sd.name }), _jsxs("span", { children: [sd.demand, "% Demand Rating"] })] }), _jsx("div", { className: "w-full glass-card-inset h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full", style: { width: `${sd.demand}%` } }) })] }, idx))) })] }), _jsxs("div", { className: "glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-mono font-bold text-white uppercase tracking-wider", children: "Monthly Score Trends" }), _jsx("p", { className: "text-xs text-slate-500", children: "Average resume quality over time." })] }), _jsx("div", { className: "h-44 w-full flex items-end justify-between gap-2 glass-card-inset p-4 rounded-xl border border-purple-500/15", children: analyticsData.qualityTrends.map((qt, idx) => (_jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [_jsx("div", { className: "text-[9px] font-mono text-pink-400 font-semibold", children: qt.avgScore }), _jsx("div", { className: "w-full bg-pink-500/80 hover:bg-pink-400 transition-all rounded-t", style: { height: `${qt.avgScore * 1.2}px` } }), _jsx("span", { className: "text-[10px] text-slate-500 font-mono mt-1", children: qt.month })] }, idx))) })] })] })] }))] }), !isSidebarLayout && (_jsxs("footer", { className: "bg-[#0a0108] border-t border-pink-500/10 px-6 py-6 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsx("div", { children: _jsx("span", { children: "\u00A9 2026 AI Resume Intelligence Platform. Manufactured in sandbox cluster." }) }), _jsx("div", { className: "flex items-center gap-4 font-mono", children: _jsx("span", { children: "v2.4.0" }) })] }))] })] }));
}
