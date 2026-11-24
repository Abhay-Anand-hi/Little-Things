import React, { useState } from 'react';
import { Sparkles, Dices, ArrowRight, ArrowLeft, Heart, Check, Copy, RefreshCw, X, Edit3 } from 'lucide-react';
import { PersonMode, JournalSavedItem } from '../types';
import { getSemanticImage } from '../data/imageRegistry';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';
import { fetchSurpriseMe, SurpriseMeDualResult } from '../services/aiService';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveItem?: (item: any) => void;
  onMakeItYours?: (item: any) => void;
}

const FEELING_CHOICES = [
  { id: 'Sweet', label: '🍬 Sweet' },
  { id: 'Romantic', label: '🌹 Romantic' },
  { id: 'Funny', label: '😄 Funny' },
  { id: 'Emotional', label: '🥺 Emotional' },
  { id: 'Cute', label: '🧸 Cute' },
  { id: 'Unexpected', label: '✨ Unexpected' },
  { id: 'Comforting', label: '☕ Comforting' },
  { id: 'Just Because', label: '🌿 Just Because' }
];

const TIME_CHOICES = [
  { id: '5-10 mins', label: '⚡ 5–10 minutes' },
  { id: 'about 1 hour', label: '⏳ About an hour' },
  { id: 'few hours', label: '🌙 Few hours' },
  { id: 'whole day', label: '☀️ Whole day' },
  { id: 'plan ahead', label: '🗓️ Plan ahead' }
];

const BUDGET_CHOICES = [
  { id: 'Free', label: '🤍 Free' },
  { id: 'Under ₹300', label: '🪙 Under ₹300' },
  { id: 'Under ₹500', label: '💸 Under ₹500' },
  { id: 'Under ₹1,000', label: '🎁 Under ₹1,000' },
  { id: 'Open', label: '✨ Open' }
];

