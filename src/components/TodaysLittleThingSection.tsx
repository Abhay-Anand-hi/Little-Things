import React, { useState } from 'react';
import { SavedHerItem, CreationType } from '../types';
import { RefreshCw, Bookmark, ArrowRight, Heart, Sparkles, Check, Copy } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { useSession } from '../context/SessionContext';

interface TodaysLittleThingSectionProps {
  recipientName: string;
  onSaveItem: (item: SavedHerItem) => void;
  isSaved: boolean;
  onOpenCreator?: (type: CreationType) => void;
  onOpenFlowers?: () => void;
}

interface LittleThingItem {
  id: string;
  title: string;
  category: string;
  description: string;
  emotionalDetail: string;
  time: string;
  cost: string;
  actionRoute?: CreationType | 'flowers';
  actionLabel?: string;
  copyText?: string;
}

const HER_IDEAS: LittleThingItem[] = [
  {
    id: 'daily-her-1',
    title: 'The Unprompted Forehead Kiss & Hot Tea',
    category: 'Gentle Comfort',
    description: 'Brew her favorite chamomile or vanilla tea. Bring it to wherever she is sitting, kiss the crown of her head, and walk away without asking for anything.',
    emotionalDetail: 'Zero-pressure care makes a woman feel completely protected and loved for who she is.',
    time: '5 mins',
    cost: '₹0'
  },
  {
    id: 'daily-her-2',
    title: 'A Single Daisy on Her Passenger Seat',
    category: 'Floral Surprise',
    description: 'Stop by a roadside flower seller on the way to pick her up. Lay a single stem right on her seat with a one-line sticky note.',
    emotionalDetail: 'Proves that before she even stepped into your day, she was already occupying your thoughts.',
    time: '5 mins',
    cost: 'Under ₹100',
    actionRoute: 'flowers',
    actionLabel: 'Browse flowers for her'
  },
  {
    id: 'daily-her-3',
    title: 'The "Reasons You Look Pretty Today" Voice Note',
    category: 'Love Note',
    description: 'Record a gentle 30-second audio message pointing out a tiny, specific habit of hers: how she smiles when excited, or how soft her sweater looked.',
    emotionalDetail: 'Spoken words carry inflection, warmth, and intimacy that text messages can never quite match.',
    time: '30 secs',
    cost: '₹0',
    actionRoute: 'love_letter',
    actionLabel: 'Write a full love letter'
  },
  {
    id: 'daily-her-4',
    title: 'Warming Her Mug with Hot Water First',
    category: 'Morning Ritual',
    description: 'Swirl boiling water inside her ceramic mug to pre-heat the pottery before pouring her morning coffee or tea.',
    emotionalDetail: 'A whisper-quiet micro detail that keeps her drink warm twice as long.',
    time: '1 min',
    cost: '₹0'
  },
  {
    id: 'daily-her-5',
    title: 'The Question-Free Comfort Sanctuary',
    category: 'Bad Day Sanctuary',
    description: 'If she had an exhausting day, say: “You don\'t have to explain anything. Just sit next to me and rest.” Then let her lean against you in silence.',
    emotionalDetail: 'Replaces the burden of articulating stress with unconditional emotional presence.',
    time: 'Unhurried',
    cost: '₹0'
  }
];

const HIM_IDEAS: LittleThingItem[] = [
  {
    id: 'daily-him-1',
    title: 'The Cold Espresso & Uninterrupted Hour',
    category: 'Respect & Space',
    description: 'Place an iced espresso or his favorite cold drink by his setup, give his shoulder a firm squeeze, and let him focus on his game or project without asking questions.',
    emotionalDetail: 'Men feel deeply respected when their space and recharge time are protected without guilt.',
    time: '2 mins',
    cost: 'Under ₹150'
  },
  {
    id: 'daily-him-2',
    title: 'The "I Notice Your Hard Work" Voice Note',
    category: 'Quiet Recognition',
    description: 'Record a 20-second voice note mentioning one specific thing he took care of this week and tell him you see his quiet dedication.',
    emotionalDetail: 'Men rarely receive unprompted verbal appreciation for the heavy lifting they do quietly.',
    time: '30 secs',
    cost: '₹0',
    copyText: 'Hey, I just wanted to say I notice how hard you’ve been working and how well you handle things. I’m really proud of you.'
  },
  {
    id: 'daily-him-3',
    title: 'Washing His Car Windshield or Organizing His Keys',
    category: 'Everyday Care',
    description: 'Wipe his car or bike mirrors clean or place his keys and wallet neatly together before he heads out in the morning.',
    emotionalDetail: 'Practical thoughtfulness shows you care about how smoothly his day begins.',
    time: '3 mins',
    cost: '₹0'
  },
  {
    id: 'daily-him-4',
    title: 'The Spontaneous Street Food Run',
    category: 'Comfort Ritual',
    description: 'Tell him: “Get your shoes on, I’m taking you out for that burger / shawarma you were craving.” You drive and you pick up the tab.',
    emotionalDetail: 'Reverses the pressure of always planning and gives him a carefree treat.',
    time: '45 mins',
    cost: 'Under ₹400'
  },
  {
    id: 'daily-him-5',
    title: 'The Firm Long Hug When He Walks In',
    category: 'Physical Reassurance',
    description: 'When he walks through the door after a long workday, hold him for 15 seconds without speaking about chores or to-do lists.',
    emotionalDetail: 'Signals that home with you is a safe haven where he can finally put down his armor.',
    time: '1 min',
    cost: '₹0'
  }
];

