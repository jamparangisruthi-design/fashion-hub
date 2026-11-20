export type Generation = 'baby' | 'kids' | 'teenagers' | 'women' | 'men' | 'seniors';

export type Gender = 'all' | 'men' | 'women' | 'boys' | 'girls' | 'unisex';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fabricDetails: string;
  careInstructions: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  generation: Generation;
  category: string;
  subcategory: string;
  gender: Gender;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  brand: string;
  tags: string[]; // 'trending' | 'new-arrival' | 'best-seller' | 'summer' | 'winter' | 'party' | 'casual' | 'college' | 'office' | 'streetwear' | 'festival' | 'budget' | 'premium' | 'under-499' | 'under-999'
  deliveryInfo: string;
  returnPolicy: string;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  tag: 'home' | 'work' | 'other';
  isDefault?: boolean;
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface TrackingStep {
  title: string;
  desc: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'upi' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  trackingSteps: TrackingStep[];
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: Address[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 500 for ₹500
  minOrder: number;
  description: string;
  active: boolean;
  expiryDate?: string;
}

export interface FilterState {
  generation?: Generation | 'all';
  category?: string;
  subcategory?: string;
  gender?: Gender | 'all';
  sizes: string[];
  colors: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
  tag?: string;
  searchQuery?: string;
}
