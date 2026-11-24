import React, { useState } from 'react';
import { Camera, Sparkles, Heart, Plus, Trash2, ArrowLeft, Share2, Copy, Check, Eye, Calendar, MapPin, Music, RefreshCw } from 'lucide-react';
import { StoryMilestone, OurStoryData, Creation, PersonalizationProfile } from '../types';
import { saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface OurStoryCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

const DEFAULT_MILESTONES: StoryMilestone[] = [
  {
    id: 'm-1',
    date: 'Autumn 2022',
    title: 'The Day We First Crossed Paths',
    location: 'A quiet coffee corner',
    description: 'We started talking about something trivial, and before we knew it, two hours had flown by. I remember walking home that evening knowing something in my world had shifted.',
    song: 'Norah Jones - Come Away With Me'
  },
  {
    id: 'm-2',
    date: 'December 2022',
    title: 'Our Very First Real Date',
    location: 'Under the city fairy lights',
    description: 'We were both secretly nervous. You spilled a drop of tea, I pretended not to see it, and we both broke into laughter that lasted all night.',
    song: 'Lauv - I Like Me Better'
  },
  {
    id: 'm-3',
    date: 'Summer 2023',
    title: 'Our First Trip Together',
    location: 'Misty mountain road',
    description: 'Getting lost with no cell service turned into our best adventure yet. Singing out of tune with the car windows rolled down.',
    song: 'Lord Huron - The Night We Met'
  },
  {
    id: 'm-4',
    date: 'Today & Every Day After',
    title: 'Still Falling in Love With the Little Things',
    location: 'Right here with you',
    description: 'Through busy weeks, quiet Sundays, morning coffee, and sleepy goodnights — every chapter with you is my favorite.',
    song: 'Taylor Swift - Lover'
  }
];

export const OurStoryCreator: React.FC<OurStoryCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  const [storyTitle, setStoryTitle] = useState('Our Beautiful Story ❤️');
  const [closingNote, setClosingNote] = useState('To every past memory we cherish, and a million more we have yet to make.');
  const [milestones, setMilestones] = useState<StoryMilestone[]>(DEFAULT_MILESTONES);

  const [step, setStep] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddMilestone = () => {
    const newM: StoryMilestone = {
      id: 'm-' + Date.now(),
      date: 'A Memorable Day',
      title: 'A Special Milestone',
      description: 'Write about what happened and how it made you feel...'
    };
    setMilestones(prev => [...prev, newM]);
  };

  const handleUpdateMilestone = (index: number, updates: Partial<StoryMilestone>) => {
    setMilestones(prev => prev.map((m, i) => i === index ? { ...m, ...updates } : m));
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const data: OurStoryData = {
        title: storyTitle,
        recipientName: recipientName || 'Someone Special',
        senderName: senderName || 'A Heart That Remembers',
        milestones,
        closingNote
      };

      const saved = await saveCreation({
        type: 'our_story',
        title: storyTitle,
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
      console.error('Error saving story:', e);
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
          onClick={() => setStep(step === 'edit' ? 'preview' : 'edit')}
          className="text-xs px-3 py-1.5 rounded-lg border border-[#EDE3DE] bg-white text-[#5C4E4E] hover:bg-[#FAF7F5] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{step === 'edit' ? 'Preview Timeline' : 'Back to Editing'}</span>
        </button>
      </div>

      {step === 'edit' ? (
        /* EDIT TIMELINE */
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto mb-6">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2D2424]">Memory Maker 📸</h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
              Assemble a chronological love story celebrating the milestones that shaped your journey together.
            </p>
          </div>

          {/* Names and Title */}
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
                  Your Name
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
                Story Title
              </label>
              <input
                type="text"
                value={storyTitle}
                onChange={e => setStoryTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Milestones List */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#2D2424]">
              Milestones ({milestones.length})
            </h3>

            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <div key={m.id} className="bg-white rounded-2xl border border-[#EDE3DE] p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4ECE8] mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                      Chapter #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveMilestone(idx)}
                      className="text-[#A89898] hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={m.date}
                      onChange={e => handleUpdateMilestone(idx, { date: e.target.value })}
                      placeholder="Date or Period (e.g. Spring 2023)"
                      className="text-xs font-semibold text-[#2D2424] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                    <input
                      type="text"
                      value={m.title}
                      onChange={e => handleUpdateMilestone(idx, { title: e.target.value })}
                      placeholder="Milestone Title (e.g. First Road Trip)"
                      className="font-bold text-sm text-[#2D2424] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                  </div>

                  <textarea
                    value={m.description}
                    onChange={e => handleUpdateMilestone(idx, { description: e.target.value })}
                    rows={3}
                    placeholder="Describe this moment, what you felt, and what made it unforgettable..."
                    className="w-full p-3 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white resize-none mb-3 leading-relaxed"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={m.location || ''}
                      onChange={e => handleUpdateMilestone(idx, { location: e.target.value })}
                      placeholder="Location (Optional)"
                      className="text-xs text-[#5C4E4E] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                    <input
                      type="text"
                      value={m.song || ''}
                      onChange={e => handleUpdateMilestone(idx, { song: e.target.value })}
                      placeholder="Soundtrack / Song played (Optional)"
                      className="text-xs text-[#5C4E4E] px-3 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8DDD7] focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddMilestone}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add another milestone to our story</span>
            </button>
          </div>

          {/* Closing Note */}
          <div className="bg-white rounded-3xl border border-[#EDE3DE] p-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Closing Love Message
            </label>
            <input
              type="text"
              value={closingNote}
              onChange={e => setClosingNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep('preview')}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-xs shadow-rose-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Preview Timeline</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* PREVIEW TIMELINE */
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Our Journey Together
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] mt-2">
              {storyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
              A story of {senderName || 'Us'} & {recipientName || 'You'} ❤️
            </p>
          </div>

          {/* Timeline View */}
          <div className="max-w-2xl mx-auto relative pl-6 sm:pl-8 space-y-8 before:absolute before:top-4 before:bottom-4 before:left-3 sm:before:left-4 before:w-0.5 before:bg-rose-200">
            {milestones.map((m, idx) => (
              <div key={m.id} className="relative group">
                {/* Timeline Heart Pin */}
                <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs ring-4 ring-rose-50">
                  <Heart className="w-3 h-3 fill-white" />
                </div>

                <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-7 shadow-xs hover:border-rose-200 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                      {m.date}
                    </span>
                    {m.location && (
                      <span className="text-xs text-[#8C7A7A] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {m.location}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2424] mb-3">
                    {m.title}
                  </h3>

                  <p className="text-sm text-[#4A3E3E] leading-relaxed whitespace-pre-wrap font-serif mb-4">
                    {m.description}
                  </p>

                  {m.song && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE3DE] text-xs text-[#5C4E4E]">
                      <Music className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="italic">Soundtrack: {m.song}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Closing Card */}
          <div className="max-w-xl mx-auto p-6 rounded-3xl bg-[#FFF9F7] border border-rose-100 text-center font-serif text-base text-[#4A3E3E] italic shadow-xs">
            “{closingNote}”
          </div>

          {/* Share Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE3DE] text-center max-w-xl mx-auto shadow-xs">
            {!shareLink ? (
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
                  Ready to share your story with {recipientName || 'them'}?
                </h3>
                <p className="text-xs text-[#8C7A7A] mb-4">
                  Generates an interactive visual memory timeline they can scroll through forever.
                </p>
                <button
                  onClick={handleSaveAndShare}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving Story...
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
                  Our Story Timeline Is Ready! 🎉
                </h3>
                <p className="text-xs text-[#7D6B6B] mb-4">
                  Send this link to {recipientName} so you can cherish these memories together.
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
