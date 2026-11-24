import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, Heart, SlidersHorizontal, ChevronDown, ChevronUp, User } from 'lucide-react';
import { ActionCategory, SubOption, PersonalizationProfile } from '../types';

interface CategoryDetailModalProps {
  category: ActionCategory | null;
  onClose: () => void;
  onSelectOption: (option: SubOption, category: ActionCategory) => void;
  profile?: PersonalizationProfile;
  onChangeProfile?: (updated: Partial<PersonalizationProfile>) => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  onSelectOption,
  profile,
  onChangeProfile
}) => {
  const [showPersonalize, setShowPersonalize] = useState(false);

  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[32px] border border-stone-100 shadow-2xl p-6 sm:p-8 text-stone-800 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl text-rose-500">
              {category.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Category
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-800">
                {category.title}
              </h3>
              <p className="text-xs text-stone-400">
                {category.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contextual Personalization Bar */}
        {profile && onChangeProfile && (
          <div className="mb-6 bg-[#FCF9F6] border border-stone-100 rounded-2xl p-3 sm:p-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-600">
                <User className="w-3.5 h-3.5 text-rose-500" />
                <span>Personalizing for:</span>
                <span className="font-semibold text-stone-800">
                  {profile.recipientName || 'Someone special'} 
                  <span className="text-stone-400 font-normal ml-1">
                    ({profile.relationship.replace('_', ' ')} • {profile.budget.replace('_', ' ')})
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPersonalize(!showPersonalize)}
                className="text-[11px] text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>{showPersonalize ? 'Hide' : 'Edit details'}</span>
                {showPersonalize ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {showPersonalize && (
              <div className="mt-3 pt-3 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Their Name
                  </label>
                  <input
                    type="text"
                    value={profile.recipientName}
                    onChange={e => onChangeProfile({ recipientName: e.target.value })}
                    placeholder="e.g. Maya"
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Relationship
                  </label>
                  <select
                    value={profile.relationship}
                    onChange={e => onChangeProfile({ relationship: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-rose-400"
                  >
                    <option value="partner">Boyfriend / Girlfriend</option>
                    <option value="spouse">Husband / Wife</option>
                    <option value="crush">Crush</option>
                    <option value="friend">Best Friend</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Special Person</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Budget
                  </label>
                  <select
                    value={profile.budget}
                    onChange={e => onChangeProfile({ budget: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-rose-400"
                  >
                    <option value="free">₹0 (Completely Free)</option>
                    <option value="under_500">Under ₹500</option>
                    <option value="500_2000">₹500 – ₹2,000</option>
                    <option value="any">Special Occasion</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
          {category.options.map(option => (
            <div
              key={option.id}
              onClick={() => onSelectOption(option, category)}
              className="p-4 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-rose-100 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    {option.type.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="font-serif text-base font-semibold text-stone-800 group-hover:text-rose-600 transition-colors mb-1">
                  {option.title}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {option.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-500">
                <span>Start this</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
