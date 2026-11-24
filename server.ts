import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// In-memory + file-backed persistent store for creations and users
const DATA_DIR = path.join(process.cwd(), '.data');
const CREATIONS_FILE = path.join(DATA_DIR, 'creations.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadData<T>(file: string, defaultValue: T): T {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn(`Error reading ${file}:`, err);
  }
  return defaultValue;
}

function saveData(file: string, data: any) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

interface StoredCreation {
  id: string;
  type: string;
  title: string;
  recipientName: string;
  creatorName: string;
  creatorId: string;
  createdAt: string;
  data: any;
  viewsCount: number;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  favorites: string[];
}

let creations: Record<string, StoredCreation> = loadData(CREATIONS_FILE, {});
let users: Record<string, StoredUser> = loadData(USERS_FILE, {});

// Seed initial example creations if empty
if (Object.keys(creations).length === 0) {
  const sampleId = 'love123';
  creations[sampleId] = {
    id: sampleId,
    type: 'love_box',
    title: 'Surprise Midnight Love Box',
    recipientName: 'Maya',
    creatorName: 'Alex',
    creatorId: 'seed-user',
    createdAt: new Date().toISOString(),
    viewsCount: 12,
    data: {
      recipientName: 'Maya',
      senderName: 'Alex',
      boxColor: '#FFF1F2',
      ribbonColor: '#F43F5E',
      boxMessage: 'To the person who makes every ordinary day feel like an adventure. Open your surprises one by one! ❤️',
      items: [
        {
          id: 'item-1',
          type: 'letter',
          title: 'A Little Note For You',
          content: 'I was thinking about the first time we made chai together and dropped sugar all over the counter. Even in the mess, I knew you were my home. Thank you for loving me so patiently.'
        },
        {
          id: 'item-2',
          type: 'song',
          title: 'Our Sunset Song',
          content: 'Leon Bridges - Texas Sun',
          extra: 'Every time this plays, I picture us on that hilltop watching the golden hour sky.'
        },
        {
          id: 'item-3',
          type: 'coupon',
          title: 'Redeemable Romance Coupon',
          content: 'One (1) Unconditional 30-Minute Head Massage + Homemade Hot Chocolate of your choice.',
          extra: 'Expires: Never. Valid anywhere.'
        },
        {
          id: 'item-4',
          type: 'compliment',
          title: 'A Truth About You',
          content: 'The way your eyes light up when you describe something you are passionate about is genuinely the most beautiful thing in the world.'
        }
      ]
    }
  };
  saveData(CREATIONS_FILE, creations);
}

// ----------------------------------------------------------------------
// API ROUTES
// ----------------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Helper for unique share ID
function generateShortId(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// GET all creations (filtered by creator or all for user)
app.get('/api/creations', (req, res) => {
  const creatorId = req.query.creatorId as string;
  const all = Object.values(creations);
  if (creatorId) {
    return res.json(all.filter(c => c.creatorId === creatorId));
  }
  res.json(all.slice(0, 50));
});

// GET creation by ID (Public - no login needed for recipients)
app.get('/api/creations/:id', (req, res) => {
  const id = req.params.id;
  const item = creations[id];
  if (!item) {
    return res.status(404).json({ error: 'Creation not found' });
  }
  // increment view count
  item.viewsCount = (item.viewsCount || 0) + 1;
  saveData(CREATIONS_FILE, creations);
  res.json(item);
});

// POST save a creation
app.post('/api/creations', (req, res) => {
  const body = req.body;
  if (!body.type || !body.data) {
    return res.status(400).json({ error: 'Missing required creation fields' });
  }

  const id = body.id || generateShortId();
  const creation: StoredCreation = {
    id,
    type: body.type,
    title: body.title || 'Special Surprise',
    recipientName: body.recipientName || 'Someone Special',
    creatorName: body.creatorName || 'A Secret Admirer',
    creatorId: body.creatorId || 'guest',
    createdAt: new Date().toISOString(),
    data: body.data,
    viewsCount: 0
  };

  creations[id] = creation;
  saveData(CREATIONS_FILE, creations);

  res.status(201).json(creation);
});

// DELETE creation
app.delete('/api/creations/:id', (req, res) => {
  const id = req.params.id;
  if (creations[id]) {
    delete creations[id];
    saveData(CREATIONS_FILE, creations);
    return res.json({ success: true, id });
  }
  res.status(404).json({ error: 'Not found' });
});

// User Auth Endpoints (lightweight local accounts)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const cleanEmail = email.toLowerCase().trim();
  const existing = Object.values(users).find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }
  const id = 'user_' + Date.now();
  const newUser: StoredUser = {
    id,
    name: name.trim(),
    email: cleanEmail,
    password: password || '',
    createdAt: new Date().toISOString(),
    favorites: []
  };
  users[id] = newUser;
  saveData(USERS_FILE, users);
  res.json({ id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const cleanEmail = email.toLowerCase().trim();
  const user = Object.values(users).find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    // For delightful UX, automatically create guest/account if not found or login
    const id = 'user_' + Date.now();
    const newUser: StoredUser = {
      id,
      name: cleanEmail.split('@')[0] || 'Friend',
      email: cleanEmail,
      createdAt: new Date().toISOString(),
      favorites: []
    };
    users[id] = newUser;
    saveData(USERS_FILE, users);
    return res.json({ id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt });
  }
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, favorites: user.favorites || [] });
});

// Toggle Favorite
app.post('/api/auth/favorites/toggle', (req, res) => {
  const { userId, creationId } = req.body;
  if (!userId || !creationId) {
    return res.status(400).json({ error: 'Missing userId or creationId' });
  }
  const user = users[userId];
  if (user) {
    user.favorites = user.favorites || [];
    if (user.favorites.includes(creationId)) {
      user.favorites = user.favorites.filter(id => id !== creationId);
    } else {
      user.favorites.push(creationId);
    }
    saveData(USERS_FILE, users);
    return res.json({ favorites: user.favorites });
  }
  res.status(404).json({ error: 'User not found' });
});

// ----------------------------------------------------------------------
// GEMINI AI UTILITIES & ENDPOINTS
// ----------------------------------------------------------------------

// Valid candidate models in fallback priority order
const GEMINI_CANDIDATE_MODELS = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

function cleanAndParseJSON<T = any>(rawText: string): T | null {
  if (!rawText) return null;
  let cleaned = rawText.trim();
  // Remove markdown code fence delimiters if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // Attempt bracket/brace boundary extraction
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBracket !== -1 && lastBracket > firstBracket && (firstBrace === -1 || firstBracket < firstBrace)) {
      try {
        return JSON.parse(cleaned.substring(firstBracket, lastBracket + 1)) as T;
      } catch {}
    } else if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1)) as T;
      } catch {}
    }
    return null;
  }
}

