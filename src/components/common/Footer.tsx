import React from 'react';
import {
  ShieldCheck,
  RefreshCcw,
  Truck,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Globe,
  Share2
} from 'lucide-react';
import { Generation } from '../../types';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#121212] text-zinc-300 pt-16 pb-12 border-t border-zinc-800 mt-20">
      {/* Brand value propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400 mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-white text-sm font-semibold tracking-wide">Express Delivery</h4>
            <p className="text-xs text-zinc-400 mt-1">Free delivery across India on orders over ₹999</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400 mb-3">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h4 className="text-white text-sm font-semibold tracking-wide">14-Day Free Exchange</h4>
            <p className="text-xs text-zinc-400 mt-1">Hassle-free doorstep returns and sizing swaps</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-white text-sm font-semibold tracking-wide">100% Authentic Quality</h4>
            <p className="text-xs text-zinc-400 mt-1">Pre-shrunk, premium fabrics crafted to international standards</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400 mb-3">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="text-white text-sm font-semibold tracking-wide">Secure Checkout</h4>
            <p className="text-xs text-zinc-400 mt-1">UPI, Cards, Netbanking & Cash on Delivery supported</p>
          </div>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-2xl font-display font-black tracking-wider text-white">
                FASH HUB
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            </div>
            <p className="text-xs italic text-amber-400/90 font-serif-luxury mb-4">
              "Your Style. Your Generation. Your Fashion."
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              FASH HUB is an international-standard Western fashion shopping destination offering premium, modern apparel for every age group—from babies and teenagers to seniors.
            </p>

            <div className="flex items-center space-x-3 text-zinc-400">
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 hover:text-amber-400 flex items-center justify-center transition-colors text-xs font-bold" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 hover:text-amber-400 flex items-center justify-center transition-colors text-xs font-bold" aria-label="Facebook">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 hover:text-amber-400 flex items-center justify-center transition-colors text-xs font-bold" aria-label="X / Twitter">
                X
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 hover:text-amber-400 flex items-center justify-center transition-colors text-xs font-bold" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>

          {/* Generations */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Shop by Generation
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'baby' })}
                  className="hover:text-white transition-colors"
                >
                  Baby Collection (0–2 Yrs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'kids' })}
                  className="hover:text-white transition-colors"
                >
                  Kids Collection (2–12 Yrs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'teenagers' })}
                  className="hover:text-white transition-colors"
                >
                  Teenagers Collection (13–19 Yrs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'women' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Western Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'men' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Western Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { generation: 'seniors' })}
                  className="hover:text-white transition-colors"
                >
                  Senior Comfort Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links & Special sections */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Curated Edits
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog', { tag: 'trending' })}
                  className="hover:text-white transition-colors"
                >
                  Trending Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { tag: 'new-arrival' })}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { tag: 'streetwear' })}
                  className="hover:text-white transition-colors"
                >
                  Streetwear Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { tag: 'under-499' })}
                  className="hover:text-white transition-colors"
                >
                  Under ₹499 Steals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { tag: 'under-999' })}
                  className="hover:text-white transition-colors"
                >
                  Under ₹999 Premium
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Help & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'contact' })}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'faq' })}
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'shipping' })}
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'return' })}
                  className="hover:text-white transition-colors"
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'privacy' })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('static', { page: 'terms' })}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright & payment badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© 2026 FASH HUB India Ltd. All rights reserved. One Destination, Every Generation, Endless Fashion.</p>
        <div className="flex items-center space-x-3 text-zinc-400 font-medium text-[11px]">
          <span className="px-2 py-1 bg-zinc-800 rounded">UPI</span>
          <span className="px-2 py-1 bg-zinc-800 rounded">VISA</span>
          <span className="px-2 py-1 bg-zinc-800 rounded">Mastercard</span>
          <span className="px-2 py-1 bg-zinc-800 rounded">RuPay</span>
          <span className="px-2 py-1 bg-zinc-800 rounded">COD</span>
        </div>
      </div>
    </footer>
  );
};
