
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout, theme, onToggleTheme }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black dark:bg-white rounded-sm" />
            <span className="text-xl font-black tracking-tighter text-black dark:text-white">DATAMIND</span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          <a href="#platform" className="hover:text-black dark:hover:text-white transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-black dark:hover:text-white transition-colors">Solutions</a>
          <a href="#enterprise" className="hover:text-black dark:hover:text-white transition-colors">Enterprise</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <a href="#dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">Dashboard</a>
              <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
              <button 
                onClick={onLogout}
                className="text-[10px] uppercase tracking-widest font-black text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-all"
            >
              Access Engine
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};