async function callGeminiResilient(contents: string, systemInstruction?: string): Promise<string | null> {
  const ai = getAI();
  if (!ai) return null;

  for (const model of GEMINI_CANDIDATE_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            responseMimeType: 'application/json',
            ...(systemInstruction ? { systemInstruction } : {})
          }
        });
        const text = response.text?.trim();
        if (text) {
          return text;
        }
      } catch (err: any) {
        const msg = err?.message || String(err);
        const isTransient =
          err?.status === 503 ||
          err?.status === 429 ||
          msg.includes('503') ||
          msg.includes('429') ||
          msg.includes('high demand') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('RESOURCE_EXHAUSTED');

        if (isTransient && attempt === 1) {
          // Brief exponential backoff with jitter on 503 or 429 spikes
          await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 200));
          continue;
        }

        // On failure or high demand, move on to next model in the candidate cascade
        console.warn(`[Gemini] ${model} unavailable (attempt ${attempt}): ${msg.slice(0, 100)}. Trying fallback model...`);
        break;
      }
    }
  }

  return null;
}

// 1. "Help Me Decide"
app.post('/api/ai/decide', async (req, res) => {
  const { situation, relationship, budget, recipientName } = req.body;
  const promptText = `You are the thoughtful, romantic, and caring relationship curator for "Little Things".
A user asks: "${situation || 'I want to do something thoughtful for someone I love'}".
Context:
- Relationship: ${relationship || 'partner'}
- Recipient Name: ${recipientName || 'them'}
- Budget: ${budget || 'flexible'}

Provide 3 practical, deeply touching, and creative ideas.
Format your answer strictly as a JSON array of objects with the following schema:
[
  {
    "idea": "Short, catchy name of the activity",
    "whyTheyLoveIt": "1-2 sentences explaining why this touches their heart emotionally",
    "whatYouNeed": ["item 1", "item 2", "item 3"],
    "time": "e.g. 15 minutes / 1 hour",
    "cost": "e.g. ₹0 / Under ₹500",
    "howToDoIt": [
      "Step 1...",
      "Step 2...",
      "Step 3..."
    ],
    "category": "feel-loved | surprise-them | do-together | cheer-them-up | just-because",
    "actionType": "love_letter | date_plan | love_box | open_when | our_story | quiz | surprise_page"
  }
]`;

  try {
    const rawText = await callGeminiResilient(
      promptText,
      'You are an empathetic, world-class relationship and love mentor. Your ideas should never be generic AI clichés. Focus on genuine human connection, sensory details, and heartfelt thoughtfulness.'
    );
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ ideas: parsed });
      }
    }
  } catch (err) {
    console.warn('Gemini decide processing error:', err);
  }

  // Contextual fallback tailored to user's situation and recipient
  const targetName = recipientName ? recipientName.trim() : 'them';
  const targetBudget = budget || 'Under ₹500';

  res.json({
    ideas: [
      {
        idea: `The "Reasons You Make Life Sweeter" Tea Tray for ${targetName}`,
        whyTheyLoveIt: `Combines comforting warmth with unexpected, specific handwritten compliments ${targetName} can read while sipping.`,
        whatYouNeed: ['Their favorite tea/coffee mug', '3 sticky notes or small cards', 'A biscuit or snack'],
        time: '10 minutes',
        cost: targetBudget,
        howToDoIt: [
          `Brew ${targetName}'s favorite hot beverage exactly how they love it.`,
          'Fold 3 tiny paper notes: 1 memory, 1 compliment, 1 thing you are grateful for.',
          'Place the notes tucked under the saucer or wrapped around the mug handle and hand it to them quietly.'
        ],
        category: 'feel-loved',
        actionType: 'love_box'
      },
      {
        idea: `The Golden Hour Acoustic Walk with ${targetName}`,
        whyTheyLoveIt: 'Gets you both out of the daily routine for spontaneous, unhurried conversation without spending much.',
        whatYouNeed: ['Comfortable walking shoes', 'A curated playlist with 1 shared earphone set', targetBudget],
        time: '1 hour',
        cost: targetBudget,
        howToDoIt: [
          'Pick a neighborhood or park path with food stalls 30 minutes before sunset.',
          'Share one earbud each playing a warm acoustic playlist.',
          `Sample a favorite treat together while asking ${targetName} three questions you haven't asked in months.`
        ],
        category: 'do-together',
        actionType: 'date_plan'
      },
      {
        idea: `Digital "Open When You Need A Smile" Capsule`,
        whyTheyLoveIt: `Gives ${targetName} an on-demand emotional safety blanket they can open anytime they feel tired or lonely.`,
        whatYouNeed: ['5 minutes on Little Things', 'A funny inside joke memory', 'A candid smiling photo'],
        time: '8 minutes',
        cost: '₹0',
        howToDoIt: [
          'Select the Open When creator in Little Things.',
          `Write a tender note recounting a time you and ${targetName} couldn't stop laughing.`,
          'Send them the sealed envelope link with "Save this for when you need me today."'
        ],
        category: 'cheer-them-up',
        actionType: 'open_when'
      }
    ]
  });
});

// "Help Me Pick Something For Her" - AI Feature
app.post('/api/ai/pick-for-her', async (req, res) => {
  const { feeling, occasion, budget, recipientName } = req.body;
  const name = recipientName ? recipientName.trim() : 'her';

  const promptText = `You are a delicate, poetic, and deeply romantic curator for "Little Things", helping someone do something wonderful for ${name}.
Context:
- What she's feeling right now: ${feeling || 'stressed'}
- Occasion: ${occasion || 'random day'}
- Budget: ${budget || 'free'}

Create a curated 4-part plan tailored specifically to her mood:
1. One flower recommendation that emotionally fits her mood.
2. One gentle, realistic thing to do for her.
3. One touching message to send her right now.
4. One tiny surprise that fits the budget.

Respond STRICTLY in JSON format matching this schema:
{
  "flower": {
    "name": "Flower name (e.g. Pink Tulip / Chamomile Daisy)",
    "emoji": "🌷",
    "reason": "Why this specific flower matches what she is feeling right now"
  },
  "thingToDo": {
    "title": "Clear name of the gesture",
    "description": "2-3 sentences explaining exactly what to do",
    "time": "e.g. 15 mins"
  },
  "messageToSend": {
    "text": "The exact wording to text or say to her, emotionally grounded and natural",
    "tip": "When or how to send it"
  },
  "tinySurprise": {
    "title": "Name of the surprise",
    "explanation": "What to prepare and why she will adore it",
    "cost": "e.g. ₹0 / Under ₹300"
  },
  "vibeSummary": "A one-sentence poetic summary for her day"
}`;

  try {
    const rawText = await callGeminiResilient(
      promptText,
      'You are a sensitive, artistic and thoughtful relationship expert specializing in micro-gestures and aesthetic romantic experiences.'
    );
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.flower && parsed.thingToDo && parsed.messageToSend) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini pick-for-her error:', err);
  }

  // Graceful mood-aware fallback
  const isStressedOrSad = ['stressed', 'sad', 'tired', 'overwhelmed'].includes((feeling || '').toLowerCase());
  const isCelebration = ['happy', 'celebrating', 'excited'].includes((feeling || '').toLowerCase());

  res.json({
    flower: {
      name: isStressedOrSad ? 'Chamomile Daisy' : isCelebration ? 'Sunflowers & Baby\'s Breath' : 'Pink Tulips',
      emoji: isStressedOrSad ? '🌼' : isCelebration ? '🌻' : '🌷',
      reason: isStressedOrSad 
        ? `She feels ${feeling || 'tired'}; chamomile daisies signal stillness, calm breathing, and unconditional comfort.`
        : `Matches her vibrant, glowing energy and brings pure warmth to her space.`
    },
    thingToDo: {
      title: isStressedOrSad ? `The 10-Minute Quiet Sanctuary` : `The Impromptu Treat Run`,
      description: isStressedOrSad
        ? `Draw her a cup of warm tea or hot cocoa, silence her notifications, and give her a long, unhurried hug without asking her to explain why she is exhausted.`
        : `Whisk her away to her favorite neighborhood bakery or ice cream corner to celebrate her good mood.`,
      time: isStressedOrSad ? '15 mins' : '45 mins'
    },
    messageToSend: {
      text: isStressedOrSad
        ? `Hey my love, just wanted to remind you that you don't have to carry everything by yourself today. I am right here, and I'm so proud of how resilient you are.`
        : `Just saw something that reminded me of your laugh and wanted you to know you're the sweetest part of my whole day.`,
      tip: 'Send this when she is at her desk or about to take a break.'
    },
    tinySurprise: {
      title: isStressedOrSad ? 'The "Take a Breath" Playlist' : 'A Single Stem Waiting on Her Bag',
      explanation: isStressedOrSad
        ? 'Curate 5 acoustic, ambient tracks and send them with a voice note telling her to close her eyes for five minutes.'
        : 'Slip a single fresh flower stem into her bag or car seat with a sticky note: "Because you are you."',
      cost: budget === 'free' ? '₹0' : 'Under ₹200'
    },
    vibeSummary: `Soft, intentional love crafted to make ${name} feel completely cherished today.`
  });
});

