import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface SpecialOfferBannersProps {
  onBrowseTag: (tag: string) => void;
}

export const SpecialOfferBanners: React.FC<SpecialOfferBannersProps> = ({ onBrowseTag }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Banner 1: Under ₹499 */}
        <div
          onClick={() => onBrowseTag('under-499')}
          className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer group min-h-[280px] sm:min-h-[320px] flex items-center p-8 border border-zinc-200 dark:border-zinc-800"
        >
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
            alt="Western Under 499"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

          <div className="relative z-10 max-w-xs space-y-3 text-white">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>SUPER SAVER</span>
            </div>

            <h3 className="text-3xl font-display font-extrabold uppercase tracking-tight">
              UNDER ₹499
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Pocket-friendly everyday Western tees, modal crop tops, and organic baby wear without compromising fabric grade.
            </p>

            <button className="pt-2 text-xs font-bold tracking-widest uppercase flex items-center space-x-2 text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>EXPLORE UNDER ₹499</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Banner 2: Under ₹999 */}
        <div
          onClick={() => onBrowseTag('under-999')}
          className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer group min-h-[280px] sm:min-h-[320px] flex items-center p-8 border border-zinc-200 dark:border-zinc-800"
        >
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
            alt="Western Under 999"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

          <div className="relative z-10 max-w-xs space-y-3 text-white">
            <div className="inline-flex items-center space-x-1.5 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>PREMIUM STAPLES</span>
            </div>

            <h3 className="text-3xl font-display font-extrabold uppercase tracking-tight">
              UNDER ₹999
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Heavyweight acid-wash oversized tees, textured pique polos, comfort stretch denim, and party skater dresses.
            </p>

            <button className="pt-2 text-xs font-bold tracking-widest uppercase flex items-center space-x-2 text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>EXPLORE UNDER ₹999</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
