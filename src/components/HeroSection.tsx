import React from 'react';
import { Sparkles, Dices, Heart } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';
import { MicrocopyRotator } from './MicrocopyRotator';

interface HeroSectionProps {
  onFindSomething: () => void;
  onSurpriseMe: () => void;
  recipientName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindSomething,
  onSurpriseMe,
  recipientName
}) => {
  const { person, recipientName: sessionName } = useSession();
  const nameToUse = recipientName || sessionName;

  const handleHeartClick = (e: React.MouseEvent) => {
    triggerHeartConfetti();
  };

  const titleText = person === 'HER' ? 'Her!?' : person === 'HIM' ? 'Him!?' : 'Us!?';
  const subActionText = person === 'HER' 
    ? 'Small things you can do, buy, say, notice, or create for her' 
    : person === 'HIM'
    ? 'Small things you can do, buy, say, notice, or create for him'
    : 'Small rituals, dates, shared memories, and things for us';

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden text-center px-4">
      {/* Soft warm aura glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[680px] h-[340px] md:h-[480px] bg-radial from-rose-100/60 via-pink-50/40 to-amber-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto">
        {/* Editorial Sub-Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50/80 border border-rose-100/80 text-rose-800 text-xs font-medium tracking-wide mb-6 shadow-2xs">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300 animate-pulse" />
          <span>A digital sanctuary dedicated to {nameToUse}</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 
          onClick={handleHeartClick}
          className="cursor-pointer select-none font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-stone-900 tracking-tight leading-[1.05] transition-transform duration-300 hover:scale-[1.01]"
        >
          {titleText} <span className="text-rose-500 font-sans text-5xl sm:text-6xl md:text-7xl font-light align-middle inline-block hover:rotate-12 transition-transform">♡</span>
        </h1>

        {/* Memorable Subtitle */}
        <div className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl text-stone-600 font-serif italic max-w-xl mx-auto leading-relaxed min-h-[36px]">
          <MicrocopyRotator />
        </div>

        <p className="mt-3 text-xs sm:text-sm text-stone-500 tracking-wide uppercase font-sans font-medium">
          {subActionText}
        </p>

        {/* Two Subtle Primary Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={onFindSomething}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-300 group-hover:rotate-12 transition-transform" />
            <span>✨ Find something for {person === 'US' ? 'us' : nameToUse}</span>
          </button>

          <button
            onClick={onSurpriseMe}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/90 hover:bg-rose-50/80 text-stone-800 border border-stone-200/80 hover:border-rose-200 font-medium text-sm tracking-wide shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Dices className="w-4 h-4 text-rose-500" />
            <span>🎲 Surprise me</span>
          </button>
        </div>

        {/* Mood Inspiration Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
          <span className="text-stone-400">explore:</span>
          {(person === 'HIM' 
            ? ['Everyday Carry', 'Gaming Setup', 'Comfort Food', 'Quiet Reassurance', 'Just Because']
            : person === 'US'
            ? ['Two-Player Dates', 'Living Room Dinners', 'Shared Keepsakes', 'Roadtrips', 'Rituals']
            : ['Flowers for Her', 'Affectionate Notes', 'Thoughtful Gifts', 'Spontaneous Dates', 'Just Because']
          ).map((pill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-white/70 border border-stone-200/60 shadow-2xs hover:border-rose-300 hover:text-rose-700 transition-colors cursor-default"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
