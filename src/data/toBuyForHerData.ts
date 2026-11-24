export interface BuyCategory {
  id: string;
  name: string;
  emoji: string;
  emotionalDesc: string;
  image: string;
  itemCount: number;
}

export interface SpecialCollection {
  id: string;
  title: string;
  subtitle: string;
  filterType: 'budget' | 'persona' | 'zero' | 'mentioned';
  filterValue: string;
  emoji: string;
}

export interface BuyProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  emotionalLine: string;
  image: string;
  price: number;
  priceDisplay: string;
  budgetRange: '0' | 'under_300' | '300_500' | '500_1000' | '1000_2000' | '2000_plus';
  vibes: string[];
  occasions: string[];
  tags: string[];
  whySheWouldLikeIt: string;
  featured?: boolean;
  isPersonalized?: boolean;
  sheMentionedOnce?: boolean;
  personaTags?: string[];
  affiliateUrl?: string;
}

export const BUY_CATEGORIES: BuyCategory[] = [
  {
    id: 'beauty-self-care',
    name: 'BEAUTY & SELF-CARE',
    emoji: '🌸',
    emotionalDesc: 'Because she deserves a little taking-care-of too.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85',
    itemCount: 16
  },
  {
    id: 'jewellery-accessories',
    name: 'JEWELLERY & ACCESSORIES',
    emoji: '💍',
    emotionalDesc: 'Tiny glittering pieces she will wear close to her heartbeat every day.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
    itemCount: 14
  },
  {
    id: 'fashion',
    name: 'FASHION',
    emoji: '👜',
    emotionalDesc: 'Editorial pieces and effortless silhouettes she can twirl in.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    itemCount: 12
  },
  {
    id: 'flowers-plants',
    name: 'FLOWERS & PLANTS',
    emoji: '🌷',
    emotionalDesc: 'Petals that speak the quiet feelings words never quite capture.',
    image: '/flowers/pink_tulip.jpg',
    itemCount: 20
  },
  {
    id: 'cute-little-things',
    name: 'CUTE LITTLE THINGS',
    emoji: '🎀',
    emotionalDesc: 'Small enough to be unnecessary. Cute enough to be worth it.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85',
    itemCount: 14
  },
  {
    id: 'books-stationery',
    name: 'BOOKS & STATIONERY',
    emoji: '📖',
    emotionalDesc: 'For paper hearts, margin notes, and stories she can lose herself inside.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85',
    itemCount: 12
  },
  {
    id: 'food-treats',
    name: 'FOOD & TREATS',
    emoji: '🍫',
    emotionalDesc: 'For the girl whose favorite snack you somehow remember better than your own.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=85',
    itemCount: 11
  },
  {
    id: 'cozy-room',
    name: 'COZY & ROOM',
    emoji: '🕯️',
    emotionalDesc: 'Warm candlelight and soft spaces where she can finally exhale.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85',
    itemCount: 13
  },
  {
    id: 'tech-gadgets',
    name: 'TECH & GADGETS',
    emoji: '🎧',
    emotionalDesc: 'Cute little companions for her playlist, late nights, and everyday flow.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85',
    itemCount: 10
  },
  {
    id: 'personalized-gifts',
    name: 'PERSONALIZED GIFTS',
    emoji: '🧸',
    emotionalDesc: 'Because her name somehow looks better when you put it on something.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85',
    itemCount: 15
  },
  {
    id: 'coffee-tea',
    name: 'COFFEE & TEA',
    emoji: '☕',
    emotionalDesc: 'Warm cups cupped in two hands while the morning wakes up slowly.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
    itemCount: 9
  },
  {
    id: 'creative-hobby',
    name: 'CREATIVE & HOBBY',
    emoji: '🎨',
    emotionalDesc: 'Quiet tools for the world she creates with her own hands.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85',
    itemCount: 10
  },
  {
    id: 'travel-everyday',
    name: 'TRAVEL & EVERYDAY',
    emoji: '🧳',
    emotionalDesc: 'Little essentials that go wherever her adventures carry her.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85',
    itemCount: 9
  },
  {
    id: 'romantic-gifts',
    name: 'ROMANTIC GIFTS',
    emoji: '💌',
    emotionalDesc: 'Keepsakes that say: you are the best part of every chapter.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=85',
    itemCount: 12
  },
  {
    id: 'birthday-gifts',
    name: 'BIRTHDAY GIFTS',
    emoji: '🎂',
    emotionalDesc: 'Curated treasures to make her special day feel entirely golden.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=85',
    itemCount: 11
  },
  {
    id: 'anniversary-gifts',
    name: 'ANNIVERSARY GIFTS',
    emoji: '💐',
    emotionalDesc: 'Celebrating the quiet, beautiful choice of loving her over and over.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=85',
    itemCount: 11
  }
];

export const SPECIAL_COLLECTIONS: SpecialCollection[] = [
  {
    id: 'under-300',
    title: 'UNDER ₹300',
    subtitle: 'Little things. Tiny budget.',
    filterType: 'budget',
    filterValue: 'under_300',
    emoji: '💸'
  },
  {
    id: 'under-500',
    title: 'UNDER ₹500',
    subtitle: 'Cute without going overboard.',
    filterType: 'budget',
    filterValue: '300_500',
    emoji: '💗'
  },
  {
    id: 'under-1000',
    title: 'UNDER ₹1,000',
    subtitle: 'A little more special.',
    filterType: 'budget',
    filterValue: '500_1000',
    emoji: '✨'
  },
  {
    id: 'under-2000',
    title: 'UNDER ₹2,000',
    subtitle: 'For when you want to make an occasion of it.',
    filterType: 'budget',
    filterValue: '1000_2000',
    emoji: '💐'
  },
  {
    id: 'zero-rupees',
    title: '₹0 GIFTS',
    subtitle: 'Nothing to buy. Something to do instead.',
    filterType: 'zero',
    filterValue: '0',
    emoji: '🤍'
  },
  {
    id: 'mentioned-once',
    title: 'SHE MENTIONED IT ONCE...',
    subtitle: 'For the things she casually mentioned that you actually remembered.',
    filterType: 'mentioned',
    filterValue: 'mentioned',
    emoji: '👀'
  },
  {
    id: 'soft-girl',
    title: 'FOR THE SOFT GIRL',
    subtitle: 'Pastels, gentle textures, unhurried mornings.',
    filterType: 'persona',
    filterValue: 'soft-girl',
    emoji: '🌷'
  },
  {
    id: 'cute-girl',
    title: 'FOR THE CUTE GIRL',
    subtitle: 'Plushies, ribbons, playful trinkets.',
    filterType: 'persona',
    filterValue: 'cute-girl',
    emoji: '🎀'
  },
  {
    id: 'night-owl',
    title: 'FOR THE NIGHT OWL',
    subtitle: 'Fairy lights, stargazing journals, midnight tea.',
    filterType: 'persona',
    filterValue: 'night-owl',
    emoji: '🌙'
  },
  {
    id: 'book-girl',
    title: 'FOR THE BOOK GIRL',
    subtitle: 'Paperbacks, book sleeves, vintage reading bookmarks.',
    filterType: 'persona',
    filterValue: 'book-girl',
    emoji: '📖'
  },
  {
    id: 'coffee-girl',
    title: 'FOR THE COFFEE GIRL',
    subtitle: 'Artisanal roasts, handmade ceramic mugs, morning rituals.',
    filterType: 'persona',
    filterValue: 'coffee-girl',
    emoji: '☕'
  },
  {
    id: 'creative-girl',
    title: 'FOR THE CREATIVE GIRL',
    subtitle: 'Sketchbooks, watercolors, thoughtful scrapbooking.',
    filterType: 'persona',
    filterValue: 'creative-girl',
    emoji: '🎨'
  },
  {
    id: 'girly-girl',
    title: 'FOR THE GIRLY GIRL',
    subtitle: 'Lip oils, satin hair bows, vanity trinkets.',
    filterType: 'persona',
    filterValue: 'girly-girl',
    emoji: '💅'
  },
  {
    id: 'minimal-girl',
    title: 'FOR THE MINIMAL GIRL',
    subtitle: 'Clean lines, timeless metals, clutter-free elegance.',
    filterType: 'persona',
    filterValue: 'minimal-girl',
    emoji: '🖤'
  }
];

