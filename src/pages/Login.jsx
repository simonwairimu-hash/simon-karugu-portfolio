import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { KeyRound, Mail, AlertCircle, ArrowRight, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  // Form Validation
  const validateForm = () => {
    if (!email) {
      setError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email format.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred during login.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center justify-center bg-portfolio-bg overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/50 dark:from-zinc-950 via-portfolio-bg to-portfolio-bg pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-portfolio-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="max-w-md w-full space-y-8 z-10"
      >
        <div>
          {/* Lock Icon Emblem */}
          <div className="mx-auto h-12 w-12 rounded-2xl bg-portfolio-accent/10 border border-portfolio-accent/20 flex items-center justify-center text-portfolio-accent shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-portfolio-text">
            Admin Console
          </h2>
          <p className="mt-2 text-center text-xs text-portfolio-muted font-mono uppercase tracking-widest">
            Enter credentials to manage portfolio
          </p>
        </div>

        {/* Login Form Container */}
        <div className="card-surface rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Display error validation */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs leading-relaxed"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
                    placeholder="wairimusimon551@gmail.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-portfolio-bg bg-portfolio-accent hover:bg-portfolio-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-portfolio-accent/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-portfolio-accent/10 transition-all duration-300"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-portfolio-bg border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
