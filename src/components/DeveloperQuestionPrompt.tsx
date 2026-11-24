import React from 'react';

interface DeveloperQuestionPromptProps {
  onYes: () => void;
  onNo: () => void;
}

export const DeveloperQuestionPrompt: React.FC<DeveloperQuestionPromptProps> = ({
  onYes,
  onNo
}) => {
  return (
    <div 
      id="developer-question-prompt"
      className="py-16 sm:py-20 px-4 flex flex-col items-center justify-center text-center animate-fade-in select-none"
    >
      <p className="font-serif text-lg sm:text-xl text-stone-800 font-normal tracking-tight">
        Do you really wanna know the answer?
      </p>

      <div className="mt-8 flex items-center justify-center gap-10 sm:gap-12">
        <button
          id="prompt-yes-btn"
          onClick={onYes}
          type="button"
          className="min-h-[44px] min-w-[56px] px-4 py-2 text-xs sm:text-sm tracking-widest font-medium text-stone-800 hover:text-stone-950 active:scale-95 transition-all cursor-pointer"
        >
          YES
        </button>

        <button
          id="prompt-no-btn"
          onClick={onNo}
          type="button"
          className="min-h-[44px] min-w-[56px] px-4 py-2 text-xs sm:text-sm tracking-widest font-medium text-stone-500 hover:text-stone-800 active:scale-95 transition-all cursor-pointer"
        >
          NO
        </button>
      </div>
    </div>
  );
};
