import React, { useState } from 'react';
import { Gamepad2, Sparkles, Heart, CheckCircle2, ArrowRight, ArrowLeft, Share2, Copy, Check, RefreshCw, Trophy, HelpCircle } from 'lucide-react';
import { Creation, PersonalizationProfile } from '../types';
import { saveCreation } from '../services/api';
import { triggerHeartConfetti } from '../utils/confetti';

interface CoupleQuizCreatorProps {
  initialRecipient?: string;
  profile?: PersonalizationProfile;
  onBack: () => void;
  onSaved: (creation: Creation) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex?: number;
  partnerGuessIndex?: number;
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is my ultimate go-to comfort food when I've had a long day?",
    options: ['Extra cheesy pizza or garlic bread', 'Steaming bowl of spicy noodles', 'Warm dessert / ice cream tub', 'Homestyle dal chawal / soup'],
    correctIndex: 0
  },
  {
    question: 'What is my absolute dream travel vacation together?',
    options: ['Cozy cabin in misty snowy mountains', 'Sun-drenched beach with turquoise water', 'Historic cobblestone streets in Europe', 'Adventurous road trip with no fixed map'],
    correctIndex: 0
  },
  {
    question: 'When I am stressed, what helps me unwind fastest?',
    options: ['A tight hug in complete quiet', 'Listening to my favorite music or podcast', 'Venting while you listen and agree', 'Getting my favorite snack & watching a comedy'],
    correctIndex: 0
  },
  {
    question: 'What is something that never fails to make me laugh uncontrollably?',
    options: ['Inside jokes only we understand', 'Funny pet / animal videos', 'Watching someone clumsily trip safely', 'Goofy voice impressions'],
    correctIndex: 0
  },
  {
    question: 'What was my genuine first impression of you?',
    options: ['Your smile was instantly magnetic', 'You seemed mysterious and intriguing', 'I felt comfortable with you right away', 'I thought you were way out of my league'],
    correctIndex: 2
  }
];

const BUCKET_LIST_ITEMS = [
  { text: 'Watch the sunrise from a hilltop with hot coffee', checked: true },
  { text: 'Cook an elaborate 3-course meal together from scratch', checked: true },
  { text: 'Take a spontaneous late-night long drive with no destination', checked: true },
  { text: 'Have an entire phone-free Sunday wrapped in blankets', checked: false },
  { text: 'Go star-gazing with a shared blanket and telescope', checked: false },
  { text: 'Build a giant living room blanket fort and watch movies', checked: false },
  { text: 'Write letters to our future selves to open in 5 years', checked: false },
];

