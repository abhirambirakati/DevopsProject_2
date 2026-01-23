
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DatasetMetadata, 
  AnalyticsPath, 
  DataPoint, 
  AppStage,
  PowerBIObjectives,
  MLObjectives
} from '../types';
import { Stage1_Ingest } from './Dashboard/Stage1_Ingest';
import { Stage2_Clean } from './Dashboard/Stage2_Clean';
import { Stage3_Path } from './Dashboard/Stage3_Path';
import { Stage4_Objectives } from './Dashboard/Stage4_Objectives';
import { Stage5_Analytics } from './Dashboard/Stage5_Analytics';
import { Stage6_Export } from './Dashboard/Stage6_Export';

export const Dashboard: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('ingest');
  const [rawDataset, setRawDataset] = useState<DataPoint[] | null>(null);
  const [metadata, setMetadata] = useState<DatasetMetadata | null>(null);
  const [cleanedDataset, setCleanedDataset] = useState<DataPoint[] | null>(null);
  const [selectedPath, setSelectedPath] = useState<AnalyticsPath>('none');
  const [pbiObjectives, setPbiObjectives] = useState<string[]>([]);
  const [mlObjectives, setMlObjectives] = useState<string[]>([]);

  const handleUpload = (data: DataPoint[], meta: DatasetMetadata) => {
    setRawDataset(data);
    setMetadata(meta);
  };

  const confirmIngest = () => setStage('cleaning');
  
  const handleCleaned = (data: DataPoint[]) => {
    setCleanedDataset(data);
  };

  const confirmCleaned = () => setStage('path_selection');

  const handlePathSelect = (path: AnalyticsPath) => {
    setSelectedPath(path);
    setStage('objective_selection');
  };

  const handleObjectivesSelect = (objs: string[]) => {
    if (selectedPath === 'powerbi') setPbiObjectives(objs);
    else setMlObjectives(objs);
    setStage('deep_analysis');
  };

  const reset = () => {
    setStage('ingest');
    setRawDataset(null);
    setMetadata(null);
    setCleanedDataset(null);
    setSelectedPath('none');
    setPbiObjectives([]);
    setMlObjectives([]);
  };

  const stagesList: { id: AppStage; label: string }[] = [
    { id: 'ingest', label: 'Ingest' },
    { id: 'cleaning', label: 'Clean' },
    { id: 'path_selection', label: 'Path' },
    { id: 'objective_selection', label: 'Focus' },
    { id: 'deep_analysis', label: 'Analyze' },
    { id: 'export', label: 'Result' }
  ];

  const currentStageIndex = stagesList.findIndex(s => s.id === stage);

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-black">
      <aside className="w-20 md:w-64 border-r border-zinc-900 flex flex-col items-center py-8 gap-10">
        <div className="flex flex-col gap-8">
          {stagesList.map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold border transition-all
                ${currentStageIndex === idx ? 'border-white bg-white text-black scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 
                  currentStageIndex > idx ? 'border-zinc-700 bg-zinc-900 text-zinc-500' : 'border-zinc-900 text-zinc-800'}`}>
                {idx + 1}
              </div>
              <span className={`hidden md:block text-[9px] font-black uppercase tracking-[0.2em]
                ${currentStageIndex === idx ? 'text-white' : 'text-zinc-700'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        
        {currentStageIndex > 0 && (
          <button 
            onClick={reset}
            className="mt-auto mb-8 px-4 py-2 border border-zinc-900 text-[9px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white hover:border-zinc-500 transition-all"
          >
            Terminal Reset
          </button>
        )}
      </aside>

      <div className="flex-1 p-6 md:p-16 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {stage === 'ingest' && (
            <motion.div key="ingest" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Stage1_Ingest onUpload={handleUpload} onConfirm={confirmIngest} metadata={metadata} data={rawDataset} />
            </motion.div>
          )}

          {stage === 'cleaning' && rawDataset && metadata && (
            <motion.div key="cleaning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Stage2_Clean rawData={rawDataset} metadata={metadata} onCleaned={handleCleaned} onConfirm={confirmCleaned} />
            </motion.div>
          )}

          {stage === 'path_selection' && (
            <motion.div key="path" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Stage3_Path onSelect={handlePathSelect} />
            </motion.div>
          )}

          {stage === 'objective_selection' && (
            <motion.div key="objectives" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Stage4_Objectives path={selectedPath} onConfirm={handleObjectivesSelect} />
            </motion.div>
          )}

          {stage === 'deep_analysis' && cleanedDataset && (
            <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Stage5_Analytics 
                path={selectedPath} 
                data={cleanedDataset} 
                objectives={selectedPath === 'powerbi' ? pbiObjectives : mlObjectives}
                onComplete={() => setStage('export')}
              />
            </motion.div>
          )}

          {stage === 'export' && cleanedDataset && (
            <motion.div key="export" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Stage6_Export path={selectedPath} objectives={selectedPath === 'powerbi' ? pbiObjectives : mlObjectives} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
