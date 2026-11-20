import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCheckout: () => void;
  onNavigateToCartPage: () => void;
  onNavigateToProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToCheckout,
  onNavigateToCartPage,
  onNavigateToProduct
}) => {
  if (!isOpen) return null;

  const {
    cart,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    removeFromCart,
    updateQuantity
  } = useCart();

  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a1a1a] h-full shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-base uppercase tracking-wider">
              Shopping Bag ({itemCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-amber-50/70 dark:bg-amber-950/30 p-4 border-b border-amber-200/50 dark:border-amber-900/40 text-xs">
          <div className="flex items-center space-x-2 mb-2 text-amber-900 dark:text-amber-300 font-semibold">
            <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            {amountNeededForFreeDelivery > 0 ? (
              <span>
                Add <strong>₹{amountNeededForFreeDelivery}</strong> more to unlock <strong>FREE Express Delivery</strong>!
              </span>
            ) : (
              <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                <span>You've unlocked <strong>FREE Express Shipping</strong>!</span>
              </span>
            )}
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100 dark:divide-zinc-800 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-display font-bold text-lg">Your bag is empty</p>
              <p className="text-xs text-zinc-500 max-w-xs">
                Explore our Western collections for babies, kids, teens, women, men and seniors!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  onClick={() => {
                    onClose();
                    onNavigateToProduct(item.productId);
                  }}
                  className="w-20 h-24 object-cover rounded-xl bg-zinc-100 cursor-pointer flex-shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onClose();
                          onNavigateToProduct(item.productId);
                        }}
                        className="text-xs font-bold line-clamp-1 hover:text-amber-600 cursor-pointer"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-zinc-500 mt-1">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <span>Color:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-zinc-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                      </span>
                    </div>

                    <p className="text-xs font-extrabold text-zinc-900 dark:text-white mt-1.5">
                      ₹{item.product.discountedPrice * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold hover:text-black"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold hover:text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & CTAs */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Estimated Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Estimated Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToCheckout();
                }}
                className="w-full py-3.5 bg-[#121212] text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToCartPage();
                }}
                className="w-full py-2.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white font-semibold underline text-center"
              >
                View Full Bag & Apply Coupons
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