// "Tell me about them. I'll find something." - Free-form AI Concierge
app.post('/api/ai/concierge', async (req, res) => {
  const { query, recipientName, person } = req.body;
  const personMode = person === 'HIM' ? 'HIM' : person === 'US' ? 'US' : 'HER';
  const name = recipientName ? recipientName.trim() : (personMode === 'HIM' ? 'him' : personMode === 'US' ? 'us' : 'her');
  const userQuery = (query || '').trim();

  if (!userQuery) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const personaInstruction = personMode === 'HIM'
    ? `The recipient is strictly HIM (a man/boyfriend/husband). Recommend things centered on his genuine interests (e.g. gaming, tech, EDC, coffee, fitness, sports, cars, comfort food, quiet decompression, or words of respect and belief). STRICTLY FORBIDDEN: Do NOT recommend flowers, perfumes, dresses, makeup, or feminine jewelry unless explicitly asked.`
    : personMode === 'US'
    ? `The experience is strictly for US (a couple/two people together). Recommend shared activities, two-player dates, cooking rituals, screen-free evenings, and relationship milestones.`
    : `The recipient is strictly HER (a woman/girlfriend/wife). Recommend things centered on delicate comforts, flowers, books, warm tea, self-care, or gentle romantic gestures.`;

  const promptText = `You are the thoughtful relationship curator for "Little Things", dedicated to gestures for "${name}" in ${personMode} mode.
${personaInstruction}

The user typed this free-form request:
"${userQuery}"

Provide 3 specific, deeply thoughtful, and realistic options tailored precisely to what they typed and the ${personMode} recipient.
If budget constraints or situations are mentioned (e.g. ₹700, long distance, tired), respect them strictly.
Avoid generic AI clichés. Focus on sensory details, heartfelt micro-actions, and sincere connection.

Respond STRICTLY in JSON format matching this schema:
{
  "summary": "A gentle, sensitive one-sentence affirmation of their intention for ${name}",
  "recommendations": [
    {
      "idea": "Poetic, catchy name of the gesture",
      "estimatedCost": "Estimated realistic cost (e.g. ₹350 or ₹0)",
      "effort": "Easy | Thoughtful | Creative",
      "whyItSuitsHer": "1-2 sentences explaining why this specifically fits what the user described and touches their heart",
      "howToDoIt": "2-3 clear, practical sentences explaining step-by-step how to do it"
    }
  ],
  "bonusMessage": {
    "text": "A natural, sweet text message they can send right now",
    "tip": "When or how to send it"
  }
}`;

  try {
    const rawText = await callGeminiResilient(
      promptText,
      `You are an empathetic curator of thoughtful moments, everyday gestures, and sincere relationship care.`
    );
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini concierge error:', err);
  }

  // Person-aware graceful fallback
  const qLower = userQuery.toLowerCase();
  
  if (personMode === 'HIM') {
    return res.json({
      summary: `Quiet, grounded gestures tailored to what ${name} will genuinely appreciate today.`,
      recommendations: [
        {
          idea: `The Unprompted Fuel Run & Zero-Pressure Space`,
          estimatedCost: 'Under ₹300',
          effort: 'Easy',
          whyItSuitsHer: `Gives him his favorite drink or snack while honoring his need to decompress without having to talk right away.`,
          howToDoIt: `Grab his favorite iced espresso, soda, or savoury snack. Drop it by his desk or couch, tap his shoulder, and let him enjoy his hobby or game undisturbed for a bit.`
        },
        {
          idea: `The "I Notice How Hard You Try" Voice Note`,
          estimatedCost: '₹0',
          effort: 'Thoughtful',
          whyItSuitsHer: `Men rarely hear genuine acknowledgment of their quiet effort, discipline, and loyalty.`,
          howToDoIt: `Send him a brief 20-second audio note pointing out a specific quality you admire about how he handled something recently.`
        },
        {
          idea: `The Sunday Morning Playlist & Fresh Coffee Routine`,
          estimatedCost: '₹150',
          effort: 'Easy',
          whyItSuitsHer: `Starts his morning without rush, giving him an unhurried pocket of peace.`,
          howToDoIt: `Brew a fresh cup of roast coffee, hand it to him warm, and put on an instrumental lo-fi or acoustic soundtrack.`
        }
      ],
      bonusMessage: {
        text: `Just wanted to tell you I'm really proud of how hard you work and the way you handle things. You're my favorite teammate.`,
        tip: 'Send this in the middle of his workday or while he is driving.'
      }
    });
  }

  if (personMode === 'US') {
    return res.json({
      summary: `A shared ritual designed to help the two of you reconnect without digital distractions.`,
      recommendations: [
        {
          idea: `The Two-Player Living Room Tasting Flight`,
          estimatedCost: '₹350',
          effort: 'Easy',
          whyItSuitsHer: `Turns an ordinary dinner into a playful mini-challenge where you vote on your favorite snacks or teas together.`,
          howToDoIt: `Pick up 3 different artisanal chocolates or teas. Cut them into portions and blind-taste test each one together on the rug.`
        },
        {
          idea: `The 30-Minute Screen-Free Sunset Walk`,
          estimatedCost: '₹0',
          effort: 'Easy',
          whyItSuitsHer: `Leaving phones behind invites natural, meandering conversations that don't happen across a screen.`,
          howToDoIt: `Leave your phones on the dresser. Take a loop around the neighborhood just as the light softens, holding hands without an agenda.`
        },
        {
          idea: `The "Our Year In Polaroids" Mini Album Night`,
          estimatedCost: '₹250',
          effort: 'Creative',
          whyItSuitsHer: `Reliving funny candid memories cements your shared story and makes you appreciate how far you've traveled together.`,
          howToDoIt: `Print 10 candid phone photos from the past six months and tape them into a plain notebook with funny one-sentence captions.`
        }
      ],
      bonusMessage: {
        text: `Let's make tonight just about us. No phones, no deadlines—just some good food and catching up properly.`,
        tip: 'Send this in the afternoon to set up a sweet evening.'
      }
    });
  }

  // HER mode fallback
  const isBookAndFlower = qLower.includes('book') || qLower.includes('flower');
  const isDistanceOrCannotMeet = qLower.includes("can't meet") || qLower.includes('cannot meet') || qLower.includes('distance') || qLower.includes('far') || qLower.includes('away');

  if (isBookAndFlower) {
    return res.json({
      summary: `A literary and botanical afternoon crafted to match ${name}'s daydreaming world.`,
      recommendations: [
        {
          idea: 'The Pressed Daisy Classic & Handwritten Inscription',
          estimatedCost: '₹350–₹500',
          effort: 'Thoughtful',
          whyItSuitsHer: `Combines her love for books with a botanical keepsake she'll touch every time she pauses reading.`,
          howToDoIt: 'Pick up a paperback edition of a classic novella or poetry collection. Press a fresh chamomile daisy flat, slip it into page 24, and write a one-line inscription on the inside cover.'
        },
        {
          idea: 'Single Stem Ceramic Bud Vase & Bookshop Coffee Run',
          estimatedCost: '₹450–₹700',
          effort: 'Easy',
          whyItSuitsHer: 'Gives her a peaceful hour to browse quiet aisles with a delicate fresh stem by her reading chair.',
          howToDoIt: 'Buy a single blush pink tulip or sunflower and a tiny bud vase. Place it on her reading desk alongside a cold brew or matcha latte.'
        },
        {
          idea: 'The "Read Me To Sleep" Bookmark & Quiet Note',
          estimatedCost: '₹150',
          effort: 'Creative',
          whyItSuitsHer: 'Connects your words directly to her quiet nighttime reading routine without exceeding your budget.',
          howToDoIt: 'Make a handmade cardstock bookmark. Write a favorite line about her and tuck it into the book she is currently reading.'
        }
      ],
      bonusMessage: {
        text: `Found something today that made me think of your quiet smile and how much I love the way your mind works. Can't wait to give it to you.`,
        tip: 'Send this while she is reading or taking an afternoon tea break.'
      }
    });
  }

  if (isDistanceOrCannotMeet) {
    return res.json({
      summary: `Distance is just geography; these micro-gestures wrap ${name} in comfort from wherever you are.`,
      recommendations: [
        {
          idea: 'The Surprise Doorstep Comfort Delivery at 4:00 PM',
          estimatedCost: '₹200–₹350',
          effort: 'Easy',
          whyItSuitsHer: 'A warm treat or drink arriving when afternoon fatigue hits makes her feel cared for without any effort on her part.',
          howToDoIt: 'Order her favorite pastry, dessert, or comforting drink to her location via food delivery. Set delivery instruction to "Hand to recipient with a smile" and text her: "Look outside in 5 mins."'
        },
        {
          idea: 'The "Press Play When You Miss Me" 6-Song Voice Mixtape',
          estimatedCost: '₹0',
          effort: 'Creative',
          whyItSuitsHer: 'Hearing your calm voice and familiar acoustic tracks gives her a soothing presence right through her headphones.',
          howToDoIt: 'Record a 60-second voice note telling her one memory that made you smile today. Follow it with a link to 5 songs you picked just for her evening.'
        },
        {
          idea: 'Digital "Open When You Need A Smile" Capsule',
          estimatedCost: '₹0',
          effort: 'Thoughtful',
          whyItSuitsHer: 'Gives her an on-demand emotional sanctuary she can reopen whenever her energy dips.',
          howToDoIt: 'Use Little Things Open When creator. Write 3 short comforting notes with photos and send her the link to unlock right now.'
        }
      ],
      bonusMessage: {
        text: `I wish I was there to wrap you in the longest hug right now. Close your eyes for ten seconds—I'm holding your hand in spirit.`,
        tip: 'Send this when she mentions feeling exhausted.'
      }
    });
  }

  // General curated fallback
  return res.json({
    summary: `Thoughtful, quiet love tailored to make ${name} feel completely seen and adored.`,
    recommendations: [
      {
        idea: `The "Things I Notice About You" Secret Note`,
        estimatedCost: '₹0',
        effort: 'Thoughtful',
        whyItSuitsHer: `Because she remembers the specific, tiny observations far longer than grand generic gestures.`,
        howToDoIt: 'Take a small piece of nice paper. Write 3 tiny things you noticed about her recently (her laugh, how she holds her tea, her patience). Leave it where she finds it naturally.'
      },
      {
        idea: 'The Spontaneous Single Flower & Sweet Treat',
        estimatedCost: 'Under ₹300',
        effort: 'Easy',
        whyItSuitsHer: 'Unplanned, low-pressure surprises on ordinary days carry ten times more emotional weight.',
        howToDoIt: 'Pick up one fresh daisy or pink tulip from a roadside stall. Pair with her favorite small treat and hand it to her with no explanation other than "Just because."'
      },
      {
        idea: 'The 15-Minute Unhurried Decompression Ritual',
        estimatedCost: '₹0',
        effort: 'Easy',
        whyItSuitsHer: 'Giving her your undivided attention without asking for anything in return helps her relax completely.',
        howToDoIt: 'Put away both of your phones. Brew her favorite hot tea, place a warm hand on her back, and let her vent or sit in silence for fifteen uninterrupted minutes.'
      }
    ],
    bonusMessage: {
      text: `Just wanted you to know you are my favorite person to talk to, to listen to, and to care for. You make my life feel so gentle.`,
      tip: 'Send this without waiting for a reason.'
    }
  });
});

