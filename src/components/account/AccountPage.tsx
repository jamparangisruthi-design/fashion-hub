import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Address } from '../../types';

interface AccountPageProps {
  initialTab?: 'orders' | 'profile' | 'addresses' | 'wishlist';
  onNavigateToProduct: (productId: string) => void;
  onNavigateToCatalog: () => void;
  onOpenAdmin: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'orders',
  onNavigateToProduct,
  onNavigateToCatalog,
  onOpenAdmin
}) => {
  const { user, isAdmin, updateProfile, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders } = useOrders();
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'wishlist'>(
    initialTab
  );

  // Address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: 'Karnataka',
    postalCode: '',
    country: 'India',
    tag: 'home' as 'home' | 'work' | 'other'
  });

  // Tracked order details view
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders[0]?.id || null
  );

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.street || !newAddr.city || !newAddr.postalCode) return;
    addAddress(newAddr);
    setShowAddressModal(false);
  };

  const myOrders = orders; // show user orders

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      {/* Header Profile summary */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
            alt=""
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-amber-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-display font-bold">
                {user?.name || 'Valued Customer'}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">{user?.email}</p>
            <p className="text-xs text-zinc-400">{user?.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAdmin}
            className="px-6 py-2.5 bg-amber-500 text-black rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-600 shadow flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Admin Dashboard</span>
          </button>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'orders'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders & Tracking ({myOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'wishlist'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'addresses'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({user?.addresses.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow'
              : 'text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* TAB 1: Orders with Live Tracking Stepper */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {myOrders.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
              <Package className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <h3 className="text-lg font-bold">No orders placed yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Explore our western styles and place your first order with coupon WELCOME10!
              </p>
              <button
                onClick={onNavigateToCatalog}
                className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            myOrders.map(order => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden"
                >
                  {/* Order header summary */}
                  <div className="p-6 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                        Order Number
                      </span>
                      <strong className="text-sm sm:text-base font-mono font-bold text-zinc-900 dark:text-white">
                        {order.orderNumber}
                      </strong>
                      <span className="text-zinc-500 ml-2">
                        • Placed on {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.status === 'delivered'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>

                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        {isExpanded ? 'Hide Live Tracking' : 'Track Order'}
                      </button>
                    </div>
                  </div>

                  {/* Visual Stepper / Live Tracking Timeline */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 animate-slide-up">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-amber-500" />
                        <span>Live Shipment Journey</span>
                      </h4>

                      <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        {order.trackingSteps.map((step, idx) => (
                          <div key={idx} className="flex md:flex-col items-start space-x-3 md:space-x-0 md:space-y-2 flex-1">
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                  step.completed
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                                }`}
                              >
                                {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                {step.title}
                              </p>
                              <p className="text-[11px] text-zinc-500 leading-snug">{step.desc}</p>
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                                {step.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Items in this Order */}
                  <div className="p-6 divide-y divide-zinc-100 dark:divide-zinc-800 space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-14 h-18 object-cover rounded-xl bg-zinc-100 flex-shrink-0"
                          />
                          <div>
                            <h5
                              onClick={() => onNavigateToProduct(item.productId)}
                              className="font-bold text-zinc-900 dark:text-white hover:text-amber-600 cursor-pointer text-sm"
                            >
                              {item.product.name}
                            </h5>
                            <p className="text-zinc-500 text-[11px] mt-0.5">
                              Size: <strong>{item.selectedSize}</strong> • Color: <strong>{item.selectedColor.name}</strong> • Qty: <strong>{item.quantity}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-sm text-zinc-900 dark:text-white">
                            ₹{item.product.discountedPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer total */}
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs">
                    <span className="text-zinc-500">
                      Payment: <strong className="uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})
                    </span>
                    <span className="text-sm font-extrabold text-zinc-900 dark:text-white">
                      Total: ₹{order.total}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
              <Heart className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <h3 className="text-lg font-bold">Your wishlist is empty</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Save styles you love while browsing to view and buy them later!
              </p>
              <button
                onClick={onNavigateToCatalog}
                className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Discover Styles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-zinc-100">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-500 shadow"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <h4
                      onClick={() => onNavigateToProduct(p.id)}
                      className="font-bold line-clamp-1 hover:text-amber-600 cursor-pointer"
                    >
                      {p.name}
                    </h4>
                    <p className="font-extrabold text-sm">₹{p.discountedPrice}</p>

                    <button
                      onClick={() => addToCart(p, p.sizes[0] || 'M', p.colors[0], 1)}
                      className="w-full py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold uppercase text-[11px] hover:opacity-90 flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold uppercase tracking-wider">
              Manage Delivery Addresses
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.addresses.map(addr => (
              <div
                key={addr.id}
                className={`p-6 rounded-3xl bg-white dark:bg-[#1a1a1a] border ${
                  addr.isDefault
                    ? 'border-amber-500 ring-2 ring-amber-500/10'
                    : 'border-zinc-200 dark:border-zinc-800'
                } space-y-3 text-xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">
                    {addr.fullName}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                    {addr.tag}
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p className="text-zinc-500">Contact: {addr.phone}</p>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  {addr.isDefault ? (
                    <span className="text-emerald-600 font-bold text-[11px] flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Default Delivery Address</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                    >
                      Set As Default
                    </button>
                  )}

                  <button
                    onClick={() => deleteAddress(addr.id)}
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

      {/* TAB 4: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-xl bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6 text-xs">
          <h3 className="text-base font-bold uppercase tracking-wider">
            Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="font-bold text-zinc-500 block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                onBlur={e => updateProfile({ name: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-500 block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-500 block mb-1">Phone Number</label>
              <input
                type="tel"
                defaultValue={user?.phone || '+91 98765 43210'}
                onBlur={e => updateProfile({ phone: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 font-semibold"
              />
            </div>

            <p className="text-[11px] text-zinc-400">
              Changes to your profile are automatically saved in real time.
            </p>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
            <h3 className="text-lg font-display font-bold uppercase tracking-wider mb-4">
              Add New Delivery Address
            </h3>

            <form onSubmit={handleCreateAddress} className="space-y-4">
              <div>
                <label className="font-bold text-zinc-500 block mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={newAddr.fullName}
                  onChange={e => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-500 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={newAddr.phone}
                  onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-500 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-500 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-500 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={newAddr.postalCode}
                    onChange={e => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold uppercase"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

