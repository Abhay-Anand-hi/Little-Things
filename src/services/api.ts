import { Creation, AIDecideIdea, LoveLetterData, DatePlanData, OpenWhenEnvelope } from '../types';

const API_BASE = '/api';

export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchCreations(creatorId?: string): Promise<Creation[]> {
  try {
    const url = creatorId ? `${API_BASE}/creations?creatorId=${encodeURIComponent(creatorId)}` : `${API_BASE}/creations`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch creations');
    return await res.json();
  } catch (err) {
    console.warn('Network fetch creations failed, checking localStorage backup:', err);
    const local = localStorage.getItem('little_things_creations');
    return local ? JSON.parse(local) : [];
  }
}

export async function fetchCreationById(id: string): Promise<Creation | null> {
  try {
    const res = await fetch(`${API_BASE}/creations/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error fetching creation by ID:', err);
  }
  // Fallback to local storage
  const local = localStorage.getItem('little_things_creations');
  if (local) {
    const list: Creation[] = JSON.parse(local);
    const found = list.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

export async function saveCreation(creationData: {
  type: string;
  title: string;
  recipientName: string;
  creatorName: string;
  creatorId: string;
  data: any;
}): Promise<Creation> {
  try {
    const res = await fetch(`${API_BASE}/creations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creationData)
    });
    if (res.ok) {
      const created: Creation = await res.json();
      backupToLocal(created);
      return created;
    }
  } catch (err) {
    console.warn('Server save failed, using local offline persistence:', err);
  }

  // Local fallback
  const fallbackCreation: Creation = {
    id: 'local_' + Math.random().toString(36).substring(2, 8),
    type: creationData.type as any,
    title: creationData.title,
    recipientName: creationData.recipientName,
    creatorName: creationData.creatorName,
    creatorId: creationData.creatorId,
    createdAt: new Date().toISOString(),
    data: creationData.data,
    viewsCount: 1
  };
  backupToLocal(fallbackCreation);
  return fallbackCreation;
}

function backupToLocal(creation: Creation) {
  try {
    const existing = localStorage.getItem('little_things_creations');
    const list: Creation[] = existing ? JSON.parse(existing) : [];
    const index = list.findIndex(c => c.id === creation.id);
    if (index >= 0) {
      list[index] = creation;
    } else {
      list.unshift(creation);
    }
    localStorage.setItem('little_things_creations', JSON.stringify(list));
  } catch (e) {
    console.error('Local backup failed', e);
  }
}

export async function deleteCreation(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/creations/${id}`, { method: 'DELETE' });
    if (res.ok) {
      removeLocal(id);
      return true;
    }
  } catch (e) {
    console.warn('Delete server error', e);
  }
  removeLocal(id);
  return true;
}

function removeLocal(id: string) {
  try {
    const existing = localStorage.getItem('little_things_creations');
    if (existing) {
      const list: Creation[] = JSON.parse(existing);
      const filtered = list.filter(c => c.id !== id);
      localStorage.setItem('little_things_creations', JSON.stringify(filtered));
    }
  } catch (e) {
    console.error(e);
  }
}

export async function askGeminiDecide(params: {
  situation: string;
  relationship?: string;
  budget?: string;
  recipientName?: string;
}): Promise<AIDecideIdea[]> {
  try {
    const res = await fetch(`${API_BASE}/ai/decide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      const data = await res.json();
      return data.ideas || [];
    }
  } catch (err) {
    console.warn('Gemini decide request failed:', err);
  }
  return [];
}

export async function askGeminiLoveLetter(params: {
  recipientName: string;
  senderName: string;
  relationship?: string;
  whatYouLove?: string;
  favoriteMemory?: string;
  message?: string;
  tone?: string;
  style?: string;
}): Promise<Partial<LoveLetterData>> {
  try {
    const res = await fetch(`${API_BASE}/ai/love-letter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Gemini love letter request failed:', err);
  }
  return {
    content: `Dearest ${params.recipientName || 'Love'},\n\nEvery day with you is a gift I never take for granted. I love how your presence instantly turns a hectic day into calm tranquility. Thank you for your warmth, your gentleness, and for being the sweetest part of my life.`,
    signature: `With all my heart,\n${params.senderName || 'Me'}`
  };
}

export async function askGeminiOpenWhen(params: {
  recipientName: string;
  senderName: string;
  envelopeTypes: string[];
}): Promise<OpenWhenEnvelope[]> {
  try {
    const res = await fetch(`${API_BASE}/ai/open-when`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      const data = await res.json();
      return data.envelopes || [];
    }
  } catch (err) {
    console.warn('Gemini open when failed:', err);
  }
  return [];
}

export async function askGeminiDatePlan(params: {
  recipientName: string;
  budget?: string;
  location?: string;
  indoorOutdoor?: string;
  mood?: string;
  relationship?: string;
}): Promise<Partial<DatePlanData>> {
  try {
    const res = await fetch(`${API_BASE}/ai/date-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Gemini date plan failed:', err);
  }
  return {
    title: 'Cozy Sunset & Street Delights',
    slots: [
      { time: '4:30 PM', activity: 'Scenic Walk', description: 'Stroll hand-in-hand along the quietest tree-lined street.', costEstimate: '₹0' },
      { time: '5:30 PM', activity: 'Hot Chai & Treat', description: 'Stop at a cozy tea stall and share warm treats.', costEstimate: '₹150' },
      { time: '6:30 PM', activity: 'Exchange Handwritten Notes', description: 'Unfold secret sweet notes written for one another.', costEstimate: '₹0' }
    ]
  };
}
