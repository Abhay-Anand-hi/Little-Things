import { getSemanticImage } from './imageRegistry';

export interface UsProductItem {
  id: string;
  title: string;
  category: string;
  priceCategory: 'under_500' | 'under_1000' | 'under_2000' | 'luxury';
  priceDisplay: string;
  image: string;
  whyForUs: string;
  sharedMoment: string;
}

export const US_PRODUCTS: UsProductItem[] = [
  {
    id: 'us-card-game',
    title: '“We’re Not Really Strangers” Couple Edition',
    category: 'Couple Games & Questions',
    priceCategory: 'under_1000',
    priceDisplay: '₹899',
    image: getSemanticImage('journal'),
    whyForUs: 'Sparks honest conversations, laughter, and vulnerability you haven’t visited in months.',
    sharedMoment: 'Brew tea on a Friday night, sit on the carpet, and take turns pulling cards with no phones.'
  },
  {
    id: 'us-film-camera',
    title: 'Reusable 35mm Vintage Film Camera',
    category: 'Memories & Keepsakes',
    priceCategory: 'under_2000',
    priceDisplay: '₹1,499',
    image: getSemanticImage('polaroid'),
    whyForUs: 'Film forces you to slow down, capture messy candid moments, and wait together for them to develop.',
    sharedMoment: 'Document an entire mundane Sunday: breakfast eggs, silly grimaces, walking to the store.'
  },
  {
    id: 'us-ceramic-mugs',
    title: 'Hand-Thrown Speckled Ceramic Mugs (Set of 2)',
    category: 'Home & Rituals',
    priceCategory: 'under_1000',
    priceDisplay: '₹750',
    image: getSemanticImage('mug'),
    whyForUs: 'Creates a tangible morning anchor that says “we belong to the same gentle rhythm.”',
    sharedMoment: 'Drinking morning coffee side-by-side in comfortable silence.'
  },
  {
    id: 'us-shared-throw',
    title: 'Chunky Knit Herringbone Sofa Throw',
    category: 'Cozy & Space',
    priceCategory: 'under_1000',
    priceDisplay: '₹950',
    image: getSemanticImage('blanket'),
    whyForUs: 'Large enough for two people to curl up together without fighting over the edges.',
    sharedMoment: 'Watching a rainy movie while sharing one big warm blanket.'
  },
  {
    id: 'us-scented-candle',
    title: 'Amber & Smoked Vanilla Soy Candle',
    category: 'Home & Rituals',
    priceCategory: 'under_500',
    priceDisplay: '₹450',
    image: getSemanticImage('candle'),
    whyForUs: 'A signature scent that both of you will always associate with home and safety.',
    sharedMoment: 'Lighting it whenever you cook dinner or wind down before sleep.'
  }
];

export interface UsActivityItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  howToMakeItYours: string;
  timeEstimate: string;
  cost: string;
}

export const US_ACTIVITIES: UsActivityItem[] = [
  {
    id: 'us-act-1',
    title: 'The Two-Hour Airplane Mode Evening',
    category: 'Things to Do Together',
    tagline: 'No screens. No pings. Just the two of you.',
    description: 'At 8:00 PM, both phones go into airplane mode and into a drawer. Put on a vinyl or mellow jazz, cook or bake together, and just exist.',
    howToMakeItYours: 'Pick an ambitious recipe neither of you has tried before, or set up a puzzle on the living room table.',
    timeEstimate: '2 hours',
    cost: 'Free'
  },
  {
    id: 'us-act-2',
    title: 'The Secret Destination Envelope',
    category: 'Little Surprises',
    tagline: 'Take the reins and give them the joy of being surprised.',
    description: 'Hand your partner a sealed envelope that says: “Dress comfortably, wear walking shoes, and be ready at 6:30 PM.”',
    howToMakeItYours: 'Could be as simple as an ice cream parlor by the lake or stargazing at a viewpoint.',
    timeEstimate: 'Evening',
    cost: 'Under ₹500'
  },
  {
    id: 'us-act-3',
    title: 'The “First Date” Table Revisit',
    category: 'Memories & Moments',
    tagline: 'Revisiting where the spark began.',
    description: 'Go back to the very place you had your first real conversation. Order the same drinks or dessert and talk about what went through your heads back then.',
    howToMakeItYours: 'Write each other a short index card note beforehand: “What I thought when you first walked in.”',
    timeEstimate: '1.5 hours',
    cost: '₹300 - ₹800'
  },
  {
    id: 'us-act-4',
    title: 'Midnight Floor Picnic',
    category: 'Ways to Make Each Other Smile',
    tagline: 'Breaking routine inside your own living room.',
    description: 'Move the coffee table, spread out a soft duvet and pillows on the rug, string fairy lights, and have midnight toast or takeout on the floor.',
    howToMakeItYours: 'Play a game of 20 questions or read funny old text messages aloud.',
    timeEstimate: '1 hour',
    cost: 'Free / Snack cost'
  }
];
