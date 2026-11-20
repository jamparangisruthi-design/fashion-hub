import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { initialReviews } from '../../data/initialProducts';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Loved Across All Generations
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white mt-1">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Real verified reviews from thousands of fashion lovers who trust FASH HUB for international Western apparel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {initialReviews.slice(0, 6).map(review => (
          <div
            key={review.id}
            className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* Rating stars */}
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-current' : 'text-zinc-300 dark:text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-zinc-200 dark:text-zinc-800 group-hover:text-amber-500/20 transition-colors" />
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mt-6 flex items-center space-x-3">
              <img
                src={review.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30"
              />
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white flex items-center space-x-1">
                  <span>{review.userName}</span>
                  {review.verifiedPurchase && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  )}
                </p>
                <p className="text-[10px] text-zinc-400">Verified Buyer • {review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
