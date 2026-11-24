import React, { useState } from 'react';
import { Heart, RefreshCw, Sparkles, Edit3, Bookmark, Check, Share2 } from 'lucide-react';
import { getSemanticImage } from '../data/imageRegistry';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';

interface OnePerfectThingCardProps {
  title: string;
  description: string;
  whyItFits: string;
  howToMakePersonal?: string;
  imageKey?: string;
  budget?: string;
  time?: string;
  onSaveItem?: (item: any) => void;
  onMakeItYours?: (item: any) => void;
  onRefresh?: () => void;
}

export const OnePerfectThingCard: React.FC<OnePerfectThingCardProps> = ({
  title,
  description,
  whyItFits,
  howToMakePersonal,
  imageKey = 'candle',
  budget,
  time,
  onSaveItem,
  onMakeItYours,
  onRefresh
}) => {
  const { recipientName, person } = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const imageUrl = getSemanticImage(imageKey);

  const handleSave = () => {
    setIsSaved(true);
    triggerHeartConfetti();
    if (onSaveItem) {
      onSaveItem({
        id: 'perfect-' + Date.now(),
        type: 'idea',
        title,
        description,
        image: imageUrl,
        category: 'One Perfect Thing',
        savedAt: new Date().toISOString(),
        personalNote: noteText || undefined
      });
    }
    setShowNoteInput(true);
  };

  const handleSaveNote = () => {
    if (onSaveItem && noteText.trim()) {
      onSaveItem({
        id: 'perfect-' + Date.now(),
        type: 'idea',
        title,
        description,
        image: imageUrl,
        category: 'One Perfect Thing',
        savedAt: new Date().toISOString(),
        personalNote: noteText.trim()
      });
    }
    setShowNoteInput(false);
  };

  const handleRefreshClick = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#FCFAF8] border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all">
      
      {/* Top Banner Tag */}
      <div className="px-6 py-3 bg-stone-900 text-white flex items-center justify-between text-xs tracking-wider">
        <div className="flex items-center gap-2">
          <span className="text-rose-300">♡</span>
          <span className="font-medium uppercase">One Perfect Thing</span>
        </div>
        <span className="text-stone-300 font-serif italic text-xs">
          We think this one fits. ♡
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        
        {/* Left Image */}
        <div className="md:col-span-5 relative min-h-[220px] md:min-h-[280px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent md:hidden" />
          
          {(budget || time) && (
            <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
              {budget && (
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-medium text-stone-800 shadow-2xs">
                  {budget}
                </span>
              )}
              {time && (
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-medium text-stone-800 shadow-2xs">
                  {time}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-snug">
              {title}
            </h3>

            <p className="mt-2.5 text-stone-600 text-sm leading-relaxed">
              {description}
            </p>

            {/* Why It Fits */}
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/50">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 block mb-0.5">
                Why it fits
              </span>
              <p className="text-xs text-stone-700 font-serif italic leading-relaxed">
                “{whyItFits}”
              </p>
            </div>

            {/* How to make it personal (if provided) */}
            {howToMakePersonal && (
              <div className="mt-2.5 px-3.5 py-2 rounded-xl bg-stone-100/70 border border-stone-200/40 text-xs text-stone-600">
                <span className="font-semibold text-stone-700">Make it personal: </span>
                <span>{howToMakePersonal}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Make It Yours */}
              <button
                type="button"
                onClick={() => onMakeItYours && onMakeItYours({ title, description, whyItFits })}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Make It Yours</span>
              </button>

              {/* Save */}
              <button
                type="button"
                onClick={handleSave}
                className={`px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved ♡' : 'Save'}</span>
              </button>

              {/* Show Me Another */}
              {onRefresh && (
                <button
                  type="button"
                  onClick={handleRefreshClick}
                  className="ml-auto px-3 py-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Show another idea"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Show another</span>
                </button>
              )}
            </div>

            {/* Optional Note Prompt after save */}
            {showNoteInput && (
              <div className="mt-3 p-3 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-rose-900">
                    Want to remember why this reminded you of {recipientName || 'them'}?
                  </span>
                  <button
                    onClick={() => setShowNoteInput(false)}
                    className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  >
                    Skip
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder={`e.g. “She mentioned wanting this last week.”`}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs focus:outline-hidden focus:border-rose-400"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
