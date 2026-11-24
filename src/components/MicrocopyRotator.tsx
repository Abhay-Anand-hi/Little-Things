import React, { useState, useEffect } from 'react';

interface MicrocopyRotatorProps {
  quotes: string[];
  intervalMs?: number;
  className?: string;
}

export const MicrocopyRotator: React.FC<MicrocopyRotatorProps> = ({
  quotes,
  intervalMs = 3500,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!quotes || quotes.length <= 1) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsFading(false);
      }, 400); // fade out duration
    }, intervalMs);

    return () => clearInterval(timer);
  }, [quotes, intervalMs]);

  if (!quotes || quotes.length === 0) return null;

  return (
    <div className={`relative min-h-[3.2rem] flex items-center ${className}`}>
      <p
        className={`font-serif italic text-stone-600 text-sm sm:text-base leading-relaxed transition-opacity duration-400 ease-in-out ${
          isFading ? 'opacity-0 translate-y-0.5' : 'opacity-100 translate-y-0'
        }`}
      >
        {quotes[currentIndex]}
      </p>
    </div>
  );
};
