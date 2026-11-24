import React from 'react';
import { Heart, Search, Sparkles, Bookmark, User, Dices, Layers, Settings, Sliders } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { usePresentationStyle } from '../context/PresentationStyleContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSurpriseMe: () => void;
  onOpenSearch: () => void;
  onOpenAIPick: () => void;
  onOpenAuth: () => void;
  onOpenSettings?: () => void;
  onOpenPersonSelector?: () => void;
  user: { name: string; email: string } | null;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSurpriseMe,
  onOpenSearch,
  onOpenAIPick,
  onOpenAuth,
  onOpenSettings,
  onOpenPersonSelector,
  user,
  savedCount
}) => {
  const { person, recipientName } = useSession();
  const { style } = usePresentationStyle();

  const personEmoji = person === 'HER' ? '🌷' : person === 'HIM' ? '🖤' : person === 'US' ? '🤍' : '♡';

  return (
    <>
      {/* Desktop Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/80 backdrop-blur-md border-b border-stone-200/60 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo & Mode Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 text-sm shadow-2xs transition-transform group-hover:scale-105">
                ♡
              </div>
              <span className="font-serif text-2xl font-normal tracking-tight text-stone-900 group-hover:text-rose-600 transition-colors">
                Little Things
              </span>
            </button>

            {/* Mode Switcher Pill */}
            <button
              id="navbar-mode-switcher-btn"
              onClick={onOpenPersonSelector}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-xs text-stone-800 shadow-2xs transition-all cursor-pointer hover:bg-stone-50 group"
              title="Change who you are thinking about (Her / Him / Us)"
            >
              <span className="text-sm">{personEmoji}</span>
              <span className="font-serif font-medium">for {recipientName || (person === 'HER' ? 'Her' : person === 'HIM' ? 'Him' : person === 'US' ? 'Us' : 'Them')}</span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold border-l border-stone-200 pl-1.5 ml-0.5 group-hover:text-stone-700">
                Switch
              </span>
              <span className="text-[10px] text-stone-400 group-hover:translate-y-0.5 transition-transform">▾</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('home')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'home'
                  ? 'text-rose-600 font-semibold border-b-2 border-rose-500'
                  : 'hover:text-stone-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('explore')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'explore'
                  ? 'text-rose-600 font-semibold border-b-2 border-rose-500'
                  : 'hover:text-stone-900'
              }`}
            >
              Explore
            </button>
            <button
              onClick={onOpenSurpriseMe}
              className="hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer py-1 text-stone-600"
            >
              <Dices className="w-3.5 h-3.5 text-rose-500" />
              <span>Surprise Me</span>
            </button>
            <button
              onClick={() => onSelectTab('saved')}
              className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                currentTab === 'saved' || currentTab === 'my-little-things'
                  ? 'text-rose-600 font-semibold border-b-2 border-rose-500'
                  : 'hover:text-stone-900'
              }`}
            >
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Quick Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/80 border border-transparent hover:border-stone-200 transition-all shadow-2xs cursor-pointer"
              title="Search intentions & little things"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Pick Trigger */}
            <button
              onClick={onOpenAIPick}
              className="px-3.5 py-1.5 rounded-full bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 text-rose-700 text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Pick For {recipientName}</span>
            </button>

            {/* Settings & Memory */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/80 border border-transparent hover:border-stone-200 transition-all shadow-2xs cursor-pointer"
              title="Memory & text style preferences"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Account or Login */}
            {user ? (
              <button
                onClick={() => onSelectTab('saved')}
                className="w-8 h-8 rounded-full bg-stone-900 text-white font-medium text-xs flex items-center justify-center hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-200 rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-md border-t border-stone-200/70 px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'home' ? 'text-rose-600 font-medium' : 'text-stone-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${currentTab === 'home' ? 'fill-rose-500' : ''}`} />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('explore')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'explore' ? 'text-rose-600 font-medium' : 'text-stone-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px]">Explore</span>
          </button>

          {/* Center Surprise Me Floating Pill */}
          <button
            onClick={onOpenSurpriseMe}
            className="flex flex-col items-center justify-center -mt-4 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform border-2 border-white">
              <Dices className="w-5 h-5 text-rose-300" />
            </div>
            <span className="text-[10px] text-stone-700 font-medium mt-0.5">Surprise</span>
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl relative transition-colors cursor-pointer ${
              currentTab === 'saved' || currentTab === 'my-little-things' ? 'text-rose-600 font-medium' : 'text-stone-500'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-rose-500" />
            )}
            <span className="text-[10px]">Saved</span>
          </button>

          <button
            onClick={onOpenPersonSelector}
            className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors cursor-pointer text-stone-500"
          >
            <span className="text-sm">{personEmoji}</span>
            <span className="text-[10px]">{person}</span>
          </button>

        </div>
      </div>
    </>
  );
};
