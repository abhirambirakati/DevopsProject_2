
import React, { useState, useEffect } from 'react';
import { DataPoint } from '../../types';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

interface PredictiveAnalyticsProps {
  data: DataPoint[];
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ data }) => {
  const [training, setTraining] = useState(false);
  const [activeModel, setActiveModel] = useState('Random Forest');

  const models = [
    { name: 'Linear Regression', type: 'Supervised', use: 'Price Prediction' },
    { name: 'Logistic Regression', type: 'Supervised', use: 'Classification' },
    { name: 'Decision Trees', type: 'Supervised', use: 'Logic Mapping' },
    { name: 'Random Forest', type: 'Ensemble', use: 'Complex Predictions' },
    { name: 'K-Means Clustering', type: 'Unsupervised', use: 'Customer Segmentation' }
  ];

  const scatterData = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
  }));

  const startTraining = () => {
    setTraining(true);
    setTimeout(() => setTraining(false), 3000);
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Predictive Engine</h2>
          <p className="text-zinc-500">Advanced ML models for forecasting and pattern recognition.</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-black border border-zinc-800 text-xs font-bold uppercase tracking-widest px-4 py-2 outline-none focus:border-white transition-colors"
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
          >
            {models.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
          </select>
          <button 
            onClick={startTraining}
            disabled={training}
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            {training ? 'Training Model...' : 'Train Model'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Performance Metrics */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Model Evaluation</h4>
          {[
            { label: 'R-Squared', value: '0.92', desc: 'Predictive accuracy' },
            { label: 'RMSE', value: '1.42', desc: 'Average error magnitude' },
            { label: 'Precision', value: '88%', desc: 'False positive rate' },
            { label: 'F1 Score', value: '0.85', desc: 'Harmonic mean of metrics' }
          ].map((m, i) => (
            <div key={i} className="p-6 bg-zinc-950 border border-zinc-900">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{m.label}</span>
                <span className="text-xl font-black">{m.value}</span>
              </div>
              <p className="text-[10px] text-zinc-600 font-light">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Visualizations */}
        <div className="lg:col-span-3 space-y-8">
          <div className="p-8 border border-zinc-900 bg-black h-[400px]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">Loss / Epoch Convergence</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={Array.from({ length: 20 }).map((_, i) => ({ step: i, loss: Math.exp(-i / 5) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="step" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="loss" stroke="#fff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 border border-zinc-900 bg-black h-80">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Cluster Analysis</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="x" stroke="#555" fontSize={8} />
                      <YAxis type="number" dataKey="y" stroke="#555" fontSize={8} />
                      <ZAxis type="number" dataKey="z" range={[10, 100]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Clusters" data={scatterData} fill="#ffffff" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div className="p-8 border border-zinc-900 bg-black">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Feature Importance</h4>
                <div className="space-y-4">
                  {[
                    { f: 'User Tenure', v: 85 },
                    { f: 'Purchase Frequency', v: 72 },
                    { f: 'Avg Order Value', v: 45 },
                    { f: 'Geo Location', v: 22 }
                  ].map((feat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                        <span>{feat.f}</span>
                        <span>{feat.v}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900">
                        <div className="h-full bg-white" style={{ width: `${feat.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Model Insight Component using Gemini logic (Mocked for speed) */}
      <div className="mt-12 p-8 border border-zinc-800 bg-zinc-950 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 border-2 border-white flex items-center justify-center text-3xl shrink-0">AI</div>
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Architectural Insight</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl font-light">
              The {activeModel} model was selected for its high interpretability and robustness against high-dimensional data noise. By utilizing Gini impurity as a splitting criterion, we've optimized the decision boundaries for the target variable distribution observed in the initial ingestion phase.
            </p>
          </div>
          <button className="md:ml-auto px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200">
            Generate Report
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-all" />
      </div>
    </div>
  );
};
