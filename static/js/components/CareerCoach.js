const { useState, useRef, useEffect } = window.React;

export function CareerCoach() {
  const [messages, setMessages] = useState([
    { id: 'initial', sender: 'coach', text: 'Greeting, seeker! I am your 24/7 AI Career Coach. Ask me how to strengthen your CV credentials, configure database scaling structures, or run high-compatibility NLP reviews.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const userMsg = inputVal.trim();
    setInputVal('');
    
    const newMsgId = `usr-${Date.now()}`;
    setMessages(prev => [...prev, { id: newMsgId, sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMsg })
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Could not request career guidance');

      setMessages(prev => [...prev, { id: `ai-${Date.now()}`, sender: 'coach', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: `error-${Date.now()}`, sender: 'coach', text: `Connection discrepancy: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="space-y-6 flex flex-col h-full min-h-[500px] max-h-[700px] p-6 bg-slate-900/40 border border-slate-800 rounded-3xl animate-fadeIn relative">
      {/* Background glow */}
      <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>

      {/* Header panel */}
      <div class="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
        <div>
          <h2 class="text-sm font-bold font-display text-slate-100 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Career Advisor Mentorship Bot
          </h2>
          <p class="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest font-mono">SQLite Conversational Threading Active</p>
        </div>
        <span class="text-xs font-semibold px-2 py-1 bg-slate-950 text-slate-400 border border-slate-900 rounded-lg">
          Status: Online
        </span>
      </div>

      {/* Conversation Container */}
      <div class="flex-1 overflow-y-auto pr-2 space-y-4 relative z-10 min-h-[300px]">
        {messages.map((m) => (
          <div
            key={m.id}
            class={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              class={`max-w-md p-4 rounded-2xl text-xs leading-relaxed select-text shadow-md border ${
                m.sender === 'user'
                  ? 'bg-indigo-600 border-indigo-500/40 text-white rounded-br-none'
                  : 'bg-slate-950 border-slate-900 text-slate-300 rounded-bl-none'
              }`}
            >
              <div class="font-bold font-mono text-[9px] text-slate-400 uppercase mb-1">
                {m.sender === 'user' ? 'Applicant (You)' : 'AI Advisor'}
              </div>
              <p class="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div class="flex justify-start">
            <div class="p-4 bg-slate-950 border border-slate-900 text-slate-400 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
              <span class="animate-bounce">●</span>
              <span class="animate-bounce [animation-delay:0.2s]">●</span>
              <span class="animate-bounce [animation-delay:0.4s]">●</span>
              <span class="font-mono text-[10px] uppercase text-slate-500">AI Coach formulating guidance...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Action Footer input */}
      <form onSubmit={handleSend} class="flex gap-2 relative z-10 border-t border-slate-800 pt-4">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask how to improve ATS score, optimize keyword coverage, or prepare..."
          class="flex-1 appearance-none block px-4 py-3 bg-slate-950/85 text-slate-100 border border-slate-800 rounded-xl placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs transition"
        />
        <button
          type="submit"
          class="px-5 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition flex items-center gap-1.5 font-display"
        >
          Transmit <i data-lucide="send" class="w-3.5 h-3.5"></i>
        </button>
      </form>
    </div>
  );
}
