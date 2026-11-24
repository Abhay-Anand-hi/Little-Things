import React, { useState } from 'react';
import { X, Heart, Sparkles, Lock, Mail, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || email.split('@')[0] || 'Friend';
    const userObj = { name: displayName, email: email || 'user@example.com' };
    localStorage.setItem('little_things_user', JSON.stringify(userObj));
    onSuccess(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-white rounded-[32px] border border-stone-100 shadow-2xl p-6 sm:p-8 text-stone-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              {isRegister ? 'Join Little Things' : 'Welcome Back'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-500 mb-5">
          Save your love letters, track milestone dates, and manage all your gifts in one place.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-rose-300 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-sm shadow-rose-200 transition-all mt-4 cursor-pointer"
          >
            {isRegister ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-stone-100 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
};
