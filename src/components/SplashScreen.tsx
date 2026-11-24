import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'enter' | 'exit'>('initial');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate execution under any circumstance
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const t1 = setTimeout(() => setPhase('enter'), 50);
      const t2 = setTimeout(() => setPhase('exit'), 800);
      const t3 = setTimeout(() => {
        onCompleteRef.current();
      }, 1200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    // Sequence timeline:
    // 0ms - 200ms: Screen starts completely clean with warm cream background
    // 200ms: "Little Things" smoothly fades in with slight upward drift and subtle scale
    // 1800ms: Text smoothly fades out and slightly scales down, entire splash fades out
    // 2550ms: Splash complete, signals onComplete to unmount
    const enterTimer = setTimeout(() => {
      setPhase('enter');
    }, 200);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1800);

    const doneTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 2550);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []); // Empty dependency array: runs strictly ONCE on mount

  return (
    <motion.div
      key="single-splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] bg-[#FCF9F6] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      aria-hidden={phase === 'exit' ? 'true' : 'false'}
      role="dialog"
      aria-label="Little Things"
    >
      {/* Subtle warm radial glow in center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: phase === 'enter' ? 0.45 : 0,
          scale: phase === 'enter' ? 1.05 : 0.95,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-gradient-to-tr from-rose-200/25 via-pink-100/20 to-amber-100/15 blur-3xl pointer-events-none"
      />

      {/* Very subtle romantic light particles drifting gently */}
      {phase === 'enter' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 15, x: -8 }}
            animate={{ opacity: [0, 0.35, 0], y: -24, x: -14 }}
            transition={{ duration: 1.6, delay: 0.35, ease: 'easeInOut' }}
            className="absolute top-[43%] left-[46%] w-1.5 h-1.5 rounded-full bg-rose-300/50 blur-[0.5px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 10, x: 8 }}
            animate={{ opacity: [0, 0.35, 0], y: -20, x: 12 }}
            transition={{ duration: 1.7, delay: 0.5, ease: 'easeInOut' }}
            className="absolute top-[40%] right-[44%] w-1 h-1 rounded-full bg-amber-200/60 blur-[0.5px]"
          />
        </div>
      )}

      {/* Centered Brand Text: Display ONLY "Little Things" */}
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{
            opacity: phase === 'enter' ? 1 : 0,
            y: phase === 'enter' ? 0 : phase === 'exit' ? -6 : 14,
            scale: phase === 'enter' ? 1 : phase === 'exit' ? 0.97 : 0.95,
          }}
          transition={{
            duration: phase === 'exit' ? 0.55 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative inline-flex items-center justify-center"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-stone-800 tracking-tight select-none">
            Little Things
          </h1>

          {/* Extremely subtle romantic accent: a tiny soft rose heart */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: 3 }}
            animate={{
              opacity: phase === 'enter' ? [0, 0.75, 0.65] : 0,
              scale: phase === 'enter' ? [0.5, 1.1, 1] : 0.7,
              y: phase === 'enter' ? 0 : -3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: 'easeOut',
            }}
            className="absolute -top-2.5 sm:-top-3.5 -right-3.5 sm:-right-5 text-rose-400 text-xs sm:text-sm select-none pointer-events-none"
            aria-hidden="true"
          >
            ♥
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};
