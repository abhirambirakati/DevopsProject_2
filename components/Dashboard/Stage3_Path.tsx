
import React from 'react';
import { AnalyticsPath } from '../../types';

interface Stage3Props {
  onSelect: (path: AnalyticsPath) => void;
}

export const Stage3_Path: React.FC<Stage3Props> = ({ onSelect }) => {
  return (
    <div className="max-w-5xl mx-auto h-[60vh] flex flex-col justify-center">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Stage 3: Analytics Path</h1>
        <p className="text-zinc-500 text-lg font-light">Select your specialized operational module to proceed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <button 
          onClick={() => onSelect('powerbi')}
          className="group relative p-16 border border-zinc-800 bg-black text-left hover:border-white hover:bg-zinc-950 transition-all overflow-hidden"
        >
          <div className="relative z-10">
            <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all">📊</div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Power BI Analytics</h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">Focus on enterprise business intelligence, DAX measurements, and star-schema visual storytelling.</p>
            <div className="w-16 h-1 bg-white" />
          </div>
        </button>

        <button 
          onClick={() => onSelect('predictive')}
          className="group relative p-16 border border-zinc-800 bg-black text-left hover:border-white hover:bg-zinc-950 transition-all overflow-hidden"
        >
          <div className="relative z-10">
            <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all">🧠</div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Predictive Analytics</h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">Deploy advanced supervised and unsupervised machine learning models to forecast future trends.</p>
            <div className="w-16 h-1 bg-white" />
          </div>
        </button>
      </div>
    </div>
  );
};
