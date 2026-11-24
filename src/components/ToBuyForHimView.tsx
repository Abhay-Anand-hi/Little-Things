import React, { useState, useMemo } from 'react';
import { HIM_PRODUCTS } from '../data/him/products';
import { HIM_IMAGES } from '../data/him/images';
import { PersonaProductItem, SavedHerItem } from '../types';
import { 
  ArrowLeft, Search, Filter, Bookmark, Check, Sparkles, 
  ExternalLink, Tag, ShieldCheck, Heart 
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface ToBuyForHimViewProps {
  onBack: () => void;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
}

const HIM_PRODUCT_CATEGORIES = [
  'All',
  'Gaming & Desk Accessories',
  'Audio & Sound Gear',
  'Minimalist Watches & EDC',
  'Clean Footwear & Streetwear',
  'Espresso & Coffee Rituals',
  'Tools / DIY',
  'Food & Snacks'
];

const BUDGET_OPTIONS = [
  { id: 'all', label: 'All Budgets' },
  { id: 'under-300', label: 'Under ₹300' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: 'under-1000', label: 'Under ₹1,000' },
  { id: 'splurge', label: 'Worth the Splurge' }
];

const INTENT_OPTIONS = [
  'All Messages',
  'I know what he likes',
  'You deserve something nice',
  'This made me think of you',
  'Take care of yourself',
  'I remembered that thing you wanted'
];

export const ToBuyForHimView: React.FC<ToBuyForHimViewProps> = ({
  onBack,
  onSaveItem,
  savedIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedIntent, setSelectedIntent] = useState('All Messages');
  const [activeItem, setActiveItem] = useState<PersonaProductItem | null>(null);

  const filteredProducts = useMemo(() => {
    return HIM_PRODUCTS.filter(product => {
      // Compatibility guard: HIM only
      if (product.personCompatibility !== 'HIM' && product.personCompatibility !== 'UNIVERSAL') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = (product.title || '').toLowerCase().includes(q);
        const matchDesc = (product.description || '').toLowerCase().includes(q);
        const matchTags = product.tags ? product.tags.some(t => (t || '').toLowerCase().includes(q)) : false;
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }

      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      if (selectedBudget !== 'all') {
        if (selectedBudget === 'under-300' && product.priceNumeric > 300) return false;
        if (selectedBudget === 'under-500' && product.priceNumeric > 500) return false;
        if (selectedBudget === 'under-1000' && product.priceNumeric > 1000) return false;
        if (selectedBudget === 'splurge' && product.priceNumeric <= 1000) return false;
      }

      if (selectedIntent !== 'All Messages' && product.intent !== selectedIntent) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedBudget, selectedIntent]);

  const handleToggleSave = (product: PersonaProductItem) => {
    const isSaved = savedIds.includes(product.id);
    if (!isSaved) {
      triggerHeartConfetti();
    }
    const imgData = HIM_IMAGES[product.imageKey] || { url: '', alt: product.title };
    onSaveItem({
      id: product.id,
      title: product.title,
      category: 'Things to Buy for Him',
      subcategory: product.category,
      description: product.description,
      image: imgData.url,
      emotionalNote: product.whySpecial || product.intent,
      price: product.price,
      savedAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-stone-900 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAF7F4]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Little Things</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-800" />
            <span className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
              Curated for Him 🖤
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
            Things to Buy for Him
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 leading-tight">
            “I think he’d really like this.”
          </h1>
          <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg leading-relaxed">
            Not novelty junk or generic hampers. High-utility everyday carry, gaming and desk essentials, clean style, coffee gear, and things he’ll actually use.
          </p>
        </div>

        {/* Intent Question Pill Bar: What are you hoping the gift says? */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
            What are you hoping the gift says?
          </p>
          <div className="flex flex-wrap gap-2">
            {INTENT_OPTIONS.map(intent => {
              const isActive = selectedIntent === intent;
              return (
                <button
                  key={intent}
                  onClick={() => setSelectedIntent(intent)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {intent}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Secondary Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search gear, watches, keycaps, audio, EDC..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedBudget}
              onChange={e => setSelectedBudget(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-stone-400"
            >
              {BUDGET_OPTIONS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Bar */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {HIM_PRODUCT_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="font-serif text-lg text-stone-700">No items match your active filters.</p>
            <p className="text-sm text-stone-500 mt-1">Try resetting the budget or message filter to see more gear.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBudget('all');
                setSelectedIntent('All Messages');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const isSaved = savedIds.includes(product.id);
              const imgData = HIM_IMAGES[product.imageKey] || {
                url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85',
                alt: product.title
              };

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with explicit semantic alt text */}
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={imgData.url}
                        alt={imgData.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md">
                        {product.brand || 'Little Things'}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                        {product.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif text-lg font-normal text-stone-900 leading-snug">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {/* Why he'll like it pill */}
                      {product.whySpecial && (
                        <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] text-stone-700 italic">
                          💡 {product.whySpecial}
                        </div>
                      )}

                      {/* Intent pill */}
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-stone-500">
                        <Tag className="w-3 h-3" />
                        <span>Says: “{product.intent}”</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                    <button
                      onClick={() => handleToggleSave(product)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        isSaved
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      <span>{isSaved ? 'Saved for Him' : 'Bookmark'}</span>
                    </button>

                    <span className="text-[11px] font-semibold text-stone-500">
                      {product.budgetTier === 'splurge' ? 'Premium' : product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
