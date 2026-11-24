import { getSemanticImage } from './imageRegistry';
import { PersonMode } from '../types';

export interface ExploreCardItem {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  price?: string;
  badge?: string;
  personTarget?: PersonMode | 'ALL';
  category: string;
  sourceType: 'PRODUCT' | 'IDEA' | 'MESSAGE' | 'SURPRISE' | 'FLOWER';
  actionPrompt?: string;
}

export const EXPLORE_SECTIONS = [
  { id: 'trending', title: 'Trending Little Things', subtitle: 'What people are loving and saving this week.' },
  { id: 'small-gestures', title: 'Small Gestures, Big Impact', subtitle: 'Cost nothing or under 10 minutes, but stay with them all day.' },
  { id: 'bad-day', title: 'For a Heavy or Bad Day', subtitle: 'Gentle warmth, quiet comfort, and zero pressure.' },
  { id: 'just-because', title: 'Just Because', subtitle: 'No anniversary, no birthday—just pure intention.' },
  { id: 'under-300', title: 'Under ₹300', subtitle: 'Thoughtful, beautifully curated tokens that don’t cost a fortune.' },
  { id: 'mentioned-once', title: 'Things They Mentioned Once...', subtitle: 'Because remembering what they said in passing is the highest romance.' },
  { id: 'say-it-better', title: 'Say It Better', subtitle: 'Words when you feel so much but don’t know how to phrase it.' },
  { id: 'weekend-ideas', title: 'Weekend Rituals', subtitle: 'Unhurried mornings and sweet afternoon escapades.' },
  { id: 'tiny-surprises', title: 'Tiny Surprises', subtitle: 'Spontaneous little twists that break the mundane rhythm.' }
];