// "Help Me Say It" - 3 styles: Simple & Natural, Thoughtful, A Little Deeper
app.post('/api/ai/help-say-it', async (req, res) => {
  const { whatToSay, intent, style, person, recipientName } = req.body;
  const personMode = person === 'HIM' ? 'HIM' : person === 'US' ? 'US' : 'HER';
  const name = recipientName ? recipientName.trim() : (personMode === 'HIM' ? 'him' : personMode === 'US' ? 'each other' : 'her');
  const userText = (whatToSay || intent || '').trim();

  const promptText = `You are a warm, eloquent wordsmith for the app "Little Things".
A user wants to express something meaningful to ${name} (${personMode} mode).
What they want to say / raw thought: "${userText}"
Intent: "${intent || 'Appreciation'}"
Desired tone: "${style || 'natural'}"

Provide 3 distinct, beautiful phrasings:
1. "simpleAndNatural": Casual, understated, zero-awkwardness, easy to text or say casually.
2. "thoughtful": Sincere, grounded, observant, shows genuine attention and warmth.
3. "aLittleDeeper": Emotionally intimate, moving, memorable, speaks straight to the heart without sounding overdramatic or fake.

Respond STRICTLY in JSON format:
{
  "simpleAndNatural": "...",
  "thoughtful": "...",
  "aLittleDeeper": "..."
}`;

  try {
    const rawText = await callGeminiResilient(promptText, 'Write authentic, natural human words. Avoid cliché movie scripts.');
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.simpleAndNatural && parsed.thoughtful && parsed.aLittleDeeper) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini help-say-it error:', err);
  }

  // Graceful fallback
  if (personMode === 'HIM') {
    return res.json({
      simpleAndNatural: `Hey, was just thinking about you. Really proud of how you handled things today.`,
      thoughtful: `I don't say it often enough, but I notice all the effort you put in. Having you in my corner means the world to me.`,
      aLittleDeeper: `Life can be noisy, but you are the steadiest part of my world. I believe in you even when you're doubting yourself.`
    });
  } else if (personMode === 'US') {
    return res.json({
      simpleAndNatural: `Hey, just wanted to say I love our team. Can't wait to hang out tonight.`,
      thoughtful: `Looking back at how far we've come, I'm so grateful for everything we've built together.`,
      aLittleDeeper: `You make ordinary days feel like a lifelong adventure. There's no one else I'd rather do this life with.`
    });
  } else {
    return res.json({
      simpleAndNatural: `Just thinking about you and your smile. Hope your day is being sweet to you.`,
      thoughtful: `I noticed how gently you handled everything today. You bring so much calm and beauty wherever you go.`,
      aLittleDeeper: `You are my safest place to land and my sweetest dream. Loving you is the easiest thing I will ever do.`
    });
  }
});

