import { Product, Order, User, Coupon, Review, Address } from '../types';
import { initialProducts, initialCoupons, initialReviews } from '../data/initialProducts';

const STORAGE_KEYS = {
  PRODUCTS: 'fashhub_products_v1',
  ORDERS: 'fashhub_orders_v1',
  USERS: 'fashhub_users_v1',
  CURRENT_USER: 'fashhub_current_user_v1',
  COUPONS: 'fashhub_coupons_v1',
  REVIEWS: 'fashhub_reviews_v1',
  WISHLIST: 'fashhub_wishlist_v1',
  CART: 'fashhub_cart_v1',
  THEME: 'fashhub_theme_v1'
};

const defaultUser: User = {
  id: 'usr-customer-1',
  name: 'Aarav Malhotra',
  email: 'aarav@fashhub.com',
  phone: '+91 98765 43210',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Aarav Malhotra',
      phone: '+91 98765 43210',
      street: 'Flat 402, Lotus Grand Residences, 18th Main, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      tag: 'home',
      isDefault: true
    },
    {
      id: 'addr-2',
      fullName: 'Aarav Malhotra (Work)',
      phone: '+91 98765 43210',
      street: '7th Floor, Prestige Tech Park, Marathahalli-Sarjapur Ring Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560103',
      country: 'India',
      tag: 'work',
      isDefault: false
    }
  ]
};

const adminUser: User = {
  id: 'usr-admin-1',
  name: 'Fash Hub Administrator',
  email: 'admin@fashhub.com',
  phone: '+91 99999 88888',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  addresses: []
};

// Initial Orders for immediate testing & realistic tracking experience
const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'FH-2026-8942',
    userId: 'usr-customer-1',
    customerName: 'Aarav Malhotra',
    customerEmail: 'aarav@fashhub.com',
    customerPhone: '+91 98765 43210',
    date: '2026-11-18T10:30:00Z',
    items: [
      {
        id: 'item-1',
        productId: 'prod-wom-1',
        product: initialProducts.find(p => p.id === 'prod-wom-1') || initialProducts[0],
        selectedSize: 'M',
        selectedColor: { name: 'Champagne Gold', hex: '#eedc82' },
        quantity: 1
      },
      {
        id: 'item-2',
        productId: 'prod-men-1',
        product: initialProducts.find(p => p.id === 'prod-men-1') || initialProducts[1],
        selectedSize: 'L',
        selectedColor: { name: 'Jet Black', hex: '#111111' },
        quantity: 2
      }
    ],
    shippingAddress: defaultUser.addresses[0],
    shippingMethod: 'express',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    subtotal: 3097,
    discount: 309,
    couponCode: 'WELCOME10',
    deliveryFee: 0,
    total: 2788,
    status: 'shipped',
    estimatedDelivery: '2026-11-22',
    trackingSteps: [
      { title: 'Order Placed', desc: 'Your Western fashion order was confirmed.', timestamp: '18 Nov, 10:30 AM', completed: true },
      { title: 'Quality Checked & Packed', desc: 'Inspected at FASH HUB Central Warehouse.', timestamp: '18 Nov, 03:45 PM', completed: true },
      { title: 'In Transit', desc: 'Dispatched via BlueDart Express courier.', timestamp: '19 Nov, 08:20 AM', completed: true },
      { title: 'Out for Delivery', desc: 'Assigned to delivery associate in your area.', timestamp: 'Pending', completed: false },
      { title: 'Delivered', desc: 'Package delivered to doorstep.', timestamp: 'Expected 22 Nov', completed: false }
    ]
  }
];

export const StorageService = {
  getProducts: (): Product[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    return initialProducts;
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  getProductById: (id: string): Product | undefined => {
    const products = StorageService.getProducts();
    return products.find(p => p.id === id);
  },

  saveProduct: (product: Product): Product[] => {
    const products = StorageService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    StorageService.saveProducts(products);
    return products;
  },

  deleteProduct: (id: string): Product[] => {
    const products = StorageService.getProducts().filter(p => p.id !== id);
    StorageService.saveProducts(products);
    return products;
  },

  getOrders: (): Order[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load orders', e);
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders));
    return initialOrders;
  },

  saveOrder: (order: Order): Order[] => {
    const orders = StorageService.getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return orders;
  },

  updateOrderStatus: (orderId: string, status: Order['status']): Order[] => {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      // update tracking steps
      if (status === 'shipped') {
        order.trackingSteps[2].completed = true;
        order.trackingSteps[2].timestamp = 'Just now';
      } else if (status === 'out_for_delivery') {
        order.trackingSteps[2].completed = true;
        order.trackingSteps[3].completed = true;
        order.trackingSteps[3].timestamp = 'Just now';
      } else if (status === 'delivered') {
        order.trackingSteps.forEach(s => s.completed = true);
        order.trackingSteps[4].timestamp = 'Today, Delivered';
      }
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
    return orders;
  },

  getCurrentUser: (): User | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    // Default to customer for instant friendly preview
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getAdminUser: (): User => adminUser,
  getDefaultCustomer: (): User => defaultUser,

  getCoupons: (): Coupon[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(initialCoupons));
    return initialCoupons;
  },

  saveCoupons: (coupons: Coupon[]) => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  },

  getReviews: (productId?: string): Review[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      const reviews: Review[] = data ? JSON.parse(data) : initialReviews;
      if (productId) {
        return reviews.filter(r => r.productId === productId);
      }
      return reviews;
    } catch (e) {
      return initialReviews;
    }
  },

  addReview: (review: Review): Review[] => {
    const reviews = StorageService.getReviews();
    reviews.unshift(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return reviews;
  },

  deleteReview: (reviewId: string): Review[] => {
    const reviews = StorageService.getReviews().filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return reviews;
  }
};
