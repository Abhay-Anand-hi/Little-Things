import React, { useState } from 'react';
import { Creation, CreationType } from '../types';
import { 
  Heart, Sparkles, Plus, Edit2, Check, Calendar, Gift, 
  Trash2, ExternalLink, Share2, Flower2, Clock, Mail, BookOpen
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface MyLittleThingsViewProps {
  recipientName: string;
  onUpdateRecipientName: (name: string) => void;
  creations: Creation[];
  onOpenCreate: (type: CreationType) => void;
  onViewCreation: (creation: Creation) => void;
  onDeleteCreation: (id: string) => void;
  onOpenFlowers: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
}

export const MyLittleThingsView: React.FC<MyLittleThingsViewProps> = ({
  recipientName,
  onUpdateRecipientName,
  creations,
  onOpenCreate,
  onViewCreation,
  onDeleteCreation,
  onOpenFlowers,
  savedCount,
  onOpenSaved,
  user,
  onOpenAuth
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(recipientName || 'Maya');
  const [favFlower, setFavFlower] = useState(() => localStorage.getItem('her_fav_flower') || 'Pink Tulips');
  const [favTreat, setFavTreat] = useState(() => localStorage.getItem('her_fav_treat') || 'Dark Chocolate Sea Salt');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateRecipientName(tempName.trim());
      setIsEditingName(false);
      triggerHeartConfetti();
    }
  };

  const handleSaveFlower = (flower: string) => {
    setFavFlower(flower);
    localStorage.setItem('her_fav_flower', flower);
  };

  const handleSaveTreat = (treat: string) => {
    setFavTreat(treat);
    localStorage.setItem('her_fav_treat', treat);
  };

  const handleCopyShareLink = (id: string) => {
    const url = `${window.location.origin}/#surprise-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Editorial Profile Header */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
                <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-500" />
                <span>Personalized Her Sanctuary</span>
              </div>

              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Enter her name..."
                    autoFocus
                    className="font-serif text-3xl sm:text-4xl text-stone-900 border-b-2 border-rose-500 focus:outline-none bg-transparent py-0.5"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 mt-1">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900">
                    {recipientName || 'Her Space'} <span className="text-rose-500 font-light">♡</span>
                  </h1>
                  <button
                    onClick={() => {
                      setTempName(recipientName || '');
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                    title="Change her name"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <p className="mt-2 text-stone-500 font-serif italic text-sm sm:text-base">
                Your quiet private corner dedicated to honoring, creating, and remembering little things for her.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div 
                onClick={onOpenSaved}
                className="cursor-pointer flex-1 sm:flex-initial p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-center hover:bg-rose-50 transition-colors"
              >
                <span className="block font-serif text-2xl font-semibold text-rose-700">{savedCount}</span>
                <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Saved Items</span>
              </div>
              <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
                <span className="block font-serif text-2xl font-semibold text-stone-800">{creations.length}</span>
                <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Creations</span>
              </div>
            </div>
          </div>

          {/* Quick Memory Notes / Preferences for Her */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F4] border border-stone-200/60">
              <span className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5" />
                <span>Her Favorite Flowers</span>
              </span>
              <input
                type="text"
                value={favFlower}
                onChange={(e) => handleSaveFlower(e.target.value)}
                placeholder="e.g. Daisies & Pink Tulips..."
                className="w-full mt-2 text-sm font-medium text-stone-800 bg-transparent border-b border-stone-200 focus:border-rose-400 focus:outline-none py-1"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F4] border border-stone-200/60">
              <span className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Her Comfort Snack / Drink</span>
              </span>
              <input
                type="text"
                value={favTreat}
                onChange={(e) => handleSaveTreat(e.target.value)}
                placeholder="e.g. Iced Vanilla Latte & Dark Chocolate..."
                className="w-full mt-2 text-sm font-medium text-stone-800 bg-transparent border-b border-stone-200 focus:border-rose-400 focus:outline-none py-1"
              />
            </div>
          </div>
        </div>

        {/* Surprise & Creation Studios */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-rose-600">
                Interactive Studios
              </p>
              <h2 className="font-serif text-2xl font-normal text-stone-900 mt-0.5">
                Create a digital keepsake for {recipientName || 'her'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                type: 'love_letter' as CreationType,
                title: 'Love Letter',
                desc: 'Handwritten aesthetic parchment letter with custom seal',
                emoji: '💌',
                color: 'rose'
              },
              {
                type: 'love_box' as CreationType,
                title: 'Surprise Gift Box',
                desc: 'Unboxable 3D wrapped package filled with secret notes',
                emoji: '🎁',
                color: 'amber'
              },
              {
                type: 'date_plan' as CreationType,
                title: 'Date Itinerary',
                desc: 'Delicate sensory date card with timeline & music',
                emoji: '🥂',
                color: 'purple'
              },
              {
                type: 'our_story' as CreationType,
                title: 'Our Story Timeline',
                desc: 'Chronicle how you met and your favorite milestones',
                emoji: '📖',
                color: 'emerald'
              }
            ].map(studio => (
              <div
                key={studio.type}
                onClick={() => onOpenCreate(studio.type)}
                className="cursor-pointer group p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl block mb-2">{studio.emoji}</span>
                  <h3 className="font-serif text-lg font-normal text-stone-900 group-hover:text-rose-600 transition-colors">
                    {studio.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                    {studio.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-rose-600 font-medium">
                  <span>Start creating</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Kept Creations */}
        <div>
          <h2 className="font-serif text-2xl font-normal text-stone-900 mb-4">
            Created for {recipientName || 'her'} ({creations.length})
          </h2>

          {creations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 text-center max-w-md mx-auto">
              <Mail className="w-8 h-8 text-stone-300 mx-auto stroke-1" />
              <p className="font-serif text-stone-700 text-lg mt-3">No creations saved yet</p>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Choose one of the studios above to write a romantic letter, pack a surprise gift box, or build an itinerary.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {creations.map(c => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                      <span className="capitalize font-medium text-rose-600">
                        {c.type.replace('_', ' ')}
                      </span>
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-serif text-lg font-normal text-stone-900">
                      {c.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      Dedicated to {c.recipientName || recipientName}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onViewCreation(c)}
                      className="text-stone-900 font-medium hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyShareLink(c.id)}
                        className="text-rose-600 hover:text-rose-700 font-medium"
                      >
                        {copiedId === c.id ? 'Copied ✓' : 'Share link'}
                      </button>

                      <button
                        onClick={() => onDeleteCreation(c.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                        title="Delete creation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
