export interface MenuOption {
  id: string;
  name: string;
  description: string;
  badge?: string;
  creationType?: 'love_letter' | 'open_when' | 'love_box' | 'date_plan' | 'our_story' | 'quiz' | 'surprise_page' | 'compliment_card';
  actionPrompt?: string;
}

export interface MainCategory {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  image: string;
  options: MenuOption[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'feel-loved',
    title: 'Make Them Feel Loved',
    emoji: '💌',
    subtitle: 'Heartfelt Words & Expressions',
    description: 'Words can make someone\'s entire day. Express what they mean to you.',
    accentColor: 'rose',
    bgGradient: 'from-rose-50 to-pink-50/50',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'love-letter', name: 'Write a love letter', description: 'Deep, romantic, handwritten-style letter with AI assistance or your own touch.', badge: 'Popular', creationType: 'love_letter' },
      { id: 'ten-things', name: '10 things I love about you', description: 'A charming animated card deck celebrating ten specific quirks and gems.', badge: 'Sweet', creationType: 'compliment_card' },
      { id: 'poem', name: 'Create a personalized poem', description: 'A lyrical, bespoke verse woven from your memories and names.', creationType: 'love_letter' },
      { id: 'morning-msg', name: 'Good morning message', description: 'A warm, uplifting note to wake up to and start the day with a smile.', creationType: 'surprise_page' },
      { id: 'night-msg', name: 'Good night message', description: 'Soothing bedtime words to reassure them of your love before sleep.', creationType: 'surprise_page' },
      { id: 'appreciation-card', name: 'Appreciation card', description: 'Acknowledge all the quiet efforts they make that rarely get spoken.', creationType: 'compliment_card' },
      { id: 'random-sweet', name: 'Random sweet message', description: 'Unexpected spontaneous affection sent in the middle of a busy day.', creationType: 'compliment_card' }
    ]
  },
  {
    id: 'surprise-them',
    title: 'Surprise Them',
    emoji: '🎁',
    subtitle: 'Unexpected Delights',
    description: 'Give them something they weren\'t expecting. Pure joyful magic.',
    accentColor: 'amber',
    bgGradient: 'from-amber-50 to-orange-50/50',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'digital-love-box', name: 'Digital love box', description: 'An interactive 3D-styled gift box packed with letters, songs, photos & coupons.', badge: 'Featured', creationType: 'love_box' },
      { id: 'open-when', name: 'Open When letters', description: 'A sealed bundle of digital envelopes for when they are sad, missing you, or celebrating.', badge: 'Emotional', creationType: 'open_when' },
      { id: 'surprise-webpage', name: 'Create a surprise webpage', description: 'A dedicated secret microsite with music, memories, and custom love note.', creationType: 'surprise_page' },
      { id: 'digital-gift', name: 'Create a digital gift', description: 'An interactive virtual wrapped present that unwraps with confetti and sound.', creationType: 'love_box' },
      { id: 'birthday-surprise', name: 'Birthday surprise', description: 'A celebratory countdown and surprise board designed just for their special day.', creationType: 'surprise_page' },
      { id: 'anniversary-surprise', name: 'Anniversary surprise', description: 'Celebrate another milestone together with an unforgettable digital tribute.', creationType: 'our_story' },
      { id: 'hidden-message', name: 'Hidden message', description: 'A scratch-to-reveal or click-to-unlock playful secret note.', creationType: 'surprise_page' }
    ]
  },
  {
    id: 'do-together',
    title: 'Do Something Together',
    emoji: '🍽️',
    subtitle: 'Quality Time & Experiences',
    description: 'Make some time for the two of you. From cozy indoors to grand dates.',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-50 to-teal-50/50',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'plan-a-date', name: 'Plan a date', description: 'Step-by-step timed itinerary tailored to your budget and mood.', badge: 'Interactive', creationType: 'date_plan' },
      { id: 'random-date-gen', name: 'Random date generator', description: 'Can\'t decide? Let serendipity pick your next adventure in seconds.', badge: 'Quick', creationType: 'date_plan' },
      { id: 'dinner-idea', name: 'Dinner idea', description: 'From a candlelit home-cooked pasta night to secret street food spots.', creationType: 'date_plan' },
      { id: 'movie-night', name: 'Movie night', description: 'Curated cozy film double-features with themed snacks and ambiance setup.', creationType: 'date_plan' },
      { id: 'picnic-idea', name: 'Picnic idea', description: 'Park basket checklist, sunset timing, and easy aesthetic finger foods.', creationType: 'date_plan' },
      { id: 'couple-bucket-list', name: 'Couple bucket list', description: '30 unforgettable adventures to cross off together over the next year.', creationType: 'date_plan' },
      { id: 'weekend-plan', name: 'Weekend plan', description: 'A leisurely 48-hour escape or staycation to completely recharge.', creationType: 'date_plan' }
    ]
  },
  {
    id: 'have-fun',
    title: 'Have Some Fun',
    emoji: '🎮',
    subtitle: 'Playful Laughter & Bonding',
    description: 'Because relationships should be fun too. Test your bond playfully.',
    accentColor: 'violet',
    bgGradient: 'from-violet-50 to-purple-50/50',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'how-well-quiz', name: 'How well do you know me?', description: 'Two-player quiz testing comfort foods, dream spots, and first impressions.', badge: 'Playable', creationType: 'quiz' },
      { id: 'couple-quiz', name: 'Couple quiz', description: 'Discover who is more adventurous, emotional, or likely to lose the keys.', creationType: 'quiz' },
      { id: 'truth-or-dare', name: 'Truth or Dare', description: 'Romantic, spicy, and wholesome cards tailored for couples and crushes.', creationType: 'quiz' },
      { id: 'would-you-rather', name: 'Would You Rather', description: 'Hilarious and heart-tugging dilemmas to ignite hours of conversation.', creationType: 'quiz' },
      { id: 'this-or-that', name: 'This or That', description: 'Rapid-fire preferences to see how in sync your instincts really are.', creationType: 'quiz' },
      { id: 'guess-memory', name: 'Guess the memory', description: 'Drop hints and see if your partner remembers where and when it took place.', creationType: 'quiz' },
      { id: 'couple-challenges', name: 'Couple challenges', description: 'Mini 24-hour sweet challenges (e.g. no phone dinner, secret treat swap).', creationType: 'quiz' }
    ]
  },
  {
    id: 'make-memory',
    title: 'Make a Memory',
    emoji: '📸',
    subtitle: 'Cherished Milestones',
    description: 'Turn moments into something you\'ll keep forever. The story of you two.',
    accentColor: 'sky',
    bgGradient: 'from-sky-50 to-indigo-50/50',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'our-story-timeline', name: 'Our story', description: 'A chronological interactive journey with milestone chapters and photos.', badge: 'Timeless', creationType: 'our_story' },
      { id: 'relationship-timeline', name: 'Relationship timeline', description: 'From "the day we first met" to today\'s cozy moments.', creationType: 'our_story' },
      { id: 'digital-scrapbook', name: 'Digital scrapbook', description: 'Collage of tickets, song lyrics, snapshots, and sticky notes.', creationType: 'our_story' },
      { id: 'photo-collage', name: 'Photo collage', description: 'Curate your happiest candids in an elegant gallery display.', creationType: 'our_story' },
      { id: 'memory-card', name: 'Memory card', description: 'Spotlight a single unforgettable day with rich descriptive detail.', creationType: 'compliment_card' },
      { id: 'digital-photo-album', name: 'Digital photo album', description: 'Flip through a virtual hardbound album of your favorite escapades.', creationType: 'our_story' },
      { id: 'playlist-page', name: 'Playlist page', description: 'A dedicated musical dedication with song meanings and memories.', creationType: 'love_box' }
    ]
  },
  {
    id: 'cheer-them-up',
    title: 'Cheer Them Up',
    emoji: '🫂',
    subtitle: 'Comfort & Gentle Support',
    description: 'Everyone needs a little extra love sometimes. Be their calm anchor.',
    accentColor: 'indigo',
    bgGradient: 'from-indigo-50 to-blue-50/50',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'virtual-hug', name: 'Virtual hug', description: 'A warm interactive breathing hug screen with gentle heartbeat pulse.', badge: 'Soothing', creationType: 'surprise_page' },
      { id: 'comfort-message', name: 'Comfort message', description: 'Words of affirmation to ease anxiety, heavy thoughts, or fatigue.', creationType: 'love_letter' },
      { id: 'open-when-sad', name: 'Open when you\'re sad', description: 'A tender reminder that this moment will pass and you are right beside them.', creationType: 'open_when' },
      { id: 'motivational-card', name: 'Motivational card', description: 'Empowering note cheering them on before an exam, interview, or tough task.', creationType: 'compliment_card' },
      { id: 'things-make-smile', name: 'Things that make you smile', description: 'A curated cheerful feed of funny memories, silly memes & doggies.', creationType: 'love_box' },
      { id: 'personalized-encouragement', name: 'Personalized encouragement', description: 'Highlight their resilience and strengths when they doubt themselves.', creationType: 'love_letter' },
      { id: 'cute-distraction', name: 'Cute distraction game', description: 'A mini bubble-popping heart game to take their mind off worries.', creationType: 'quiz' }
    ]
  },
  {
    id: 'just-because',
    title: 'Just Because',
    emoji: '🌹',
    subtitle: 'Pure Spontaneity',
    description: 'You don\'t need a reason. The best gestures are the unprompted ones.',
    accentColor: 'rose',
    bgGradient: 'from-rose-50 to-orange-50/50',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    options: [
      { id: 'thinking-of-you', name: '“I was thinking about you” card', description: 'A simple, honest note letting them know they crossed your mind today.', badge: 'Classic', creationType: 'compliment_card' },
      { id: 'compliment-generator', name: 'Compliment generator', description: 'Generates specific, genuine compliments beyond superficial looks.', badge: 'Instant', creationType: 'compliment_card' },
      { id: 'random-surprise', name: 'Random surprise', description: 'A mystery interactive unlockable link for an unexpected smile.', creationType: 'surprise_page' },
      { id: 'send-appreciation', name: 'Send appreciation', description: 'Thank them for being their authentic, wonderful self.', creationType: 'love_letter' },
      { id: 'sweet-message', name: 'Sweet message', description: 'A pocket-sized dose of love sent just to brighten their afternoon.', creationType: 'compliment_card' },
      { id: 'mini-love-challenge', name: 'Mini love challenge', description: 'A tiny 5-minute mission for today (e.g., send their favorite childhood song).', creationType: 'compliment_card' }
    ]
  }
];

