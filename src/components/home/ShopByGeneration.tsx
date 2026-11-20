import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Generation } from '../../types';

interface ShopByGenerationProps {
  onSelectGeneration: (gen: Generation) => void;
}

interface GenerationCard {
  id: Generation;
  title: string;
  age: string;
  subtitle: string;
  image: string;
  categories: string[];
  color: string;
}

export const ShopByGeneration: React.FC<ShopByGenerationProps> = ({ onSelectGeneration }) => {
  const cards: GenerationCard[] = [
    {
      id: 'baby',
      title: 'BABY COLLECTION',
      age: '0–2 Years',
      subtitle: 'Gentle organic rompers, soft dresses, and cozy sets',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80',
      categories: ['Baby Rompers', 'Baby Dresses', 'Baby T-Shirts', 'Winter Wear'],
      color: 'from-amber-600/40'
    },
    {
      id: 'kids',
      title: 'KIDS COLLECTION',
      age: '2–12 Years',
      subtitle: 'Durable tees, party skater dresses, slim denim & hoodies',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
      categories: ['Boys T-Shirts', 'Girls Dresses', 'Stretch Jeans', 'Hoodies'],
      color: 'from-blue-600/40'
    },
    {
      id: 'teenagers',
      title: 'TEENAGERS COLLECTION',
      age: '13–19 Years',
      subtitle: 'Heavyweight oversized tees, baggy denim & parachute cargos',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      categories: ['Oversized Tees', 'Baggy Jeans', 'Crop Tops', 'Streetwear'],
      color: 'from-purple-600/40'
    },
    {
      id: 'women',
      title: "WOMEN'S COLLECTION",
      age: 'All Ages',
      subtitle: 'Tailored blazers, satin slip dresses, linen co-ords & wide denim',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      categories: ['Western Dresses', 'Blazers', 'Co-ord Sets', 'Wide-Leg Pants'],
      color: 'from-rose-600/40'
    },
    {
      id: 'men',
      title: "MEN'S COLLECTION",
      age: 'All Ages',
      subtitle: 'Peruvian pima tees, textured polos, selvedge denim & blazers',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      categories: ['Heavyweight Tees', 'Pique Polos', 'Casual Shirts', 'Blazers'],
      color: 'from-slate-700/40'
    },
    {
      id: 'seniors',
      title: 'SENIOR COLLECTION',
      age: 'Golden Years',
      subtitle: 'Ultra-soft supima cotton, comfort elastic trousers & micro-fleece',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
      categories: ['Comfort Tops', 'Casual Shirts', 'Stretch Trousers', 'Jackets'],
      color: 'from-emerald-700/40'
    }
  ];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            One Destination. Every Generation.
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white mt-1">
            SHOP BY GENERATION
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 md:mt-0 max-w-md">
          Carefully tailored silhouettes and premium breathable fabrics designed specifically for every stage of life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => onSelectGeneration(card.id)}
            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[3/4] flex flex-col justify-end p-6 border border-zinc-200/60 dark:border-zinc-800"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors"></div>

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  {card.age}
                </span>
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                  {card.subtitle}
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {card.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white/10 hover:bg-white/20 text-zinc-200 px-2.5 py-0.5 rounded-md transition-colors"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
