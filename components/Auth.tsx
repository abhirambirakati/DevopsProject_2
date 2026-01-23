
import React, { useState } from 'react';
import { AuthView, User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'redirecting' | 'authenticating'>('idle');

  const handleOAuth = (provider: 'Google' | 'GitHub') => {
    setStatus('redirecting');
    // Simulate Backend OAuth Redirection
    setTimeout(() => {
      setStatus('authenticating');
      setTimeout(() => {
        onLogin({ 
          id: Math.random().toString(36).substr(2, 9), 
          name: `${provider} User`, 
          email: `${provider.toLowerCase()}@zenith.ai` 
        });
        setStatus('idle');
      }, 1500);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('authenticating');
    // Simulate Backend JWT issuance
    setTimeout(() => {
      onLogin({ id: '1', name: 'Analyst Jane', email });
      setStatus('idle');
    }, 1500);
  };

  if (status !== 'idle') {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-12 h-12 border-2 border-zinc-800 border-t-white animate-spin rounded-full" />
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-2">
            {status === 'redirecting' ? 'Redirecting to Provider...' : 'Validating JWT...'}
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono">SECURE AUTH CHANNEL v3.0</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">
          {view === 'login' ? 'Access Portal' : 'Engine Registration'}
        </h2>
        <p className="text-zinc-500 text-[11px] uppercase tracking-widest">
          {view === 'login' ? 'Enter credentials for terminal access.' : 'Provision a new analyst account.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-4 pt-6 text-white text-sm outline-none focus:border-white transition-colors peer font-light"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-zinc-500 text-[9px] uppercase font-black tracking-[0.2em] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[8px] peer-focus:text-white pointer-events-none">
            Network Identifier (Email)
          </label>
        </div>

        <div className="relative group">
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-4 pt-6 text-white text-sm outline-none focus:border-white transition-colors peer font-light"
            placeholder=" "
          />
          <label className="absolute left-4 top-4 text-zinc-500 text-[9px] uppercase font-black tracking-[0.2em] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[8px] peer-focus:text-white pointer-events-none">
            Security Phrase (Password)
          </label>
        </div>

        <button 
          className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-colors"
        >
          {view === 'login' ? 'Execute Login' : 'Register Analyst'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-widest">
          <span className="bg-zinc-900 px-4 text-zinc-600">Enterprise SSO</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleOAuth('Google')}
          className="flex items-center justify-center gap-3 py-4 border border-zinc-800 hover:bg-white hover:text-black transition-all group"
        >
          <svg className="w-4 h-4 group-hover:fill-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.06 4.48-1.24 1.24-3.1 2.58-6.58 2.58-5.3 0-9.6-4.3-9.6-9.6S6.38 2 11.68 2c3 0 5.2 1.2 6.84 2.72l2.3-2.3C18.52.4 15.54 0 11.68 0 5.2 0 0 5.2 0 11.68s5.2 11.68 11.68 11.68c3.5 0 6.14-1.16 8.2-3.3 2.14-2.14 2.82-5.14 2.82-7.5 0-.54-.04-1.06-.12-1.54h-10.1z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Google</span>
        </button>
        <button 
          onClick={() => handleOAuth('GitHub')}
          className="flex items-center justify-center gap-3 py-4 border border-zinc-800 hover:bg-white hover:text-black transition-all group"
        >
          <svg className="w-4 h-4 group-hover:fill-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">GitHub</span>
        </button>
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={() => setView(view === 'login' ? 'signup' : 'login')}
          className="text-[9px] uppercase font-black tracking-[0.3em] text-zinc-600 hover:text-white transition-colors"
        >
          {view === 'login' ? "Access Point: Denied? Request Credentials" : "Active Credentials? Access Portal"}
        </button>
      </div>
    </div>
  );
};
