import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryCard } from './components/CategoryCard';
import { FlowersView } from './components/FlowersView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { SavedItemsView } from './components/SavedItemsView';
import { MyLittleThingsView } from './components/MyLittleThingsView';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { AIPickForHerModal } from './components/AIPickForHerModal';
import { SearchOverlay } from './components/SearchOverlay';
import { LittleThingsQuizModal } from './components/LittleThingsQuizModal';
import { AuthModal } from './components/AuthModal';
import { SplashScreen } from './components/SplashScreen';
import { RecipientExperience } from './components/RecipientExperience';
import { TodaysLittleThingSection } from './components/TodaysLittleThingSection';
import { MaybeSheWouldLikeThisSection } from './components/MaybeSheWouldLikeThisSection';
import { MentionedItOnceSection } from './components/MentionedItOnceSection';
import { AIHelpChoosingSection } from './components/AIHelpChoosingSection';
import { ExploreView } from './components/ExploreView';
import { PersonSelectorModal } from './components/PersonSelectorModal';
import { MemorySettingsModal } from './components/MemorySettingsModal';
import { SelectionScreen } from './components/SelectionScreen';
import { SecretDeveloperExperience } from './components/SecretDeveloperExperience';
import { WhatAreYouFeelingToday } from './components/WhatAreYouFeelingToday';
import { PersonalizedForYouSection } from './components/PersonalizedForYouSection';
import { DailyLittleThingSection } from './components/DailyLittleThingSection';
import { MakeItYoursModal } from './components/MakeItYoursModal';

// Creation Studios
import { LoveLetterCreator } from './components/LoveLetterCreator';
import { OpenWhenCreator } from './components/OpenWhenCreator';
import { LoveBoxCreator } from './components/LoveBoxCreator';
import { DatePlannerCreator } from './components/DatePlannerCreator';
import { CoupleQuizCreator } from './components/CoupleQuizCreator';
import { OurStoryCreator } from './components/OurStoryCreator';
import { VirtualHugModal } from './components/VirtualHugModal';

// Context & Data
import { useSession } from './context/SessionContext';
import { getModeCategories } from './data/modeCategories';
import { HER_MAIN_CATEGORIES } from './data/herContent';
import { MainCategoryHer, SavedHerItem, Creation, CreationType, PersonMode } from './types';
import { fetchCreations, deleteCreation, fetchCreationById } from './services/api';
import { triggerHeartConfetti } from './utils/confetti';
import { 
  Sparkles, Heart, Dices, ArrowRight, Bookmark, Flower2, 
  HelpCircle, RefreshCw, Send, Check
} from 'lucide-react';

