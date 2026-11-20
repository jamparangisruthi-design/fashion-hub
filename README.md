# FASH HUB – Modern Western Fashion E-Commerce Platform

> **"Your Style. Your Generation. Your Fashion."**  
> *One Destination, Every Generation, Endless Fashion.*

**FASH HUB** is an international-grade Western fashion e-commerce web platform offering contemporary apparel for every generation:
- **Baby Collection (0–2 Years):** Organic ribbed rompers, flutter sleeve dresses, linen sets, sherpa winter suits.
- **Kids Collection (2–12 Years):** Graphic cotton tees, tiered party dresses, 4-way stretch denim, colorblock hoodies, lightweight puffer jackets.
- **Teenagers Collection (13–19 Years):** 240 GSM acid-wash oversized tees, baggy 90s skater jeans, asymmetric ribbed crop tops, tactical parachute cargo pants, trucker jackets.
- **Women's Collection:** Italian bias-cut satin slip dresses, double-breasted oversized tailored blazers, pure European flax linen co-ords, high-rise sculpting wide-leg denim, wool trench coats.
- **Men's Collection:** 220 GSM Peruvian Pima cotton heavyweight tees, textured waffle pique polo tees, Cuban camp-collar resort linen shirts, Japanese shuttle-loomed selvedge denim, Italian-cut wool blazers.
- **Senior Collection:** Supima cotton relaxed shirts with easy-fasten buttons, comfort 4-way stretch elastic-waist trousers, micro-fleece cardigans, tagless hypoallergenic tees.

---

## 🌟 Key Features

### 1. Luxury International Shopping Experience
- **Color Palette & Aesthetics:** Minimalist white, black, beige, warm oat, and soft pastel accents with modern luxury serif and display typography (Cinzel & Playfair Display).
- **Dark Mode & Light Mode:** Seamless toggle with instant persistence across sessions.
- **Announcement Bar:** Dynamic multi-message rotating promo bar with coupon alerts and free delivery threshold notifications.
- **First-Visit Promotional Popup:** Automatic welcome incentive offering 10% OFF code `WELCOME10`.
- **WhatsApp Concierge Support:** Floating direct chat button pre-filled with stylist concierge assistance.

### 2. Search & Filter Engine
- **Live Search with Autocomplete:** Instant drop-down suggestions displaying matching product thumbnails, category, price, and direct click-through.
- **Multidimensional Filters:** Filter by Generation, Gender, Category, Price Slider, Sizes (XS–XXL, Baby/Kids sizes), Color Swatches, Brands, and Minimum Discount (10%+, 20%+, 30%+, 50%+).
- **Sorting:** Price Low-to-High, High-to-Low, Popularity, Newest Arrivals, Highest Ratings, and Curated Featured.
- **Active Filter Chips & Clear All:** Intuitive tag management.

### 3. Product Details Page (PDP)
- **High-Definition Gallery:** Multiple angle image gallery with thumbnail switcher and hover cursor zoom.
- **Color & Size Selector:** Interactive shade selection and size buttons with live stock indicators ("Only 3 left in stock!").
- **Interactive Size Guide Modal:** Complete measurement tables with one-click **Inches / Centimeters (CM)** toggle across Women, Men, Kids, and Teens.
- **Pincode Delivery Checker:** Live 6-digit Indian PIN code delivery checker estimating arrival days and Cash on Delivery eligibility.
- **Fabric & Care Specifications:** Accordion detailing fiber composition, yarn count, and wash instructions.
- **14-Day Return & Exchange Guarantee:** Free doorstep pickup & instant size swaps.
- **Customer Reviews & Moderation:** Verified buyer rating breakdown with interactive "Write a Review" submission modal.
- **Related & Recommended Products:** Curated suggestions from identical collections.

### 4. Shopping Bag & Checkout
- **Slide-out Cart Drawer + Full Cart Page:** Item count badge, quantity adjusters, size/color variant updater, item removal.
- **Free Delivery Progress Bar:** Live meter calculating remaining balance to reach ₹999 free shipping.
- **Coupon Code Engine:** Working promo codes:
  - `WELCOME10`: 10% OFF on first Western order
  - `FASH500`: Flat ₹500 OFF on orders above ₹1,999
  - `SUPERFASH`: 20% OFF on orders above ₹2,999
  - `FASHGENZ`: 15% OFF on Teen & Streetwear items
- **Multi-Step Checkout:**
  1. **Delivery Address:** Select saved addresses or add new address with validation (Name, Phone, Street, City, State, PIN code).
  2. **Payment Gateway Test Mode:**
     - **UPI:** Dynamic QR code generator + VPA checker (GPay, PhonePe, Paytm).
     - **Credit / Debit Cards:** Card interface with one-click **"Auto-fill Test Card Details"** button (test mode simulation).
     - **Net Banking:** Popular Indian banks selector (HDFC, SBI, ICICI, Axis, Kotak).
     - **Cash on Delivery (COD):** Direct doorstep payment.
  3. **Order Confirmation Screen:** Festive confetti celebration (`canvas-confetti`), unique tracking ID generator, and printable invoice receipt.

### 5. User Account & Live Order Tracking
- **Authentication:** Customer registration, login, logout, and instant 1-Click Demo Customer & Demo Admin buttons.
- **Live Visual Order Tracking Stepper:** 5-stage shipment progression:
  * Order Placed → Checked & Packed → Dispatched / Shipped → Out for Delivery → Delivered.
- **Address Book Management:** Add, edit, delete, and set default shipping addresses.
- **Wishlist Management:** Save products with one-click move-to-bag functionality.

### 6. Admin Control Center
- **Executive KPIs:** Total sales revenue, total orders, active catalog styles, low-stock warnings.
- **Product Catalog Management (CRUD):** Add new items with multi-image URLs, generation, category, price, discount %, sizes, and colors; edit existing products; delete items.
- **Live Order Status Dispatcher:** Change status (`Placed`, `Processing`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`) with immediate synchronization to customer tracking.
- **Coupon Code Manager:** Create new promo discount codes, set min order thresholds, and toggle active/disabled states.
- **Review Moderation:** Review and delete customer comments.

### 7. Informational & Legal Pages
- **About Us:** Brand philosophy and generational textile craftsmanship.
- **Contact Us:** Interactive contact inquiry form with office location and helpline details.
- **FAQs:** Accordion addressing sizing, shipping, returns, and payment options.
- **Policies:** Complete Shipping Policy, 14-Day Return & Refund Policy, Privacy Policy, and Terms & Conditions.

---

## 🚀 Quick Start Guide

### Option A: Run Full-Stack Server (Production Build + Backend API on Port 5000)
```bash
# 1. Start the server (serves both API and frontend)
npm start
# or: node server/index.js
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

### Option B: Run Vite Hot-Reloading Development Server (Port 5173)
```bash
# 1. Start frontend dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Credentials & Quick Access
The login modal includes **1-Click Quick Demo Access** buttons:
- **Customer Demo:** Pre-loaded with address book, order history, and saved items.
- **Admin Demo:** Instant access to the Admin Dashboard (`admin@fashhub.com`).

