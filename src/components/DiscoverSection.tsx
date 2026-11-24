import React, { useState, useMemo } from 'react';
import { Compass, Clock, Coins, Sparkles, Heart, Search, ArrowRight, Filter } from 'lucide-react';
import { DiscoverItem } from '../types';
import { DISCOVER_ITEMS } from '../data/discover';
import { isPersonalCreatorQuestion } from '../utils/personalQuestionDetector';
import { DeveloperQuestionPrompt } from './DeveloperQuestionPrompt';

interface DiscoverSectionProps {
  onSelectAction: (actionType: string, title: string) => void;
  onDeveloperQuestionYes?: () => void;
}

const TAG_FILTERS = [
  { id: 'all', label: 'All Ideas' },
  { id: 'romantic', label: '❤️ Romantic' },
  { id: 'funny', label: '😂 Funny' },
  { id: 'surprises', label: '🎁 Surprises' },
  { id: 'budget', label: '💰 Budget-Friendly' },
  { id: 'home', label: '🏠 At Home' },
  { id: 'long_distance', label: '🌎 Long-Distance' },
  { id: 'anniversary', label: '💍 Anniversary' },
  { id: 'just_because', label: '🌹 Just Because' },
];

export const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  onSelectAction,
  onDeveloperQuestionYes
}) => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isPersonalQuestion = useMemo(() => isPersonalCreatorQuestion(searchQuery), [searchQuery]);

  const filteredItems = DISCOVER_ITEMS.filter(item => {
    const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag as any);
    const q = (searchQuery || '').trim().toLowerCase();
    const matchesSearch = !q ||
      (item.title || '').toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-rose-500" />
          <span>Curated Inspiration Library</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-800 tracking-tight mb-3">
          Discover Thoughtful Gestures
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
          Explore hundreds of little moments, romantic dates, surprise crafts, and sweet habits to brighten their world.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-[32px] border border-stone-100 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ideas (e.g. massage, long distance, handwritten, chai, movie night)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-stone-50 border border-stone-100 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TAG_FILTERS.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-100'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

      </div>

      {/* Content Area: Either Personal Question Prompt OR Discover Cards */}
      {isPersonalQuestion ? (
        <DeveloperQuestionPrompt
          onYes={() => {
            if (onDeveloperQuestionYes) {
              onDeveloperQuestionYes();
            }
          }}
          onNo={() => {
            setSearchQuery('');
          }}
        />
      ) : (
        /* Grid of Discover Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-7 shadow-sm hover:border-rose-100 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
                      <Clock className="w-3 h-3 text-rose-500" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
                      <Coins className="w-3 h-3 text-emerald-500" />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl font-semibold text-stone-800 group-hover:text-rose-600 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                  {item.category.replace('_', ' ')}
                </span>
                <button
                  onClick={() => onSelectAction(item.actionType, item.title)}
                  className="px-4 py-1.5 rounded-full bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Do This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
