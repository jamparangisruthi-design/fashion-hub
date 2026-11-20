import React from 'react';
import { X, RotateCcw, Filter } from 'lucide-react';
import { FilterState, Generation, Gender } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobileOpen = false,
  onMobileClose
}) => {
  const generations: { label: string; value: Generation | 'all' }[] = [
    { label: 'All Generations', value: 'all' },
    { label: 'Baby (0–2 Yrs)', value: 'baby' },
    { label: 'Kids (2–12 Yrs)', value: 'kids' },
    { label: 'Teenagers (13–19 Yrs)', value: 'teenagers' },
    { label: "Women's Collection", value: 'women' },
    { label: "Men's Collection", value: 'men' },
    { label: 'Senior Collection', value: 'seniors' },
  ];

  const genders: { label: string; value: Gender | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'Girls', value: 'girls' },
    { label: 'Boys', value: 'boys' },
    { label: 'Unisex', value: 'unisex' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '0-3M', '6-12M', '2-3Y', '4-5Y', '28', '30', '32', '34', '36'];

  const colors = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Beige', hex: '#e3dac9' },
    { name: 'Blue', hex: '#1e3a8a' },
    { name: 'Olive', hex: '#556b2f' },
    { name: 'Gold', hex: '#eedc82' },
    { name: 'Rose', hex: '#dcae96' },
  ];

  const brands = [
    'FASH Atelier',
    'ASTRO Street',
    'Metro Elite',
    'Aura Minimal',
    'Denim Lab',
    'Cotton Comfort Co',
    'FASH Juniors',
    'FASH Baby Atelier'
  ];

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const toggleColor = (colorName: string) => {
    const newColors = filters.colors.includes(colorName)
      ? filters.colors.filter(c => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: newColors });
  };

  const toggleBrand = (brandName: string) => {
    const newBrands = filters.brands.includes(brandName)
      ? filters.brands.filter(b => b !== brandName)
      : [...filters.brands, brandName];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const content = (
    <div className="space-y-6 text-xs text-zinc-800 dark:text-zinc-200">
      {/* Header with Clear All */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-2 font-display font-bold text-sm tracking-wider uppercase">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-zinc-500 hover:text-black dark:hover:text-white flex items-center space-x-1 text-[11px] font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Generation Filter */}
      <div className="space-y-2">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Generation
        </h4>
        <div className="space-y-1">
          {generations.map(gen => (
            <label
              key={gen.value}
              className="flex items-center space-x-2 py-1 cursor-pointer hover:text-amber-600 transition-colors"
            >
              <input
                type="radio"
                name="generation"
                checked={filters.generation === gen.value}
                onChange={() => onFilterChange({ ...filters, generation: gen.value })}
                className="accent-black dark:accent-white"
              />
              <span className={filters.generation === gen.value ? 'font-bold' : ''}>
                {gen.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Gender
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {genders.map(g => (
            <button
              key={g.value}
              onClick={() => onFilterChange({ ...filters, gender: g.value })}
              className={`py-1.5 px-2 rounded-lg text-center text-xs font-semibold capitalize border transition-all ${
                filters.gender === g.value
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                  : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider & Presets */}
      <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
            Price Range
          </h4>
          <span className="font-bold text-zinc-900 dark:text-white">
            ₹{filters.minPrice} - ₹{filters.maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="300"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={e => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-amber-500"
        />

        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 499 })}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
              filters.maxPrice === 499
                ? 'bg-amber-500 text-black border-amber-500 font-bold'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-black'
            }`}
          >
            Under ₹499
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 999 })}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
              filters.maxPrice === 999
                ? 'bg-amber-500 text-black border-amber-500 font-bold'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-black'
            }`}
          >
            Under ₹999
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, minPrice: 1000, maxPrice: 2500 })}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
              filters.minPrice === 1000 && filters.maxPrice === 2500
                ? 'bg-amber-500 text-black border-amber-500 font-bold'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-black'
            }`}
          >
            ₹1,000 – ₹2,500
          </button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Sizes
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {sizes.map(size => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1.5 text-center font-bold text-xs rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                    : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Color Shades
        </h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(col => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-amber-500 ring-offset-2 scale-110'
                    : 'border-zinc-300 dark:border-zinc-700'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            );
          })}
        </div>
      </div>

      {/* Discount Minimum */}
      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Minimum Discount
        </h4>
        <div className="space-y-1">
          {[10, 20, 30, 40, 50].map(disc => (
            <label
              key={disc}
              className="flex items-center space-x-2 py-1 cursor-pointer hover:text-amber-600 transition-colors"
            >
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === disc}
                onChange={() => onFilterChange({ ...filters, minDiscount: disc })}
                className="accent-black dark:accent-white"
              />
              <span className={filters.minDiscount === disc ? 'font-bold' : ''}>
                {disc}% and above
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold uppercase tracking-wider text-[11px] text-zinc-500">
          Featured Brand
        </h4>
        <div className="space-y-1">
          {brands.map(b => {
            const isChecked = filters.brands.includes(b);
            return (
              <label
                key={b}
                className="flex items-center space-x-2 py-1 cursor-pointer hover:text-amber-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(b)}
                  className="rounded accent-black dark:accent-white"
                />
                <span className={isChecked ? 'font-bold' : ''}>{b}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white dark:bg-[#181818] rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm h-fit sticky top-28">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white dark:bg-[#1a1a1a] w-full max-w-xs h-full p-6 overflow-y-auto shadow-2xl">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-2">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
