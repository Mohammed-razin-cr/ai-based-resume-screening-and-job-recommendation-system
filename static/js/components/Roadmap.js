const { useState } = window.React;

export function Roadmap() {
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetRole.trim()) {
      setError('Please designate a Target Career Designation.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('ats_token') || 'guest-session';
      const response = await fetch('/api/career/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          targetRole: targetRole.trim(),
          currentSkillsRaw: currentSkills.trim()
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Roadmap compilation failure');

      setRoadmap(data.report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setTargetRole('Senior DevOps & SRE Engineer');
    setCurrentSkills('Docker, SQL, Git, Linux, Bash Scripting');
  };

  return (
    <div class="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <div class="text-center">
        <span class="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
          Skill-Gap Roadmapping Engine
        </span>
        <h2 class="text-2xl font-extrabold font-display text-slate-100 tracking-tight mt-3">30-60-90 Day Career Planner</h2>
        <p class="text-slate-400 text-xs mt-1">Designate your dream engineering position to synthesize visual milestone roadmaps & reference learning guides.</p>
      </div>

      {!roadmap ? (
        <div class="max-w-xl mx-auto p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          {error && (
            <div class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center space-x-2 mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} class="space-y-5">
            <div>
              <label class="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Target Role Designation</label>
              <input
                required
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Machine Learning Engineer"
                class="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium transition"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Existing Core Competencies (CSV)</label>
              <input
                type="text"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="e.g. JavaScript, Python, Git (Optional)"
                class="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium transition"
              />
            </div>

            <div class="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-bold text-xs text-white rounded-xl shadow-lg transition disabled:opacity-50 font-display"
              >
                {loading ? 'Synthesizing Career Schedules...' : 'Chart My Roadmap'}
              </button>
              <button
                type="button"
                onClick={handleUseDemo}
                class="py-3 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold text-xs text-slate-300 rounded-xl transition"
              >
                Fill SRE Demo
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div class="space-y-8 animate-fadeIn">
          {/* Back trigger inside results */}
          <div class="flex justify-end">
            <button
              onClick={() => setRoadmap(null)}
              class="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl transition font-display"
            >
              Reconfigure Career Profile
            </button>
          </div>

          {/* Basic Roadmap details ribbon */}
          <div class="p-6 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900/40 border border-slate-800 rounded-2xl">
            <span class="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Profile report Map
            </span>
            <h3 class="text-xl font-extrabold font-display text-slate-100 mt-2">Target Profile: {roadmap.targetRole}</h3>
            
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span class="text-slate-500 block uppercase text-[10px]">Recognized Strengths:</span>
                <p class="text-slate-300 mt-1 flex flex-wrap gap-1.5">
                  {roadmap.currentSkills && roadmap.currentSkills.length > 0
                    ? roadmap.currentSkills.map(sk => <span key={sk} class="px-2 py-0.5 rounded bg-slate-950 border border-slate-900">{sk}</span>)
                    : <span class="italic text-slate-500">None declared</span>
                  }
                </p>
              </div>

              <div>
                <span class="text-slate-500 block uppercase text-[10px]">Unresolved Skill Gaps:</span>
                <p class="text-indigo-400 font-bold mt-1 flex flex-wrap gap-1.5">
                  {(roadmap.missingSkills || []).map(sk => (
                    <span key={sk} class="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">{sk}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* 30-60-90 Day Milestones Plan layout */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 30 Days block */}
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700/80 transition">
              <div class="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
              <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Phase 1: Foundations</span>
              <h4 class="text-lg font-bold font-display text-slate-200 mt-1">Days 1 - 30</h4>
              
              <div class="mt-6 space-y-4">
                {(roadmap.roadmap?.plan30Days || []).map((task, i) => (
                  <div key={i} class="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                    <span class="mt-0.5 text-indigo-400"><i data-lucide="compass" class="w-4 h-4"></i></span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 60 Days block */}
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700/80 transition">
              <div class="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
              <span class="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Phase 2: Core Optimization</span>
              <h4 class="text-lg font-bold font-display text-slate-200 mt-1">Days 31 - 60</h4>
              
              <div class="mt-6 space-y-4">
                {(roadmap.roadmap?.plan60Days || []).map((task, i) => (
                  <div key={i} class="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                    <span class="mt-0.5 text-purple-400"><i data-lucide="layers" class="w-4 h-4"></i></span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 90 Days block */}
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700/80 transition">
              <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Phase 3: Authority & Scaling</span>
              <h4 class="text-lg font-bold font-display text-slate-200 mt-1">Days 61 - 90</h4>
              
              <div class="mt-6 space-y-4">
                {(roadmap.roadmap?.plan90Days || []).map((task, i) => (
                  <div key={i} class="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                    <span class="mt-0.5 text-emerald-400"><i data-lucide="zap" class="w-4 h-4"></i></span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Resources panel */}
          <div class="p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
            <h4 class="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">Curated Academy Resources</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {(roadmap.roadmap?.learningResources || []).map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-4 rounded-xl bg-slate-950 border border-slate-900 hover:border-slate-800 transition flex items-center justify-between group"
                >
                  <div class="space-y-1">
                    <span class="text-[9px] font-mono text-slate-500 uppercase">{res.type}</span>
                    <h5 class="font-bold text-slate-300 group-hover:text-indigo-400 transition">{res.name}</h5>
                  </div>
                  <span class="p-2 bg-slate-900 text-slate-400 group-hover:text-indigo-400 rounded-lg border border-slate-900 transition">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
