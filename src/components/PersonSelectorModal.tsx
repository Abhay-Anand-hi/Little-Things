import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { PersonMode } from '../types';
import { useSession } from '../context/SessionContext';

interface PersonSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerson?: (mode: PersonMode | null) => void;
}

export const PersonSelectorModal: React.FC<PersonSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectPerson
}) => {
  const { person, setPerson } = useSession();

  if (!isOpen) return null;

  const handleChoose = (mode: PersonMode | null) => {
    setPerson(mode);
    if (onSelectPerson) onSelectPerson(mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 text-lg mx-auto mb-4">
          ♡
        </div>

        <h2 className="font-serif text-3xl font-normal text-stone-900">
          Little Things ♡
        </h2>
        <p className="font-serif italic text-stone-500 text-base mt-1 mb-8">
          Who are you thinking about?
        </p>

        <div className="space-y-3.5">
          <button
            onClick={() => handleChoose('HER')}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              person === 'HER'
                ? 'border-rose-400 bg-rose-50/50 shadow-xs'
                : 'border-stone-200 hover:border-rose-300 hover:bg-rose-50/30'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-xl shadow-2xs">
                🌷
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-medium">HER</h3>
                <p className="text-xs text-stone-500">Curated flowers, gifts, gentle words, and surprises.</p>
              </div>
            </div>
            <span className="text-rose-600 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Select →
            </span>
          </button>

          <button
            onClick={() => handleChoose('HIM')}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              person === 'HIM'
                ? 'border-stone-800 bg-stone-50 shadow-xs'
                : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/70'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-300 flex items-center justify-center text-xl shadow-2xs">
                🖤
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-medium">HIM</h3>
                <p className="text-xs text-stone-500">Everyday carry, quiet appreciation, gaming, and gestures.</p>
              </div>
            </div>
            <span className="text-stone-700 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Select →
            </span>
          </button>

          <button
            onClick={() => handleChoose('US')}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              person === 'US'
                ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50/30'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-xl shadow-2xs">
                🤍
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-medium">US</h3>
                <p className="text-xs text-stone-500">Shared rituals, date nights, memories, and two-player moments.</p>
              </div>
            </div>
            <span className="text-amber-700 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Select →
            </span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => handleChoose(null)}
            className="text-xs font-serif italic text-stone-500 hover:text-stone-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>← Return to selection screen</span>
          </button>
          <span className="text-[11px] text-stone-400 font-sans">
            Switch anytime
          </span>
        </div>

      </div>
    </div>
  );
};
