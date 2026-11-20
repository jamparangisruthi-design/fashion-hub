import type { Product } from '../types/index.ts';

export const initialProducts: Product[] = [
  // --- BABY COLLECTION (0-2 Years) ---
  {
    id: 'prod-baby-1',
    name: 'Soft Organic Ribbed Baby Romper',
    description: 'Ultra-soft, breathable 100% organic cotton ribbed romper designed for delicate baby skin. Features snap buttons along the inseam for effortless diaper changes and stretchy ribbed cuffs for maximum comfort.',
    fabricDetails: '100% GOTS Certified Organic Cotton (Ribbed Knit)',
    careInstructions: 'Machine wash cold inside out, tumble dry low, do not bleach',
    originalPrice: 899,
    discountedPrice: 449,
    discountPercentage: 50,
    generation: 'baby',
    category: 'Baby Rompers',
    subcategory: 'Rompers',
    gender: 'unisex',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#e3dac9' },
      { name: 'Sage Green', hex: '#9caf88' },
      { name: 'Dusty Rose', hex: '#dcae96' }
    ],
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 84,
    stock: 28,
    brand: 'FASH Baby Atelier',
    tags: ['trending', 'new-arrival', 'under-499', 'casual'],
    deliveryInfo: 'Express delivery in 2-3 business days. Free shipping on orders over ₹999.',
    returnPolicy: 'Hassle-free 14-day return and exchange policy.',
    isFeatured: true,
    createdAt: '2026-10-01'
  },
  {
    id: 'prod-baby-2',
    name: 'Floral Flutter Sleeve Baby Western Dress',
    description: 'Charming micro-floral printed Western baby dress with flutter sleeves and an empire waistline. Includes matching bloomers. Designed with soft, hypoallergenic cotton lining for all-day comfort.',
    fabricDetails: '100% Pure Lightweight Cotton with Voile Lining',
    careInstructions: 'Gentle hand wash or delicate machine cycle with mild detergent',
    originalPrice: 1299,
    discountedPrice: 649,
    discountPercentage: 50,
    generation: 'baby',
    category: 'Baby Dresses',
    subcategory: 'Dresses',
    gender: 'girls',
    sizes: ['3-6M', '6-12M', '12-18M', '18-24M'],
    colors: [
      { name: 'Pastel Lilac', hex: '#c8b9d2' },
      { name: 'Buttercup Yellow', hex: '#fdf6c7' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 52,
    stock: 19,
    brand: 'FASH Baby Atelier',
    tags: ['summer', 'party', 'under-999'],
    deliveryInfo: 'Standard delivery in 3-5 days. Priority dispatch available.',
    returnPolicy: '14-day replacement guarantee.',
    isFeatured: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'prod-baby-3',
    name: 'Essential Pocket Graphic Cotton Baby Tee',
    description: 'Classic crew-neck cotton tee with a faux-suede chest pocket and cute modern animal line-art motif. Tagless neck label to prevent irritation.',
    fabricDetails: '100% Combed Cotton Jersey',
    careInstructions: 'Machine wash warm, iron on reverse side',
    originalPrice: 599,
    discountedPrice: 349,
    discountPercentage: 42,
    generation: 'baby',
    category: 'Baby T-Shirts',
    subcategory: 'T-Shirts',
    gender: 'unisex',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    colors: [
      { name: 'Off White', hex: '#f4f3ef' },
      { name: 'Soft Muted Blue', hex: '#8ea3af' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewsCount: 39,
    stock: 45,
    brand: 'Little Stars',
    tags: ['budget', 'under-499', 'casual', 'best-seller'],
    deliveryInfo: 'Delivered in 2-4 days.',
    returnPolicy: '14-day returns.',
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-baby-4',
    name: 'Linen Blend Baby Shorts with Braces',
    description: 'Timeless European style linen-cotton shorts featuring adjustable button-on suspender straps and an elasticated waistband for a secure, gentle fit.',
    fabricDetails: '55% Linen, 45% Organic Cotton',
    careInstructions: 'Machine wash delicate, line dry in shade',
    originalPrice: 999,
    discountedPrice: 499,
    discountPercentage: 50,
    generation: 'baby',
    category: 'Baby Shorts',
    subcategory: 'Shorts',
    gender: 'unisex',
    sizes: ['6-12M', '12-18M', '18-24M'],
    colors: [
      { name: 'Natural Sand', hex: '#d6c6b2' },
      { name: 'Olive Gray', hex: '#7a8174' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 27,
    stock: 14,
    brand: 'FASH Baby Atelier',
    tags: ['summer', 'party', 'under-499'],
    deliveryInfo: 'Ships within 24 hours.',
    returnPolicy: '14-day easy return.',
    createdAt: '2026-10-05'
  },
  {
    id: 'prod-baby-5',
    name: 'Quilted Sherpa Hooded Baby Winter Suit',
    description: 'Snuggle-ready quilted thermal pram suit lined with plush sherpa fleece. Features fold-over mitts, cute teddy ears on the hood, and dual full-length front zippers for hassle-free dressing in chilly weather.',
    fabricDetails: 'Outer: 100% Micro-twill Water-repellent; Lining: 100% Thermal Sherpa Fleece',
    careInstructions: 'Machine wash delicate cold, air dry flat',
    originalPrice: 2499,
    discountedPrice: 1299,
    discountPercentage: 48,
    generation: 'baby',
    category: 'Baby Winter Wear',
    subcategory: 'Winter Wear',
    gender: 'unisex',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    colors: [
      { name: 'Warm Cream', hex: '#faf0e6' },
      { name: 'Camel Tan', hex: '#b0845a' }
    ],
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewsCount: 42,
    stock: 16,
    brand: 'Nordic Mini',
    tags: ['winter', 'premium', 'trending'],
    deliveryInfo: 'Fast 2-3 day shipping across India.',
    returnPolicy: '14-day return and exchange.',
    createdAt: '2026-10-25'
  },

  // --- KIDS COLLECTION (2-12 Years) ---
  {
    id: 'prod-kids-1',
    name: 'Kids Western Adventure Cotton Graphic Tee',
    description: 'Vibrant and durable graphic t-shirt crafted from premium 100% ringspun cotton. Pre-shrunk with reinforced shoulder seams to withstand active outdoor play.',
    fabricDetails: '100% Ringspun Cotton Single Jersey (180 GSM)',
    careInstructions: 'Machine wash at 40°C, do not iron on print',
    originalPrice: 799,
    discountedPrice: 399,
    discountPercentage: 50,
    generation: 'kids',
    category: 'Boys T-Shirts',
    subcategory: 'T-Shirts',
    gender: 'boys',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12Y'],
    colors: [
      { name: 'Cobalt Blue', hex: '#1e3a8a' },
      { name: 'Amber Yellow', hex: '#d97706' },
      { name: 'Chalk White', hex: '#f8fafc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 112,
    stock: 55,
    brand: 'Urban Kids',
    tags: ['under-499', 'casual', 'best-seller', 'trending'],
    deliveryInfo: 'Delivered in 2-4 business days.',
    returnPolicy: '14-day easy returns.',
    isFeatured: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'prod-kids-2',
    name: 'Tiered Tulle & Cotton Girls Western Party Dress',
    description: 'An enchanting tiered skater dress featuring delicate flutter sleeves, a soft stretch cotton bodice, and a multi-layered star-dusted tulle skirt. Perfect for birthday parties and celebrations.',
    fabricDetails: 'Bodice: 95% Cotton 5% Elastane; Skirt: 100% Poly Tulle with Soft Cotton Lining',
    careInstructions: 'Hand wash gently in cold water, hang dry',
    originalPrice: 1999,
    discountedPrice: 999,
    discountPercentage: 50,
    generation: 'kids',
    category: 'Girls Dresses',
    subcategory: 'Dresses',
    gender: 'girls',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Blush Pink', hex: '#f4c2c2' },
      { name: 'Glacier Sky', hex: '#77b5d9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 78,
    stock: 22,
    brand: 'FASH Juniors',
    tags: ['party', 'under-999', 'festival', 'trending'],
    deliveryInfo: 'Express delivery option available.',
    returnPolicy: '14-day returns.',
    isFeatured: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-kids-3',
    name: 'Kids Super-Stretch Slim Fit Washed Jeans',
    description: 'Ultra-flexible 4-way stretch denim jeans designed for active kids. Features an adjustable interior waistband, classic 5-pocket styling, and authentic whiskered vintage fading.',
    fabricDetails: '78% Cotton, 20% Polyester, 2% Elastane Flexible Denim',
    careInstructions: 'Machine wash cold, turn inside out',
    originalPrice: 1499,
    discountedPrice: 799,
    discountPercentage: 47,
    generation: 'kids',
    category: 'Jeans',
    subcategory: 'Jeans',
    gender: 'unisex',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12Y'],
    colors: [
      { name: 'Medium Indigo', hex: '#2b4d74' },
      { name: 'Washed Black', hex: '#333333' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewsCount: 95,
    stock: 35,
    brand: 'Denim Lab Kids',
    tags: ['casual', 'under-999', 'best-seller'],
    deliveryInfo: 'Ships within 24 hours.',
    returnPolicy: '14-day exchange guarantee.',
    createdAt: '2026-09-28'
  },
  {
    id: 'prod-kids-4',
    name: 'Kids Colorblock French Terry Hoodie',
    description: 'Modern sporty color-blocked hoodie crafted from soft brushed French terry cotton. Features a kangaroo pocket, ribbed hems, and a cozy double-lined hood.',
    fabricDetails: '80% Cotton, 20% Polyester Heavy French Terry',
    careInstructions: 'Machine wash warm with like colors',
    originalPrice: 1599,
    discountedPrice: 849,
    discountPercentage: 47,
    generation: 'kids',
    category: 'Hoodies',
    subcategory: 'Hoodies',
    gender: 'unisex',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12Y'],
    colors: [
      { name: 'Forest & Beige', hex: '#2d4030' },
      { name: 'Navy & Rust', hex: '#1c2833' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 64,
    stock: 24,
    brand: 'Urban Kids',
    tags: ['winter', 'casual', 'under-999'],
    deliveryInfo: 'Free shipping on orders above ₹999.',
    returnPolicy: '14-day return.',
    createdAt: '2026-10-15'
  },
  {
    id: 'prod-kids-5',
    name: 'Kids Lightweight Quilted Puffer Jacket',
    description: 'Featherlight yet exceptionally warm thermal puffer jacket with water-resistant shell finish and recycled insulation padding. Easy packable design with zippered hand pockets.',
    fabricDetails: '100% Water-repellent Nylon; Thermal Polyfill Padding',
    careInstructions: 'Machine wash cold on gentle cycle',
    originalPrice: 2499,
    discountedPrice: 1399,
    discountPercentage: 44,
    generation: 'kids',
    category: 'Winter Wear',
    subcategory: 'Jackets',
    gender: 'unisex',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12Y'],
    colors: [
      { name: 'Mustard Gold', hex: '#d4af37' },
      { name: 'Midnight Blue', hex: '#191970' }
    ],
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 51,
    stock: 18,
    brand: 'FASH Juniors',
    tags: ['winter', 'premium'],
    deliveryInfo: 'Delivery in 3-5 days.',
    returnPolicy: '14-day replacement.',
    createdAt: '2026-10-22'
  },

  // --- TEENAGERS COLLECTION (13-19 Years) ---
  {
    id: 'prod-teen-1',
    name: 'Gen-Z Acid Wash Heavyweight Oversized Tee',
    description: 'Statement drop-shoulder boxy oversized t-shirt with custom acid-wash patina and bold typographic back print. Crafted from 240 GSM heavy combed cotton for a structural streetwear drape.',
    fabricDetails: '100% Pure Heavyweight Combed Cotton (240 GSM)',
    careInstructions: 'Cold machine wash inside out to preserve vintage wash',
    originalPrice: 1299,
    discountedPrice: 699,
    discountPercentage: 46,
    generation: 'teenagers',
    category: 'Oversized T-Shirts',
    subcategory: 'Streetwear',
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mineral Washed Charcoal', hex: '#373a3c' },
      { name: 'Vintage Olive', hex: '#556b2f' },
      { name: 'Distressed Brown', hex: '#4a3728' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 168,
    stock: 42,
    brand: 'ASTRO Street',
    tags: ['streetwear', 'trending', 'college', 'under-999', 'best-seller'],
    deliveryInfo: 'Delivered in 2-3 business days.',
    returnPolicy: '14-day hassle-free return.',
    isFeatured: true,
    createdAt: '2026-10-05'
  },
  {
    id: 'prod-teen-2',
    name: '90s Relaxed Wide-Leg Skater Baggy Jeans',
    description: 'Authentic 90s skater-inspired wide-leg baggy denim with heavy enzyme wash, loose thighs, relaxed puddling ankles, and metal rivet reinforcements.',
    fabricDetails: '100% Rigid Heavy Cotton Denim (13.5 oz)',
    careInstructions: 'Machine wash cold inside out, air dry',
    originalPrice: 2599,
    discountedPrice: 1499,
    discountPercentage: 42,
    generation: 'teenagers',
    category: 'Baggy Jeans',
    subcategory: 'Jeans',
    gender: 'unisex',
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Bleached Sky Denim', hex: '#87ceeb' },
      { name: 'Raw Vintage Indigo', hex: '#1c39bb' },
      { name: 'Faded Black', hex: '#222222' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 140,
    stock: 31,
    brand: 'ASTRO Street',
    tags: ['streetwear', 'trending', 'college'],
    deliveryInfo: 'Free shipping on this order.',
    returnPolicy: '14-day free exchange.',
    isFeatured: true,
    createdAt: '2026-10-18'
  },
  {
    id: 'prod-teen-3',
    name: 'Ribbed Seamless Asymmetric Crop Top',
    description: 'Sculpting seamless micro-ribbed crop top with an asymmetrical one-shoulder neckline. Pairs effortlessly with low-slung cargos or high-rise denim.',
    fabricDetails: '92% Micro-polyamide, 8% Elastane High-recovery Knit',
    careInstructions: 'Machine wash cold in laundry bag, do not tumble dry',
    originalPrice: 799,
    discountedPrice: 429,
    discountPercentage: 46,
    generation: 'teenagers',
    category: 'Crop Tops',
    subcategory: 'Tops',
    gender: 'girls',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Espresso Brown', hex: '#362b28' },
      { name: 'Ivory Cream', hex: '#fffff0' },
      { name: 'Sage Mist', hex: '#8ea89d' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewsCount: 88,
    stock: 50,
    brand: 'FASH Studio',
    tags: ['under-499', 'party', 'summer', 'trending'],
    deliveryInfo: 'Express 2-day delivery available.',
    returnPolicy: '14-day easy return.',
    createdAt: '2026-10-08'
  },
  {
    id: 'prod-teen-4',
    name: 'Tactical Multi-Pocket Parachute Cargo Pants',
    description: 'Hyper-trendy lightweight nylon parachute pants with elastic toggle bungee cords at the waist and ankles. 6 utilitarian flap pockets for authentic streetwear utility.',
    fabricDetails: '100% High-density Matte Ripstop Nylon',
    careInstructions: 'Machine wash cold delicate, do not iron directly',
    originalPrice: 2299,
    discountedPrice: 1199,
    discountPercentage: 48,
    generation: 'teenagers',
    category: 'Cargo Pants',
    subcategory: 'Streetwear',
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Tactical Olive', hex: '#4b5320' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Desert Khaki', hex: '#c3b091' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 119,
    stock: 29,
    brand: 'ASTRO Street',
    tags: ['streetwear', 'college', 'trending'],
    deliveryInfo: 'Delivered in 3-4 days.',
    returnPolicy: '14-day exchange.',
    createdAt: '2026-10-14'
  },
  {
    id: 'prod-teen-5',
    name: 'Vintage Distressed Boxy Denim Trucker Jacket',
    description: 'Authentic retro wash denim jacket with custom metal shank buttons, dual chest flap pockets, dropped shoulders, and subtle distressing along the seams.',
    fabricDetails: '100% Premium Cotton Denim (14 oz)',
    careInstructions: 'Machine wash cold inside out, hang to dry',
    originalPrice: 2999,
    discountedPrice: 1699,
    discountPercentage: 43,
    generation: 'teenagers',
    category: 'Denim Jackets',
    subcategory: 'Jackets',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stone Washed Blue', hex: '#587e9d' },
      { name: 'Washed Charcoal', hex: '#393939' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 73,
    stock: 20,
    brand: 'Denim Lab',
    tags: ['winter', 'college', 'premium'],
    deliveryInfo: 'Free express shipping.',
    returnPolicy: '14-day replacement guarantee.',
    createdAt: '2026-10-20'
  },

  // --- WOMEN'S COLLECTION ---
  {
    id: 'prod-wom-1',
    name: 'Satin Bias-Cut Western Slip Midi Dress',
    description: 'Elegantly tailored slip dress cut on the bias to drape flawlessly over the body. Features adjustable criss-cross spaghetti straps, a soft cowl neckline, and a subtle side slit for modern movement.',
    fabricDetails: '100% Premium Heavyweight Poly Satin with Silk Touch',
    careInstructions: 'Hand wash cold or dry clean recommended',
    originalPrice: 3299,
    discountedPrice: 1899,
    discountPercentage: 42,
    generation: 'women',
    category: 'Western Dresses',
    subcategory: 'Dresses',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Gold', hex: '#eedc82' },
      { name: 'Emerald Forest', hex: '#124e3f' },
      { name: 'Midnight Black', hex: '#0a0a0a' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 210,
    stock: 35,
    brand: 'FASH Atelier',
    tags: ['party', 'premium', 'trending', 'best-seller'],
    deliveryInfo: 'Fast delivery in 2-3 business days.',
    returnPolicy: '14-day hassle-free return.',
    isFeatured: true,
    createdAt: '2026-10-02'
  },
  {
    id: 'prod-wom-2',
    name: 'Tailored Double-Breasted Oversized Blazer',
    description: 'Impeccably structured modern blazer with peak lapels, tortoiseshell buttons, functional flap pockets, and light shoulder padding for an architectural silhouette. Perfect for boardroom power or weekend layered chic.',
    fabricDetails: '70% Viscose, 26% Polyester, 4% Elastane Tailored Suiting',
    careInstructions: 'Professional dry clean only',
    originalPrice: 4499,
    discountedPrice: 2499,
    discountPercentage: 44,
    generation: 'women',
    category: 'Blazers',
    subcategory: 'Office Wear',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Warm Camel Beige', hex: '#c19a6b' },
      { name: 'Classic Black', hex: '#1c1b1a' },
      { name: 'Chalk Ivory', hex: '#ede6d6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 185,
    stock: 25,
    brand: 'FASH Atelier',
    tags: ['office', 'premium', 'trending'],
    deliveryInfo: 'Free priority shipping.',
    returnPolicy: '14-day return and exchange.',
    isFeatured: true,
    createdAt: '2026-10-11'
  },
  {
    id: 'prod-wom-3',
    name: 'Pure Linen Relaxed 2-Piece Co-ord Set',
    description: 'Chic resort-wear set featuring a breezy button-up camp shirt and matching high-waisted wide-leg trousers with drawstring elastic waistband. Designed for effortless summer luxury.',
    fabricDetails: '100% Washed European Flax Linen',
    careInstructions: 'Machine wash delicate cold, iron damp on linen setting',
    originalPrice: 3999,
    discountedPrice: 2199,
    discountPercentage: 45,
    generation: 'women',
    category: 'Co-ord Sets',
    subcategory: 'Casual Wear',
    gender: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta Rust', hex: '#cc5a36' },
      { name: 'Natural Oatmeal', hex: '#d9cdbe' },
      { name: 'Sky Azure', hex: '#9ec1cf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 132,
    stock: 20,
    brand: 'Aura Minimal',
    tags: ['summer', 'casual', 'premium'],
    deliveryInfo: 'Delivered in 3-4 days.',
    returnPolicy: '14-day return policy.',
    isFeatured: true,
    createdAt: '2026-10-15'
  },
  {
    id: 'prod-wom-4',
    name: 'High-Rise Sculpting Wide-Leg Jeans',
    description: 'Flattering high-rise waist with relaxed wide legs through the hem. Crafted with premium comfort-stretch denim that holds its shape throughout the day without sagging.',
    fabricDetails: '98% Cotton, 2% Spandex Indigo Denim',
    careInstructions: 'Machine wash cold inside out with dark colors',
    originalPrice: 2499,
    discountedPrice: 1299,
    discountPercentage: 48,
    generation: 'women',
    category: 'Wide-Leg Pants',
    subcategory: 'Jeans',
    gender: 'women',
    sizes: ['26', '28', '30', '32', '34', '36'],
    colors: [
      { name: 'Vintage Light Indigo', hex: '#5e81ac' },
      { name: 'Deep Midnight Rinse', hex: '#1f2a44' },
      { name: 'Ecru Off-White', hex: '#f0ece1' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 198,
    stock: 40,
    brand: 'Denim Lab',
    tags: ['casual', 'best-seller', 'college'],
    deliveryInfo: 'Fast delivery across India.',
    returnPolicy: '14-day free exchange.',
    createdAt: '2026-09-29'
  },
  {
    id: 'prod-wom-5',
    name: 'Modal Ribbed Slim Crew Neck T-Shirt',
    description: 'Silky smooth featherweight ribbed t-shirt made of eco-friendly Lenzing Modal. Hugs the curves gently with a clean tuckable hem and ribbed crew neck.',
    fabricDetails: '95% Lenzing Modal, 5% Spandex Super-soft Jersey',
    careInstructions: 'Machine wash cold on gentle, lay flat to dry',
    originalPrice: 999,
    discountedPrice: 499,
    discountPercentage: 50,
    generation: 'women',
    category: 'T-Shirts',
    subcategory: 'Tops',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Dusty Cocoa', hex: '#7b5e57' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 240,
    stock: 75,
    brand: 'Aura Minimal',
    tags: ['under-499', 'casual', 'office', 'best-seller'],
    deliveryInfo: 'Ships within 24 hours.',
    returnPolicy: '14-day return.',
    createdAt: '2026-09-18'
  },
  {
    id: 'prod-wom-6',
    name: 'Wool-Blend Double-Breasted Winter Trench Coat',
    description: 'Timeless longline winter trench coat crafted from a warm wool-blend fabric. Features a removable waist belt with custom buckle, shoulder epaulets, storm flap, and deep welt pockets.',
    fabricDetails: '60% Wool, 35% Polyester, 5% Other Fibers; Satin Interior Lining',
    careInstructions: 'Dry clean only',
    originalPrice: 6999,
    discountedPrice: 3899,
    discountPercentage: 44,
    generation: 'women',
    category: 'Winter Collection',
    subcategory: 'Jackets',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Camel', hex: '#b8860b' },
      { name: 'Slate Gray', hex: '#4a5568' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewsCount: 92,
    stock: 15,
    brand: 'FASH Atelier',
    tags: ['winter', 'premium'],
    deliveryInfo: 'Free express doorstep delivery.',
    returnPolicy: '14-day return.',
    createdAt: '2026-10-28'
  },

  // --- MEN'S COLLECTION ---
  {
    id: 'prod-men-1',
    name: 'Premium Pima Cotton Heavyweight Crew Tee',
    description: 'The definitive luxury t-shirt. Spun from ultra-long staple Peruvian Pima cotton with a substantial 220 GSM weight, durable ribbed collar, and anti-twist side seams.',
    fabricDetails: '100% Peruvian Long-Staple Pima Cotton (220 GSM)',
    careInstructions: 'Machine wash cold with like colors, tumble dry low',
    originalPrice: 1199,
    discountedPrice: 599,
    discountPercentage: 50,
    generation: 'men',
    category: 'T-Shirts',
    subcategory: 'Casual Wear',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Sage Green', hex: '#879b88' },
      { name: 'Navy Heather', hex: '#1e293b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 312,
    stock: 60,
    brand: 'Metro Elite',
    tags: ['under-999', 'casual', 'best-seller', 'trending'],
    deliveryInfo: 'Fast dispatch in 24 hours. Delivered in 2-4 days.',
    returnPolicy: '14-day replacement guarantee.',
    isFeatured: true,
    createdAt: '2026-09-12'
  },
  {
    id: 'prod-men-2',
    name: 'Textured Waffle Pique Slim Polo T-Shirt',
    description: 'Elevated polo crafted from breathable waffle-knit pique cotton. Styled with a tailored knit collar, three-button placket with genuine mother-of-pearl buttons, and side hem vents.',
    fabricDetails: '100% Combed Pique Cotton (210 GSM)',
    careInstructions: 'Machine wash cold, flat dry recommended to preserve collar shape',
    originalPrice: 1699,
    discountedPrice: 899,
    discountPercentage: 47,
    generation: 'men',
    category: 'Polo T-Shirts',
    subcategory: 'Casual Wear',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Bottle Green', hex: '#0e3d26' },
      { name: 'Ecru Stone', hex: '#e8e2d5' },
      { name: 'Burgundy Wine', hex: '#631e2b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 174,
    stock: 38,
    brand: 'Metro Elite',
    tags: ['under-999', 'office', 'casual'],
    deliveryInfo: 'Free shipping on orders over ₹999.',
    returnPolicy: '14-day easy returns.',
    isFeatured: true,
    createdAt: '2026-10-04'
  },
  {
    id: 'prod-men-3',
    name: 'Relaxed Resort Camp-Collar Linen Shirt',
    description: 'Laid-back Cuban camp-collar casual shirt engineered from pre-washed breathable pure linen. Features a relaxed straight-hem fit designed to be worn untucked.',
    fabricDetails: '100% Natural Washed Linen',
    careInstructions: 'Machine wash cold on gentle cycle, iron slightly damp',
    originalPrice: 2499,
    discountedPrice: 1299,
    discountPercentage: 48,
    generation: 'men',
    category: 'Casual Shirts',
    subcategory: 'Summer Collection',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sand Khaki', hex: '#c2b280' },
      { name: 'Sky Chambray', hex: '#a4b7c6' },
      { name: 'Olive Drab', hex: '#556b2f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 146,
    stock: 28,
    brand: 'Metro Elite',
    tags: ['summer', 'casual', 'trending'],
    deliveryInfo: 'Delivered in 3-4 days.',
    returnPolicy: '14-day returns.',
    isFeatured: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-men-4',
    name: 'Italian Cut Structured Wool-Blend Blazer',
    description: 'Precision-tailored single-breasted blazer with notched lapels, two-button closure, dual back vents, and silky inner lining. Perfect for semi-formal events, date nights, and business dressing.',
    fabricDetails: '65% Fine Wool, 30% Polyester, 5% Spandex; Bemberg Cupro Lining',
    careInstructions: 'Specialist dry clean only',
    originalPrice: 5999,
    discountedPrice: 3299,
    discountPercentage: 45,
    generation: 'men',
    category: 'Blazers',
    subcategory: 'Office Wear',
    gender: 'men',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Charcoal Houndstooth', hex: '#2f3542' },
      { name: 'Midnight Navy', hex: '#131b26' },
      { name: 'Tweed Taupe', hex: '#8b8579' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 89,
    stock: 14,
    brand: 'FASH Atelier',
    tags: ['office', 'party', 'premium'],
    deliveryInfo: 'Free express shipping and garment bag included.',
    returnPolicy: '14-day free return or exchange.',
    isFeatured: true,
    createdAt: '2026-10-21'
  },
  {
    id: 'prod-men-5',
    name: 'Selvedge Straight-Fit Vintage Washed Jeans',
    description: 'Authentic 13.5 oz Japanese selvedge denim crafted on traditional shuttle looms. Features clean red-line selvedge cuffs, button fly, and durable copper hardware.',
    fabricDetails: '100% Shuttle-Loomed Cotton Selvedge Denim',
    careInstructions: 'Wash sparingly inside out in cold water, hang dry',
    originalPrice: 3499,
    discountedPrice: 1899,
    discountPercentage: 45,
    generation: 'men',
    category: 'Jeans',
    subcategory: 'Jeans',
    gender: 'men',
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Dark Indigo Selvedge', hex: '#152238' },
      { name: 'Medium Vintage Wash', hex: '#415a77' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 155,
    stock: 22,
    brand: 'Denim Lab',
    tags: ['casual', 'premium', 'best-seller'],
    deliveryInfo: 'Delivered in 2-4 days.',
    returnPolicy: '14-day returns.',
    createdAt: '2026-09-30'
  },
  {
    id: 'prod-men-6',
    name: 'Heavyweight Fleece Drop-Shoulder Hoodie',
    description: '450 GSM ultra-heavyweight brushed loopback cotton hoodie. Features double-layered hood without drawstrings for a clean architectural profile, ribbed cuffs, and concealed kangaroo pocket.',
    fabricDetails: '100% Ring-Spun Combed Cotton Fleece (450 GSM)',
    careInstructions: 'Machine wash cold delicate, lay flat to dry',
    originalPrice: 2899,
    discountedPrice: 1499,
    discountPercentage: 48,
    generation: 'men',
    category: 'Hoodies',
    subcategory: 'Streetwear',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Oat Beige', hex: '#e4decb' },
      { name: 'Caviar Black', hex: '#141414' },
      { name: 'Washed Pine', hex: '#2b3e34' }
    ],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 204,
    stock: 35,
    brand: 'ASTRO Street',
    tags: ['winter', 'streetwear', 'trending'],
    deliveryInfo: 'Ships same day.',
    returnPolicy: '14-day exchange guarantee.',
    createdAt: '2026-10-17'
  },

  // --- SENIOR COLLECTION ---
  {
    id: 'prod-snr-1',
    name: 'Ultra-Soft Supima Cotton Relaxed Western Shirt',
    description: 'Designed specifically with supreme ease of wear in mind. Crafted from silky smooth 100% American Supima cotton with magnetic/easy-snap front closures, relaxed non-binding armholes, and breathable airy fit.',
    fabricDetails: '100% Long-Staple Supima Cotton (Gentle on mature skin)',
    careInstructions: 'Machine wash warm, easy-iron finish',
    originalPrice: 2199,
    discountedPrice: 1099,
    discountPercentage: 50,
    generation: 'seniors',
    category: 'Casual Shirts',
    subcategory: 'Everyday Wear',
    gender: 'men',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Sky Pastel Blue', hex: '#b0c4de' },
      { name: 'Soft French Beige', hex: '#d9cdbe' },
      { name: 'Muted Mint', hex: '#98ff98' }
    ],
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 96,
    stock: 30,
    brand: 'Cotton Comfort Co',
    tags: ['casual', 'trending', 'under-999'],
    deliveryInfo: 'Express delivery in 2-3 business days.',
    returnPolicy: '30-day senior friendly return with free doorstep pickup.',
    isFeatured: true,
    createdAt: '2026-10-06'
  },
  {
    id: 'prod-snr-2',
    name: 'Comfort Elastic-Waist Soft Stretch Trousers',
    description: 'Everyday comfortable western trousers featuring a full concealed elasticated waistband with interior drawstring, deep easy-access pockets, and 4-way stretch wrinkle-resistant twill fabric.',
    fabricDetails: '68% Cotton, 28% Rayon, 4% Spandex Comfort Twill',
    careInstructions: 'Machine wash cold, wrinkle-resistant non-iron',
    originalPrice: 1999,
    discountedPrice: 999,
    discountPercentage: 50,
    generation: 'seniors',
    category: 'Comfortable Trousers',
    subcategory: 'Everyday Wear',
    gender: 'unisex',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Warm Khaki', hex: '#c3b091' },
      { name: 'Steel Slate', hex: '#5c6b73' },
      { name: 'Classic Navy', hex: '#1c2833' }
    ],
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 114,
    stock: 45,
    brand: 'Cotton Comfort Co',
    tags: ['under-999', 'casual', 'best-seller'],
    deliveryInfo: 'Prompt delivery in 2-4 days.',
    returnPolicy: '30-day extended returns with doorstep pickup.',
    isFeatured: true,
    createdAt: '2026-09-22'
  },
  {
    id: 'prod-snr-3',
    name: 'Featherlight Thermal Fleece Zip-Up Cardigan',
    description: 'Lightweight micro-fleece jacket engineered for gentle thermal insulation without heaviness. Easy-grip zipper puller, smooth chin guard, and cozy brushed interior.',
    fabricDetails: '100% Anti-pilling Micro-fleece Polyester',
    careInstructions: 'Machine wash cold, quick dry',
    originalPrice: 2499,
    discountedPrice: 1299,
    discountPercentage: 48,
    generation: 'seniors',
    category: 'Jackets',
    subcategory: 'Winter Wear',
    gender: 'unisex',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#d6cdbd' },
      { name: 'Charcoal Heather', hex: '#3e424b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 82,
    stock: 25,
    brand: 'Cotton Comfort Co',
    tags: ['winter', 'casual', 'premium'],
    deliveryInfo: 'Priority dispatch.',
    returnPolicy: '30-day hassle-free return.',
    createdAt: '2026-10-19'
  },
  {
    id: 'prod-snr-4',
    name: 'Breathable Cotton Slub Relaxed Western Tunic',
    description: 'Artfully crafted from breathable 100% organic cotton slub. Features 3/4th sleeves, side slits for easy movement, and a modest mandarin collar with shell buttons.',
    fabricDetails: '100% Pure Organic Slub Cotton',
    careInstructions: 'Hand or machine wash gentle with mild liquid detergent',
    originalPrice: 1499,
    discountedPrice: 749,
    discountPercentage: 50,
    generation: 'seniors',
    category: 'Comfortable Western Tops',
    subcategory: 'Everyday Wear',
    gender: 'women',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Sage Green', hex: '#8ea89d' },
      { name: 'Soft Coral', hex: '#f08080' },
      { name: 'Chalk White', hex: '#faf9f6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 65,
    stock: 32,
    brand: 'Cotton Comfort Co',
    tags: ['under-999', 'summer', 'casual'],
    deliveryInfo: 'Doorstep delivery in 3 days.',
    returnPolicy: '30-day extended returns.',
    createdAt: '2026-10-10'
  },
  {
    id: 'prod-snr-5',
    name: 'Pure Organic Cotton Tagless Everyday Tee',
    description: 'Designed for sensitive skin with completely flat seam construction, seamless tagless neck, and relaxed non-clinging silhouette in pure combed cotton.',
    fabricDetails: '100% Combed Long-Staple Cotton (Hypoallergenic)',
    careInstructions: 'Machine wash warm, do not bleach',
    originalPrice: 899,
    discountedPrice: 449,
    discountPercentage: 50,
    generation: 'seniors',
    category: 'Cotton T-Shirts',
    subcategory: 'Everyday Wear',
    gender: 'unisex',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Muted Sand', hex: '#d9cdbe' },
      { name: 'Navy Blue', hex: '#1c2833' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 71,
    stock: 50,
    brand: 'Cotton Comfort Co',
    tags: ['under-499', 'casual', 'budget'],
    deliveryInfo: 'Ships within 24 hours.',
    returnPolicy: '30-day returns.',
    createdAt: '2026-09-25'
  }
];

export const initialCoupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage' as const,
    value: 10,
    minOrder: 500,
    description: '10% OFF on your first Western order across all categories!',
    active: true
  },
  {
    code: 'FASH500',
    discountType: 'fixed' as const,
    value: 500,
    minOrder: 1999,
    description: 'Flat ₹500 OFF on premium orders above ₹1,999',
    active: true
  },
  {
    code: 'SUPERFASH',
    discountType: 'percentage' as const,
    value: 20,
    minOrder: 2999,
    description: '20% Mega Savings on orders above ₹2,999',
    active: true
  },
  {
    code: 'FASHGENZ',
    discountType: 'percentage' as const,
    value: 15,
    minOrder: 999,
    description: '15% OFF on Streetwear & Teen Collections',
    active: true
  }
];

export const initialReviews = [
  {
    id: 'rev-1',
    productId: 'prod-wom-1',
    userName: 'Ananya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'The drape of this satin bias dress is incredible! Looks like something straight out of a high-end European boutique. Sizing is spot on and the cowl neck is so flattering.',
    date: '2026-11-05',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-wom-1',
    userName: 'Rhea Sen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Wore this for an anniversary dinner and received so many compliments. Luxurious fabric, doesn’t cling uncomfortably.',
    date: '2026-11-12',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-men-1',
    userName: 'Vikramaditya Roy',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Finally a t-shirt in India with actual 220 GSM heavyweight Pima cotton! Holds its collar even after 4 washes. Ordering 3 more colors.',
    date: '2026-10-28',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-teen-1',
    userName: 'Aryan Malhotra',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Drop shoulder silhouette is pure fire. Acid wash gives it that genuine vintage aesthetic. Must have for college fits.',
    date: '2026-11-02',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    productId: 'prod-snr-1',
    userName: 'Brigadier (Retd.) K. Verma',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Extremely thoughtful garment for seniors. The cotton is feather-soft and does not chafe at all. The easy buttons make getting dressed painless.',
    date: '2026-10-30',
    verifiedPurchase: true
  },
  {
    id: 'rev-6',
    productId: 'prod-baby-1',
    userName: 'Pooja Agarwal',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'The organic ribbed fabric is so gentle on my 4-month-old baby’s skin. Snap buttons are sturdy and easy to use during midnight changes.',
    date: '2026-11-08',
    verifiedPurchase: true
  }
];
