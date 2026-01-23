
import React, { useState, useEffect } from 'react';
import { DataPoint, DatasetMetadata } from '../../types';
import { motion } from 'framer-motion';

interface Stage2Props {
  rawData: DataPoint[];
  metadata: DatasetMetadata;
  onCleaned: (data: DataPoint[]) => void;
  onConfirm: () => void;
}

export const Stage2_Clean: React.FC<Stage2Props> = ({ rawData, metadata, onCleaned, onConfirm }) => {
  const [isCleaning, setIsCleaning] = useState(true);
  const [steps, setSteps] = useState<{ label: string; done: boolean; justification: string }[]>([
    { label: "Duplicate Removal", done: false, justification: "Identifying and pruning non-unique row hashes to prevent bias." },
    { label: "Null Imputation", done: false, justification: "Filling missing numerical values via Median strategy (Robust to outliers)." },
    { label: "Type Correction", done: false, justification: "Standardizing date formats and casting numeric strings to float/int." },
    { label: "Outlier Detection", done: false, justification: "Capping extremal values using 1.5x IQR method to stabilize variance." }
  ]);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSteps(prev => prev.map((s, idx) => idx === currentStep ? { ...s, done: true } : s));
        currentStep++;
      } else {
        setIsCleaning(false);
        onCleaned(rawData); // Mock cleaned data
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Stage 2: Preprocessing</h1>
        <p className="text-zinc-500 max-w-2xl font-light">The automated cleaning pipeline is refining your raw dataset. Each step follows industry standard data integrity protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Cleaning Pipeline Logs</h4>
          {steps.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: s.done ? 1 : 0.5, x: s.done ? 5 : 0 }}
              className={`p-6 border ${s.done ? 'border-zinc-700 bg-zinc-950' : 'border-zinc-900 bg-black'} transition-all`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${s.done ? 'bg-white border-white' : 'border-zinc-800'}`}>
                  {s.done && <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${s.done ? 'text-white' : 'text-zinc-700'}`}>{s.label}</span>
              </div>
              <p className="text-[10px] text-zinc-600 font-light leading-relaxed">{s.justification}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          <div className="p-8 border border-zinc-900 bg-zinc-950">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8">Metric Delta (Before vs After)</h4>
            <div className="space-y-8">
              {[
                { label: 'Quality Score', before: '68%', after: '99%' },
                { label: 'Variance Stability', before: 'Low', after: 'Normalized' },
                { label: 'Null Percentage', before: '5.2%', after: '0.0%' }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-end border-b border-zinc-900 pb-4">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">{m.label}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-zinc-600 line-through">{m.before}</span>
                    <span className="text-xl font-black text-white">{m.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button disabled={isCleaning} onClick={onConfirm} className="w-full px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-20">
              {isCleaning ? 'Engine Cleaning...' : 'Approve Cleaned Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
