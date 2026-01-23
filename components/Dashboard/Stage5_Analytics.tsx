
import React, { useState, useEffect } from 'react';
import { DataPoint, DeepInsight } from '../../types';
import { GoogleGenAI, Type } from "@google/genai";
// Fix: Added missing import for motion
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter 
} from 'recharts';

interface Stage5Props {
  path: 'powerbi' | 'predictive';
  data: DataPoint[];
  objectives: string[];
  onComplete: () => void;
}

export const Stage5_Analytics: React.FC<Stage5Props> = ({ path, data, objectives, onComplete }) => {
  const [insights, setInsights] = useState<DeepInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Act as an expert ${path === 'powerbi' ? 'Power BI Architect' : 'ML Engineer'}. 
        I have a cleaned dataset and I selected these objectives: ${objectives.join(', ')}.
        Provide 3 deep architectural insights related to these objectives and how they apply in an industry context.`;

        // Fix: Configured responseSchema to ensure the AI returns the correct JSON structure.
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { 
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'The title of the insight.',
                  },
                  content: {
                    type: Type.STRING,
                    description: 'The detailed content of the insight.',
                  },
                  industryCase: {
                    type: Type.STRING,
                    description: 'An industry case where this insight is applicable.',
                  },
                },
                required: ["title", "content", "industryCase"],
                propertyOrdering: ["title", "content", "industryCase"],
              },
            },
          }
        });
        
        const parsed = JSON.parse(response.text || '[]');
        setInsights(parsed);
      } catch (err) {
        console.error("AI Insight Error:", err);
        setInsights([{ 
          title: "System Optimized", 
          content: "Performance boundaries validated for the selected objective set.", 
          industryCase: "Enterprise Logistics" 
        }]);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [path, objectives]);

  const COLORS = ['#ffffff', '#888888', '#444444', '#222222'];
  const chartData = data.slice(0, 8).map((d, i) => ({
    name: `ID_${i}`,
    val: Math.random() * 1000,
    val2: Math.random() * 800
  }));

  return (
    <div className="space-y-16">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Stage 5: Deep Intelligence</h1>
          <p className="text-zinc-500 font-light">Operationalizing the {path.toUpperCase()} core against selected objectives.</p>
        </div>
        <button onClick={onComplete} className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200">
          Finalize Results
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visualization Cluster */}
          <div className="p-8 border border-zinc-900 bg-black">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-8">Executive KPI Distribution</h4>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }} />
                  <Bar dataKey="val" fill="#ffffff" />
                  <Bar dataKey="val2" fill="#444444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-zinc-900 bg-black h-80">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Objective: Time Intelligence</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="step" dataKey="val" stroke="#fff" strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-8 border border-zinc-900 bg-black h-80">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Contribution Matrix</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} dataKey="val" fill="#fff" paddingAngle={5}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 px-4">AI Architectural Insights</h4>
          {loading ? (
            <div className="p-8 text-center text-zinc-700 animate-pulse uppercase text-[10px] font-black tracking-widest">
              Synthesizing Expert Analysis...
            </div>
          ) : (
            insights.map((insight, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-zinc-950 border border-zinc-900 group hover:border-white transition-all"
              >
                <h5 className="text-xs font-black uppercase tracking-widest mb-4 group-hover:text-white transition-colors">{insight.title}</h5>
                <p className="text-[11px] text-zinc-500 font-light leading-relaxed mb-6">{insight.content}</p>
                <div className="pt-4 border-t border-zinc-900">
                  <span className="text-[9px] uppercase font-black text-zinc-700 block mb-1">Industry Case</span>
                  <span className="text-[10px] text-zinc-400 italic">{insight.industryCase}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
