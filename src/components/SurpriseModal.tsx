import React, { useState } from 'react';
import { Sparkles, Dices, X, Clock, Coins, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { RANDOM_MISSIONS } from '../data/categories';
import { triggerHeartConfetti } from '../utils/confetti';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (missionText: string) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  onActionClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const currentMission = RANDOM_MISSIONS[currentIndex % RANDOM_MISSIONS.length];

  const handleNext = () => {
    setCompleted(false);
    setCurrentIndex(prev => (prev + 1) % RANDOM_MISSIONS.length);
  };

  const handleComplete = () => {
    setCompleted(true);
    triggerHeartConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-[32px] border border-stone-100 shadow-2xl p-6 sm:p-8 text-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-stone-800">Surprise Mission</h3>
              <p className="text-xs text-stone-400">A spontaneous spark of thoughtful love</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mission Content */}
        <div className="py-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            Your mission today
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl text-stone-800 leading-snug font-normal mb-4">
            “{currentMission.mission}”
          </blockquote>

          {currentMission.tip && (
            <p className="text-sm text-stone-600 bg-stone-50 border border-stone-100 p-3.5 rounded-2xl mb-4 italic">
              💡 <span className="font-normal not-italic">{currentMission.tip}</span>
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-medium text-stone-500">
            <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>{currentMission.time}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
              <Coins className="w-3.5 h-3.5 text-emerald-500" />
              <span>{currentMission.cost}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleNext}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Dices className="w-4 h-4 text-stone-400" />
            Give me another
          </button>

          {completed ? (
            <div className="w-full sm:w-1/2 py-2.5 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle className="w-4 h-4" />
              Mission Accepted!
            </div>
          ) : (
            <button
              onClick={() => {
                handleComplete();
                onActionClick(currentMission.mission);
              }}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-medium shadow-sm shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-100" />
              Accept Mission
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
