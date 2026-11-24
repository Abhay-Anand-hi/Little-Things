import React, { useState } from 'react';
import { SavedHerItem, AIConciergeResult } from '../types';
import { Sparkles, Send, Loader2, Bookmark, Check, Copy, Heart, RefreshCw, MessageSquare } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';

interface AIHelpChoosingSectionProps {
  recipientName?: string;
  onSaveItem: (item: SavedHerItem) => void;
  savedIds: string[];
}

export const AIHelpChoosingSection: React.FC<AIHelpChoosingSectionProps> = ({
  recipientName,
  onSaveItem,
  savedIds
}) => {
  const { person } = useSession();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIConciergeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBonus, setCopiedBonus] = useState(false);

  const presetPrompts = person === 'HIM' ? [
    'He is stressed from work and loves gaming & iced coffee, budget ₹500.',
    'Want to surprise him with a thoughtful gesture he won’t expect.',
    'Quiet Sunday afternoon at home, zero pressure.',
    'Zero budget, pure respect and sincere appreciation words.'
  ] : person === 'US' ? [
    'Two-player date on a rainy evening with ₹400.',
    'Screen-free Sunday morning to slow down and reconnect.',
    'Fun cooking challenge we can do together tonight.',
    'Meaningful shared ritual to celebrate how far we’ve come.'
  ] : [
    'She loves botanical stems and warm vanilla scents, budget ₹700.',
    'I want to cheer her up after a tough day, but I can\'t meet her in person.',
    'Quiet cozy evening together after an exhausting week.',
    'Zero budget, pure thought and sincere affection.'
  ];

  const handleAsk = async (textToSubmit?: string) => {
    const text = (textToSubmit || query).trim();
    if (!text) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          recipientName,
          person: person || 'HER'
        })
      });

      if (!response.ok) {
        throw new Error('Could not fetch recommendations');
      }

      const data = await response.json();
      setResult(data);
      triggerHeartConfetti();
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to concierge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pronoun = person === 'HIM' ? 'him' : person === 'US' ? 'both of you' : 'her';
  const targetLabel = person === 'HIM' ? 'Him' : person === 'US' ? 'Us' : 'Her';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-linear-to-b from-stone-900 to-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Concierge for {targetLabel}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Need help choosing for {pronoun}?
          </h2>

          <p className="mt-2 text-stone-300 text-sm sm:text-base font-serif italic">
            Describe what’s happening, what {person === 'HIM' ? 'he' : person === 'US' ? 'you both' : 'she'} likes, or how much time you have. Our concierge will curate 3 tailored ideas.
          </p>

          {/* Prompt Presets */}
          <div className="mt-6 flex flex-wrap gap-2">
            {presetPrompts.map((preset, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(preset);
                  handleAsk(preset);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 hover:text-white transition-all text-left cursor-pointer"
              >
                “{preset}”
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={person === 'HIM' ? "e.g. He worked a 12-hour shift, loves gaming, budget ₹300..." : person === 'US' ? "e.g. Rainy Friday night, wanting to cook something fun together..." : "e.g. She loves cozy tea, had a long day at work, budget ₹500..."}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-400/50 backdrop-blur-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-stone-900 hover:bg-rose-50 text-xs font-semibold tracking-wide disabled:opacity-50 transition-all shadow-xs cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                  <span>Curating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Find Ideas</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-xs text-rose-300 font-medium">
              {error}
            </p>
          )}

          {/* Results Output */}
          {result && (
            <div className="mt-8 pt-8 border-t border-white/10 space-y-6 animate-fade-in">
              <p className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                ✨ Curated for {targetLabel}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.items?.map((item, idx) => {
                  const isSaved = savedIds.includes(item.id || `concierge-${idx}`);

                  return (
                    <div
                      key={item.id || idx}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase tracking-wider font-semibold text-stone-300">
                            {item.category}
                          </span>
                          {item.budget && (
                            <span className="text-[11px] text-rose-200 font-mono">
                              {item.budget}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-normal text-white mb-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-stone-300 leading-relaxed mb-3">
                          {item.description}
                        </p>

                        {item.whyItFits && (
                          <p className="text-[11px] text-rose-200/90 font-serif italic border-l-2 border-rose-400/40 pl-2 mb-3">
                            “{item.whyItFits}”
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onSaveItem({
                              id: item.id || `concierge-${idx}-${Date.now()}`,
                              title: item.title,
                              category: item.category,
                              description: item.description,
                              emotionalNote: item.whyItFits,
                              savedAt: new Date().toISOString()
                            });
                            triggerHeartConfetti();
                          }}
                          className="inline-flex items-center gap-1 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-rose-400' : ''}`} />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>

                        {item.description && (
                          <button
                            onClick={() => handleCopy(item.description, item.id || `c-${idx}`)}
                            className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                          >
                            {copiedId === (item.id || `c-${idx}`) ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {result.bonusMessage && (
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-300 block mb-1">
                      Bonus message to send right now:
                    </span>
                    <p className="font-serif italic text-sm text-stone-200">
                      “{result.bonusMessage}”
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.bonusMessage!);
                      setCopiedBonus(true);
                      setTimeout(() => setCopiedBonus(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors self-start sm:self-auto shrink-0"
                  >
                    {copiedBonus ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBonus ? 'Copied' : 'Copy message'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
