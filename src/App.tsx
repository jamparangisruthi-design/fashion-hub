import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { PromoPopup } from './components/common/PromoPopup';
import { QuickViewModal } from './components/common/QuickViewModal';

import { HeroBanner } from './components/home/HeroBanner';
import { ShopByGeneration } from './components/home/ShopByGeneration';
import { TrendingCollections } from './components/home/TrendingCollections';
import { SpecialOfferBanners } from './components/home/SpecialOfferBanners';
import { FeaturedBrands } from './components/home/FeaturedBrands';
import { CustomerReviewsSection } from './components/home/CustomerReviewsSection';
import { NewsletterSection } from './components/home/NewsletterSection';

import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountModal } from './components/account/AccountModal';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaticPages } from './components/pages/StaticPages';

import { StorageService } from './services/storage';
import { Product, Generation, FilterState } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());

  // Listen to popstate or handle smooth navigation
  const navigate = (view: string, params: any = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-zinc-900 dark:bg-[#121212] dark:text-zinc-100 transition-colors duration-300">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Global Navbar */}
      <Navbar
        onNavigate={navigate}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area Based on View */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <HeroBanner
              onShopNow={() => navigate('catalog')}
              onExploreCollections={() => navigate('catalog')}
            />

            <ShopByGeneration
              onSelectGeneration={(gen: Generation) => navigate('catalog', { generation: gen })}
            />

            <TrendingCollections
              products={products}
              onNavigateToDetail={(id: string) => navigate('product-detail', { productId: id })}
              onExploreAll={(tag?: string) => navigate('catalog', { tag })}
              onQuickView={(p: Product) => setQuickViewProduct(p)}
            />

            <SpecialOfferBanners
              onBrowseTag={(tag: string) => navigate('catalog', { tag })}
            />

            <FeaturedBrands />

            <CustomerReviewsSection />

            <NewsletterSection />
          </div>
        )}

        {/* VIEW 2: CATALOG / SHOPPING */}
        {currentView === 'catalog' && (
          <CatalogPage
            products={products}
            initialFilters={viewParams}
            onNavigateToDetail={(id: string) => navigate('product-detail', { productId: id })}
            onQuickView={(p: Product) => setQuickViewProduct(p)}
          />
        )}

        {/* VIEW 3: PRODUCT DETAILS (PDP) */}
        {currentView === 'product-detail' && (
          <ProductDetailPage
            productId={viewParams.productId || products[0]?.id}
            onNavigateToDetail={(id: string) => {
              if (id) {
                navigate('product-detail', { productId: id });
              } else {
                navigate('home');
              }
            }}
            onBuyNow={() => navigate('checkout')}
            onQuickView={(p: Product) => setQuickViewProduct(p)}
          />
        )}

        {/* VIEW 4: CART PAGE */}
        {currentView === 'cart' && (
          <CartPage
            onNavigateToCheckout={() => navigate('checkout')}
            onNavigateToCatalog={() => navigate('catalog')}
            onNavigateToProduct={(id: string) => navigate('product-detail', { productId: id })}
          />
        )}

        {/* VIEW 5: CHECKOUT & PAYMENT */}
        {currentView === 'checkout' && (
          <CheckoutPage
            onNavigateHome={() => navigate('home')}
            onNavigateToOrders={() => navigate('account', { tab: 'orders' })}
          />
        )}

        {/* VIEW 6: USER ACCOUNT PORTAL */}
        {currentView === 'account' && (
          <AccountPage
            initialTab={viewParams.tab || 'orders'}
            onNavigateToProduct={(id: string) => navigate('product-detail', { productId: id })}
            onNavigateToCatalog={() => navigate('catalog')}
            onOpenAdmin={() => navigate('admin')}
          />
        )}

        {/* VIEW 7: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard
            onBackToStore={() => navigate('home')}
            onNavigateToProduct={(id: string) => navigate('product-detail', { productId: id })}
          />
        )}

        {/* VIEW 8: INFORMATIONAL STATIC PAGES */}
        {currentView === 'static' && (
          <StaticPages page={viewParams.page || 'about'} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onNavigateToCheckout={() => {
          setCartDrawerOpen(false);
          navigate('checkout');
        }}
        onNavigateToCartPage={() => {
          setCartDrawerOpen(false);
          navigate('cart');
        }}
        onNavigateToProduct={(id: string) => {
          setCartDrawerOpen(false);
          navigate('product-detail', { productId: id });
        }}
      />

      {/* User Login/Register Modal */}
      <AccountModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigateToDetail={(id: string) => {
          setQuickViewProduct(null);
          navigate('product-detail', { productId: id });
        }}
      />

      {/* First-Visit Promotional Coupon Popup */}
      <PromoPopup />

      {/* Floating Stylist WhatsApp Chat Button */}
      <WhatsAppButton />
    </div>
  );
};

