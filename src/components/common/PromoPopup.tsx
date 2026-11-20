import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';

export const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('fashhub_promo_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('fashhub_promo_seen', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 text-zinc-700 dark:text-zinc-200 transition-colors"
          aria-label="Close promotion modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5">
          <div className="hidden md:block md:col-span-2 relative min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
              alt="Western Fashion Promo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-serif-luxury tracking-widest uppercase">
                New Season 2026
              </span>
            </div>
          </div>

          <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 self-center md:self-start bg-amber-500/10 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIRST ORDER PRIVILEGE</span>
            </div>

            <h3 className="text-2xl font-display font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
              GET 10% OFF
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Step into Western luxury. Enjoy 10% off your entire first purchase across all collections.
            </p>

            <div className="flex items-center border border-dashed border-zinc-400 dark:border-zinc-700 rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 mb-6 justify-between">
              <div className="text-left pl-2">
                <span className="text-[10px] text-zinc-400 block tracking-widest uppercase">
                  Coupon Code
                </span>
                <span className="font-mono font-bold tracking-widest text-lg text-amber-600 dark:text-amber-400">
                  WELCOME10
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#121212] dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              Start Shopping Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