// Section 10: AI turns user's observation into natural appreciation for HIM
app.post('/api/ai/appreciate-him', async (req, res) => {
  const { observation, aspect, recipientName } = req.body;
  const name = recipientName ? recipientName.trim() : 'him';
  const obs = (observation || aspect || '').trim();

  const promptText = `A user noticed this about ${name} (a man/partner/husband):
Observation: "${obs}"
Category/Aspect: "${aspect || 'effort'}"

Men rarely hear specific, genuine appreciation for their quiet efforts, loyalty, humor, or ways of showing up.
Turn this observation into 3 ways to express it:
1. "spokenWords": 1-2 natural sentences they can say to him in person without making it awkward.
2. "textMessage": A short, authentic text message they can send him during the day.
3. "whyItTouchesHim": A 1-sentence insight into why this specific observation matters to a man.

Respond STRICTLY in JSON format:
{
  "spokenWords": "...",
  "textMessage": "...",
  "whyItTouchesHim": "..."
}`;

  try {
    const rawText = await callGeminiResilient(promptText, 'Write grounded, sincere appreciation for men. Avoid patronizing or over-poetic phrasing.');
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.spokenWords && parsed.textMessage) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini appreciate-him error:', err);
  }

  res.json({
    spokenWords: `Hey, I just wanted to tell you that I noticed ${obs || 'how hard you were trying today'}. You really did great.`,
    textMessage: `Just thinking about you. I really appreciate how you show up for us, even when you're tired. It doesn't go unnoticed. 🖤`,
    whyItTouchesHim: `Acknowledging his effort and competence reinforces that he is valued and respected for who he is.`
  });
});

// 2. Love Letter AI Generator
app.post('/api/ai/love-letter', async (req, res) => {
  const { recipientName, senderName, relationship, whatYouLove, favoriteMemory, message, tone, style } = req.body;

  const promptText = `Write an authentic, deeply moving personalized love letter.
Details:
- Recipient: ${recipientName || 'My Love'}
- From: ${senderName || 'Yours'}
- Relationship: ${relationship || 'partner'}
- What I love about them: ${whatYouLove || 'Your laughter, your calm kindness'}
- Favorite memory: ${favoriteMemory || 'The rainy day we stayed indoors talking'}
- Additional message to convey: ${message || 'I am so grateful for every day with you'}
- Tone: ${tone || 'romantic'} (Options: romantic, cute, emotional, funny, deep)
- Visual Style: ${style || 'handwritten'}

Format the output strictly as JSON with:
{
  "title": "A short poetic title for the letter",
  "content": "The full letter body, in beautifully paced paragraphs (around 200-300 words), avoiding cliché generic platitudes. Make it sound like a real human who knows them intimately.",
  "signature": "Affectionate closing line and signature",
  "reasonsToLove": ["Reason 1", "Reason 2", "Reason 3", "Reason 4", "Reason 5"]
}`;

  try {
    const rawText = await callGeminiResilient(
      promptText,
      'You write breathtaking, heartfelt letters. You never sound robotic or overly formal. Write with real emotional gravity, lyrical warmth, and specific sensory imagery.'
    );
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.content) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini love-letter processing error:', err);
  }

  // Graceful contextual fallback
  const rName = recipientName || 'My Love';
  const sName = senderName || 'Always Yours';

  res.json({
    title: `For ${rName}, With All My Heart`,
    content: `Dearest ${rName},\n\nSometimes in the rush of ordinary days, I forget to pause and tell you what your presence actually does to my world. You bring a lightness into the room just by walking through the door. I find myself smiling at the quietest moments—the way you laugh with your whole body, the way your voice sounds first thing in the morning, and the patience you show even when the day has been heavy.\n\nI was reminiscing about ${favoriteMemory || 'our quiet talks when time completely stopped'} and realized how lucky I am to share life with you. What I love most is ${whatYouLove || 'your gentle heart and the unmistakable warmth you give to everyone around you'}.\n\n${message || 'Thank you for being my favorite constant, my safest haven, and my sweetest adventure.'} I cherish every little thing about you.`,
    signature: `Always yours,\n${sName}`,
    reasonsToLove: [
      'The quiet reassurance in your smile',
      'How deeply you care for the people in your life',
      'The infectious way your laughter changes the room',
      'The comfort of simply sitting beside you in silence',
      'How you make ordinary moments feel like lifelong memories'
    ]
  });
});

