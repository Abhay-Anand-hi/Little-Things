import React, { useState } from 'react';
import { X, Sparkles, Heart, Loader2, Copy, Check, Bookmark, ArrowRight } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { SavedHerItem } from '../types';

interface AIPickForHerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
  onSaveItem: (item: SavedHerItem) => void;
}

interface RecommendationResult {
  flower: {
    name: string;
    emoji: string;
    reason: string;
  };
  thingToDo: {
    title: string;
    description: string;
    time: string;
  };
  messageToSend: {
    text: string;
    tip: string;
  };
  tinySurprise: {
    title: string;
    explanation: string;
    cost: string;
  };
  vibeSummary: string;
}

export const AIPickForHerModal: React.FC<AIPickForHerModalProps> = ({
  isOpen,
  onClose,
  recipientName = 'her',
  onSaveItem
}) => {
  const [feeling, setFeeling] = useState('stressed');
  const [occasion, setOccasion] = useState('random day');
  const [budget, setBudget] = useState('free');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const feelingsList = [
    { id: 'stressed', label: 'Stressed / Overwhelmed', emoji: '🥺' },
    { id: 'tired', label: 'Tired / Long Day', emoji: '☕' },
    { id: 'happy', label: 'Happy & Glowing', emoji: '✨' },
    { id: 'sad', label: 'Feeling Low / Sad', emoji: '🫂' },
    { id: 'celebrating', label: 'Celebrating a Win', emoji: '🎉' },
    { id: 'loved', label: 'Soft & Romantic', emoji: '🤍' }
  ];

  const occasionsList = [
    { id: 'random day', label: 'Just an Ordinary Day' },
    { id: 'date night', label: 'Tonight / Date Night' },
    { id: 'apologizing', label: 'I Made a Mistake' },
    { id: 'anniversary', label: 'Anniversary / Special Milestone' },
    { id: 'just because', label: 'No Reason / Just Because' }
  ];

  const budgetOptions = [
    { id: 'free', label: 'Free (Pure Thought & Time)' },
    { id: 'small gift', label: 'Under ₹500' },
    { id: 'fancy', label: 'Special Occasion (₹1000+)' }
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/pick-for-her', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feeling,
          occasion,
          budget,
          recipientName
        })
      });

      if (!response.ok) {
        throw new Error('Could not fetch recommendations');
      }

      const data = await response.json();
      setResult(data);
      triggerHeartConfetti();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F4] rounded-3xl border border-rose-100 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-900 flex items-center justify-center border border-stone-200 transition-colors shadow-2xs z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-md mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>AI Concierge for Her</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            Help Me Pick Something For Her
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 font-serif italic">
            Tell us how she’s feeling and we’ll curate a delicate four-part gesture.
          </p>
        </div>

        {/* Configuration Step if no result yet */}
        {!result && !isLoading && (
          <div className="space-y-6">
            {/* 1. What she's feeling */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                1. What is {recipientName} feeling right now?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {feelingsList.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFeeling(item.id)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-medium text-left flex items-center gap-2 transition-all ${
                      feeling === item.id
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-rose-50/60 border border-stone-200/80'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Occasion */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                2. What is the occasion?
              </label>
              <div className="flex flex-wrap gap-2">
                {occasionsList.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOccasion(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      occasion === item.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                3. Desired budget
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {budgetOptions.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBudget(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-center transition-all ${
                      budget === item.id
                        ? 'bg-amber-700 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-amber-50/60 border border-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-rose-300 group-hover:rotate-12 transition-transform" />
                <span>Curate Something For {recipientName} ✨</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-rose-500 animate-spin" />
            </div>
            <h3 className="font-serif text-xl font-normal text-stone-800">
              Curating gentle ideas for {recipientName}...
            </h3>
            <p className="text-xs text-stone-500 font-serif italic mt-2">
              Choosing a flower, a gentle gesture, a message, and a tiny surprise.
            </p>
          </div>
        )}

        {/* Result View */}
        {result && !isLoading && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {/* Vibe Summary */}
            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-100 text-center">
              <p className="font-serif italic text-rose-900 text-sm">
                “{result.vibeSummary}”
              </p>
            </div>

            {/* 1. Flower */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-600">
                  1. Flower For Her Mood
                </span>
                <span className="text-lg">{result.flower.emoji}</span>
              </div>
              <h4 className="font-serif text-lg text-stone-900">{result.flower.name}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{result.flower.reason}</p>
            </div>

            {/* 2. Thing To Do */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-700">
                  2. A Gentle Thing To Do
                </span>
                <span className="text-xs text-stone-400">⏱️ {result.thingToDo.time}</span>
              </div>
              <h4 className="font-serif text-lg text-stone-900">{result.thingToDo.title}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{result.thingToDo.description}</p>
            </div>

            {/* 3. Message To Send */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-pink-600">
                  3. A Message To Send Her
                </span>
                <button
                  onClick={() => handleCopy(result.messageToSend.text, 'message')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
                >
                  {copiedSection === 'message' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied text</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 bg-[#FAF7F4] rounded-xl border border-stone-200/60 my-2">
                <p className="font-serif italic text-stone-800 text-sm leading-relaxed">
                  “{result.messageToSend.text}”
                </p>
              </div>
              <p className="text-[11px] text-stone-400 italic">Tip: {result.messageToSend.tip}</p>
            </div>

            {/* 4. Tiny Surprise */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-purple-600">
                  4. A Tiny Surprise
                </span>
                <span className="text-xs text-stone-400">💰 {result.tinySurprise.cost}</span>
              </div>
              <h4 className="font-serif text-lg text-stone-900">{result.tinySurprise.title}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{result.tinySurprise.explanation}</p>
            </div>

            {/* Action Bar at bottom */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setResult(null)}
                className="text-xs text-stone-500 hover:text-stone-900 underline"
              >
                ← Try different feeling or budget
              </button>

              <button
                type="button"
                onClick={() => {
                  onSaveItem({
                    id: 'ai-plan-' + Date.now(),
                    type: 'idea',
                    title: `Curated for ${recipientName} (${feeling})`,
                    subtitle: result.vibeSummary,
                    description: `${result.flower.name} • ${result.thingToDo.title} • "${result.messageToSend.text.slice(0, 60)}..."`,
                    category: 'AI Recommendation',
                    savedAt: new Date().toISOString()
                  });
                  onClose();
                }}
                className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 shadow-xs"
              >
                Save this plan to collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
