const { useState } = window.React;

export function ResumeUpload({ onBackToDashboard, onUploadSuccess }) {
  const [fileName, setFileName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeReport, setActiveReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textContent.trim()) {
      setError('Please paste your resume content text before analytical parse.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('ats_token') || 'guest-session';
      const actualName = fileName.trim() || 'Resume_Profile.txt';

      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fileName: actualName,
          fileType: 'text/plain',
          textContent: textContent
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failure to execute parsing pipeline');
      }

      setActiveReport(data.resume);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setFileName('Alex_Rivera_FullStack.pdf');
    setTextContent(`ALEX RIVERA
alex.rivera@techflow.io | +1 (555) 019-2834 | linkedin.com/in/alex-rivera

SUMMARY:
Highly proficient Full Stack Software Engineer and React architect with experience writing clean modular components. Fast prototyping skills using Python, Flask, SQL databases, and Pandas.

TECHNICAL SKILLS:
React, Node.js, Express, JavaScript, ES6, HTML, CSS, Tailwind CSS, Python, SQL, PostgreSQL, Docker, Git.

WORK EXPERIENCE:
Software Engineer at Stripe (2022 - Present)
- Engineered checkout system components, lowering transaction startup latency by 24%.
- Maintained developer metric web panels utilizing React, Chart.js, and Express.
- Constructed cloud deployment workflows with Docker containers.

EDUCATION:
B.S. in Computer Science - Stanford University (2022)`);
  };

  return (
    <div class="space-y-8 animate-fadeIn">
      {/* Breadcrumb / Header */}
      <div class="flex items-center justify-between border-b border-slate-900 pb-4">
        <button
          onClick={onBackToDashboard}
          class="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-indigo-400 transition"
        >
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Return to Records
        </button>
        <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
          NLP Compiler Active
        </span>
      </div>

      {!activeReport ? (
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Submission Panel */}
          <div class="lg:col-span-2 space-y-6">
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h2 class="text-lg font-bold font-display text-slate-200">Process Candidate Profile</h2>
              <p class="text-xs text-slate-400 mt-1 mb-6">Enter candidate details. Our NLP engine parses textual data, returning ATS scores and formatting improvements.</p>

              {error && (
                <div class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center space-x-2 mb-4">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} class="space-y-5">
                <div>
                  <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Source Document Name</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g. Alex_Rivera_FullStack.pdf"
                    class="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs font-medium transition"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Resume Text Content (Raw)</label>
                  <textarea
                    required
                    rows="12"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste full resume text blocks here (Contacts, Skills, Experience, Projects...)"
                    class="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs font-mono font-medium transition resize-none"
                  ></textarea>
                </div>

                <div class="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-bold text-xs text-white rounded-xl shadow-lg shadow-indigo-500/10 transition-all font-display hover:shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {loading ? 'Compiling NLP Models...' : 'Launch ATS Analysis'}
                  </button>
                  <button
                    type="button"
                    onClick={handleUseDemo}
                    class="py-3 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold text-xs text-slate-300 rounded-xl transition"
                  >
                    Fill Demo Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Feature Description Sidebar */}
          <div class="space-y-6">
            <div class="p-6 bg-slate-900/20 border border-slate-800/80 rounded-2xl">
              <h3 class="text-xs font-bold font-mono uppercase text-indigo-400 tracking-wider">Algorithmic Pillars</h3>
              <div class="mt-4 space-y-4 text-xs">
                <div class="flex gap-3">
                  <span class="w-6 h-6 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h5 class="font-bold text-slate-300">SQLite persistence</h5>
                    <p class="text-slate-500 mt-1 leading-relaxed">Dynamic structured logging stores user metadata and resumes cleanly.</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h5 class="font-bold text-slate-300">Pandas DataFrame Aggregations</h5>
                    <p class="text-slate-500 mt-1 leading-relaxed">Runs dynamic analysis on user inputs, compiling trending keywords.</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="w-6 h-6 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h5 class="font-bold text-slate-300">Gemini Parsing Options</h5>
                    <p class="text-slate-500 mt-1 leading-relaxed">Utilizes advanced Generative models to score matching percentages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
      {/* Comprehensive ATS Score Report Presentation */}
        <div class="space-y-8 animate-fadeIn">
          {/* Candidate Information Ribbon */}
          <div class="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div>
              <span class="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                ATS REPORT RESULT
              </span>
              <h2 class="text-2xl font-extrabold font-display text-slate-100 mt-1.5">
                {activeReport.parsedData?.fullName || 'Anonymous Candidate'}
              </h2>
              <div class="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-1">
                <span>{activeReport.parsedData?.email}</span>
                <span>•</span>
                <span>{activeReport.parsedData?.phone}</span>
                <span>•</span>
                <span>Rank: <span class="text-indigo-400 font-bold">{activeReport.atsReport?.gradeCategory}</span></span>
              </div>
            </div>
            <button
              onClick={() => setActiveReport(null)}
              class="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl transition font-display"
            >
              Examine Another Document
            </button>
          </div>

          {/* Score Metrics Dashboard */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Global Circular Gauge */}
            <div class="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
              <p class="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-4">Cumulative ATS Score</p>
              
              <div class="relative flex items-center justify-center w-28 h-28">
                {/* SVG Circle representation */}
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    class="text-slate-800"
                    stroke-width="2.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    class="text-indigo-500 transition-all duration-1000"
                    stroke-width="2.5"
                    stroke-dasharray={`${activeReport.atsReport?.score || 0}, 100`}
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div class="absolute text-center mt-1">
                  <span class="text-2xl font-extrabold font-display leading-none text-slate-100">
                    {activeReport.atsReport?.score || 0}
                  </span>
                  <span class="text-slate-500 text-[10px] block mt-0.5">%</span>
                </div>
              </div>
              <span class="text-xs font-bold text-indigo-400 mt-4 px-2 py-0.5 bg-indigo-500/10 rounded-lg">
                Grade: {activeReport.atsReport?.gradeCategory}
              </span>
            </div>

            {/* Supporting score dimensions */}
            <div class="md:col-span-3 p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col justify-between">
              <h3 class="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">ATS Parsing Diagnostics</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-400">Structure Score</span>
                    <span class="font-mono text-slate-200 font-bold">{activeReport.atsReport?.structureScore}%</span>
                  </div>
                  <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${activeReport.atsReport?.structureScore || 0}%` }}></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-400">Formatting Quality</span>
                    <span class="font-mono text-slate-200 font-bold">{activeReport.atsReport?.formattingScore}%</span>
                  </div>
                  <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${activeReport.atsReport?.formattingScore || 0}%` }}></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-400">Keyword Density Range</span>
                    <span class="font-mono text-slate-200 font-bold">{activeReport.atsReport?.keywordDensity}%</span>
                  </div>
                  <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-purple-500 h-1.5 rounded-full" style={{ width: `${activeReport.atsReport?.keywordDensity || 0}%` }}></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-400">Skills Core Match</span>
                    <span class="font-mono text-slate-200 font-bold">{activeReport.atsReport?.skillsMatch}%</span>
                  </div>
                  <div class="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${activeReport.atsReport?.skillsMatch || 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Suggested Bullet rewrites (Aesthetic changes) */}
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
              <h3 class="text-sm font-semibold font-display text-slate-300">Suggested Action-Oriented Rewrites</h3>
              <p class="text-xs text-slate-500">Suggested modifications to convert passive expressions into quantitative impact phrases.</p>
              
              <div class="space-y-4">
                {(activeReport.atsReport?.suggestedRewrites || []).map((rw, index) => (
                  <div key={index} class="p-4 rounded-xl bg-slate-950 border border-slate-900 text-xs space-y-2">
                    <span class="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold rounded text-[9px] uppercase tracking-wider">
                      {rw.Section || 'Resume Chunk'}
                    </span>
                    <div>
                      <span class="text-slate-500 block">Original Text:</span>
                      <p class="text-slate-400 mt-0.5 select-all font-serif italic">"{rw.Before}"</p>
                    </div>
                    <div class="border-t border-slate-900/60 pt-2">
                      <span class="text-indigo-400 block font-bold">Optimized Suggestion:</span>
                      <p class="text-slate-200 mt-0.5 select-all font-sans font-medium">"{rw.After}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing skills and development roadmap */}
            <div class="space-y-6">
              {/* Missing keywords / skills */}
              <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <h3 class="text-sm font-semibold font-display text-slate-300 mb-2">Parser Gap Detections</h3>
                <p class="text-xs text-slate-500 mb-4">Skills and terminology requested frequently by target job roles but not localized on this CV.</p>
                
                <div class="space-y-3">
                  <div>
                    <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block mb-2">Target Skills Gaps</span>
                    <div class="flex flex-wrap gap-2">
                      {(activeReport.atsReport?.missingSkills || []).map((sk) => (
                        <span key={sk} class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs rounded-lg font-mono">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div class="pt-2">
                    <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">Missing Semantic Keywords</span>
                    <div class="flex flex-wrap gap-2">
                      {(activeReport.atsReport?.missingKeywords || []).map((kw) => (
                        <span key={kw} class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-lg font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Improvement Roadmap */}
              <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <h3 class="text-sm font-semibold font-display text-slate-300 mb-4">Improvement Checklist</h3>
                <div class="space-y-3">
                  {(activeReport.atsReport?.improvementRoadmap || []).map((item, index) => (
                    <div key={index} class="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                      <span class="mt-0.5 p-1 bg-emerald-500/15 rounded-lg text-emerald-400">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