export const CoupleQuizCreator: React.FC<CoupleQuizCreatorProps> = ({
  initialRecipient = '',
  profile,
  onBack,
  onSaved
}) => {
  const [activeGame, setActiveGame] = useState<'know_me' | 'bucket_list'>('know_me');
  const [recipientName, setRecipientName] = useState(initialRecipient || profile?.recipientName || '');
  const [senderName, setSenderName] = useState('');
  
  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUESTIONS);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isTestPlaying, setIsTestPlaying] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Bucket list state
  const [bucketList, setBucketList] = useState(BUCKET_LIST_ITEMS);
  const [newBucketItem, setNewBucketItem] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => i === qIndex ? { ...q, correctIndex: optionIndex } : q));
  };

  const handlePartnerGuess = (optionIndex: number) => {
    const isCorrect = optionIndex === questions[currentQIndex].correctIndex;
    if (isCorrect) setPlayerScore(prev => prev + 1);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      triggerHeartConfetti();
    }
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const data = {
        gameType: activeGame,
        recipientName: recipientName || 'My Partner',
        senderName: senderName || 'Me',
        questions: activeGame === 'know_me' ? questions : undefined,
        bucketList: activeGame === 'bucket_list' ? bucketList : undefined
      };

      const saved = await saveCreation({
        type: 'couple_game',
        title: activeGame === 'know_me' 
          ? `How Well Do You Know ${senderName || 'Me'}?` 
          : `Couples Bucket List with ${recipientName || 'You'}`,
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
      console.error('Error saving quiz:', e);
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

      <div className="text-center max-w-lg mx-auto mb-6">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <Gamepad2 className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#2D2424]">Couple Games 🎮</h2>
        <p className="text-xs sm:text-sm text-[#7D6B6B] mt-1">
          Playful trivia, intimacy questions, and bucket lists designed to spark laughter and closer bonds.
        </p>
      </div>

      {/* Game Type Switcher */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => {
            setActiveGame('know_me');
            setIsTestPlaying(false);
          }}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            activeGame === 'know_me'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-[#5C4E4E] border border-[#EDE3DE]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>“How Well Do You Know Me?”</span>
        </button>

        <button
          onClick={() => {
            setActiveGame('bucket_list');
            setIsTestPlaying(false);
          }}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            activeGame === 'bucket_list'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-[#5C4E4E] border border-[#EDE3DE]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Romantic Bucket List</span>
        </button>
      </div>

      {/* Names Card */}
      <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 shadow-xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Your Name (The Quiz Creator)
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7A7A] mb-1">
              Partner's Name (The Guesser)
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder="e.g. Maya"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* ACTIVE GAME: HOW WELL DO YOU KNOW ME */}
      {activeGame === 'know_me' && (
        <div className="space-y-6">
          {!isTestPlaying ? (
            /* CREATOR SETUP VIEW: Pick your correct answers */
            <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4ECE8] mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2D2424]">
                    Set Your Secret Answers
                  </h3>
                  <p className="text-xs text-[#8C7A7A]">
                    Click the option that is truly YOU for each question below. {recipientName || 'Your partner'} will try to guess them!
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-[#FAF7F5] p-5 rounded-2xl border border-[#EDE3DE]">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D2424] mb-3">
                      {qIdx + 1}. {q.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = q.correctIndex === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                                : 'bg-white text-[#4A3E3E] border border-[#EDE3DE] hover:bg-rose-50/50'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-rose-200" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Play button */}
              <div className="mt-8 pt-4 border-t border-[#F4ECE8] flex justify-end">
                <button
                  onClick={() => {
                    setIsTestPlaying(true);
                    setCurrentQIndex(0);
                    setPlayerScore(0);
                    setQuizFinished(false);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Test Play As {recipientName || 'Partner'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* TEST PLAY SCREEN */
            <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-8 shadow-xs max-w-xl mx-auto text-center">
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C7A7A] mb-4">
                    <span>Question {currentQIndex + 1} of {questions.length}</span>
                    <span>Score: {playerScore}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-6">
                    {questions[currentQIndex].question}
                  </h3>

                  <div className="space-y-2.5 mb-6 text-left">
                    {questions[currentQIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePartnerGuess(idx)}
                        className="w-full p-4 rounded-xl border border-[#EDE3DE] bg-[#FAF7F5] hover:bg-rose-50 hover:border-rose-300 text-sm font-medium text-[#2D2424] transition-all cursor-pointer text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsTestPlaying(false)}
                    className="text-xs text-[#8C7A7A] hover:text-[#2D2424]"
                  >
                    Exit Test Play
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-2">
                    Quiz Complete!
                  </h3>
                  <p className="text-sm text-[#7D6B6B] mb-6">
                    Score: <strong className="text-rose-600 text-lg">{playerScore} / {questions.length}</strong>
                    <br />
                    {playerScore >= 4 ? 'Soulmate level connection! ❤️' : 'Plenty of cute secrets left to discover together! ✨'}
                  </p>

                  <button
                    onClick={() => setIsTestPlaying(false)}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
                  >
                    Return to Answers & Share
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ACTIVE GAME: ROMANTIC BUCKET LIST */}
      {activeGame === 'bucket_list' && (
        <div className="bg-white rounded-3xl border border-[#EDE3DE] p-6 sm:p-8 shadow-xs">
          <div className="pb-4 border-b border-[#F4ECE8] mb-6">
            <h3 className="font-serif text-xl font-bold text-[#2D2424]">
              Our Shared Romantic Bucket List
            </h3>
            <p className="text-xs text-[#8C7A7A]">
              Check off dreams you've accomplished, or add new memories to make together.
            </p>
          </div>

          <div className="space-y-2.5 mb-6">
            {bucketList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setBucketList(prev => prev.map((b, i) => i === idx ? { ...b, checked: !b.checked } : b));
                  if (!item.checked) triggerHeartConfetti();
                }}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  item.checked
                    ? 'bg-rose-50/70 border-rose-200 text-[#2D2424]'
                    : 'bg-[#FAF7F5] border-[#EDE3DE] text-[#5C4E4E]'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                  item.checked ? 'bg-rose-600 border-rose-600 text-white' : 'border-[#C8B8B0] bg-white'
                }`}>
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={`text-sm ${item.checked ? 'line-through text-[#8C7A7A]' : 'font-medium'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Add custom item */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newBucketItem}
              onChange={e => setNewBucketItem(e.target.value)}
              placeholder="Add a new dream to do together..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD7] text-sm text-[#2D2424] focus:outline-none focus:border-rose-400 focus:bg-white"
              onKeyDown={e => {
                if (e.key === 'Enter' && newBucketItem.trim()) {
                  setBucketList(prev => [...prev, { text: newBucketItem.trim(), checked: false }]);
                  setNewBucketItem('');
                }
              }}
            />
            <button
              onClick={() => {
                if (newBucketItem.trim()) {
                  setBucketList(prev => [...prev, { text: newBucketItem.trim(), checked: false }]);
                  setNewBucketItem('');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
            >
              Add Dream
            </button>
          </div>
        </div>
      )}

      {/* Share Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE3DE] text-center max-w-xl mx-auto shadow-xs mt-8">
        {!shareLink ? (
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2D2424] mb-1">
              Ready to challenge {recipientName || 'your partner'}?
            </h3>
            <p className="text-xs text-[#8C7A7A] mb-4">
              Send them the link to play and see how many questions they get right!
            </p>
            <button
              onClick={handleSaveAndShare}
              disabled={isSaving}
              className="px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Game Link...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Save & Create Challenge Link ❤️
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
              Game Challenge Ready! 🎉
            </h3>
            <p className="text-xs text-[#7D6B6B] mb-4">
              Share this link with {recipientName} to let them play!
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
