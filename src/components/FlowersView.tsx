import React, { useState } from 'react';
import { FlowerItem, BouquetItem, SavedHerItem } from '../types';
import { HER_FLOWERS, HER_BOUQUETS } from '../data/herContent';
import { Heart, Sparkles, RefreshCw, Bookmark, Check, ArrowLeft } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface FlowersViewProps {
  onBack: () => void;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
}

export const FlowersView: React.FC<FlowersViewProps> = ({
  onBack,
  onSaveItem,
  savedIds
}) => {
  // Store the active sentence index per flower id to support dynamic interactive rotation!
  const [activeSentenceMap, setActiveSentenceMap] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'flowers' | 'bouquets'>('flowers');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Cycle to next poetic sentence on click or hover
  const cycleSentence = (flowerId: string, max: number) => {
    setActiveSentenceMap(prev => ({
      ...prev,
      [flowerId]: ((prev[flowerId] || 0) + 1) % max
    }));
  };

  const handleCopySentence = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to explore</span>
          </button>

          {/* Toggle between Individual Flowers and Bouquets */}
          <div className="flex items-center p-1 bg-white/90 rounded-full border border-stone-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('flowers')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'flowers'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🌷 Individual Flowers ({HER_FLOWERS.length})
            </button>
            <button
              onClick={() => setActiveTab('bouquets')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'bouquets'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              💐 Bouquets For Her ({HER_BOUQUETS.length})
            </button>
          </div>
        </div>

        {/* Editorial Section Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-2">
            Emotional Discovery
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 leading-tight">
            Flowers that might feel a little like her.
          </h1>
          <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg">
            {activeTab === 'flowers' 
              ? 'Not just flowers to send, but quiet reflections of her spirit, grace, and temperament.'
              : 'Thoughtfully paired stems gathered to evoke a feeling, an unhurried morning, or profound affection.'
            }
          </p>
        </div>

        {/* TAB 1: INDIVIDUAL FLOWERS */}
        {activeTab === 'flowers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HER_FLOWERS.map(flower => {
              const currentSentenceIndex = activeSentenceMap[flower.id] || 0;
              const currentSentence = flower.emotionalSentences[currentSentenceIndex];
              const isSaved = savedIds.includes(flower.id);

              return (
                <div
                  key={flower.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Flower Portrait Photo */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    {/* Flower Name on Photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-rose-200 uppercase tracking-wider font-semibold">
                        <span>{flower.emoji}</span>
                        <span>Botanical Note</span>
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-white mt-0.5">
                        {flower.name}
                      </h3>
                    </div>

                    {/* Bookmark Save Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveItem({
                          id: flower.id,
                          type: 'flower',
                          title: flower.name,
                          subtitle: currentSentence,
                          description: flower.whySheMightLikeThis,
                          image: flower.image,
                          category: 'Flowers',
                          savedAt: new Date().toISOString()
                        });
                        triggerHeartConfetti();
                      }}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isSaved
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-white/90 text-stone-700 hover:bg-rose-50 hover:text-rose-600 shadow-sm'
                      }`}
                      title={isSaved ? 'Saved to collection' : 'Save this flower'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Emotional Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Interactive Rotating Dynamic Sentence */}
                      <div
                        onClick={() => cycleSentence(flower.id, flower.emotionalSentences.length)}
                        className="cursor-pointer bg-rose-50/50 hover:bg-rose-50/80 p-3.5 rounded-xl border border-rose-100/60 transition-colors group/quote relative"
                        title="Click to view another poetic line for her"
                      >
                        <p className="font-serif italic text-stone-800 text-base leading-snug">
                          {currentSentence}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-rose-600 font-medium">
                          <span className="inline-flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 group-hover/quote:rotate-180 transition-transform duration-500" />
                            <span>tap for another phrase ({currentSentenceIndex + 1}/{flower.emotionalSentences.length})</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopySentence(currentSentence, flower.id);
                            }}
                            className="hover:underline flex items-center gap-1"
                          >
                            {copiedId === flower.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">copied</span>
                              </>
                            ) : (
                              <span>copy</span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Why she might like this */}
                      <div className="mt-4">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                          Why she might like this
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {flower.whySheMightLikeThis}
                        </p>
                      </div>

                      {/* Vibe / Occasion */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          ✨ {flower.vibe}
                        </span>
                        {flower.occasion && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                            🤍 {flower.occasion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: BOUQUETS FOR HER */}
        {activeTab === 'bouquets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HER_BOUQUETS.map(bouquet => {
              const isSaved = savedIds.includes(bouquet.id);

              return (
                <div
                  key={bouquet.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                    <img
                      src={bouquet.image}
                      alt={bouquet.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Flower combination emojis */}
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-sm">
                      {bouquet.flowerIcons.map((icon, idx) => (
                        <span key={idx}>{icon}</span>
                      ))}
                    </div>

                    {/* Bookmark Save Action */}
                    <button
                      onClick={() => {
                        onSaveItem({
                          id: bouquet.id,
                          type: 'bouquet',
                          title: bouquet.name,
                          subtitle: bouquet.emotionalDesc,
                          description: bouquet.combination,
                          image: bouquet.image,
                          category: 'Bouquets',
                          savedAt: new Date().toISOString()
                        });
                        triggerHeartConfetti();
                      }}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isSaved
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-white/90 text-stone-700 hover:bg-rose-50 hover:text-rose-600 shadow-sm'
                      }`}
                      title={isSaved ? 'Saved to collection' : 'Save this bouquet'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-[11px] uppercase tracking-widest text-rose-200 font-semibold">Bouquet Combination</p>
                      <h3 className="font-serif text-2xl font-normal text-white">
                        {bouquet.name}
                      </h3>
                      <p className="text-xs text-stone-200 mt-0.5">
                        {bouquet.combination}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <p className="font-serif italic text-stone-800 text-lg leading-snug">
                        {bouquet.emotionalDesc}
                      </p>

                      <div className="mt-4 space-y-2 text-xs text-stone-600">
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px] w-16 pt-0.5">Vibe:</span>
                          <span className="flex-1 text-stone-700">{bouquet.vibe}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px] w-16 pt-0.5">Occasion:</span>
                          <span className="flex-1 text-stone-700">{bouquet.occasion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>Curated bundle</span>
                      <button
                        onClick={() => {
                          handleCopySentence(`${bouquet.name}: ${bouquet.emotionalDesc} (${bouquet.combination})`, bouquet.id);
                        }}
                        className="text-rose-600 font-medium hover:underline flex items-center gap-1"
                      >
                        {copiedId === bouquet.id ? 'Copied details ✓' : 'Copy arrangement idea →'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