export const BUY_PRODUCTS: BuyProduct[] = [
  // 1. BEAUTY & SELF-CARE
  {
    id: 'buy-beauty-perfume-1',
    name: 'A Soft Floral Eau De Parfum',
    category: 'beauty-self-care',
    subcategory: 'Perfume',
    description: 'A delicate French fragrance blending white tea, wild peony petals, and subtle cashmere cedar.',
    emotionalLine: '“For the girl whose presence stays in the room even after she leaves.”',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    price: 899,
    priceDisplay: '₹899',
    budgetRange: '500_1000',
    vibes: ['Elegant', 'Romantic', 'Soft'],
    occasions: ['Birthday', 'Anniversary', 'First Date'],
    tags: ['Perfume', 'Floral', 'Luxury', 'Vanity'],
    whySheWouldLikeIt: 'She appreciates subtle signature scents that feel personal and memorable rather than overpowering.',
    featured: true,
    sheMentionedOnce: true,
    personaTags: ['soft-girl', 'girly-girl']
  },
  {
    id: 'buy-beauty-bodymist-1',
    name: 'Sweet Vanilla Amber Body Mist',
    category: 'beauty-self-care',
    subcategory: 'Body mist',
    description: 'Light, airy everyday mist scented with warm Madagascar vanilla and crushed peach blossom.',
    emotionalLine: '“Like a warm sweater you spray on right before running out the door.”',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
    price: 349,
    priceDisplay: '₹349',
    budgetRange: '300_500',
    vibes: ['Cute', 'Cozy', 'Playful'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Body Mist', 'Vanilla', 'Sweet'],
    whySheWouldLikeIt: 'Easy to toss into her college or work bag for a quick fragrant lift between errands.',
    personaTags: ['cute-girl', 'girly-girl']
  },
  {
    id: 'buy-beauty-lipgloss-1',
    name: 'Hydrating Glass Lip Oil & Gloss',
    category: 'beauty-self-care',
    subcategory: 'Lip gloss',
    description: 'Non-sticky peptide lip oil that leaves a dewy rose-tinted shine and nourishes dry lips all day.',
    emotionalLine: '“For that soft, glossy smile that instantly brightens up your whole week.”',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=85',
    price: 399,
    priceDisplay: '₹399',
    budgetRange: '300_500',
    vibes: ['Cute', 'Soft', 'Trendy'],
    occasions: ['Just Because', 'First Date'],
    tags: ['Lip Oil', 'Makeup', 'Glow'],
    whySheWouldLikeIt: 'Universally flattering shade with zero sticky feel that she can reapply without a mirror.',
    personaTags: ['girly-girl', 'soft-girl']
  },
  {
    id: 'buy-beauty-lipbalm-1',
    name: 'Honey & Shea Tinted Butter Balm',
    category: 'beauty-self-care',
    subcategory: 'Lip balm',
    description: 'Pocket-sized restorative butter balm enriched with organic raw honey and wild strawberry butter.',
    emotionalLine: '“Something tiny you slip into her coat pocket on a cold afternoon.”',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    price: 249,
    priceDisplay: '₹249',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Cozy', 'Minimal'],
    occasions: ['Just Because', 'Bad Day'],
    tags: ['Lip Balm', 'Pocket', 'Everyday'],
    whySheWouldLikeIt: 'Ultra-thoughtful everyday essential that proves you notice when the weather turns brisk.',
    personaTags: ['minimal-girl', 'soft-girl']
  },
  {
    id: 'buy-beauty-skincare-1',
    name: 'Botanical Rosewater Overnight Reset Kit',
    category: 'beauty-self-care',
    subcategory: 'Skincare set',
    description: 'Three-step gentle sleep ritual with pure Damascus rosewater toner, squalane serum, and silk eye mask.',
    emotionalLine: '“Because she carries so much during the day, she deserves an unhurried night.”',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
    price: 949,
    priceDisplay: '₹949',
    budgetRange: '500_1000',
    vibes: ['Soft', 'Luxury', 'Cozy'],
    occasions: ['Birthday', 'Bad Day', 'Valentine\'s Day'],
    tags: ['Skincare', 'Spa', 'Rosewater'],
    whySheWouldLikeIt: 'Turn an ordinary stressful weekday evening into a peaceful personal sanctuary.',
    sheMentionedOnce: true,
    personaTags: ['soft-girl', 'night-owl']
  },
  {
    id: 'buy-beauty-facemasks-1',
    name: 'Korean Hyaluronic Sheet Mask Wardrobe',
    category: 'beauty-self-care',
    subcategory: 'Face masks',
    description: 'Set of 5 ultra-hydrating biocellulose sheet masks infused with centella, rice water, and green tea.',
    emotionalLine: '“For a quiet Sunday afternoon with iced tea and no alarms.”',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Cute', 'Cozy', 'Trendy'],
    occasions: ['Just Because', 'Bad Day'],
    tags: ['Sheet Mask', 'Hydration', 'Self-care'],
    whySheWouldLikeIt: 'She loves low-effort self-care rituals while watching her favorite comfort series.',
    personaTags: ['soft-girl', 'night-owl']
  },
  {
    id: 'buy-beauty-hairset-1',
    name: 'Golden Rosemary & Argan Scalp Elixir',
    category: 'beauty-self-care',
    subcategory: 'Hair-care set',
    description: 'Nourishing cold-pressed scalp treatment with rosemary oil and a scalp massage comb.',
    emotionalLine: '“For the girl whose hair always catches the afternoon sunlight.”',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=85',
    price: 649,
    priceDisplay: '₹649',
    budgetRange: '500_1000',
    vibes: ['Soft', 'Minimal', 'Luxury'],
    occasions: ['Birthday', 'Just Because'],
    tags: ['Hair Oil', 'Wellness', 'Aromatherapy'],
    whySheWouldLikeIt: 'Scalp oiling has become her favorite Sunday reset ritual.',
    personaTags: ['soft-girl', 'minimal-girl']
  },
  {
    id: 'buy-beauty-bath-1',
    name: 'Lavender Chamomile Mineral Soak Set',
    category: 'beauty-self-care',
    subcategory: 'Bath & body set',
    description: 'Dead sea mineral salts blended with dried French lavender buds, oat milk powder, and jojoba drops.',
    emotionalLine: '“An invitation to turn off her notifications and rest completely.”',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    price: 799,
    priceDisplay: '₹799',
    budgetRange: '500_1000',
    vibes: ['Cozy', 'Romantic', 'Soft'],
    occasions: ['Bad Day', 'Anniversary'],
    tags: ['Bath Salt', 'Lavender', 'Relaxation'],
    whySheWouldLikeIt: 'Ideal for soothing muscles and calming a restless mind after hectic work weeks.',
    personaTags: ['night-owl', 'soft-girl']
  },
  {
    id: 'buy-beauty-pouch-1',
    name: 'Quilted Floral Cotton Makeup Pouch',
    category: 'beauty-self-care',
    subcategory: 'Makeup pouch',
    description: 'Vintage floral block-print cotton pouch with gold zipper and water-resistant silk lining.',
    emotionalLine: '“Prettier than whatever bag she is currently digging her lipsticks out of.”',
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=85',
    price: 399,
    priceDisplay: '₹399',
    budgetRange: '300_500',
    vibes: ['Cute', 'Soft', 'Romantic'],
    occasions: ['Just Because', 'Birthday'],
    tags: ['Pouch', 'Floral', 'Organizer'],
    whySheWouldLikeIt: 'She loves vintage cottagecore aesthetics and tidy handbag compartments.',
    personaTags: ['soft-girl', 'girly-girl']
  },
  {
    id: 'buy-beauty-brushes-1',
    name: 'Pastel Travel Brush Essentials in Metal Tin',
    category: 'beauty-self-care',
    subcategory: 'Makeup brushes',
    description: 'Super-soft vegan micro-bristle brushes for powders, blush, and blending in a blush metal canister.',
    emotionalLine: '“Soft bristles that feel like velvet against her cheeks.”',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
    price: 599,
    priceDisplay: '₹599',
    budgetRange: '500_1000',
    vibes: ['Cute', 'Elegant', 'Trendy'],
    occasions: ['Birthday', 'Celebration'],
    tags: ['Brushes', 'Beauty', 'Travel'],
    whySheWouldLikeIt: 'Compact size protects bristles in her purse during travel or weekend getaways.',
    personaTags: ['girly-girl']
  },
  {
    id: 'buy-beauty-satin-scrunchies-1',
    name: 'Pure Mulberry Silk Hair Scrunchies (Pack of 3)',
    category: 'beauty-self-care',
    subcategory: 'Satin scrunchies',
    description: 'Grade 6A mulberry silk scrunchies that prevent hair breakage and creasing while sleeping.',
    emotionalLine: '“For the girl whose wrist is never seen without a scrunchie anyway.”',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    price: 299,
    priceDisplay: '₹299',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Soft', 'Minimal'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Scrunchie', 'Silk', 'Hair'],
    whySheWouldLikeIt: 'Gentle on fine hair, feels luxurious, and looks adorable on her bedside table.',
    featured: true,
    personaTags: ['soft-girl', 'girly-girl', 'minimal-girl']
  },
  {
    id: 'buy-beauty-handcream-1',
    name: 'Verbena & Almond Velvet Hand Cream',
    category: 'beauty-self-care',
    subcategory: 'Hand cream',
    description: 'Fast-absorbing botanical hand lotion scented with fresh Provence verbena and sweet almond.',
    emotionalLine: '“Because holding her hand is still the best part of every walk.”',
    image: 'https://images.unsplash.com/photo-1608248597359-598d9e798993?auto=format&fit=crop&w=800&q=85',
    price: 280,
    priceDisplay: '₹280',
    budgetRange: 'under_300',
    vibes: ['Soft', 'Minimal', 'Romantic'],
    occasions: ['Just Because', 'Apology'],
    tags: ['Hand Cream', 'Skincare', 'Everyday'],
    whySheWouldLikeIt: 'Compact, non-greasy formula she will keep right beside her laptop desk.',
    personaTags: ['minimal-girl', 'soft-girl']
  },

  // 2. JEWELLERY & ACCESSORIES
  {
    id: 'buy-jewel-initial-1',
    name: 'Dainty Gold Initial Pendant Necklace',
    category: 'jewellery-accessories',
    subcategory: 'Initial necklace',
    description: 'Minimalist 18k gold-plated tiny coin necklace engraved with her first initial on a featherweight chain.',
    emotionalLine: '“Her initial resting softly right against her collarbone.”',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
    price: 749,
    priceDisplay: '₹749',
    budgetRange: '500_1000',
    vibes: ['Elegant', 'Romantic', 'Minimal'],
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day'],
    tags: ['Necklace', 'Initial', 'Gold', 'Personalized'],
    whySheWouldLikeIt: 'Simple enough to wear with every outfit, but intimate enough that she will never take it off.',
    featured: true,
    isPersonalized: true,
    personaTags: ['minimal-girl', 'soft-girl', 'girly-girl']
  },
  {
    id: 'buy-jewel-earrings-1',
    name: 'Pearlescent Teardrop Huggie Hoops',
    category: 'jewellery-accessories',
    subcategory: 'Hoop earrings',
    description: 'Small hypoallergenic gold hoops featuring tiny dangling baroque freshwater pearls.',
    emotionalLine: '“Catches the light whenever she tilts her head to laugh.”',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
    price: 649,
    priceDisplay: '₹649',
    budgetRange: '500_1000',
    vibes: ['Elegant', 'Soft', 'Minimal'],
    occasions: ['Anniversary', 'Celebration', 'First Date'],
    tags: ['Pearl', 'Hoops', 'Gold'],
    whySheWouldLikeIt: 'Freshwater pearls give a vintage, refined charm that complements both casual linen and evening dresses.',
    personaTags: ['soft-girl', 'minimal-girl']
  },
  {
    id: 'buy-jewel-bracelet-1',
    name: 'Delicate Starlight Charm Bracelet',
    category: 'jewellery-accessories',
    subcategory: 'Charm bracelet',
    description: 'Slender silver chain studded with miniature bezel-set cubic zirconia stars that glint gently.',
    emotionalLine: '“A constellation of tiny memories strung around her wrist.”',
    image: 'https://images.unsplash.com/photo-1611591475155-4286fa7c2e7f?auto=format&fit=crop&w=800&q=85',
    price: 899,
    priceDisplay: '₹899',
    budgetRange: '500_1000',
    vibes: ['Romantic', 'Cute', 'Playful'],
    occasions: ['Birthday', 'Anniversary'],
    tags: ['Bracelet', 'Silver', 'Star'],
    whySheWouldLikeIt: 'Adjustable clasp fits comfortably and stacks beautifully alongside her watch.',
    personaTags: ['girly-girl', 'night-owl']
  },
  {
    id: 'buy-jewel-rings-1',
    name: 'Handcrafted Twisted Stacking Rings (Set of 3)',
    category: 'jewellery-accessories',
    subcategory: 'Stackable rings',
    description: 'Three textured brass and silver bands with beaded, hammered, and rope rope twists.',
    emotionalLine: '“For hands that are always holding books, coffee, or yours.”',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Minimal', 'Cozy', 'Trendy'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Rings', 'Stackable', 'Handmade'],
    whySheWouldLikeIt: 'Versatile bands she can distribute across fingers or stack on one statement finger.',
    personaTags: ['minimal-girl', 'book-girl']
  },
  {
    id: 'buy-jewel-box-1',
    name: 'Velvet Travel Jewelry Case with Mirror',
    category: 'jewellery-accessories',
    subcategory: 'Jewelry box',
    description: 'Dusty rose compact velvet organizer with ring rolls, earring dividers, and necklace hooks.',
    emotionalLine: '“To keep all her beloved little sparkle safe from tangles.”',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=85',
    price: 599,
    priceDisplay: '₹599',
    budgetRange: '500_1000',
    vibes: ['Cute', 'Luxury', 'Soft'],
    occasions: ['Birthday', 'Long Distance'],
    tags: ['Jewelry Box', 'Velvet', 'Travel'],
    whySheWouldLikeIt: 'She travels often and hates when necklaces knot inside cosmetic bags.',
    personaTags: ['girly-girl', 'soft-girl']
  },

  // 3. FASHION
  {
    id: 'buy-fashion-bag-1',
    name: 'Minimalist Vegan Leather Baguette Shoulder Bag',
    category: 'fashion',
    subcategory: 'Sling bags',
    description: 'Curved saddle bag in butter-cream faux leather with magnetic closure and clean gold hardware.',
    emotionalLine: '“Effortless 90s editorial elegance she can pair with everything.”',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85',
    price: 1299,
    priceDisplay: '₹1,299',
    budgetRange: '1000_2000',
    vibes: ['Elegant', 'Minimal', 'Trendy'],
    occasions: ['Birthday', 'Anniversary'],
    tags: ['Bag', 'Leather', 'Editorial'],
    whySheWouldLikeIt: 'The silhouette is timeless, roomy enough for phone, lip balm, and keys without looking bulky.',
    featured: true,
    sheMentionedOnce: true,
    personaTags: ['minimal-girl', 'soft-girl']
  },
  {
    id: 'buy-fashion-tote-1',
    name: 'Heavyweight Canvas French Bookstore Tote',
    category: 'fashion',
    subcategory: 'Tote bags',
    description: 'Sturdy natural unbleached cotton canvas with deep inner zipper pocket and typography print.',
    emotionalLine: '“For farmers market stems, paperbacks, and spontaneous strolls.”',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
    price: 449,
    priceDisplay: '₹449',
    budgetRange: '300_500',
    vibes: ['Cozy', 'Minimal', 'Playful'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Tote Bag', 'Canvas', 'Books'],
    whySheWouldLikeIt: 'Reinforced shoulder straps make it comfortable even when she packs three heavy books.',
    personaTags: ['book-girl', 'coffee-girl']
  },
  {
    id: 'buy-fashion-scarf-1',
    name: 'Printed Silk Satin Hair & Neck Scarf',
    category: 'fashion',
    subcategory: 'Scarves',
    description: 'Vintage botanical print scarf in sage green and cream for styling in hair, on bag handles, or neck.',
    emotionalLine: '“Like a tiny piece of Parisian cinema she can wear on breezy mornings.”',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=85',
    price: 399,
    priceDisplay: '₹399',
    budgetRange: '300_500',
    vibes: ['Romantic', 'Elegant', 'Soft'],
    occasions: ['Just Because', 'Birthday'],
    tags: ['Scarf', 'Silk', 'Hair'],
    whySheWouldLikeIt: 'She loves vintage accessories that add a pop of poetic flair to simple plain tees.',
    personaTags: ['soft-girl', 'girly-girl']
  },
  {
    id: 'buy-fashion-socks-1',
    name: 'Ruffled Lettuce-Edge Cotton Socks (Set of 3)',
    category: 'fashion',
    subcategory: 'Cute socks',
    description: 'Soft breathable ribbed cotton socks featuring dainty ruffled cuffs in white, cream, and oat.',
    emotionalLine: '“Small enough to be unnecessary. Cute enough to make sneakers look like art.”',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=85',
    price: 289,
    priceDisplay: '₹289',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Cozy', 'Playful'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Socks', 'Ruffled', 'Cotton'],
    whySheWouldLikeIt: 'Pairs adorably with loafers, Mary Janes, or sneakers for a sweet everyday aesthetic.',
    personaTags: ['cute-girl', 'soft-girl']
  },

  // 4. FLOWERS & PLANTS (All with verified botanical assets)
  {
    id: 'buy-flower-pink-tulip',
    name: 'Fresh Pink Tulip Bundle',
    category: 'flowers-plants',
    subcategory: 'Pink tulips',
    description: 'Fresh stems of blush pink tulips wrapped in rustic brown kraft paper with natural jute cord.',
    emotionalLine: '“For the girl who makes ordinary days feel pretty.”',
    image: '/flowers/pink_tulip.jpg',
    price: 699,
    priceDisplay: '₹699',
    budgetRange: '500_1000',
    vibes: ['Soft', 'Romantic', 'Fresh'],
    occasions: ['Just Because', 'Valentine\'s Day', 'Anniversary'],
    tags: ['Tulip', 'Pink', 'Fresh Flowers'],
    whySheWouldLikeIt: 'Tulips continue growing toward the light inside the vase, bringing peaceful movement to her room.',
    featured: true,
    personaTags: ['soft-girl', 'girly-girl']
  },
  {
    id: 'buy-flower-daisy',
    name: 'English Chamomile Daisies',
    category: 'flowers-plants',
    subcategory: 'Daisies',
    description: 'Wholesome white chamomile daisies with golden center discs and fresh meadow greens.',
    emotionalLine: '“Pure simplicity, cheerful warmth, and uncluttered innocence.”',
    image: '/flowers/daisy.jpg',
    price: 349,
    priceDisplay: '₹349',
    budgetRange: '300_500',
    vibes: ['Cute', 'Playful', 'Soft'],
    occasions: ['Bad Day', 'Just Because'],
    tags: ['Daisy', 'Meadow', 'Simple'],
    whySheWouldLikeIt: 'Daisies feel sincere and humble — like flowers picked on a slow, sunny afternoon walk.',
    personaTags: ['soft-girl', 'cute-girl']
  },
  {
    id: 'buy-flower-white-rose',
    name: 'Heirloom White Garden Roses',
    category: 'flowers-plants',
    subcategory: 'White roses',
    description: 'Lush creamy white roses with velvety petals that unfold slowly into majestic saucer blooms.',
    emotionalLine: '“Timeless serenity, deep loyalty, and understated majesty.”',
    image: '/flowers/white_rose.jpg',
    price: 849,
    priceDisplay: '₹849',
    budgetRange: '500_1000',
    vibes: ['Elegant', 'Romantic', 'Minimal'],
    occasions: ['Anniversary', 'Apology', 'Birthday'],
    tags: ['Rose', 'White', 'Classic'],
    whySheWouldLikeIt: 'White roses represent pure devotion without the theatrical flashiness of loud colors.',
    personaTags: ['minimal-girl', 'soft-girl']
  },
  {
    id: 'buy-flower-sunflower',
    name: 'Golden Sunflowers Bouquet',
    category: 'flowers-plants',
    subcategory: 'Sunflowers',
    description: 'Golden radiant sunflowers paired with wild eucalyptus sprigs and yellow button buds.',
    emotionalLine: '“For the girl who brings sunshine with her wherever she walks.”',
    image: '/flowers/sunflower.jpg',
    price: 549,
    priceDisplay: '₹549',
    budgetRange: '500_1000',
    vibes: ['Playful', 'Cozy', 'Trendy'],
    occasions: ['Bad Day', 'Celebration', 'Birthday'],
    tags: ['Sunflower', 'Golden', 'Cheer'],
    whySheWouldLikeIt: 'Impossible to look at without smiling; instantly warms up any desk or windowsill.',
    personaTags: ['cute-girl', 'coffee-girl']
  },
  {
    id: 'buy-flower-baby-breath',
    name: 'Ethereal Baby\'s Breath Cloud',
    category: 'flowers-plants',
    subcategory: 'Baby\'s Breath',
    description: 'A generous, airy cloud of delicate Gypsophila tied with a sheer ivory silk ribbon.',
    emotionalLine: '“Tiny constellations of quiet affection that last for weeks.”',
    image: '/flowers/baby_breath.jpg',
    price: 399,
    priceDisplay: '₹399',
    budgetRange: '300_500',
    vibes: ['Soft', 'Romantic', 'Minimal'],
    occasions: ['Just Because', 'Valentine\'s Day'],
    tags: ['Gypsophila', 'Cloud', 'Everlasting'],
    whySheWouldLikeIt: 'Dries into a permanent ornamental cloud she can keep in a vase indefinitely.',
    featured: true,
    personaTags: ['soft-girl', 'minimal-girl']
  },
  {
    id: 'buy-flower-hydrangea',
    name: 'Lush Pastel Blue Hydrangea Stem',
    category: 'flowers-plants',
    subcategory: 'Hydrangeas',
    description: 'Huge rounded mophead hydrangea bloom in gentle periwinkle blue and lavender shades.',
    emotionalLine: '“Heartfelt gratitude, abundance, and emotional understanding.”',
    image: '/flowers/hydrangea.jpg',
    price: 599,
    priceDisplay: '₹599',
    budgetRange: '500_1000',
    vibes: ['Soft', 'Luxury', 'Romantic'],
    occasions: ['Apology', 'Anniversary', 'Birthday'],
    tags: ['Hydrangea', 'Blue', 'Luxury'],
    whySheWouldLikeIt: 'A single magnificent stem fills an entire centerpiece with romantic volume.',
    personaTags: ['soft-girl']
  },
  {
    id: 'buy-flower-peony',
    name: 'Blushing Coral Charm Peonies',
    category: 'flowers-plants',
    subcategory: 'Peonies',
    description: 'Rich ruffled pink peonies that open layer by layer into luxurious, fragrant clouds.',
    emotionalLine: '“Because she deserves something as rich and lovely as her heart.”',
    image: '/flowers/peony.jpg',
    price: 1199,
    priceDisplay: '₹1,199',
    budgetRange: '1000_2000',
    vibes: ['Luxury', 'Romantic', 'Elegant'],
    occasions: ['Anniversary', 'Birthday', 'Valentine\'s Day'],
    tags: ['Peony', 'Pink', 'Luxury Flowers'],
    whySheWouldLikeIt: 'Her all-time dream flower that feels straight out of a high-fashion editorial portrait.',
    sheMentionedOnce: true,
    personaTags: ['girly-girl', 'soft-girl']
  },
  {
    id: 'buy-flower-lavender',
    name: 'French Dried Lavender Posy',
    category: 'flowers-plants',
    subcategory: 'Lavender',
    description: 'Scented purple English lavender stems gathered with natural twine and a handwritten tag.',
    emotionalLine: '“Tranquility, devotion, calm dreams, and emotional protection.”',
    image: '/flowers/lavender.jpg',
    price: 320,
    priceDisplay: '₹320',
    budgetRange: '300_500',
    vibes: ['Cozy', 'Minimal', 'Romantic'],
    occasions: ['Bad Day', 'Just Because'],
    tags: ['Lavender', 'Fragrant', 'Dried Flowers'],
    whySheWouldLikeIt: 'Calming aromatherapy fragrance rests beside her pillow for deep, restful sleep.',
    personaTags: ['night-owl', 'book-girl']
  },

  // 5. CUTE LITTLE THINGS
  {
    id: 'buy-cute-plushie-1',
    name: 'Sleepy Soft Jellycat Bunny Plushie',
    category: 'cute-little-things',
    subcategory: 'Plushies',
    description: 'Cloud-soft plush rabbit with floppy ears and gentle sleepy embroidery that she can hug tightly.',
    emotionalLine: '“Something soft to hold whenever you aren\'t there in person.”',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85',
    price: 699,
    priceDisplay: '₹699',
    budgetRange: '500_1000',
    vibes: ['Cute', 'Cozy', 'Playful'],
    occasions: ['Birthday', 'Long Distance', 'Bad Day'],
    tags: ['Plushie', 'Bunny', 'Soft Toy'],
    whySheWouldLikeIt: 'Irresistibly huggable; sits proudly in the center of her pillows every morning.',
    featured: true,
    personaTags: ['cute-girl', 'soft-girl']
  },
  {
    id: 'buy-cute-keychain-1',
    name: 'Enamel Daisy & Initial Charm Keychain',
    category: 'cute-little-things',
    subcategory: 'Keychains',
    description: 'Polished gold-tone key ring with pastel enamel blossom and heart clip.',
    emotionalLine: '“A tiny sparkle she carries in her palm everywhere she goes.”',
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=800&q=85',
    price: 199,
    priceDisplay: '₹199',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Playful', 'Minimal'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Keychain', 'Charm', 'Enamel'],
    whySheWouldLikeIt: 'Makes finding her keys in the depths of her tote bag instant and charming.',
    personaTags: ['cute-girl', 'girly-girl']
  },
  {
    id: 'buy-cute-mirror-1',
    name: 'Engraved Floral Vintage Compact Mirror',
    category: 'cute-little-things',
    subcategory: 'Compact mirrors',
    description: 'Double-sided brass pocket mirror with normal and 2x magnification in a velvet pouch.',
    emotionalLine: '“So she can be reminded of how pretty she is throughout the day.”',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=85',
    price: 349,
    priceDisplay: '₹349',
    budgetRange: '300_500',
    vibes: ['Romantic', 'Vintage', 'Cute'],
    occasions: ['Just Because', 'Birthday'],
    tags: ['Mirror', 'Vintage', 'Pocket'],
    whySheWouldLikeIt: 'Satisfying snap closure and heirloom look make everyday touch-ups feel glamorous.',
    personaTags: ['girly-girl', 'soft-girl']
  },
  {
    id: 'buy-cute-lamp-1',
    name: 'Soft Glow Silicone Toast Night Lamp',
    category: 'cute-little-things',
    subcategory: 'Mini lamps',
    description: 'Rechargeable squishy silicone bread-slice lamp with warm dimmable light and phone-stand feet.',
    emotionalLine: '“A cute glowing friend to keep her desk cheerful while studying late.”',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Cute', 'Playful', 'Cozy'],
    occasions: ['Birthday', 'Just Because'],
    tags: ['Night Lamp', 'Silicone', 'Desk'],
    whySheWouldLikeIt: 'Tap it gently to cycle brightness; the feet hold her phone while watching reels in bed.',
    sheMentionedOnce: true,
    personaTags: ['cute-girl', 'night-owl']
  },

  // 6. BOOKS & STATIONERY
  {
    id: 'buy-book-poetry-1',
    name: 'Clothbound Romantic Poetry Collection',
    category: 'books-stationery',
    subcategory: 'Poetry books',
    description: 'Gold-foil debossed clothbound anthology of timeless love sonnets and quiet modern verse.',
    emotionalLine: '“For the verses you wish you were skilled enough to write for her yourself.”',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Romantic', 'Cozy', 'Elegant'],
    occasions: ['Anniversary', 'Valentine\'s Day', 'Just Because'],
    tags: ['Poetry', 'Book', 'Clothbound'],
    whySheWouldLikeIt: 'Bookmark a specific poem on page 42 with a personal sticky note before handing it to her.',
    featured: true,
    personaTags: ['book-girl', 'soft-girl']
  },
  {
    id: 'buy-book-journal-1',
    name: 'Linen Bound Hardcover Guided Journal',
    category: 'books-stationery',
    subcategory: 'Journals',
    description: 'Thick 120gsm bleed-proof ivory paper with ribbon marker and gentle reflective prompts.',
    emotionalLine: '“A safe space for her thoughts, secret dreams, and midnight observations.”',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=85',
    price: 549,
    priceDisplay: '₹549',
    budgetRange: '500_1000',
    vibes: ['Minimal', 'Cozy', 'Soft'],
    occasions: ['New Year', 'Birthday', 'Just Because'],
    tags: ['Journal', 'Linen', 'Stationery'],
    whySheWouldLikeIt: 'Lays completely flat when opened, perfect for cozy morning reflections with tea.',
    personaTags: ['book-girl', 'creative-girl', 'minimal-girl']
  },
  {
    id: 'buy-book-bookmark-1',
    name: 'Pressed Daisy Brass Metal Bookmark',
    category: 'books-stationery',
    subcategory: 'Bookmarks',
    description: 'Delicate hollow filigree metal bookmark featuring a real encased dried yellow daisy blossom.',
    emotionalLine: '“To keep her place in stories she never wants to end.”',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=85',
    price: 189,
    priceDisplay: '₹189',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Romantic', 'Minimal'],
    occasions: ['Just Because', 'Celebration'],
    tags: ['Bookmark', 'Brass', 'Daisy'],
    whySheWouldLikeIt: 'Thin enough not to warp book spines; glimmers beautifully from between novel pages.',
    personaTags: ['book-girl', 'soft-girl']
  },
  {
    id: 'buy-book-pen-1',
    name: 'Vintage Pastel Fountain Pen with Glass Ink Vial',
    category: 'books-stationery',
    subcategory: 'Fountain pens',
    description: 'Smooth medium nib fountain pen in retro mint pastel with sepia ink bottle.',
    emotionalLine: '“For handwriting that turns grocery lists into poetic correspondence.”',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=85',
    price: 699,
    priceDisplay: '₹699',
    budgetRange: '500_1000',
    vibes: ['Vintage', 'Elegant', 'Cozy'],
    occasions: ['Birthday', 'Celebration'],
    tags: ['Pen', 'Fountain Pen', 'Writing'],
    whySheWouldLikeIt: 'The tactile feeling of ink flowing onto paper makes journaling genuinely therapeutic.',
    personaTags: ['book-girl', 'creative-girl']
  },

  // 7. FOOD & TREATS
  {
    id: 'buy-food-choc-1',
    name: 'Artisanal Sea Salt Caramel Truffle Box',
    category: 'food-treats',
    subcategory: 'Chocolates',
    description: 'Handmade Belgian dark chocolate shells filled with slow-cooked Fleur de Sel caramel.',
    emotionalLine: '“For the girl whose chocolate cravings must be met with absolute devotion.”',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=85',
    price: 549,
    priceDisplay: '₹549',
    budgetRange: '500_1000',
    vibes: ['Luxury', 'Romantic', 'Playful'],
    occasions: ['Valentine\'s Day', 'Anniversary', 'Bad Day'],
    tags: ['Chocolates', 'Truffles', 'Caramel'],
    whySheWouldLikeIt: 'Rich, melt-in-the-mouth texture that pairs heavenly with late evening coffee.',
    featured: true,
    sheMentionedOnce: true,
    personaTags: ['girly-girl', 'soft-girl']
  },
  {
    id: 'buy-food-macaron-1',
    name: 'French Pastel Macarons Gift Hamper',
    category: 'food-treats',
    subcategory: 'Cookies',
    description: 'Six delicate almond flour macarons in rose lychee, salted pistachio, and vanilla lavender.',
    emotionalLine: '“Crisp little sugar shells that taste like a Sunday morning in Paris.”',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Cute', 'Luxury', 'Romantic'],
    occasions: ['Birthday', 'Celebration', 'First Date'],
    tags: ['Macaron', 'French', 'Pastel'],
    whySheWouldLikeIt: 'Aesthetic pastel colors look gorgeous before you even take the first bite.',
    personaTags: ['girly-girl', 'soft-girl']
  },
  {
    id: 'buy-food-cocoa-1',
    name: 'Belgian Spiced Hot Chocolate Melts with Marshmallows',
    category: 'food-treats',
    subcategory: 'Hot chocolate',
    description: 'Solid artisan chocolate spheres that melt in hot milk into thick European sipping chocolate.',
    emotionalLine: '“Warm mugs to wrap both hands around during stormy rainy nights.”',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=85',
    price: 349,
    priceDisplay: '₹349',
    budgetRange: '300_500',
    vibes: ['Cozy', 'Cute', 'Playful'],
    occasions: ['Bad Day', 'Just Because'],
    tags: ['Hot Chocolate', 'Marshmallows', 'Cozy'],
    whySheWouldLikeIt: 'Watching the chocolate sphere burst into mini marshmallows in steaming milk is pure joy.',
    personaTags: ['night-owl', 'cute-girl']
  },

  // 8. COZY & ROOM
  {
    id: 'buy-cozy-candle-1',
    name: 'Soy Wax Amber Jar Candle (Warm Vanilla & Cashmere)',
    category: 'cozy-room',
    subcategory: 'Scented candles',
    description: 'Hand-poured 100% natural soy candle with a crackling wooden wick and amber apothecary glass.',
    emotionalLine: '“Turns her bedroom into an unhurried, warm sanctuary in seconds.”',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Cozy', 'Romantic', 'Soft'],
    occasions: ['Just Because', 'Birthday', 'Bad Day'],
    tags: ['Candle', 'Soy Wax', 'Wood Wick'],
    whySheWouldLikeIt: 'The soft crackle of the wood wick sounds like a miniature fireplace beside her bed.',
    featured: true,
    personaTags: ['night-owl', 'book-girl', 'soft-girl']
  },
  {
    id: 'buy-cozy-fairy-1',
    name: 'Warm Copper Wire Fairy Lights with Remote',
    category: 'cozy-room',
    subcategory: 'Fairy lights',
    description: '10 meters of warm amber fairy lights with multiple twinkle modes and gentle timer function.',
    emotionalLine: '“Because every girl looks like poetry under warm string lights.”',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=85',
    price: 299,
    priceDisplay: '₹299',
    budgetRange: 'under_300',
    vibes: ['Cozy', 'Romantic', 'Cute'],
    occasions: ['Just Because', 'Anniversary'],
    tags: ['Fairy Lights', 'Room Decor', 'Warm'],
    whySheWouldLikeIt: 'Drapes effortlessly across headboards, curtains, or polaroid photo walls.',
    personaTags: ['night-owl', 'cute-girl']
  },
  {
    id: 'buy-cozy-blanket-1',
    name: 'Ultra-Plush Fluffy Sherpa Throw Blanket',
    category: 'cozy-room',
    subcategory: 'Throw blankets',
    description: 'Featherlight cloud-knit blanket in oat beige that feels like a warm embrace on movie night.',
    emotionalLine: '“For movie nights where she inevitably falls asleep before the ending.”',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85',
    price: 1199,
    priceDisplay: '₹1,199',
    budgetRange: '1000_2000',
    vibes: ['Cozy', 'Soft', 'Luxury'],
    occasions: ['Birthday', 'Anniversary'],
    tags: ['Blanket', 'Sherpa', 'Movie Night'],
    whySheWouldLikeIt: 'Insanely soft texture that doesn\'t shed or pill after washing.',
    sheMentionedOnce: true,
    personaTags: ['cozy-girl', 'soft-girl', 'night-owl']
  },

  // 9. TECH & GADGETS
  {
    id: 'buy-tech-earbuds-1',
    name: 'Pastel Lilac Noise-Isolating Wireless Earbuds',
    category: 'tech-gadgets',
    subcategory: 'Earbuds',
    description: 'Matte pastel compact earbuds with 28-hour playtime, crystal vocal clarity, and sleek pebble case.',
    emotionalLine: '“For the songs that make her think of you during train commutes.”',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85',
    price: 1599,
    priceDisplay: '₹1,599',
    budgetRange: '1000_2000',
    vibes: ['Trendy', 'Cute', 'Minimal'],
    occasions: ['Birthday', 'Long Distance'],
    tags: ['Earbuds', 'Wireless', 'Audio'],
    whySheWouldLikeIt: 'Lightweight ergonomic fit that doesn\'t hurt her ears even during 3-hour phone calls.',
    featured: true,
    personaTags: ['cute-girl', 'night-owl']
  },
  {
    id: 'buy-tech-speaker-1',
    name: 'Retro Vintage Mini Bluetooth Speaker',
    category: 'tech-gadgets',
    subcategory: 'Mini speakers',
    description: 'Pocket-sized speaker designed like a 1950s radio with gold knobs, deep bass, and 10hr battery.',
    emotionalLine: '“Playful retro tunes while she gets ready in front of the mirror.”',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=85',
    price: 999,
    priceDisplay: '₹999',
    budgetRange: '500_1000',
    vibes: ['Playful', 'Vintage', 'Cute'],
    occasions: ['Birthday', 'Celebration'],
    tags: ['Speaker', 'Retro', 'Music'],
    whySheWouldLikeIt: 'Doubles as an adorable vanity table decoration when not playing her favorite playlists.',
    sheMentionedOnce: true,
    personaTags: ['cute-girl', 'girly-girl']
  },

  // 10. PERSONALIZED GIFTS
  {
    id: 'buy-personal-starmap-1',
    name: 'Custom Night Sky Constellation Print',
    category: 'personalized-gifts',
    subcategory: 'Star map',
    description: 'High-resolution celestial chart charting the exact night sky over the city the day you two first met.',
    emotionalLine: '“Because on that exact date, under these exact stars, my whole world shifted.”',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=85',
    price: 899,
    priceDisplay: '₹899',
    budgetRange: '500_1000',
    vibes: ['Romantic', 'Minimal', 'Emotional'],
    occasions: ['Anniversary', 'Valentine\'s Day', 'Birthday'],
    tags: ['Star Map', 'Personalized', 'Framed'],
    whySheWouldLikeIt: 'A deeply personal visual artifact that will hang proudly above her bed forever.',
    featured: true,
    isPersonalized: true,
    personaTags: ['night-owl', 'soft-girl']
  },
  {
    id: 'buy-personal-photo-1',
    name: 'Curated Linen Keepsake Memory Box with Prints',
    category: 'personalized-gifts',
    subcategory: 'Memory box',
    description: 'Embossed oatmeal linen box containing 20 square matte photo prints and handwritten notes.',
    emotionalLine: '“Because our story is too precious to just leave trapped inside phone screens.”',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85',
    price: 999,
    priceDisplay: '₹999',
    budgetRange: '500_1000',
    vibes: ['Romantic', 'Emotional', 'Vintage'],
    occasions: ['Anniversary', 'Long Distance', 'Birthday'],
    tags: ['Photos', 'Memory Box', 'Handwritten'],
    whySheWouldLikeIt: 'She loves physical souvenirs she can hold, flip through, and smile over when she misses you.',
    isPersonalized: true,
    personaTags: ['soft-girl', 'book-girl']
  },
  {
    id: 'buy-personal-bracelet-1',
    name: 'Engraved Roman Coordinate Bar Bracelet',
    category: 'personalized-gifts',
    subcategory: 'Name bracelet',
    description: 'Slender gold bar bracelet custom laser-engraved with the latitude & longitude of where you met.',
    emotionalLine: '“A secret map around her wrist that only the two of you understand.”',
    image: 'https://images.unsplash.com/photo-1611591475155-4286fa7c2e7f?auto=format&fit=crop&w=800&q=85',
    price: 849,
    priceDisplay: '₹849',
    budgetRange: '500_1000',
    vibes: ['Romantic', 'Minimal', 'Elegant'],
    occasions: ['Anniversary', 'First Date'],
    tags: ['Bracelet', 'Coordinates', 'Engraved'],
    whySheWouldLikeIt: 'Subtle and private — nobody else knows what the numbers mean except her.',
    isPersonalized: true,
    personaTags: ['minimal-girl', 'soft-girl']
  },

  // 11. COFFEE & TEA
  {
    id: 'buy-coffee-mug-1',
    name: 'Handmade Speckled Ceramic Flower Mug',
    category: 'coffee-tea',
    subcategory: 'Cute coffee mugs',
    description: 'Artisan hand-thrown stoneware mug with speckled glaze, chunky ergonomic handle, and embossed tulip.',
    emotionalLine: '“For the morning brew that starts every single one of her days.”',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Cozy', 'Cute', 'Soft'],
    occasions: ['Just Because', 'Birthday'],
    tags: ['Mug', 'Ceramic', 'Coffee'],
    whySheWouldLikeIt: 'Pleasant weighty feel in hands; instantly becomes the designated favorite morning mug.',
    featured: true,
    personaTags: ['coffee-girl', 'soft-girl']
  },
  {
    id: 'buy-tea-infuser-1',
    name: 'Rose & Lavender Loose Leaf Herbal Tea Tin with Gold Infuser',
    category: 'coffee-tea',
    subcategory: 'Tea gift sets',
    description: 'Organic whole-flower herbal tea blend with a polished brass heart-shaped tea infuser clamp.',
    emotionalLine: '“A quiet cup of floral calm before closing her eyes for the night.”',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=85',
    price: 449,
    priceDisplay: '₹449',
    budgetRange: '300_500',
    vibes: ['Soft', 'Cozy', 'Romantic'],
    occasions: ['Bad Day', 'Just Because'],
    tags: ['Tea', 'Herbal', 'Infuser'],
    whySheWouldLikeIt: 'Naturally caffeine-free with aromatic steam that eases headaches and late-night tension.',
    personaTags: ['night-owl', 'soft-girl']
  },

  // 12. CREATIVE & HOBBY
  {
    id: 'buy-creative-crochet-1',
    name: 'Beginner Flower Bouquet Crochet Kit',
    category: 'creative-hobby',
    subcategory: 'Crochet kits',
    description: 'Includes soft pastel yarns, ergonomic crochet hooks, floral wire, and beginner step-by-step booklet.',
    emotionalLine: '“So she can craft flowers with yarn that will genuinely never wilt.”',
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=85',
    price: 599,
    priceDisplay: '₹599',
    budgetRange: '500_1000',
    vibes: ['Playful', 'Cute', 'Cozy'],
    occasions: ['Birthday', 'Just Because'],
    tags: ['Crochet', 'DIY', 'Craft'],
    whySheWouldLikeIt: 'Engaging, calming weekend hobby she can do while listening to audiobooks or podcasts.',
    sheMentionedOnce: true,
    personaTags: ['creative-girl', 'cute-girl']
  },
  {
    id: 'buy-creative-paint-1',
    name: 'Pocket Watercolor Palette & Cotton Paper Sketchbook',
    category: 'creative-hobby',
    subcategory: 'Art sets',
    description: '18 vibrant half-pans in a travel metal tin paired with cold-press 300gsm watercolor paper.',
    emotionalLine: '“For the girl whose imagination paints colors everywhere she looks.”',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85',
    price: 799,
    priceDisplay: '₹799',
    budgetRange: '500_1000',
    vibes: ['Creative', 'Minimal', 'Soft'],
    occasions: ['Birthday', 'Celebration'],
    tags: ['Watercolor', 'Sketchbook', 'Art'],
    whySheWouldLikeIt: 'Small enough to sketch in coffee shops or in the park on sunny Saturdays.',
    personaTags: ['creative-girl']
  },

  // 13. TRAVEL & EVERYDAY
  {
    id: 'buy-travel-pass-1',
    name: 'Embossed Leather Passport & Ticket Holder',
    category: 'travel-everyday',
    subcategory: 'Passport holders',
    description: 'Slim blush leather travel wallet with RFID blocking, card slots, and pen holder loop.',
    emotionalLine: '“For all the boarding passes and train journeys you will take together.”',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85',
    price: 499,
    priceDisplay: '₹499',
    budgetRange: '300_500',
    vibes: ['Elegant', 'Minimal', 'Romantic'],
    occasions: ['Anniversary', 'Birthday'],
    tags: ['Passport', 'Travel', 'Leather'],
    whySheWouldLikeIt: 'Eliminates travel day airport anxiety by keeping boarding passes and IDs crisp and accessible.',
    personaTags: ['minimal-girl', 'soft-girl']
  },

  // 14. ROMANTIC GIFTS
  {
    id: 'buy-romantic-letters-1',
    name: '“Open When...” Heirloom Letter Envelope Set',
    category: 'romantic-gifts',
    subcategory: 'Open-when letter sets',
    description: 'Set of 12 deckle-edge craft envelopes with gold foil prompts: “Open when you miss me”, “Open when you had a bad day”.',
    emotionalLine: '“Your words right beside her, ready for whatever life brings her way.”',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=85',
    price: 349,
    priceDisplay: '₹349',
    budgetRange: '300_500',
    vibes: ['Romantic', 'Emotional', 'Cozy'],
    occasions: ['Long Distance', 'Anniversary', 'Valentine\'s Day'],
    tags: ['Love Letters', 'Stationery', 'Keepsake'],
    whySheWouldLikeIt: 'Filled with your personal handwritten thoughts, it is the most meaningful treasure she will own.',
    featured: true,
    isPersonalized: true,
    personaTags: ['soft-girl', 'book-girl']
  },
  {
    id: 'buy-romantic-couples-1',
    name: 'Sun & Moon Magnetic Cord Couple Bracelets',
    category: 'romantic-gifts',
    subcategory: 'Matching bracelets',
    description: 'Two waterproof braided minimalist cords with celestial charms that magnetically connect when hands touch.',
    emotionalLine: '“Two separate orbits that always snap back together.”',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=85',
    price: 299,
    priceDisplay: '₹299',
    budgetRange: 'under_300',
    vibes: ['Cute', 'Romantic', 'Playful'],
    occasions: ['First Date', 'Long Distance', 'Valentine\'s Day'],
    tags: ['Bracelet', 'Magnetic', 'Couple'],
    whySheWouldLikeIt: 'Understated enough to wear 24/7 without catching on clothing.',
    personaTags: ['cute-girl', 'night-owl']
  },

  // 15. BIRTHDAY GIFTS & 16. ANNIVERSARY GIFTS
  {
    id: 'buy-birthday-hamper-1',
    name: 'The Golden Birthday Sunshine Hamper',
    category: 'birthday-gifts',
    subcategory: 'Birthday hamper',
    description: 'Includes a petite sunflower, vanilla soy candle, French honey caramels, and handwritten wax-sealed card.',
    emotionalLine: '“Everything bright and cheerful gathered together for her birthday morning.”',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=85',
    price: 1499,
    priceDisplay: '₹1,499',
    budgetRange: '1000_2000',
    vibes: ['Playful', 'Luxury', 'Romantic'],
    occasions: ['Birthday'],
    tags: ['Hamper', 'Birthday', 'Gift Set'],
    whySheWouldLikeIt: 'Takes the pressure off finding multiple gifts by curating a cohesive aesthetic morning surprise.',
    featured: true,
    personaTags: ['soft-girl', 'cute-girl']
  },
  {
    id: 'buy-anniversary-box-1',
    name: 'The Vintage Romance Anniversary Box',
    category: 'anniversary-gifts',
    subcategory: 'Romantic hamper',
    description: 'Includes heirloom white garden roses, starlight pendant, letter set, and dark chocolate truffles.',
    emotionalLine: '“A tribute to every small moment that led to holding her hand today.”',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=85',
    price: 1899,
    priceDisplay: '₹1,899',
    budgetRange: '1000_2000',
    vibes: ['Romantic', 'Luxury', 'Elegant'],
    occasions: ['Anniversary'],
    tags: ['Anniversary', 'Luxury Hamper', 'Romantic'],
    whySheWouldLikeIt: 'Combines romance, jewelry, flowers, and sweets into one breathless unboxing experience.',
    featured: true,
    personaTags: ['soft-girl', 'girly-girl']
  },

  // SPECIAL: ₹0 GIFTS (Nothing to buy. Something to do instead.)
  {
    id: 'buy-zero-car-flower-1',
    name: 'Single Wild Blossom on Her Passenger Seat',
    category: 'romantic-gifts',
    subcategory: '₹0 Gift',
    description: 'Pick a fresh wild daisy or garden stem and rest it on her car seat or desk before she arrives.',
    emotionalLine: '“Cost: ₹0. Emotional impact: she will smile about it the entire ride home.”',
    image: '/flowers/daisy.jpg',
    price: 0,
    priceDisplay: '₹0',
    budgetRange: '0',
    vibes: ['Romantic', 'Cute', 'Minimal'],
    occasions: ['Just Because', 'Bad Day'],
    tags: ['Zero Cost', 'Thoughtful', 'Surprise'],
    whySheWouldLikeIt: 'Proves you were thinking about her before she even said a single word.',
    featured: true,
    personaTags: ['soft-girl', 'cute-girl']
  },
  {
    id: 'buy-zero-letter-1',
    name: 'Handwritten 3-Page Letter Folded with a Pressed Leaf',
    category: 'romantic-gifts',
    subcategory: '₹0 Gift',
    description: 'Write three specific memories you are grateful for on plain paper, tuck a pressed leaf inside, and slip it into her purse.',
    emotionalLine: '“Cost: ₹0. She will keep this letter in her drawer for the next fifty years.”',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=85',
    price: 0,
    priceDisplay: '₹0',
    budgetRange: '0',
    vibes: ['Romantic', 'Emotional', 'Cozy'],
    occasions: ['Anniversary', 'Just Because', 'Bad Day'],
    tags: ['Zero Cost', 'Letter', 'Emotional'],
    whySheWouldLikeIt: 'Nothing you can buy will ever match the vulnerability and weight of your own written words.',
    featured: true,
    personaTags: ['book-girl', 'soft-girl']
  },
  {
    id: 'buy-zero-playlist-1',
    name: 'Secret 12-Track Acoustic Playlist with Custom Cover',
    category: 'romantic-gifts',
    subcategory: '₹0 Gift',
    description: 'Curate songs that sound like warm sun on her skin, design a cute photo cover, and send the link with no context.',
    emotionalLine: '“Cost: ₹0. Now whenever she listens to track 4, she is thinking of you.”',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    price: 0,
    priceDisplay: '₹0',
    budgetRange: '0',
    vibes: ['Romantic', 'Playful', 'Cozy'],
    occasions: ['Just Because', 'Long Distance'],
    tags: ['Zero Cost', 'Music', 'Playlist'],
    whySheWouldLikeIt: 'Music binds to memory faster than almost anything else in human nature.',
    personaTags: ['night-owl', 'coffee-girl']
  }
];

