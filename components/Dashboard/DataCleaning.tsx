
import React, { useState } from 'react';
import { DataPoint, DatasetMetadata } from '../../types';
import { motion } from 'framer-motion';

interface DataCleaningProps {
  data: DataPoint[];
  metadata: DatasetMetadata;
  onCleaned: (data: DataPoint[]) => void;
}

export const DataCleaning: React.FC<DataCleaningProps> = ({ data, metadata, onCleaned }) => {
  const [cleaning, setCleaning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startCleaning = () => {
    setCleaning(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        onCleaned(data); // Simulating cleaning by returning same data for demo
      }
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="flex-1">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Cleaning Pipeline</h2>
          <p className="text-zinc-500 mb-8 max-w-xl">The Zenith engine is running a diagnostic on <span className="text-white font-bold">{metadata.fileName}</span>. Review the metadata before finalizing the preprocessing stage.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Rows', value: metadata.rowCount },
              { label: 'Columns', value: metadata.colCount },
              { label: 'Missing', value: metadata.missingValues },
              { label: 'Duplicates', value: metadata.duplicateRows }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-zinc-950 border border-zinc-900">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">{stat.label}</span>
                <span className="text-2xl font-black">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Pre-processing Checklist</h4>
            <div className="space-y-2">
              {[
                "Deduplicating row records",
                "Imputing missing values via mean/median",
                "Normalization of numeric scales",
                "One-hot encoding categorical variables",
                "Outlier detection using IQR"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-zinc-500">
                  <div className="w-4 h-4 border border-zinc-800 flex items-center justify-center text-[8px] text-white">✓</div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {!cleaning ? (
            <button 
              onClick={startCleaning}
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Start Cleansing Engine
            </button>
          ) : (
            <div className="w-full max-w-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs uppercase font-bold tracking-widest">Processing</span>
                <span className="text-xs font-black">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-900">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-96">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Initial Data Preview</h4>
          <div className="border border-zinc-900 overflow-hidden">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-900">
                  {Object.keys(data[0] || {}).slice(0, 3).map((h, i) => (
                    <th key={i} className="p-3 uppercase font-bold tracking-widest text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, i) => (
                  <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/30">
                    {Object.values(row).slice(0, 3).map((val, j) => (
                      <td key={j} className="p-3 text-zinc-300 font-mono truncate max-w-[100px]">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
