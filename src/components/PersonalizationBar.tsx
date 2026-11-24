import React from 'react';
import { Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { PersonalizationProfile, RelationshipType, OccasionType, BudgetType, PersonalityType } from '../types';

interface PersonalizationBarProps {
  profile: PersonalizationProfile;
  onChange: (updated: Partial<PersonalizationProfile>) => void;
  onReset?: () => void;
}

const RELATIONSHIPS: { id: RelationshipType; label: string; icon: string }[] = [
  { id: 'partner', label: 'Partner', icon: '❤️' },
  { id: 'crush', label: 'Crush', icon: '💕' },
  { id: 'best_friend', label: 'Best Friend', icon: '🫂' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'someone_special', label: 'Someone Special', icon: '✨' },
];

const OCCASIONS: { id: OccasionType; label: string }[] = [
  { id: 'no_reason', label: 'No Reason / Just Because' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'date_night', label: 'Date Night' },
  { id: 'long_distance', label: 'Long Distance' },
  { id: 'bad_day', label: 'Bad Day / Cheer Up' },
  { id: 'valentines', label: "Valentine's Day" },
];

const BUDGETS: { id: BudgetType; label: string }[] = [
  { id: 'free', label: '₹0 (Free)' },
  { id: 'under_500', label: 'Under ₹500' },
  { id: '500_1000', label: '₹500–₹1,000' },
  { id: '1000_5000', label: '₹1,000–₹5,000' },
  { id: 'unlimited', label: 'No Budget Limit' },
];

const PERSONALITIES: { id: PersonalityType; label: string }[] = [
  { id: 'romantic', label: 'Romantic' },
  { id: 'funny', label: 'Funny & Goofy' },
  { id: 'introverted', label: 'Introverted / Cozy' },
  { id: 'adventurous', label: 'Adventurous' },
  { id: 'emotional', label: 'Deeply Emotional' },
  { id: 'simple', label: 'Simple & Grounded' },
  { id: 'playful', label: 'Playful' },
];

export const PersonalizationBar: React.FC<PersonalizationBarProps> = ({
  profile,
  onChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-7 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-800">Personalize Your Ideas</h3>
            <p className="text-xs text-stone-400">Tailor recommendations specifically for them</p>
          </div>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-stone-400 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Who is this for? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            1. Who is this for?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RELATIONSHIPS.map(item => {
              const selected = profile.relationship === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange({ relationship: item.id })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    selected
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. What's the occasion? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            2. Occasion
          </label>
          <div className="flex flex-wrap gap-1.5">
            {OCCASIONS.slice(0, 4).map(item => {
              const selected = profile.occasion === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange({ occasion: item.id })}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Budget */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            3. Budget
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BUDGETS.slice(0, 4).map(item => {
              const selected = profile.budget === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange({ budget: item.id })}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Personality */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            4. Personality
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PERSONALITIES.slice(0, 4).map(item => {
              const selected = profile.personality === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange({ personality: item.id })}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
