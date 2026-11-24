import { PersonMode, LittleThingsContext, MemoryItem } from '../types';

export interface UnderstandIntentResult {
  intent: string;
  emotion: string;
  nextQuestion: {
    question: string;
    options: string[];
  } | null;
  onePerfectThing: {
    title: string;
    description: string;
    whyItFits: string;
    howToMakePersonal: string;
    imageKey: string;
  };
}

export interface MakeItYoursResult {
  personalizedText: string;
  personalTouch: string;
  whyItFits: string;
}

export interface OnePerfectThingResult {
  title: string;
  description: string;
  whyItFits: string;
  howToMakePersonal: string;
  imageKey: string;
  budget?: string;
  time?: string;
}

export interface SurpriseMeDualResult {
  theLittleOne?: {
    title: string;
    description: string;
    whyItFits: string;
    howToMakePersonal: string;
    imageKey: string;
    time: string;
  };
  theThoughtfulOne?: {
    title: string;
    description: string;
    whyItFits: string;
    howToMakePersonal: string;
    imageKey: string;
    time: string;
  };
  theUnexpectedOne?: {
    title: string;
    description: string;
    whyItFits: string;
    howToMakePersonal: string;
    imageKey: string;
    time: string;
  };
  result?: {
    title: string;
    description: string;
    whyItFits: string;
    howToMakePersonal: string;
    imageKey: string;
    time: string;
  };
}

