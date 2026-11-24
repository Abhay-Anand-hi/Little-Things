import React, { createContext, useContext, useState, useEffect } from 'react';
import { PersonMode, MemoryItem, LittleThingsContext } from '../types';

interface SessionContextType {
  person: PersonMode | null;
  setPerson: (person: PersonMode | null) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  sessionFacts: Record<string, any>;
  setSessionFact: (key: string, value: any) => void;
  clearSessionFacts: () => void;
  memories: MemoryItem[];
  addMemory: (memory: Omit<MemoryItem, 'id' | 'createdAt'>) => void;
  removeMemory: (id: string) => void;
  updateMemory: (id: string, text: string) => void;
  getContextSummary: () => string;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem_1',
    person: 'HER',
    category: 'favorite',
    text: 'Loves fresh lavender, warm matcha lattes, and handwritten cards.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mem_2',
    person: 'HER',
    category: 'wishlist',
    text: 'Mentioned wanting a subtle gold pendant necklace.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mem_3',
    person: 'HIM',
    category: 'favorite',
    text: 'Prefers quiet drives, pour-over coffee, and vintage vinyl records.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mem_4',
    person: 'US',
    category: 'detail',
    text: 'Love unhurried Sunday walks and trying neighborhood dessert bakeries.',
    createdAt: new Date().toISOString()
  }
];

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current person mode: 'HER' | 'HIM' | 'US' | null
  // Strict rule: "/" NEVER defaults to HER. Root route "/" starts as null (neutral selection screen).
  const [person, setPersonState] = useState<PersonMode | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      if (path === '/her') return 'HER';
      if (path === '/him') return 'HIM';
      if (path === '/us') return 'US';
    }
    return null;
  });

  const [recipientName, setRecipientNameState] = useState<string>(() => {
    if (!person) return '';
    return localStorage.getItem(`little_things_name_${person}`) || (person === 'HER' ? 'Her' : person === 'HIM' ? 'Him' : 'Us');
  });

  const setPerson = (newPerson: PersonMode | null) => {
    setPersonState(newPerson);
    if (newPerson) {
      localStorage.setItem('little_things_person_mode', newPerson);
      const existingName = localStorage.getItem(`little_things_name_${newPerson}`);
      setRecipientNameState(existingName || (newPerson === 'HER' ? 'Her' : newPerson === 'HIM' ? 'Him' : 'Us'));
    } else {
      setRecipientNameState('');
    }
  };

  const setRecipientName = (name: string) => {
    setRecipientNameState(name);
    if (person) {
      localStorage.setItem(`little_things_name_${person}`, name);
    }
  };

  // Session context (temporary flow memory)
  const [sessionFacts, setSessionFacts] = useState<Record<string, any>>({});

  const setSessionFact = (key: string, value: any) => {
    setSessionFacts(prev => ({ ...prev, [key]: value }));
  };

  const clearSessionFacts = () => {
    setSessionFacts({});
  };

  // Explicit permanent memories
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('little_things_memories');
    return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
  });

  useEffect(() => {
    localStorage.setItem('little_things_memories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (memory: Omit<MemoryItem, 'id' | 'createdAt'>) => {
    const newItem: MemoryItem = {
      ...memory,
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString()
    };
    setMemories(prev => [newItem, ...prev]);
  };

  const removeMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const updateMemory = (id: string, text: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, text, updatedAt: new Date().toISOString() } : m));
  };

  const getContextSummary = (): string => {
    if (!person) return 'Neutral Selection Screen';
    const personMemories = memories.filter(m => m.person === person).map(m => m.text).join('; ');
    const facts = Object.entries(sessionFacts).map(([k, v]) => `${k}: ${v}`).join(', ');
    return [
      `Person: ${person}`,
      `Name: ${recipientName || person}`,
      facts ? `Current Session: ${facts}` : null,
      personMemories ? `Saved Memories: ${personMemories}` : null
    ].filter(Boolean).join(' | ');
  };

  return (
    <SessionContext.Provider
      value={{
        person,
        setPerson,
        recipientName,
        setRecipientName,
        sessionFacts,
        setSessionFact,
        clearSessionFacts,
        memories,
        addMemory,
        removeMemory,
        updateMemory,
        getContextSummary
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
