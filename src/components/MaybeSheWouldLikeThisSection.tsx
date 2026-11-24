import React, { useState } from 'react';
import { SavedHerItem } from '../types';
import { Sparkles, Dices, Bookmark, ArrowRight, Heart } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';
import { getHerImage } from '../data/her/images';
import { getHimImage } from '../data/him/images';
import { getUsImage } from '../data/us/images';

interface MaybeItem {
  id: string;
  type: 'flower' | 'buy' | 'message' | 'idea';
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  actionText?: string;
  actionRoute?: string;
}

const HER_CANDIDATES: MaybeItem[] = [
  {
    id: 'maybe-her-1',
    type: 'flower',
    tag: 'Botanical Stem',
    title: 'Chamomile Daisy 🌼',
    subtitle: '“Feels like a quiet Sunday morning”',
    description: 'Daisies feel unpretentious and sincere. They remind her that beauty doesn’t have to be loud or complicated.',
    image: getHerImage('chamomile').url,
    actionText: 'View Flower Guide'
  },
  {
    id: 'maybe-her-2',
    type: 'buy',
    tag: 'Delicate Gift',
    title: 'Warm Vanilla & Amber Hair Mist',
    subtitle: 'Under ₹1000 (₹750)',
    description: 'Scents her hair with gentle warmth that lingers softly whenever she hugs you.',
    image: getHerImage('vanilla_mist').url,
    actionText: 'See Gift Details'
  },
  {
    id: 'maybe-her-3',
    type: 'message',
    tag: 'Sweet Message',
    title: 'The "Thinking of Your Giggle" Ping',
    subtitle: 'To send right now',
    description: '“I was just sitting here and remembered that absurd wheeze-laugh you did yesterday. My whole day just improved.”',
    actionText: 'Copy Message'
  },
  {
    id: 'maybe-her-4',
    type: 'idea',
    tag: 'Spontaneous Date',
    title: 'The Candlelit Floor Pillow Fort',
    subtitle: 'Cozy Evening (₹0)',
    description: 'Gather every duvet and pillow onto the floor, light a vanilla candle, and watch her favorite studio Ghibli movie.',
    image: getHerImage('pillow_fort').url,
    actionText: 'Plan This'
  },
  {
    id: 'maybe-her-5',
    type: 'flower',
    tag: 'Botanical Stem',
    title: 'Pink Tulip 🌷',
    subtitle: '“Soft, unhurried devotion”',
    description: 'Tulips bend gracefully toward the light, just like she does on days she smiles.',
    image: getHerImage('pink_tulip').url,
    actionText: 'View Flower Guide'
  },
  {
    id: 'maybe-her-6',
    type: 'buy',
    tag: 'Little Keepsake',
    title: 'French Silk Velvet Hair Ribbon',
    subtitle: 'Under ₹500 (₹350)',
    description: 'A touch of effortless vintage charm she can tie into a low ponytail for your next walk.',
    image: getHerImage('hair_ribbon').url,
    actionText: 'See Gift Details'
  },
  {
    id: 'maybe-her-7',
    type: 'message',
    tag: 'Sweet Message',
    title: 'The Unprompted "Proud of You" Note',
    subtitle: 'To send right now',
    description: '“I know you feel tired today, but I see how fiercely and gently you keep trying. I am so lucky to love you.”',
    actionText: 'Copy Message'
  },
  {
    id: 'maybe-her-8',
    type: 'idea',
    tag: 'Intentional Gesture',
    title: 'The Silent 20-Minute Head Massage',
    subtitle: 'Pure Relaxation (₹0)',
    description: 'Use a single dab of lavender oil, knead her temples gently without talking, and let her turn her brain off.',
    image: getHerImage('head_massage').url,
    actionText: 'Do This For Her'
  }
];

