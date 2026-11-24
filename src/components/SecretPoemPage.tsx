import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SecretPoemPageProps {
  onClose: () => void;
}

/**
 * EXACT SHAYARI TEXTS
 * Strictly preserved without altering any word, spelling, punctuation, capitalization, or line break.
 */

// Chapter I: “Itna Pyara.. !??”
const CH1_STANZA_1 = [
  'Koe itna pyara kase ho sakta h,',
  'woo bhi pura ka pura kese ho sakta h,',
  'uski adaon ki kya hi kehne,',
  'uska haar ruh afsana sa lagta h.'
];

const CH1_STANZA_2 = [
  'Uske chre pe ek alag si muskan h,',
  'issi chalte uspe mera dill qurban h,',
  'aakhein itni pyari ki agar ek baar dekho to haar pall ussi ka yaad aata h,',
  'ye wo h jisko dekh kr dill aaur dimag Saab ojhal sa ho jata h,',
  'Heee Prabhu ye kya ho gya h,',
  'kahi Mera dill "uff" ,',
  'Kyaa aasa bhi kabhi ho sakta h !?'
];

// Chapter II: “The Appearance”
const CH2_PART_1 = [
  'Unki aahat meshoos hote hi ye samay tham sa jata h,',
  'Jab wo paas aane lagti h tab ye dil dhak dhak sa karne lagta h,',
  'unki aawaz sunn kr humari aakhon mein unka talash sa uthta h,',
  'unki nazro pr nazar prte hi dil halka khone sa lagta h,',
  'unki aakhon ko dekh kr usme doobne ka dill krta h,',
  'unki muskurahat ko dekhte hi ye bechani kaam sa hone lagta h,',
  'jase hi wo paas aa jate h humare ye mausam suhana sa ho jata h,'
];

const CH2_PART_2 = [
  'unke bole gye lavso ko sunn kr humara maan khone sa hone lagta h,',
  'unse battein kr ke din ka phla sukoon milta hota h,',
  'unki zulfon ko dekh kr pyara sa jaduu hota h,',
  'unke kandhe tale maar Jane ka Maan krta h,',
  'unki komal hathon ko dekh kr usko tham lu aasa lagta h,',
  'unki pyal ki aawaz sunn kr sab ojhal sa lagta h,'
];

const CH2_CLIMAX = [
  'ek whi h jisko dekh kr,',
  'Pyar ka aasli matlab samajh aata h.'
];

const CH2_CONFESSION = 'Me..?? All because of her....!!';

/**
 * SecretPoemPage
 * 
 * An intimate, cinematic handwritten diary discovered like an unfinished memory.
 * Features two chapters:
 * - Chapter I: “Itna Pyara.. !??” (realizing how beautiful she is)
 * - Chapter II: “The Appearance” (what happens inside whenever she appears)
 * 
 * Followed by the whispered realization:
 *   “Me..?? All because of her....!!”
 * 
 * And settled with the quiet signature:
 *   “~Remember Me ?”
 */
