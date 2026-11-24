import { getSemanticImage } from './imageRegistry';

export interface HimProductItem {
  id: string;
  title: string;
  category: string;
  priceCategory: 'under_500' | 'under_1000' | 'under_2000' | 'luxury';
  priceDisplay: string;
  image: string;
  interestTag: string; // Gamer, Fitness, Music, Sports, Books, Creative, Foodie, Cars, Tech, Outdoors, Funny, Homebody
  whyHeLikesIt: string;
  thoughtfulTip: string;
}

export const HIM_PRODUCTS: HimProductItem[] = [
  // Tech & Desk Setup
  {
    id: 'him-desk-mat',
    title: 'Felt & Vegan Leather Desk Pad',
    category: 'Desk & Tech Setup',
    priceCategory: 'under_1000',
    priceDisplay: '₹799',
    image: getSemanticImage('desk_mat'),
    interestTag: 'Tech',
    whyHeLikesIt: 'Clean, tactile, and instantly elevates his workspace where he spends 8+ hours a day.',
    thoughtfulTip: 'Pick slate grey or midnight navy to match his mechanical keyboard or monitor.'
  },
  {
    id: 'him-cable-organizer',
    title: 'Magnetic Cable Management Dock',
    category: 'Desk & Tech Setup',
    priceCategory: 'under_500',
    priceDisplay: '₹349',
    image: getSemanticImage('headphones'),
    interestTag: 'Tech',
    whyHeLikesIt: 'Eliminates the annoyance of charging cables falling behind his desk.',
    thoughtfulTip: 'A tiny practical fix that shows you notice the little frustrations in his daily workflow.'
  },
  // Coffee & Foodie
  {
    id: 'him-aeropress-coffee',
    title: 'Specialty Single-Origin Coffee Beans',
    category: 'Coffee Gear',
    priceCategory: 'under_500',
    priceDisplay: '₹480',
    image: getSemanticImage('coffee'),
    interestTag: 'Foodie',
    whyHeLikesIt: 'Freshly roasted whole beans with tasting notes of hazelnut, dark chocolate, and orange zest.',
    thoughtfulTip: 'Check if he grinds his own beans or ask him casually what roast profile he prefers.'
  },
  {
    id: 'him-tumbler',
    title: 'Double-Walled Matte Insulated Tumbler',
    category: 'Coffee Gear',
    priceCategory: 'under_1000',
    priceDisplay: '₹899',
    image: getSemanticImage('mug'),
    interestTag: 'Foodie',
    whyHeLikesIt: 'Keeps his Americano piping hot for 6 hours or his iced cold brew frosty all day.',
    thoughtfulTip: 'Men love rugged, spill-proof items that fit right into their car cup holder.'
  },
  // Gamer
  {
    id: 'him-headphone-stand',
    title: 'Solid Walnut Headset Stand',
    category: 'Gaming',
    priceCategory: 'under_1000',
    priceDisplay: '₹949',
    image: getSemanticImage('headphones'),
    interestTag: 'Gamer',
    whyHeLikesIt: 'Gives his gaming headset a dedicated home instead of lying tangled on the desk.',
    thoughtfulTip: 'Notice the finish of his desk wood so this complements his setup.'
  },
  {
    id: 'him-custom-keycap',
    title: 'Artisan Resin ESC Keycap',
    category: 'Gaming',
    priceCategory: 'under_500',
    priceDisplay: '₹450',
    image: getSemanticImage('keychain'),
    interestTag: 'Gamer',
    whyHeLikesIt: 'A tiny personalized art piece he touches every time he starts up his PC.',
    thoughtfulTip: 'Choose a motif from his favorite game (like Zelda, Cyberpunk, or Pokémon).'
  },
  // Fitness & Recovery
  {
    id: 'him-grip-massage-ball',
    title: 'Lacrosse Trigger Point Massage Ball',
    category: 'Fitness & Recovery',
    priceCategory: 'under_500',
    priceDisplay: '₹299',
    image: getSemanticImage('bath_salts'),
    interestTag: 'Fitness',
    whyHeLikesIt: 'Crucial for releasing tight shoulders and upper back knots after heavy gym sets.',
    thoughtfulTip: 'Leave it in his gym duffel bag with a note: ‘For your back after deadlifts today ♡’'
  },
  {
    id: 'him-shaker-stainless',
    title: 'Odorless Matte Steel Shaker Bottle',
    category: 'Fitness & Recovery',
    priceCategory: 'under_1000',
    priceDisplay: '₹750',
    image: getSemanticImage('mug'),
    interestTag: 'Fitness',
    whyHeLikesIt: 'Steel doesn’t retain the horrible stale protein shake smell that plastic bottles develop.',
    thoughtfulTip: 'He will genuinely thank you for solving one of the most annoying gym grievances.'
  },
  // Music & Vinyl
  {
    id: 'him-vinyl-cleaning-kit',
    title: 'Anti-Static Carbon Fiber Record Brush',
    category: 'Audio & Vinyl',
    priceCategory: 'under_500',
    priceDisplay: '₹499',
    image: getSemanticImage('vinyl'),
    interestTag: 'Music',
    whyHeLikesIt: 'Protects his prized records from micro-scratches and pops before every needle drop.',
    thoughtfulTip: 'Perfect accompaniment if you’re also gifting or listening to an album together.'
  },
  // Books & Creative
  {
    id: 'him-field-notes',
    title: 'Field Notes Expedition Pocket Notebooks (3-Pack)',
    category: 'Books & Stationery',
    priceCategory: 'under_500',
    priceDisplay: '₹420',
    image: getSemanticImage('journal'),
    interestTag: 'Books',
    whyHeLikesIt: 'Durable, waterproof pages designed to slip cleanly into a jacket or back pocket.',
    thoughtfulTip: 'Write a secret sweet one-liner on page 10 for him to discover later.'
  },
  {
    id: 'him-brass-pen',
    title: 'Solid Heavyweight Brass Ballpoint Pen',
    category: 'Books & Stationery',
    priceCategory: 'under_1000',
    priceDisplay: '₹890',
    image: getSemanticImage('pen'),
    interestTag: 'Creative',
    whyHeLikesIt: 'Develops a unique patina over years of use, feeling solid and satisfying in the hand.',
    thoughtfulTip: 'Every time he signs a document or writes an idea, he will feel this quality.'
  },
  // Outdoors & Cars
  {
    id: 'him-car-scent',
    title: 'Subtle Cedarwood & Amber Car Diffuser',
    category: 'Cars & Everyday Carry',
    priceCategory: 'under_500',
    priceDisplay: '₹399',
    image: getSemanticImage('candle'),
    interestTag: 'Cars',
    whyHeLikesIt: 'Smells like high-end cologne and mountain air instead of synthetic cheap car fresheners.',
    thoughtfulTip: 'Clip it quietly onto his AC vent before you get out of the passenger seat.'
  },
  {
    id: 'him-pocket-knife',
    title: 'Compact Minimalist Multi-Tool Keychain',
    category: 'Cars & Everyday Carry',
    priceCategory: 'under_500',
    priceDisplay: '₹380',
    image: getSemanticImage('keychain'),
    interestTag: 'Outdoors',
    whyHeLikesIt: 'Bottle opener, box cutter, and mini pry bar all in the size of a door key.',
    thoughtfulTip: 'Men love being the person who can open packages and fix loose screws on the spot.'
  },
  // Homebody
  {
    id: 'him-waffle-slippers',
    title: 'Thermal Waffle Fleece Lounge Slippers',
    category: 'Homebody & Comfort',
    priceCategory: 'under_1000',
    priceDisplay: '₹699',
    image: getSemanticImage('socks'),
    interestTag: 'Homebody',
    whyHeLikesIt: 'Pure warmth for cold hardwood or tiled floors on lazy Sunday mornings.',
    thoughtfulTip: 'Pair with making his favorite breakfast sandwich in bed.'
  }
];

