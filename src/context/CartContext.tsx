import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor, Coupon } from '../types';
import { StorageService } from '../services/storage';

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  updateItemOptions: (cartItemId: string, newSize: string, newColor: ProductColor) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 999;
const STANDARD_DELIVERY_FEE = 99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fashhub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('fashhub_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('fashhub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('fashhub_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('fashhub_applied_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    const id = `${product.id}-${size}-${color.name}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, productId: product.id, product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const updateItemOptions = (cartItemId: string, newSize: string, newColor: ProductColor) => {
    setCart(prev => {
      const target = prev.find(i => i.id === cartItemId);
      if (!target) return prev;
      const newId = `${target.productId}-${newSize}-${newColor.name}`;
      
      // If an item with new options already exists, combine them
      const alreadyHasNew = prev.find(i => i.id === newId && i.id !== cartItemId);
      if (alreadyHasNew) {
        return prev
          .filter(i => i.id !== cartItemId)
          .map(i => (i.id === newId ? { ...i, quantity: i.quantity + target.quantity } : i));
      }

      return prev.map(item =>
        item.id === cartItemId
          ? { ...item, id: newId, selectedSize: newSize, selectedColor: newColor }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupons = StorageService.getCoupons();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum cart value of ₹${found.minOrder}. Add ₹${found.minOrder - subtotal} more to qualify!`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully! You saved ${found.discountType === 'percentage' ? `${found.value}%` : `₹${found.value}`}.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        discount,
        deliveryFee,
        total,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemOptions,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
