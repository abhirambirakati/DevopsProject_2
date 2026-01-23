
import React from 'react';

interface Stage6Props {
  path: string;
  objectives: string[];
}

export const Stage6_Export: React.FC<Stage6Props> = ({ path, objectives }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <div className="w-24 h-24 border-2 border-white mx-auto flex items-center justify-center mb-12">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Analysis Complete</h1>
      <p className="text-zinc-500 text-lg font-light mb-16">The Zenith Engine has finalized its deep dive. Your results are ready for deployment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
        {[
          { label: 'Cleaned Dataset', type: 'CSV' },
          { label: `${path.toUpperCase()} Architectural Report`, type: 'PDF' },
          { label: 'Calculated Measures / ML Logs', type: 'JSON' },
          { label: 'Executive Presentation Deck', type: 'PPTX' }
        ].map((item, i) => (
          <div key={i} className="p-8 border border-zinc-900 bg-zinc-950 flex justify-between items-center group cursor-pointer hover:border-white transition-all">
            <div>
              <span className="block text-[10px] uppercase font-black text-zinc-600 mb-1 tracking-widest">Document Type: {item.type}</span>
              <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
            </div>
            <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-900 pt-16 space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Analytics Summary</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {objectives.map((o, i) => (
            <span key={i} className="px-4 py-1.5 border border-zinc-800 text-[9px] font-black uppercase tracking-widest text-zinc-500">{o}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
