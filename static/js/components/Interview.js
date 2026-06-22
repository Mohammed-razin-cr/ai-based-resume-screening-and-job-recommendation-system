const { useState, useEffect } = window.React;

export function Interview() {
  const [questions, setQuestions] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/interview/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roleName: 'Full Stack Engineer' })
        });
        const data = await response.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/interview/mock-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerText: answer })
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Evaluation pipeline down');

      setFeedback(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setAnswer('');
    setActiveIdx((prev) => (prev + 1) % questions.length);
  };

  if (fetching) {
    return (
      <div class="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-r-2 border-transparent"></div>
        <p class="mt-4 text-xs font-mono text-slate-400">Loading interview schema checklists...</p>
      </div>
    );
  }

  const currentQ = questions[activeIdx];

  return (
    <div class="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div class="text-center">
        <span class="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
          Technical Mock Testing Ground
        </span>
        <h2 class="text-2xl font-extrabold font-display text-slate-100 tracking-tight mt-3">Interactive Interview Simulator</h2>
        <p class="text-slate-400 text-xs mt-1">Answer questions below. Our NLP scoring modules track terminology alignment and calculate grading verdicts.</p>
      </div>

      {currentQ && (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Question & Input Form -->
          <div class="md:col-span-2 space-y-6">
            <div class="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden">
              <span class="absolute top-4 right-4 text-[10px] font-mono text-slate-500">
                Question {activeIdx + 1} of {questions.length}
              </span>

              <div class="space-y-4">
                <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono uppercase font-bold">
                  Category: {currentQ.category}
                </span>
                <h4 class="text-base font-bold font-display text-slate-100 leading-relaxed">
                  "{currentQ.question}"
                </h4>
              </div>

              <form onSubmit={handleEvaluate} class="mt-6 space-y-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Your Answer Transcript</label>
                  <textarea
                    required
                    rows="6"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Draft your response here. Try to mention concrete architectures, metrics, and systems integrations."
                    class="appearance-none block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium transition resize-none"
                  ></textarea>
                </div>

                <div class="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading || !answer.trim()}
                    class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-bold text-xs text-white rounded-xl shadow-lg transition disabled:opacity-50 font-display"
                  >
                    {loading ? 'Submitting Answers to NLP Model...' : 'Submit answer for AI Evaluation'}
                  </button>
                  {feedback && (
                    <button
                      type="button"
                      onClick={handleNext}
                      class="py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 font-bold text-xs text-slate-300 rounded-xl transition"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <!-- Evaluation Report Sidebar -->
          <div class="space-y-6">
            {!feedback ? (
              <div class="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl h-full flex flex-col items-center justify-center text-center text-slate-500 min-h-[300px]">
                <i data-lucide="help-circle" class="w-8 h-8 opacity-30"></i>
                <h5 class="text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">Awaiting Transcript</h5>
                <p class="text-[11px] text-slate-500 mt-1 max-w-[200px]">Submit your reply to activate live grading feedback metrics.</p>
              </div>
            ) : (
              <div class="p-6 bg-slate-900/40 border border-indigo-500/20 rounded-2xl space-y-5 animate-fadeIn">
                <div class="text-center space-y-1">
                  <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Alignment Score</span>
                  <p class="text-3xl font-extrabold text-indigo-400 font-mono mt-1">{feedback.score}%</p>
                  <span class="text-xs font-semibold text-emerald-400 block pt-1">{feedback.verdict}</span>
                </div>

                <div class="border-t border-slate-900/60 pt-4 space-y-3 text-xs">
                  <div>
                    <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Answer Strengths</span>
                    <ul class="space-y-1">
                      {(feedback.strengths || []).map((st, i) => (
                        <li key={i} class="text-slate-300 leading-normal flex items-start gap-1.5">
                          <span class="text-emerald-500 font-bold">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div class="pt-2 border-t border-slate-900/40">
                    <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">Improvement Gaps</span>
                    <ul class="space-y-1">
                      {(feedback.weaknesses || []).map((wk, i) => (
                        <li key={i} class="text-slate-400 leading-normal flex items-start gap-1.5">
                          <span class="text-amber-500 font-bold">•</span>
                          <span>{wk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
