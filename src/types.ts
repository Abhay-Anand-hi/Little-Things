export type RelationshipType = 
  | 'partner' 
  | 'crush' 
  | 'best_friend' 
  | 'family' 
  | 'someone_special';

export type OccasionType = 
  | 'birthday' 
  | 'anniversary' 
  | 'valentines' 
  | 'date_night' 
  | 'long_distance' 
  | 'bad_day' 
  | 'no_reason' 
  | 'just_because';

export type BudgetType = 
  | 'free' 
  | 'under_500' 
  | '500_1000' 
  | '1000_5000' 
  | 'unlimited';

export type PersonalityType = 
  | 'romantic' 
  | 'funny' 
  | 'introverted' 
  | 'adventurous' 
  | 'emotional' 
  | 'simple' 
  | 'playful';

export type LetterTone = 
  | 'romantic' 
  | 'cute' 
  | 'emotional' 
  | 'funny' 
  | 'deep';

export type LetterStyle = 
  | 'handwritten' 
  | 'elegant' 
  | 'minimal' 
  | 'romantic' 
  | 'vintage';

export interface PersonalizationProfile {
  recipientName: string;
  relationship: RelationshipType;
  occasion: OccasionType;
  budget: BudgetType;
  personality: PersonalityType;
}

export type CreationType = 
  | 'love_letter' 
  | 'open_when' 
  | 'love_box' 
  | 'date_plan' 
  | 'our_story' 
  | 'quiz' 
  | 'couple_game'
  | 'surprise_page'
  | 'compliment_card';

export interface SubOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  actionRoute?: string;
}

export interface ActionCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  options: SubOption[];
}

export interface LoveLetterData {
  title?: string;
  recipientName: string;
  senderName: string;
  relationship: string;
  tone: LetterTone;
  style: LetterStyle;
  content: string;
  reasonsToLove?: string[];
  favoriteMemory?: string;
  signature?: string;
  date: string;
}

export interface OpenWhenEnvelope {
  id: string;
  title: string;
  emoji: string;
  color: string;
  letter: string;
  surpriseTip?: string;
  isOpened?: boolean;
}

export interface OpenWhenData {
  recipientName: string;
  senderName: string;
  coverMessage: string;
  envelopes: OpenWhenEnvelope[];
}

export interface LoveBoxItem {
  id: string;
  type: 'letter' | 'photo' | 'song' | 'memory' | 'compliment' | 'coupon' | 'surprise';
  title: string;
  content: string;
  extra?: string; // photo URL, song title, coupon code/expiry
}

export interface LoveBoxData {
  recipientName: string;
  senderName: string;
  boxColor: string;
  ribbonColor: string;
  boxMessage: string;
  items: LoveBoxItem[];
}

export interface DatePlanSlot {
  time: string;
  activity: string;
  location?: string;
  description: string;
  costEstimate: string;
  tip?: string;
}

export interface DatePlanData {
  title: string;
  recipientName: string;
  senderName: string;
  budget: string;
  location: string;
  mood: string;
  indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  slots: DatePlanSlot[];
  specialNote?: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
  location?: string;
  song?: string;
}

export interface OurStoryData {
  title: string;
  recipientName?: string;
  senderName?: string;
  coupleNames?: string;
  subtitle?: string;
  milestones: StoryMilestone[];
  closingNote?: string;
  closingMessage?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex?: number;
  explanation?: string;
}

export interface QuizData {
  title: string;
  creatorName: string;
  partnerName: string;
  questions: QuizQuestion[];
  playfulOutcome?: string;
}

export interface Creation {
  id: string;
  type: CreationType;
  title: string;
  recipientName: string;
  creatorName: string;
  creatorId: string;
  createdAt: string;
  data: LoveLetterData | OpenWhenData | LoveBoxData | DatePlanData | OurStoryData | QuizData | Record<string, unknown> | any;
  isFavorite?: boolean;
  viewsCount?: number;
}

