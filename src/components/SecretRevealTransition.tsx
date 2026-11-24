import React, { useEffect, useState, useRef } from 'react';
import { SecretPoemPage } from './SecretPoemPage';

interface SecretRevealTransitionProps {
  isOpen: boolean;
  onClose: () => void;
  onHandoffReady?: () => void;
}

/**
 * Cinematic Confession — “YES ... ME ALSO DID”
 * 
 * Flow:
 * 0.0–1.0s: Entire website dissolves into blackness
 * 1.0–2.2s: Pure black hesitation & silence ("Wait... what is about to happen?")
 * 2.2–3.5s: “YES ...” gently emerges alone in the center
 * 3.5–4.8s: “ME ALSO DID” gently emerges beneath it
 * 4.8–6.5s: Both remain completely still in quiet stillness
 * 6.5–7.8s: Entire confession slowly dissolves back into darkness
 * 7.8–9.0s: Pure black silence again
 * 9.0s+:    Darkness slowly becomes warmth as the private handwritten Shayari page appears
 */
export const SecretRevealTransition: React.FC<SecretRevealTransitionProps> = ({
  isOpen,
  onClose,
  onHandoffReady
}) => {
  // Cinematic black overlay opacity to smoothly fade the entire website into darkness
  const [blackOverlayOpacity, setBlackOverlayOpacity] = useState(0);

  // Staged cinematic confession:
  // 1. "YES ..." gently emerges alone
  // 2. "ME ALSO DID" slowly appears beneath it
  // 3. Both hold together in silent stillness
  // 4. Entire confession slowly dissolves back into darkness
  const [yesOpacity, setYesOpacity] = useState(0);
  const [meAlsoDidOpacity, setMeAlsoDidOpacity] = useState(0);
  const [confessionContainerOpacity, setConfessionContainerOpacity] = useState(1);

  // Transition to the secret handwritten Shayari page (darkness slowly becoming warmth)
  const [showPoemPage, setShowPoemPage] = useState(false);
  const [poemPageOpacity, setPoemPageOpacity] = useState(0);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    if (!isOpen) {
      clearAllTimers();
      setBlackOverlayOpacity(0);
      setYesOpacity(0);
      setMeAlsoDidOpacity(0);
      setConfessionContainerOpacity(1);
      setShowPoemPage(false);
      setPoemPageOpacity(0);
      return;
    }

    // 0.0–1.0 sec: Website completely dissolves into cinematic black
    const frameId = requestAnimationFrame(() => {
      setBlackOverlayOpacity(1);
    });

    // 1.0–2.2 sec: Pure black silence & hesitation ("Wait... what is about to happen?")
    // 2.2–3.5 sec: “YES ...” gently emerges alone in the center
    const t1 = setTimeout(() => {
      setYesOpacity(1);
    }, 2200);

    // 3.5–4.8 sec: “ME ALSO DID” gently emerges beneath it
    const t2 = setTimeout(() => {
      setMeAlsoDidOpacity(1);
    }, 3600);

    // 4.8–6.5 sec: Both remain completely still in quiet stillness (~1.7s hold)
    // 6.5–7.8 sec: Both slowly dissolve back into darkness
    const t3 = setTimeout(() => {
      setConfessionContainerOpacity(0);
    }, 6500);

    // 7.8–9.0 sec: Pure black darkness again
    // 9.0 sec: Mount the secret handwritten Shayari page
    const t4 = setTimeout(() => {
      setShowPoemPage(true);
    }, 9000);

    // 9.1+ sec: Soft diary-like Shayari page smoothly fades in from the black screen
    const t5 = setTimeout(() => {
      setPoemPageOpacity(1);
      if (onHandoffReady) {
        onHandoffReady();
      }
    }, 9100);

    timersRef.current = [t1, t2, t3, t4, t5];

    return () => {
      cancelAnimationFrame(frameId);
      clearAllTimers();
    };
  }, [isOpen, onHandoffReady]);

  // Handle ESC key to safely exit if needed
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="secret-reveal-transition"
      role="dialog"
      aria-modal="true"
      aria-label="Secret confession reveal"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
      style={{
        opacity: blackOverlayOpacity,
        transition: 'opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#030203',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, #0d0a0b 0%, #050405 55%, #020102 100%)'
      }}
    >
      {/* 
        STAGE A: THE CINEMATIC CONFESSION
        Empty cinematic frame with subtle vignette depth
      */}
      {!showPoemPage && (
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 select-none">
          
          {/* Barely perceptible optical aura behind the confession — intimate, non-neon */}
          <div 
            className="absolute w-72 sm:w-[440px] h-48 sm:h-64 pointer-events-none rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(176, 64, 78, 0.3) 0%, rgba(115, 28, 38, 0.1) 60%, transparent 80%)'
            }}
          />

          {/* Centered Confession Composition */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-full px-4"
            style={{
              opacity: confessionContainerOpacity,
              transition: 'opacity 1300ms cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* Line 1: “YES ...” — lighter, quieter, restrained */}
            <div
              className="transition-opacity duration-[1300ms] ease-out select-none"
              style={{
                opacity: yesOpacity
              }}
            >
              <h1
                className="font-serif uppercase font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.24em] sm:tracking-[0.32em] md:tracking-[0.38em] select-none text-center m-0 p-0"
                style={{
                  background: 'linear-gradient(180deg, #d88b94 0%, #b8626e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 12px rgba(184, 98, 110, 0.15))'
                }}
              >
                YES ...
              </h1>
            </div>

            {/* Line 2: “ME ALSO DID” — slightly deeper burgundy, subtly stronger presence */}
            <div
              className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 transition-opacity duration-[1300ms] ease-out select-none"
              style={{
                opacity: meAlsoDidOpacity
              }}
            >
              <h2
                className="font-serif uppercase font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.34em] select-none text-center m-0 p-0"
                style={{
                  background: 'linear-gradient(180deg, #b8626e 0%, #8b2b37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 14px rgba(139, 43, 55, 0.2))'
                }}
              >
                ME ALSO DID
              </h2>
            </div>

          </div>

        </div>
      )}

      {/* 
        STAGE B: SECRET HANDWRITTEN SHAYARI PAGE
        Darkness slowly softens into warmth (smooth 1600ms transition)
      */}
      {showPoemPage && (
        <div
          className="relative z-20 w-full min-h-screen"
          style={{
            opacity: poemPageOpacity,
            transition: 'opacity 1600ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <SecretPoemPage onClose={onClose} />
        </div>
      )}
    </div>
  );
};