// 1. Understand User Intent from Home / Free-text
export async function understandUserIntent(
  text: string,
  person: PersonMode,
  recipientName: string,
  memories: MemoryItem[] = []
): Promise<UnderstandIntentResult> {
  try {
    const res = await fetch('/api/ai/understand-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, person, recipientName, memories })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('understandUserIntent client error, using fallback:', err);
  }

  // Graceful semantic fallback
  const target = recipientName || (person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'us');
  return {
    intent: 'thoughtful_gesture',
    emotion: 'gentle warmth',
    nextQuestion: null,
    onePerfectThing: {
      title: `The Afternoon Warm Drink Hand-Off for ${target}`,
      description: `Surprise them with their favorite tea or coffee and a 3-word handwritten note on the cup: “Thinking of you.”`,
      whyItFits: `Requires zero effort on their part while bringing instant comfort in the middle of an ordinary day.`,
      howToMakePersonal: `Order or brew it with their exact milk or sweetness preference.`,
      imageKey: 'coffee'
    }
  };
}

// 2. Signature "Make It Yours"
export async function makeItYours(params: {
  itemTitle: string;
  originalText: string;
  person: PersonMode;
  recipientName: string;
  personalDetail?: string;
  selectedTone?: string;
  customOption?: string;
}): Promise<MakeItYoursResult> {
  try {
    const res = await fetch('/api/ai/make-it-yours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('makeItYours client error, using fallback:', err);
  }

  const target = params.recipientName || (params.person === 'HER' ? 'her' : params.person === 'HIM' ? 'him' : 'them');
  const detail = params.personalDetail ? ` Keeping in mind: “${params.personalDetail}”.` : '';
  const tone = params.selectedTone === 'playful' ? 'with a playful wink' : 'with quiet tenderness';

  return {
    personalizedText: `${params.originalText}${detail} Arranged especially for ${target} ${tone}. Make it unhurried, sincere, and completely your own.`,
    personalTouch: params.personalDetail ? `Incorporated your note: "${params.personalDetail}"` : `Customized for ${target}`,
    whyItFits: `Transforms a general idea into a memory that feels unmistakably like your bond.`
  };
}

// 3. One Perfect Thing Recommendation
export async function fetchOnePerfectThing(params: {
  person: PersonMode;
  recipientName: string;
  situation?: string;
  mood?: string;
  budget?: string;
  time?: string;
  memories?: MemoryItem[];
}): Promise<OnePerfectThingResult> {
  try {
    const res = await fetch('/api/ai/one-perfect-thing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('fetchOnePerfectThing client error, using fallback:', err);
  }

  const target = params.recipientName || (params.person === 'HER' ? 'her' : params.person === 'HIM' ? 'him' : 'us');
  if (params.person === 'HIM') {
    return {
      title: `The "I Handled Dinner" Comfort Pickup`,
      description: `Pick up his favorite meal on the way home, set it out hot, and let him decompress with zero questions asked.`,
      whyItFits: `Men constantly carry decision fatigue; walking into a solved evening is instant bliss.`,
      howToMakePersonal: `Grab his favorite cold drink or extra garlic dip without asking.`,
      imageKey: 'comfort-burger',
      budget: 'Under ₹500',
      time: '20 mins'
    };
  } else if (params.person === 'US') {
    return {
      title: `The 2-Hour Airplane Mode Living Room Picnic`,
      description: `Both phones in a drawer on airplane mode. Pillows and blankets on the floor, soft music, and a warm dessert to share.`,
      whyItFits: `Undivided, unhurried presence is the rarest luxury a couple can experience.`,
      howToMakePersonal: `Play the very first album or playlist you listened to when you first started dating.`,
      imageKey: 'blanket',
      budget: 'Free',
      time: '2 hours'
    };
  }

  return {
    title: `A Single Stem Pink Tulip + Cold Matcha Run`,
    description: `Pick up one fresh stem tied with simple twine and her favorite cold drink, and leave it on her desk.`,
    whyItFits: `Carries zero high-stakes pressure, looks delicate, and delivers immediate sensory delight.`,
    howToMakePersonal: `Leave a folded 3-word post-it under the cup: “Thinking of your smile.”`,
    imageKey: 'pink_tulip',
    budget: 'Under ₹300',
    time: '15 mins'
  };
}

// 4. Surprise Me Dual Path
export async function fetchSurpriseMe(params: {
  mode: 'no_idea' | 'guided';
  who: PersonMode;
  feeling?: string;
  time?: string;
  budget?: string;
  aboutThem?: string;
  situation?: string;
}): Promise<SurpriseMeDualResult> {
  try {
    const res = await fetch('/api/ai/surprise-me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('fetchSurpriseMe client error, using fallback:', err);
  }

  const target = params.who || 'HER';
  if (params.mode === 'no_idea') {
    return {
      theLittleOne: {
        title: target === 'HIM' ? 'Fresh Pour-Over in His Favorite Mug' : target === 'US' ? 'Ten-Minute Porch Chai' : 'Single Pink Tulip + Matcha Hand-Off',
        description: 'A tiny sensory gift that requires zero planning and brightens the immediate present.',
        whyItFits: 'Effortless and tender without putting any pressure or expectation on them.',
        howToMakePersonal: 'Prepare it to their exact temperature and sweetness preference.',
        imageKey: target === 'HIM' ? 'espresso-coffee' : target === 'US' ? 'tea' : 'pink_tulip',
        time: '10 mins'
      },
      theThoughtfulOne: {
        title: target === 'HIM' ? 'The Unsolicited Accomplishment Text' : target === 'US' ? 'The Re-created First Drink' : 'The Scented Pocket Note',
        description: 'A gesture grounded in paying close attention to who they are.',
        whyItFits: 'Touches the heart by proving they are seen, admired, and remembered.',
        howToMakePersonal: 'Reference a private memory or inside joke that only the two of you share.',
        imageKey: target === 'HIM' ? 'appreciation-note' : target === 'US' ? 'polaroid' : 'letter',
        time: '20 mins'
      },
      theUnexpectedOne: {
        title: target === 'HIM' ? 'Late-Night Gas Station Snack Run' : target === 'US' ? 'Living Room Slow Dance' : 'Midday Stargazing in the Car',
        description: 'A playful departure from everyday domestic routine that feels adventurous.',
        whyItFits: 'Breaks predictable patterns with spontaneous, youthful delight.',
        howToMakePersonal: 'Queue up the exact song that always makes them smile without saying a word.',
        imageKey: target === 'HIM' ? 'car-drive' : target === 'US' ? 'blanket' : 'sunset_drive',
        time: '45 mins'
      }
    };
  }

  return {
    result: {
      title: `Tailored Gesture for ${target}`,
      description: `A thoughtfully timed gesture based on feeling ${params.feeling || 'loved'}, budgeted ${params.budget || 'thoughtfully'}.`,
      whyItFits: `Directly matches the time and mood you selected.`,
      howToMakePersonal: `Anchor it with a handwritten one-liner.`,
      imageKey: 'candle',
      time: params.time || '30 mins'
    }
  };
}