export interface HimIdeaItem {
  id: string;
  category: string;
  title: string;
  description: string;
  whyHeLikesIt: string;
  interestTag: string;
  timeEstimate: string;
}

export const HIM_IDEAS: HimIdeaItem[] = [
  {
    id: 'idea-him-1',
    category: 'Things to Do',
    title: 'The "No Decisions" Evening',
    description: 'Plan the exact dinner, movie, and route without asking him "What do you feel like doing?" once.',
    whyHeLikesIt: 'Men are often expected to drive plans; taking 100% of the cognitive load off him feels deeply restorative.',
    interestTag: 'Homebody',
    timeEstimate: '3 hours'
  },
  {
    id: 'idea-him-2',
    category: 'Things to Do',
    title: 'Late Night Gas Station & Drive Route',
    description: 'Take his car or drive him to a 24/7 store, grab warm iced drinks and snacks, and just cruise with music.',
    whyHeLikesIt: 'Quiet drives side-by-side with no eye contact pressure make men open up effortlessly.',
    interestTag: 'Cars',
    timeEstimate: '1.5 hours'
  },
  {
    id: 'idea-him-3',
    category: 'Ways to Surprise',
    title: 'His Favorite Snack Waiting in the Cup Holder',
    description: 'When picking him up or getting into his car, slide his go-to chocolate or beverage into the console.',
    whyHeLikesIt: 'It proves you pay attention to his comfort without him having to drop hints.',
    interestTag: 'Foodie',
    timeEstimate: 'Instant'
  },
  {
    id: 'idea-him-4',
    category: 'Ways to Appreciate',
    title: 'Say: "I feel so calm and safe when I am with you."',
    description: 'Look him in the eyes during an unhurried moment and tell him how his steady presence impacts you.',
    whyHeLikesIt: 'Being someone’s safe harbor is the highest emotional compliment most men will ever receive.',
    interestTag: 'Creative',
    timeEstimate: '1 minute'
  }
];
