import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToDetail: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigateToDetail
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-black dark:border-white ring-1'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
                <span className="capitalize">{product.generation} Collection</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white mb-2">
                {product.name}
              </h2>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                  ₹{product.discountedPrice}
                </span>
                {product.originalPrice > product.discountedPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Color: <span className="text-zinc-900 dark:text-zinc-100">{selectedColor.name}</span>
                </label>
                <div className="flex space-x-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`w-6 h-6 rounded-full border transition-transform ${
                        selectedColor.name === col.name
                          ? 'ring-2 ring-offset-2 ring-black dark:ring-white scale-110'
                          : 'border-zinc-300'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Available Sizes:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full border transition-colors ${
                    inWishlist
                      ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/20'
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-rose-500 text-zinc-600 dark:text-zinc-300'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToDetail(product.id);
                }}
                className="w-full text-center text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center space-x-1 py-1"
              >
                <span>View Full Product Details & Sizing Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
