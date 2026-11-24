import React, { useState, useMemo } from 'react';
import { 
  BUY_CATEGORIES, 
  SPECIAL_COLLECTIONS, 
  BUY_PRODUCTS, 
  BuyProduct, 
  searchAndFilterProducts, 
  getSmartRecommendations 
} from '../data/toBuyForHerData';
import { SavedHerItem } from '../types';
import { 
  Search, Heart, Sparkles, Filter, X, ChevronDown, ChevronUp, 
  Gift, ArrowRight, Check, Compass, SlidersHorizontal, RefreshCw, Send
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface ToBuyForHerViewProps {
  onBack: () => void;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
  onOpenFlowers?: () => void;
}

export const ToBuyForHerView: React.FC<ToBuyForHerViewProps> = ({
  onBack,
  onSaveItem,
  savedIds,
  onOpenFlowers
}) => {
  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedVibe, setSelectedVibe] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [activeSpecialCollection, setActiveSpecialCollection] = useState<string | null>(null);

  // Expanded "Why she'd like it" cards
  const [expandedWhyId, setExpandedWhyId] = useState<string | null>(null);

  // "Tell me about her" AI / Smart Discovery
  const [aboutHerPrompt, setAboutHerPrompt] = useState('');
  const [isConsultingAi, setIsConsultingAi] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Array<{
    product: BuyProduct;
    whyItSuitsHer: string;
    presentationTip: string;
  }> | null>(null);

  // Mobile filters drawer toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return searchAndFilterProducts(
      BUY_PRODUCTS,
      searchQuery,
      selectedCategory,
      selectedBudget,
      selectedVibe,
      selectedOccasion,
      selectedPersona,
      activeSpecialCollection || ''
    );
  }, [
    searchQuery,
    selectedCategory,
    selectedBudget,
    selectedVibe,
    selectedOccasion,
    selectedPersona,
    activeSpecialCollection
  ]);

  const handleSpecialCollectionClick = (collection: typeof SPECIAL_COLLECTIONS[0]) => {
    if (activeSpecialCollection === collection.filterValue) {
      // Toggle off
      setActiveSpecialCollection(null);
      setSelectedBudget('all');
      setSelectedPersona('all');
    } else {
      setActiveSpecialCollection(collection.filterValue);
      // Reset generic single category to show collection items across categories
      setSelectedCategory('all');

      if (collection.filterType === 'budget') {
        setSelectedBudget(collection.filterValue);
        setSelectedPersona('all');
      } else if (collection.filterType === 'persona') {
        setSelectedPersona(collection.filterValue);
        setSelectedBudget('all');
      } else if (collection.filterType === 'zero') {
        setSelectedBudget('0');
        setSelectedPersona('all');
      } else {
        setSelectedBudget('all');
        setSelectedPersona('all');
      }
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBudget('all');
    setSelectedVibe('all');
    setSelectedOccasion('all');
    setSelectedPersona('all');
    setActiveSpecialCollection(null);
  };

  const handleSaveProduct = (product: BuyProduct) => {
    onSaveItem({
      id: product.id,
      type: 'buy',
      title: product.name,
      subtitle: product.priceDisplay,
      description: product.emotionalLine || product.description,
      image: product.image,
      category: 'To Buy For Her',
      savedAt: new Date().toISOString()
    });
    triggerHeartConfetti();
  };

  const handleConsultAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutHerPrompt.trim()) return;

    setIsConsultingAi(true);

    // Fast, resilient intelligent catalog matcher
    setTimeout(() => {
      const recs = getSmartRecommendations(aboutHerPrompt, BUY_PRODUCTS);
      setAiRecommendations(recs);
      setIsConsultingAi(false);
    }, 600);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedBudget !== 'all',
    selectedVibe !== 'all',
    selectedOccasion !== 'all',
    selectedPersona !== 'all',
    activeSpecialCollection !== null,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FCFAF8] text-stone-800 pb-28">
      {/* 1. EDITORIAL HEADER SECTION */}
      <div className="pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-stone-200/60">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 text-2xl shadow-xs border border-rose-100/80 mb-4 animate-in fade-in zoom-in duration-500">
          🎁
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-stone-900 uppercase">
          TO BUY FOR HER
        </h1>

        <p className="mt-3 text-base sm:text-lg md:text-xl font-serif italic text-stone-600 max-w-2xl mx-auto">
          “Things you might see and immediately think of her.”
        </p>

        <p className="mt-2 text-xs sm:text-sm font-sans tracking-wide text-rose-500 uppercase font-medium">
          Something tiny. Something thoughtful. Something she'd love.
        </p>

        {/* Quick Back & Stats bar */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="text-xs font-medium text-stone-600 hover:text-stone-900 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs transition-all hover:bg-stone-50"
          >
            ← Back to Overview
          </button>
          <span className="text-xs text-stone-400">•</span>
          <span className="text-xs text-stone-500 font-medium">
            {BUY_PRODUCTS.length}+ Thoughtful Discoveries
          </span>
          {onOpenFlowers && (
            <>
              <span className="text-xs text-stone-400">•</span>
              <button
                onClick={onOpenFlowers}
                className="text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
              >
                🌷 Flower Guide
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. "TELL ME ABOUT HER" - AI & SMART DISCOVERY WIDGET */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-5 mb-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-rose-100 p-5 sm:p-7 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
              ✨
            </span>
            <h2 className="font-serif text-lg sm:text-xl text-stone-900">
              Tell me about her
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
            Describe what she likes, her daily rituals, or your budget (e.g. <span className="italic text-rose-600">“She loves flowers, books and pastel colors. My budget is ₹800.”</span>) and we will find the pieces that feel like her.
          </p>

          <form onSubmit={handleConsultAi} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-grow">
              <input
                type="text"
                value={aboutHerPrompt}
                onChange={(e) => setAboutHerPrompt(e.target.value)}
                placeholder="What makes her smile? What does she love? Any budget?"
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all"
              />
              {aboutHerPrompt && (
                <button
                  type="button"
                  onClick={() => setAboutHerPrompt('')}
                  className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isConsultingAi || !aboutHerPrompt.trim()}
              className="bg-stone-900 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold px-5 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
            >
              {isConsultingAi ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Thinking of her...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  Find What Fits Her
                </>
              )}
            </button>
          </form>

          {/* AI / Smart Recommendations Results */}
          {aiRecommendations && (
            <div className="mt-6 pt-5 border-t border-rose-100 animate-in fade-in slide-in-from-top-3 duration-400">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Curated for Her Profile
                </p>
                <button
                  onClick={() => setAiRecommendations(null)}
                  className="text-xs text-stone-400 hover:text-stone-600 underline"
                >
                  Dismiss
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiRecommendations.map(({ product, whyItSuitsHer, presentationTip }) => {
                  const isSaved = savedIds.includes(product.id);
                  return (
                    <div
                      key={`ai-rec-${product.id}`}
                      className="bg-[#FFFDFB] border border-rose-100/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                    >
                      <div className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200/60"
                        />
                        <div className="flex-grow min-w-0">
                          <span className="text-[10px] font-semibold tracking-wider text-rose-500 uppercase">
                            {product.subcategory}
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs font-medium text-stone-700 mt-0.5">
                            {product.priceDisplay}
                          </p>
                          <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 italic">
                            “{whyItSuitsHer}”
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-rose-50 flex items-center justify-between">
                        <p className="text-[10px] text-stone-500 line-clamp-1 italic max-w-[200px]">
                          Tip: {presentationTip}
                        </p>
                        <button
                          onClick={() => handleSaveProduct(product)}
                          className={`p-1.5 rounded-full transition-all ${
                            isSaved
                              ? 'bg-rose-500 text-white'
                              : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          }`}
                          title="Save to My Little Things"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. VISUAL 16-CATEGORY EXPLORER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900">
              Visual Category Explorer
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Explore 16 romantic editorial atmospheres tailored to her taste
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
            >
              Show all categories
            </button>
          )}
        </div>

        {/* Categories Grid (Desktop) & Horizontal Scroll (Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {BUY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategory('all');
                  } else {
                    setSelectedCategory(cat.id);
                    setActiveSpecialCollection(null);
                  }
                }}
                className={`group text-left relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-end p-3 h-36 sm:h-40 border ${
                  isSelected
                    ? 'ring-2 ring-rose-500 border-transparent shadow-md scale-[1.02]'
                    : 'border-stone-200/80 hover:border-rose-300 hover:shadow-md'
                }`}
              >
                {/* Background Image with Warm Gradient Overlay */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected
                    ? 'bg-gradient-to-t from-stone-950/90 via-stone-900/50 to-transparent'
                    : 'bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/10 group-hover:opacity-85'
                }`} />

                {/* Content Overlay */}
                <div className="relative z-10">
                  <span className="text-base sm:text-lg mb-1 block">
                    {cat.emoji}
                  </span>
                  <h3 className="font-serif text-xs sm:text-sm font-medium text-white leading-tight line-clamp-2">
                    {cat.name.replace(/^[^\s]+\s+/, '')}
                  </h3>
                  <p className="text-[10px] text-stone-300/90 mt-0.5 font-sans line-clamp-1 hidden sm:block">
                    {cat.itemCount} items
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SPECIAL CURATED COLLECTIONS BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-stone-500">
            Curated Vibes & Special Collections
          </p>
          {activeSpecialCollection && (
            <button
              onClick={() => setActiveSpecialCollection(null)}
              className="text-xs text-rose-600 hover:underline"
            >
              Clear collection filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SPECIAL_COLLECTIONS.map((col) => {
            const isActive = activeSpecialCollection === col.filterValue;
            return (
              <button
                key={col.id}
                onClick={() => handleSpecialCollectionClick(col)}
                className={`group px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-700 border-stone-200'
                }`}
                title={col.subtitle}
              >
                <span>{col.emoji}</span>
                <span>{col.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. SEARCH & FILTER CONTROLS */}
      <div className="sticky top-0 z-30 bg-[#FCFAF8]/95 backdrop-blur-md border-y border-stone-200/80 py-3.5 px-4 sm:px-6 lg:px-8 shadow-2xs mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Intelligent Search Input */}
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by what she loves, e.g. books, pastel colors, under ₹500..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-full text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-300 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Filter Dropdowns */}
          <div className="hidden md:flex items-center gap-2">
            {/* Budget */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              aria-label="Filter by Budget"
              className="text-xs bg-white border border-stone-200 rounded-full px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-rose-300"
            >
              <option value="all">Any Budget</option>
              <option value="0">₹0 Gifts (Acts & Keepsakes)</option>
              <option value="under_300">Under ₹300</option>
              <option value="300_500">₹300 – ₹500</option>
              <option value="500_1000">₹500 – ₹1,000</option>
              <option value="1000_2000">₹1,000 – ₹2,000</option>
              <option value="2000_plus">₹2,000+</option>
            </select>

            {/* Vibe */}
            <select
              value={selectedVibe}
              onChange={(e) => setSelectedVibe(e.target.value)}
              aria-label="Filter by Vibe"
              className="text-xs bg-white border border-stone-200 rounded-full px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-rose-300"
            >
              <option value="all">Any Vibe</option>
              <option value="Cute">Cute</option>
              <option value="Soft">Soft</option>
              <option value="Romantic">Romantic</option>
              <option value="Elegant">Elegant</option>
              <option value="Minimal">Minimal</option>
              <option value="Cozy">Cozy</option>
              <option value="Playful">Playful</option>
              <option value="Luxury">Luxury</option>
              <option value="Trendy">Trendy</option>
            </select>

            {/* Occasion */}
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              aria-label="Filter by Occasion"
              className="text-xs bg-white border border-stone-200 rounded-full px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-rose-300"
            >
              <option value="all">Any Occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Valentine's Day">Valentine's Day</option>
              <option value="Just Because">Just Because</option>
              <option value="Bad Day">Cheer-Up / Bad Day</option>
              <option value="Celebration">Celebration</option>
              <option value="First Date">First Date</option>
              <option value="Long Distance">Long Distance</option>
            </select>

            {/* Reset */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-stone-500 hover:text-rose-600 underline px-2 py-1 flex items-center gap-1"
              >
                Reset ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex md:hidden items-center justify-between">
            <span className="text-xs text-stone-500">
              Showing {filteredProducts.length} items
            </span>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-1 text-xs font-medium bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs text-stone-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Filter Drawer / Collapse */}
        {showMobileFilters && (
          <div className="md:hidden pt-3 mt-3 border-t border-stone-200/70 grid grid-cols-2 gap-2 animate-in fade-in duration-200">
            <div>
              <label className="text-[10px] font-semibold uppercase text-stone-400 block mb-1">
                Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full text-xs bg-white border border-stone-200 rounded-xl p-2 text-stone-700"
              >
                <option value="all">Any Budget</option>
                <option value="0">₹0 Gifts</option>
                <option value="under_300">Under ₹300</option>
                <option value="300_500">₹300 – ₹500</option>
                <option value="500_1000">₹500 – ₹1,000</option>
                <option value="1000_2000">₹1,000 – ₹2,000</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase text-stone-400 block mb-1">
                Vibe
              </label>
              <select
                value={selectedVibe}
                onChange={(e) => setSelectedVibe(e.target.value)}
                className="w-full text-xs bg-white border border-stone-200 rounded-xl p-2 text-stone-700"
              >
                <option value="all">Any Vibe</option>
                <option value="Cute">Cute</option>
                <option value="Soft">Soft</option>
                <option value="Romantic">Romantic</option>
                <option value="Cozy">Cozy</option>
                <option value="Minimal">Minimal</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase text-stone-400 block mb-1">
                Occasion
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full text-xs bg-white border border-stone-200 rounded-xl p-2 text-stone-700"
              >
                <option value="all">Any Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Valentine's Day">Valentine's Day</option>
                <option value="Just Because">Just Because</option>
                <option value="Bad Day">Bad Day</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetAllFilters}
                className="w-full text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl p-2 font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. EDITORIAL PRODUCT GRID (PINTEREST-INSPIRED) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 p-8">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl mb-3">
              🌸
            </div>
            <h3 className="font-serif text-lg text-stone-800">
              No matching pieces found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or clearing some filters to explore more of her collection.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full transition-all"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isSaved = savedIds.includes(product.id);
              const isExpanded = expandedWhyId === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/70 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image Container with Exact Imagery */}
                  <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Price Pill */}
                    <div className="absolute top-2.5 left-2.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-stone-800 shadow-xs">
                      {product.priceDisplay}
                    </div>

                    {/* Save Button (♡) */}
                    <button
                      onClick={() => handleSaveProduct(product)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                        isSaved
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-white/90 text-stone-700 hover:bg-rose-50 hover:text-rose-600 shadow-xs'
                      }`}
                      title={isSaved ? 'Saved in My Little Things' : 'Save this for her'}
                      aria-label="Save for her"
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    {/* Personalized / Mentioned Tag */}
                    {product.isPersonalized && (
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-md text-[9px] font-medium text-white">
                        Personalized
                      </div>
                    )}
                    {product.sheMentionedOnce && !product.isPersonalized && (
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-900/80 backdrop-blur-md text-[9px] font-medium text-white">
                        She mentioned it
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-3.5 sm:p-5 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Vibe Tags */}
                      <div className="flex flex-wrap items-center gap-1 mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-500">
                          {product.subcategory}
                        </span>
                        <span className="text-[10px] text-stone-300">•</span>
                        <span className="text-[10px] text-stone-500">
                          {product.vibes.slice(0, 2).join(' • ')}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif text-sm sm:text-base font-normal text-stone-900 leading-snug group-hover:text-rose-700 transition-colors">
                        {product.name}
                      </h3>

                      {/* Emotional Microcopy Line */}
                      <p className="mt-1.5 text-xs text-stone-600 italic font-serif leading-relaxed line-clamp-2">
                        {product.emotionalLine}
                      </p>
                    </div>

                    {/* Expandable "Why She'd Like It" Drawer */}
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => setExpandedWhyId(isExpanded ? null : product.id)}
                        className="w-full flex items-center justify-between text-[11px] font-medium text-stone-500 hover:text-stone-800 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <Compass className="w-3 h-3 text-rose-400" />
                          Why she'd like it
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200/60 text-[11px] text-stone-600 leading-relaxed animate-in fade-in duration-200">
                          <p>{product.whySheWouldLikeIt}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {product.occasions.map((occ, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded-md bg-white border border-stone-200 text-[9px] text-stone-500"
                              >
                                {occ}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
