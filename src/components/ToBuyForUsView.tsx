import React, { useState } from 'react';
import { US_PRODUCTS } from '../data/us/products';
import { getUsImage } from '../data/us/images';
import { PersonaProductItem, SavedHerItem } from '../types';
import { ArrowLeft, Bookmark, Check, Sparkles, Tag } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface ToBuyForUsViewProps {
  onBack: () => void;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
}

export const ToBuyForUsView: React.FC<ToBuyForUsViewProps> = ({
  onBack,
  onSaveItem,
  savedIds
}) => {
  const handleToggleSave = (product: PersonaProductItem) => {
    const isSaved = savedIds.includes(product.id);
    if (!isSaved) {
      triggerHeartConfetti();
    }
    const imgData = getUsImage(product.imageKey);
    onSaveItem({
      id: product.id,
      title: product.title,
      category: 'Things to Get Together',
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
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
              Shared for Us 🤍
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
            Things to Get Together
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 leading-tight">
            “Something for our shared space.”
          </h1>
          <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg leading-relaxed">
            Items that belong to both of you: matching morning mugs, instant cameras to document your years, and card games for unplugged evenings.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {US_PRODUCTS.map(product => {
            const isSaved = savedIds.includes(product.id);
            const imgData = getUsImage(product.imageKey);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={imgData.url}
                      alt={imgData.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md">
                      {product.brand || 'Little Things'}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                      {product.price}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-wider text-amber-700 font-medium mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-lg font-normal text-stone-900 leading-snug">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {product.whySpecial && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 italic">
                        ✨ {product.whySpecial}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <button
                    onClick={() => handleToggleSave(product)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isSaved
                        ? 'bg-amber-900 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    <span>{isSaved ? 'Saved for Us' : 'Bookmark'}</span>
                  </button>

                  <span className="text-[11px] font-semibold text-stone-500">
                    {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