export const DAILY_LITTLE_THINGS = [
  {
    id: 'daily-1',
    title: "Send them a message telling them one thing you genuinely appreciate about them.",
    subtitle: "A tiny moment of reflection that stays with them all afternoon.",
    time: "2 minutes",
    cost: "₹0",
    category: "feel-loved",
    actionName: "Write Appreciation Note",
    actionType: "love_letter"
  },
  {
    id: 'daily-2',
    title: "Send them a voice note sharing your favorite small memory of you two laughing.",
    subtitle: "Hearing your voice and genuine smile connects deeper than plain text.",
    time: "3 minutes",
    cost: "₹0",
    category: "make-memory",
    actionName: "Create Memory Dedication",
    actionType: "our_story"
  },
  {
    id: 'daily-3',
    title: "Order or surprise them with their favorite comfort snack or chai when they least expect it.",
    subtitle: "Food ordered to their doorstep with a sweet note changes the entire day.",
    time: "5 minutes",
    cost: "₹150–₹300",
    category: "surprise-them",
    actionName: "Craft Surprise Box",
    actionType: "love_box"
  },
  {
    id: 'daily-4',
    title: "Put your phone in another room for 30 minutes tonight and just talk over warm tea.",
    subtitle: "Undivided presence is one of the rarest gifts you can give.",
    time: "30 minutes",
    cost: "₹0",
    category: "do-together",
    actionName: "Plan Cozy Evening",
    actionType: "date_plan"
  },
  {
    id: 'daily-5',
    title: "Write a mini list of '3 Things I Notice About You That Nobody Else Does'.",
    subtitle: "Being truly seen is the deepest form of love.",
    time: "4 minutes",
    cost: "₹0",
    category: "feel-loved",
    actionName: "Generate Card",
    actionType: "compliment_card"
  }
];

