import React, { createContext, useContext, useState, useEffect } from 'react';
import { PresentationStyle } from '../types';

interface PresentationStyleContextType {
  style: PresentationStyle;
  setStyle: (style: PresentationStyle) => void;
  formatDecorated: (plainText: string, emojiVersion?: string, cuteVersion?: string) => string;
}

const PresentationStyleContext = createContext<PresentationStyleContextType | undefined>(undefined);

export const PresentationStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [style, setStyleState] = useState<PresentationStyle>(() => {
    const saved = localStorage.getItem('little_things_presentation_style');
    return (saved as PresentationStyle) || 'plain';
  });

  const setStyle = (newStyle: PresentationStyle) => {
    setStyleState(newStyle);
    localStorage.setItem('little_things_presentation_style', newStyle);
  };

  const formatDecorated = (plainText: string, emojiVersion?: string, cuteVersion?: string): string => {
    if (style === 'emojis') {
      return emojiVersion || plainText;
    }
    if (style === 'cute') {
      return cuteVersion || `♡ ${plainText} ⋆`;
    }
    return plainText;
  };

  return (
    <PresentationStyleContext.Provider value={{ style, setStyle, formatDecorated }}>
      {children}
    </PresentationStyleContext.Provider>
  );
};

export function usePresentationStyle() {
  const context = useContext(PresentationStyleContext);
  if (!context) {
    throw new Error('usePresentationStyle must be used within PresentationStyleProvider');
  }
  return context;
}
