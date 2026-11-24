import React from 'react';
import { Sparkles, Heart, ArrowRight, Edit3 } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { getSemanticImage } from '../data/imageRegistry';
import { triggerHeartConfetti } from '../utils/confetti';

interface PersonalizedForYouSectionProps {
  onSaveItem?: (item: any) => void;
  onMakeItYours?: (item: any) => void;
}

export const PersonalizedForYouSection: React.FC<PersonalizedForYouSectionProps> = ({
  onSaveItem,
  onMakeItYours
}) => {
  const { person, recipientName, memories } = useSession();

  const title = person === 'HIM' 
    ? 'A few things that feel like him 🖤'
    : person === 'US'
    ? 'Things that feel like us ♡'
    : `Made for ${recipientName || 'her'} ♡`;

  const memoryCount = memories.filter(m => m.person === (person || 'HER')).length;

  const items = person === 'HIM' ? [
    {
      id: 'foryou-him-1',
      title: 'The Unsolicited Cold Brew Delivery',
      desc: 'Deliver his favorite cold steep coffee to his desk right during his 3 PM energy dip with zero expectations attached.',
      why: 'Speaks to everyday rituals he values without turning it into a heavy production.',
      imageKey: 'cold-brew',
      tag: 'Everyday Care'
    },
    {
      id: 'foryou-him-2',
      title: 'A Quiet Late-Night Highway Drive',
      desc: 'Invite him for a 30-minute drive with the windows cracked and his favorite album playing. Don’t force conversation.',
      why: 'Men decompress through shared movement and presence rather than forced debriefs.',
      imageKey: 'car-drive',
      tag: 'Shared Moment'
    },
    {
      id: 'foryou-him-3',
      title: 'Specific Skill Appreciation Note',
      desc: 'Write 2 lines commending a problem he solved or a quiet effort he made this week that went otherwise unnoticed.',
      why: 'Being noticed for his quiet competence stays with a man for weeks.',
      imageKey: 'appreciation-note',
      tag: 'Words'
    }
  ] : person === 'US' ? [
    {
      id: 'foryou-us-1',
      title: 'Living Room Vinyl & Tea Hour',
      desc: 'Phones into a drawer. Dim table lamp, kettle on for chamomile or jasmine tea, and reading or talking softly.',
      why: 'Protects a sacred pocket of undivided attention in a world full of notifications.',
      imageKey: 'blanket',
      tag: 'Shared Ritual'
    },
    {
      id: 'foryou-us-2',
      title: 'The Sunday Morning Bakery Walk',
      desc: 'Wake up early, skip rushing, and walk hand-in-hand to a local bakery to split warm pastries.',
      why: 'Simple shared routines build the happiest relationship memories over years.',
      imageKey: 'pastry',
      tag: 'Two-Player Date'
    },
    {
      id: 'foryou-us-3',
      title: 'The "Remember Our First..." Memory Card',
      desc: 'Leave a folded card on their pillow with the exact date and location of your first shared breakthrough moment.',
      why: 'Honoring your origin story deepens the emotional anchor of where you are now.',
      imageKey: 'polaroid',
      tag: 'Nostalgia'
    }
  ] : [
    {
      id: 'foryou-her-1',
      title: 'Single Pink Tulip + Matcha Hand-Off',
      desc: 'Pick up one fresh stem tied with twine and her favorite cold drink. Leave it gently on her desk.',
      why: 'Effortless, aesthetic, and brings immediate visual softness into an otherwise routine day.',
      imageKey: 'pink_tulip',
      tag: 'Gentle Gesture'
    },
    {
      id: 'foryou-her-2',
      title: 'The Scented Coat Pocket Note',
      desc: 'Tuck a 3-sentence note into her handbag or coat pocket: “Just in case you need a reminder of how deeply you are loved.”',
      why: 'Surprise discovery in private spaces touches the nervous system with profound comfort.',
      imageKey: 'letter',
      tag: 'Quiet Word'
    },
    {
      id: 'foryou-her-3',
      title: 'Unhurried Evening Foot Soak & Quiet',
      desc: 'Warm basin with lavender and a warm towel. Say: “You don’t have to answer any questions or make any choices tonight.”',
      why: 'Releases the invisible mental load she has carried all day.',
      imageKey: 'bath_salts',
      tag: 'Comfort'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Personalized For You</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            {title}
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mt-1">
            {memoryCount > 0 
              ? `Based on what you’ve shared with us and ${memoryCount} saved memory note${memoryCount === 1 ? '' : 's'}.`
              : `Curated small things designed to make an ordinary day feel deeply intentional.`
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const img = getSemanticImage(item.imageKey);
          return (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-medium text-stone-800 shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-normal text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                    <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider block mb-0.5">
                      Why it fits
                    </span>
                    <p className="text-xs text-stone-700 font-serif italic">
                      “{item.why}”
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onMakeItYours && onMakeItYours(item)}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Make It Yours</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerHeartConfetti();
                    if (onSaveItem) {
                      onSaveItem({
                        id: item.id,
                        type: 'idea',
                        title: item.title,
                        description: item.desc,
                        image: img,
                        category: item.tag,
                        savedAt: new Date().toISOString()
                      });
                    }
                  }}
                  className="p-2 rounded-full hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Save to My Little Things"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
