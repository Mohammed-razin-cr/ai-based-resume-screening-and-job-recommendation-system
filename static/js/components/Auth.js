const { useState } = window.React;

export function Auth({ onAuthSuccess, theme, onToggleTheme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password } 
      : { name, email, password, confirmPassword };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server processing error');
      }

      if (isLogin) {
        localStorage.setItem('ats_token', data.token);
        localStorage.setItem('ats_user', JSON.stringify(data.user));
        onAuthSuccess(data.user, data.token);
      } else {
        setMessage(data.message || 'Registration successful! Proceed to login.');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = () => {
    // Fast demo login pathways matching seed credentials
    setEmail('alex.rivera@techflow.io');
    setPassword('seed');
    setIsLogin(true);
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Theme Toggle in upper right corner of Auth Screen -->
      {onToggleTheme && (
        <div class="absolute top-6 right-6 z-50">
          <button
            onClick={onToggleTheme}
            class="p-2.5 rounded-xl border border-slate-800 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 bg-slate-900/40 custom-blur transition"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <i data-lucide={theme === 'dark' ? "sun" : "moon"} class="w-4 h-4"></i>
          </button>
        </div>
      )}

      <!-- Background Ambient Glow -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-md w-full space-y-8 bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl custom-blur shadow-2xl relative z-10">
        <div>
          <div class="flex justify-center">
            <span class="p-3 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-2xl shadow-lg ring-4 ring-indigo-500/20 text-white font-display text-xl font-bold tracking-wider">
              AI
            </span>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold font-display text-slate-100 tracking-tight">
            {isLogin ? 'Welcome back, professional' : 'Start your cloud career'}
          </h2>
          <p class="mt-2 text-center text-sm text-slate-400">
            Powered by <span class="font-semibold text-indigo-400">Flask, SQL & Pandas Analytics</span>
          </p>
        </div>

        {error && (
          <div class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{message}</span>
          </div>
        )}

        <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div class="rounded-md space-y-4">
            {!isLogin && (
              <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="appearance-none relative block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm font-medium transition"
                  placeholder="e.g. Alex Rivera"
                />
              </div>
            )}

            <div>
              <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="appearance-none relative block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm font-medium transition"
                placeholder="you@domain.com"
              />
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="appearance-none relative block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm font-medium transition"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    class="appearance-none relative block w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950/80 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm font-medium transition"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all font-display hover:shadow-lg hover:shadow-indigo-500/20"
            >
              {loading ? (
                <span class="flex items-center space-x-2">
                  <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span>Processing...</span>
                </span>
              ) : (
                <span>{isLogin ? 'Sign In Securely' : 'Create Account'}</span>
              )}
            </button>
          </div>
        </form>

        <div class="mt-4 flex flex-col items-center space-y-3">
          <button
            onClick={() => setIsLogin(!isLogin)}
            class="text-xs font-medium text-slate-400 hover:text-indigo-400 transition"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already mapped? Go to sign-in'}
          </button>

          <div class="w-full flex items-center justify-between py-2">
            <span class="w-1/3 border-b border-slate-800/60"></span>
            <span class="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Demo Access</span>
            <span class="w-1/3 border-b border-slate-800/60"></span>
          </div>

          <button
            onClick={loginAsDemo}
            class="w-full py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-white transition flex items-center justify-center space-x-2 shadow-inner"
          >
            <span>Auto-fill Demo Practitioner (Alex & Sid)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