export function App() {
  const { person, setPerson, recipientName, setRecipientName } = useSession();

  // 1. Single opening splash screen (preserved exactly once)
  const [showSplash, setShowSplash] = useState(true);

  // 2. Navigation & Views
  const [currentTab, setCurrentTab] = useState<'home' | 'explore' | 'saved' | 'my-little-things' | 'flowers' | 'category-detail'>('home');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [creatorMode, setCreatorMode] = useState<CreationType | null>(null);

  // 3. Shared Recipient Link Experience (e.g. ?love=id)
  const [recipientCreation, setRecipientCreation] = useState<Creation | null>(null);
  const [isLoadingRecipient, setIsLoadingRecipient] = useState(false);

  // 4. Modals State
  const [isSurpriseMeOpen, setIsSurpriseMeOpen] = useState(false);
  const [isAIPickOpen, setIsAIPickOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVirtualHugOpen, setIsVirtualHugOpen] = useState(false);
  const [isPersonSelectorOpen, setIsPersonSelectorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSecretExperienceOpen, setIsSecretExperienceOpen] = useState(false);
  const [makeItYoursItem, setMakeItYoursItem] = useState<any | null>(null);

  const handleDeveloperQuestionYes = () => {
    setIsSearchOpen(false);
    setIsSecretExperienceOpen(true);
  };

  // 5. User State
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('little_things_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 6. Saved Items Collection
  const [savedHerItems, setSavedHerItems] = useState<SavedHerItem[]>(() => {
    const saved = localStorage.getItem('saved_her_items');
    return saved ? JSON.parse(saved) : [
      {
        id: 'daisy',
        type: 'flower',
        title: 'Daisy 🌼',
        subtitle: '“For the girl who feels like a quiet Sunday morning.”',
        description: 'Daisies feel unpretentious and sincere. They remind her that beauty doesn\'t have to be loud or complicated.',
        image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=800&q=85',
        category: 'Flowers',
        savedAt: new Date().toISOString()
      },
      {
        id: 'the-soft-one',
        type: 'bouquet',
        title: 'THE SOFT ONE 💐',
        subtitle: '“For the girl whose presence feels like peace.”',
        description: 'Pink Tulips + Daisies + Baby’s Breath',
        image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85',
        category: 'Bouquets',
        savedAt: new Date().toISOString()
      }
    ];
  });

  const handleSaveItem = (item: any) => {
    setSavedHerItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      const updated = exists ? prev.filter(p => p.id !== item.id) : [item, ...prev];
      localStorage.setItem('saved_her_items', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedHerItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('saved_her_items', JSON.stringify(updated));
      return updated;
    });
  };

  // 7. Kept Creations State
  const [creations, setCreations] = useState<Creation[]>([]);

  const loadCreations = async () => {
    try {
      const data = await fetchCreations();
      setCreations(data);
    } catch (e) {
      console.warn('Could not fetch creations, using local fallback:', e);
    }
  };

  useEffect(() => {
    loadCreations();
  }, []);

  const handleDeleteCreation = async (id: string) => {
    await deleteCreation(id);
    setCreations(prev => prev.filter(c => c.id !== id));
  };

  // Check URL query parameters on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loveId = params.get('love');
    if (loveId) {
      setIsLoadingRecipient(true);
      fetchCreationById(loveId).then(data => {
        if (data) {
          setRecipientCreation(data);
        }
        setIsLoadingRecipient(false);
      });
    }
  }, []);

  // Category selection handler
  const handleSelectCategory = (cat: any) => {
    setSelectedCategory(cat);
    setCurrentTab('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categorySectionRef = useRef<HTMLDivElement>(null);

  const scrollToCategories = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setTimeout(() => {
        categorySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      categorySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Active categories based on mode
  const activeCategories = getModeCategories(person);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      if (path === '/her') {
        if (person !== 'HER') setPerson('HER');
      } else if (path === '/him') {
        if (person !== 'HIM') setPerson('HIM');
      } else if (path === '/us') {
        if (person !== 'US') setPerson('US');
      } else if (path === '' || path === '/') {
        if (person !== null) setPerson(null);
      }
    };

    window.addEventListener('popstate', syncRouteFromUrl);
    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, [person, setPerson]);

  const handleSelectPerson = (mode: PersonMode) => {
    setPerson(mode);
    const targetPath = mode === 'HER' ? '/her' : mode === 'HIM' ? '/him' : '/us';
    window.history.pushState({}, '', targetPath);
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchPerson = (mode: PersonMode | null) => {
    setPerson(mode);
    if (mode) {
      const targetPath = mode === 'HER' ? '/her' : mode === 'HIM' ? '/him' : '/us';
      window.history.pushState({}, '', targetPath);
      setCurrentTab('home');
    } else {
      window.history.pushState({}, '', '/');
    }
    setIsPersonSelectorOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recipient shared page view
  if (isLoadingRecipient) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-rose-200 border-t-rose-500 animate-spin mb-3" />
        <p className="text-sm font-serif text-stone-500 italic">Unfolding sweet surprise...</p>
      </div>
    );
  }

  if (recipientCreation) {
    return (
      <RecipientExperience
        creation={recipientCreation}
        onHomeClick={() => {
          setRecipientCreation(null);
          window.history.pushState({}, '', window.location.pathname);
        }}
      />
    );
  }

  // 0. Neutral Selection Screen when person is null (Root "/" route)
  // Strict requirement: "/" MUST NOT automatically open HER, HIM, or US.
  if (!person) {
    return (
      <>
        {showSplash && (
          <SplashScreen
            onComplete={() => {
              setShowSplash(false);
            }}
          />
        )}
        <SelectionScreen onSelectPerson={handleSelectPerson} />
      </>
    );
  }

  return (
    <>
      {/* 1. Cinematic Splash Screen: Only mounts on initial app load */}
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
          }}
        />
      )}

      <div className="min-h-screen bg-[#FAF7F4] text-stone-900 font-sans selection:bg-rose-100 selection:text-rose-900 flex flex-col">
        
        {/* Minimal Editorial Navbar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCreatorMode(null);
            setCurrentTab(tab as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAIPick={() => setIsAIPickOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenPersonSelector={() => setIsPersonSelectorOpen(true)}
          user={user}
          savedCount={savedHerItems.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-24 md:pb-12">
          
          {/* CREATION STUDIOS (Full Screen Interactive Builders) */}
          {creatorMode === 'love_letter' && (
            <LoveLetterCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {creatorMode === 'love_box' && (
            <LoveBoxCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {creatorMode === 'open_when' && (
            <OpenWhenCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {creatorMode === 'date_planner' && (
            <DatePlannerCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {creatorMode === 'couple_quiz' && (
            <CoupleQuizCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {creatorMode === 'our_story' && (
            <OurStoryCreator
              profile={{
                recipientName,
                relationship: 'partner',
                occasion: 'no_reason',
                budget: 'under_500',
                personality: 'romantic'
              }}
              onBack={() => setCreatorMode(null)}
              onSaved={() => {
                loadCreations();
                setCurrentTab('my-little-things');
                setCreatorMode(null);
              }}
            />
          )}

          {/* VIEW 1: FLOWERS GARDEN */}
          {!creatorMode && currentTab === 'flowers' && (
            <FlowersView
              onBack={() => setCurrentTab('home')}
              onSaveItem={handleSaveItem}
              savedIds={savedHerItems.map(s => s.id)}
            />
          )}

          {/* VIEW 2: EXPLORE EDITORIAL FEED */}
          {!creatorMode && currentTab === 'explore' && (
            <ExploreView
              onBack={() => setCurrentTab('home')}
              onSaveItem={handleSaveItem}
              savedIds={savedHerItems.map(s => s.id)}
            />
          )}

          {/* VIEW 3: CATEGORY DETAIL VIEW */}
          {!creatorMode && currentTab === 'category-detail' && selectedCategory && (
            <CategoryDetailView
              category={selectedCategory}
              onBack={() => setCurrentTab('home')}
              onOpenFlowers={() => setCurrentTab('flowers')}
              onLaunchCreator={(type) => setCreatorMode(type as CreationType)}
              onSaveItem={handleSaveItem}
              savedIds={savedHerItems.map(s => s.id)}
            />
          )}

          {/* VIEW 4: SAVED ITEMS TREASURY (MY LITTLE THINGS JOURNAL) */}
          {!creatorMode && currentTab === 'saved' && (
            <SavedItemsView
              savedItems={savedHerItems}
              onRemoveItem={handleRemoveSavedItem}
              onBack={() => setCurrentTab('home')}
              onOpenFlowers={() => setCurrentTab('flowers')}
              onNavigateToExplore={() => setCurrentTab('explore')}
            />
          )}

          {/* VIEW 5: HER CORNER */}
          {!creatorMode && currentTab === 'my-little-things' && (
            <MyLittleThingsView
              recipientName={recipientName}
              onUpdateRecipientName={setRecipientName}
              creations={creations}
              onOpenCreate={(type) => setCreatorMode(type)}
              onViewCreation={(c) => setRecipientCreation(c)}
              onDeleteCreation={handleDeleteCreation}
              onOpenFlowers={() => setCurrentTab('flowers')}
              savedCount={savedHerItems.length}
              onOpenSaved={() => setCurrentTab('saved')}
              user={user}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {/* VIEW 6: THE CORE HOMEPAGE */}
          {!creatorMode && currentTab === 'home' && (
            <div className="space-y-16 sm:space-y-24">
              
              {/* 1. Hero Section */}
              <HeroSection
                onFindSomething={scrollToCategories}
                onSurpriseMe={() => setIsSurpriseMeOpen(true)}
                recipientName={recipientName}
              />

              {/* 1.5. What Are You Feeling Today Discovery */}
              <WhatAreYouFeelingToday
                onSaveItem={handleSaveItem}
                onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
                onOpenMakeItYours={(item) => setMakeItYoursItem(item)}
              />

              {/* 2. Persona Spotlight Banner */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {person === 'HIM' ? (
                  <div 
                    onClick={() => {
                      const buyCat = activeCategories.find((c: any) => c.id.includes('buy')) || activeCategories[1];
                      if (buyCat) handleSelectCategory(buyCat);
                    }}
                    className="cursor-pointer group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 sm:p-12 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=85"
                        alt="Things to buy for him"
                        className="w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-semibold tracking-wider uppercase mb-3 border border-white/15">
                        <span>🖤</span>
                        <span>Curated Daily Essentials</span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                        Things he’ll actually use every single day.
                      </h2>

                      <p className="mt-3 text-stone-300 font-serif italic text-base sm:text-lg leading-relaxed">
                        Explore minimal everyday carry, gaming and desk essentials, immersion cold brew gear, and gifts chosen with genuine thought.
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-xs font-semibold tracking-wide group-hover:bg-stone-200 transition-colors shadow-xs">
                        <span>Explore Things to Buy for Him</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                ) : person === 'US' ? (
                  <div 
                    onClick={() => {
                      const getCat = activeCategories.find((c: any) => c.id.includes('get') || c.id.includes('buy')) || activeCategories[1];
                      if (getCat) handleSelectCategory(getCat);
                    }}
                    className="cursor-pointer group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 sm:p-12 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=85"
                        alt="Things to get together"
                        className="w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/30">
                        <span>🤍</span>
                        <span>Shared Keepsakes & Rituals</span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                        Things that build our shared life and rituals.
                      </h2>

                      <p className="mt-3 text-stone-300 font-serif italic text-base sm:text-lg leading-relaxed">
                        Instant print cameras, two-player card games, matching handmade morning mugs, and keepsakes that belong to both of you.
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-xs font-semibold tracking-wide group-hover:bg-amber-100 transition-colors shadow-xs">
                        <span>Explore Things to Get Together</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setCurrentTab('flowers')}
                    className="cursor-pointer group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 sm:p-12 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=85"
                        alt="Flowers for her"
                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-rose-500/30">
                        <span>🌷</span>
                        <span>Featured Emotional Experience</span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                        Flowers that might feel a little like her.
                      </h2>

                      <p className="mt-3 text-stone-300 font-serif italic text-base sm:text-lg leading-relaxed">
                        Explore 20+ botanical stems with dynamic poetic sentences, meaning, and curated bouquet pairings like “The Soft One” & “The Lover Girl”.
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-xs font-semibold tracking-wide group-hover:bg-rose-100 transition-colors shadow-xs">
                        <span>Enter the flower garden</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* 3. Daily Little Thing Section */}
              <DailyLittleThingSection
                onSaveItem={handleSaveItem}
                onMakeItYours={(item) => setMakeItYoursItem(item)}
              />

              {/* 3.1. Today's Little Thing Highlight */}
              <TodaysLittleThingSection
                recipientName={recipientName}
                onSaveItem={handleSaveItem}
                isSaved={savedHerItems.some(item => item.id.startsWith('daily-'))}
                onOpenCreator={(type) => setCreatorMode(type)}
                onOpenFlowers={() => setCurrentTab('flowers')}
              />

              {/* 4. Curated Mode Categories Grid */}
              <section ref={categorySectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                  <p className={`text-xs uppercase tracking-widest font-semibold mb-2 ${
                    person === 'HIM' ? 'text-stone-700' : person === 'US' ? 'text-amber-700' : 'text-rose-600'
                  }`}>
                    Intentional Collections
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900">
                    What would you like to do for {person === 'US' ? 'us' : recipientName} today?
                  </h2>
                  <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg">
                    {person === 'HER'
                      ? 'Ten thoughtful collections dedicated to making an ordinary day feel a little less ordinary.'
                      : person === 'HIM'
                      ? 'Curated tokens, everyday carry, quiet gestures, and words tailored for him.'
                      : 'Shared rituals, two-player dates, and quiet memories for the two of you.'}
                  </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {activeCategories.map((cat: any, idx: number) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      index={idx}
                      onClick={handleSelectCategory}
                    />
                  ))}
                </div>
              </section>

              {/* 5. She/He Mentioned It Once Section */}
              <MentionedItOnceSection
                onSaveItem={handleSaveItem}
                savedIds={savedHerItems.map(item => item.id)}
              />

              {/* 5.5. Personalized For You Section */}
              <PersonalizedForYouSection
                onSaveItem={handleSaveItem}
                onMakeItYours={(item) => setMakeItYoursItem(item)}
              />

              {/* 6. Maybe She'd Like This Editorial Discovery */}
              <MaybeSheWouldLikeThisSection
                recipientName={recipientName}
                onSaveItem={handleSaveItem}
                savedIds={savedHerItems.map(item => item.id)}
                onOpenFlowers={() => setCurrentTab('flowers')}
                onOpenCategory={(catId) => {
                  const cat = activeCategories.find((c: any) => c.id === catId);
                  if (cat) handleSelectCategory(cat);
                }}
              />

              {/* 7. AI Help Choosing Concierge Section */}
              <AIHelpChoosingSection
                recipientName={recipientName}
                onSaveItem={handleSaveItem}
                savedIds={savedHerItems.map(item => item.id)}
              />

              {/* 8. Little Things Quiz & Quick Mood Concierge Cards */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Card 1: 3-Question Intuition Quiz */}
                  <div 
                    onClick={() => setIsQuizOpen(true)}
                    className="cursor-pointer group p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold">
                        Intuition Quiz
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                        What does {recipientName} need today?
                      </h3>
                      <p className="mt-2 text-stone-500 text-sm leading-relaxed font-serif italic">
                        Take a 3-question pulse on energy, available time, and love language to receive a tailored micro-gesture.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                      <span>Start 1-minute quiz</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* Card 2: AI Concierge For Her */}
                  <div 
                    onClick={() => setIsAIPickOpen(true)}
                    className="cursor-pointer group p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
                        Gemini AI Concierge
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                        Help Me Pick Something For {recipientName}
                      </h3>
                      <p className="mt-2 text-stone-500 text-sm leading-relaxed font-serif italic">
                        Select what {person === 'US' ? 'you both' : recipientName} are feeling, the occasion, and budget to receive 1 flower, 1 gentle action, 1 message, and 1 tiny surprise.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                      <span>Curate recommendations</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                </div>
              </section>

              {/* 9. Editorial Footer Signature */}
              <footer className="border-t border-stone-200/60 pt-16 pb-8 text-center px-4">
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 text-sm mx-auto mb-3">
                  ♡
                </div>
                <p className="font-serif text-xl font-normal text-stone-800">
                  Little Things
                </p>
                <p className="mt-1 text-xs text-stone-400 font-serif italic max-w-sm mx-auto">
                  Dedicated to the quiet art of making someone feel deeply cherished.
                </p>
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-stone-500">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-stone-900 cursor-pointer">Home</button>
                  <button onClick={() => setCurrentTab('explore')} className="hover:text-stone-900 cursor-pointer">Explore</button>
                  <button onClick={() => setCurrentTab('flowers')} className="hover:text-stone-900 cursor-pointer">Flowers</button>
                  <button onClick={() => setCurrentTab('saved')} className="hover:text-stone-900 cursor-pointer">Saved</button>
                  <button onClick={() => setIsSettingsOpen(true)} className="hover:text-stone-900 cursor-pointer">Settings</button>
                </div>
              </footer>

            </div>
          )}

        </main>

        {/* Global Floating Surprise Me Button */}
        <button
          onClick={() => setIsSurpriseMeOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-5 z-30 px-5 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xl shadow-stone-900/20 hover:shadow-2xl active:scale-95 transition-all flex items-center gap-2.5 font-medium text-xs sm:text-sm cursor-pointer group"
          title="Spontaneous surprise"
        >
          <Dices className="w-4 h-4 text-rose-300 group-hover:rotate-45 transition-transform" />
          <span>Surprise me 🎲</span>
        </button>

        {/* Global Modals */}
        <SurpriseMeModal
          isOpen={isSurpriseMeOpen}
          onClose={() => setIsSurpriseMeOpen(false)}
          onSaveItem={handleSaveItem}
          onMakeItYours={(item) => setMakeItYoursItem(item)}
        />

        {makeItYoursItem && (
          <MakeItYoursModal
            isOpen={Boolean(makeItYoursItem)}
            onClose={() => setMakeItYoursItem(null)}
            itemTitle={makeItYoursItem.title || 'Special Gesture'}
            originalText={makeItYoursItem.description || makeItYoursItem.whyItFits || ''}
            onSavePersonalized={(note, text) => {
              handleSaveItem({
                id: 'custom-' + Date.now(),
                type: 'idea',
                title: makeItYoursItem.title || 'Personalized Token',
                description: text,
                personalNote: note,
                image: makeItYoursItem.image,
                category: 'Personalized',
                savedAt: new Date().toISOString()
              });
              setMakeItYoursItem(null);
            }}
          />
        )}

        <AIPickForHerModal
          isOpen={isAIPickOpen}
          onClose={() => setIsAIPickOpen(false)}
          recipientName={recipientName}
          onSaveItem={handleSaveItem}
        />

        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectCategory={handleSelectCategory}
          onOpenFlowers={() => {
            setCurrentTab('flowers');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSaveItem={handleSaveItem}
          onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
          onDeveloperQuestionYes={handleDeveloperQuestionYes}
        />

        <SecretDeveloperExperience
          isOpen={isSecretExperienceOpen}
          onClose={() => setIsSecretExperienceOpen(false)}
        />

        <LittleThingsQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          recipientName={recipientName}
          onOpenFlowers={() => setCurrentTab('flowers')}
          onLaunchCreator={(type) => setCreatorMode(type as CreationType)}
        />

        <VirtualHugModal
          isOpen={isVirtualHugOpen}
          onClose={() => setIsVirtualHugOpen(false)}
          recipientName={recipientName || 'Her'}
        />

        <PersonSelectorModal
          isOpen={isPersonSelectorOpen}
          onClose={() => setIsPersonSelectorOpen(false)}
          onSelectPerson={handleSwitchPerson}
        />

        <MemorySettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(userObj) => {
            setUser(userObj);
            localStorage.setItem('little_things_user', JSON.stringify(userObj));
          }}
        />

      </div>
    </>
  );
}

export default App;
