import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

