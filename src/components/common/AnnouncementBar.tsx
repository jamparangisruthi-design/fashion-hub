import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, ChevronRight, X } from 'lucide-react';

const offers = [
  'Use Code WELCOME10 for 10% OFF on your first Western order!',
  'FREE EXPRESS DELIVERY across India on all orders over ₹999',
  'End of Season Western Clearance: Flat 50% OFF on Selected Styles',
  'Hassle-Free 14-Day Doorstep Returns & Exchanges'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-[#121212] text-white text-xs sm:text-sm py-2 px-4 transition-all duration-300 relative border-b border-white/10 dark:bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-zinc-400">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium tracking-wide">LIMITED TIME OFFERS</span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center space-x-2 animate-fade-in key={currentIdx}">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>{offers[currentIdx]}</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="hidden lg:inline text-zinc-400">IN (₹)</span>
          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Dismiss announcement"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
