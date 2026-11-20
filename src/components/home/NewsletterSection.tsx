import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#161616] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>JOIN THE FASH HUB CLUB</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
          SUBSCRIBE & ENJOY ₹500 OFF
        </h2>

        <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Be the first to know about new Western generation drops, secret VIP flash sales, runway lookbooks, and exclusive coupon codes.
        </p>

        {subscribed ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center space-x-2 animate-fade-in">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">
              Thank you for subscribing! Check your email for your ₹500 voucher code.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-800/80 border border-zinc-700 rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-4" />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-zinc-900 hover:bg-amber-400 transition-colors rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 shadow-lg"
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="text-[11px] text-zinc-500">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