// 3. Open When Letters AI Generator
app.post('/api/ai/open-when', async (req, res) => {
  const { recipientName, senderName, envelopeTypes } = req.body;

  const promptText = `Generate heartfelt letters for an "Open When" gift set.
Recipient: ${recipientName || 'My Love'}
Sender: ${senderName || 'Me'}
Envelopes requested: ${JSON.stringify(envelopeTypes || ['sad', 'miss_me', 'cant_sleep', 'need_smile'])}

Format strictly as JSON array:
[
  {
    "id": "envelope_id",
    "title": "Open When You...",
    "emoji": "emoji",
    "color": "#HEX",
    "letter": "Warm, comforting 100-150 word letter specifically comforting or celebrating them for this scenario.",
    "surpriseTip": "One sweet practical action they can do right now"
  }
]`;

  try {
    const rawText = await callGeminiResilient(promptText);
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ envelopes: parsed });
      }
    }
  } catch (err) {
    console.warn('Gemini open-when processing error:', err);
  }

  // Fallback defaults
  res.json({
    envelopes: [
      {
        id: 'sad',
        title: "Open When You're Sad",
        emoji: '🫂',
        color: '#E0F2FE',
        letter: `Take a slow, deep breath, ${recipientName || 'darling'}. You don't have to carry the entire world on your shoulders today. It is okay to be tired, it is okay to feel overwhelmed. Remember that bad days are just days; they don't define your strength or our story. I am right here with you, holding your hand in spirit. You are so fiercely loved.`,
        surpriseTip: 'Drink a full glass of warm water, wrap up in your softest blanket, and text me one word: "HUG".'
      },
      {
        id: 'miss-me',
        title: "Open When You Miss Me",
        emoji: '💌',
        color: '#FCE7F3',
        letter: `Look up at the sky wherever you are right now. We are beneath the very same clouds, breathing the same air. I am probably thinking of your laugh right at this exact second. Distance only proves that our connection doesn't rely on being in the same room. Close your eyes, count to three, and feel my arms around you. I will be with you soon.`,
        surpriseTip: 'Put on our favorite song right now and let the chorus remind you how much I adore you.'
      },
      {
        id: 'cant-sleep',
        title: "Open When You Can't Sleep",
        emoji: '🌙',
        color: '#EDE9FE',
        letter: `The night is quiet and the world can wait until tomorrow. Let your shoulders drop away from your ears. Unclench your jaw. Whatever thoughts are spinning through your mind, leave them on this page. You did enough today. Tomorrow will take care of itself. Think of a peaceful walk by the water, and drift off knowing someone loves you beyond words.`,
        surpriseTip: 'Turn your screen brightness to minimum, place a cool hand on your chest, and take four slow counts in, seven counts hold, eight counts out.'
      },
      {
        id: 'need-smile',
        title: "Open When You Need A Smile",
        emoji: '✨',
        color: '#FEF3C7',
        letter: `Emergency smile dispatch! Did you know that you have the most contagious, crinkly-eyed grin in the history of human expressions? Thinking of you trying to keep a straight face while something absurd happens always makes my entire week. Smile right now, just for me! There you go. The world just got 10x brighter.`,
        surpriseTip: 'Open your camera, smile your biggest goofy grin, and send me a selfie right now!'
      }
    ]
  });
});

// 4. Date Planner AI Generator
app.post('/api/ai/date-plan', async (req, res) => {
  const { recipientName, budget, location, indoorOutdoor, mood, relationship } = req.body;

  const promptText = `Plan an unforgettable date plan itinerary.
- For: ${recipientName || 'Partner'}
- Budget: ${budget || 'Under ₹1000'}
- Location / Setting: ${location || 'City / Cozy spots'}
- Environment: ${indoorOutdoor || 'both'}
- Mood: ${mood || 'romantic and relaxed'}
- Relationship: ${relationship || 'partner'}

Return strictly JSON:
{
  "title": "Creative Name for the Date",
  "budget": "${budget || '₹500'}",
  "mood": "${mood || 'Romantic'}",
  "slots": [
    {
      "time": "4:00 PM",
      "activity": "Activity Name",
      "location": "Suggested Spot",
      "description": "Engaging description of what to do together",
      "costEstimate": "₹...",
      "tip": "A romantic or thoughtful tip"
    }
  ],
  "specialNote": "A sweet concluding message for the date"
}`;

  try {
    const rawText = await callGeminiResilient(promptText);
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && Array.isArray(parsed.slots) && parsed.slots.length > 0) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('Gemini date plan processing error:', err);
  }

  // Fallback date plan
  const rName = recipientName || 'My Love';
  const targetBudget = budget || '₹500';

  res.json({
    title: `The Golden Sunset & Sweet Bites Evening with ${rName}`,
    budget: targetBudget,
    mood: mood || 'Romantic & Whimsical',
    slots: [
      {
        time: '4:30 PM',
        activity: 'Acoustic Scenic Stroll',
        location: 'Nearby peaceful garden or lake promenade',
        description: `Meet up with ${rName}, share a single earphone set playing mellow acoustic songs, and wander slowly with no destinations in mind.`,
        costEstimate: '₹0',
        tip: 'Hold hands inside a pocket if it is chilly.'
      },
      {
        time: '5:45 PM',
        activity: 'Golden Hour Street Snacks & Chai',
        location: 'Local favorite corner stall',
        description: 'Pick two warm snacks and steaming kullad chai. Sit on a bench and share bites.',
        costEstimate: targetBudget === '₹0' ? '₹0' : '₹150–₹200',
        tip: 'Guess which snack the other person would rank #1 before tasting.'
      },
      {
        time: '6:45 PM',
        activity: 'Sunset Note Exchange',
        location: 'Quiet viewpoint or terrace',
        description: `Hand ${rName} a folded note you prepared beforehand sharing one thing you admire about them.`,
        costEstimate: '₹0',
        tip: 'Read the notes in silence together as the sky turns purple and amber.'
      },
      {
        time: '7:45 PM',
        activity: 'Shared Sweet Treat & Slow Walk Back',
        location: 'Ice cream cart or pastry shop',
        description: 'Split a double-scoop cone or warm waffle while recounting your favorite moment of the evening.',
        costEstimate: targetBudget === '₹0' ? '₹0' : '₹100–₹150',
        tip: 'Take a silly, unposed photo of the two of you enjoying the dessert.'
      }
    ],
    specialNote: 'The secret to memorable dates isn\'t how much you spend, but how deeply you listen.'
  });
});

