import React from 'react';

export const FeaturedBrands: React.FC = () => {
  const brands = [
    { name: 'FASH ATELIER', subtitle: 'Modern European Tailoring' },
    { name: 'ASTRO STREET', subtitle: 'Heavyweight Gen-Z Streetwear' },
    { name: 'METRO ELITE', subtitle: 'Contemporary Menswear' },
    { name: 'AURA MINIMAL', subtitle: 'Linen & Pure Viscose Silhouettes' },
    { name: 'DENIM LAB', subtitle: 'Selvedge & Comfort Stretch' },
    { name: 'COTTON COMFORT', subtitle: 'Hypoallergenic Senior Apparel' }
  ];

  return (
    <section className="py-14 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#151515] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Exclusive In-House & Partner Ateliers
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white mt-1">
            FEATURED BRANDS
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
          {brands.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#1d1d1d] border border-zinc-200/60 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center group cursor-pointer"
            >
              <span className="text-sm sm:text-base font-display font-black tracking-wider text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {b.name}
              </span>
              <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider line-clamp-1">
                {b.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