export interface AIDecideIdea {
  id: string;
  idea: string;
  whyTheyLoveIt: string;
  whatYouNeed: string[];
  time: string;
  cost: string;
  howToDoIt: string[];
  category: string;
  actionType: CreationType | 'date_planner' | 'browse';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface DiscoverItem {
  id: string;
  title: string;
  category: string;
  time: string;
  cost: string;
  description: string;
  tag: string;
  tags: string[];
  icon: string;
  actionType: string;
}

// ----------------------------------------------------------------------
// "HER!?" REDESIGN DATA ARCHITECTURE TYPES
// ----------------------------------------------------------------------

export interface FlowerItem {
  id: string;
  name: string;
  emoji: string;
  image: string;
  shortDesc: string;
  emotionalSentences: string[];
  whySheMightLikeThis: string;
  vibe: string;
  occasion?: string;
  tags?: string[];
}

export interface BouquetItem {
  id: string;
  name: string;
  flowerIcons: string[];
  image: string;
  emotionalDesc: string;
  vibe: string;
  occasion: string;
  combination: string;
}

export interface BuyItem {
  id: string;
  title: string;
  subcategory: string;
  priceCategory: 'under_500' | 'under_1000' | 'under_2000' | 'luxury';
  priceDisplay: string;
  image: string;
  whySheLikesIt: string;
  thoughtfulTip: string;
  tags: string[];
}

export interface MessageItem {
  id: string;
  category: string;
  title?: string;
  message: string;
  vibe: string;
  tag: string;
}

export interface ComplimentItem {
  id: string;
  category: string;
  compliment: string;
  subtleDetail: string;
}

export interface SurpriseItem {
  id: string;
  title: string;
  effort: 'Easy' | 'Thoughtful' | 'Creative';
  estimatedCost: string;
  timeRequired: string;
  cuteExplanation: string;
  actionRoute?: string;
  category: string;
  image: string;
}

export interface MainCategoryHer {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
  accentColor?: string;
}

export interface SavedHerItem {
  id: string;
  type: 'flower' | 'bouquet' | 'buy' | 'message' | 'compliment' | 'surprise' | 'memory' | 'idea';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  category?: string;
  savedAt: string;
}

export interface HerGenericCardItem {
  id: string;
  categoryId: string;
  subcategory: string;
  title: string;
  description: string;
  emotionalDetail?: string;
  thoughtfulTip?: string;
  actionRoute?: CreationType | string;
  actionLabel?: string;
  time?: string;
  cost?: string;
  image?: string;
  icon?: string;
}

export interface AIConciergeRecommendation {
  idea: string;
  estimatedCost: string;
  effort: 'Easy' | 'Thoughtful' | 'Creative';
  whyItSuitsHer: string;
  howToDoIt: string;
}

export interface AIConciergeResult {
  summary: string;
  recommendations: AIConciergeRecommendation[];
  bonusMessage?: {
    text: string;
    tip: string;
  };
}

// ----------------------------------------------------------------------
// CORE LITTLE THINGS ♡ PLATFORM TYPES
// ----------------------------------------------------------------------

export type PersonMode = 'HER' | 'HIM' | 'US';

export type PresentationStyle = 'plain' | 'emojis' | 'cute';

export interface LittleThingsContext {
  person: PersonMode;
  intent?: string;
  mood?: string;
  situation?: string;
  timeAvailable?: string;
  budget?: number | 'free' | 'open';
  interests?: string[];
  preferences?: string[];
  dislikes?: string[];
  userThought?: string;
  relationshipContext?: {
    occasion?: string;
    tone?: string;
  };
  currentCategory?: string;
  sessionContext?: Record<string, unknown>;
  savedContext?: Record<string, unknown>;
}

export interface UserCollection {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  createdAt: string;
  itemCount?: number;
}

export interface JournalSavedItem {
  id: string;
  sourceType: 'PRODUCT' | 'IDEA' | 'MESSAGE' | 'SURPRISE' | 'FLOWER' | 'MEMORY' | 'NOTE';
  sourceId?: string;
  title: string;
  subtitle?: string;
  description: string;
  person: PersonMode;
  image?: string;
  category?: string;
  personalNote?: string;
  whyReminded?: string; // For "She/He mentioned it once..."
  collectionIds: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface MemoryItem {
  id: string;
  person: PersonMode;
  category: 'favorite' | 'dislike' | 'interest' | 'wishlist' | 'detail';
  text: string;
  sourceContext?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CategoryModeItem {
  id: string;
  title: string;
  emoji: string;
  person: PersonMode;
  tagline: string;
  description: string;
  image: string;
  rotatingMicrocopy: string[];
  subcategories: string[];
  accentColor: string;
}

export interface MakeItYoursData {
  itemTitle: string;
  originalText: string;
  customCallingName?: string;
  userPersonalDetail?: string;
  selectedTone?: string;
  resultText?: string;
}

export interface AIRecommendationItem {
  title: string;
  type: 'DO' | 'BUY' | 'SAY' | 'SURPRISE' | 'SMILE';
  description: string;
  whyItFits: string;
  personalizationPrompt?: string;
  imageKey?: string;
  image?: string;
  estimatedCost?: string;
  time?: string;
}

export type PersonCompatibility = 'HER' | 'HIM' | 'US' | 'UNIVERSAL';

export interface PersonaImageEntry {
  url: string;
  alt: string;
}

export interface PersonaContentItem {
  id: string;
  title: string;
  category: string;
  categoryId?: string;
  categoryTitle?: string;
  subcategory?: string;
  imageKey: string;
  description: string;
  tags: string[];
  person: PersonMode;
  personCompatibility: PersonCompatibility;
  subtitle?: string;
  whyItMatters?: string;
  whenToUse?: string;
  timeRequired?: string;
  estimatedCost?: string;
  effort?: 'Easy' | 'Thoughtful' | 'Creative' | 'Minimal' | 'Deep';
  actionRoute?: string;
  details?: string[];
  situation?: string[];
  intent?: string[];
}

export interface PersonaProductItem {
  id: string;
  title: string;
  category: string;
  imageKey: string;
  description: string;
  tags: string[];
  price: string;
  priceNumeric: number;
  budgetTier: 'under-300' | 'under-500' | 'under-1000' | 'splurge' | 'open' | 'over-1000';
  personCompatibility: PersonCompatibility;
  intent: string;
  whySpecial?: string;
  buyUrl?: string;
  brand?: string;
  vibe?: string;
}


