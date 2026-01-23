
import React from 'react';
import { motion } from 'framer-motion';

export const Help: React.FC = () => {
  const faqs = [
    { q: "What data formats are supported?", a: "Currently, DataMind Engine supports CSV and XLSX files. We recommend UTF-8 encoding for CSVs to ensure special character compatibility." },
    { q: "How is my data secured?", a: "All processing happens in transient memory within secure Docker containers. Data is never stored permanently unless explicitly requested for team collaboration." },
    { q: "What is the Neural Star Schema?", a: "DataMind automatically maps your Fact tables (measures) to Dimension tables (context) to optimize query performance and visual interactivity through cognitive mapping." },
    { q: "Can I export trained models?", a: "Yes, once trained, models can be exported as serialized joblib objects or deployed as isolated micro-endpoints on our production infrastructure." }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Support & <span className="text-zinc-500">Docs</span></h1>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">Access the technical knowledge base or connect with our engineering team for specialized implementation support of the DataMind platform.</p>
        </motion.div>

        <div className="space-y-4 mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-zinc-500 border-b border-zinc-800 pb-4">Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <details key={i} className="group border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 p-6 transition-all">
              <summary className="list-none flex justify-between items-center cursor-pointer font-bold uppercase tracking-widest text-[11px] select-none">
                {f.q}
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="mt-6 text-zinc-500 font-light text-sm leading-relaxed border-t border-zinc-100 dark:border-zinc-900 pt-6">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-zinc-100 dark:border-zinc-900">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">Direct Support</h3>
            <p className="text-zinc-500 text-sm font-light mb-6">Need enterprise assistance? Our 24/7 technical desk is available for high-priority incidents.</p>
            <a href="mailto:support@datamind.ai" className="text-xs font-black uppercase tracking-widest underline underline-offset-8">support@datamind.ai</a>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">Global Offices</h3>
            <p className="text-zinc-500 text-sm font-light">San Francisco • London • Berlin • Singapore</p>
            <p className="text-zinc-500 text-sm font-light mt-2">120 Spear St, San Francisco, CA 94105</p>
          </div>
        </div>
      </div>
    </div>
  );
};