// 5. Smart Intent Understanding & Next Step
app.post('/api/ai/understand-intent', async (req, res) => {
  const { text, person, recipientName, memories } = req.body;
  const target = recipientName || (person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'us');

  const promptText = `Analyze what the user wants to do for ${target} in "Little Things ♡":
User feeling/input: "${text}"
Target person: ${person || 'HER'} (${target})
Memories context: ${JSON.stringify(memories || [])}

Little Things is an emotional discovery platform for small thoughtful actions, words, gifts, and memories.
Classify the user intent and provide an immediate thoughtful recommendation:
1. "intent": One of: "comfort_bad_day", "surprise", "missing_them", "make_smile", "shared_activity", "express_words", "find_gift", "uncertain"
2. "emotion": The emotional state (e.g., "gentle comfort", "playful romance", "nostalgic longing", "sweet appreciation")
3. "nextQuestion": Only if strictly necessary, 1 short, light question with 3 quick options. Otherwise null.
4. "onePerfectThing": {
     "title": "A specific, intimate gesture or small gift title",
     "description": "2-sentence vivid description of what to do or give",
     "whyItFits": "Why this specifically fits their situation without being generic",
     "howToMakePersonal": "A simple way to tailor it to their exact personality",
     "imageKey": "semantic key like 'candle', 'matcha', 'tulip', 'blanket', 'letter', 'coffee', 'gaming-controller', 'sunset_drive'"
   }

Return strictly JSON format:
{
  "intent": "...",
  "emotion": "...",
  "nextQuestion": null,
  "onePerfectThing": {
    "title": "...",
    "description": "...",
    "whyItFits": "...",
    "howToMakePersonal": "...",
    "imageKey": "..."
  }
}`;

  try {
    const rawText = await callGeminiResilient(promptText, 'You are a warm, thoughtful relationship curator. You recommend small, doable, deeply meaningful actions.');
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.onePerfectThing) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('understand-intent gemini error:', err);
  }

  // Graceful semantic fallbacks
  const inputLower = (text || '').toLowerCase();
  let defaultIntent = 'surprise';
  let defaultEmotion = 'gentle love';
  let title = `The "I'm Thinking of You" Delivery for ${target}`;
  let description = `Send or leave their favorite comfort treat with a two-line note: “Just a little reminder that you are my favorite person today.”`;
  let why = `Small spontaneous tokens cut through the noise of a busy day without demanding anything in return.`;
  let how = `Pick the exact beverage temperature or pastry they reach for on long afternoons.`;
  let imageKey = 'coffee';

  if (inputLower.includes('bad') || inputLower.includes('stress') || inputLower.includes('tired') || inputLower.includes('exhaust')) {
    defaultIntent = 'comfort_bad_day';
    defaultEmotion = 'gentle comfort';
    title = `The "Zero Decisions Required" Sanctuary`;
    description = `Take over dinner completely, draw the blinds, cue up their favorite comfort rewatch, and say: “You don’t have to solve anything tonight.”`;
    why = `When someone is overwhelmed, cognitive quiet is the deepest form of affection you can offer.`;
    how = `Have their softest socks or blanket waiting right by their favorite sitting spot.`;
    imageKey = 'blanket';
  } else if (inputLower.includes('miss') || inputLower.includes('far') || inputLower.includes('distance')) {
    defaultIntent = 'missing_them';
    defaultEmotion = 'tender longing';
    title = `The 30-Second Voice Memo at Golden Hour`;
    description = `Record a short voice note describing something beautiful you saw today and why it instantly made you think of them.`;
    why = `Hearing your natural tone of voice carries intimacy and emotional proximity across any physical distance.`;
    how = `Mention one hyper-specific thing you can't wait to do together next.`;
    imageKey = 'letter';
  } else if (inputLower.includes('gift') || inputLower.includes('buy')) {
    defaultIntent = 'find_gift';
    defaultEmotion = 'thoughtful curation';
    title = `A Single Everyday Item Upgraded to Keepsake`;
    description = `Gift something they touch every morning—like an artisan ceramic mug or scented desk candle—with a personal inscription.`;
    why = `Objects used daily create quiet, recurring anchor points to you throughout their day.`;
    how = `Choose an earth tone or scent they gravitate toward naturally.`;
    imageKey = 'mug';
  }

  res.json({
    intent: defaultIntent,
    emotion: defaultEmotion,
    nextQuestion: null,
    onePerfectThing: {
      title,
      description,
      whyItFits: why,
      howToMakePersonal: how,
      imageKey
    }
  });
});

// 6. Signature "Make It Yours" Endpoint
app.post('/api/ai/make-it-yours', async (req, res) => {
  const { itemTitle, originalText, person, recipientName, personalDetail, selectedTone, customOption } = req.body;
  const target = recipientName || (person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'them');

  const promptText = `Personalize this recommendation in Little Things ♡:
Original Idea: "${itemTitle} - ${originalText}"
Target Person: ${target} (${person || 'HER'})
Personal Detail/Memory provided by user: "${personalDetail || ''}"
Custom Option/Preference: "${customOption || ''}"
Tone: ${selectedTone || 'tender'} (tender / playful / deep / simple)

Guidelines:
- CRITICAL: Never invent false memories or facts. Use ONLY what the user provided.
- Adapt the original idea into a completely customized, executable gesture for ${target}.
- Keep it warm, elegant, and intimate. Avoid cliché marketing fluff.

Return strictly JSON:
{
  "personalizedText": "The fully personalized description and exact wording",
  "personalTouch": "A short summary of the specific touch that makes this uniquely theirs",
  "whyItFits": "Why this specific twist honors what the user shared"
}`;

  try {
    const rawText = await callGeminiResilient(promptText, 'You are a warm, thoughtful relationship advisor.');
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.personalizedText) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('make-it-yours gemini error:', err);
  }

  // Graceful local generation
  const detailSnippet = personalDetail ? `tailored around “${personalDetail}”` : `customized especially for ${target}`;
  const customSnippet = customOption ? ` in a ${customOption.toLowerCase()} setting` : '';
  const toneAdverb = selectedTone === 'playful' ? 'with a lighthearted tease' : selectedTone === 'deep' ? 'with deep, steady affection' : selectedTone === 'simple' ? 'in the simplest, purest way' : 'with gentle tenderness';

  res.json({
    personalizedText: `${originalText} Crafted ${detailSnippet}${customSnippet}, delivered ${toneAdverb}. Make this moment slow, sincere, and entirely yours.`,
    personalTouch: personalDetail ? `Honors the detail you shared: "${personalDetail}"` : `Directly tailored for ${target}`,
    whyItFits: `Grounds a sweet concept into a real-life habit that belongs solely to the two of you.`
  });
});

