import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Package,
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { Generation, Product } from '../../types';
import { StorageService } from '../../services/storage';

interface NavbarProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenCart, onOpenAuth }) => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemoCustomer, loginAsDemoAdmin } = useAuth();
  const { itemCount } = useCart();
  const { wishlistIds } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [generationDropdownOpen, setGenerationDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const allProducts = StorageService.getProducts();

  const searchResults = searchQuery.trim()
    ? allProducts
        .filter(
          p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      onNavigate('catalog', { searchQuery: searchQuery.trim() });
    }
  };

  const generations: { label: string; value: Generation; desc: string }[] = [
    { label: 'Baby (0–2 Yrs)', value: 'baby', desc: 'Rompers, dresses, soft cotton sets' },
    { label: 'Kids (2–12 Yrs)', value: 'kids', desc: 'Tees, denim, hoodies & party wear' },
    { label: 'Teenagers (13–19 Yrs)', value: 'teenagers', desc: 'Streetwear, baggy jeans, cargos' },
    { label: "Women's Collection", value: 'women', desc: 'Dresses, blazers, co-ords & tops' },
    { label: "Men's Collection", value: 'men', desc: 'Pima tees, chinos, jackets & shirts' },
    { label: 'Senior Collection', value: 'seniors', desc: 'Easy-wear tops, comfort trousers' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Tagline */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer flex flex-col items-start select-none group"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl sm:text-3xl font-display font-extrabold tracking-wider text-black dark:text-white transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                FASH HUB
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mb-1"></span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-500 dark:text-zinc-400 font-sans font-medium -mt-1 hidden xs:block">
              Your Style. Your Generation.
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-semibold tracking-wider uppercase text-zinc-700 dark:text-zinc-200">
            {/* Generations Mega Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setGenerationDropdownOpen(true)}
              onMouseLeave={() => setGenerationDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center space-x-1 py-1 hover:text-black dark:hover:text-white transition-colors"
              >
                <span>Generations</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {generationDropdownOpen && (
                <div className="absolute top-full -left-10 w-80 bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl border border-zinc-100 dark:border-zinc-800 p-3 grid gap-1 animate-slide-up">
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80 mb-1">
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                      Shop by Age & Generation
                    </p>
                  </div>
                  {generations.map(gen => (
                    <button
                      key={gen.value}
                      onClick={() => {
                        setGenerationDropdownOpen(false);
                        onNavigate('catalog', { generation: gen.value });
                      }}
                      className="text-left px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group/item flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400">
                          {gen.label}
                        </p>
                        <p className="text-[11px] text-zinc-400 lowercase">{gen.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-amber-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('catalog', { generation: 'women' })}
              className="hover:text-black dark:hover:text-white transition-colors py-1"
            >
              Women
            </button>
            <button
              onClick={() => onNavigate('catalog', { generation: 'men' })}
              className="hover:text-black dark:hover:text-white transition-colors py-1"
            >
              Men
            </button>
            <button
              onClick={() => onNavigate('catalog', { generation: 'teenagers' })}
              className="hover:text-black dark:hover:text-white transition-colors py-1"
            >
              Teen
            </button>
            <button
              onClick={() => onNavigate('catalog', { generation: 'kids' })}
              className="hover:text-black dark:hover:text-white transition-colors py-1"
            >
              Kids & Baby
            </button>
            <button
              onClick={() => onNavigate('catalog', { tag: 'trending' })}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => onNavigate('catalog', { tag: 'under-499' })}
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline transition-colors py-1"
            >
              Under ₹499
            </button>
          </nav>

          {/* Search bar with Live Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Western styles, tees, dresses..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800/80 border border-transparent focus:border-zinc-400 dark:focus:border-zinc-600 rounded-full pl-10 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 animate-slide-up">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 px-3 py-1">
                  Product Suggestions
                </div>
                {searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                      onNavigate('product-detail', { productId: p.id });
                    }}
                    className="flex items-center space-x-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer transition-colors"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {p.name}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px] text-zinc-500">
                        <span className="capitalize">{p.generation}</span>
                        <span>•</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-200">
                          ₹{p.discountedPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSearchSubmit}
                  className="w-full text-center py-2 text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline mt-1 border-t border-zinc-100 dark:border-zinc-800"
                >
                  View all results for "{searchQuery}"
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Theme, Wishlist, Cart, Account */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('account', { tab: 'wishlist' })}
              className="p-2 rounded-full text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative transition-colors"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative transition-colors"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div ref={userMenuRef} className="relative">
              {isAuthenticated && user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="User profile menu"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-300 dark:ring-zinc-700"
                  />
                  <span className="hidden xl:inline text-xs font-semibold max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {userDropdownOpen && isAuthenticated && user && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                      {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('account', { tab: 'profile' });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2 text-zinc-700 dark:text-zinc-200"
                    >
                      <UserIcon className="w-4 h-4 text-zinc-400" />
                      <span>My Profile & Addresses</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('account', { tab: 'orders' });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2 text-zinc-700 dark:text-zinc-200"
                    >
                      <Package className="w-4 h-4 text-zinc-400" />
                      <span>My Orders & Tracking</span>
                    </button>

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          loginAsDemoAdmin();
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2 text-zinc-500"
                      >
                        <ShieldCheck className="w-4 h-4 text-zinc-400" />
                        <span>Switch to Admin Mode</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161616] px-4 pt-3 pb-6 animate-slide-up">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            </div>
          </form>

          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-2">
            Generations & Categories
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {generations.map(gen => (
              <button
                key={gen.value}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('catalog', { generation: gen.value });
                }}
                className="text-left p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 text-xs font-semibold"
              >
                {gen.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalog', { tag: 'trending' });
              }}
              className="text-left py-2 px-2 font-medium hover:text-amber-500"
            >
              🔥 Trending Collections
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalog', { tag: 'under-499' });
              }}
              className="text-left py-2 px-2 font-medium text-emerald-600"
            >
              🏷️ Pocket Friendly Under ₹499
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalog', { tag: 'under-999' });
              }}
              className="text-left py-2 px-2 font-medium"
            >
              ✨ Best Western Under ₹999
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('admin');
              }}
              className="text-left py-2 px-2 font-medium text-amber-600"
            >
              ⚙️ Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
