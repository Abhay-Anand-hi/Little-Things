import React, { useState } from 'react';
import { Sparkles, Send, Clock, Coins, CheckCircle2, Heart, ArrowRight, Loader2, ListChecks, HelpCircle } from 'lucide-react';
import { AIDecideIdea, PersonalizationProfile } from '../types';
import { askGeminiDecide } from '../services/api';

interface HelpMeDecideViewProps {
  profile: PersonalizationProfile;
  onMakeThisForMe: (idea: AIDecideIdea) => void;
}

const SAMPLE_PROMPTS = [
  'I want to make my girlfriend happy but I only have ₹500.',
  'My boyfriend is having a really bad day. What can I do?',
  'Our anniversary is tomorrow and I haven\'t planned anything.',
  'We are long distance and I miss them so much today.',
  'A cute surprise for my best friend who just passed their exams.'
];

export const HelpMeDecideView: React.FC<HelpMeDecideViewProps> = ({
  profile,
  onMakeThisForMe
}) => {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<AIDecideIdea[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleAsk = async (queryToUse?: string) => {
    const text = queryToUse || situation;
    if (!text.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (queryToUse) setSituation(queryToUse);

    try {
      const results = await askGeminiDecide({
        situation: text,
        relationship: profile.relationship,
        budget: profile.budget,
        recipientName: profile.recipientName
      });
      setIdeas(results);
    } catch (e) {
      console.error('AI decision error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Gemini AI Assistant</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-800 tracking-tight mb-3">
          Help Me Decide ✨
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
          Tell us what you're thinking, your constraints, or how they're feeling. We'll curate practical, deeply thoughtful ideas tailored for you.
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-8 shadow-sm mb-8">
        
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          What situation or idea do you have in mind?
        </label>

        <div className="relative">
          <textarea
            value={situation}
            onChange={e => setSituation(e.target.value)}
            placeholder="e.g., I want to make my girlfriend happy after a stressful week, but I only have ₹500 and 1 hour..."
            rows={3}
            className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-rose-300 focus:bg-white focus:outline-none text-sm text-stone-800 placeholder:text-stone-400 resize-none transition-all"
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleAsk();
              }
            }}
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !situation.trim()}
            className="absolute bottom-3 right-3 px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-rose-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-rose-100" />
                Get Ideas
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <span className="text-xs text-stone-400 font-medium mr-2">Try asking:</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {SAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(prompt)}
                disabled={loading}
                className="text-xs bg-stone-50 hover:bg-rose-50 hover:text-rose-600 text-stone-600 px-3.5 py-1.5 rounded-full border border-stone-100 transition-colors cursor-pointer text-left"
              >
                “{prompt}”
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Ideas Result Section */}
      {loading && (
        <div className="py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center animate-pulse mb-3">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <p className="font-serif text-lg text-stone-800">Weaving thoughtful ideas for you...</p>
          <p className="text-xs text-stone-400 mt-1">Considering your relationship, budget, and time</p>
        </div>
      )}

      {!loading && hasSearched && ideas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-[32px] border border-stone-100 p-6">
          <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-stone-800">No specific match found. Try phrasing your thought slightly differently!</p>
        </div>
      )}

      {!loading && ideas.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              Thoughtful Suggestions
            </h2>
            <span className="text-xs text-stone-400">{ideas.length} tailored ideas</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ideas.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-8 shadow-sm hover:border-rose-100 hover:shadow-md transition-all"
              >
                {/* Top Badge & Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full mb-1.5">
                      💡 Idea {idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-stone-800">
                      {item.idea}
                    </h3>
                  </div>

                  {/* Time & Cost badges */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-100 text-xs font-medium text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-100 text-xs font-medium text-stone-500">
                      <Coins className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                </div>

                {/* Why They'll Love It */}
                <div className="mt-4 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 mb-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Why They'll Love It
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100/60">
                    {item.whyTheyLoveIt}
                  </p>
                </div>

                {/* Grid for What You Need & How to do it */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  
                  {/* What you need */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                      <ListChecks className="w-3.5 h-3.5 text-stone-400" />
                      What You Need
                    </h5>
                    <ul className="space-y-1.5">
                      {item.whatYouNeed?.map((reqItem, rIdx) => (
                        <li key={rIdx} className="text-xs text-stone-600 flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{reqItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to do it */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-400" />
                      How To Do It
                    </h5>
                    <ol className="space-y-1.5">
                      {item.howToDoIt?.map((step, sIdx) => (
                        <li key={sIdx} className="text-xs text-stone-600 flex items-start gap-2">
                          <span className="font-semibold text-rose-500 min-w-[16px]">{sIdx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>

                {/* Make This For Me CTA */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => onMakeThisForMe(item)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold shadow-sm shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Make This For Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
