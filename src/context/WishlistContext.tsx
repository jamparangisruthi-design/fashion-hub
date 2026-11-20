import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { StorageService } from '../services/storage';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fashhub_wishlist');
      return saved ? JSON.parse(saved) : ['prod-wom-1', 'prod-teen-1'];
    } catch {
      return ['prod-wom-1', 'prod-teen-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('fashhub_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const clearWishlist = () => setWishlistIds([]);

  const allProducts = StorageService.getProducts();
  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
