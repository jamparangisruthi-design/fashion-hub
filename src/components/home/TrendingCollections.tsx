import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, Award, Compass } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../catalog/ProductCard';

interface TrendingCollectionsProps {
  products: Product[];
  onNavigateToDetail: (productId: string) => void;
  onExploreAll: (tag?: string) => void;
  onQuickView: (product: Product) => void;
}

type TabType = 'trending' | 'new-arrival' | 'best-seller' | 'streetwear';

export const TrendingCollections: React.FC<TrendingCollectionsProps> = ({
  products,
  onNavigateToDetail,
  onExploreAll,
  onQuickView
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('trending');

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'trending', label: 'Trending Now', icon: Flame },
    { id: 'new-arrival', label: 'New Arrivals', icon: Sparkles },
    { id: 'best-seller', label: 'Best Sellers', icon: Award },
    { id: 'streetwear', label: 'Streetwear & Denim', icon: Compass },
  ];

  const filtered = products
    .filter(p => p.tags.includes(activeTab))
    .slice(0, 8);

  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Curated Styles 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white mt-1">
            TRENDING COLLECTIONS
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#121212] text-white dark:bg-white dark:text-zinc-900 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigateToDetail={onNavigateToDetail}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onExploreAll(activeTab)}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all shadow-sm"
        >
          <span>VIEW ALL IN {tabs.find(t => t.id === activeTab)?.label}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