const HIM_CANDIDATES: MaybeItem[] = [
  {
    id: 'maybe-him-1',
    type: 'buy',
    tag: 'Desk & Gaming',
    title: 'Custom Artisan Keycap Novelty',
    subtitle: 'Under ₹500 (₹420)',
    description: 'A tactile mechanical keyboard keycap he sees and touches every single day at his battlestation.',
    image: getHimImage('keycaps').url,
    actionText: 'See Details'
  },
  {
    id: 'maybe-him-2',
    type: 'buy',
    tag: 'Coffee Ritual',
    title: 'Immersion Cold Brew Bottle & Roast',
    subtitle: 'Under ₹1000 (₹899)',
    description: 'Smooth, rich, low-acid cold brew he can brew in the fridge overnight before work or workouts.',
    image: getHimImage('coffee_maker').url,
    actionText: 'See Details'
  },
  {
    id: 'maybe-him-3',
    type: 'message',
    tag: 'Respect & Belief',
    title: 'The "I Notice How Hard You Try" Ping',
    subtitle: 'To send right now',
    description: '“I know work was exhausting this week, but I see how disciplined and patient you stay. So lucky to have you in my corner.”',
    actionText: 'Copy Message'
  },
  {
    id: 'maybe-him-4',
    type: 'idea',
    tag: 'Zero-Pressure Reset',
    title: 'The Unprompted Fuel Run & Space',
    subtitle: 'Pure Support (Under ₹200)',
    description: 'Grab his favorite cold drink or hot savoury snack, hand it to him quietly with a tap on the shoulder, and let him game undisturbed.',
    image: getHimImage('comfort_food').url,
    actionText: 'Do This For Him'
  },
  {
    id: 'maybe-him-5',
    type: 'buy',
    tag: 'Everyday Carry',
    title: 'Matte Titanium Bolt-Action Pen',
    subtitle: 'Under ₹1000 (₹750)',
    description: 'A satisfying, indestructible everyday carry writing tool he’ll clip into his notebook or jacket forever.',
    image: getHimImage('pen').url,
    actionText: 'See Details'
  },
  {
    id: 'maybe-him-6',
    type: 'idea',
    tag: 'Night Drive',
    title: 'The 11 PM Windows-Down Drive',
    subtitle: 'Spontaneous (₹0)',
    description: 'Hop in the car late at night, let him pick the soundtrack, roll the windows down, and grab late-night chai or burgers.',
    image: getHimImage('night_drive').url,
    actionText: 'Suggest This'
  },
  {
    id: 'maybe-him-7',
    type: 'message',
    tag: 'Playful Ping',
    title: 'The "You Look Ridiculously Handsome" Ping',
    subtitle: 'Midday surprise',
    description: '“Just walking between errands and randomly thought of how good you looked this morning. That is all.”',
    actionText: 'Copy Message'
  },
  {
    id: 'maybe-him-8',
    type: 'buy',
    tag: 'Hydration & Fitness',
    title: 'Double-Walled Insulated Flask',
    subtitle: 'Under ₹500 (₹499)',
    description: 'Keeps water ice-cold for 24 hours during his workouts, desk sprints, or weekend road trips.',
    image: getHimImage('tumbler').url,
    actionText: 'See Details'
  }
];

const US_CANDIDATES: MaybeItem[] = [
  {
    id: 'maybe-us-1',
    type: 'idea',
    tag: 'Two-Player Date',
    title: 'The Living Room Blind Tasting Flight',
    subtitle: 'Cozy Challenge (₹300)',
    description: 'Pick up 3 different artisanal chocolates or exotic fruits. Blindfold each other and guess the flavors.',
    image: getUsImage('cooking').url,
    actionText: 'Plan This'
  },
  {
    id: 'maybe-us-2',
    type: 'buy',
    tag: 'Shared Keepsake',
    title: 'Retro Instant Print Camera',
    subtitle: 'Worth the Splurge (₹3,200)',
    description: 'Real tangible credit-card-sized prints you can tape to the fridge and document your years together.',
    image: getUsImage('instant_camera').url,
    actionText: 'See Details'
  },
  {
    id: 'maybe-us-3',
    type: 'idea',
    tag: 'Screen-Free Evening',
    title: 'The Sunset Stroll with No Phones',
    subtitle: 'Pure Connection (₹0)',
    description: 'Leave both smartphones on airplane mode on the dresser. Take a 45-minute neighborhood walk holding hands.',
    image: getUsImage('sunset_walk').url,
    actionText: 'Do This Today'
  },
  {
    id: 'maybe-us-4',
    type: 'message',
    tag: 'Team Spirit',
    title: 'The "My Favorite Teammate" Ping',
    subtitle: 'Send right now',
    description: '“Just wanted to say I love our team. There is no one else in this world I’d rather navigate messy, beautiful life with.”',
    actionText: 'Copy Message'
  },
  {
    id: 'maybe-us-5',
    type: 'buy',
    tag: 'Morning Ritual',
    title: 'Handcrafted Ceramic Couple Mugs',
    subtitle: 'Under ₹600',
    description: 'Two organic stoneware mugs that make every single morning coffee or chai feel intentional.',
    image: getUsImage('morning_coffee').url,
    actionText: 'See Details'
  },
  {
    id: 'maybe-us-6',
    type: 'idea',
    tag: 'Night Stargazing',
    title: 'The Rooftop Stargazing & Tea Hour',
    subtitle: 'Unhurried Night (₹0)',
    description: 'Spread a thick blanket on the terrace or lawn, bring a thermos of warm tea, and listen to the world quiet down.',
    image: getUsImage('stargazing').url,
    actionText: 'Plan This'
  }
];

