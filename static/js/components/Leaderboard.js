const { useState, useEffect } = window.React;

export function Leaderboard({ resumeIds, onBackToDashboard }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('ats_token') || 'guest-session';
        const response = await fetch('/api/resumes/batch-analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ resumeIds })
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.error || 'Could not compile benchmarking analysis.');
        }

        setData(resData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (resumeIds && resumeIds.length > 0) {
      fetchLeaderboard();
    } else {
      setError('No candidate resumes were designated for comparison.');
      setLoading(false);
    }
  }, [resumeIds]);

  if (loading) {
    return (
      <div class="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-r-2 border-transparent"></div>
        <p class="mt-4 text-xs font-mono text-slate-400">Loading side-by-side analytical benchmarking...</p>
      </div>
    );
  }

  return (
    <div class="space-y-8 animate-fadeIn">
      {/* Back Header */}
      <div class="flex items-center justify-between border-b border-slate-900 pb-4">
        <button
          onClick={onBackToDashboard}
          class="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-indigo-400 transition"
        >
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Escape to Records
        </button>
        <span class="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
          Batch Comparator Active
        </span>
      </div>

      {error && (
        <div class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center space-x-2">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>{error}</span>
        </div>
      )}

      {data && (
        <div class="space-y-8Data">
          {/* Analytical Insights */}
          <div class="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-500/20 rounded-2xl space-y-3 shadow-xl">
            <h3 class="text-sm font-bold font-display text-indigo-300 uppercase tracking-wider">Algorithmic Benchmarking Insights</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
              <div class="space-y-2">
                <p class="flex items-start gap-2">
                  <span class="mt-0.5 p-0.5 bg-indigo-500/10 text-indigo-400 rounded">
                    <i data-lucide="award" class="w-3.5 h-3.5"></i>
                  </span>
                  <span><strong>Top Candidate Matching:</strong> {data.insights?.topWinner || 'Awaiting metrics.'}</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="mt-0.5 p-0.5 bg-amber-500/10 text-amber-400 rounded">
                    <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                  </span>
                  <span><strong>Purge Warnings:</strong> {data.insights?.weakWarning || 'Calibration is steady.'}</span>
                </p>
              </div>

              <div class="space-y-2">
                <span class="text-[10px] uppercase font-mono text-slate-500 block">Actions recommendation Roadmap</span>
                {(data.insights?.remedySteps || []).map((step, idx) => (
                  <p key={idx} class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{step}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard Bench */}
          <div class="space-y-4">
            <h4 class="text-md font-bold font-display text-slate-200">Comparative Standings Matrix</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data.leaderboard || []).map((cand, index) => {
                const rankColor = index === 0 ? 'border-amber-500/30 bg-amber-500/5'
                                : index === 1 ? 'border-slate-400/30 bg-slate-400/5'
                                : 'border-slate-800 bg-slate-900/10';

                return (
                  <div key={cand.id} class={`p-6 border rounded-2xl relative overflow-hidden flex flex-col justify-between ${rankColor}`}>
                    {/* Ribbon Rank */}
                    <span class="absolute top-4 right-4 text-xs font-mono font-bold bg-slate-950 px-2.5 py-1 border border-slate-900 rounded-lg text-slate-400">
                      Rank #{cand.rank || index + 1}
                    </span>

                    <div class="space-y-4">
                      <div>
                        <h5 class="text-base font-bold font-display text-slate-100">{cand.name || cand.fullName}</h5>
                        <p class="text-[10px] font-mono text-slate-500 mt-0.5 select-all">{cand.fileName}</p>
                      </div>

                      <div class="pt-2 grid grid-cols-2 gap-4 border-t border-slate-900/60 text-center">
                        <div class="p-3 bg-slate-950/40 rounded-xl border border-slate-900">
                          <span class="text-[9px] font-mono text-slate-500 uppercase block">ATS compatibility</span>
                          <span class="text-base font-extrabold text-indigo-400 font-mono mt-0.5 block">
                            {cand.atsScore || cand.score}%
                          </span>
                        </div>

                        <div class="p-3 bg-slate-950/40 rounded-xl border border-slate-900">
                          <span class="text-[9px] font-mono text-slate-500 uppercase block">Keyword Match</span>
                          <span class="text-base font-extrabold text-emerald-400 font-mono mt-0.5 block">
                            {cand.jobMatch || cand.skillsMatch || 0}%
                          </span>
                        </div>
                      </div>

                      <div class="text-xs space-y-1">
                        <span class="text-[10px] font-mono text-slate-500 uppercase">Primary Roles:</span>
                        <p class="text-slate-300 font-medium leading-relaxed bg-slate-950/20 p-2.5 rounded-xl border border-slate-900">
                          {cand.experienceRoles || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
