import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, RefreshCw, Heart, X, Check } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { understandUserIntent, UnderstandIntentResult } from '../services/aiService';
import { OnePerfectThingCard } from './OnePerfectThingCard';
import { triggerHeartConfetti } from '../utils/confetti';

interface WhatAreYouFeelingTodayProps {
  onSaveItem?: (item: any) => void;
  onOpenSurpriseMe?: () => void;
  onOpenMakeItYours?: (item: any) => void;
}

const QUICK_CHOICES = [
  { id: 'bad_day', label: "She's having a bad day.", icon: '🧸', person: 'HER' },
  { id: 'surprise_him', label: "I want to surprise him.", icon: '🖤', person: 'HIM' },
  { id: 'miss_her', label: "I miss her.", icon: '💌', person: 'HER' },
  { id: 'make_smile', label: "I want to make them smile.", icon: '✨', person: 'HER' },
  { id: 'shared_do', label: "We need something to do.", icon: '☕', person: 'US' },
  { id: 'tell_something', label: "I want to tell them something.", icon: '🕊️', person: 'HER' },
  { id: 'find_gift', label: "I want to find a little gift.", icon: '🎁', person: 'HER' },
  { id: 'dont_know', label: "I don't know what I need.", icon: '🎲', person: 'HER' }
];

export const WhatAreYouFeelingToday: React.FC<WhatAreYouFeelingTodayProps> = ({
  onSaveItem,
  onOpenSurpriseMe,
  onOpenMakeItYours
}) => {
  const { person, recipientName, memories, setSessionFact } = useSession();
  const [inputText, setInputText] = useState('');
  const [activeChoice, setActiveChoice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UnderstandIntentResult | null>(null);
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);

  const handleSelectChoice = async (choice: typeof QUICK_CHOICES[0]) => {
    setActiveChoice(choice.id);
    setInputText(choice.label);
    if (choice.id === 'dont_know' && onOpenSurpriseMe) {
      onOpenSurpriseMe();
      return;
    }
    await processInput(choice.label);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    await processInput(inputText.trim());
  };

  const processInput = async (text: string) => {
    setIsLoading(true);
    setFollowUpAnswer(null);
    setSessionFact('last_feeling_input', text);

    const intentData = await understandUserIntent(
      text,
      person || 'HER',
      recipientName,
      memories
    );

    setResult(intentData);
    setIsLoading(false);
    triggerHeartConfetti();
  };

  const handleClear = () => {
    setInputText('');
    setActiveChoice(null);
    setResult(null);
    setFollowUpAnswer(null);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      <div className="bg-white/90 backdrop-blur-xs rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Gentle Guidance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
            What are you feeling today?
          </h2>
          <p className="mt-1 text-sm text-stone-500 font-serif italic">
            Tell us what’s on your mind. We’ll help from there.
          </p>
        </div>

        {/* Quick Choices */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {QUICK_CHOICES.map((choice) => {
            const isSelected = activeChoice === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleSelectChoice(choice)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80 hover:border-stone-300'
                }`}
              >
                <span>{choice.icon}</span>
                <span>{choice.label}</span>
              </button>
            );
          })}
        </div>

        {/* Free Text Input */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (activeChoice) setActiveChoice(null);
              }}
              placeholder={`e.g. “She has been stressed lately and I want to do something small.”`}
              className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-stone-50/90 border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 placeholder:italic focus:outline-hidden focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all"
            />
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-12 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-medium flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed shadow-2xs"
            >
              {isLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Follow-up Question if needed */}
        {result?.nextQuestion && !followUpAnswer && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60 max-w-xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
              Just one quick thing:
            </p>
            <p className="font-serif text-base text-stone-800 mb-3 italic">
              {result.nextQuestion.question}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {result.nextQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setFollowUpAnswer(opt)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-stone-800 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Immediate Result: One Perfect Thing */}
        {result?.onePerfectThing && (!result.nextQuestion || followUpAnswer) && (
          <div className="mt-8 pt-6 border-t border-stone-100">
            <OnePerfectThingCard
              title={result.onePerfectThing.title}
              description={result.onePerfectThing.description}
              whyItFits={result.onePerfectThing.whyItFits}
              howToMakePersonal={result.onePerfectThing.howToMakePersonal}
              imageKey={result.onePerfectThing.imageKey}
              onSaveItem={onSaveItem}
              onMakeItYours={onOpenMakeItYours}
              onRefresh={() => processInput(inputText || 'something spontaneous')}
            />
          </div>
        )}

      </div>
    </section>
  );
};