export const SecretPoemPage: React.FC<SecretPoemPageProps> = ({ onClose }) => {
  // Global diary atmosphere
  const [atmosphereVisible, setAtmosphereVisible] = useState(false);
  const [decorationsVisible, setDecorationsVisible] = useState(false);

  // Active chapter: 1 | 2
  const [activeChapter, setActiveChapter] = useState<1 | 2>(1);
  // Fade opacity of current chapter content (for quiet, invisible dissolve)
  const [chapterContentOpacity, setChapterContentOpacity] = useState(1);

  // Chapter 1 staged reveal states
  const [ch1TitleVisible, setCh1TitleVisible] = useState(false);
  const [ch1Stanza1Visible, setCh1Stanza1Visible] = useState(false);
  const [ch1Stanza2Visible, setCh1Stanza2Visible] = useState(false);

  // Chapter 2 staged reveal states
  const [ch2TitleVisible, setCh2TitleVisible] = useState(false);
  const [ch2Part1Visible, setCh2Part1Visible] = useState(false);
  const [ch2Part2Visible, setCh2Part2Visible] = useState(false);
  const [ch2ClimaxVisible, setCh2ClimaxVisible] = useState(false);
  const [ch2ConfessionVisible, setCh2ConfessionVisible] = useState(false);

  // “~Remember Me ?” signature visibility (appears only after second chapter & confession)
  const [rememberMeVisible, setRememberMeVisible] = useState(false);

  // Timers tracker
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Chapter 2 staged cinematic reveal
  const startChapter2Sequence = () => {
    // 1. “The Appearance” slowly fades into view (500ms)
    const t1 = setTimeout(() => {
      setCh2TitleVisible(true);
    }, 500);

    // 2. First lines of Shayari gently fade in (2400ms)
    const t2 = setTimeout(() => {
      setCh2Part1Visible(true);
    }, 2400);

    // 3. Next lines follow softly (4600ms)
    const t3 = setTimeout(() => {
      setCh2Part2Visible(true);
    }, 4600);

    // 4. Final climax lines appear with an emotional pause (7000ms)
    const t4 = setTimeout(() => {
      setCh2ClimaxVisible(true);
    }, 7000);

    // 5. Emotional peak: “Me..?? All because of her....!!” appears after generous space (10200ms)
    const t5 = setTimeout(() => {
      setCh2ConfessionVisible(true);
    }, 10200);

    // 6. Silence & emotional pause, then “~Remember Me ?” settles last (14000ms)
    const t6 = setTimeout(() => {
      setRememberMeVisible(true);
    }, 14000);

    timersRef.current.push(t1, t2, t3, t4, t5, t6);
  };

  // Turn from Chapter 1 to Chapter 2 with a quiet, invisible dissolve
  const transitionToChapter2 = () => {
    // 1. First Shayari gently fades out (1200ms)
    setChapterContentOpacity(0);

    // 2. Background remains warm and still. Hold quiet pause for 1.6 seconds.
    const tSwitch = setTimeout(() => {
      setActiveChapter(2);

      // Reset Chapter 2 states
      setCh2TitleVisible(false);
      setCh2Part1Visible(false);
      setCh2Part2Visible(false);
      setCh2ClimaxVisible(false);
      setCh2ConfessionVisible(false);
      setRememberMeVisible(false);

      // Bring content container opacity back up smoothly
      setChapterContentOpacity(1);

      // Start Chapter 2 reveal
      startChapter2Sequence();
    }, 1600);

    timersRef.current.push(tSwitch);
  };

  // Mount sequence: Warm light emerges -> Chapter 1 -> Automatic gentle transition to Chapter 2
  useEffect(() => {
    // 1. Atmosphere & warm night light slowly emerge (400ms)
    const tAtmosphere = setTimeout(() => {
      setAtmosphereVisible(true);
    }, 400);

    // 2. Subtle diary decorations settle (700ms)
    const tDecor = setTimeout(() => {
      setDecorationsVisible(true);
    }, 700);

    // 3. Chapter I Title: “Itna Pyara.. !??” gently fades in (1200ms)
    const tTitle1 = setTimeout(() => {
      setCh1TitleVisible(true);
    }, 1200);

    // 4. Stanza 1 of Chapter I softly fades in (2800ms)
    const tStanza1 = setTimeout(() => {
      setCh1Stanza1Visible(true);
    }, 2800);

    // 5. Stanza 2 of Chapter I follows (4200ms)
    const tStanza2 = setTimeout(() => {
      setCh1Stanza2Visible(true);
    }, 4200);

    // 6. Generous reading pause for Chapter I (~13.5s after Stanza 2 finishes)
    // Then quiet, invisible transition to Chapter II: “The Appearance”
    const tAutoNext = setTimeout(() => {
      transitionToChapter2();
    }, 17800);

    timersRef.current.push(tAtmosphere, tDecor, tTitle1, tStanza1, tStanza2, tAutoNext);

    return () => {
      clearAllTimers();
    };
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="secret-poem-page"
      className="relative w-full min-h-screen flex flex-col justify-between px-5 sm:px-8 md:px-16 py-8 sm:py-12 select-none overflow-x-hidden"
      style={{
        backgroundColor: activeChapter === 2 ? '#FAF4EC' : '#FAF5EE',
        backgroundImage: activeChapter === 2
          ? `radial-gradient(ellipse at 50% 22%, rgba(255, 246, 238, 0.98) 0%, rgba(251, 240, 230, 0.95) 45%, rgba(246, 230, 218, 0.92) 75%, rgba(236, 216, 204, 0.96) 100%)`
          : `radial-gradient(ellipse at 52% 24%, rgba(255, 248, 241, 0.98) 0%, rgba(251, 242, 233, 0.94) 45%, rgba(246, 233, 222, 0.9) 75%, rgba(238, 220, 208, 0.96) 100%)`,
        boxShadow: 'inset 0 0 80px rgba(60, 25, 32, 0.06), inset 0 0 160px rgba(45, 18, 24, 0.04)',
        transition: 'background-color 2000ms ease, background-image 2000ms ease'
      }}
    >
      {/* 
        Tactile paper / memory micro-grain
        Barely visible organic texture giving warmth and memory depth, not a stationery template.
      */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 
        Warm Diffused Night-Light
        Soft light falling onto an open handwritten page late at night.
        Slightly warmer and deeper for Chapter II.
      */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-[2200ms] ease-out"
        style={{
          opacity: atmosphereVisible ? 1 : 0,
          background: activeChapter === 2
            ? 'radial-gradient(circle at 48% 26%, rgba(255, 230, 212, 0.25) 0%, rgba(255, 212, 196, 0.09) 52%, transparent 80%)'
            : 'radial-gradient(circle at 48% 28%, rgba(255, 235, 218, 0.22) 0%, rgba(255, 218, 202, 0.08) 50%, transparent 80%)'
        }}
      />

      {/* Ambient delicate corner marks (quietly positioned around the outer margins) */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-[1500ms]"
        style={{ opacity: atmosphereVisible ? 0.75 : 0 }}
        aria-hidden="true"
      >
        <span className="absolute top-[12%] left-[6%] sm:left-[10%] text-rose-900/25 text-xs select-none">✦</span>
        <span className="absolute top-[34%] right-[7%] sm:right-[11%] text-stone-500/20 text-[10px] select-none">⋆</span>
        <span className="absolute bottom-[28%] left-[7%] sm:left-[11%] text-stone-500/20 text-xs select-none">⋆</span>
        <span className="absolute bottom-[16%] right-[5%] sm:right-[9%] text-rose-900/25 text-[11px] select-none">✦</span>
      </div>

      {/* 
        Diary Header:
        A quiet handwritten greeting at the top of the discovered page.
        Includes a tiny, faint, non-interactive chapter indicator (♡ 01 / ♡ 02).
      */}
      <header
        className="relative z-10 w-full max-w-xl mx-auto flex items-center justify-between text-stone-400/80 mb-6 sm:mb-10 transition-opacity duration-[1200ms] ease-out"
        style={{ opacity: decorationsVisible ? 1 : 0 }}
      >
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-rose-900/40 tracking-widest text-xs select-none">
            ˚₊‧ ୨୧ ‧₊˚
          </span>
          <span className="text-stone-300/70 select-none">|</span>
          <span className="font-serif italic text-[11px] sm:text-xs tracking-wider text-stone-400/80 select-none">
            private diary
          </span>
        </div>

        {/* 
          Extremely minimal chapter marker:
          ♡ 01 for Chapter I, ♡ 02 for Chapter II
          Tiny, faint, elegant, non-interactive.
        */}
        <div className="flex items-center gap-2 text-rose-900/35 text-xs select-none">
          <span className="font-serif italic tracking-widest text-[10px] sm:text-[11px]">
            {activeChapter === 1 ? '♡ 01' : '♡ 02'}
          </span>
          <span className="text-rose-900/30">𓂃</span>
        </div>
      </header>

      {/* 
        Main Canvas: The Handwritten Diary Pages
        No card, no border, no UI container — sitting naturally in the emotional center.
        Smooth, quiet fade between chapters.
      */}
      <main
        className="relative z-10 w-full max-w-xl mx-auto flex-1 flex flex-col justify-center my-auto py-2 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: chapterContentOpacity }}
      >
        
        {/* =========================================================================
            CHAPTER I: “Itna Pyara.. !??”
            Realizing how beautiful she is
           ========================================================================= */}
        {activeChapter === 1 && (
          <div id="secret-chapter-1" className="w-full">
            {/* 
              CINEMATIC TITLE: “Itna Pyara.. !??”
              Title of a private memory with tiny handwritten annotation.
            */}
            <div
              id="secret-poem-title"
              className="text-center mb-6 sm:mb-8 transition-all duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1)"
              style={{
                opacity: ch1TitleVisible ? 1 : 0,
                transform: ch1TitleVisible ? 'translateY(0)' : 'translateY(5px)'
              }}
            >
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 select-none">
                <span className="text-[11px] sm:text-xs text-rose-900/35 select-none" aria-hidden="true">
                  ˚₊‧
                </span>
                <h1
                  className="font-serif italic text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight font-normal tracking-wide text-[#7E2530] select-none m-0 p-0 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                >
                  Itna Pyara.. !??
                </h1>
                <span className="text-[11px] sm:text-xs text-rose-900/35 select-none" aria-hidden="true">
                  ‧₊˚
                </span>
              </div>

              {/* Tiny subtle handwritten diary detail */}
              <p className="font-['Caveat',cursive] text-[13px] sm:text-[14px] text-rose-950/40 font-normal tracking-wider m-0 mt-1.5 select-none">
                𓂃 written somewhere between a thought & a feeling 𓂃
              </p>

              {/* Small decorative element under the title */}
              <div
                className="flex items-center justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-3.5 text-rose-900/35 text-xs select-none"
                aria-hidden="true"
              >
                <span className="w-5 sm:w-8 h-[1px] bg-rose-300/35 inline-block" />
                <span>𓂃</span>
                <span className="text-xs text-rose-900/45">♡</span>
                <span>𓂃</span>
                <span className="w-5 sm:w-8 h-[1px] bg-rose-300/35 inline-block" />
              </div>
            </div>

            {/* The Handwritten Poem */}
            <div className="px-1 sm:px-3">
              {/* Stanza 1 */}
              <div
                className="transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: ch1Stanza1Visible ? 1 : 0,
                  transform: ch1Stanza1Visible ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                <div className="font-['Caveat',cursive] text-[21px] sm:text-[25px] md:text-[28px] lg:text-[30px] leading-[1.68] sm:leading-[1.78] text-[#2D1E22] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH1_STANZA_1.map((line, idx) => (
                    <p key={`ch1-s1-${idx}`} className="m-0 p-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Atmospheric Separator between Stanzas */}
              <div
                className="my-6 sm:my-8 flex items-center justify-center gap-2.5 sm:gap-3 text-rose-900/40 text-xs sm:text-sm select-none transition-opacity duration-[1200ms]"
                style={{ opacity: decorationsVisible ? 0.8 : 0 }}
              >
                <span className="text-xs text-rose-900/40 select-none">୨୧</span>
                <span className="w-6 sm:w-12 h-[1px] bg-rose-300/35 inline-block" />
                <span className="text-[11px] sm:text-xs tracking-wider text-rose-900/45 select-none">⋆⋅☆⋅⋆</span>
                <span>𓂃</span>
                <span className="text-sm text-rose-900/65 select-none" title="🥀">🥀</span>
                <span>𓂃</span>
                <span className="text-[11px] sm:text-xs tracking-wider text-rose-900/45 select-none">⋆⋅☆⋅⋆</span>
                <span className="w-6 sm:w-12 h-[1px] bg-rose-300/35 inline-block" />
                <span className="text-xs text-rose-900/40 select-none">୨୧</span>
              </div>

              {/* Stanza 2 */}
              <div
                className="transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: ch1Stanza2Visible ? 1 : 0,
                  transform: ch1Stanza2Visible ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                <div className="font-['Caveat',cursive] text-[21px] sm:text-[25px] md:text-[28px] lg:text-[30px] leading-[1.68] sm:leading-[1.78] text-[#2D1E22] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH1_STANZA_2.map((line, idx) => (
                    <p key={`ch1-s2-${idx}`} className="m-0 p-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Closing Flourish below Chapter I */}
              <div
                className="mt-6 sm:mt-8 flex items-center justify-between text-xs sm:text-sm select-none transition-opacity duration-[1200ms]"
                style={{ opacity: decorationsVisible ? 0.75 : 0 }}
              >
                <div className="flex items-center gap-2 text-rose-900/35 text-xs">
                  <span>˚₊‧</span>
                  <span>୨୧</span>
                  <span>‧₊˚</span>
                  <span className="w-6 sm:w-10 h-[1px] bg-rose-300/30 inline-block" />
                  <span className="text-rose-900/45">♡</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-900/35 text-xs">
                  <span>☾</span>
                  <span>⋆</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER II: “The Appearance”
            Describing what happens inside whenever she appears
           ========================================================================= */}
        {activeChapter === 2 && (
          <div id="secret-chapter-2" className="w-full">
            {/* 
              CINEMATIC TITLE: “The Appearance”
              Chapter name in a personal diary with generous breathing space.
            */}
            <div
              id="secret-chapter2-title"
              className="text-center mb-7 sm:mb-10 transition-all duration-[1600ms] cubic-bezier(0.25, 1, 0.5, 1)"
              style={{
                opacity: ch2TitleVisible ? 1 : 0,
                transform: ch2TitleVisible ? 'translateY(0)' : 'translateY(5px)'
              }}
            >
              {/* Subtle top decoration */}
              <div
                className="flex items-center justify-center gap-2 text-rose-900/30 text-xs select-none mb-2"
                aria-hidden="true"
              >
                <span>˚₊‧</span>
                <span>✦</span>
                <span>𓂃</span>
              </div>

              <h1
                className="font-serif italic text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight font-normal tracking-wide text-[#78222C] select-none m-0 p-0 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
              >
                The Appearance
              </h1>

              {/* Subtle bottom decoration */}
              <div
                className="flex items-center justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-4 text-rose-900/35 text-xs select-none"
                aria-hidden="true"
              >
                <span className="w-5 sm:w-8 h-[1px] bg-rose-300/35 inline-block" />
                <span>𓂃</span>
                <span className="text-xs text-rose-900/45">♡</span>
                <span>𓂃</span>
                <span className="w-5 sm:w-8 h-[1px] bg-rose-300/35 inline-block" />
              </div>
            </div>

            {/* The Handwritten Poem for The Appearance */}
            <div className="px-1 sm:px-3">
              
              {/* Part 1 (first 7 lines) */}
              <div
                className="transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: ch2Part1Visible ? 1 : 0,
                  transform: ch2Part1Visible ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                <div className="font-['Caveat',cursive] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] leading-[1.66] sm:leading-[1.76] text-[#2D1E22] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH2_PART_1.map((line, idx) => (
                    <p key={`ch2-p1-${idx}`} className="m-0 p-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Part 2 (next 6 lines) */}
              <div
                className="transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1) mt-3 sm:mt-4"
                style={{
                  opacity: ch2Part2Visible ? 1 : 0,
                  transform: ch2Part2Visible ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                <div className="font-['Caveat',cursive] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] leading-[1.66] sm:leading-[1.76] text-[#2D1E22] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH2_PART_2.map((line, idx) => (
                    <p key={`ch2-p2-${idx}`} className="m-0 p-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Subtle rose mark before climax */}
              <div
                className="my-5 sm:my-7 flex items-center justify-center gap-2.5 text-rose-900/35 text-xs select-none transition-opacity duration-[1200ms]"
                style={{ opacity: ch2ClimaxVisible ? 0.75 : 0 }}
                aria-hidden="true"
              >
                <span className="w-5 sm:w-10 h-[1px] bg-rose-300/30 inline-block" />
                <span>𓂃</span>
                <span className="text-sm text-rose-900/60 select-none">🥀</span>
                <span>𓂃</span>
                <span className="w-5 sm:w-10 h-[1px] bg-rose-300/30 inline-block" />
              </div>

              {/* Climax: The final 2 lines with a longer emotional pause */}
              <div
                className="transition-all duration-[1600ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: ch2ClimaxVisible ? 1 : 0,
                  transform: ch2ClimaxVisible ? 'translateY(0)' : 'translateY(5px)'
                }}
              >
                <div className="font-['Caveat',cursive] text-[21px] sm:text-[24px] md:text-[27px] lg:text-[29px] leading-[1.7] sm:leading-[1.8] text-[#2B1B20] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH2_CLIMAX.map((line, idx) => (
                    <p key={`ch2-climax-${idx}`} className="m-0 p-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* 
                THE FINAL CONFESSION — EMOTIONAL PEAK
                After generous empty space:
                “Me..?? All because of her....!!”
                A whispered realization, delicate italic serif, muted deep burgundy.
              */}
              <div
                id="secret-final-confession"
                className="mt-9 sm:mt-14 text-center transition-all duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1)"
                style={{
                  opacity: ch2ConfessionVisible ? 1 : 0,
                  transform: ch2ConfessionVisible ? 'translateY(0)' : 'translateY(4px)'
                }}
              >
                <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#72202A] tracking-wider select-none m-0 p-0 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {CH2_CONFESSION}
                </p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 
        Bottom Area:
        - Discreet exit option for returning to Little Things on the left
        - “~Remember Me ?” positioned at the VERY BOTTOM-RIGHT CORNER
      */}
      <footer className="relative z-10 w-full max-w-xl mx-auto pt-8 sm:pt-12 flex items-end justify-between">
        
        {/* Quiet, understated return control */}
        <div
          className="transition-opacity duration-[1200ms]"
          style={{ opacity: decorationsVisible ? 0.7 : 0 }}
        >
          <button
            onClick={onClose}
            type="button"
            aria-label="Return to Little Things"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-300/40 hover:border-stone-400 bg-white/30 hover:bg-white/70 text-stone-400 hover:text-stone-700 text-[10px] sm:text-[11px] font-serif italic transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-2.5 h-2.5" />
            <span>close diary</span>
          </button>
        </div>

        {/* 
          ~Remember Me ?
          At the VERY BOTTOM-RIGHT CORNER of the Shayari page.
          Small, handwritten, muted deep red / dusty burgundy, personal signature.
          Fades in softly only after the second chapter, confession, and silence have settled.
          Includes subtle desktop hover: slightly darkens text with brief handwritten underline.
        */}
        <div
          id="secret-remember-me"
          className="transition-opacity duration-[1400ms] select-none pb-0.5"
          style={{
            opacity: rememberMeVisible ? 1 : 0
          }}
        >
          <span
            className="relative group font-['Caveat',cursive] text-xs sm:text-sm md:text-base text-[#7D242C] hover:text-[#56151B] font-normal tracking-wide cursor-default select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] transition-colors duration-500"
          >
            ~Remember Me ?
            <span className="hidden sm:block absolute left-0 -bottom-0.5 w-0 group-hover:w-full h-[1px] bg-[#7D242C]/40 transition-all duration-700 ease-out" />
          </span>
        </div>

      </footer>
    </div>
  );
};
