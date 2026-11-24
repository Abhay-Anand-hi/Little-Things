import React, { useState } from 'react';
import { X, Sparkles, Heart, ArrowRight, RefreshCw, Check } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface LittleThingsQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
  onOpenFlowers: () => void;
  onLaunchCreator: (creatorType: string) => void;
}

export const LittleThingsQuizModal: React.FC<LittleThingsQuizModalProps> = ({
  isOpen,
  onClose,
  recipientName = 'her',
  onOpenFlowers,
  onLaunchCreator
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    energy: '',
    timeTogether: '',
    comfortType: ''
  });

  if (!isOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ energy: '', timeTogether: '', comfortType: '' });
  };

  const handleSelect = (key: 'energy' | 'timeTogether' | 'comfortType', val: string) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Result step
      triggerHeartConfetti();
    }
  };

  // Determine recommendation based on choices
  const getRecommendation = () => {
    if (answers.energy === 'drained') {
      return {
        badge: 'Silent Comfort & Rest',
        title: `A Quiet Sanctuary for ${recipientName}`,
        description: `She is mentally exhausted. What she needs most isn't an elaborate activity or questions about her day; she needs you to lower the lights, pour her favorite drink, and give her an unhurried back rub without expecting conversation.`,
        flower: 'Chamomile Daisies or French Lavender',
        actionLabel: 'Plan a Movie & Comfort Night',
        actionType: 'date_plan'
      };
    } else if (answers.comfortType === 'words') {
      return {
        badge: 'Vocal Affirmation & Affection',
        title: `Words She Secretly Longs to Hear`,
        description: `Right now, her heart wants reassurance. Write her an unprompted digital love letter or tuck three small handwritten notes into her coat pocket. Remind her of one thing you noticed she did recently.`,
        flower: 'Blush Pink Tulips or Baby\'s Breath',
        actionLabel: 'Write Her a Love Letter',
        actionType: 'love_letter'
      };
    } else if (answers.energy === 'restless') {
      return {
        badge: 'Spontaneous Adventure',
        title: `An Unplanned Twilight Escape`,
        description: `She needs fresh air and laughter. Whisk her away on an unannounced evening drive to get her favorite ice cream or warm dessert, playing her favorite songs with the windows rolled down.`,
        flower: 'Yellow Sunflowers',
        actionLabel: 'Plan a Surprise Mini Date',
        actionType: 'date_plan'
      };
    } else {
      return {
        badge: 'Thoughtful Micro-Gesture',
        title: `The "Just Because" Surprise`,
        description: `Give her a single flower stem, send a photo of something that made you smile, and let her know she was your very first and favorite thought of the day.`,
        flower: 'White Roses & Daisies',
        actionLabel: 'Explore Flowers for Her',
        actionType: 'flowers'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F4] rounded-3xl border border-rose-100 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-900 flex items-center justify-center border border-stone-200 transition-colors shadow-2xs z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-500" />
            <span>3-Question Intuition Quiz</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            What does she need today?
          </h2>
          <p className="mt-1 text-xs text-stone-500 font-serif italic">
            Step {Math.min(step, 3)} of 3 • Tuned for {recipientName}
          </p>
        </div>

        {/* Step 1: Energy */}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-stone-900 text-center mb-4">
              How would you describe her energy levels today?
            </h3>
            {[
              { id: 'drained', label: 'Tired, overwhelmed or running on empty', emoji: '😴' },
              { id: 'normal', label: 'Balanced, going about her regular day', emoji: '☕' },
              { id: 'restless', label: 'Restless, craving a change of scenery', emoji: '🚗' },
              { id: 'excited', label: 'Happy, glowing or accomplished', emoji: '✨' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('energy', item.id)}
                className="w-full p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 hover:shadow-xs text-left flex items-center gap-3 transition-all"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs sm:text-sm font-medium text-stone-800">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Time Available */}
        {step === 2 && (
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-stone-900 text-center mb-4">
              How much time do you two have together?
            </h3>
            {[
              { id: 'distance', label: 'We are apart / Long distance right now', emoji: '📱' },
              { id: 'few-mins', label: 'Just a quick 5–15 minutes between tasks', emoji: '⏱️' },
              { id: 'evening', label: 'The entire evening or weekend to relax', emoji: '🌙' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('timeTogether', item.id)}
                className="w-full p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 hover:shadow-xs text-left flex items-center gap-3 transition-all"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs sm:text-sm font-medium text-stone-800">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: What touches her heart most */}
        {step === 3 && (
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-stone-900 text-center mb-4">
              What usually makes her feel most loved?
            </h3>
            {[
              { id: 'words', label: 'Gentle words, sincere compliments & letters', emoji: '💌' },
              { id: 'acts', label: 'Quiet helpful acts & taking care of tasks for her', emoji: '🧸' },
              { id: 'presence', label: 'Uninterrupted presence & physical closeness', emoji: '🫂' },
              { id: 'gifts', label: 'Surprise little treats, flowers or tokens', emoji: '🎁' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect('comfortType', item.id)}
                className="w-full p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-rose-300 hover:shadow-xs text-left flex items-center gap-3 transition-all"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs sm:text-sm font-medium text-stone-800">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100">
              <span className="text-xs uppercase tracking-widest font-semibold text-rose-700">
                {recommendation.badge}
              </span>
              <h3 className="font-serif text-2xl text-stone-900 mt-1">
                {recommendation.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-serif italic mt-2 leading-relaxed">
                {recommendation.description}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Recommended Flower:</span>
              <span className="font-serif font-semibold text-rose-700">🌷 {recommendation.flower}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => {
                  if (recommendation.actionType === 'flowers') {
                    onOpenFlowers();
                  } else {
                    onLaunchCreator(recommendation.actionType);
                  }
                  onClose();
                }}
                className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{recommendation.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-4 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