export const EXPLORE_ITEMS: ExploreCardItem[] = [
  // Trending
  {
    id: 'exp-trend-1',
    section: 'trending',
    title: 'Single Stalk Pink Tulip in Brown Kraft Paper',
    subtitle: '“Because you looked so radiant today.”',
    description: 'A single, fresh, elegant stem tied with simple twine and a handwritten 4-word note.',
    image: getSemanticImage('pink_tulip'),
    price: '₹120',
    badge: 'Trending',
    personTarget: 'HER',
    category: 'Flowers',
    sourceType: 'FLOWER'
  },
  {
    id: 'exp-trend-2',
    section: 'trending',
    title: 'Solid Brass Pocket Bookmark with Engraving',
    subtitle: 'Tucked into the book they are currently reading.',
    description: 'A slim brass clip that slides onto their current page, holding your silent company.',
    image: getSemanticImage('bookmark'),
    price: '₹280',
    badge: 'Staff Pick',
    personTarget: 'ALL',
    category: 'Books & Stationery',
    sourceType: 'PRODUCT'
  },
  {
    id: 'exp-trend-3',
    section: 'trending',
    title: 'The "Car Is Warm & Music Ready" Pickup',
    subtitle: 'Having their favorite temperature and song playing before they step in.',
    description: 'When picking them up after work, set the car climate and queue their favorite peaceful artist.',
    image: getSemanticImage('sunset_drive'),
    badge: 'Thoughtful',
    personTarget: 'ALL',
    category: 'Gestures',
    sourceType: 'IDEA'
  },

  // Small Gestures
  {
    id: 'exp-gesture-1',
    section: 'small-gestures',
    title: 'The Silent 20-Second Hug',
    subtitle: 'Zero speaking. Just deep breathing and grounded comfort.',
    description: 'When either of you gets home, hold them for 20 continuous seconds. Studies show it releases oxytocin and calms the nervous system.',
    image: getSemanticImage('candle'),
    badge: 'Free',
    personTarget: 'ALL',
    category: 'Comfort',
    sourceType: 'IDEA'
  },
  {
    id: 'exp-gesture-2',
    section: 'small-gestures',
    title: 'Refilling Their Water Bottle Without Asking',
    subtitle: 'A tiny reminder that their well-being matters to you.',
    description: 'Spot their empty bottle on their desk or bedside, wash it, fill it with fresh cool water, and place it back quietly.',
    image: getSemanticImage('mug'),
    badge: 'Free',
    personTarget: 'ALL',
    category: 'Care',
    sourceType: 'IDEA'
  },

  // For a Bad Day
  {
    id: 'exp-bad-1',
    section: 'bad-day',
    title: 'The "You Don\'t Have to Talk About It" Sanctuary',
    subtitle: 'Taking off all the pressure to explain or be okay.',
    description: 'Tell them: “I know today was exhausting. You don’t have to talk about it or pretend to be cheerful. I made tea and queued your favorite comfort show.”',
    image: getSemanticImage('blanket'),
    badge: 'Reassurance',
    personTarget: 'ALL',
    category: 'Comfort',
    sourceType: 'MESSAGE'
  },
  {
    id: 'exp-bad-2',
    section: 'bad-day',
    title: 'Warm Chamomile & Lavender Scented Eye Pillow',
    subtitle: 'Weighted flaxseed pillow to soothe screen fatigue and headaches.',
    description: 'Microwavable eye compress that smells of herbal lavender, easing tension after crying or staring at screens.',
    image: getSemanticImage('lavender'),
    price: '₹299',
    badge: 'Comfort',
    personTarget: 'ALL',
    category: 'Self-Care',
    sourceType: 'PRODUCT'
  },

  // Just Because
  {
    id: 'exp-jb-1',
    section: 'just-because',
    title: 'Their Go-To Pastry Waiting in the Kitchen',
    subtitle: 'Picked up from that specific bakery they love.',
    description: 'Stopping by on your way home just because you knew it would bring a bright smile to their face.',
    image: getSemanticImage('pastry'),
    price: '₹150 - ₹250',
    badge: 'Sweet',
    personTarget: 'ALL',
    category: 'Foodie',
    sourceType: 'SURPRISE'
  },
  {
    id: 'exp-jb-2',
    section: 'just-because',
    title: '“I Love the Way Your Mind Works” Note',
    subtitle: 'A spontaneous compliment on their intellect or curiosity.',
    description: 'Leave a note on their laptop keyboard highlighting a specific thought or perspective they shared recently.',
    image: getSemanticImage('pen'),
    badge: 'Words',
    personTarget: 'ALL',
    category: 'Words',
    sourceType: 'MESSAGE'
  },

  // Under ₹300
  {
    id: 'exp-u300-1',
    section: 'under-300',
    title: 'Organic Honey & Vanilla Lip Butter Tin',
    subtitle: 'Ultra-nourishing, non-sticky, aesthetic brass pocket tin.',
    description: 'A pocket essential made with beeswax, shea butter, and vanilla bean. Feels luxurious at a modest price.',
    image: getSemanticImage('lip_balm'),
    price: '₹249',
    badge: 'Under ₹300',
    personTarget: 'HER',
    category: 'Beauty',
    sourceType: 'PRODUCT'
  },
  {
    id: 'exp-u300-2',
    section: 'under-300',
    title: 'Matte Black Key Organiser Clip',
    subtitle: 'Silences noisy keys and slips into any front pocket.',
    description: 'Keeps everyday keys silent and compact so they don’t tear pocket linings or jingle.',
    image: getSemanticImage('keychain'),
    price: '₹279',
    badge: 'Under ₹300',
    personTarget: 'HIM',
    category: 'Everyday Carry',
    sourceType: 'PRODUCT'
  },
  {
    id: 'exp-u300-3',
    section: 'under-300',
    title: 'Botanical Pressed Wildflower Postcards (Set of 4)',
    subtitle: 'Thick cotton paper with real pressed meadow flowers.',
    description: 'Write a small intimate message on the back of one and leave it somewhere unexpected.',
    image: getSemanticImage('daisy'),
    price: '₹199',
    badge: 'Under ₹300',
    personTarget: 'ALL',
    category: 'Stationery',
    sourceType: 'PRODUCT'
  },

  // Things They Mentioned Once...
  {
    id: 'exp-mention-1',
    section: 'mentioned-once',
    title: 'The Exact Brand of Pen They Borrowed and Loved',
    subtitle: '“I remember you said this pen wrote so smoothly.”',
    description: 'Buying a two-pack of the gel pen or pencil they offhandedly admired three months ago.',
    image: getSemanticImage('pen'),
    price: '₹180',
    badge: 'Memory',
    personTarget: 'ALL',
    category: 'Stationery',
    sourceType: 'PRODUCT'
  },
  {
    id: 'exp-mention-2',
    section: 'mentioned-once',
    title: 'The Obscure Snack From Their Childhood',
    subtitle: 'Sourced from an import aisle or local neighborhood shop.',
    description: 'Finding the exact nostalgic wafer, candy, or soda they fondly reminisced about during a late-night drive.',
    image: getSemanticImage('chocolate'),
    price: '₹100 - ₹350',
    badge: 'Nostalgia',
    personTarget: 'ALL',
    category: 'Treats',
    sourceType: 'SURPRISE'
  },

  // Say It Better
  {
    id: 'exp-say-1',
    section: 'say-it-better',
    title: '“You are my favorite person to do nothing with.”',
    subtitle: 'For when you realize peace is better than spectacle.',
    description: 'Reminds them that their mere quiet presence is more entertaining and comforting than any grand event.',
    image: getSemanticImage('coffee'),
    badge: 'To Tell',
    personTarget: 'ALL',
    category: 'Words',
    sourceType: 'MESSAGE'
  },
  {
    id: 'exp-say-2',
    section: 'say-it-better',
    title: '“Thank you for making our home feel so warm.”',
    subtitle: 'Acknowledging the intangible atmosphere they create.',
    description: 'Recognizing how their energy turns ordinary physical four walls into a sanctuary you yearn to return to.',
    image: getSemanticImage('candle'),
    badge: 'Appreciation',
    personTarget: 'ALL',
    category: 'Words',
    sourceType: 'MESSAGE'
  },

  // Weekend Ideas
  {
    id: 'exp-wknd-1',
    section: 'weekend-ideas',
    title: 'Sunday Morning Coffee Walk with Zero Destination',
    subtitle: 'Grab cups to-go and wander leafy residential streets.',
    description: 'Leave phones behind. Notice old houses, pet neighborhood dogs, and talk without a schedule.',
    image: getSemanticImage('walk_in_park'),
    badge: 'Weekend',
    personTarget: 'US',
    category: 'Rituals',
    sourceType: 'IDEA'
  },
  {
    id: 'exp-wknd-2',
    section: 'weekend-ideas',
    title: 'The Local Farmers’ Market or Flea Morning',
    subtitle: 'Taste fruit samples, look at artisanal ceramics, pick fresh bread.',
    description: 'A sensory, cheerful morning date that leaves you with delicious ingredients for lunch.',
    image: getSemanticImage('bakery'),
    badge: 'Date Idea',
    personTarget: 'ALL',
    category: 'Activities',
    sourceType: 'IDEA'
  },

  // Tiny Surprises
  {
    id: 'exp-surp-1',
    section: 'tiny-surprises',
    title: 'The Passenger Seat Flower',
    subtitle: 'Waiting on the car seat before she/he opens the door.',
    description: 'When picking them up, place a single fresh stem or small treat right on the seat where they sit.',
    image: getSemanticImage('rose'),
    price: '₹80 - ₹150',
    badge: 'Classic',
    personTarget: 'HER',
    category: 'Surprises',
    sourceType: 'SURPRISE'
  },
  {
    id: 'exp-surp-2',
    section: 'tiny-surprises',
    title: 'The Tucked Laptop Note',
    subtitle: 'Discovered when they open their computer at work.',
    description: 'A folded miniature index card inside their laptop: “Have the best day today. I am so proud of you. ♡”',
    image: getSemanticImage('letter'),
    badge: 'Secret Note',
    personTarget: 'ALL',
    category: 'Surprises',
    sourceType: 'SURPRISE'
  }
];
