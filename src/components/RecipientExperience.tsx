import React, { useState } from 'react';
import { Heart, Sparkles, Lock, Unlock, ArrowRight, Share2, Music, Ticket, Smile, MapPin, Calendar, Clock, Check } from 'lucide-react';
import { Creation } from '../types';
import { triggerHeartConfetti } from '../utils/confetti';

interface RecipientExperienceProps {
  creation: Creation;
  onHomeClick: () => void;
}

export const RecipientExperience: React.FC<RecipientExperienceProps> = ({
  creation,
  onHomeClick
}) => {
  const [loveSentBack, setLoveSentBack] = useState(false);
  
  // Open When local state
  const [activeEnvelopeId, setActiveEnvelopeId] = useState<string | null>(null);

  // Love box local state
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  const handleSendLoveBack = () => {
    setLoveSentBack(true);
    triggerHeartConfetti();
  };

  return (
    <div className="min-h-screen bg-[#FCF9F6] py-10 px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>A Special Delivery For You</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-800 tracking-tight mb-2">
          Dearest {creation.recipientName} ❤️
        </h1>
        <p className="text-sm sm:text-base text-stone-500">
          A thoughtful gesture woven by <strong className="text-stone-800 font-semibold">{creation.creatorName}</strong>
        </p>
      </div>

      {/* Main Experience Container */}
      <div className="max-w-3xl mx-auto">
        
        {/* 1. LOVE LETTER EXPERIENCE */}
        {creation.type === 'love_letter' && (
          <div className="relative max-w-2xl mx-auto">
            {/* Wax Seal Stamp */}
            <div className="absolute -top-5 right-8 z-20 w-12 h-12 rounded-full bg-rose-700 text-rose-100 flex items-center justify-center font-serif text-lg font-bold shadow-lg border-2 border-rose-800 ring-2 ring-rose-200/50 transform rotate-6">
              <Heart className="w-5 h-5 fill-rose-200 text-rose-200" />
            </div>

            <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#E8DEC8] shadow-lg relative overflow-hidden text-[#2D221E] font-serif leading-relaxed">
              <div className="text-right text-xs opacity-60 mb-6 uppercase tracking-wider">
                {creation.data.date || new Date(creation.createdAt).toLocaleDateString()}
              </div>

              <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-[#2D2424]">
                {creation.title}
              </h2>

              <p className="text-base sm:text-lg whitespace-pre-wrap mb-6 text-[#3D2C1D] leading-relaxed">
                {creation.data.content}
              </p>

              {creation.data.reasonsToLove && creation.data.reasonsToLove.length > 0 && (
                <div className="my-6 pt-4 border-t border-black/10">
                  <p className="text-xs uppercase tracking-wider font-bold opacity-70 mb-2 font-sans">
                    Little things I cherish about you:
                  </p>
                  <ul className="space-y-1.5 text-sm sm:text-base pl-4 list-disc text-[#4A3828]">
                    {creation.data.reasonsToLove.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 pt-4 font-semibold text-lg text-right">
                {creation.data.signature || `With all my heart,\n${creation.creatorName}`}
              </div>
            </div>
          </div>
        )}

        {/* 2. OPEN WHEN ENVELOPES */}
        {creation.type === 'open_when' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-[#EDE3DE] text-center text-sm font-serif italic text-[#5C4E4E] shadow-2xs">
              “{creation.data.coverMessage}”
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creation.data.envelopes?.map((env: any) => {
                const isOpened = activeEnvelopeId === env.id;
                return (
                  <div
                    key={env.id}
                    onClick={() => {
                      setActiveEnvelopeId(isOpened ? null : env.id);
                      if (!isOpened) triggerHeartConfetti();
                    }}
                    className="cursor-pointer rounded-3xl p-6 border border-[#EDE3DE] transition-all duration-300 shadow-xs hover:shadow-md bg-white"
                    style={{ backgroundColor: env.color }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{env.emoji}</span>
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs shadow-xs">
                        {isOpened ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#2D2424] mb-2">
                      {env.title}
                    </h3>

                    {isOpened ? (
                      <div className="mt-4 pt-3 border-t border-black/10 animate-in fade-in">
                        <p className="text-sm text-[#3D2C1D] leading-relaxed whitespace-pre-wrap font-serif">
                          {env.letter}
                        </p>
                        {env.surpriseTip && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-black/5 text-xs text-rose-800">
                            💡 <strong>Tip:</strong> {env.surpriseTip}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8C7A7A] mt-2 font-medium">
                        Click to open sealed letter →
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. DIGITAL LOVE BOX */}
        {creation.type === 'love_box' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#EDE3DE] p-8 shadow-md text-center">
            {!isBoxOpen ? (
              <div
                onClick={() => {
                  setIsBoxOpen(true);
                  triggerHeartConfetti();
                }}
                className="cursor-pointer group py-8"
              >
                <div className="relative w-36 h-36 mx-auto mb-6 transition-transform group-hover:scale-105 duration-300">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 shadow-xl border-4 border-white flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-rose-600 shadow-xs" />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-rose-600 shadow-xs" />
                    <div className="absolute top-2 w-10 h-10 rounded-full bg-rose-700 border-2 border-rose-300 text-white flex items-center justify-center font-bold shadow-md z-10">
                      🎀
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#2D2424] group-hover:text-rose-600 transition-colors">
                  Open Your Gift Box
                </h3>
                <p className="text-xs text-[#8C7A7A] mt-1">
                  Packed with {creation.data.items?.length || 0} surprises
                </p>
              </div>
            ) : (
              <div className="animate-in zoom-in-95">
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {creation.data.items?.map((_: any, i: number) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeBoxIndex ? 'w-6 bg-rose-600' : 'w-2 bg-rose-200'
                      }`}
                    />
                  ))}
                </div>

                {creation.data.items?.[activeBoxIndex] && (
                  <div className="p-6 rounded-2xl bg-[#FFF9F7] border border-rose-100 shadow-xs text-left mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Surprise {activeBoxIndex + 1} of {creation.data.items.length}
                    </span>

                    <h4 className="font-serif text-xl font-bold text-[#2D2424] mb-2">
                      {creation.data.items[activeBoxIndex].title}
                    </h4>

                    <p className="text-sm text-[#3D2C1D] leading-relaxed whitespace-pre-wrap font-serif mb-3">
                      {creation.data.items[activeBoxIndex].content}
                    </p>

                    {creation.data.items[activeBoxIndex].extra && (
                      <div className="p-3 rounded-xl bg-white/90 border border-rose-100 text-xs text-rose-900 italic">
                        ✨ {creation.data.items[activeBoxIndex].extra}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveBoxIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeBoxIndex === 0}
                    className="px-3 py-1.5 rounded-xl border border-[#EDE3DE] text-xs font-medium disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>

                  <span className="text-xs text-[#8C7A7A]">
                    {activeBoxIndex + 1} / {creation.data.items.length}
                  </span>

                  {activeBoxIndex < creation.data.items.length - 1 ? (
                    <button
                      onClick={() => {
                        setActiveBoxIndex(prev => prev + 1);
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
                        setActiveBoxIndex(0);
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
        )}

        {/* 4. DATE PLANNER */}
        {creation.type === 'date_plan' && (
          <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2424] mb-6 text-center">
              {creation.data.title || creation.title}
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-3 sm:before:left-4 before:w-0.5 before:bg-rose-200 mb-6">
              {creation.data.slots?.map((slot: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    {idx + 1}
                  </div>
                  <div className="bg-[#FAF7F5] rounded-2xl border border-[#EDE3DE] p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-rose-700 bg-white px-2 py-0.5 rounded border border-[#EDE3DE]">
                        {slot.time}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#2D2424]">
                        {slot.activity}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C4E4E] leading-relaxed mb-2">
                      {slot.description}
                    </p>
                    {slot.tip && (
                      <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded-lg italic">
                        💡 {slot.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {creation.data.specialNote && (
              <p className="text-center font-serif text-sm italic text-[#705E5E] bg-[#FFF9F7] p-4 rounded-2xl border border-rose-100">
                ❤️ “{creation.data.specialNote}”
              </p>
            )}
          </div>
        )}

        {/* 5. OUR STORY TIMELINE */}
        {creation.type === 'our_story' && (
          <div className="space-y-6">
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-4 before:bottom-4 before:left-3 sm:before:left-4 before:w-0.5 before:bg-rose-200">
              {creation.data.milestones?.map((m: any) => (
                <div key={m.id} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs">
                    <Heart className="w-3 h-3 fill-white" />
                  </div>
                  <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 shadow-xs">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
                      {m.date}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-2">
                      {m.title}
                    </h3>
                    <p className="text-sm text-[#4A3E3E] font-serif leading-relaxed mb-3">
                      {m.description}
                    </p>
                    {m.song && (
                      <p className="text-xs text-[#7D6B6B] italic">
                        🎵 Song: {m.song}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {creation.data.closingNote && (
              <div className="p-6 rounded-3xl bg-[#FFF9F7] border border-rose-100 text-center font-serif italic text-sm text-[#4A3E3E]">
                “{creation.data.closingNote}”
              </div>
            )}
          </div>
        )}

      </div>

      {/* Recipient Interaction Bar */}
      <div className="max-w-md mx-auto mt-10 text-center space-y-3">
        <button
          onClick={handleSendLoveBack}
          className="w-full py-3 px-6 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-sm shadow-sm shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loveSentBack ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-white" />}
          <span>{loveSentBack ? 'Love & Hugs Sent Back! ❤️' : `Send Love Back to ${creation.creatorName}`}</span>
        </button>

        <button
          onClick={onHomeClick}
          className="text-xs text-stone-400 hover:text-rose-500 font-medium transition-colors cursor-pointer"
        >
          Create something thoughtful for someone on Little Things ✨
        </button>
      </div>

    </div>
  );
};
