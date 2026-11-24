import React, { useState } from 'react';
import { Sparkles, X, Heart, Copy, Check, ArrowRight } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { usePresentationStyle } from '../context/PresentationStyleContext';
import { triggerHeartConfetti } from '../utils/confetti';

interface MakeItYoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  originalText: string;
  sourceType?: string;
  onSavePersonalized?: (note: string, customizedText: string) => void;
}

export const MakeItYoursModal: React.FC<MakeItYoursModalProps> = ({
  isOpen,
  onClose,
  itemTitle,
  originalText,
  sourceType = 'IDEA',
  onSavePersonalized
}) => {
  const { person, recipientName } = useSession();
  const { formatDecorated } = usePresentationStyle();

  const [callingName, setCallingName] = useState(recipientName || '');
  const [personalDetail, setPersonalDetail] = useState('');
  const [selectedTone, setSelectedTone] = useState<'tender' | 'playful' | 'deep' | 'simple'>('tender');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultText, setResultText] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handlePersonalize = async () => {
    setIsGenerating(true);
    setResultText('');
    setSaved(false);

    try {
      const response = await fetch('/api/ai/make-it-yours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle,
          originalText,
          person,
          recipientName: callingName || recipientName,
          personalDetail,
          selectedTone
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultText(data.resultText || data.personalizedText);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Elegant local generation fallback
      const target = callingName || recipientName || (person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'each other');
      let tonePrefix = '';
      if (selectedTone === 'playful') tonePrefix = `Knowing ${target}, `;
      else if (selectedTone === 'deep') tonePrefix = `Because ${target} truly deserves to feel deeply seen, `;
      else if (selectedTone === 'tender') tonePrefix = `For ${target} with all the gentleness in the world: `;

      const detailSnippet = personalDetail ? `Especially keeping in mind: “${personalDetail}”. ` : '';
      setResultText(`${tonePrefix}${originalText} ${detailSnippet}Make this moment slow, sincere, and entirely yours.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSavePersonalized) {
      onSavePersonalized(personalDetail ? `Personalized for ${callingName}: ${personalDetail}` : `Personalized for ${callingName}`, resultText || originalText);
      triggerHeartConfetti();
      setSaved(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Make It Yours →</span>
            </div>
            <h2 className="font-serif text-2xl text-stone-900 font-normal">
              Personalize this for {recipientName || (person === 'HER' ? 'Her' : person === 'HIM' ? 'Him' : 'Us')}
            </h2>
            <p className="text-xs text-stone-500 font-serif italic mt-0.5 line-clamp-1">
              {itemTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Their Name or Pet Name
            </label>
            <input
              type="text"
              value={callingName}
              onChange={(e) => setCallingName(e.target.value)}
              placeholder="e.g. Maya, Honey, Bear, or leave as default"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-hidden focus:border-rose-400 focus:bg-white transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                A personal detail or memory (Optional)
              </label>
            </div>
            
            {/* Quick detail chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {[
                'Had a stressful week',
                'Loves iced matcha / coffee',
                'Inside joke about rain',
                'Wants to feel deeply appreciated',
                'Loves slow quiet mornings'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setPersonalDetail(chip)}
                  className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] transition-colors cursor-pointer"
                >
                  + {chip}
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={personalDetail}
              onChange={(e) => setPersonalDetail(e.target.value)}
              placeholder="e.g. She loves iced matcha, had a rough week at work, or an inside joke about rain..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-hidden focus:border-rose-400 focus:bg-white transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Desired Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'tender', label: 'Gentle & Tender', emoji: '♡' },
                { id: 'playful', label: 'Playful & Teasing', emoji: '✨' },
                { id: 'deep', label: 'Deep & Emotional', emoji: '💌' },
                { id: 'simple', label: 'Simple & Direct', emoji: '🌿' }
              ].map((tone) => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedTone(tone.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left flex items-center gap-2 transition-all ${
                    selectedTone === tone.id
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50/70 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span>{tone.emoji}</span>
                  <span>{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePersonalize}
            disabled={isGenerating}
            className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Weaving personal touches...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-rose-300" />
                <span>Personalize with AI →</span>
              </>
            )}
          </button>

          {/* Result view */}
          {resultText && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-200/70">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-700 block mb-1">
                Your Tailored Version
              </span>
              <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {resultText}
              </p>

              <div className="mt-4 pt-3 border-t border-rose-200/50 flex items-center justify-end gap-2 text-xs">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-stone-700 font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                  <span>{saved ? 'Saved to My Little Things ♡' : 'Save to My Little Things'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
