import React, { useState, useEffect } from 'react';
import { Heart, X, Sparkles, Wind, Smile, RefreshCw, Send, Check } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';

interface VirtualHugModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
}

const COMFORT_THOUGHTS = [
  'It is completely okay if all you did today was get through it.',
  'Your worth is not measured by your productivity or how much energy you have.',
  'Take a slow, deep breath. Let your shoulders drop away from your ears.',
  'The storm will pass, and you are so deeply cared for every step of the way.',
  'You bring an irreplaceable warmth into this world.'
];

export const VirtualHugModal: React.FC<VirtualHugModalProps> = ({
  isOpen,
  onClose,
  recipientName = 'You'
}) => {
  const [phase, setPhase] = useState<'breathe_in' | 'hold' | 'breathe_out'>('breathe_in');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [sentComfort, setSentComfort] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setPhase(prev => {
        if (prev === 'breathe_in') return 'hold';
        if (prev === 'hold') return 'breathe_out';
        return 'breathe_in';
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuote = COMFORT_THOUGHTS[quoteIndex % COMFORT_THOUGHTS.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-[32px] border border-stone-100 shadow-2xl p-6 sm:p-8 text-stone-800 overflow-hidden text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full">
            Virtual Comfort Room 🫂
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="font-serif text-2xl font-semibold text-stone-800 mt-3 mb-1">
          A Big Virtual Hug for {recipientName}
        </h3>
        <p className="text-xs text-stone-400 mb-6">
          Close your eyes, breathe along with the circle, and let yourself unwind.
        </p>

        {/* Breathing Animated Sphere */}
        <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
          
          {/* Outer Ripple */}
          <div 
            className={`absolute inset-0 rounded-full bg-rose-100/60 transition-transform duration-4000 ease-in-out ${
              phase === 'breathe_in' ? 'scale-110' : phase === 'hold' ? 'scale-110 animate-pulse' : 'scale-75'
            }`}
          />

          {/* Inner Heart Sphere */}
          <div 
            className={`w-32 h-32 rounded-full bg-rose-500 text-white flex flex-col items-center justify-center shadow-md shadow-rose-200 transition-transform duration-4000 ease-in-out ${
              phase === 'breathe_in' ? 'scale-105' : phase === 'hold' ? 'scale-105' : 'scale-90'
            }`}
          >
            <Heart className="w-8 h-8 fill-white mb-1" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {phase === 'breathe_in' && 'Breathe In...'}
              {phase === 'hold' && 'Hold Gently...'}
              {phase === 'breathe_out' && 'Release...'}
            </span>
          </div>
        </div>

        {/* Gentle Quote */}
        <div className="my-6 p-4 rounded-2xl bg-stone-50 border border-stone-100 text-sm font-serif italic text-stone-700 leading-relaxed relative">
          “{currentQuote}”
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => setQuoteIndex(prev => prev + 1)}
            className="px-4 py-2 rounded-full border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            <span>Another Thought</span>
          </button>

          <button
            onClick={() => {
              setSentComfort(true);
              triggerHeartConfetti();
            }}
            className="px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm shadow-rose-200 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {sentComfort ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5 fill-white" />}
            <span>{sentComfort ? 'Hug Sent! ❤️' : 'Send Virtual Hug'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
