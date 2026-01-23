
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4">Get In <span className="text-zinc-500">Touch</span></h1>
          <p className="text-zinc-400 font-light text-lg">Send us a secure message regarding enterprise licensing, API access, or data privacy inquiries.</p>
        </motion.div>

        {sent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-20 border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 text-center"
          >
            <div className="w-16 h-16 border-2 border-zinc-500 mx-auto flex items-center justify-center text-3xl mb-8">✓</div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Transmission Successful</h2>
            <p className="text-zinc-500 font-light">Your inquiry has been queued for review by our relations team. Expected response: 24-48 hours.</p>
            <button onClick={() => setSent(false)} className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] underline underline-offset-8">Send another</button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                <input required type="text" className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Corporate Email</label>
                <input required type="email" className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Inquiry Type</label>
              <select className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light">
                <option>Enterprise Licensing</option>
                <option>API & Platform Access</option>
                <option>Strategic Partnership</option>
                <option>Technical Support</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Message Buffer</label>
              <textarea required rows={5} className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light resize-none"></textarea>
            </div>

            <button type="submit" className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.4em] hover:opacity-80 transition-all">
              Initialize Transmission
            </button>
          </form>
        )}

        <div className="mt-32 flex justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <span className="text-2xl font-black italic">LINKEDIN</span>
           <span className="text-2xl font-black italic">X / TWITTER</span>
           <span className="text-2xl font-black italic">GITHUB</span>
        </div>
      </div>
    </div>
  );
};
