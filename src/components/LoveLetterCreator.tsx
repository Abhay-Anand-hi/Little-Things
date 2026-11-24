import React, { useState } from 'react';
import { Sparkles, Heart, Share2, Copy, Check, Eye, Edit3, ArrowLeft, RefreshCw, Feather, BookOpen, Send, Download } from 'lucide-react';
import { LetterTone, LetterStyle, LoveLetterData, PersonalizationProfile, Creation } from '../types';
import { askGeminiLoveLetter, saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface LoveLetterCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

const TONES: { id: LetterTone; label: string; emoji: string }[] = [
  { id: 'romantic', label: 'Romantic', emoji: '🌹' },
  { id: 'cute', label: 'Cute & Sweet', emoji: '🧸' },
  { id: 'emotional', label: 'Emotional & Deep', emoji: '🥺' },
  { id: 'funny', label: 'Funny & Playful', emoji: '😄' },
  { id: 'deep', label: 'Soulful & Poetic', emoji: '✨' },
];

const STYLES: { id: LetterStyle; label: string; icon: string }[] = [
  { id: 'handwritten', label: 'Handwritten', icon: '✍️' },
  { id: 'elegant', label: 'Elegant', icon: '🕊️' },
  { id: 'minimal', label: 'Minimal', icon: '◽' },
  { id: 'romantic', label: 'Romantic Blush', icon: '🌸' },
  { id: 'vintage', label: 'Vintage Parchment', icon: '📜' },
];

export const LoveLetterCreator: React.FC<LoveLetterCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState(profile?.relationship || 'partner');
  const [whatYouLove, setWhatYouLove] = useState('');
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<LetterTone>('romantic');
  const [style, setStyle] = useState<LetterStyle>('handwritten');

  const [letterContent, setLetterContent] = useState('');
  const [letterTitle, setLetterTitle] = useState('');
  const [signature, setSignature] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  
  const [step, setStep] = useState<'compose' | 'preview'>('compose');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate with Gemini
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await askGeminiLoveLetter({
        recipientName: recipientName || 'My Love',
        senderName: senderName || 'Yours',
        relationship,
        whatYouLove,
        favoriteMemory,
        message,
        tone,
        style
      });

      if (res.content) {
        setLetterContent(res.content);
        setLetterTitle(res.title || `For ${recipientName || 'You'}, With Love`);
        setSignature(res.signature || `Always yours,\n${senderName || 'Me'}`);
        if (res.reasonsToLove) setReasons(res.reasonsToLove);
        setStep('preview');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save and generate link
  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const letterData: LoveLetterData = {
        recipientName: recipientName || 'Someone Special',
        senderName: senderName || 'A Loving Heart',
        relationship,
        tone,
        style,
        content: letterContent,
        reasonsToLove: reasons,
        favoriteMemory,
        signature,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };

      const saved = await saveCreation({
        type: 'love_letter',
        title: letterTitle || `Love Letter for ${recipientName}`,
        recipientName: recipientName || 'My Love',
        creatorName: senderName || 'Me',
        creatorId: 'user_local',
        data: letterData
      });

      triggerHeartConfetti();
      const origin = window.location.origin;
      const url = `${origin}?love=${saved.id}`;
      setShareLink(url);
      onSaved(saved);
    } catch (e) {
      console.error('Error saving letter:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper for style rendering
  const getStyleClasses = () => {
    switch (style) {
      case 'handwritten':
        return 'bg-[#FFFDF7] text-[#2D221E] font-handwriting text-xl sm:text-2xl leading-relaxed border-[#E6DEC8] shadow-md';
      case 'elegant':
        return 'bg-white text-[#1C1917] font-serif border-[#D4AF37]/50 shadow-lg ring-1 ring-[#D4AF37]/30';
      case 'romantic':
        return 'bg-[#FFF5F6] text-[#4A1525] font-serif border-rose-200 shadow-md';
      case 'vintage':
        return 'bg-[#F9F3EB] text-[#3D2C1D] font-serif border-[#C9B9A6] shadow-xl bg-[radial-gradient(#eedfc9_1px,transparent_1px)] [background-size:16px_16px]';
      case 'minimal':
      default:
        return 'bg-white text-[#262626] font-sans border-stone-200 shadow-sm';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400">Step {step === 'compose' ? '1: Personalize' : '2: Preview & Share'}</span>
        </div>
      </div>

      {step === 'compose' ? (
        /* STEP 1: FORM */
        <div className="bg-white rounded-[32px] border border-stone-100 p-6 sm:p-8 shadow-sm">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <Feather className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-stone-800">Write a Love Letter 💌</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Share a few heartfelt thoughts. Our AI will weave them into an authentic, deeply moving letter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Who is this for? (Their Name) *
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                placeholder="e.g., Maya / Sweetheart"
                className="w-full px-4 py-2.5 rounded-full bg-stone-50 border border-stone-100 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="e.g., Alex / Your Person"
                className="w-full px-4 py-2.5 rounded-full bg-stone-50 border border-stone-100 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* What you love */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              What do you love most about them?
            </label>
            <textarea
              value={whatYouLove}
              onChange={e => setWhatYouLove(e.target.value)}
              placeholder="e.g., The crinkle near your eyes when you laugh, how you remember little details, your calm patience..."
              rows={2}
              className="w-full p-3.5 rounded-2xl bg-stone-50 border border-stone-100 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all resize-none placeholder:text-stone-400"
            />
          </div>

          {/* Favorite Memory */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              A favorite memory together
            </label>
            <textarea
              value={favoriteMemory}
              onChange={e => setFavoriteMemory(e.target.value)}
              placeholder="e.g., That rainy evening in December when our umbrella broke and we ended up laughing over hot chai..."
              rows={2}
              className="w-full p-3.5 rounded-2xl bg-stone-50 border border-stone-100 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all resize-none placeholder:text-stone-400"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              What do you want to tell them today?
            </label>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g., That I am proud of you, or simply that I miss you..."
              className="w-full px-4 py-2.5 rounded-full bg-stone-50 border border-stone-100 text-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Tone & Style Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-[24px] bg-stone-50 border border-stone-100 mb-8">
            
            {/* Tone */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Tone of the Letter
              </label>
              <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      tone === t.id
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                        : 'bg-white text-stone-600 border border-stone-100 hover:bg-stone-100'
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Style */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Visual Paper Style
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      style === s.id
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                        : 'bg-white text-stone-600 border border-stone-100 hover:bg-stone-100'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              onClick={() => {
                setLetterContent(`Dearest ${recipientName || 'Love'},\n\nI just wanted to take a moment to tell you how much you mean to me.`);
                setLetterTitle(`For ${recipientName || 'You'}`);
                setSignature(`With love,\n${senderName || 'Me'}`);
                setStep('preview');
              }}
              className="text-xs text-stone-500 hover:text-stone-800 px-4 py-2 cursor-pointer"
            >
              Write Manually Instead
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold shadow-sm shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Weaving Letter...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-rose-100" />
                  Generate Beautiful Letter ✨
                </>
              )}
            </button>
          </div>

        </div>
      ) : (
        /* STEP 2: PREVIEW, EDIT & SHARE */
        <div>
          {/* Style Switcher Bar in Preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-[24px] border border-stone-100 mb-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider pl-2">
                Paper Style:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      style === s.id
                        ? 'bg-rose-500 text-white'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('compose')}
                className="text-xs text-stone-600 hover:text-stone-800 px-3.5 py-1.5 rounded-full border border-stone-100 bg-stone-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Inputs
              </button>
            </div>
          </div>

          {/* Letter Parchment Container */}
          <div className="relative max-w-2xl mx-auto my-4">
            
            {/* Wax Seal / Stamp Accent */}
            <div className="absolute -top-5 right-8 z-20 w-12 h-12 rounded-full bg-rose-600 text-rose-100 flex items-center justify-center font-serif text-lg font-bold shadow-lg border-2 border-rose-700 ring-2 ring-rose-200/50 transform rotate-6">
              <Heart className="w-5 h-5 fill-rose-100 text-rose-100" />
            </div>

            <div className={`rounded-[32px] p-8 sm:p-12 border relative overflow-hidden transition-all ${getStyleClasses()}`}>
              
              {/* Date Header */}
              <div className="text-right text-xs opacity-60 mb-6 tracking-wide uppercase">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>

              {/* Title */}
              <input
                type="text"
                value={letterTitle}
                onChange={e => setLetterTitle(e.target.value)}
                className="w-full bg-transparent font-bold text-2xl sm:text-3xl mb-6 focus:outline-none border-b border-transparent hover:border-black/20 pb-1 transition-colors"
              />

              {/* Content Body */}
              <textarea
                value={letterContent}
                onChange={e => setLetterContent(e.target.value)}
                rows={10}
                className="w-full bg-transparent leading-relaxed text-base sm:text-lg focus:outline-none resize-none border-b border-transparent hover:border-black/10 transition-colors whitespace-pre-wrap"
              />

              {/* Reasons if present */}
              {reasons.length > 0 && (
                <div className="my-6 pt-4 border-t border-black/10">
                  <p className="text-xs uppercase tracking-wider font-bold opacity-70 mb-2">
                    Little things I cherish about you:
                  </p>
                  <ul className="space-y-1.5 text-sm sm:text-base opacity-90 pl-4 list-disc">
                    {reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Signature */}
              <div className="mt-8 pt-4">
                <input
                  type="text"
                  value={signature}
                  onChange={e => setSignature(e.target.value)}
                  className="w-full bg-transparent font-semibold text-lg focus:outline-none border-b border-transparent hover:border-black/20"
                />
              </div>

            </div>
          </div>

          {/* Share Actions */}
          <div className="max-w-2xl mx-auto mt-6 bg-white p-6 sm:p-8 rounded-[32px] border border-stone-100 shadow-sm text-center">
            
            {!shareLink ? (
              <div>
                <h3 className="font-serif text-xl font-semibold text-stone-800 mb-1">
                  Ready to send this love letter?
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  We'll create a private, beautiful shareable page they can open anywhere without needing an account.
                </p>
                <button
                  onClick={handleSaveAndShare}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-sm shadow-sm shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Creating Share Link...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Save & Generate Shareable Link ❤️
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-800 mb-1">
                  Your Love Letter Is Ready! 🎉
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  Send this secret link to {recipientName}. They'll experience the animated letter unfold.
                </p>

                <div className="flex items-center gap-2 max-w-md mx-auto bg-stone-50 p-2 rounded-full border border-stone-100 mb-4">
                  <input
                    type="text"
                    readOnly
                    value={shareLink}
                    className="w-full bg-transparent px-3 text-xs font-mono text-stone-600 focus:outline-none truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href={shareLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-rose-500 hover:text-rose-600 font-medium underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Recipient Experience
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
