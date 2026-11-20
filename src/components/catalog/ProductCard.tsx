import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigateToDetail: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigateToDetail,
  onQuickView
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setShowSizePicker(false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div
      onClick={() => onNavigateToDetail(product.id)}
      className="group relative flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800/80 hover:shadow-xl transition-all duration-300 cursor-pointer text-zinc-900 dark:text-zinc-100"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.images[currentImageIdx] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Area */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.tags.includes('trending') && (
            <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
              TRENDING
            </span>
          )}
          {product.tags.includes('best-seller') && (
            <span className="bg-zinc-900 text-white dark:bg-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:scale-110 active:scale-95 transition-all shadow"
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'
            }`}
          />
        </button>

        {/* Quick View Button overlay */}
        {onQuickView && (
          <button
            onClick={e => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all flex items-center space-x-1.5 hover:bg-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}

        {/* Quick Add Size Overlay Drawer */}
        {showSizePicker && (
          <div
            onClick={e => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur-md p-3 border-t border-zinc-200 dark:border-zinc-700 z-20 animate-slide-up"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Select Size to Add
              </span>
              <button
                onClick={() => setShowSizePicker(false)}
                className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={e => handleQuickAdd(size, e)}
                  className="py-1.5 text-xs font-bold rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="font-semibold uppercase tracking-wider truncate">{product.brand}</span>
            <div className="flex items-center space-x-1 flex-shrink-0 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {product.rating}
              </span>
              <span className="text-zinc-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-semibold line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 pt-0.5">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-offset-1 ring-zinc-900 dark:ring-zinc-100 scale-110'
                    : 'border-zinc-300 dark:border-zinc-700'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            {product.colors.length > 1 && (
              <span className="text-[10px] text-zinc-400 ml-1">
                {product.colors.length} shades
              </span>
            )}
          </div>
        )}

        {/* Pricing and Quick Add button */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white">
              ₹{product.discountedPrice}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              setShowSizePicker(!showSizePicker);
            }}
            className={`p-2 rounded-xl transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
            }`}
            title="Add to Shopping Bag"
            aria-label="Add to cart"
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