export const RANDOM_MISSIONS = [
  {
    mission: "Send them a voice message telling them your favorite memory together.",
    time: "3 minutes",
    cost: "Free",
    tip: "Keep it candid and unscripted — natural laughter is magnetic."
  },
  {
    mission: "Text them an old photo from your gallery with 'Look how far we\'ve come ❤️'.",
    time: "2 minutes",
    cost: "Free",
    tip: "Pick an everyday candid moment, not just a formal event."
  },
  {
    mission: "Leave a tiny handwritten sticky note in their pocket, book, or laptop bag.",
    time: "2 minutes",
    cost: "Free",
    tip: "Write one sentence: 'Proud of you today and always.'"
  },
  {
    mission: "Queue up a song that reminds you of them and send the link with 'This is you to me'.",
    time: "3 minutes",
    cost: "Free",
    tip: "Mention the exact timestamp or lyric that struck you."
  },
  {
    mission: "Make them a warm cup of coffee or chai without them asking for it.",
    time: "5 minutes",
    cost: "Free",
    tip: "Remember their exact preference: sugar level and temperature."
  },
  {
    mission: "Ask them: 'What was the highlight and lowlight of your day?' and listen without giving advice.",
    time: "15 minutes",
    cost: "Free",
    tip: "Pure listening creates safety."
  },
  {
    mission: "Send a digital 'Open When You Need A Smile' letter to their WhatsApp or email right now.",
    time: "4 minutes",
    cost: "Free",
    tip: "Include an inside joke that only the two of you understand."
  }
];

