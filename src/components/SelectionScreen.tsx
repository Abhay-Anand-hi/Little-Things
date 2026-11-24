import React from 'react';
import { motion } from 'motion/react';
import { PersonMode } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SelectionScreenProps {
  onSelectPerson: (mode: PersonMode) => void;
}

interface PersonaCard {
  id: PersonMode;
  emoji: string;
  title: string;
  tagline: string;
  path: string;
  image: string;
  imageAlt: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  hoverGlow: string;
  highlights: string[];
}

const PERSONA_CARDS: PersonaCard[] = [
  {
    id: 'HER',
    emoji: '🌷',
    title: 'HER',
    tagline: '“For the girl on your mind.”',
    path: '/her',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Soft botanical flowers and warm light',
    accentBorder: 'hover:border-rose-300',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    hoverGlow: 'hover:shadow-rose-100/50',
    highlights: [
      'Curated botanical stems & meanings',
      'Dainty jewelry & gentle tokens',
      'Handwritten letters & reassurance',
      'Bad-day comfort & micro-surprises'
    ]
  },
  {
    id: 'HIM',
    emoji: '🖤',
    title: 'HIM',
    tagline: '“For the guy you\'re thinking about.”',
    path: '/him',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Everyday carry, notebook, watch and warm coffee',
    accentBorder: 'hover:border-stone-500',
    badgeBg: 'bg-stone-100',
    badgeText: 'text-stone-800',
    hoverGlow: 'hover:shadow-stone-200/50',
    highlights: [
      'Everyday carry & desk accessories',
      'Quiet appreciation & affirmation notes',
      'Cozy takeout & comfort food rituals',
      'Unhurried dates & gaming treats'
    ]
  },
  {
    id: 'US',
    emoji: '🤍',
    title: 'US',
    tagline: '“For the two of you.”',
    path: '/us',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Two warm coffee cups on a wooden table in quiet morning sunlight',
    accentBorder: 'hover:border-amber-300',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    hoverGlow: 'hover:shadow-amber-100/50',
    highlights: [
      'Shared rituals & screen-free nights',
      'Two-player date itineraries',
      'Our story memories & milestones',
      'Playful couple quizzes & questions'
    ]
  }
];

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ onSelectPerson }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F4] text-stone-900 font-sans selection:bg-rose-100 selection:text-rose-900 flex flex-col justify-between relative overflow-hidden">
      
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-rose-100/25 via-amber-50/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Subtle Brand Bar */}
      <header className="max-w-6xl w-full mx-auto px-6 sm:px-8 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 text-sm shadow-2xs">
            ♡
          </div>
          <span className="font-serif text-xl font-normal tracking-tight text-stone-800">
            Little Things
          </span>
        </div>

        <div className="text-xs font-serif italic text-stone-500">
          The art of quiet care
        </div>
      </header>

      {/* Center Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        
        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 text-stone-600 text-xs font-medium tracking-wide shadow-2xs mb-5">
            <span className="text-rose-500">♡</span>
            <span>Little Things</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 tracking-tight leading-tight">
            Who are you thinking about?
          </h1>

          <p className="mt-4 text-stone-600 font-serif italic text-lg sm:text-xl leading-relaxed">
            Choose whose day you want to make a little less ordinary.
          </p>
        </motion.div>

        {/* The 3 Equal Visual Hierarchy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          {PERSONA_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="flex"
            >
              <button
                id={`select-person-${card.id.toLowerCase()}`}
                onClick={() => onSelectPerson(card.id)}
                className={`w-full group text-left bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs hover:shadow-xl ${card.accentBorder} ${card.hoverGlow} transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-stone-400`}
              >
                <div>
                  {/* Top Emoji Emblem */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${card.badgeBg} border border-stone-200/60 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                      {card.emoji}
                    </div>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-400 group-hover:text-stone-700 transition-colors">
                      {card.path}
                    </span>
                  </div>

                  {/* Persona Title */}
                  <h2 className="font-serif text-3xl font-medium tracking-wide text-stone-900 group-hover:text-stone-950 transition-colors">
                    {card.title}
                  </h2>

                  {/* Poetic Tagline */}
                  <p className="font-serif italic text-stone-600 text-base mt-1.5 min-h-[48px]">
                    {card.tagline}
                  </p>

                  {/* Curated Aesthetic Imagery */}
                  <div className="mt-4 mb-5 rounded-2xl overflow-hidden aspect-16/10 bg-stone-100 border border-stone-200/70 relative">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>

                  {/* Subtle Divider Line */}
                  <div className="border-t border-stone-200/80 my-4" />

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 text-xs text-stone-500 font-sans">
                    {card.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Call to Action Button */}
                <div className="mt-7 pt-4 border-t border-stone-100 flex items-center justify-between w-full">
                  <span className="text-xs font-semibold tracking-wide text-stone-700 group-hover:text-stone-950 transition-colors">
                    Choose {card.title === 'US' ? 'Us' : card.title === 'HER' ? 'Her' : 'Him'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-stone-900 text-stone-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </main>

      {/* Editorial Footer */}
      <footer className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-8 border-t border-stone-200/60 text-center text-xs text-stone-400 font-serif italic">
        <p>Little Things ♡ · Dedicated to the quiet art of making someone feel deeply cherished.</p>
        <p className="text-[11px] text-stone-400 mt-1 font-sans not-italic">
          You can switch between Her, Him, and Us anytime once inside.
        </p>
      </footer>

    </div>
  );
};
