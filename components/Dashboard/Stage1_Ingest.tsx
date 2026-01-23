
import React, { useRef, useState } from 'react';
import { DataPoint, DatasetMetadata } from '../../types';

interface Stage1Props {
  onUpload: (data: DataPoint[], meta: DatasetMetadata) => void;
  onConfirm: () => void;
  metadata: DatasetMetadata | null;
  data: DataPoint[] | null;
}

export const Stage1_Ingest: React.FC<Stage1Props> = ({ onUpload, onConfirm, metadata, data }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        alert("Empty or invalid dataset.");
        setIsProcessing(false);
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, h, i) => {
          obj[h] = values[i]?.trim();
          return obj;
        }, {} as any);
      });

      // Simulation of deep profiling
      const profile: DatasetMetadata = {
        fileName: file.name,
        rowCount: rows.length,
        colCount: headers.length,
        missingValues: Math.floor(Math.random() * rows.length * 0.05),
        duplicateRows: Math.floor(Math.random() * rows.length * 0.02),
        columns: headers.map(h => ({
          name: h,
          type: isNaN(Number(rows[0][h])) ? 'Categorical' : 'Numeric',
          missing: Math.floor(Math.random() * 5),
          unique: new Set(rows.map(r => r[h])).size
        }))
      };

      onUpload(rows, profile);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Stage 1: Dataset Ingestion</h1>
        <p className="text-zinc-500 max-w-2xl font-light">Initiate industry-grade data profiling. Our engine will map schema relationships and calculate initial distribution statistics.</p>
      </div>

      {!data ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-800 h-80 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-all group"
        >
          <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-zinc-800 border-t-white animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Profiling Engine Active...</span>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-white transition-all">
                <svg className="w-6 h-6 text-zinc-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em]">Drop Dataset (CSV / Excel)</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { l: 'Entities', v: metadata?.rowCount },
              { l: 'Dimensions', v: metadata?.colCount },
              { l: 'Null Vector', v: metadata?.missingValues },
              { l: 'Redundancy', v: metadata?.duplicateRows }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-zinc-950 border border-zinc-900">
                <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest block mb-2">{s.l}</span>
                <span className="text-3xl font-black">{s.v}</span>
              </div>
            ))}
          </div>

          <div className="border border-zinc-900 bg-black overflow-hidden">
            <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase tracking-widest">Profile: Schema Overview</h4>
              <span className="text-[10px] text-zinc-600 font-mono">{metadata?.fileName}</span>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-900">
                  <th className="p-4 uppercase font-bold tracking-widest">Column</th>
                  <th className="p-4 uppercase font-bold tracking-widest">Type</th>
                  <th className="p-4 uppercase font-bold tracking-widest">Distinct</th>
                  <th className="p-4 uppercase font-bold tracking-widest">Missing</th>
                </tr>
              </thead>
              <tbody>
                {metadata?.columns.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/20">
                    <td className="p-4 font-bold">{c.name}</td>
                    <td className="p-4 text-zinc-400">{c.type}</td>
                    <td className="p-4 font-mono">{c.unique}</td>
                    <td className="p-4 text-zinc-600">{c.missing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={() => onUpload([], null as any)} className="px-8 py-4 border border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:border-zinc-500">Reset</button>
            <button onClick={onConfirm} className="px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200">Confirm & Cleanse</button>
          </div>
        </div>
      )}
    </div>
  );
};
