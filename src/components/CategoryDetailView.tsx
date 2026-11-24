import React, { useState, useMemo } from 'react';
import { useSession } from '../context/SessionContext';
import { getPersonaDataset, resolvePersonaImage } from '../data/contentService';
import { PersonaContentItem, SavedHerItem, CreationType } from '../types';
import { ToBuyForHerView } from './ToBuyForHerView';
import { ToBuyForHimView } from './ToBuyForHimView';
import { ToBuyForUsView } from './ToBuyForUsView';
import { 
  ArrowLeft, Bookmark, Check, Sparkles, Send, Copy, Heart, 
  RefreshCw, SlidersHorizontal, Tag, MessageSquare, Plus, Trash2, CheckCircle2 
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface CategoryDetailViewProps {
  category: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    emoji: string;
    subcategories?: string[];
  };
  onBack: () => void;
  onOpenFlowers: () => void;
  onLaunchCreator: (type: CreationType) => void;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBack,
  onOpenFlowers,
  onLaunchCreator,
  onSaveItem,
  savedIds
}) => {
  const { person, recipientName } = useSession();
  const currentMode = person || 'HER';
  const dataset = useMemo(() => getPersonaDataset(currentMode), [currentMode]);

  // If this is a buy category, route directly to the dedicated rich view
  const categoryTitleSafe = (category?.title || '').toLowerCase();
  const categoryIdSafe = (category?.id || '').toLowerCase();
  const isBuy = 
    categoryIdSafe === 'to-buy' || 
    categoryIdSafe === 'her-buy' || 
    categoryIdSafe === 'him-buy' || 
    categoryIdSafe === 'us-get' || 
    categoryTitleSafe.includes('buy') || 
    categoryTitleSafe.includes('get together');

  if (isBuy) {
    if (currentMode === 'HIM') {
      return (
        <ToBuyForHimView
          onBack={onBack}
          onSaveItem={onSaveItem}
          savedIds={savedIds}
        />
      );
    }
    if (currentMode === 'US') {
      return (
        <ToBuyForUsView
          onBack={onBack}
          onSaveItem={onSaveItem}
          savedIds={savedIds}
        />
      );
    }
    return (
      <ToBuyForHerView
        onBack={onBack}
        onSaveItem={onSaveItem}
        savedIds={savedIds}
        onOpenFlowers={onOpenFlowers}
      />
    );
  }

  // Active subcategory filter
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // HIM Interactive States
  // Section 5: Things to Do for Him
  const [himMomentChoice, setHimMomentChoice] = useState('Do something he loves');
  const [himInterestChoice, setHimInterestChoice] = useState('All Interests');
  const [himSituationChoice, setHimSituationChoice] = useState('Just because');

  // Section 7: Things to Tell Him
  const [himTellIntent, setHimTellIntent] = useState('I appreciate him');
  const [himTellStyle, setHimTellStyle] = useState('Thoughtful');
  const [himCustomSayPrompt, setHimCustomSayPrompt] = useState('');
  const [isCallingHelpSayIt, setIsCallingHelpSayIt] = useState(false);
  const [helpSayItResult, setHelpSayItResult] = useState<{
    simpleAndNatural: string;
    thoughtful: string;
    aLittleDeeper: string;
  } | null>(null);

  // Section 8: Ways to Surprise Him
  const [himSurpriseFeeling, setHimSurpriseFeeling] = useState('Thoughtful');
  const [himSurpriseTime, setHimSurpriseTime] = useState('5–10 minutes');

  // Section 9: Ways to Make Him Smile
  const [himSmileType, setHimSmileType] = useState('Proper laugh');
  const [himSmileHow, setHimSmileHow] = useState('Do something');

  // Section 10: Ways to Appreciate Him
  const [himAppreciateAspect, setHimAppreciateAspect] = useState('His effort');
  const [himAppreciateObservation, setHimAppreciateObservation] = useState('');
  const [isCallingAppreciate, setIsCallingAppreciate] = useState(false);
  const [appreciateResult, setAppreciateResult] = useState<{
    spokenWords: string;
    textMessage: string;
    whyItTouchesHim: string;
  } | null>(null);

  // Section 11: Things to Remember List
  const [rememberNotes, setRememberNotes] = useState<Array<{ id: string; topic: string; note: string }>>([
    { id: 'rem-1', topic: 'Coffee & Drinks', note: 'Double espresso with oat milk, iced in the summer' },
    { id: 'rem-2', topic: 'Gaming / Setup', note: 'Plays tacticals with his university squad on Thursday nights' },
    { id: 'rem-3', topic: 'Gear / Fit', note: 'Prefers oversized black tees and low-profile sneakers' }
  ]);
  const [newTopic, setNewTopic] = useState('Coffee & Drinks');
  const [newNote, setNewNote] = useState('');

  // Filter ideas strictly from the persona dataset
  const filteredIdeas = useMemo(() => {
    return dataset.ideas.filter(idea => {
      // Ensure idea matches current person mode
      if (idea.personCompatibility !== currentMode && idea.personCompatibility !== 'UNIVERSAL') {
        return false;
      }

      // Check category match
      const ideaCat = (idea.category || idea.categoryTitle || '').toLowerCase();
      const targetCatTitle = (category?.title || '').toLowerCase();
      const targetCatId = (category?.id || '').toLowerCase();

      const catMatch = 
        (idea.categoryId && category?.id && idea.categoryId === category.id) ||
        (ideaCat && targetCatTitle && (ideaCat.includes(targetCatTitle) || targetCatTitle.includes(ideaCat))) ||
        (targetCatId && ideaCat && ideaCat.includes(targetCatId.replace(/^(her|him|us)-/, '')));

      if (!catMatch) {
        return false;
      }

      if (selectedSubcategory !== 'all' && idea.subcategory && idea.subcategory !== selectedSubcategory) {
        return false;
      }

      return true;
    });
  }, [dataset.ideas, category?.id, category?.title, selectedSubcategory, currentMode]);

  const handleToggleSave = (item: PersonaContentItem) => {
    const isSaved = savedIds.includes(item.id);
    if (!isSaved) {
      triggerHeartConfetti();
    }
    const resolvedImg = resolvePersonaImage(item.imageKey, currentMode);
    onSaveItem({
      id: item.id,
      title: item.title,
      category: category.title,
      subcategory: item.subcategory,
      description: item.description,
      image: resolvedImg.url,
      emotionalNote: item.whyItMatters || item.whenToUse,
      savedAt: new Date().toISOString()
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCallHelpSayIt = async () => {
    if (!himCustomSayPrompt.trim()) return;
    setIsCallingHelpSayIt(true);
    try {
      const res = await fetch('/api/ai/help-say-it', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatToSay: himCustomSayPrompt,
          intent: himTellIntent,
          style: himTellStyle,
          person: currentMode,
          recipientName
        })
      });
      const data = await res.json();
      setHelpSayItResult(data);
      triggerHeartConfetti();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCallingHelpSayIt(false);
    }
  };

  const handleCallAppreciate = async () => {
    if (!himAppreciateObservation.trim()) return;
    setIsCallingAppreciate(true);
    try {
      const res = await fetch('/api/ai/appreciate-him', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          observation: himAppreciateObservation,
          aspect: himAppreciateAspect,
          recipientName
        })
      });
      const data = await res.json();
      setAppreciateResult(data);
      triggerHeartConfetti();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCallingAppreciate(false);
    }
  };

  const subcategoriesList = category.subcategories || Array.from(new Set(filteredIdeas.map(i => i.subcategory).filter(Boolean)));

  const accentBadge = currentMode === 'HIM' 
    ? 'bg-stone-900 text-white' 
    : currentMode === 'US' 
    ? 'bg-amber-800 text-white' 
    : 'bg-rose-600 text-white';

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all collections</span>
          </button>

          {currentMode === 'HER' && (
            <button
              onClick={onOpenFlowers}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2 rounded-full shadow-2xs transition-colors"
            >
              <span>🌷</span>
              <span>Explore Flowers for Her</span>
            </button>
          )}
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white mb-10 shadow-lg">
          <div className="absolute inset-0 z-0">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover opacity-40 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${accentBadge}`}>
              <span>{category.emoji}</span>
              <span>LITTLE THINGS DEDICATED TO {currentMode}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              {category.title}
            </h1>

            <p className="mt-3 font-serif italic text-lg sm:text-xl text-stone-200 leading-relaxed">
              “{category.tagline}”
            </p>

            <p className="mt-2 text-sm text-stone-300 leading-relaxed max-w-lg">
              {category.description}
            </p>
          </div>
        </div>

        {/* HIM-SPECIFIC INTERACTIVE EXPERIENCES */}
        {currentMode === 'HIM' && category.id === 'him-do' && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-2">
              Discovery: What kind of little moment do you want to create for him?
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-serif italic">
              Tailor gestures to what he is feeling or usually into.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                  1. The Vibe / Goal
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Do something he loves',
                    'Give him a break',
                    'Make him laugh',
                    'Celebrate him',
                    'Get him out of the routine',
                    'Make a comfortable day at home'
                  ].map(choice => (
                    <button
                      key={choice}
                      onClick={() => setHimMomentChoice(choice)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        himMomentChoice === choice ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                  2. What is he usually into?
                </label>
                <div className="flex flex-wrap gap-2">
                  {['All Interests', 'Gaming', 'Fitness', 'Coffee', 'Cars', 'Music', 'Food', 'Staying in'].map(interest => (
                    <button
                      key={interest}
                      onClick={() => setHimInterestChoice(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        himInterestChoice === interest ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentMode === 'HIM' && category.id === 'him-tell' && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-2">
              What are you trying to say to him?
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-serif italic">
              Men remember sincere, unprompted appreciation far longer than grand generic speeches.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                'I appreciate him',
                'I’m proud of him',
                'I believe in him',
                'He needs reassurance',
                'I want to make him laugh',
                'Just because I thought of him'
              ].map(intent => (
                <button
                  key={intent}
                  onClick={() => setHimTellIntent(intent)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    himTellIntent === intent ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {intent}
                </button>
              ))}
            </div>

            {/* AI Feature: Help Me Say It */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-stone-700" />
                <span className="text-xs uppercase tracking-wider text-stone-700 font-semibold">
                  ✨ Help Me Say It (AI Concierge)
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-3">
                Type what you're feeling in your own words, and we'll format it into 3 natural tones.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. He worked a 12 hour shift and didn't complain once..."
                  value={himCustomSayPrompt}
                  onChange={e => setHimCustomSayPrompt(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400"
                />
                <button
                  onClick={handleCallHelpSayIt}
                  disabled={isCallingHelpSayIt || !himCustomSayPrompt.trim()}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 disabled:opacity-50 transition-colors"
                >
                  {isCallingHelpSayIt ? 'Thinking...' : 'Help Me Say It'}
                </button>
              </div>

              {helpSayItResult && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <p className="text-[10px] uppercase font-bold text-stone-500 mb-1">Simple & Natural</p>
                    <p className="text-xs text-stone-800 italic">“{helpSayItResult.simpleAndNatural}”</p>
                    <button
                      onClick={() => handleCopy(helpSayItResult.simpleAndNatural, 'simple')}
                      className="mt-2 text-[10px] text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> {copiedId === 'simple' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <p className="text-[10px] uppercase font-bold text-stone-500 mb-1">Thoughtful</p>
                    <p className="text-xs text-stone-800 italic">“{helpSayItResult.thoughtful}”</p>
                    <button
                      onClick={() => handleCopy(helpSayItResult.thoughtful, 'thoughtful')}
                      className="mt-2 text-[10px] text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> {copiedId === 'thoughtful' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <p className="text-[10px] uppercase font-bold text-stone-500 mb-1">A Little Deeper</p>
                    <p className="text-xs text-stone-800 italic">“{helpSayItResult.aLittleDeeper}”</p>
                    <button
                      onClick={() => handleCopy(helpSayItResult.aLittleDeeper, 'deeper')}
                      className="mt-2 text-[10px] text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> {copiedId === 'deeper' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentMode === 'HIM' && category.id === 'him-appreciate' && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-2">
              Tell him what you notice.
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-serif italic">
              The things people appreciate most aren't always the things they hear out loud.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                'His effort',
                'His kindness',
                'The way he thinks',
                'His humor',
                'His determination',
                'The way he shows up',
                'His ambition',
                'The way he cares'
              ].map(aspect => (
                <button
                  key={aspect}
                  onClick={() => setHimAppreciateAspect(aspect)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    himAppreciateAspect === aspect ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {aspect}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <label className="text-xs uppercase tracking-wider text-stone-600 font-semibold block mb-2">
                What did you actually notice?
              </label>
              <textarea
                rows={2}
                placeholder="e.g. He stayed up late fixing my laptop / he quietly packed snacks for the road..."
                value={himAppreciateObservation}
                onChange={e => setHimAppreciateObservation(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400 mb-3"
              />
              <button
                onClick={handleCallAppreciate}
                disabled={isCallingAppreciate || !himAppreciateObservation.trim()}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 disabled:opacity-50 transition-colors"
              >
                {isCallingAppreciate ? 'Crafting appreciation...' : 'Turn into natural appreciation'}
              </button>

              {appreciateResult && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Words to say out loud:</span>
                    <p className="text-xs text-stone-800 font-medium">“{appreciateResult.spokenWords}”</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Text message:</span>
                    <p className="text-xs text-stone-800 italic">“{appreciateResult.textMessage}”</p>
                  </div>
                  <p className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-100">
                    💡 {appreciateResult.whyItTouchesHim}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentMode === 'HIM' && category.id === 'him-remember' && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-2">
              Things to Remember for Him 🖤
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-serif italic">
              Keep track of his exact drink order, shoe size, favorite teams, and off-hand comments.
            </p>

            <div className="space-y-3 mb-6">
              {rememberNotes.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500">{item.topic}</span>
                    <p className="text-xs font-medium text-stone-800 mt-0.5">{item.note}</p>
                  </div>
                  <button
                    onClick={() => setRememberNotes(prev => prev.filter(n => n.id !== item.id))}
                    className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-800"
              >
                <option value="Coffee & Drinks">Coffee & Drinks</option>
                <option value="Gaming / Setup">Gaming / Setup</option>
                <option value="Gear / Fit">Gear / Fit</option>
                <option value="Sports & Teams">Sports & Teams</option>
                <option value="Wishlist Item">Wishlist Item</option>
              </select>
              <input
                type="text"
                placeholder="Add detail (e.g. loves caramel cold brew, size 10 US)..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900"
              />
              <button
                onClick={() => {
                  if (!newNote.trim()) return;
                  setRememberNotes(prev => [
                    ...prev,
                    { id: `rem-${Date.now()}`, topic: newTopic, note: newNote.trim() }
                  ]);
                  setNewNote('');
                  triggerHeartConfetti();
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold flex items-center gap-1.5 justify-center"
              >
                <Plus className="w-3.5 h-3.5" /> Save Note
              </button>
            </div>
          </div>
        )}

        {/* Subcategories Filter Pills */}
        {subcategoriesList.length > 1 && (
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-3">
              Filter by subcategory
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedSubcategory === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                All Ideas ({filteredIdeas.length})
              </button>
              {subcategoriesList.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-stone-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea, idx) => {
            const isSaved = savedIds.includes(idea.id);
            const resolvedImg = resolvePersonaImage(idea.imageKey, currentMode);

            return (
              <div
                key={idea.id || idx}
                className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={resolvedImg.url}
                      alt={resolvedImg.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md">
                      {idea.subcategory || category.title}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-normal text-stone-900 leading-snug">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                      {idea.description}
                    </p>

                    {idea.whyItMatters && (
                      <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] text-stone-700 italic leading-relaxed">
                        “{idea.whyItMatters}”
                      </div>
                    )}

                    {idea.whenToUse && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-stone-500">
                        <Tag className="w-3 h-3" />
                        <span>Best when: {idea.whenToUse}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-3">
                  <button
                    onClick={() => handleToggleSave(idea)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                      isSaved
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save to Little Things'}</span>
                  </button>

                  <span className="text-[11px] font-semibold text-stone-400">
                    {idea.personCompatibility} Mode
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
