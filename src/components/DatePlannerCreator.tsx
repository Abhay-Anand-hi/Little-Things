import React, { useState } from 'react';
import { Calendar, Clock, Coins, MapPin, Sparkles, Plus, Trash2, ArrowLeft, Share2, Copy, Check, Eye, Heart, RefreshCw, SunMedium, Compass } from 'lucide-react';
import { DatePlanData, DatePlanSlot, Creation, PersonalizationProfile } from '../types';
import { askGeminiDatePlan, saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface DatePlannerCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

const DEFAULT_SLOTS: DatePlanSlot[] = [
  {
    time: '4:00 PM',
    activity: 'Scenic Walk & Shared Playlist',
    location: 'Nearby peaceful park or waterside',
    description: 'Meet up, share one earphone each, and wander with zero agenda while catching up.',
    costEstimate: '₹0',
    tip: 'Leave phones on "Do Not Disturb" during the stroll.'
  },
  {
    time: '5:15 PM',
    activity: 'Hot Chai & Street Delights',
    location: 'Cozy local corner stall',
    description: 'Share steaming kullad chai and two hot savory snacks while watching the evening bustle.',
    costEstimate: '₹150–₹250',
    tip: 'Take turns guessing what the other person would choose to eat.'
  },
  {
    time: '6:15 PM',
    activity: 'Golden Hour Sunset & Handwritten Notes',
    location: 'Bench or grassy viewpoint',
    description: 'Sit together as the sky turns rose and gold. Exchange a tiny folded note with three things you admire about each other.',
    costEstimate: '₹0',
    tip: 'Read the notes in calm silence together.'
  },
  {
    time: '7:30 PM',
    activity: 'Shared Sweet Treat',
    location: 'Bakery or dessert cart',
    description: 'Share a double-scoop cone or warm waffle while recounting your favorite moment of the evening.',
    costEstimate: '₹150',
    tip: 'Take a sweet candid photo of you both laughing.'
  }
];

export const DatePlannerCreator: React.FC<DatePlannerCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  const [location, setLocation] = useState('Local City / Cozy Spots');
  const [budget, setBudget] = useState('₹500');
  const [timeAvailable, setTimeAvailable] = useState('3–4 Hours (Evening)');
  const [indoorOutdoor, setIndoorOutdoor] = useState<'indoor' | 'outdoor' | 'both'>('both');
  const [mood, setMood] = useState('Romantic, cozy & playful');
  const [planTitle, setPlanTitle] = useState('The Golden Sunset & Street Bites Date');
  const [slots, setSlots] = useState<DatePlanSlot[]>(DEFAULT_SLOTS);
  const [specialNote, setSpecialNote] = useState('The secret to a magical date is not how much you spend, but how completely present you are.');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate Date with Gemini
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await askGeminiDatePlan({
        recipientName: recipientName || 'My Partner',
        budget,
        location,
        indoorOutdoor,
        mood,
        relationship: profile?.relationship || 'partner'
      });

      if (res.slots && res.slots.length > 0) {
        setSlots(res.slots);
        if (res.title) setPlanTitle(res.title);
        if (res.specialNote) setSpecialNote(res.specialNote);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateSlot = (index: number, updates: Partial<DatePlanSlot>) => {
    setSlots(prev => prev.map((s, i) => i === index ? { ...s, ...updates } : s));
  };

  const handleAddSlot = () => {
    const newSlot: DatePlanSlot = {
      time: '8:30 PM',
      activity: 'Late Night Talk / Star Gazing',
      location: 'Terrace or quiet corner',
      description: 'Wind down with tea and reminisce about your favorite memories together.',
      costEstimate: '₹0',
      tip: 'Stay off devices.'
    };
    setSlots(prev => [...prev, newSlot]);
  };

  const handleRemoveSlot = (index: number) => {
    setSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const data: DatePlanData = {
        title: planTitle,
        recipientName: recipientName || 'Someone Special',
        senderName: senderName || 'A Secret Date Planner',
        budget,
        location,
        mood,
        indoorOutdoor,
        slots,
        specialNote
      };

      const saved = await saveCreation({
        type: 'date_plan',
        title: planTitle,
        recipientName: recipientName || 'My Partner',
        creatorName: senderName || 'Me',
        creatorId: 'user_local',
        data
      });

      triggerHeartConfetti();
      const origin = window.location.origin;
      const url = `${origin}?love=${saved.id}`;
      setShareLink(url);
      onSaved(saved);
    } catch (e) {
      console.error('Error saving date plan:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F0E6E1] mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#7D6B6B] hover:text-[#2D2424] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="text-center max-w-lg mx-auto mb-8">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#2D2424]">Date Planner 🗓️</h2>
        <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
          Craft an unforgettable timed itinerary from spontaneous ₹500 street food dates to candlelit evenings.
        </p>
      </div>

      {/* Input Parameters */}
      <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Who is this date with?
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder="e.g. Maya"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Location / City Setting
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Bandra, South Mumbai / Parks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Total Budget
            </label>
            <input
              type="text"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="e.g. ₹0 (Free) / ₹500 / ₹1,500"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Vibe / Mood
            </label>
            <input
              type="text"
              value={mood}
              onChange={e => setMood(e.target.value)}
              placeholder="e.g. Cozy & romantic / Whimsical / Foodie"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Setting
            </label>
            <div className="flex gap-2">
              {(['indoor', 'outdoor', 'both'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIndoorOutdoor(type)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer ${
                    indoorOutdoor === type
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-[#FAF7F5] text-[#5C4E4E] border border-[#E8DDD7]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Generator Button */}
        <div className="pt-3 border-t border-[#F4ECE8] flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? 'Curating Itinerary...' : 'Auto-Plan With AI ✨'}</span>
          </button>
        </div>

      </div>

      {/* Date Plan Itinerary Card */}
      <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-8 shadow-xs mb-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F4ECE8] mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Personalized Itinerary
            </span>
            <input
              type="text"
              value={planTitle}
              onChange={e => setPlanTitle(e.target.value)}
              className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2424] bg-transparent focus:outline-none border-b border-transparent hover:border-black/20 pb-0.5 w-full"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#7D6B6B]">
            <div className="flex items-center gap-1 bg-[#FAF7F5] px-3 py-1.5 rounded-full border border-[#EDE3DE]">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              <span>{budget}</span>
            </div>
          </div>
        </div>

        {/* Timeline Slots */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-3 sm:before:left-4 before:w-0.5 before:bg-rose-200">
          {slots.map((slot, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-4 ring-rose-50">
                {idx + 1}
              </div>

              <div className="bg-[#FAF7F5] rounded-2xl border border-[#EDE3DE] p-4 sm:p-5 hover:border-rose-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={slot.time}
                      onChange={e => handleUpdateSlot(idx, { time: e.target.value })}
                      className="font-bold text-xs text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-[#EDE3DE] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={slot.activity}
                      onChange={e => handleUpdateSlot(idx, { activity: e.target.value })}
                      className="font-serif text-base sm:text-lg font-bold text-[#2D2424] bg-transparent focus:outline-none border-b border-transparent hover:border-black/20"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C7A7A]">{slot.costEstimate}</span>
                    <button
                      onClick={() => handleRemoveSlot(idx)}
                      className="text-[#A89898] hover:text-red-500 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  value={slot.description}
                  onChange={e => handleUpdateSlot(idx, { description: e.target.value })}
                  rows={2}
                  className="w-full text-xs sm:text-sm text-[#5C4E4E] bg-white p-2.5 rounded-xl border border-[#EDE3DE] focus:outline-none focus:border-rose-400 resize-none leading-relaxed mb-2"
                />

                {slot.tip && (
                  <div className="text-[11px] text-rose-900 bg-rose-50/70 p-2 rounded-lg border border-rose-100 italic">
                    💡 Romantic tip: {slot.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Slot Button */}
        <div className="mt-6 pt-4 border-t border-[#F4ECE8] flex items-center justify-between">
          <button
            onClick={handleAddSlot}
            className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add another time slot</span>
          </button>
        </div>

        {/* Special Note */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FFF9F7] border border-rose-100 text-xs text-[#705E5E] italic">
          ❤️ “{specialNote}”
        </div>

      </div>

      {/* Save and Share Link Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE3DE] text-center max-w-xl mx-auto shadow-xs">
        {!shareLink ? (
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
              Ready to invite {recipientName || 'them'} on this date?
            </h3>
            <p className="text-xs text-[#8C7A7A] mb-4">
              Creates a beautiful digital itinerary card they can view and bookmark.
            </p>
            <button
              onClick={handleSaveAndShare}
              disabled={isSaving}
              className="px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving Itinerary...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Save & Create Shareable Link ❤️
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
              Date Plan Saved! 🎉
            </h3>
            <p className="text-xs text-[#7D6B6B] mb-4">
              Send this link to {recipientName} to surprise them with tonight's plan.
            </p>

            <div className="flex items-center gap-2 max-w-md mx-auto bg-[#FAF7F5] p-2 rounded-xl border border-[#EDE3DE] mb-4">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="w-full bg-transparent px-2 text-xs font-mono text-[#5C4E4E] focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
