import React, { useState, useMemo } from 'react';
import { 
  HER_MAIN_CATEGORIES, 
  HER_FLOWERS, 
  HER_BUY_ITEMS, 
  HER_TELL_ITEMS, 
  HER_SURPRISE_ITEMS 
} from '../data/herContent';
import { HIM_PRODUCTS, HIM_IDEAS } from '../data/himData';
import { US_PRODUCTS, US_ACTIVITIES } from '../data/usData';
import { EXPLORE_ITEMS } from '../data/exploreData';
import { Search, X, Sparkles, ArrowRight, Heart, Dices } from 'lucide-react';
import { SavedHerItem, MainCategoryHer } from '../types';
import { useSession } from '../context/SessionContext';
import { triggerHeartConfetti } from '../utils/confetti';
import { isPersonalCreatorQuestion } from '../utils/personalQuestionDetector';
import { DeveloperQuestionPrompt } from './DeveloperQuestionPrompt';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: any) => void;
  onOpenFlowers: () => void;
  onSaveItem: (item: any) => void;
  onOpenSurpriseMe?: () => void;
  onDeveloperQuestionYes?: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenFlowers,
  onSaveItem,
  onOpenSurpriseMe,
  onDeveloperQuestionYes
}) => {
  const { person, recipientName } = useSession();
  const [query, setQuery] = useState('');

  // Check if current query is a personal creator question
  const isPersonalQuestion = useMemo(() => isPersonalCreatorQuestion(query), [query]);

  // Sample prompt chips tailored to current mode
  const suggestedQueries = person === 'HIM' ? [
    'something for him under ₹500',
    'he had a rough week at work',
    'desk accessories for gamer',
    'quiet date idea for him',
    'things to tell him to make him smile'
  ] : person === 'US' ? [
    'cheap date night for two',
    'screen-free evening together',
    'questions to ask each other',
    'weekend getaway planning',
    'shared coffee ritual'
  ] : [
    'flowers for a calm girl',
    'gift under ₹500',
    'she had a heavy day',
    'cute things to tell her',
    'she mentioned it once'
  ];

  // Natural Language Intent Extraction & Multi-Entity Grouping
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { ideas: [], toBuy: [], toSay: [], surprises: [], toDo: [] };

    const isPriceUnder500 = q.includes('500') || q.includes('cheap') || q.includes('budget') || q.includes('300');
    const isComfort = q.includes('sad') || q.includes('rough') || q.includes('heavy') || q.includes('bad') || q.includes('stress') || q.includes('tired');
    const isRomantic = q.includes('love') || q.includes('romantic') || q.includes('sweet') || q.includes('cute');

    // 1. Things to Buy
    const toBuy: any[] = [];
    if (person === 'HER' || person === 'US') {
      HER_BUY_ITEMS.forEach(item => {
        const itemTitle = (item.title || '').toLowerCase();
        const itemWhy = (item.whySheLikesIt || '').toLowerCase();
        const itemSub = item.subcategory || '';
        if (
          itemTitle.includes(q) ||
          itemWhy.includes(q) ||
          (isPriceUnder500 && item.priceCategory === 'under_500') ||
          (isComfort && (itemSub.includes('Cozy') || itemSub.includes('Self-Care')))
        ) {
          toBuy.push({ ...item, type: 'buy' });
        }
      });
    }
    if (person === 'HIM' || person === 'US') {
      HIM_PRODUCTS.forEach(item => {
        const itemTitle = (item.title || '').toLowerCase();
        const itemWhy = (item.whyHeLikesIt || (item as any).whySpecial || (item as any).description || '').toLowerCase();
        const itemTag = (item.interestTag || ((item as any).tags ? (item as any).tags.join(' ') : '') || '').toLowerCase();
        if (
          itemTitle.includes(q) ||
          itemWhy.includes(q) ||
          itemTag.includes(q) ||
          (isPriceUnder500 && ((item as any).priceCategory === 'under_500' || (item as any).budgetTier === 'under-500'))
        ) {
          toBuy.push({ ...item, type: 'buy' });
        }
      });
    }
    if (person === 'US') {
      US_PRODUCTS.forEach(item => {
        const itemTitle = (item.title || '').toLowerCase();
        const itemWhy = (item.whyForUs || (item as any).whySpecial || (item as any).description || '').toLowerCase();
        if (itemTitle.includes(q) || itemWhy.includes(q)) {
          toBuy.push({ ...item, type: 'buy' });
        }
      });
    }

    // 2. Things to Say
    const toSay: any[] = [];
    HER_TELL_ITEMS.forEach(item => {
      const itemMsg = (item.message || '').toLowerCase();
      const itemTitle = (item.title || '').toLowerCase();
      const itemCat = item.category || '';
      const itemVibe = item.vibe || '';
      if (
        itemMsg.includes(q) ||
        itemTitle.includes(q) ||
        (isComfort && (itemCat.includes('Reassurance') || itemCat.includes('Proud'))) ||
        (isRomantic && itemVibe.includes('Romantic')) ||
        q.includes('tell') || q.includes('say')
      ) {
        toSay.push({ ...item, type: 'message' });
      }
    });

    // 3. Surprises
    const surprises: any[] = [];
    HER_SURPRISE_ITEMS.forEach(item => {
      const itemTitle = (item.title || '').toLowerCase();
      const itemCute = (item.cuteExplanation || '').toLowerCase();
      if (
        itemTitle.includes(q) ||
        itemCute.includes(q) ||
        q.includes('surprise') ||
        (isComfort && (item.title || '').includes('Comfort'))
      ) {
        surprises.push({ ...item, type: 'surprise' });
      }
    });

    // 4. Things to Do
    const toDo: any[] = [];
    HIM_IDEAS.forEach(item => {
      const itemTitle = (item.title || '').toLowerCase();
      const itemDesc = (item.description || '').toLowerCase();
      if (itemTitle.includes(q) || itemDesc.includes(q) || q.includes('do') || q.includes('date')) {
        toDo.push({ ...item, type: 'idea' });
      }
    });
    US_ACTIVITIES.forEach(item => {
      const itemTitle = (item.title || '').toLowerCase();
      const itemDesc = (item.description || '').toLowerCase();
      if (itemTitle.includes(q) || itemDesc.includes(q) || q.includes('do') || q.includes('together')) {
        toDo.push({ ...item, type: 'idea' });
      }
    });

    // 5. General Ideas / Explore matches
    const ideas: any[] = [];
    EXPLORE_ITEMS.forEach(item => {
      const itemTitle = (item.title || '').toLowerCase();
      const itemDesc = (item.description || '').toLowerCase();
      const itemType = (item.sourceType || 'idea').toLowerCase();
      if (itemTitle.includes(q) || itemDesc.includes(q)) {
        ideas.push({ ...item, type: itemType });
      }
    });

    return {
      ideas: ideas.slice(0, 4),
      toBuy: toBuy.slice(0, 4),
      toSay: toSay.slice(0, 4),
      surprises: surprises.slice(0, 4),
      toDo: toDo.slice(0, 4)
    };
  }, [query, person]);

  if (!isOpen) return null;

  const totalResults = 
    searchResults.ideas.length + 
    searchResults.toBuy.length + 
    searchResults.toSay.length + 
    searchResults.surprises.length + 
    searchResults.toDo.length;

  const handleSaveResult = (item: any) => {
    onSaveItem({
      id: item.id || 'search-' + Date.now(),
      type: item.type || 'idea',
      sourceType: (item.type || 'idea').toUpperCase(),
      title: item.title,
      subtitle: item.subtitle || item.category || '',
      description: item.description || item.whyHeLikesIt || item.whySheLikesIt || item.message || '',
      image: item.image,
      category: item.category || 'Search',
      person,
      savedAt: new Date().toISOString()
    });
    triggerHeartConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-900/60 backdrop-blur-md animate-fade-in p-3 sm:p-6 overflow-y-auto">
      <div 
        className="w-full max-w-3xl mx-auto my-auto bg-[#FAF7F4] rounded-3xl border border-stone-200/80 shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-200/80">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a gift, a feeling, a moment, or an idea..."
            autoFocus
            className="flex-1 bg-transparent text-stone-900 font-serif text-lg sm:text-xl placeholder:text-stone-400 placeholder:font-sans placeholder:text-sm sm:placeholder:text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* When a personal question directed at the creator is detected */}
        {isPersonalQuestion ? (
          <DeveloperQuestionPrompt
            onYes={() => {
              if (onDeveloperQuestionYes) {
                onDeveloperQuestionYes();
              }
            }}
            onNo={() => {
              // Close the interaction and return to exact previous state
              setQuery('');
            }}
          />
        ) : (
          <>
            {/* Suggested Queries & Not Sure Option */}
            {!query && (
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2">
                Try searching intentions & feelings
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-rose-50 hover:text-rose-700 border border-stone-200 text-stone-700 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* "I'm not sure what I'm looking for" */}
            <div 
              onClick={() => {
                onClose();
                if (onOpenSurpriseMe) onOpenSurpriseMe();
              }}
              className="p-4 rounded-2xl bg-white border border-rose-200/80 hover:border-rose-400 shadow-2xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg">
                  <Dices className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-stone-900 font-medium">
                    ✨ I'm not sure what I'm looking for
                  </h4>
                  <p className="text-xs text-stone-500 font-serif italic">
                    Let Surprise Me guide you or roll an unexpected moment.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
                Surprise Me →
              </span>
            </div>
          </div>
        )}

        {/* Search Results Area Grouped */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-6">
          {query && totalResults === 0 && (
            <div className="text-center py-12 text-stone-500">
              <p className="font-serif italic text-lg">No exact matches found for “{query}”</p>
              <p className="text-xs text-stone-400 mt-1">Try describing how they are feeling, like “stressed” or “romantic”.</p>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenSurpriseMe) onOpenSurpriseMe();
                }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                <span>Try Surprise Me instead →</span>
              </button>
            </div>
          )}

          {/* Group 1: 🎁 Things to Buy */}
          {searchResults.toBuy.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600 mb-2.5">
                🎁 Things to Buy ({searchResults.toBuy.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.toBuy.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                      )}
                      <div>
                        <h5 className="text-sm font-medium text-stone-900">{item.title}</h5>
                        <p className="text-xs text-rose-600 font-semibold">{item.priceDisplay}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveResult(item)}
                      className="p-1.5 rounded-full border border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200 cursor-pointer transition-colors"
                      title="Save"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: 💌 Things to Say */}
          {searchResults.toSay.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600 mb-2.5">
                💌 Things to Tell {recipientName} ({searchResults.toSay.length})
              </p>
              <div className="space-y-2.5">
                {searchResults.toSay.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200/80 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-rose-600">{item.category}</p>
                      <p className="font-serif italic text-stone-800 text-sm mt-1">“{item.message}”</p>
                    </div>
                    <button
                      onClick={() => handleSaveResult(item)}
                      className="p-1.5 rounded-full border border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200 shrink-0 cursor-pointer"
                      title="Save"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 3: 📍 Things to Do */}
          {searchResults.toDo.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600 mb-2.5">
                📍 Things to Do ({searchResults.toDo.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.toDo.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200/80 flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-serif text-base text-stone-900 font-medium">{item.title}</h5>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleSaveResult(item)}
                      className="p-1.5 rounded-full border border-stone-200 text-stone-400 hover:text-rose-600 shrink-0 cursor-pointer"
                      title="Save"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 4: ✨ Surprises */}
          {searchResults.surprises.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600 mb-2.5">
                ✨ Ways to Surprise ({searchResults.surprises.length})
              </p>
              <div className="space-y-2.5">
                {searchResults.surprises.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200/80 flex items-start justify-between gap-3">
                    <div>
                      <h5 className="font-serif text-base text-stone-900 font-medium">{item.title}</h5>
                      <p className="text-xs text-stone-600 font-serif italic mt-0.5">{item.cuteExplanation}</p>
                    </div>
                    <button
                      onClick={() => handleSaveResult(item)}
                      className="p-1.5 rounded-full border border-stone-200 text-stone-400 hover:text-rose-600 shrink-0 cursor-pointer"
                      title="Save"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 5: ♡ Ideas */}
          {searchResults.ideas.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600 mb-2.5">
                ♡ Ideas & Inspirations ({searchResults.ideas.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.ideas.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                      )}
                      <div>
                        <h5 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.title}</h5>
                        <p className="text-[11px] text-stone-500 font-serif italic line-clamp-1">{item.subtitle || item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveResult(item)}
                      className="p-1.5 rounded-full border border-stone-200 text-stone-400 hover:text-rose-600 shrink-0 cursor-pointer"
                      title="Save"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
          </>
        )}

      </div>
    </div>
  );
};
