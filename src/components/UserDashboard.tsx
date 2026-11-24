import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, PlusCircle, Share2, Copy, Trash2, Eye, Calendar, Clock, Bookmark, Gift, Mail, Gamepad2, Feather, Check, ExternalLink } from 'lucide-react';
import { Creation } from '../types';
import { fetchCreations, deleteCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface UserDashboardProps {
  onQuickAction: (action: string) => void;
  onPreviewCreation: (creation: Creation) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onQuickAction,
  onPreviewCreation
}) => {
  const [activeTab, setActiveTab] = useState<'creations' | 'favorites' | 'milestones'>('creations');
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Milestones local state
  const [milestonesList, setMilestonesList] = useState<{ id: string; name: string; date: string }[]>([
    { id: '1', name: 'Our Anniversary', date: 'October 14' },
    { id: '2', name: "Maya's Birthday", date: 'June 22' },
    { id: '3', name: 'First Trip Memory', date: 'December 05' },
  ]);
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');

  const loadCreations = async () => {
    setLoading(true);
    try {
      const items = await fetchCreations();
      setCreations(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreations();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this creation?')) {
      await deleteCreation(id);
      setCreations(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}?love=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCreationIcon = (type: Creation['type']) => {
    switch (type) {
      case 'love_letter':
        return <Feather className="w-4 h-4 text-rose-600" />;
      case 'open_when':
        return <Mail className="w-4 h-4 text-sky-600" />;
      case 'love_box':
        return <Gift className="w-4 h-4 text-amber-600" />;
      case 'date_plan':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'couple_game':
        return <Gamepad2 className="w-4 h-4 text-purple-600" />;
      default:
        return <Heart className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-10 shadow-sm mb-10">
        <div className="max-w-2xl">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full mb-3">
            Welcome back ❤️
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-800 tracking-tight mb-2">
            What are you planning today?
          </h1>
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
            Pick an interactive experience to craft or manage your shared romantic creations below.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mt-8">
          <button
            onClick={() => onQuickAction('love_letter')}
            className="p-4 rounded-[24px] bg-stone-50/60 border border-stone-100 hover:border-rose-100 hover:bg-white hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Feather className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-stone-800 group-hover:text-rose-600 transition-colors">
              Write Something
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">Love Letter</p>
          </button>

          <button
            onClick={() => onQuickAction('love_box')}
            className="p-4 rounded-[24px] bg-stone-50/60 border border-stone-100 hover:border-rose-100 hover:bg-white hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Gift className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-stone-800 group-hover:text-rose-600 transition-colors">
              Create Surprise
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">Digital Love Box</p>
          </button>

          <button
            onClick={() => onQuickAction('our_story')}
            className="p-4 rounded-[24px] bg-stone-50/60 border border-stone-100 hover:border-rose-100 hover:bg-white hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-stone-800 group-hover:text-rose-600 transition-colors">
              Make a Memory
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">Our Story Timeline</p>
          </button>

          <button
            onClick={() => onQuickAction('date_plan')}
            className="p-4 rounded-[24px] bg-stone-50/60 border border-stone-100 hover:border-rose-100 hover:bg-white hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-stone-800 group-hover:text-rose-600 transition-colors">
              Plan a Date
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">Timed Itinerary</p>
          </button>

          <button
            onClick={() => onQuickAction('couple_game')}
            className="p-4 rounded-[24px] bg-stone-50/60 border border-stone-100 hover:border-rose-100 hover:bg-white hover:shadow-sm text-left transition-all group cursor-pointer col-span-2 sm:col-span-1"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-stone-800 group-hover:text-rose-600 transition-colors">
              Play a Game
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">Couples Quiz</p>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3 mb-6">
        <button
          onClick={() => setActiveTab('creations')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'creations'
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
              : 'text-stone-500 hover:bg-stone-50'
          }`}
        >
          My Creations ({creations.length})
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'milestones'
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
              : 'text-stone-500 hover:bg-stone-50'
          }`}
        >
          Milestones & Dates ({milestonesList.length})
        </button>
      </div>

      {/* CREATIONS TAB */}
      {activeTab === 'creations' && (
        <div>
          {loading ? (
            <div className="py-12 text-center text-sm text-stone-400">Loading your sweet creations...</div>
          ) : creations.length === 0 ? (
            <div className="bg-white rounded-[32px] border border-stone-100 p-10 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-800 mb-1">
                No creations yet
              </h3>
              <p className="text-xs text-stone-500 mb-5 leading-relaxed">
                Surprise your special person by creating your first love letter, open-when envelope collection, or digital gift box.
              </p>
              <button
                onClick={() => onQuickAction('love_letter')}
                className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm shadow-rose-200 cursor-pointer transition-colors"
              >
                Create First Gift ✨
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creations.map(c => (
                <div
                  key={c.id}
                  className="bg-white rounded-[28px] border border-stone-100 p-5 sm:p-6 shadow-sm hover:border-rose-100 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100 text-[11px] font-semibold text-stone-600">
                        {getCreationIcon(c.type)}
                        <span className="capitalize">{c.type.replace('_', ' ')}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-semibold text-stone-800 mb-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-stone-500">
                      For <strong>{c.recipientName}</strong> from {c.creatorName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onPreviewCreation(c)}
                      className="text-xs font-medium text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyLink(c.id)}
                        className="p-2 rounded-full bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-100 transition-colors cursor-pointer"
                        title="Copy Share Link"
                      >
                        {copiedId === c.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 rounded-full bg-stone-50 hover:bg-red-50 text-stone-600 hover:text-red-600 border border-stone-100 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MILESTONES TAB */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-8 shadow-sm max-w-2xl">
          <h3 className="font-serif text-xl font-semibold text-stone-800 mb-1">
            Important Dates & Anniversaries
          </h3>
          <p className="text-xs text-stone-400 mb-6">
            Never miss a day that matters to both of you.
          </p>

          <div className="space-y-3 mb-6">
            {milestonesList.map(m => (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{m.name}</p>
                    <p className="text-xs text-stone-500">{m.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMilestonesList(prev => prev.filter(item => item.id !== m.id))}
                  className="text-stone-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-stone-100">
            <input
              type="text"
              value={newMilestoneName}
              onChange={e => setNewMilestoneName(e.target.value)}
              placeholder="Event name (e.g. First Kiss)"
              className="flex-1 px-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300"
            />
            <input
              type="text"
              value={newMilestoneDate}
              onChange={e => setNewMilestoneDate(e.target.value)}
              placeholder="Date (e.g. Nov 12)"
              className="w-full sm:w-36 px-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300"
            />
            <button
              onClick={() => {
                if (newMilestoneName.trim()) {
                  setMilestonesList(prev => [...prev, { id: Date.now().toString(), name: newMilestoneName, date: newMilestoneDate || 'Upcoming' }]);
                  setNewMilestoneName('');
                  setNewMilestoneDate('');
                  triggerHeartConfetti();
                }
              }}
              className="px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm shadow-rose-200 cursor-pointer transition-colors"
            >
              Add Date
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
