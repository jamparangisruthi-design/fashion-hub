import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Product, FilterState } from '../../types';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

interface CatalogPageProps {
  products: Product[];
  initialFilters?: Partial<FilterState>;
  onNavigateToDetail: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  initialFilters = {},
  onNavigateToDetail,
  onQuickView
}) => {
  const [filters, setFilters] = useState<FilterState>({
    generation: initialFilters.generation || 'all',
    category: initialFilters.category || '',
    subcategory: initialFilters.subcategory || '',
    gender: initialFilters.gender || 'all',
    sizes: initialFilters.sizes || [],
    colors: initialFilters.colors || [],
    brands: initialFilters.brands || [],
    minPrice: initialFilters.minPrice || 0,
    maxPrice: initialFilters.maxPrice || 5000,
    minDiscount: initialFilters.minDiscount || 0,
    sortBy: initialFilters.sortBy || 'featured',
    tag: initialFilters.tag || '',
    searchQuery: initialFilters.searchQuery || ''
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      generation: 'all',
      category: '',
      subcategory: '',
      gender: 'all',
      sizes: [],
      colors: [],
      brands: [],
      minPrice: 0,
      maxPrice: 5000,
      minDiscount: 0,
      sortBy: 'featured',
      tag: '',
      searchQuery: ''
    });
  };

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc && !matchesBrand) return false;
      }

      // Generation
      if (filters.generation && filters.generation !== 'all') {
        if (p.generation !== filters.generation) return false;
      }

      // Gender
      if (filters.gender && filters.gender !== 'all') {
        if (p.gender !== filters.gender && p.gender !== 'unisex') return false;
      }

      // Category
      if (filters.category) {
        if (p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      }

      // Tag
      if (filters.tag) {
        if (!p.tags.includes(filters.tag)) return false;
      }

      // Price Range
      if (p.discountedPrice < filters.minPrice || p.discountedPrice > filters.maxPrice) {
        return false;
      }

      // Min Discount
      if (filters.minDiscount > 0 && p.discountPercentage < filters.minDiscount) {
        return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some(s => p.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Colors
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some(c =>
          p.colors.some(pc => pc.name.toLowerCase().includes(c.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(p.brand)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.discountedPrice - b.discountedPrice;
        case 'price-high':
          return b.discountedPrice - a.discountedPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'popularity':
          return b.reviewsCount - a.reviewsCount;
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, filters]);

  // Active filter count
  const activeChips = [
    filters.generation && filters.generation !== 'all' ? `Gen: ${filters.generation}` : null,
    filters.gender && filters.gender !== 'all' ? `Gender: ${filters.gender}` : null,
    filters.tag ? `Tag: ${filters.tag}` : null,
    filters.searchQuery ? `Search: "${filters.searchQuery}"` : null,
    filters.minDiscount > 0 ? `≥${filters.minDiscount}% Off` : null,
    ...filters.sizes.map(s => `Size: ${s}`),
    ...filters.colors.map(c => `Color: ${c}`),
    ...filters.brands.map(b => `Brand: ${b}`),
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumb header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200 capitalize font-medium">
            {filters.generation && filters.generation !== 'all'
              ? `${filters.generation} Collection`
              : filters.tag
              ? `${filters.tag} Fashion`
              : 'Western Catalog'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
              {filters.generation && filters.generation !== 'all'
                ? `${filters.generation} Western Apparel`
                : filters.tag
                ? `${filters.tag.replace('-', ' ')} Western Wear`
                : 'All Western Collections'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Showing {filteredProducts.length} of {products.length} international quality styles
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger + Sort dropdown */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Filters ({activeChips.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-500 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={e => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Curated</option>
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Active:
            </span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-medium"
              >
                <span>{chip}</span>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={resetFilters}
          isMobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#181818] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">
              <Filter className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                No styles match your filters
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
                Try widening your price range, clearing some size selections, or resetting all filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigateToDetail={onNavigateToDetail}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
