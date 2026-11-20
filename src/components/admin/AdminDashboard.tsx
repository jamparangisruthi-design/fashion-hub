import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Tag,
  MessageSquare,
  ShieldCheck,
  Search,
  CheckCircle,
  X,
  AlertTriangle,
  Users
} from 'lucide-react';
import { Product, Order, Coupon, Review, Generation, Gender, ProductColor } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminDashboardProps {
  onBackToStore: () => void;
  onNavigateToProduct: (productId: string) => void;
}

type AdminTab = 'analytics' | 'products' | 'orders' | 'coupons' | 'reviews';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToStore,
  onNavigateToProduct
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [coupons, setCoupons] = useState<Coupon[]>(() => StorageService.getCoupons());
  const [reviews, setReviews] = useState<Review[]>(() => StorageService.getReviews());

  // Search filter inside table
  const [productSearch, setProductSearch] = useState('');

  // Add/Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Form State for Product
  const [formData, setFormData] = useState({
    name: '',
    brand: 'FASH Atelier',
    generation: 'women' as Generation,
    category: 'Western Dresses',
    gender: 'women' as Gender,
    originalPrice: 1999,
    discountedPrice: 999,
    stock: 25,
    sizesText: 'XS, S, M, L, XL',
    colorsText: 'Oatmeal:#e3dac9, Black:#111111',
    imagesText: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    description: '',
    fabricDetails: '100% Combed Cotton',
    tagsText: 'trending, new-arrival'
  });

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(999);

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const totalCatalogStyles = products.length;
  const lowStockCount = products.filter(p => p.stock < 20).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'FASH Atelier',
      generation: 'women',
      category: 'Western Dresses',
      gender: 'women',
      originalPrice: 1999,
      discountedPrice: 999,
      stock: 25,
      sizesText: 'XS, S, M, L, XL',
      colorsText: 'Oatmeal:#e3dac9, Black:#111111',
      imagesText: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      description: 'Chic modern western silhouette made from premium materials.',
      fabricDetails: '100% High-Grade Cotton',
      tagsText: 'trending, new-arrival'
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      generation: prod.generation,
      category: prod.category,
      gender: prod.gender,
      originalPrice: prod.originalPrice,
      discountedPrice: prod.discountedPrice,
      stock: prod.stock,
      sizesText: prod.sizes.join(', '),
      colorsText: prod.colors.map(c => `${c.name}:${c.hex}`).join(', '),
      imagesText: prod.images.join('\n'),
      description: prod.description,
      fabricDetails: prod.fabricDetails,
      tagsText: prod.tags.join(', ')
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const sizes = formData.sizesText.split(',').map(s => s.trim()).filter(Boolean);
    const colors: ProductColor[] = formData.colorsText.split(',').map(item => {
      const parts = item.split(':');
      return {
        name: parts[0]?.trim() || 'Custom',
        hex: parts[1]?.trim() || '#000000'
      };
    });
    const images = formData.imagesText
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean);
    const tags = formData.tagsText.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

    const discountPercentage = Math.round(
      ((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100
    );

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.name,
      brand: formData.brand,
      generation: formData.generation,
      category: formData.category,
      subcategory: formData.category,
      gender: formData.gender,
      originalPrice: Number(formData.originalPrice),
      discountedPrice: Number(formData.discountedPrice),
      discountPercentage: Math.max(0, discountPercentage),
      stock: Number(formData.stock),
      sizes,
      colors,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'],
      description: formData.description,
      fabricDetails: formData.fabricDetails,
      careInstructions: 'Machine wash delicate cold',
      deliveryInfo: 'Delivered in 2-3 business days',
      returnPolicy: '14-day hassle-free return policy',
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      tags,
      isFeatured: true
    };

    const updated = StorageService.saveProduct(productPayload);
    setProducts([...updated]);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product from the catalog?')) {
      const updated = StorageService.deleteProduct(id);
      setProducts([...updated]);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = StorageService.updateOrderStatus(orderId, newStatus);
    setOrders([...updated]);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      value: Number(newCouponDiscount),
      minOrder: Number(newCouponMin),
      description: `${newCouponDiscount}% OFF on orders above ₹${newCouponMin}`,
      active: true
    };

    const updated = [...coupons, newC];
    StorageService.saveCoupons(updated);
    setCoupons(updated);
    setNewCouponCode('');
  };

  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map(c => (c.code === code ? { ...c, active: !c.active } : c));
    StorageService.saveCoupons(updated);
    setCoupons(updated);
  };

  const handleDeleteReview = (id: string) => {
    const updated = StorageService.deleteReview(id);
    setReviews([...updated]);
  };

  const filteredProductList = products.filter(
    p =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.generation.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      {/* Top Admin Header */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-display font-extrabold uppercase tracking-wider">
              FASH HUB Admin Portal
            </h1>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Store Operations, Inventory Management, Order Dispatch, and Business Analytics
          </p>
        </div>

        <button
          onClick={onBackToStore}
          className="px-6 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          ← Return to Customer Storefront
        </button>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'analytics'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics & Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'products'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'orders'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'coupons'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Discount Coupons</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'reviews'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Customer Reviews</span>
        </button>
      </div>

      {/* TAB 1: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Sales Revenue</span>
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 dark:text-white">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold">
                +18.4% growth this month
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 dark:text-white">
                {totalOrdersCount}
              </p>
              <p className="text-[11px] text-zinc-500">
                100% fulfill rate across India
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-bold uppercase tracking-wider">Live Catalog Items</span>
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 dark:text-white">
                {totalCatalogStyles}
              </p>
              <p className="text-[11px] text-zinc-500">
                Spanning all 6 generational categories
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-bold uppercase tracking-wider">Low Stock Warning</span>
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-rose-600">
                {lowStockCount}
              </p>
              <p className="text-[11px] text-zinc-500">
                Items with stock below 20 units
              </p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider">
              Recent Order Shipments
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase text-[11px]">
                    <th className="py-3">Order ID</th>
                    <th className="py-3">Customer</th>
                    <th className="py-3">Items</th>
                    <th className="py-3">Total Amount</th>
                    <th className="py-3">Payment</th>
                    <th className="py-3">Dispatch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id}>
                      <td className="py-3 font-mono font-bold">{o.orderNumber}</td>
                      <td className="py-3 font-semibold">{o.customerName}</td>
                      <td className="py-3">{o.items.length} items</td>
                      <td className="py-3 font-bold">₹{o.total}</td>
                      <td className="py-3 uppercase font-semibold text-[11px]">{o.paymentMethod}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Product Management CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search styles, categories..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase text-[11px] bg-zinc-50 dark:bg-zinc-900/60">
                    <th className="py-3.5 px-4">Item</th>
                    <th className="py-3.5 px-4">Generation</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredProductList.map(prod => (
                    <tr key={prod.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.images[0]}
                            alt=""
                            className="w-10 h-12 object-cover rounded-lg bg-zinc-100"
                          />
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white line-clamp-1">
                              {prod.name}
                            </p>
                            <p className="text-[10px] text-zinc-400 uppercase">{prod.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize font-semibold">{prod.generation}</td>
                      <td className="py-3 px-4 text-zinc-500">{prod.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold">₹{prod.discountedPrice}</span>
                        {prod.originalPrice > prod.discountedPrice && (
                          <span className="text-[10px] text-zinc-400 line-through block">
                            ₹{prod.originalPrice}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            prod.stock < 20 ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {prod.stock} left
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Orders Status Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase text-[11px] bg-zinc-50 dark:bg-zinc-900/60">
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Shipping Destination</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Update Live Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="py-4 px-4 font-mono font-bold">{order.orderNumber}</td>
                      <td className="py-4 px-4">
                        <p className="font-bold">{order.customerName}</p>
                        <p className="text-[10px] text-zinc-400">{order.customerPhone}</p>
                      </td>
                      <td className="py-4 px-4 text-zinc-500 max-w-xs truncate">
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                      </td>
                      <td className="py-4 px-4 font-bold">₹{order.total}</td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={e => handleUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-zinc-100 dark:bg-zinc-800 rounded-xl px-3 py-1.5 font-bold uppercase text-[11px] focus:outline-none cursor-pointer"
                        >
                          <option value="placed">Placed</option>
                          <option value="processing">Processing & Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Coupons Engine */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Add Coupon Form */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">
              Create New Promo Coupon
            </h3>

            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="font-bold text-zinc-500 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVAL25"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-500 block mb-1">Discount % *</label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  required
                  value={newCouponDiscount}
                  onChange={e => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-500 block mb-1">Minimum Cart Order (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={newCouponMin}
                  onChange={e => setNewCouponMin(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold uppercase tracking-wider"
              >
                Create Promo Code
              </button>
            </form>
          </div>

          {/* Existing Coupons List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">
              Active Promo Coupons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {coupons.map(coupon => (
                <div
                  key={coupon.code}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-sm tracking-wider text-amber-600 dark:text-amber-400">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleToggleCoupon(coupon.code)}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        coupon.active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-zinc-200 text-zinc-500'
                      }`}
                    >
                      {coupon.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300">{coupon.description}</p>
                  <p className="text-[11px] text-zinc-400">Min Order: ₹{coupon.minOrder}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Reviews Moderation */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="font-display font-bold uppercase tracking-wider text-sm">
            Customer Reviews Moderation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {rev.userName}
                    </span>
                    <span className="text-amber-500 font-bold">★ {rev.rating}/5</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 italic">"{rev.comment}"</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400">
                  <span>Product: {rev.productId} • {rev.date}</span>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="text-rose-600 hover:underline flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-display font-bold uppercase tracking-wider">
                {editingProduct ? 'Edit Western Style' : 'Add New Western Fashion Item'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-full text-zinc-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="font-bold block mb-1 text-zinc-500">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Generation *</label>
                  <select
                    value={formData.generation}
                    onChange={e => setFormData({ ...formData, generation: e.target.value as any })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5 capitalize"
                  >
                    <option value="baby">Baby (0-2 Yrs)</option>
                    <option value="kids">Kids (2-12 Yrs)</option>
                    <option value="teenagers">Teenagers (13-19 Yrs)</option>
                    <option value="women">Women's Collection</option>
                    <option value="men">Men's Collection</option>
                    <option value="seniors">Senior Collection</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Discounted Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.discountedPrice}
                    onChange={e => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-500">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizesText}
                    onChange={e => setFormData({ ...formData, sizesText: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-zinc-500">Color Shades (e.g. Beige:#e3dac9, Black:#111111)</label>
                <input
                  type="text"
                  value={formData.colorsText}
                  onChange={e => setFormData({ ...formData, colorsText: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-zinc-500">Image URLs (one per line)</label>
                <textarea
                  rows={2}
                  value={formData.imagesText}
                  onChange={e => setFormData({ ...formData, imagesText: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl p-3 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-zinc-500">Product Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border rounded-xl p-3"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-5 py-2.5 border rounded-full font-bold uppercase text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase text-[11px]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

