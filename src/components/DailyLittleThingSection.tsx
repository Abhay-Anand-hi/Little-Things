import React, { useState } from 'react';
import { Heart, Check, Sparkles, RefreshCw, Volume2, Coffee, MessageSquare, Compass } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { triggerHeartConfetti } from '../utils/confetti';

interface DailyLittleThingSectionProps {
  onSaveItem?: (item: any) => void;
  onMakeItYours?: (item: any) => void;
}

const DAILY_IDEAS = [
  {
    id: 'daily-voice-note',
    icon: Volume2,
    tag: 'Spoken Warmth',
    title: 'Send a 20-second voice note instead of a text.',
    description: 'Describe one sweet or funny thing that crossed your mind today. Your natural tone carries intimacy that screens cannot mimic.',
    whyItFits: 'Hearing someone’s laughter and quiet cadence instantly grounds a noisy day.'
  },
  {
    id: 'daily-coffee-order',
    icon: Coffee,
    tag: 'Attentive Care',
    title: 'Remember the exact coffee they order.',
    description: 'Pick it up unannounced or place the order for their 3 PM break with their exact milk and sweetness preference.',
    whyItFits: 'Proves you remember the smallest nuances of their daily world.'
  },
  {
    id: 'daily-ask-excited',
    icon: MessageSquare,
    tag: 'Curiosity',
    title: 'Ask about the specific thing they were excited about.',
    description: 'Follow up on the project, recipe, or side plan they mentioned three days ago. “How did that turn out today?”',
    whyItFits: 'Shows you truly listen when they speak and hold onto what matters to them.'
  },
  {
    id: 'daily-appreciate',
    icon: Compass,
    tag: 'Quiet Gratitude',
    title: 'Tell them one thing you genuinely appreciate.',
    description: 'Not generic praise—name one specific, subtle way they responded to a situation that made you feel grateful.',
    whyItFits: 'Specific recognition validates character and quiet effort.'
  }
];

export const DailyLittleThingSection: React.FC<DailyLittleThingSectionProps> = ({
  onSaveItem,
  onMakeItYours
}) => {
  const { recipientName, person } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const current = DAILY_IDEAS[currentIndex % DAILY_IDEAS.length];
  const IconComponent = current.icon;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_IDEAS.length);
    setCompleted(false);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    triggerHeartConfetti();
    if (onSaveItem) {
      onSaveItem({
        id: 'daily-' + current.id,
        type: 'idea',
        title: current.title,
        description: current.description,
        category: 'Daily Little Thing',
        savedAt: new Date().toISOString()
      });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
      <div className="rounded-3xl bg-linear-to-r from-rose-50/70 via-[#FAF7F4] to-amber-50/70 border border-stone-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-rose-500 shadow-2xs shrink-0 mt-1">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-700">
                A little thing for today ♡
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-[11px] text-stone-500 font-serif italic">
                {current.tag}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal leading-snug">
              {current.title}
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed max-w-xl">
              {current.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={() => {
              setCompleted(true);
              triggerHeartConfetti();
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              completed
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{completed ? 'Done today ♡' : 'Do this today'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-600'
            }`}
            title="Save to My Little Things"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            title="Next daily suggestion"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
