import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { Product, ProductColor, Review } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { StorageService } from '../../services/storage';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { ProductCard } from '../catalog/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onNavigateToDetail: (productId: string) => void;
  onBuyNow: () => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigateToDetail,
  onBuyNow,
  onQuickView
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = StorageService.getProductById(productId) || StorageService.getProducts()[0];
  const allProducts = StorageService.getProducts();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#000000' }
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Delivery pincode check state
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{ checked: boolean; valid: boolean; message: string } | null>(null);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState<'fabric' | 'shipping' | 'returns' | null>('fabric');

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => StorageService.getReviews(product.id));
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Update selected size/color if product changes
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize(product.sizes[0] || 'M');
    setSelectedColor(product.colors[0] || { name: 'Default', hex: '#000000' });
    setQuantity(1);
    setReviews(StorageService.getReviews(product.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, product]);

  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNowClick = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onBuyNow();
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setDeliveryResult({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    setDeliveryResult({
      checked: true,
      valid: true,
      message: `Delivery available to ${pincode}! Expected doorstep arrival in 2–3 business days. Cash on delivery eligible.`
    });
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };

    const updated = StorageService.addReview(newRev);
    setReviews(updated.filter(r => r.productId === product.id));
    setShowReviewModal(false);
    setNewReviewName('');
    setNewReviewComment('');
  };

  // Related products from same generation or category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.generation === product.generation || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
        <span className="hover:text-black dark:hover:text-white cursor-pointer" onClick={() => onNavigateToDetail('')}>
          Home
        </span>
        <span>/</span>
        <span className="capitalize">{product.generation} Collection</span>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery (Left) & Purchasing Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery Section */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-20 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 md:w-full md:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIdx === idx
                      ? 'border-black dark:border-white ring-2 ring-black/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Zoomable Image Display */}
          <div
            className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-crosshair border border-zinc-200/80 dark:border-zinc-800 shadow-md"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                  : undefined
              }
            />

            {/* Discount badge */}
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                {product.discountPercentage}% OFF
              </span>
            )}

            {/* Wishlist action */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:scale-110 active:scale-95 transition-all shadow"
              title="Add to Wishlist"
              aria-label="Wishlist toggle"
            >
              <Heart
                className={`w-5 h-5 ${
                  inWishlist ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'
                }`}
              />
            </button>

            {/* Subtle zoom instruction */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-md font-medium pointer-events-none">
              Hover to Zoom
            </div>
          </div>
        </div>

        {/* Purchasing & Product Info Section */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              <span className="font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                {product.brand}
              </span>
              <span className="capitalize">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Ratings & reviews header */}
            <div className="flex items-center space-x-3 mt-3">
              <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-800 dark:text-amber-300">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-500">
                {reviews.length} Verified Customer Reviews
              </span>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                ₹{product.discountedPrice}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-base text-zinc-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save ₹{product.originalPrice - product.discountedPrice} ({product.discountPercentage}% OFF)
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500">
              Inclusive of all taxes. Free express shipping on orders above ₹999.
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>Color: <strong className="text-zinc-900 dark:text-white">{selectedColor.name}</strong></span>
              <span className="text-[11px] font-normal text-zinc-400">{product.colors.length} Available Shades</span>
            </label>
            <div className="flex items-center space-x-3">
              {product.colors.map(col => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                    selectedColor.name === col.name
                      ? 'ring-2 ring-amber-500 ring-offset-2 scale-110 shadow-md'
                      : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                  aria-label={col.name}
                >
                  {selectedColor.name === col.name && (
                    <Check className={`w-3.5 h-3.5 ${col.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection & Size Guide */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Select Size:
              </label>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center space-x-2 pt-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                In Stock ({product.stock} items left in FASH HUB warehouse)
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Quantity:
            </span>
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black text-sm font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  addedToast
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#121212] text-white dark:bg-white dark:text-zinc-900 hover:opacity-90'
                }`}
              >
                {addedToast ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
              </button>

              <button
                onClick={handleBuyNowClick}
                className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <Zap className="w-4 h-4" />
                <span>BUY NOW</span>
              </button>
            </div>

            {addedToast && (
              <p className="text-xs text-center text-emerald-600 font-semibold animate-fade-in">
                Item added to bag! Open your bag to complete checkout.
              </p>
            )}
          </div>

          {/* Delivery Pin Code Checker */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Check Delivery & Cash on Delivery</span>
            </div>

            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code..."
                value={pincode}
                maxLength={6}
                onChange={e => setPincode(e.target.value)}
                className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90"
              >
                Check
              </button>
            </form>

            {deliveryResult && (
              <div
                className={`text-xs p-2.5 rounded-xl ${
                  deliveryResult.valid
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {deliveryResult.message}
              </div>
            )}
          </div>

          {/* Accordions: Fabric Details, Shipping, Returns */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
            {/* Fabric Details */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                className="w-full py-3.5 flex items-center justify-between font-bold text-zinc-900 dark:text-white"
              >
                <span>FABRIC & CARE SPECIFICATIONS</span>
                {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'fabric' && (
                <div className="pb-4 space-y-2 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <p>• <strong>Composition:</strong> {product.fabricDetails}</p>
                  <p>• <strong>Care Instructions:</strong> {product.careInstructions}</p>
                  <p>• <strong>Craftsmanship:</strong> Double-needle reinforced seams, pre-shrunk for zero post-wash shrinkage.</p>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full py-3.5 flex items-center justify-between font-bold text-zinc-900 dark:text-white"
              >
                <span>SHIPPING & DOORSTEP DELIVERY</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-4 space-y-1.5 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <p>{product.deliveryInfo}</p>
                  <p>• Standard Delivery: 3–5 Business Days</p>
                  <p>• Express Delivery: 1–2 Business Days (Selectable at checkout)</p>
                  <p>• Tracking link sent via SMS and email immediately upon dispatch.</p>
                </div>
              )}
            </div>

            {/* Return Policy */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'returns' ? null : 'returns')}
                className="w-full py-3.5 flex items-center justify-between font-bold text-zinc-900 dark:text-white"
              >
                <span>14-DAY RETURN & EXCHANGE POLICY</span>
                {openAccordion === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'returns' && (
                <div className="pb-4 space-y-1.5 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <p>{product.returnPolicy}</p>
                  <p>• Free doorstep pickup by our courier partners.</p>
                  <p>• Sizing didn't fit? Instant one-click replacement with next size up or down.</p>
                  <p>• Full refunds processed to original payment method or UPI within 24 hours of pickup.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Ratings & Reviews Section */}
      <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
              CUSTOMER REVIEWS & EXPERIENCES
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {product.rating} out of 5
              </span>
              <span className="text-xs text-zinc-400">({reviews.length} ratings)</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-2 self-start"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={rev.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.userName}`}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      {rev.userName}
                    </p>
                    <p className="text-[10px] text-zinc-400">{rev.date}</p>
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-zinc-300'}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                "{rev.comment}"
              </p>

              {rev.verifiedPurchase && (
                <div className="flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Purchase</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Style With Ease
            </span>
            <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white mt-1">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onNavigateToDetail={onNavigateToDetail}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        generation={product.generation}
      />

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
            <h3 className="text-xl font-display font-bold uppercase tracking-wider mb-2">
              Share Your Experience
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Reviewing <strong>{product.name}</strong>
            </p>

            <form onSubmit={submitReview} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Overall Rating
                </label>
                <div className="flex space-x-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReviewRating ? 'fill-current' : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newReviewName}
                  onChange={e => setNewReviewName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How was the fabric, fit, and comfort? Would you recommend this to others?"
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