import { ActionCategory } from '../types';

export const TODAY_LITTLE_THING = {
  title: "Hide a tiny folded note in their pocket, purse, or notebook.",
  description: "Write one genuine compliment or reminder of why you love them. They'll find it randomly in the middle of their day.",
  time: "Takes 2 mins",
  cost: "₹0 (Free)",
  actionText: "I Did This Today! ❤️"
};

export const ACTION_CATEGORIES: ActionCategory[] = [
  {
    id: 'say_something',
    title: 'Say Something',
    icon: '💌',
    description: 'Heartfelt letters, gentle compliments, and words they will keep and cherish forever.',
    color: '#FFF1F2',
    options: [
      { id: 'opt-1', title: 'Write a Love Letter', description: 'Handwritten, romantic, or vintage parchment letter with AI assistance.', icon: '💌', type: 'love_letter', actionRoute: 'love_letter' },
      { id: 'opt-2', title: '10 Things I Love About You', description: 'A deck of ten genuine reasons you adore and cherish them.', icon: '💖', type: 'compliment', actionRoute: 'love_letter' },
      { id: 'opt-3', title: 'Personalized Poem', description: 'A lyrical, bespoke verse woven from your memories and names.', icon: '📜', type: 'love_letter', actionRoute: 'love_letter' },
      { id: 'opt-4', title: 'Good Morning Note', description: 'A gentle message to greet them before the rush of the morning.', icon: '☀️', type: 'compliment', actionRoute: 'love_letter' },
      { id: 'opt-5', title: 'Good Night Message', description: 'Sweet bedtime words reassuring them of your care before sleep.', icon: '🌙', type: 'compliment', actionRoute: 'love_letter' },
      { id: 'opt-6', title: 'Appreciation Card', description: 'Acknowledge all the quiet efforts they make that rarely get spoken.', icon: '🌸', type: 'compliment', actionRoute: 'love_letter' },
    ]
  },
  {
    id: 'surprise_them',
    title: 'Surprise Them',
    icon: '🎁',
    description: 'Digital love boxes, sealed "Open When" envelopes, and spontaneous unboxing delights.',
    color: '#FEF3C7',
    options: [
      { id: 'opt-7', title: 'Digital Love Box', description: 'A virtual 3D box with letters, songs, memories & coupons.', icon: '🎁', type: 'love_box', actionRoute: 'love_box' },
      { id: 'opt-8', title: '“Open When” Letters', description: 'A collection of digital envelopes sealed for every mood and moment.', icon: '✉️', type: 'open_when', actionRoute: 'open_when' },
      { id: 'opt-9', title: 'Interactive Love Coupon', description: 'A redeemable coupon for massages, dinner, or quiet time.', icon: '🎟️', type: 'love_box', actionRoute: 'love_box' },
      { id: 'opt-10', title: 'Hidden Secret Message', description: 'A scratch-to-reveal or click-to-unlock playful secret note.', icon: '✨', type: 'love_letter', actionRoute: 'love_letter' },
    ]
  },
  {
    id: 'plan_something',
    title: 'Plan Something',
    icon: '🕯️',
    description: 'Thoughtful date itineraries from ₹500 sunset walks to cozy candlelit evenings.',
    color: '#ECFDF5',
    options: [
      { id: 'opt-11', title: 'Date Night Generator', description: 'Timed schedule with cost estimates and romantic tips.', icon: '🗓️', type: 'date_plan', actionRoute: 'date_plan' },
      { id: 'opt-12', title: '₹500 Budget Date', description: 'Street food, scenic walks, warm tea, and heartfelt notes.', icon: '💰', type: 'date_plan', actionRoute: 'date_plan' },
      { id: 'opt-13', title: 'Romantic Stay-At-Home Date', description: 'Fort building, cooking together, and shared music.', icon: '🏠', type: 'date_plan', actionRoute: 'date_plan' },
      { id: 'opt-14', title: 'Late Night Drive & Sunset', description: 'Scenic route, playlist cues, and golden hour memories.', icon: '🚗', type: 'date_plan', actionRoute: 'date_plan' },
    ]
  },
  {
    id: 'have_fun',
    title: 'Have Some Fun',
    icon: '🎮',
    description: 'Playful couples quizzes, truth-or-dare, and shared laughter to bring you closer.',
    color: '#EFF6FF',
    options: [
      { id: 'opt-18', title: '“How Well Do You Know Me?”', description: 'A fun two-player quiz with score and hilarious answers.', icon: '❓', type: 'quiz', actionRoute: 'couple_game' },
      { id: 'opt-19', title: 'Couple Compatibility Trivia', description: 'Discover who is more adventurous, emotional, or likely to snooze.', icon: '🎲', type: 'quiz', actionRoute: 'couple_game' },
      { id: 'opt-20', title: 'Romantic Bucket List', description: 'Check off dreams and add new adventures together.', icon: '📝', type: 'bucket_list', actionRoute: 'couple_game' },
      { id: 'opt-21', title: 'Truth or Care for Two', description: 'Deep, vulnerable, and playful questions to ask tonight.', icon: '💬', type: 'quiz', actionRoute: 'couple_game' },
    ]
  },
  {
    id: 'make_memory',
    title: 'Make a Memory',
    icon: '📸',
    description: 'Turn milestones, first meetings, and quiet moments into a lasting keepsake.',
    color: '#FFF7ED',
    options: [
      { id: 'opt-24', title: '“Our Story” Timeline', description: 'Chronicle your relationship from the day you met to now.', icon: '💍', type: 'timeline', actionRoute: 'our_story' },
      { id: 'opt-25', title: 'Anniversary Chronicle', description: 'Celebrate another year together with an unforgettable digital tribute.', icon: '🥂', type: 'timeline', actionRoute: 'our_story' },
      { id: 'opt-26', title: 'Digital Photo & Song Tribute', description: 'A dedication of memories paired with your shared songs.', icon: '🎵', type: 'love_box', actionRoute: 'love_box' },
      { id: 'opt-27', title: 'First Date Nostalgia Tribute', description: 'Spotlight the exact day everything started between you two.', icon: '✨', type: 'timeline', actionRoute: 'our_story' },
    ]
  },
  {
    id: 'make_day_better',
    title: 'Make Their Day Better',
    icon: '🫂',
    description: 'Warm virtual hugs, comforting words, and gentle care when life gets heavy.',
    color: '#FAF5FF',
    options: [
      { id: 'opt-22', title: 'Virtual Hug With Heartbeat', description: 'A soothing breathing circle and warm loving heartbeat pulse.', icon: '🫂', type: 'virtual_hug' },
      { id: 'opt-23', title: '“Open When You’re Sad” Letter', description: 'A tender letter reminding them this feeling will pass.', icon: '🌧️', type: 'open_when', actionRoute: 'open_when' },
      { id: 'opt-28', title: 'Comfort & Anxiety Relief Note', description: 'Words of affirmation when they are stressed or doubting themselves.', icon: '🕊️', type: 'love_letter', actionRoute: 'love_letter' },
      { id: 'opt-29', title: 'Cozy Self-Care Checklist', description: 'Gentle steps to rest, hydrate, and breathe deeply.', icon: '☕', type: 'compliment', actionRoute: 'love_letter' },
    ]
  },
  {
    id: 'just_because',
    title: 'Just Because',
    icon: '🌸',
    description: 'Unprompted affection, spontaneous thinking-of-you cards, and quiet everyday love.',
    color: '#FDF2F8',
    options: [
      { id: 'opt-15', title: '“I Was Thinking About You” Card', description: 'A simple, honest note letting them know they crossed your mind.', icon: '💭', type: 'compliment', actionRoute: 'love_letter' },
      { id: 'opt-16', title: 'Spontaneous Admiration Note', description: 'Thank them for being their authentic, wonderful self.', icon: '❤️', type: 'love_letter', actionRoute: 'love_letter' },
      { id: 'opt-17', title: 'Meaningful Compliment Generator', description: 'Generates specific, genuine compliments beyond looks.', icon: '✨', type: 'compliment', actionRoute: 'love_letter' },
      { id: 'opt-30', title: 'Mini 5-Minute Love Challenge', description: 'A tiny sweet mission (e.g., share their favorite childhood song).', icon: '💌', type: 'love_letter', actionRoute: 'love_letter' },
    ]
  }
];

