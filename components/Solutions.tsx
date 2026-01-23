
import React from 'react';
import { motion } from 'framer-motion';

export const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.h4 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6"
          >
            Vertical Expertise
          </motion.h4>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-10 leading-none"
          >
            Tailored <br /> <span className="text-zinc-800">Intelligence.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            {
              title: "Financial Core",
              desc: "Fraud detection, risk scoring, and real-time algorithmic trading analysis using deep neural networks.",
              icon: "◈"
            },
            {
              title: "Logistics Hub",
              desc: "Supply chain optimization and predictive maintenance for global fleet management.",
              icon: "⌬"
            },
            {
              title: "Health Systems",
              desc: "Patient outcome forecasting and genomic data processing with HIPAA-compliant encryption layers.",
              icon: "✙"
            }
          ].map((solution, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 border border-zinc-900 bg-zinc-950 hover:border-white transition-all group"
            >
              <div className="text-5xl mb-10 text-zinc-800 group-hover:text-white transition-colors">{solution.icon}</div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">{solution.title}</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">{solution.desc}</p>
              <div className="mt-10 pt-10 border-t border-zinc-900">
                <button className="text-[10px] font-black uppercase tracking-widest hover:underline">View Case Study</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
