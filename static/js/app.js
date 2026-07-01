import { Auth } from './components/Auth.js';
import { Dashboard } from './components/Dashboard.js';
import { ResumeUpload } from './components/ResumeUpload.js';
import { Leaderboard } from './components/Leaderboard.js';
import { CareerCoach } from './components/CareerCoach.js';
import { Interview } from './components/Interview.js';
import { Roadmap } from './components/Roadmap.js';
import { ResumeBuilder } from './components/ResumeBuilder.js';

const { useState, useEffect } = window.React;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [navTab, setNavTab] = useState('dashboard'); // 'dashboard', 'upload', 'comparison', 'chat', 'interview', 'roadmap', 'builder'
  const [compareIds, setCompareIds] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ats_theme') || 'dark';
  });

  // Check storage session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('ats_token');
    const savedUser = localStorage.getItem('ats_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Update theme class on mount or change
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('ats_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setNavTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('ats_token');
    localStorage.removeItem('ats_user');
    setUser(null);
    setToken(null);
  };

  const triggerUploadClick = () => setNavTab('upload');
  
  const triggerBatchCompareClick = (ids) => {
    setCompareIds(ids);
    setNavTab('comparison');
  };

  // Callback to refresh dashboard counts/lists when uploading completes
  const handleIngestCompleted = () => {
    // Optionally alert or queue toast
  };

  // Re-trigger icon updates when tabs or theme change
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, [navTab, user, theme]);

  if (!token) {
    return <Auth onAuthSuccess={handleAuthSuccess} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <div class="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100">
      {/* High contrast responsive navigation rail */}
      <nav class="bg-slate-900/60 border-b border-slate-800/80 custom-blur sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-8">
              <span class="flex items-center gap-2 group cursor-pointer" onClick={() => setNavTab('dashboard')}>
                <span class="p-2 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl font-bold font-display text-white shadow-lg tracking-wider">
                  AI
                </span>
                <span class="font-bold font-display text-base tracking-tight text-white group-hover:text-indigo-400 transition">
                  ATS Insight
                </span>
              </span>

              {/* Tab Navigation selectors */}
              <div class="hidden md:flex space-x-1">
                <button
                  onClick={() => setNavTab('dashboard')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'dashboard' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Dashboard
                </button>
                <button
                  onClick={() => setNavTab('upload')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'upload' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="upload-cloud" class="w-4 h-4"></i> Parse Resume
                </button>
                <button
                  onClick={() => setNavTab('chat')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'chat' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="message-square" class="w-4 h-4"></i> Career Chat
                </button>
                <button
                  onClick={() => setNavTab('interview')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'interview' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="mic" class="w-4 h-4"></i> Mock Interview
                </button>
                <button
                  onClick={() => setNavTab('roadmap')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'roadmap' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="route" class="w-4 h-4"></i> Roadmap
                </button>
                <button
                  onClick={() => setNavTab('builder')}
                  class={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 ${
                    navTab === 'builder' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i data-lucide="layout-template" class="w-4 h-4"></i> Resume Templates
                </button>
              </div>
            </div>

            {/* Profile Info & logout */}
            <div class="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle Action */}
              <button
                onClick={toggleTheme}
                class="p-2.5 rounded-xl border border-slate-800 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 transition"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <i data-lucide={theme === 'dark' ? "sun" : "moon"} class="w-4 h-4"></i>
              </button>

              <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                {user?.avatar ? (
                  <img src={user.avatar} class="w-5 h-5 rounded-full outline outline-2 outline-slate-800" alt="avatar" />
                ) : (
                  <span class="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                    {user?.name?.[0]}
                  </span>
                )}
                <span class="font-medium text-slate-300 select-none">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                class="p-2.5 rounded-xl border border-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition"
                title="Log Out Access"
              >
                <i data-lucide="log-out" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main container panel */}
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {navTab === 'dashboard' && (
          <Dashboard
            onUploadClick={triggerUploadClick}
            onBatchCompareClick={triggerBatchCompareClick}
            onBuilderClick={() => setNavTab('builder')}
            onResumeClick={(res) => {
              // Custom action when clicking a resume from indices
            }}
          />
        )}
        {navTab === 'upload' && (
          <ResumeUpload
            onBackToDashboard={() => setNavTab('dashboard')}
            onUploadSuccess={handleIngestCompleted}
          />
        )}
        {navTab === 'comparison' && (
          <Leaderboard
            resumeIds={compareIds}
            onBackToDashboard={() => setNavTab('dashboard')}
          />
        )}
        {navTab === 'chat' && <CareerCoach />}
        {navTab === 'interview' && <Interview />}
        {navTab === 'roadmap' && <Roadmap />}
        {navTab === 'builder' && <ResumeBuilder />}
      </main>

      {/* Mini footer */}
      <footer class="border-t border-slate-900 text-center py-6 text-[10px] font-mono text-slate-600 block">
        AI Talent Platform • Powered by SQLite rel-db, Pandas analytical series & Gemini NLP engines.
      </footer>
    </div>
  );
}

// Render root App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