const SITUATION_CHOICES = [
  { id: 'Just because', label: '🌿 Just because' },
  { id: 'Bad day', label: '🌧️ Bad day' },
  { id: 'Celebration', label: '🥂 Celebration' },
  { id: 'Special occasion', label: '🎂 Special occasion' },
  { id: 'Missing them', label: '💌 Missing them' },
  { id: 'Want to make them feel loved', label: '💖 Make them feel loved' }
];

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  onSaveItem,
  onMakeItYours
}) => {
  const { person: contextPerson, recipientName } = useSession();

  const [mode, setMode] = useState<'pick' | 'know_what_i_want' | 'no_idea'>('pick');
  const [who, setWho] = useState<PersonMode>(contextPerson || 'HER');
  
  // Guided state
  const [feeling, setFeeling] = useState('Sweet');
  const [time, setTime] = useState('5-10 mins');
  const [budget, setBudget] = useState('Free');
  const [situation, setSituation] = useState('Just because');
  const [aboutThem, setAboutThem] = useState('');
  const [guidedStep, setGuidedStep] = useState(1);

  // Results state
  const [isLoading, setIsLoading] = useState(false);
  const [dualResult, setDualResult] = useState<SurpriseMeDualResult | null>(null);
  const [savedIndex, setSavedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleRunNoIdea = async () => {
    setIsLoading(true);
    setMode('no_idea');
    triggerHeartConfetti();
    const data = await fetchSurpriseMe({
      mode: 'no_idea',
      who,
      situation: 'spontaneous'
    });
    setDualResult(data);
    setIsLoading(false);
  };

  const handleRunGuided = async () => {
    setIsLoading(true);
    setMode('know_what_i_want');
    triggerHeartConfetti();
    const data = await fetchSurpriseMe({
      mode: 'guided',
      who,
      feeling,
      time,
      budget,
      situation,
      aboutThem
    });
    setDualResult(data);
    setIsLoading(false);
  };

  const handleSaveCard = (card: any, idx: number) => {
    triggerHeartConfetti();
    setSavedIndex(idx);
    if (onSaveItem) {
      onSaveItem({
        id: 'surprise-' + Date.now() + '-' + idx,
        type: 'surprise',
        sourceType: 'SURPRISE',
        title: card.title,
        subtitle: `Surprise for ${recipientName || (who === 'HER' ? 'Her' : who === 'HIM' ? 'Him' : 'Us')}`,
        description: card.description,
        whyReminded: card.whyItFits,
        image: getSemanticImage(card.imageKey || 'candle'),
        person: who,
        category: 'Surprise Me',
        savedAt: new Date().toISOString()
      });
    }
  };

  const handleCopyCard = (card: any, idx: number) => {
    navigator.clipboard.writeText(`${card.title}\n\n${card.description}\n\nWhy it fits: ${card.whyItFits}\nHow to make personal: ${card.howToMakePersonal}`);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF8] rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-left max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-sm">
              <Dices className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal">
                Surprise Me ✨
              </h2>
              <p className="text-xs text-stone-500 font-serif italic">
                For {recipientName || (who === 'HER' ? 'her' : who === 'HIM' ? 'him' : 'us')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* STEP 1: PICK PATH */}
          {mode === 'pick' && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                {(['HER', 'HIM', 'US'] as PersonMode[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setWho(p)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      who === p
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {p === 'HER' ? '🌷 For Her' : p === 'HIM' ? '🖤 For Him' : '🤍 For Us'}
                  </button>
                ))}
              </div>

              {/* Path B: "I Have No Idea" */}
              <div
                onClick={handleRunNoIdea}
                className="p-5 rounded-3xl border-2 border-stone-900 bg-stone-900 text-white shadow-md hover:bg-stone-800 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-300" />
                    <h3 className="font-serif text-lg font-medium">
                      “I have no idea.”
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-rose-300 group-hover:translate-x-1 transition-transform">
                    Roll 3 Surprises →
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Skip the questionnaire. Give me 3 distinct ideas right now: The Little One, The Thoughtful One, and The Unexpected One.
                </p>
              </div>

              {/* Path A: "I Know What I Want" */}
              <div
                onClick={() => {
                  setMode('know_what_i_want');
                  setGuidedStep(1);
                }}
                className="p-5 rounded-3xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/20 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-rose-600 transition-colors">
                    “I know what I want.” (Guided)
                  </h3>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Filter by exact feeling, available time, budget, situation, and details about them.
                </p>
              </div>
            </div>
          )}

          {/* GUIDED PATH STEPS */}
          {mode === 'know_what_i_want' && !dualResult && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMode('pick')}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to choices</span>
                </button>
                <span className="text-xs text-stone-400">
                  Step {guidedStep} of 5
                </span>
              </div>

              {/* Step 1: Feeling */}
              {guidedStep === 1 && (
                <div>
                  <h4 className="font-serif text-lg text-stone-900 mb-1">What feeling do you want to create?</h4>
                  <p className="text-xs text-stone-500 mb-3">Choose the core emotional tone.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FEELING_CHOICES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFeeling(f.id)}
                        className={`p-3 rounded-2xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          feeling === f.id
                            ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => setGuidedStep(2)}
                      className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium cursor-pointer"
                    >
                      Next: Time & Budget →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Time & Budget */}
              {guidedStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-base text-stone-900 mb-2">How much time do you have?</h4>
                    <div className="flex flex-wrap gap-2">
                      {TIME_CHOICES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTime(t.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                            time === t.id
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white border-stone-200 text-stone-700'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base text-stone-900 mb-2">What is your budget?</h4>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_CHOICES.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBudget(b.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                            budget === b.id
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white border-stone-200 text-stone-700'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={() => setGuidedStep(1)}
                      className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setGuidedStep(3)}
                      className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium cursor-pointer"
                    >
                      Next: Situation →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Situation & Detail */}
              {guidedStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-base text-stone-900 mb-2">What is the situation?</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SITUATION_CHOICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSituation(s.id)}
                          className={`p-2.5 rounded-2xl text-xs font-medium border text-center cursor-pointer ${
                            situation === s.id
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white border-stone-200 text-stone-700'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base text-stone-900 mb-1">Anything specific about them? (Optional)</h4>
                    <input
                      type="text"
                      value={aboutThem}
                      onChange={(e) => setAboutThem(e.target.value)}
                      placeholder="e.g., loves chamomile tea, has a big exam on Friday, loves handwritten notes"
                      className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-xs focus:outline-hidden focus:border-rose-400"
                    />
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <button
                      onClick={() => setGuidedStep(2)}
                      className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleRunGuided}
                      disabled={isLoading}
                      className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>Generate Possibilities</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DUAL RESULTS DISPLAY */}
          {dualResult && (
            <div className="space-y-6">
              
              {/* Reset/Reroll header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs text-stone-500 font-serif italic">
                  {mode === 'no_idea' ? '3 possibilities for you to choose from:' : 'Your personalized suggestion:'}
                </span>
                <button
                  onClick={mode === 'no_idea' ? handleRunNoIdea : handleRunGuided}
                  className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>↻ Surprise again</span>
                </button>
              </div>

              {/* If "no_idea", display 3 cards: The Little One, The Thoughtful One, The Unexpected One */}
              {mode === 'no_idea' && dualResult.theLittleOne && dualResult.theThoughtfulOne && dualResult.theUnexpectedOne ? (
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { key: 'little', tag: '🌷 The Little One (Small & Easy)', item: dualResult.theLittleOne, badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                    { key: 'thoughtful', tag: '💗 The Thoughtful One (Deeply Personal)', item: dualResult.theThoughtfulOne, badgeColor: 'bg-rose-50 text-rose-800 border-rose-200' },
                    { key: 'unexpected', tag: '✨ The Unexpected One (Novel & Playful)', item: dualResult.theUnexpectedOne, badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' }
                  ].map((card, idx) => {
                    const img = getSemanticImage(card.item.imageKey);
                    return (
                      <div key={card.key} className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${card.badgeColor}`}>
                            {card.tag}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {card.item.time}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                          <img
                            src={img}
                            alt={card.item.title}
                            className="w-full sm:w-28 h-28 object-cover rounded-2xl shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="font-serif text-lg text-stone-900 leading-snug">
                              {card.item.title}
                            </h4>
                            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                              {card.item.description}
                            </p>

                            <div className="mt-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                              <p className="text-stone-700 font-serif italic mb-1">
                                <strong className="font-sans text-[10px] uppercase font-semibold text-stone-500 not-italic block">Why it fits:</strong>
                                “{card.item.whyItFits}”
                              </p>
                              <p className="text-stone-600">
                                <strong className="text-stone-800">Make it personal: </strong>
                                {card.item.howToMakePersonal}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => handleSaveCard(card.item, idx)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                              savedIndex === idx
                                ? 'bg-rose-50 border-rose-200 text-rose-700'
                                : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${savedIndex === idx ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span>{savedIndex === idx ? 'Saved ♡' : '♡ This feels right'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onMakeItYours && onMakeItYours(card.item)}
                              className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>✏️ Make it more like them</span>
                            </button>

                            <button
                              onClick={() => handleCopyCard(card.item, idx)}
                              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
                              title="Copy details"
                            >
                              {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : dualResult.result ? (
                /* Guided result item */
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                  <h4 className="font-serif text-xl text-stone-900 mb-2">
                    {dualResult.result.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {dualResult.result.description}
                  </p>
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/50 mb-4 text-xs">
                    <span className="font-semibold text-amber-800 block mb-0.5">Why it fits:</span>
                    <p className="text-stone-700 font-serif italic">“{dualResult.result.whyItFits}”</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSaveCard(dualResult.result, 99)}
                      className="px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-medium cursor-pointer"
                    >
                      ♡ This feels right
                    </button>
                    <button
                      onClick={() => onMakeItYours && onMakeItYours(dualResult.result)}
                      className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 text-xs font-medium cursor-pointer"
                    >
                      ✏️ Make it more like them
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setDualResult(null);
                    setMode('pick');
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Start over with different choices
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
