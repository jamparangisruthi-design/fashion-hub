import React from 'react';
import { ArrowRight, Sparkles, Shield, RefreshCw } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onExploreCollections }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f7f4ef] via-white to-zinc-50 dark:from-[#181818] dark:via-[#141414] dark:to-[#121212] py-12 md:py-20 lg:py-24 border-b border-zinc-200 dark:border-zinc-800">
      {/* Background aesthetic decorative shapes */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headings & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>International Western Fashion 2026</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                FASHION FOR <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-amber-700 to-amber-900 dark:from-white dark:via-amber-200 dark:to-amber-500">
                  EVERY GENERATION
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover your style with the latest Western fashion collections. From adorable newborn rompers and Gen-Z oversized streetwear to executive power tailoring and senior comfort wear.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 bg-[#121212] text-white dark:bg-white dark:text-zinc-900 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-zinc-900 dark:border-zinc-300 text-zinc-900 dark:text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all flex items-center justify-center"
              >
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
                  6
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-500 uppercase font-medium tracking-wider">
                  Generations Covered
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
                  50,000+
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-500 uppercase font-medium tracking-wider">
                  Happy Shoppers
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  14 Days
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-500 uppercase font-medium tracking-wider">
                  Free Doorstep Returns
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Fashion Visual Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main featured model image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80"
                  alt="Modern Western Fashion"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-amber-500 text-black px-2.5 py-1 rounded-md self-start mb-2">
                    TRENDING NOW
                  </span>
                  <p className="text-lg font-serif-luxury font-medium">Western Elegance 2026</p>
                  <p className="text-xs text-zinc-300">Silk Blends & Structured Silhouettes</p>
                </div>
              </div>

              {/* Floating secondary badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-xl border border-zinc-100 dark:border-zinc-800 flex items-center space-x-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Pure Fabrics</p>
                  <p className="text-[10px] text-zinc-500">100% GOTS & Pima Cotton</p>
                </div>
              </div>

              {/* Floating secondary badge 2 */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-xl border border-zinc-100 dark:border-zinc-800 flex items-center space-x-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Seamless Exchange</p>
                  <p className="text-[10px] text-zinc-500">Free home trial exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
