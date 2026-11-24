import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Plus, Trash2, ArrowLeft, ArrowRight, Share2, Copy, Check, Eye, Music, Ticket, Smile, Image as ImageIcon, MessageSquare, RefreshCw } from 'lucide-react';
import { LoveBoxItem, LoveBoxData, Creation, PersonalizationProfile } from '../types';
import { saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface LoveBoxCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

const DEFAULT_ITEMS: LoveBoxItem[] = [
  {
    id: 'item-1',
    type: 'letter',
    title: 'A Little Note For You',
    content: 'I wanted to remind you that even on the most ordinary Tuesday afternoon, you are my favorite thought. Thank you for making my life so sweet.'
  },
  {
    id: 'item-2',
    type: 'song',
    title: 'Our Dedicated Song',
    content: 'Leon Bridges - Texas Sun',
    extra: 'Every time the chorus starts, I think of our long drives watching the golden hour sky together.'
  },
  {
    id: 'item-3',
    type: 'coupon',
    title: 'Redeemable Love Coupon',
    content: 'One (1) Unconditional 30-Minute Massage + Hot Chocolate of your choice.',
    extra: 'Expires: Never. Valid anytime you ask.'
  },
  {
    id: 'item-4',
    type: 'compliment',
    title: 'A Truth About You',
    content: 'The way your eyes light up when you describe something you are passionate about is genuinely the most captivating thing in the world.'
  }
];

const ITEM_TYPES: { type: LoveBoxItem['type']; label: string; icon: React.ReactNode }[] = [
  { type: 'letter', label: 'Love Note', icon: <MessageSquare className="w-4 h-4" /> },
  { type: 'song', label: 'Song Dedication', icon: <Music className="w-4 h-4" /> },
  { type: 'coupon', label: 'Love Coupon', icon: <Ticket className="w-4 h-4" /> },
  { type: 'compliment', label: 'Compliment', icon: <Smile className="w-4 h-4" /> },
  { type: 'memory', label: 'Memory', icon: <Heart className="w-4 h-4" /> },
  { type: 'surprise', label: 'Surprise Message', icon: <Sparkles className="w-4 h-4" /> },
];

export const LoveBoxCreator: React.FC<LoveBoxCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  const [boxMessage, setBoxMessage] = useState(
    'A little box filled with pieces of my heart, just for you. Open each surprise one by one! ❤️'
  );
  const [boxColor, setBoxColor] = useState('#FFF1F2'); // soft rose
  const [ribbonColor, setRibbonColor] = useState('#E11D48'); // rose 600

  const [items, setItems] = useState<LoveBoxItem[]>(DEFAULT_ITEMS);
  const [step, setStep] = useState<'build' | 'preview'>('build');

  // Preview interactive state
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Add Item
  const handleAddItem = (type: LoveBoxItem['type']) => {
    const newItem: LoveBoxItem = {
      id: 'item-' + Date.now(),
      type,
      title: type === 'coupon' ? 'Custom Love Coupon' : type === 'song' ? 'Song Dedication' : 'Sweet Note',
      content: '',
      extra: ''
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<LoveBoxItem>) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const data: LoveBoxData = {
        recipientName: recipientName || 'Someone Special',
        senderName: senderName || 'A Secret Admirer',
        boxColor,
        ribbonColor,
        boxMessage,
        items
      };

      const saved = await saveCreation({
        type: 'love_box',
        title: `Digital Love Box for ${recipientName || 'You'}`,
        recipientName: recipientName || 'My Love',
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
      console.error('Error saving love box:', e);
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
        <button
          onClick={() => {
            setStep(step === 'build' ? 'preview' : 'build');
            setIsBoxOpen(false);
            setActiveItemIndex(0);
          }}
          className="text-xs px-3 py-1.5 rounded-lg border border-[#EDE3DE] bg-white text-[#5C4E4E] hover:bg-[#FAF7F5] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{step === 'build' ? 'Preview Gift Box' : 'Back to Builder'}</span>
        </button>
      </div>

      {step === 'build' ? (
        /* BUILDER MODE */
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto mb-6">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2D2424]">Digital Love Box 🎁</h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
              Pack a virtual 3D-styled gift box with love letters, songs, romantic coupons, and surprises that open one by one.
            </p>
          </div>

          {/* Recipient & Message */}
          <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
                  Recipient Name *
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
                  From (Your Name)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
                Gift Box Cover Message
              </label>
              <input
                type="text"
                value={boxMessage}
                onChange={e => setBoxMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Items In Box */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#2D2424]">
                Inside The Box ({items.length} surprises)
              </h3>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl border border-[#EDE3DE] p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4ECE8] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full">
                        Surprise #{idx + 1}: {item.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[#A89898] hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => handleUpdateItem(item.id, { title: e.target.value })}
                      placeholder="Title of this surprise"
                      className="font-semibold text-sm text-[#2D2424] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white"
                    />

                    <textarea
                      value={item.content}
                      onChange={e => handleUpdateItem(item.id, { content: e.target.value })}
                      placeholder={item.type === 'coupon' ? 'What does this coupon grant? (e.g. 1 head massage + dinner)' : item.type === 'song' ? 'Song name & artist' : 'Write your note or memory here...'}
                      rows={2}
                      className="w-full p-3 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white resize-none"
                    />

                    {(item.type === 'coupon' || item.type === 'song') && (
                      <input
                        type="text"
                        value={item.extra || ''}
                        onChange={e => handleUpdateItem(item.id, { extra: e.target.value })}
                        placeholder={item.type === 'coupon' ? 'Expiry or terms (e.g. Valid anytime)' : 'Why this song reminds me of you'}
                        className="text-xs text-[#5C4E4E] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white italic"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Surprise Buttons */}
            <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#EDE3DE]">
              <span className="text-xs font-semibold text-[#8C7A7A] uppercase tracking-wider block mb-2">
                Add another surprise into the box:
              </span>
              <div className="flex flex-wrap gap-2">
                {ITEM_TYPES.map(t => (
                  <button
                    key={t.type}
                    onClick={() => handleAddItem(t.type)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#EDE3DE] text-xs font-medium text-[#5C4E4E] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {t.icon}
                    <span>+ {t.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-[#F4ECE8]">
            <button
              onClick={() => {
                setStep('preview');
                setIsBoxOpen(false);
                setActiveItemIndex(0);
              }}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-xs shadow-rose-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Preview Gift Unboxing</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* PREVIEW MODE: ANIMATED UNBOXING */
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Recipient Experience Preview
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2D2424] mt-2">
              For {recipientName || 'You'} ❤️
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1 italic">
              “{boxMessage}”
            </p>
          </div>

          {/* Interactive Gift Box Display */}
          <div className="max-w-md mx-auto my-6 bg-white rounded-3xl border border-[#EDE3DE] p-8 shadow-md text-center relative overflow-hidden">
            
            {!isBoxOpen ? (
              /* CLOSED BOX */
              <div 
                onClick={() => {
                  setIsBoxOpen(true);
                  triggerHeartConfetti();
                }}
                className="cursor-pointer group py-8"
              >
                {/* 3D Box Illustration Container */}
                <div className="relative w-36 h-36 mx-auto mb-6 transition-transform group-hover:scale-105 duration-300">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 shadow-xl border-4 border-white flex items-center justify-center relative overflow-hidden">
                    {/* Ribbon Cross */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-rose-600 shadow-xs" />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-rose-600 shadow-xs" />
                    {/* Bow */}
                    <div className="absolute top-2 w-10 h-10 rounded-full bg-rose-700 border-2 border-rose-300 text-white flex items-center justify-center font-bold shadow-md z-10">
                      🎀
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#2D2424] group-hover:text-rose-600 transition-colors">
                  Tap to Open Your Gift Box
                </h3>
                <p className="text-xs text-[#8C7A7A] mt-1">
                  Packed with {items.length} thoughtful surprises inside
                </p>
              </div>
            ) : (
              /* OPENED BOX: SEQUENCE OF ITEMS */
              <div className="animate-in zoom-in-95 duration-300">
                
                {/* Progress Indicators */}
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {items.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeItemIndex ? 'w-6 bg-rose-600' : 'w-2 bg-rose-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Active Card */}
                {items[activeItemIndex] && (
                  <div className="p-6 rounded-2xl bg-[#FFF9F7] border border-rose-100 shadow-sm text-left mb-6 relative">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Surprise {activeItemIndex + 1} of {items.length}
                    </span>

                    <h4 className="font-serif text-xl font-bold text-[#2D2424] mb-3">
                      {items[activeItemIndex].title}
                    </h4>

                    <p className="text-sm text-[#3D2C1D] leading-relaxed whitespace-pre-wrap font-serif mb-3">
                      {items[activeItemIndex].content}
                    </p>

                    {items[activeItemIndex].extra && (
                      <div className="p-3 rounded-xl bg-white/90 border border-rose-100 text-xs text-rose-900 italic">
                        ✨ {items[activeItemIndex].extra}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveItemIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeItemIndex === 0}
                    className="px-3 py-1.5 rounded-xl border border-[#EDE3DE] text-xs font-medium text-[#5C4E4E] disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>

                  <span className="text-xs text-[#8C7A7A]">
                    {activeItemIndex + 1} / {items.length}
                  </span>

                  {activeItemIndex < items.length - 1 ? (
                    <button
                      onClick={() => {
                        setActiveItemIndex(prev => prev + 1);
                        triggerHeartConfetti();
                      }}
                      className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Surprise</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        triggerHeartConfetti();
                        setIsBoxOpen(false);
                        setActiveItemIndex(0);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-semibold cursor-pointer"
                    >
                      Replay Box 🎁
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Share Box Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE3DE] text-center max-w-xl mx-auto shadow-xs">
            {!shareLink ? (
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
                  Ready to send this Digital Love Box?
                </h3>
                <p className="text-xs text-[#8C7A7A] mb-4">
                  Generates an animated unboxing link {recipientName} can open on any phone or browser.
                </p>
                <button
                  onClick={handleSaveAndShare}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Wrapping Love Box...
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
                  Love Box Wrapped & Ready! 🎉
                </h3>
                <p className="text-xs text-[#7D6B6B] mb-4">
                  Share this private link with {recipientName}. They will experience the magical unboxing.
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
      )}

    </div>
  );
};
