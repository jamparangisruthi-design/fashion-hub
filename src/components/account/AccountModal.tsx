import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const { login, register, loginAsDemoCustomer, loginAsDemoAdmin } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim()) return;
      login(email.trim());
      setFeedback('Successfully signed in!');
      setTimeout(() => {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      }, 500);
    } else if (mode === 'register') {
      if (!name.trim() || !email.trim()) return;
      register(name.trim(), email.trim(), phone.trim());
      setFeedback('Account created successfully!');
      setTimeout(() => {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      }, 500);
    } else {
      setFeedback('A password reset link has been sent to your email.');
    }
  };

  const handleDemoCustomer = () => {
    loginAsDemoCustomer();
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-1.5 mb-2">
            <span className="text-2xl font-display font-black tracking-wider text-black dark:text-white">
              FASH HUB
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          </div>
          <h3 className="text-lg font-display font-bold uppercase tracking-wider">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {mode === 'login' && 'Sign in to access your orders, wishlist, and tailored style drops.'}
            {mode === 'register' && 'Join the FASH HUB privilege club for exclusive perks.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200/50 dark:border-amber-900/40 mb-6 text-xs">
          <p className="text-[10px] uppercase font-bold tracking-wider text-amber-800 dark:text-amber-400 mb-2 text-center">
            ⚡ Quick Demo 1-Click Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="py-2 px-3 bg-white dark:bg-zinc-800 rounded-xl font-bold text-[11px] hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              <span>Customer Demo</span>
            </button>

            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-2 px-3 bg-amber-500 text-black rounded-xl font-bold text-[11px] hover:bg-amber-600 shadow-sm flex items-center justify-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Malhotra"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-black"
                />
                <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. aarav@fashhub.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-black"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                Mobile Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-black"
                />
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-600 dark:text-zinc-400">
                  Password *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:border-black"
                />
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {feedback && (
            <p className="text-xs text-center text-emerald-600 font-semibold">{feedback}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center space-x-2"
          >
            <span>
              {mode === 'login' && 'SIGN IN'}
              {mode === 'register' && 'CREATE ACCOUNT'}
              {mode === 'forgot' && 'SEND RESET LINK'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login, Register, Forgot */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-500 space-y-2">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-bold text-black dark:text-white hover:underline"
              >
                Register Now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-black dark:text-white hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

