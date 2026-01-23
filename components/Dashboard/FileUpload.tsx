
import React, { useState, useRef } from 'react';
import { DataPoint, DatasetMetadata } from '../../types';

interface FileUploadProps {
  onUpload: (data: DataPoint[], meta: DatasetMetadata) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      alert('Please upload a CSV or Excel file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Basic CSV parser simulation
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1, 101).filter(line => line.trim().length > 0).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, h, i) => {
          obj[h] = values[i]?.trim();
          return obj;
        }, {} as any);
      });

      const meta: DatasetMetadata = {
        fileName: file.name,
        rowCount: lines.length - 1,
        colCount: headers.length,
        missingValues: Math.floor(Math.random() * 20), // Mocked for demo
        duplicateRows: Math.floor(Math.random() * 5), // Mocked for demo
        // Fix: Added missing 'unique' property to match ColumnProfile interface
        columns: headers.map(h => ({ 
          name: h, 
          type: 'String', 
          missing: Math.floor(Math.random() * 3),
          unique: Math.floor(Math.random() * 100)
        }))
      };

      onUpload(rows, meta);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Ingest Dataset</h2>
        <p className="text-zinc-500 font-light">Bring your CSV or Excel files into the Zenith engine for deep analysis.</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed h-96 flex flex-col items-center justify-center cursor-pointer transition-all group
          ${isDragging ? 'border-white bg-zinc-900' : 'border-zinc-800 hover:border-zinc-500 hover:bg-zinc-950'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".csv,.xlsx" 
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        />
        
        <div className="w-16 h-16 border-2 border-zinc-800 flex items-center justify-center mb-6 group-hover:border-white transition-colors">
          <svg className="w-8 h-8 text-zinc-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-sm font-bold uppercase tracking-[0.3em] mb-2">Drop your file here</p>
        <p className="text-zinc-500 text-xs font-medium">CSV, XLSX supported (Max 50MB)</p>

        {isDragging && (
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none" />
        )}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-900 pt-12">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Sample Data</h4>
          <p className="text-zinc-600 text-sm font-light leading-relaxed">Ensure your data includes clear headers. Our engine supports complex numeric and categorical distributions.</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Security</h4>
          <p className="text-zinc-600 text-sm font-light leading-relaxed">All datasets are processed locally or in encrypted sandbox environments. We follow SOC2 compliance standards.</p>
        </div>
      </div>
    </div>
  );
};