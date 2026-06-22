const { useState, useEffect } = window.React;

export function Dashboard({ onUploadClick, onBatchCompareClick, onResumeClick, onBuilderClick }) {
  const [stats, setStats] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeIds, setSelectedResumeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch telemetry and candidate profiles
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('ats_token') || 'guest-session';
      
      const [statsRes, listRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/resumes/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!statsRes.ok || !listRes.ok) {
        throw new Error('Could not pull real-time telemetry from python environment.');
      }

      const statsData = await statsRes.json();
      const listData = await listRes.json();

      setStats(statsData);
      setResumes(listData.resumes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedResumeIds((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Are you certain you want to purge this analysis history from SQLEngine indexes?')) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('ats_token') || 'guest-session';
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Purge pipeline error');
      
      // Refresh
      await fetchDashboardData();
      setSelectedResumeIds(prev => prev.filter(item => item !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBatchCompareSubmit = () => {
    if (selectedResumeIds.length === 0) return;
    onBatchCompareClick(selectedResumeIds);
  };

  if (loading) {
    return (
      <div class="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-r-2 border-transparent"></div>
        <p class="mt-4 text-xs font-mono text-slate-400">Loading Pandas telemetry indices...</p>
      </div>
    );
  }

  return (
    <div class="space-y-8 animate-fadeIn">
      <!-- Welcome Panel -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-indigo-950/20 rounded-3xl border border-slate-800/80 shadow-lg">
        <div>
          <h1 class="text-3xl font-extrabold font-display text-slate-100 tracking-tight">Talent Bench</h1>
          <p class="text-slate-400 text-sm mt-1">Real-time candidate indexing via SQLite and algorithmic Pandas analytics.</p>
        </div>
        <div class="flex gap-3">
          <button
            onClick={onBuilderClick}
            class="px-5 py-3 text-xs font-bold rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-850 text-indigo-400 font-display transition flex items-center gap-2 shadow-sm"
          >
            <i data-lucide="file-signature" class="w-4 h-4"></i> Resume Builder
          </button>
          <button
            onClick={onUploadClick}
            class="px-5 py-3 text-xs font-bold rounded-2xl bg-gradient-to-l from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-display hover:shadow-lg hover:shadow-indigo-500/20 transition flex items-center gap-2"
          >
            <i data-lucide="plus" class="w-4 h-4"></i> Upload & Process Resume
          </button>
        </div>
      </div>

      <!-- Live Statistics (Aggregated dynamically via Pandas) -->
      {stats && (
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p class="text-xs font-mono text-slate-500 uppercase">Unified Profiles</p>
              <h4 class="text-2xl font-bold font-display text-slate-100 mt-2">{stats.totalUsers}</h4>
            </div>
            <span class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <i data-lucide="users" class="w-5 h-5"></i>
            </span>
          </div>

          <div class="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p class="text-xs font-mono text-slate-500 uppercase">Resumes Evaluated</p>
              <h4 class="text-2xl font-bold font-display text-slate-100 mt-2">{stats.totalResumes}</h4>
            </div>
            <span class="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </span>
          </div>

          <div class="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p class="text-xs font-mono text-slate-500 uppercase">Average ATS Score</p>
              <h4 class="text-2xl font-bold font-display text-slate-100 mt-2">{stats.averageScore || 0}%</h4>
            </div>
            <span class="p-3 bg-violet-500/10 rounded-xl text-violet-400">
              <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
            </span>
          </div>

          <div class="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p class="text-xs font-mono text-slate-500 uppercase">Pending Audits</p>
              <h4 class="text-2xl font-bold font-display text-slate-100 mt-2">Active</h4>
            </div>
            <span class="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <i data-lucide="check-circle-2" class="w-5 h-5"></i>
            </span>
          </div>
        </div>
      )}

      <!-- Trending Candidate Skills (Pandas series value counts) -->
      {stats && stats.mostCommonSkills && stats.mostCommonSkills.length > 0 && (
        <div class="p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold font-display text-slate-300">Top Trending Candidate Skills</h3>
            <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
              Pandas Aggregate Series
            </span>
          </div>
          <div class="flex flex-wrap gap-3">
            {stats.mostCommonSkills.map((sk) => (
              <span key={sk.name} class="px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>{sk.name}</span>
                <span class="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {sk.count} resumes
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      <!-- Resume Indices Grid -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold font-display text-slate-200">Candidate Records Indexed in SQL</h2>
            <p class="text-slate-400 text-xs mt-0.5">Toggle checkboxes to construct a custom comparative leaderboard.</p>
          </div>
          {selectedResumeIds.length > 0 && (
            <button
              onClick={handleBatchCompareSubmit}
              class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-purple-500/10 hover:opacity-90 transition flex items-center gap-2"
            >
              <i data-lucide="git-compare" class="w-4 h-4"></i> Compare Selected ({selectedResumeIds.length})
            </button>
          )}
        </div>

        {resumes.length === 0 ? (
          <div class="p-12 border-2 border-dashed border-slate-800/80 rounded-2xl flex flex-col items-center justify-center text-center">
            <span class="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 mb-4">
              <i data-lucide="file-question" class="w-8 h-8"></i>
            </span>
            <h4 class="text-sm font-bold text-slate-300">No records saved inside SQL</h4>
            <p class="text-slate-500 text-xs mt-1 max-w-sm">Upload a new candidate resume to activate advanced score analytics and leaderboard comparisons.</p>
            <button
              onClick={onUploadClick}
              class="mt-4 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl transition"
            >
              Upload First Profile
            </button>
          </div>
        ) : (
          <div class="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/20">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-900/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th class="p-4 w-12 text-center">Select</th>
                  <th class="p-4">Candidate Full Name</th>
                  <th class="p-4">Reference File</th>
                  <th class="p-4 text-center">ATS Score</th>
                  <th class="p-4">Primary Skills Stack</th>
                  <th class="p-4">Analytic Rank</th>
                  <th class="p-4 text-center">Purge</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-900 text-sm">
                {resumes.map((res) => {
                  const isChecked = selectedResumeIds.includes(res.id);
                  const score = res.atsReport?.score || 0;
                  
                  // Score outline color coding
                  const scoreBg = score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : score >= 85 ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

                  return (
                    <tr
                      key={res.id}
                      onClick={() => onResumeClick(res)}
                      class="hover:bg-slate-900/40 transition cursor-pointer group"
                    >
                      <td class="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(res.id)}
                          class="w-4 py-4 rounded bg-slate-950 border-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                      </td>
                      <td class="p-4 font-bold font-display text-slate-200">
                        {res.parsedData?.fullName || 'Anonymous Candidate'}
                      </td>
                      <td class="p-4 text-xs font-mono text-slate-400 select-all">
                        {res.fileName}
                      </td>
                      <td class="p-4 text-center">
                        <span class={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${scoreBg}`}>
                          {score}%
                        </span>
                      </td>
                      <td class="p-4">
                        <div class="flex gap-1.5 flex-wrap max-w-xs">
                          {(res.parsedData?.skills || []).slice(0, 3).map((sk) => (
                            <span key={sk} class="px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-[10px] font-mono text-slate-400">
                              {sk}
                            </span>
                          ))}
                          {(res.parsedData?.skills || []).length > 3 && (
                            <span class="text-[10px] text-indigo-400 font-mono">
                              +{res.parsedData.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td class="p-4">
                        <span class="text-xs font-bold px-2 py-1 bg-slate-950 text-slate-400 border border-slate-900 rounded-lg">
                          {res.atsReport?.gradeCategory || 'Analyzed'}
                        </span>
                      </td>
                      <td class="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleDelete(res.id, e)}
                          disabled={deleteLoading}
                          class="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
