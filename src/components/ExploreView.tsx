import React, { useState } from 'react';
import { Heart, Sparkles, ArrowLeft, ArrowRight, Bookmark, Filter } from 'lucide-react';
import { EXPLORE_SECTIONS, EXPLORE_ITEMS, ExploreCardItem } from '../data/exploreData';
import { useSession } from '../context/SessionContext';
import { usePresentationStyle } from '../context/PresentationStyleContext';
import { triggerHeartConfetti } from '../utils/confetti';
import { MakeItYoursModal } from './MakeItYoursModal';

interface ExploreViewProps {
  onBack: () => void;
  onSaveItem: (item: any) => void;
  savedIds: string[];
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onBack,
  onSaveItem,
  savedIds
}) => {
  const { person, recipientName } = useSession();
  const { formatDecorated } = usePresentationStyle();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedForPersonalize, setSelectedForPersonalize] = useState<ExploreCardItem | null>(null);

  const filteredItems = EXPLORE_ITEMS.filter(item => {
    if (activeFilter !== 'all' && item.section !== activeFilter) return false;
    if (item.personTarget && item.personTarget !== 'ALL' && item.personTarget !== person) return false;
    return true;
  });

  const handleQuickSave = (item: ExploreCardItem) => {
    onSaveItem({
      id: item.id,
      type: (item.sourceType || 'idea').toLowerCase(),
      sourceType: item.sourceType,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      image: item.image,
      category: item.category,
      person,
      savedAt: new Date().toISOString()
    });
    triggerHeartConfetti();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] pb-24">
      
      {/* Top Banner */}
      <div className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold">
                Curated Feed
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                Explore Little Things
              </h1>
            </div>
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Sections
            </button>
            {EXPLORE_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveFilter(sec.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === sec.id
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Pinterest-Style Editorial Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Intro */}
        <div className="mb-8">
          <p className="font-serif italic text-stone-600 text-base sm:text-lg">
            A quiet collection of gestures, words, and tokens that make an ordinary Tuesday feel cherished.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-white border border-stone-200/80 p-5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 bg-stone-100 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase">
                          {item.badge}
                        </span>
                      )}
                      {item.price && (
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold shadow-xs">
                          {item.price}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-stone-900 leading-snug">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-1 font-serif italic text-xs text-stone-500">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedForPersonalize(item)}
                    className="text-xs font-medium text-stone-800 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Make It Yours →</span>
                  </button>

                  <button
                    onClick={() => handleQuickSave(item)}
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

      {/* Make It Yours Modal */}
      {selectedForPersonalize && (
        <MakeItYoursModal
          isOpen={true}
          onClose={() => setSelectedForPersonalize(null)}
          itemTitle={selectedForPersonalize.title}
          originalText={selectedForPersonalize.description}
          sourceType={selectedForPersonalize.sourceType}
          onSavePersonalized={(note, customizedText) => {
            onSaveItem({
              id: 'pers-' + selectedForPersonalize.id + '-' + Date.now(),
              type: (selectedForPersonalize.sourceType || 'idea').toLowerCase(),
              sourceType: selectedForPersonalize.sourceType,
              title: selectedForPersonalize.title,
              subtitle: `Personalized for ${recipientName}`,
              description: customizedText,
              image: selectedForPersonalize.image,
              personalNote: note,
              category: selectedForPersonalize.category,
              person,
              savedAt: new Date().toISOString()
            });
            setSelectedForPersonalize(null);
          }}
        />
      )}

    </div>
  );
};