const US_IDEAS: LittleThingItem[] = [
  {
    id: 'daily-us-1',
    title: 'The 20-Minute Living Room Tea Catch-up',
    category: 'Shared Ritual',
    description: 'Put both phones in another room. Sit on the rug with two mugs of tea and ask: “What was the most surprising moment of your day?”',
    emotionalDetail: 'Carves out intentional shared sanctuary away from screens and notifications.',
    time: '20 mins',
    cost: '₹0'
  },
  {
    id: 'daily-us-2',
    title: 'The Impromptu Grocery Aisle Challenge',
    category: 'Two-Player Fun',
    description: 'Give each other ₹200 and 7 minutes in a grocery market to pick 2 snacks that the other has never tasted before.',
    emotionalDetail: 'Injects child-like spontaneity and laughter into mundane domestic errands.',
    time: '15 mins',
    cost: 'Under ₹400'
  },
  {
    id: 'daily-us-3',
    title: 'The Unplanned Sunset Walk',
    category: 'Slow Connection',
    description: 'Step outside together just as golden hour starts. Walk around the block without anywhere to rush to.',
    emotionalDetail: 'Side-by-side walking unlocks honest, relaxed conversations that don’t happen while sitting across a table.',
    time: '30 mins',
    cost: '₹0'
  }
];

export const TodaysLittleThingSection: React.FC<TodaysLittleThingSectionProps> = ({
  recipientName = 'her',
  onSaveItem,
  isSaved,
  onOpenCreator,
  onOpenFlowers
}) => {
  const { person } = useSession();
  const [index, setIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);

  const dataset = person === 'HIM' ? HIM_IDEAS : person === 'US' ? US_IDEAS : HER_IDEAS;
  const currentIdea = dataset[index % dataset.length];

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % dataset.length);
      setIsRotating(false);
    }, 250);
  };

  const handleSave = () => {
    onSaveItem({
      id: currentIdea.id,
      title: currentIdea.title,
      category: currentIdea.category,
      description: currentIdea.description,
      emotionalNote: currentIdea.emotionalDetail,
      cost: currentIdea.cost,
      savedAt: new Date().toISOString()
    });
    triggerHeartConfetti();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = person === 'HIM' ? 'text-stone-800' : person === 'US' ? 'text-amber-800' : 'text-rose-600';
  const badgeBg = person === 'HIM' ? 'bg-stone-100 text-stone-800 border-stone-300' : person === 'US' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-rose-50 text-rose-800 border-rose-200';

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-linear-to-br from-stone-900 via-stone-900 to-stone-950 text-white p-6 sm:p-10 md:p-12 shadow-xl overflow-hidden border border-stone-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${badgeBg}`}>
                ✨ Today's Little Thing
              </span>
              <span className="text-xs text-stone-400 font-serif italic">
                Thoughtful suggestion of the day
              </span>
            </div>

            <div className={`transition-opacity duration-300 ${isRotating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="inline-block text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2">
                {currentIdea.category}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white leading-tight">
                {currentIdea.title}
              </h3>

              <p className="mt-4 text-stone-300 text-base sm:text-lg leading-relaxed">
                {currentIdea.description}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <p className="text-xs text-rose-200/90 font-serif italic leading-relaxed">
                  “{currentIdea.emotionalDetail}”
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                <span className="px-3 py-1 rounded-full bg-white/10 text-stone-300">
                  ⏱️ {currentIdea.time}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-stone-300">
                  🏷️ {currentIdea.cost}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
            <button
              onClick={handleSave}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isSaved
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-stone-900 hover:bg-stone-100 shadow-xs'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved in Little Things' : 'Save this gesture'}</span>
            </button>

            {currentIdea.copyText && (
              <button
                onClick={() => handleCopy(currentIdea.copyText!)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all border border-white/15"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to clipboard' : 'Copy suggested text'}</span>
              </button>
            )}

            {currentIdea.actionRoute === 'flowers' && onOpenFlowers && (
              <button
                onClick={onOpenFlowers}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold tracking-wide transition-all border border-rose-500/30"
              >
                <span>🌷</span>
                <span>{currentIdea.actionLabel || 'Explore Flowers'}</span>
              </button>
            )}

            <button
              onClick={handleRotate}
              disabled={isRotating}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Show another idea</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
