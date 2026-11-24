import React, { useState, useEffect } from 'react';
import { SavedHerItem, UserCollection } from '../types';
import { 
  Bookmark, ArrowLeft, Trash2, Heart, Share2, Copy, Check, 
  FolderPlus, Tag, Plus, Edit2, Sparkles, MessageCircle, Calendar
} from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { usePresentationStyle } from '../context/PresentationStyleContext';
import { triggerHeartConfetti } from '../utils/confetti';

interface SavedItemsViewProps {
  savedItems: SavedHerItem[];
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onOpenFlowers: () => void;
  onNavigateToExplore?: () => void;
}

const DEFAULT_COLLECTIONS: UserCollection[] = [
  { id: 'col-bday', name: 'Birthday Ideas', emoji: '🎂', createdAt: new Date().toISOString() },
  { id: 'col-badday', name: 'When Having a Bad Day', emoji: '🧸', createdAt: new Date().toISOString() },
  { id: 'col-gifts', name: 'Gifts I Might Get', emoji: '🎁', createdAt: new Date().toISOString() },
  { id: 'col-tell', name: 'Things I Want to Tell Them', emoji: '💌', createdAt: new Date().toISOString() }
];

export const SavedItemsView: React.FC<SavedItemsViewProps> = ({
  savedItems,
  onRemoveItem,
  onBack,
  onOpenFlowers,
  onNavigateToExplore
}) => {
  const { person, recipientName } = useSession();
  const { formatDecorated } = usePresentationStyle();

  // Active filter tab: All, Gifts, Say, Ideas, Memories, Notes
  const [activeFilter, setActiveFilter] = useState<'all' | 'buy' | 'message' | 'idea' | 'flower' | 'memory' | 'note'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  
  // Custom collections
  const [collections, setCollections] = useState<UserCollection[]>(() => {
    const saved = localStorage.getItem('little_things_user_collections');
    return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS;
  });

  const [newColName, setNewColName] = useState('');
  const [newColEmoji, setNewColEmoji] = useState('🎀');
  const [showAddCollection, setShowAddCollection] = useState(false);

  // Notes & Details management
  const [itemNotes, setItemNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('little_things_item_notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Item Collection Assignments { itemId: [collectionId] }
  const [itemCollections, setItemCollections] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('little_things_item_collections');
    return saved ? JSON.parse(saved) : {};
  });

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Detail Modal
  const [detailItem, setDetailItem] = useState<SavedHerItem | null>(null);

  useEffect(() => {
    localStorage.setItem('little_things_user_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('little_things_item_notes', JSON.stringify(itemNotes));
  }, [itemNotes]);

  useEffect(() => {
    localStorage.setItem('little_things_item_collections', JSON.stringify(itemCollections));
  }, [itemCollections]);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const newCol: UserCollection = {
      id: 'col-' + Date.now(),
      name: newColName.trim(),
      emoji: newColEmoji,
      createdAt: new Date().toISOString()
    };
    setCollections(prev => [...prev, newCol]);
    setNewColName('');
    setShowAddCollection(false);
  };

  const handleSaveNote = (id: string) => {
    setItemNotes(prev => ({ ...prev, [id]: noteText }));
    setEditingNoteId(null);
    setNoteText('');
  };

  const toggleItemInCollection = (itemId: string, colId: string) => {
    setItemCollections(prev => {
      const current = prev[itemId] || [];
      const updated = current.includes(colId) ? current.filter(c => c !== colId) : [...current, colId];
      return { ...prev, [itemId]: updated };
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter items
  const filteredItems = savedItems.filter(item => {
    if (activeFilter !== 'all') {
      if (activeFilter === 'buy' && item.type !== 'buy') return false;
      if (activeFilter === 'message' && item.type !== 'message' && item.type !== 'compliment') return false;
      if (activeFilter === 'idea' && item.type !== 'surprise' && item.type !== 'idea') return false;
      if (activeFilter === 'flower' && item.type !== 'flower' && item.type !== 'bouquet') return false;
      if (activeFilter === 'memory' && item.type !== 'memory') return false;
      if (activeFilter === 'note' && !itemNotes[item.id]) return false;
    }

    if (selectedCollection !== 'all') {
      const assigned = itemCollections[item.id] || [];
      if (!assigned.includes(selectedCollection)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </button>

          <span className="text-xs text-stone-500 font-serif italic">
            {savedItems.length} keepsake{savedItems.length === 1 ? '' : 's'} recorded
          </span>
        </div>

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 border border-rose-200/80 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
            Your Little Things ♡
          </h1>
          <p className="mt-2 text-stone-600 font-serif italic text-sm sm:text-base">
            “All the little thoughts you've decided to keep.”
          </p>
        </div>

        {/* Custom Collections Shelf */}
        <div className="mb-6 p-4 rounded-3xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <FolderPlus className="w-3.5 h-3.5 text-rose-500" />
              <span>Collections</span>
            </span>
            <button
              onClick={() => setShowAddCollection(!showAddCollection)}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Collection</span>
            </button>
          </div>

          {/* New Collection Form */}
          {showAddCollection && (
            <form onSubmit={handleCreateCollection} className="mb-4 p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2">
              <input
                type="text"
                value={newColEmoji}
                onChange={(e) => setNewColEmoji(e.target.value)}
                className="w-10 text-center py-1.5 rounded-xl border border-stone-200 bg-white text-base"
                title="Emoji"
              />
              <input
                type="text"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="Collection name (e.g. Next Roadtrip, Cozy Nights...)"
                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-800"
                required
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
              >
                Create
              </button>
            </form>
          )}

          {/* Collection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCollection('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCollection === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Items ({savedItems.length})
            </button>
            {collections.map(col => {
              const count = savedItems.filter(i => (itemCollections[i.id] || []).includes(col.id)).length;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedCollection(col.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCollection === col.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span>{col.emoji}</span>
                  <span>{col.name}</span>
                  <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Tabs: All, Gifts, Say, Ideas, Flowers, Memories, Notes */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'all', label: 'All Saved' },
            { id: 'buy', label: '🎁 Gifts' },
            { id: 'message', label: '💌 Say' },
            { id: 'idea', label: '✨ Ideas' },
            { id: 'flower', label: '🌷 Flowers' },
            { id: 'memory', label: '📸 Memories' },
            { id: 'note', label: '📝 With Notes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {savedItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center max-w-md mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-2xl mb-4">
              ♡
            </div>
            <h3 className="font-serif text-2xl text-stone-800 font-normal">
              Your collection is still waiting
            </h3>
            <p className="text-xs text-stone-500 font-serif italic mt-2 leading-relaxed">
              Let’s find something that feels like them. Whenever you spot a gesture, gift, or passing whisper, save it here to build your private sanctuary.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenFlowers}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Explore flowers for her →
              </button>
              {onNavigateToExplore && (
                <button
                  onClick={onNavigateToExplore}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Browse Explore feed
                </button>
              )}
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-stone-400 font-serif italic text-sm">
            No saved items match this filter or collection.
          </div>
        ) : (
          /* Timeline / Journal Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const currentNote = itemNotes[item.id] || (item as any).personalNote || '';
              const assignedCols = itemCollections[item.id] || [];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image if available */}
                    {item.image && (
                      <div 
                        onClick={() => setDetailItem(item)}
                        className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-stone-100 cursor-pointer relative"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider">
                          {item.category || item.type}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-stone-400 font-serif italic">
                        {new Date(item.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setDetailItem(item)}
                      className="font-serif text-xl font-medium text-stone-900 hover:text-rose-600 cursor-pointer transition-colors"
                    >
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="mt-1 font-serif italic text-xs text-stone-500 leading-relaxed">
                        {item.subtitle}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    {/* Personal note / "Want to remember why?" */}
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      {editingNoteId === item.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Why did this remind you of them? (e.g. She said she loved this tea last Tuesday...)"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs text-stone-800 resize-none focus:outline-hidden focus:border-rose-400"
                            autoFocus
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="px-2.5 py-1 rounded-lg text-stone-500 text-[11px] hover:bg-stone-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(item.id)}
                              className="px-2.5 py-1 rounded-lg bg-stone-900 text-white text-[11px] font-medium"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : currentNote ? (
                        <div 
                          onClick={() => {
                            setEditingNoteId(item.id);
                            setNoteText(currentNote);
                          }}
                          className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 cursor-pointer group/note"
                        >
                          <div className="flex items-center justify-between text-[10px] text-amber-800 font-semibold mb-1">
                            <span>📝 My Note:</span>
                            <Edit2 className="w-3 h-3 opacity-0 group-hover/note:opacity-100 transition-opacity" />
                          </div>
                          <p className="font-serif italic text-xs text-stone-700 leading-relaxed">
                            “{currentNote}”
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingNoteId(item.id);
                            setNoteText('');
                          }}
                          className="text-[11px] text-stone-400 hover:text-stone-700 font-serif italic flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>+ Want to remember why? Add a little note →</span>
                        </button>
                      )}
                    </div>

                    {/* Assigned Collections Chips */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {assignedCols.map(colId => {
                        const col = collections.find(c => c.id === colId);
                        if (!col) return null;
                        return (
                          <span
                            key={colId}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px]"
                          >
                            <span>{col.emoji}</span>
                            <span>{col.name}</span>
                          </span>
                        );
                      })}
                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-1">
                      {/* Add to collection menu */}
                      <div className="relative group/menu">
                        <button
                          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                          title="Assign to collection"
                        >
                          <Tag className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-full left-0 mb-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 p-2 hidden group-hover/menu:block z-30">
                          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                            Add to collection:
                          </span>
                          {collections.map(c => {
                            const isAssigned = (itemCollections[item.id] || []).includes(c.id);
                            return (
                              <button
                                key={c.id}
                                onClick={() => toggleItemInCollection(item.id, c.id)}
                                className={`w-full text-left px-2 py-1 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  isAssigned ? 'bg-rose-50 text-rose-700' : 'hover:bg-stone-50 text-stone-700'
                                }`}
                              >
                                <span className="truncate">{c.emoji} {c.name}</span>
                                {isAssigned && <Check className="w-3 h-3 text-rose-600" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(`${item.title}\n${item.description}`, item.id)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                        title="Copy details"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from My Little Things"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Deep Inspection Modal */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <span className="text-xs uppercase font-semibold tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                {detailItem.type}
              </span>
              <button
                onClick={() => setDetailItem(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {detailItem.image && (
              <div className="w-full h-56 rounded-2xl overflow-hidden my-4 bg-stone-100">
                <img src={detailItem.image} alt={detailItem.title} className="w-full h-full object-cover" />
              </div>
            )}

            <h3 className="font-serif text-2xl font-normal text-stone-900 mt-2">
              {detailItem.title}
            </h3>

            {detailItem.subtitle && (
              <p className="font-serif italic text-stone-500 text-sm mt-1">
                {detailItem.subtitle}
              </p>
            )}

            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              {detailItem.description}
            </p>

            {itemNotes[detailItem.id] && (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 block mb-1">
                  Why you saved this:
                </span>
                <p className="font-serif italic text-xs text-stone-800">
                  “{itemNotes[detailItem.id]}”
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  handleCopy(`${detailItem.title}\n${detailItem.description}`, detailItem.id);
                  setDetailItem(null);
                }}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                Copy Text
              </button>
              <button
                onClick={() => setDetailItem(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
