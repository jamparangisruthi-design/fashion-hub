import React, { useState } from 'react';
import { Trash2, ArrowRight, Tag, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductColor } from '../../types';

interface CartPageProps {
  onNavigateToCheckout: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToCheckout,
  onNavigateToCatalog,
  onNavigateToProduct
}) => {
  const {
    cart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedCoupon,
    amountNeededForFreeDelivery,
    removeFromCart,
    updateQuantity,
    updateItemOptions,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponMessage({
      type: res.success ? 'success' : 'error',
      text: res.message
    });
    if (res.success) {
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-white">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          You haven't added any Western fashion items to your shopping bag yet. Explore our trending styles and generational collections!
        </p>
        <button
          onClick={onNavigateToCatalog}
          className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90"
        >
          EXPLORE COLLECTIONS
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white mb-8">
        SHOPPING BAG ({cart.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                onClick={() => onNavigateToProduct(item.productId)}
                className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-xl bg-zinc-100 cursor-pointer flex-shrink-0"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        {item.product.brand}
                      </span>
                      <h3
                        onClick={() => onNavigateToProduct(item.productId)}
                        className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white hover:text-amber-600 cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Size & Color options changers */}
                  <div className="flex flex-wrap items-center gap-3 text-xs mt-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-zinc-500">Size:</span>
                      <select
                        value={item.selectedSize}
                        onChange={e => updateItemOptions(item.id, e.target.value, item.selectedColor)}
                        className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-2 py-1 font-bold cursor-pointer"
                      >
                        {item.product.sizes.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-zinc-500">Color:</span>
                      <select
                        value={item.selectedColor.name}
                        onChange={e => {
                          const col = item.product.colors.find(c => c.name === e.target.value) || item.selectedColor;
                          updateItemOptions(item.id, item.selectedSize, col);
                        }}
                        className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-2 py-1 font-bold cursor-pointer"
                      >
                        {item.product.colors.map(c => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 font-bold hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 font-bold hover:text-black"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white">
                      ₹{item.product.discountedPrice * item.quantity}
                    </span>
                    {item.product.originalPrice > item.product.discountedPrice && (
                      <span className="text-xs text-zinc-400 line-through block">
                        ₹{item.product.originalPrice * item.quantity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary & Coupon Engine */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Apply Discount Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{appliedCoupon.code} APPLIED</span>
                  </span>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Saved ₹{discount} on this order
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME10, FASH500"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs uppercase font-mono font-bold focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMessage && (
              <p
                className={`text-xs ${
                  couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {couponMessage.text}
              </p>
            )}

            {/* Quick coupon suggestions */}
            <div className="pt-2 text-[11px] text-zinc-500 space-y-1">
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Available Codes:</p>
              <p>• <strong>WELCOME10:</strong> 10% OFF first order</p>
              <p>• <strong>FASH500:</strong> Flat ₹500 OFF on orders above ₹1,999</p>
              <p>• <strong>SUPERFASH:</strong> 20% OFF on orders above ₹2,999</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Bag Total (MRP)</span>
                <span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {amountNeededForFreeDelivery > 0 && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 pt-1">
                  Add ₹{amountNeededForFreeDelivery} more to qualify for Free Express Shipping!
                </p>
              )}

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-base font-extrabold text-zinc-900 dark:text-white">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={onNavigateToCheckout}
              className="w-full py-4 bg-[#121212] text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-zinc-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & Secure 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
