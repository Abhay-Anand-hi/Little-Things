import React, { useState } from 'react';
import { Sparkles, X, Trash2, Edit3, Check, Plus, Heart, Shield, Settings } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { usePresentationStyle } from '../context/PresentationStyleContext';
import { PersonMode, PresentationStyle } from '../types';

interface MemorySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemorySettingsModal: React.FC<MemorySettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    person,
    setPerson,
    recipientName,
    setRecipientName,
    memories,
    addMemory,
    removeMemory,
    updateMemory
  } = useSession();

  const { style, setStyle } = usePresentationStyle();

  const [activeTab, setActiveTab] = useState<'memories' | 'style' | 'person'>('memories');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCat, setNewMemoryCat] = useState<'favorite' | 'wishlist' | 'detail' | 'dislike'>('favorite');

  if (!isOpen) return null;

  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      updateMemory(id, editText.trim());
    }
    setEditingId(null);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    addMemory({
      person,
      category: newMemoryCat,
      text: newMemoryText.trim()
    });
    setNewMemoryText('');
  };

  const filteredMemories = memories.filter(m => m.person === person);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium mb-1">
              <Settings className="w-3.5 h-3.5 text-stone-500" />
              <span>Preferences & Memory</span>
            </div>
            <h2 className="font-serif text-2xl text-stone-900 font-normal">
              Little Things Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-3 border-b border-stone-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab('memories')}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTab === 'memories'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ♡ Things Remembered ({filteredMemories.length})
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTab === 'style'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Text Style ({style === 'plain' ? '🤍 Plain' : style === 'emojis' ? '💌 Emojis' : '♡ Cute'})
          </button>
          <button
            onClick={() => setActiveTab('person')}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTab === 'person'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Who ({person})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          
          {/* TAB 1: MEMORIES */}
          {activeTab === 'memories' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Private & Explicit Memory:</strong> Little Things only retains details you choose to remember. This knowledge prioritizes gifts, ideas, and messages tailored for <strong>{recipientName} ({person})</strong>.
                </p>
              </div>

              {/* Add new memory */}
              <form onSubmit={handleAddMemory} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  + Add Something to Remember
                </label>
                <div className="flex gap-2">
                  <select
                    value={newMemoryCat}
                    onChange={(e) => setNewMemoryCat(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-700"
                  >
                    <option value="favorite">Favorite</option>
                    <option value="wishlist">Wishlist Item</option>
                    <option value="detail">Little Detail</option>
                    <option value="dislike">Dislike / Avoid</option>
                  </select>
                  <input
                    type="text"
                    value={newMemoryText}
                    onChange={(e) => setNewMemoryText(e.target.value)}
                    placeholder="e.g. Loves oat milk in iced lattes, allergic to lilies..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-rose-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
                  >
                    Remember
                  </button>
                </div>
              </form>

              {/* Memory list */}
              <div className="space-y-2">
                {filteredMemories.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 font-serif italic text-sm">
                    No memories saved for {recipientName} yet. Add a favorite beverage, flower, or habit above!
                  </div>
                ) : (
                  filteredMemories.map((mem) => (
                    <div
                      key={mem.id}
                      className="p-3.5 rounded-xl border border-stone-200/80 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      {editingId === mem.id ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg border border-stone-300 text-xs"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(mem.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-semibold uppercase tracking-wider mr-2">
                            {mem.category}
                          </span>
                          <span className="text-stone-800 leading-relaxed font-serif italic">
                            “{mem.text}”
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(mem.id, mem.text)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeMemory(mem.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                          title="Forget / Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TEXT PRESENTATION STYLE */}
          {activeTab === 'style' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Choose how Little Things phrases titles, messages, and suggestions for you. You can change this anytime.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: 'plain',
                    title: '🤍 Plain (Natural & Clean)',
                    desc: 'Clean, editorial, literary phrasing with zero artificial filler or emoji noise.',
                    preview: 'I love how your presence makes quiet rooms feel so warm.'
                  },
                  {
                    id: 'emojis',
                    title: '💌 With Emojis (Warm & Expressive)',
                    desc: 'Tasteful, hand-selected emojis embedded naturally where they add emotion.',
                    preview: 'I love how your presence makes quiet rooms feel so warm ☕✨'
                  },
                  {
                    id: 'cute',
                    title: '♡ Cute & Special (Delicate Symbols)',
                    desc: 'Aesthetic typographical accents like ♡, ⋆, ୨୧, 𓂃 for a romantic keepsake feel.',
                    preview: '♡ I love how your presence makes quiet rooms feel so warm ⋆'
                  }
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setStyle(s.id as PresentationStyle)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      style === s.id
                        ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{s.title}</span>
                      {style === s.id && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${style === s.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {s.desc}
                    </p>
                    <div className={`mt-3 p-2.5 rounded-xl font-serif italic text-xs ${style === s.id ? 'bg-white/10 text-stone-200' : 'bg-white border border-stone-200 text-stone-700'}`}>
                      “{s.preview}”
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WHO ARE YOU THINKING ABOUT */}
          {activeTab === 'person' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Who are you thinking about right now?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'HER', label: '🌷 HER', color: 'hover:border-rose-300' },
                    { id: 'HIM', label: '🖤 HIM', color: 'hover:border-stone-400' },
                    { id: 'US', label: '🤍 US', color: 'hover:border-amber-300' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPerson(p.id as PersonMode)}
                      className={`py-3 rounded-2xl font-serif text-sm border transition-all ${
                        person === p.id
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 bg-stone-50 text-stone-700 ' + p.color
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  What is their name or preferred title?
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={person === 'HER' ? 'Her (e.g. Maya, Ananya)' : person === 'HIM' ? 'Him (e.g. Rohan, Alex)' : 'Us'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
