import { PersonaProductItem } from '../../types';

export const HER_PRODUCTS: PersonaProductItem[] = [
  // Stems & Bouquets
  {
    id: 'her-prod-1',
    title: 'French Pink Tulips (Bunch of 5)',
    category: 'Stems & Botanical Bouquets',
    imageKey: 'flower-tulips',
    description: 'Crisp, graceful pink tulips wrapped in recycled craft paper with raffia ribbon. Understated, fresh, and modern.',
    tags: ['Flowers', 'Tulips', 'Fresh', 'Botanical'],
    price: '₹349',
    priceNumeric: 349,
    budgetTier: 'under-500',
    personCompatibility: 'HER',
    intent: 'I know what she likes',
    whySpecial: 'Tulips represent quiet affection and bring fresh spring air into any room.',
    brand: 'Little Things Florals'
  },
  {
    id: 'her-prod-2',
    title: 'The Peony & Baby’s Breath Cloud',
    category: 'Stems & Botanical Bouquets',
    imageKey: 'flower-peonies',
    description: 'Blush open peonies surrounded by airy baby’s breath gypsophila. Feels like holding a cloud.',
    tags: ['Bouquet', 'Peonies', 'Delicate', 'Romantic'],
    price: '₹799',
    priceNumeric: 799,
    budgetTier: 'under-1000',
    personCompatibility: 'HER',
    intent: 'You deserve something nice',
    whySpecial: 'Peonies bloom fully over 3–4 days, giving her the joy of watching them unfold every morning.',
    brand: 'Little Things Florals'
  },
  {
    id: 'her-prod-3',
    title: 'Sunny Morning Daisies Bunch',
    category: 'Stems & Botanical Bouquets',
    imageKey: 'flower-daisies',
    description: 'Cheerful white and yellow daisies. Unpretentious, sincere, and guaranteed to lift any gloomy afternoon.',
    tags: ['Daisies', 'Carefree', 'Casual'],
    price: '₹220',
    priceNumeric: 220,
    budgetTier: 'under-300',
    personCompatibility: 'HER',
    intent: 'This made me think of you',
    whySpecial: 'Feels like wildflowers picked on a spontaneous Sunday walk.',
    brand: 'Little Things Florals'
  },

  // Jewellery & Accessories
  {
    id: 'her-prod-4',
    title: 'Dainty Gold Solitaire Pendant Necklace',
    category: 'Dainty Jewellery & Trinkets',
    imageKey: 'dainty-gold-necklace',
    description: '18k gold-plated hypoallergenic stainless steel chain with a micro zircon crystal. Water-resistant and perfect for everyday wear.',
    tags: ['Jewellery', 'Gold', 'Everyday', 'Minimal'],
    price: '₹890',
    priceNumeric: 890,
    budgetTier: 'under-1000',
    personCompatibility: 'HER',
    intent: 'You deserve something nice',
    whySpecial: 'So delicate that she never needs to take it off, even in the shower or during workouts.',
    brand: 'Aurelia Minimal'
  },
  {
    id: 'her-prod-5',
    title: 'Natural Baroque Pearl Drop Studs',
    category: 'Dainty Jewellery & Trinkets',
    imageKey: 'pearl-earrings',
    description: 'Irregular genuine freshwater baroque pearls mounted on sterling silver posts. Each pearl is organic and unique.',
    tags: ['Jewellery', 'Pearls', 'Classic', 'Elegant'],
    price: '₹650',
    priceNumeric: 650,
    budgetTier: 'under-1000',
    personCompatibility: 'HER',
    intent: 'I remembered that thing you wanted',
    whySpecial: 'Pearls look equally stunning with a casual linen shirt or evening wear.',
    brand: 'Aurelia Minimal'
  },
  {
    id: 'her-prod-6',
    title: 'Blush Mulberry Silk Hair Scarf',
    category: 'Dainty Jewellery & Trinkets',
    imageKey: 'silk-hair-scarf',
    description: '100% pure 19-momme silk scarf with delicate botanical sketch print. Can be tied in hair, on wrist, or around tote handle.',
    tags: ['Silk', 'Accessories', 'Fashion', 'Blush'],
    price: '₹480',
    priceNumeric: 480,
    budgetTier: 'under-500',
    personCompatibility: 'HER',
    intent: 'This made me think of you',
    whySpecial: 'Protects her hair from friction while adding an effortless vintage touch.',
    brand: 'Maison Soie'
  },

  // Quiet Reads & Journals
  {
    id: 'her-prod-7',
    title: 'Linen Cloth-Bound Hardback Journal',
    category: 'Quiet Reads & Journals',
    imageKey: 'linen-journal-pen',
    description: '120gsm unruled cream bamboo paper bound in oat-colored linen fabric with a ribbon placeholder and gold foil spine.',
    tags: ['Journal', 'Stationery', 'Writing', 'Mindfulness'],
    price: '₹420',
    priceNumeric: 420,
    budgetTier: 'under-500',
    personCompatibility: 'HER',
    intent: 'I know what she likes',
    whySpecial: 'Thick bleed-proof paper designed for fountain pens, scrapbooking, and quiet midnight thoughts.',
    brand: 'Atelier Paper'
  },
  {
    id: 'her-prod-8',
    title: 'Poetry Collection: Words for Quiet Nights',
    category: 'Quiet Reads & Journals',
    imageKey: 'book-cozy-corner',
    description: 'A comforting paperback collection of modern poems on self-love, patience, and tenderness.',
    tags: ['Book', 'Poetry', 'Reading', 'Comfort'],
    price: '₹299',
    priceNumeric: 299,
    budgetTier: 'under-300',
    personCompatibility: 'HER',
    intent: 'Take care of yourself',
    whySpecial: 'Short, soothing pieces that can be read one page at a time before sleep.',
    brand: 'Penguin Classics'
  },

  // Bath & Soothing Self-Care
  {
    id: 'her-prod-9',
    title: 'Amber & Vanilla Wood-Wick Soy Candle',
    category: 'Bath & Soothing Self-Care',
    imageKey: 'scented-candle',
    description: 'Hand-poured 100% natural soy wax candle with a crackling wooden wick that sounds like a cozy mini fireplace.',
    tags: ['Candle', 'Fragrance', 'Self Care', 'Cozy'],
    price: '₹550',
    priceNumeric: 550,
    budgetTier: 'under-1000',
    personCompatibility: 'HER',
    intent: 'Take care of yourself',
    whySpecial: '40-hour burn time with a gentle, non-overpowering scent of warm vanilla, cashmere, and fig.',
    brand: 'Loom & Lather'
  },
  {
    id: 'her-prod-10',
    title: 'French Lavender & Shea Butter Hand Therapy',
    category: 'Bath & Soothing Self-Care',
    imageKey: 'hand-cream-balm',
    description: 'Velvety, fast-absorbing hand cream infused with organic Provence lavender essential oil and almond extract.',
    tags: ['Skincare', 'Hand Cream', 'Lavender', 'Pocket'],
    price: '₹280',
    priceNumeric: 280,
    budgetTier: 'under-300',
    personCompatibility: 'HER',
    intent: 'This made me think of you',
    whySpecial: 'Compact metal tube that slips easily into any handbag or desk drawer.',
    brand: 'Botanique Botanicals'
  },

  // Sweet Comfort & Treat Drops
  {
    id: 'her-prod-11',
    title: 'Ceremonial Uji Matcha Tin (30g)',
    category: 'Sweet Comfort & Treat Drops',
    imageKey: 'matcha-latte',
    description: 'First-harvest shade-grown green tea powder from Uji, Kyoto. Vibrant emerald color with naturally sweet umami note.',
    tags: ['Matcha', 'Tea', 'Morning Ritual', 'Gourmet'],
    price: '₹950',
    priceNumeric: 950,
    budgetTier: 'under-1000',
    personCompatibility: 'HER',
    intent: 'I remembered that thing you wanted',
    whySpecial: 'A morning ritual that gives focused calm without the coffee jitters.',
    brand: 'Tencha Kyoto'
  },
  {
    id: 'her-prod-12',
    title: 'Artisanal Almond Croissants (Box of 2)',
    category: 'Sweet Comfort & Treat Drops',
    imageKey: 'bakery-pastries',
    description: 'Freshly baked double-baked butter croissants generously filled with rich frangipane cream and toasted sliced almonds.',
    tags: ['Bakery', 'Pastry', 'Breakfast', 'Sweet'],
    price: '₹320',
    priceNumeric: 320,
    budgetTier: 'under-500',
    personCompatibility: 'HER',
    intent: 'This made me think of you',
    whySpecial: 'Warm them for 3 minutes in the oven and pair with tea for instant cafe bliss.',
    brand: 'Le Petit Four'
  }
];
