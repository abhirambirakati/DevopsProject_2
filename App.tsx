
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Platform } from './components/Platform';
import { Solutions } from './components/Solutions';
import { Enterprise } from './components/Enterprise';
import { Help } from './components/Help';
import { Contact } from './components/Contact';
import { LoginView } from './components/Auth';
import { Navbar } from './components/Navbar';
import { User, AppPath } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentPath, setCurrentPath] = useState<AppPath>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash.replace('#', '') || 'home') as AppPath;
      setCurrentPath(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update HTML class for Tailwind dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    setShowAuth(false);
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    setUser(null);
    window.location.hash = 'home';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} selection:bg-zinc-500 selection:text-white relative`}>
      {/* Global Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <Navbar 
        user={user} 
        onLoginClick={() => setShowAuth(true)} 
        onLogout={handleLogout} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentPath === 'home' && (
            <LandingPage key="landing" onGetStarted={() => setShowAuth(true)} />
          )}
          {currentPath === 'platform' && (
            <Platform key="platform" />
          )}
          {currentPath === 'solutions' && (
            <Solutions key="solutions" />
          )}
          {currentPath === 'enterprise' && (
            <Enterprise key="enterprise" />
          )}
          {currentPath === 'help' && (
            <Help key="help" />
          )}
          {currentPath === 'contact' && (
            <Contact key="contact" />
          )}
          {currentPath === 'dashboard' && user && (
            <Dashboard key="dashboard" />
          )}
          {currentPath === 'dashboard' && !user && (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Unauthorized Access</h1>
              <p className="text-zinc-500 mb-8 max-w-sm">A secure session is required to access the DataMind Engine. Please authenticate to continue.</p>
              <button 
                onClick={() => setShowAuth(true)}
                className="px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black font-black uppercase tracking-widest hover:opacity-80 transition-all border border-transparent hover:border-zinc-500"
              >
                Return to Login
              </button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-950 border border-zinc-900 w-full max-w-md p-10 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowAuth(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <LoginView onLogin={handleLogin} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={`py-28 border-t transition-colors duration-700 ${theme === 'dark' ? 'border-zinc-900 bg-black' : 'border-zinc-200 bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-sm flex items-center justify-center text-black dark:text-white font-black`}>D</div>
              <span className="text-3xl font-black tracking-tighter">DATAMIND</span>
            </div>
            <p className="text-zinc-500 max-w-sm font-light leading-relaxed">
              Architecting the next generation of neural data intelligence. Empowering enterprises with automated preprocessing and predictive cognitive analytics since 2024.
            </p>
          </div>
          <div>
            <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Resources</h4>
            <div className="flex flex-col gap-6 text-zinc-500 text-sm font-light">
              <a href="#platform" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Platform Architecture</a>
              <a href="#solutions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Vertical Solutions</a>
              <a href="#enterprise" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Enterprise Security</a>
            </div>
          </div>
          <div>
            <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Support</h4>
            <div className="flex flex-col gap-6 text-zinc-500 text-sm font-light">
              <a href="#help" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</a>
              <a href="#contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terminal Support</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">System Status</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-28 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-700 uppercase font-black tracking-[0.3em]">
           <div className="flex gap-8">
             <span>v4.1.0-PRODUCTION</span>
             <span className="text-zinc-900">NODE: SF_01</span>
           </div>
           <span>© 2024 DATAMIND ANALYTICS CORP. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
