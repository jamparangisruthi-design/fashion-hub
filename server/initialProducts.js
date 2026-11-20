export const initialProducts = [
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
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80'
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
      { name: 'Sage Green', hex: '#879b88' }
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
      { name: 'Vintage Olive', hex: '#556b2f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
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
      { name: 'Soft French Beige', hex: '#d9cdbe' }
    ],
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80'
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
  }
];

