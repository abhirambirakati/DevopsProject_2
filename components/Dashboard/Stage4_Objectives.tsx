
import React, { useState } from 'react';
import { AnalyticsPath } from '../../types';

interface Stage4Props {
  path: AnalyticsPath;
  onConfirm: (objectives: string[]) => void;
}

export const Stage4_Objectives: React.FC<Stage4Props> = ({ path, onConfirm }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const pbiObjectives = {
    "Data Preparation": ["Power Query transformations", "Data connectors", "Profiling & QA"],
    "Data Modeling": ["Fact & Dimension tables", "Star schema mapping", "Relationships"],
    "DAX Essentials": ["Calculated Measures", "CALCULATE & FILTER", "Time Intelligence"],
    "Visualization": ["KPI Dashboards", "Interactive Slicers", "Business Trend Charts"]
  };

  const mlObjectives = {
    "Supervised": ["Linear / Logistic Regression", "Decision Trees", "Random Forest"],
    "Classification": ["SVM", "Naive Bayes"],
    "Unsupervised": ["K-Means Clustering", "Market Basket Analysis"],
    "Advanced": ["PCA", "Neural Networks (MLP)"],
    "Evaluation": ["Confusion Matrix", "ROC-AUC Curve"]
  };

  const data = path === 'powerbi' ? pbiObjectives : mlObjectives;

  const toggle = (obj: string) => {
    setSelected(prev => prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 border-b border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Stage 4: Focus Selection</h1>
          <p className="text-zinc-500 font-light">Define the industry-relevant objectives for the final analysis engine.</p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] uppercase font-black text-zinc-600 mb-1 tracking-widest">Active Path</span>
          <span className="text-lg font-black uppercase tracking-tighter">{path === 'powerbi' ? 'Power BI' : 'Predictive'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {Object.entries(data).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 border-l-2 border-white pl-4">{category}</h3>
            <div className="grid grid-cols-1 gap-3">
              {items.map(item => (
                <div 
                  key={item}
                  onClick={() => toggle(item)}
                  className={`flex items-center gap-4 p-4 border cursor-pointer transition-all
                    ${selected.includes(item) ? 'bg-white border-white' : 'bg-transparent border-zinc-900 hover:border-zinc-700'}`}
                >
                  <div className={`w-4 h-4 border flex items-center justify-center
                    ${selected.includes(item) ? 'bg-black border-black text-white' : 'border-zinc-800'}`}>
                    {selected.includes(item) && '✓'}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${selected.includes(item) ? 'text-black' : 'text-zinc-400'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 border-t border-zinc-900 pt-12">
        <span className="text-zinc-600 text-[10px] font-mono mr-auto self-center uppercase">Selected: {selected.length} objectives</span>
        <button 
          disabled={selected.length === 0}
          onClick={() => onConfirm(selected)}
          className="px-16 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-20"
        >
          Initialize Final Analysis
        </button>
      </div>
    </div>
  );
};
