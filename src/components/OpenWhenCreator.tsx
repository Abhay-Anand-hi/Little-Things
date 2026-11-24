import React, { useState } from 'react';
import { Mail, Sparkles, Lock, Unlock, ArrowLeft, Share2, Copy, Check, Eye, Heart, Plus, Trash2, RefreshCw } from 'lucide-react';
import { OpenWhenEnvelope, OpenWhenData, Creation, PersonalizationProfile } from '../types';
import { askGeminiOpenWhen, saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface OpenWhenCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

const DEFAULT_ENVELOPE_TEMPLATES: OpenWhenEnvelope[] = [
  {
    id: 'sad',
    title: "Open when you're sad",
    emoji: '🫂',
    color: '#EFF6FF', // soft blue
    letter: "Take a slow, deep breath. You don't have to carry the whole world today. Whatever made your heart feel heavy will pass, and I am right here beside you holding your hand. You are stronger and more loved than you know.",
    surpriseTip: 'Wrap yourself in your softest blanket, drink warm water, and text me "HUG".'
  },
  {
    id: 'miss_me',
    title: 'Open when you miss me',
    emoji: '💌',
    color: '#FFF1F2', // soft rose
    letter: "Look at the sky wherever you are right now. We are under the same open clouds. I am thinking about your smile at this very second. Distance is just a test to see how far love can travel.",
    surpriseTip: 'Put on our favorite song right now and close your eyes through the chorus.'
  },
  {
    id: 'cant_sleep',
    title: "Open when you can't sleep",
    emoji: '🌙',
    color: '#F5F3FF', // soft purple
    letter: "Let your shoulders relax away from your ears. Unclench your jaw. You did enough today. Tomorrow will take care of itself. Close your eyes and imagine us walking quietly together in the cool evening breeze.",
    surpriseTip: 'Dim your screen to minimum and take 4 deep breaths: in for 4, hold for 7, out for 8.'
  },
  {
    id: 'angry',
    title: "Open when you're angry at me",
    emoji: '🕊️',
    color: '#FEF3C7', // soft amber
    letter: "If I hurt you or frustrated you, I am truly sorry. Winning an argument will never be as important to me as protecting your heart. Take whatever time you need, but know that I love you through every storm.",
    surpriseTip: 'Take three deep breaths before replying. I promise to listen with an open heart.'
  },
  {
    id: 'need_smile',
    title: 'Open when you need a smile',
    emoji: '✨',
    color: '#FEFCE8', // soft yellow
    letter: "Emergency smile delivery! Remember that time we couldn't stop giggling uncontrollably at the most inappropriate moment? Thinking of your goofy laugh always makes my whole day. Smile right now, just for me!",
    surpriseTip: 'Open your camera, make the silliest face possible, and send me a selfie right now!'
  },
  {
    id: 'celebrating',
    title: "Open when you're celebrating",
    emoji: '🥂',
    color: '#ECFDF5', // soft emerald
    letter: "YES! I am so ridiculously proud of you! You worked hard for this and you deserve every single ounce of success. Let's celebrate properly as soon as we can!",
    surpriseTip: 'Treat yourself to your favorite dessert tonight on my tab!'
  },
  {
    id: 'loved',
    title: "Open when you need to know you're loved",
    emoji: '❤️',
    color: '#FDF2F8', // soft pink
    letter: "You are my favorite human being. In a world full of noise, you are my peace and my home. I choose you yesterday, I choose you today, and I will choose you a thousand times over.",
    surpriseTip: 'Place your hand on your heart and feel that steady rhythm — that is where you live in mine.'
  }
];

export const OpenWhenCreator: React.FC<OpenWhenCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  const [coverMessage, setCoverMessage] = useState(
    'A little collection of digital envelopes sealed with love. Open each one only when the moment arrives! ❤️'
  );
  
  const [envelopes, setEnvelopes] = useState<OpenWhenEnvelope[]>(DEFAULT_ENVELOPE_TEMPLATES);
  const [activeEnvelopeId, setActiveEnvelopeId] = useState<string>(DEFAULT_ENVELOPE_TEMPLATES[0].id);
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<string | null>(null);

  const [step, setStep] = useState<'edit' | 'preview'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const currentEnvelope = envelopes.find(e => e.id === activeEnvelopeId) || envelopes[0];

  const updateCurrentEnvelope = (fields: Partial<OpenWhenEnvelope>) => {
    setEnvelopes(prev => prev.map(env => env.id === activeEnvelopeId ? { ...env, ...fields } : env));
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const generated = await askGeminiOpenWhen({
        recipientName: recipientName || 'My Love',
        senderName: senderName || 'Me',
        envelopeTypes: envelopes.map(e => e.id)
      });
      if (generated && generated.length > 0) {
        setEnvelopes(generated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const data: OpenWhenData = {
        recipientName: recipientName || 'Someone Special',
        senderName: senderName || 'A Secret Admirer',
        coverMessage,
        envelopes
      };

      const saved = await saveCreation({
        type: 'open_when',
        title: `Open When Letters for ${recipientName || 'You'}`,
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
      console.error('Error saving open when:', e);
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(step === 'edit' ? 'preview' : 'edit')}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#EDE3DE] bg-white text-[#5C4E4E] hover:bg-[#FAF7F5] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{step === 'edit' ? 'Preview Envelopes' : 'Back to Editor'}</span>
          </button>
        </div>
      </div>

      {step === 'edit' ? (
        /* EDITOR MODE */
        <div className="space-y-6">
          
          <div className="text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2D2424]">“Open When” Letters 💌</h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
              Create a sealed digital bundle of heartfelt envelopes. Your loved one opens each one when that exact feeling strikes.
            </p>
          </div>

          {/* Names Bar */}
          <div className="bg-white rounded-2xl border border-[#EDE3DE] p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
                Recipient Name *
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                placeholder="e.g. Maya"
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
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
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
              />
            </div>
          </div>

          {/* AI Helper Banner */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50/60 p-4 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <Sparkles className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#2D2424]">Want Gemini AI to personalize all envelopes?</p>
                <p className="text-[11px] text-[#8C7A7A]">Crafts authentic, comforting letters for every mood in seconds.</p>
              </div>
            </div>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-white text-rose-600 border border-rose-200 text-xs font-medium hover:bg-rose-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isGenerating ? 'Writing...' : 'Auto-Write with AI'}</span>
            </button>
          </div>

          {/* Envelope Selector Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-2">
              Select Envelope to Write or Edit:
            </label>
            <div className="flex flex-wrap gap-2">
              {envelopes.map(env => (
                <button
                  key={env.id}
                  onClick={() => setActiveEnvelopeId(env.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeEnvelopeId === env.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-[#5C4E4E] border border-[#EDE3DE] hover:bg-[#FAF6F4]'
                  }`}
                >
                  <span>{env.emoji}</span>
                  <span>{env.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Envelope Editor Card */}
          {currentEnvelope && (
            <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 shadow-xs relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F4ECE8] mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentEnvelope.emoji}</span>
                  <div>
                    <input
                      type="text"
                      value={currentEnvelope.title}
                      onChange={e => updateCurrentEnvelope({ title: e.target.value })}
                      className="font-serif text-lg sm:text-xl font-bold text-[#2D2424] bg-transparent focus:outline-none border-b border-transparent hover:border-black/20"
                    />
                    <p className="text-[11px] text-[#8C7A7A]">Envelope message & instructions</p>
                  </div>
                </div>
              </div>

              {/* Letter Content */}
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C7A7A] mb-1.5">
                  Letter inside this envelope:
                </label>
                <textarea
                  value={currentEnvelope.letter}
                  onChange={e => updateCurrentEnvelope({ letter: e.target.value })}
                  rows={6}
                  className="w-full p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white resize-none leading-relaxed transition-all"
                  placeholder="Write your soothing or loving words here..."
                />
              </div>

              {/* Surprise Tip */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C7A7A] mb-1.5">
                  Small sweet action / tip to do right now (Optional):
                </label>
                <input
                  type="text"
                  value={currentEnvelope.surpriseTip || ''}
                  onChange={e => updateCurrentEnvelope({ surpriseTip: e.target.value })}
                  placeholder="e.g. Drink a glass of water, or send me a one-word text 'HUG'"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
                />
              </div>

            </div>
          )}

          {/* Action Row */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep('preview')}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-xs shadow-rose-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Preview Locked Envelopes</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* PREVIEW MODE: LOCKED ENVELOPE INTERACTION */
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Recipient Experience Preview
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2D2424] mt-2">
              For {recipientName || 'You'} ❤️
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1 italic">
              “{coverMessage}”
            </p>
            <p className="text-[11px] text-[#A89898] mt-2">
              Click any envelope below to experience the animated unlock
            </p>
          </div>

          {/* Grid of Envelopes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {envelopes.map(env => {
              const isOpened = openedEnvelopeId === env.id;
              return (
                <div
                  key={env.id}
                  onClick={() => {
                    setOpenedEnvelopeId(isOpened ? null : env.id);
                    if (!isOpened) triggerHeartConfetti();
                  }}
                  className="cursor-pointer group relative rounded-3xl p-6 border transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md overflow-hidden bg-white border-[#EDE3DE]"
                  style={{ backgroundColor: env.color }}
                >
                  {/* Flap & Wax Seal styling */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{env.emoji}</span>
                    <div className="w-8 h-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center text-xs shadow-sm">
                      {isOpened ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2D2424] mb-2 group-hover:text-rose-700 transition-colors">
                    {env.title}
                  </h3>

                  {isOpened ? (
                    <div className="mt-4 pt-3 border-t border-black/10 animate-in fade-in zoom-in-95">
                      <p className="text-sm text-[#3D2C1D] leading-relaxed whitespace-pre-wrap font-serif">
                        {env.letter}
                      </p>
                      {env.surpriseTip && (
                        <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-black/5 text-xs text-rose-800">
                          💡 <strong>Action:</strong> {env.surpriseTip}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-[#8C7A7A] mt-2 font-medium">
                      <span>Click to unseal letter</span>
                      <span className="text-rose-500">→</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Save & Share Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE3DE] text-center max-w-xl mx-auto shadow-xs">
            {!shareLink ? (
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
                  Ready to send your Open When collection?
                </h3>
                <p className="text-xs text-[#8C7A7A] mb-4">
                  Creates an interactive gift link they can bookmark on their phone forever.
                </p>
                <button
                  onClick={handleSaveAndShare}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Sealing Envelopes...
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
                  Envelopes Sealed & Ready! 🎉
                </h3>
                <p className="text-xs text-[#7D6B6B] mb-4">
                  Send this link to {recipientName}. They can open the envelopes anytime they need you.
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