// Helper functions for Search, Filtering and Recommendations
export function searchAndFilterProducts(
  products: BuyProduct[],
  query: string,
  categoryFilter: string,
  budgetFilter: string,
  vibeFilter: string,
  occasionFilter: string,
  personaFilter: string,
  specialFilter: string
): BuyProduct[] {
  const cleanQuery = query.toLowerCase().trim();

  return products.filter(product => {
    // 1. Special Collection Filter
    if (specialFilter) {
      if (specialFilter === 'zero' && product.budgetRange !== '0') return false;
      if (specialFilter === 'mentioned' && !product.sheMentionedOnce) return false;
      if (specialFilter === 'under_300' && product.budgetRange !== 'under_300' && product.budgetRange !== '0') return false;
      if (specialFilter === '300_500' && product.budgetRange !== '300_500') return false;
      if (specialFilter === '500_1000' && product.budgetRange !== '500_1000') return false;
      if (specialFilter === '1000_2000' && product.budgetRange !== '1000_2000') return false;
      if (product.personaTags && !product.personaTags.includes(specialFilter) && !['zero', 'mentioned', 'under_300', '300_500', '500_1000', '1000_2000'].includes(specialFilter)) {
        return false;
      }
    }

    // 2. Category Filter
    if (categoryFilter && categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }

    // 3. Budget Filter
    if (budgetFilter && budgetFilter !== 'all') {
      if (budgetFilter === '0' && product.budgetRange !== '0') return false;
      if (budgetFilter === 'under_300' && product.budgetRange !== 'under_300' && product.budgetRange !== '0') return false;
      if (budgetFilter === '300_500' && product.budgetRange !== '300_500') return false;
      if (budgetFilter === '500_1000' && product.budgetRange !== '500_1000') return false;
      if (budgetFilter === '1000_2000' && product.budgetRange !== '1000_2000') return false;
      if (budgetFilter === '2000_plus' && product.budgetRange !== '2000_plus') return false;
    }

    // 4. Vibe Filter
    if (vibeFilter && vibeFilter !== 'all') {
      const targetVibe = vibeFilter.toLowerCase();
      if (!product.vibes?.some(v => v && v.toLowerCase() === targetVibe)) {
        return false;
      }
    }

    // 5. Occasion Filter
    if (occasionFilter && occasionFilter !== 'all') {
      const targetOccasion = occasionFilter.toLowerCase();
      if (!product.occasions?.some(o => o && o.toLowerCase() === targetOccasion)) {
        return false;
      }
    }

    // 6. Persona Filter
    if (personaFilter && personaFilter !== 'all') {
      if (!product.personaTags?.includes(personaFilter)) {
        return false;
      }
    }

    // 7. Intelligent Query Search
    if (cleanQuery) {
      // Natural language price matching
      if (cleanQuery.includes('under 300') || cleanQuery.includes('under ₹300')) {
        if (product.price > 300) return false;
      } else if (cleanQuery.includes('under 500') || cleanQuery.includes('under ₹500')) {
        if (product.price > 500) return false;
      } else if (cleanQuery.includes('under 1000') || cleanQuery.includes('under ₹1000') || cleanQuery.includes('under 1,000')) {
        if (product.price > 1000) return false;
      }

      // Persona matching
      if (cleanQuery.includes('book') && !product.tags?.includes('Book') && !product.tags?.includes('Books') && !product.personaTags?.includes('book-girl') && !(product.name || '').toLowerCase().includes('book') && !(product.subcategory || '').toLowerCase().includes('book')) {
        // give preference or check if other terms match
      }

      const matchText = [
        product.name || '',
        product.subcategory || '',
        product.description || '',
        product.emotionalLine || '',
        product.whySheWouldLikeIt || '',
        ...(product.tags || []),
        ...(product.vibes || []),
        ...(product.occasions || []),
        ...(product.personaTags || [])
      ].join(' ').toLowerCase();

      const queryWords = cleanQuery
        .replace(/gift for a girl who loves /g, '')
        .replace(/something /g, '')
        .replace(/gift for /g, '')
        .replace(/gift /g, '')
        .split(' ')
        .filter(w => w.length > 2);

      if (queryWords.length === 0) {
        return matchText.includes(cleanQuery);
      }

      return queryWords.some(word => matchText.includes(word));
    }

    return true;
  });
}

