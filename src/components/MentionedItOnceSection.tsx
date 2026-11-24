import React, { useState } from 'react';
import { Heart, Sparkles, Plus, ArrowRight, Bookmark } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { triggerHeartConfetti } from '../utils/confetti';
import { getHerImage } from '../data/her/images';
import { getHimImage } from '../data/him/images';
import { getUsImage } from '../data/us/images';

interface MentionedItOnceSectionProps {
  onSaveItem: (item: any) => void;
  savedIds: string[];
}

export const MentionedItOnceSection: React.FC<MentionedItOnceSectionProps> = ({
  onSaveItem,
  savedIds
}) => {
  const { person, recipientName } = useSession();

  const [customTitle, setCustomTitle] = useState('');
  const [whyReminded, setWhyReminded] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const pronoun = person === 'HER' ? 'she' : person === 'HIM' ? 'he' : 'we';
  const objectPronoun = person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'us';
  const possessive = person === 'HER' ? 'her' : person === 'HIM' ? 'his' : 'our';

  const defaultSuggestions = person === 'HER' ? [
    {
      id: 'mention-her-1',
      title: 'Vanilla Bean & Sea Salt Chocolate Bar',
      contextSnippet: '“She stopped in front of the specialty shop and mentioned she craved salted chocolate with her coffee.”',
      image: getHerImage('treat').url
    },
    {
      id: 'mention-her-2',
      title: 'Dainty Gold Starburst Huggie Earrings',
      contextSnippet: '“She admired a friend’s small huggies three weeks ago and whispered she wanted a subtle pair.”',
      image: getHerImage('ribbon_jewelry').url
    },
    {
      id: 'mention-her-3',
      title: 'Aesthetic Ceramic French Press',
      contextSnippet: '“She said instant coffee was getting boring and wanted a slow, cozy Sunday brew ritual.”',
      image: getHerImage('coffee_mug').url
    }
  ] : person === 'HIM' ? [
    {
      id: 'mention-him-1',
      title: 'Ergonomic Memory Foam Wrist Rest & Desk Mat',
      contextSnippet: '“He rubbed his wrists after gaming or coding last Tuesday and sighed about fatigue.”',
      image: getHimImage('desk_mat').url
    },
    {
      id: 'mention-him-2',
      title: 'Spicy Chili Crunch Oil Jar & Snack Run',
      contextSnippet: '“He saw a street food video and said he wanted to drizzle crispy chili oil over his eggs.”',
      image: getHimImage('comfort_food').url
    },
    {
      id: 'mention-him-3',
      title: 'Matte Titanium Bolt-Action Pen',
      contextSnippet: '“He couldn’t find a good everyday carry pen to keep in his bag and said he needed one that lasts.”',
      image: getHimImage('pen').url
    }
  ] : [
    {
      id: 'mention-us-1',
      title: 'Cozy Kitchen Recipe Challenge',
      contextSnippet: '“We saw fresh handmade gnocchi and said we’d attempt making it from scratch together on a Sunday.”',
      image: getUsImage('cooking').url
    },
    {
      id: 'mention-us-2',
      title: 'A Real Instant Print Camera',
      contextSnippet: '“We were reminiscing about tangible photos and wished we kept real prints on our fridge.”',
      image: getUsImage('instant_camera').url
    },
    {
      id: 'mention-us-3',
      title: 'Card Game for Deep Conversations',
      contextSnippet: '“We stayed up until 2 AM talking and said we loved when evenings felt unhurried and deep.”',
      image: getUsImage('board_game').url
    }
  ];

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const fallbackImg = person === 'HIM' 
      ? getHimImage('comfort_food').url 
      : person === 'US' 
        ? getUsImage('instant_camera').url 
        : getHerImage('ribbon_jewelry').url;

    onSaveItem({
      id: 'mention-custom-' + Date.now(),
      type: 'buy',
      sourceType: 'PRODUCT',
      title: customTitle.trim(),
      subtitle: whyReminded.trim() || `Mentioned once by ${recipientName}`,
      description: whyReminded.trim() || `Remembered from passing conversation.`,
      whyReminded: whyReminded.trim(),
      image: fallbackImg,
      category: 'Mentioned Once',
      person,
      savedAt: new Date().toISOString()
    });

    triggerHeartConfetti();
    setCustomTitle('');
    setWhyReminded('');
    setIsAdding(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-10 shadow-2xs">
        
        {/* Header */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>💭</span>
            <span>Unspoken Romance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 leading-snug">
            {person === 'HER' ? 'She' : person === 'HIM' ? 'He' : 'We'} mentioned it once…
          </h2>
          <p className="mt-2 text-stone-600 font-serif italic text-sm sm:text-base leading-relaxed">
            Because remembering what {pronoun} told you in passing is the highest form of showing up.
          </p>
        </div>

        {/* Input box to record a quick whisper / memory */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FAF7F4] border border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Record a little passing hint from {recipientName}
            </span>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              {isAdding ? 'Close form' : '+ Record an item'}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleSaveCustom} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={`What did ${pronoun} mention? (e.g. lavender pillow spray, mechanical pencil, that ramen place...)`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-rose-400"
                  required
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  value={whyReminded}
                  onChange={(e) => setWhyReminded(e.target.value)}
                  placeholder={`Why did this remind you of ${objectPronoun}? (e.g. She stopped and pointed at it while we were walking last Friday)`}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-rose-400 resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to My Little Things ♡</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3 Editorial Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {defaultSuggestions.map((item) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-stone-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-stone-600 font-serif italic leading-relaxed">
                    {item.contextSnippet}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-serif italic">
                    Quiet passing detail
                  </span>
                  <button
                    onClick={() => {
                      onSaveItem({
                        id: item.id,
                        type: 'buy',
                        sourceType: 'PRODUCT',
                        title: item.title,
                        subtitle: item.contextSnippet,
                        description: item.contextSnippet,
                        whyReminded: item.contextSnippet,
                        image: item.image,
                        category: 'Mentioned Once',
                        person,
                        savedAt: new Date().toISOString()
                      });
                      triggerHeartConfetti();
                    }}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200'
                    }`}
                    title="Save to My Little Things"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