interface MaybeSheWouldLikeThisProps {
  recipientName?: string;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
  onOpenFlowers: () => void;
  onOpenCategory: (catId: string) => void;
}

export const MaybeSheWouldLikeThisSection: React.FC<MaybeSheWouldLikeThisProps> = ({
  recipientName,
  onSaveItem,
  savedIds,
  onOpenFlowers,
  onOpenCategory
}) => {
  const { person } = useSession();
  const [offset, setOffset] = useState(0);

  const candidates = person === 'HIM' ? HIM_CANDIDATES : person === 'US' ? US_CANDIDATES : HER_CANDIDATES;
  const targetPronoun = person === 'HIM' ? 'he’d' : person === 'US' ? 'we’d' : 'she’d';
  const targetTagline = person === 'HIM'
    ? 'A randomized selection of EDC, gaming gear, sincere messages, and quiet gestures for him.'
    : person === 'US'
    ? 'A randomized selection of shared dates, two-player rituals, and keepsakes for the two of you.'
    : 'A randomized selection of flowers, little surprises, messages, and cozy dates for her.';

  const displayedItems = [
    candidates[offset % candidates.length],
    candidates[(offset + 1) % candidates.length],
    candidates[(offset + 2) % candidates.length],
    candidates[(offset + 3) % candidates.length]
  ].filter(Boolean);

  const handleShuffle = () => {
    setOffset(prev => prev + 4);
  };

  const accentColor = person === 'HIM' ? 'text-stone-800' : person === 'US' ? 'text-amber-700' : 'text-rose-600';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${accentColor}`}>
            Curated Inspiration
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
            Maybe {targetPronoun} like this…
          </h2>
          <p className="mt-1 text-sm text-stone-500 font-serif italic">
            {targetTagline}
          </p>
        </div>

        <button
          onClick={handleShuffle}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 shadow-2xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <Dices className={`w-3.5 h-3.5 ${accentColor}`} />
          <span>Shuffle suggestions</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => {
          const isSaved = savedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200/80 p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {item.image ? (
                  <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-stone-800 shadow-xs">
                      {item.tag}
                    </div>

                    <button
                      onClick={() => {
                        onSaveItem({
                          id: item.id,
                          type: item.type,
                          title: item.title,
                          subtitle: item.subtitle,
                          description: item.description,
                          image: item.image,
                          category: item.tag,
                          savedAt: new Date().toISOString()
                        });
                        triggerHeartConfetti();
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-stone-900 shadow-xs transition-transform active:scale-95"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-stone-900 text-stone-900' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <div className="h-40 rounded-2xl bg-stone-50 border border-stone-100 p-4 mb-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-white text-[10px] font-semibold text-stone-700 border border-stone-200">
                        {item.tag}
                      </span>
                      <button
                        onClick={() => {
                          onSaveItem({
                            id: item.id,
                            type: item.type,
                            title: item.title,
                            subtitle: item.subtitle,
                            description: item.description,
                            category: item.tag,
                            savedAt: new Date().toISOString()
                          });
                          triggerHeartConfetti();
                        }}
                        className="p-1.5 rounded-full hover:bg-white text-stone-600 transition-colors"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-stone-900 text-stone-900' : ''}`} />
                      </button>
                    </div>
                    <p className="font-serif italic text-xs text-stone-700 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {item.subtitle || 'Instant message'}
                    </span>
                  </div>
                )}

                <h3 className="font-serif text-base font-normal text-stone-900 mb-1 leading-snug">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] font-medium text-stone-500 mb-2">
                    {item.subtitle}
                  </p>
                )}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                  {item.type}
                </span>

                {item.type === 'flower' ? (
                  <button
                    onClick={onOpenFlowers}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <span>{item.actionText || 'Explore'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (item.type === 'message') {
                        navigator.clipboard?.writeText(item.description);
                        alert('Copied to clipboard! 🖤');
                      } else {
                        onSaveItem({
                          id: item.id,
                          type: item.type,
                          title: item.title,
                          subtitle: item.subtitle,
                          description: item.description,
                          image: item.image,
                          category: item.tag,
                          savedAt: new Date().toISOString()
                        });
                        triggerHeartConfetti();
                      }
                    }}
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${accentColor} hover:opacity-80 cursor-pointer`}
                  >
                    <span>{isSaved ? 'Saved' : item.actionText || 'Bookmark'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