// 7. "One Perfect Thing" Curated Recommendation
app.post('/api/ai/one-perfect-thing', async (req, res) => {
  const { person, recipientName, situation, mood, budget, time, memories } = req.body;
  const target = recipientName || (person === 'HER' ? 'her' : person === 'HIM' ? 'him' : 'us');

  const promptText = `Select ONE PERFECT THING for ${target} (${person}):
Situation: ${situation || 'just because'}
Mood/Feeling: ${mood || 'comforting'}
Budget: ${budget || 'Under ₹500'}
Time Available: ${time || 'under an hour'}
Memories on file: ${JSON.stringify(memories || [])}

Pick 1 single high-impact, deeply personal idea rather than a list.
Return strictly JSON:
{
  "title": "Poetic, elegant title",
  "description": "Vivid 2-sentence description of the gesture or small gift",
  "whyItFits": "Concrete explanation of why this fits their current situation",
  "howToMakePersonal": "Simple prompt to tailor it to their quirks",
  "imageKey": "semantic image key like 'pink_tulip', 'candle', 'coffee', 'blanket', 'headphones', 'sunset_drive', 'pastry'",
  "budget": "Free / Under ₹300 / Under ₹500 / Under ₹1,000",
  "time": "10 mins / 30 mins / 2 hours"
}`;

  try {
    const rawText = await callGeminiResilient(promptText);
    if (rawText) {
      const parsed = cleanAndParseJSON(rawText);
      if (parsed && parsed.title) {
        return res.json(parsed);
      }
    }
  } catch (err) {
    console.warn('one-perfect-thing gemini error:', err);
  }

  // Fallbacks
  const fallbacks = person === 'HIM' ? [
    {
      title: `The Unannounced Hot Meal Pickup`,
      description: `Order his go-to comfort meal from his favorite local spot so it is hot, plated, and waiting the second he walks through the door.`,
      whyItFits: `Men carry quiet decision fatigue. Removing the need to figure out dinner provides immediate, visceral relief.`,
      howToMakePersonal: `Add his favorite cold carbonated drink or spicy side without asking.`,
      imageKey: 'comfort-burger',
      budget: 'Under ₹500',
      time: '20 mins'
    },
    {
      title: `The Clean Windshield & Fresh Cedar Scent`,
      description: `Step outside for 10 minutes to wipe his car windshield spotless and place a subtle woodsy diffuser in the cabin.`,
      whyItFits: `Every morning commute starts with physical clarity and a calm atmosphere.`,
      howToMakePersonal: `Leave a tiny post-it on the steering wheel: “Have the best day.”`,
      imageKey: 'car-drive',
      budget: 'Under ₹300',
      time: '10 mins'
    }
  ] : person === 'US' ? [
    {
      title: `The 2-Hour Airplane Mode Living Room Picnic`,
      description: `Both phones go into a drawer on airplane mode. Pillows on the rug, warm tea or wine, and quiet acoustic music in the background.`,
      whyItFits: `Undivided, unhurried presence is the rarest luxury a modern relationship can share.`,
      howToMakePersonal: `Play the very first album or playlist you listened to when you first started talking.`,
      imageKey: 'blanket',
      budget: 'Free',
      time: '2 hours'
    }
  ] : [
    {
      title: `A Single Stem Pink Tulip + Cold Brew Hand-Off`,
      description: `Pick up one fresh stem tied with simple twine alongside her favorite iced beverage, and leave it where she will see it first.`,
      whyItFits: `It carries zero high-stakes pressure, feels effortless, and delivers immediate visual and sensory delight.`,
      howToMakePersonal: `Write a 4-word note tucked under the cup: “Thinking of your smile.”`,
      imageKey: 'pink_tulip',
      budget: 'Under ₹300',
      time: '15 mins'
    },
    {
      title: `The Tucked Scented Note in Her Coat Pocket`,
      description: `Slip a handwritten note on textured paper into her handbag or coat pocket to be discovered hours later in the middle of a mundane day.`,
      whyItFits: `Unexpected discovery turns a private, ordinary moment into a reminder of being held and cherished.`,
      howToMakePersonal: `Mention one subtle thing she did recently that made your heart soften.`,
      imageKey: 'letter',
      budget: 'Free',
      time: '5 mins'
    }
  ];

  const randomPick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  res.json(randomPick);
});

// 8. Dual-Path Surprise Me Endpoint
app.post('/api/ai/surprise-me', async (req, res) => {
  const { mode, who, feeling, time, budget, aboutThem, situation } = req.body;
  const target = who || 'HER';

  if (mode === 'no_idea') {
    // Return: The Little One, The Thoughtful One, The Unexpected One
    const promptText = `Generate 3 distinct surprises for ${target}:
1. "The Little One" (Small, effortless, zero pressure, takes 5-15 mins)
2. "The Thoughtful One" (More personal, speaks to emotion or shared history)
3. "The Unexpected One" (Creative, something they wouldn't normally think of)

Context: ${aboutThem || 'Everyday life'}
Feeling: ${feeling || 'just because'}

Return strictly JSON format:
{
  "theLittleOne": {
    "title": "...",
    "description": "...",
    "whyItFits": "...",
    "howToMakePersonal": "...",
    "imageKey": "...",
    "time": "10 mins"
  },
  "theThoughtfulOne": {
    "title": "...",
    "description": "...",
    "whyItFits": "...",
    "howToMakePersonal": "...",
    "imageKey": "...",
    "time": "30 mins"
  },
  "theUnexpectedOne": {
    "title": "...",
    "description": "...",
    "whyItFits": "...",
    "howToMakePersonal": "...",
    "imageKey": "...",
    "time": "1 hour"
  }
}`;

    try {
      const rawText = await callGeminiResilient(promptText);
      if (rawText) {
        const parsed = cleanAndParseJSON(rawText);
        if (parsed && parsed.theLittleOne && parsed.theThoughtfulOne) {
          return res.json(parsed);
        }
      }
    } catch (err) {
      console.warn('surprise-me gemini error:', err);
    }

    return res.json({
      theLittleOne: {
        title: target === 'HIM' ? 'Fresh Brew & Pre-Warmed Mug' : target === 'US' ? 'Ten-Minute Porch Chai' : 'Single Pink Tulip + Afternoon Matcha',
        description: 'A tiny sensory gift that requires zero planning and brightens the immediate present.',
        whyItFits: 'Effortless and tender without putting any obligation on them.',
        howToMakePersonal: 'Make it exactly to their sweetness and temperature preference.',
        imageKey: target === 'HIM' ? 'espresso-coffee' : target === 'US' ? 'tea' : 'pink_tulip',
        time: '10 mins'
      },
      theThoughtfulOne: {
        title: target === 'HIM' ? 'The Unsolicited Accomplishment Text' : target === 'US' ? 'The Re-created First Drink' : 'The Scented Pocket Note',
        description: 'A gesture grounded in paying close attention to who they are.',
        whyItFits: 'Touches the heart by proving they are seen and remembered.',
        howToMakePersonal: 'Reference a private joke or a moment only the two of you know.',
        imageKey: target === 'HIM' ? 'appreciation-note' : target === 'US' ? 'polaroid' : 'letter',
        time: '20 mins'
      },
      theUnexpectedOne: {
        title: target === 'HIM' ? 'Late-Night Gas Station Snack Run' : target === 'US' ? 'Living Room Slow Dance' : 'Midday Stargazing in the Car',
        description: 'A playful departure from everyday domestic routine that feels adventurous.',
        whyItFits: 'Breaks predictable patterns with spontaneous, youthful delight.',
        howToMakePersonal: 'Queue up the exact track that always makes them look at you and smile.',
        imageKey: target === 'HIM' ? 'car-drive' : target === 'US' ? 'blanket' : 'sunset_drive',
        time: '45 mins'
      }
    });
  }

  // Mode: guided
  res.json({
    result: {
      title: `Tailored Gesture for ${target}`,
      description: `A thoughtfully timed gesture based on feeling ${feeling || 'loved'}, budgeted ${budget || 'thoughtfully'}.`,
      whyItFits: `Directly matches the time and mood you selected.`,
      howToMakePersonal: `Anchor it with a handwritten one-liner.`,
      imageKey: 'candle',
      time: time || '30 mins'
    }
  });
});

// ----------------------------------------------------------------------
// VITE MIDDLEWARE / PRODUCTION STATIC SERVING
// ----------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Little Things server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