export function getSmartRecommendations(
  userText: string,
  allProducts: BuyProduct[]
): Array<{
  product: BuyProduct;
  whyItSuitsHer: string;
  presentationTip: string;
}> {
  const text = userText.toLowerCase();

  // Score products based on keyword resonance
  const scored = allProducts.map(p => {
    let score = 0;

    // Check flowers
    if ((text.includes('flower') || text.includes('tulip') || text.includes('rose') || text.includes('plant')) && p.category === 'flowers-plants') score += 10;
    // Check books
    if ((text.includes('book') || text.includes('read') || text.includes('novel') || text.includes('poetry')) && (p.category === 'books-stationery' || p.tags.includes('Books'))) score += 10;
    // Check coffee / tea
    if ((text.includes('coffee') || text.includes('tea') || text.includes('mug')) && p.category === 'coffee-tea') score += 10;
    // Check cute / plushie
    if ((text.includes('cute') || text.includes('plushie') || text.includes('toy')) && p.category === 'cute-little-things') score += 9;
    // Check jewelry
    if ((text.includes('jewel') || text.includes('necklace') || text.includes('ring') || text.includes('earring') || text.includes('gold')) && p.category === 'jewellery-accessories') score += 10;
    // Check beauty / perfume
    if ((text.includes('perfume') || text.includes('skincare') || text.includes('lip') || text.includes('fragrance')) && p.category === 'beauty-self-care') score += 10;
    // Check cozy
    if ((text.includes('cozy') || text.includes('candle') || text.includes('blanket') || text.includes('light')) && p.category === 'cozy-room') score += 9;
    // Check chocolate / sweet
    if ((text.includes('sweet') || text.includes('chocolate') || text.includes('snack')) && p.category === 'food-treats') score += 9;
    // Check romantic
    if (text.includes('romantic') || text.includes('love') || text.includes('anniversary')) {
      if (p.occasions.includes('Anniversary') || p.vibes.includes('Romantic') || p.category === 'romantic-gifts') score += 8;
    }
    // Check budget mentions
    const budgetMatch = text.match(/(\d+)/);
    if (budgetMatch) {
      const budgetVal = parseInt(budgetMatch[1], 10);
      if (budgetVal >= 100 && budgetVal <= 5000) {
        if (p.price <= budgetVal) score += 5;
        else score -= 15;
      }
    }
    if (text.includes('pastel') && (p.vibes.includes('Soft') || p.vibes.includes('Cute'))) score += 5;
    if (text.includes('soft') && p.vibes.includes('Soft')) score += 5;
    if (text.includes('minimal') && p.vibes.includes('Minimal')) score += 5;

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const topItems = scored.slice(0, 4).map(s => s.product);

  const presentationTips = [
    'Wrap it in simple brown kraft paper tied with a dried botanical sprig and a tiny handwritten note with her name.',
    'Slip this into her everyday bag before she leaves for work so she finds it as an unexpected afternoon surprise.',
    'Present this on a quiet morning alongside her favorite warm beverage before either of you check your phones.',
    'Pair this with a single fresh blossom and simply tell her: "I saw this and immediately thought of you."'
  ];

  return topItems.map((prod, idx) => ({
    product: prod,
    whyItSuitsHer: prod.whySheWouldLikeIt || `Chosen specifically because it reflects her gentle aesthetic and warm personality.`,
    presentationTip: presentationTips[idx % presentationTips.length]
  }));
}
