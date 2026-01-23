
import React from 'react';
import { DataPoint } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, DonutChart, PieChart, Pie, Cell } from 'recharts';

interface PowerBIAnalyticsProps {
  data: DataPoint[];
}

export const PowerBIAnalytics: React.FC<PowerBIAnalyticsProps> = ({ data }) => {
  // Derive some mock KPI data
  const headers = Object.keys(data[0] || {});
  const numericHeaders = headers.filter(h => !isNaN(Number(data[0][h])));
  const categoricalHeaders = headers.filter(h => isNaN(Number(data[0][h])));

  const chartData = data.slice(0, 10).map((d, i) => ({
    name: String(d[categoricalHeaders[0]] || `R${i}`),
    value: Number(d[numericHeaders[0]]) || Math.floor(Math.random() * 1000)
  }));

  const pieData = [
    { name: 'Segment A', value: 400 },
    { name: 'Segment B', value: 300 },
    { name: 'Segment C', value: 300 },
    { name: 'Segment D', value: 200 },
  ];

  const COLORS = ['#ffffff', '#888888', '#444444', '#222222'];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Business Intelligence</h2>
          <p className="text-zinc-500">Power BI Workflow Simulation: Extraction, Transformation, Loading.</p>
        </div>
        <button className="px-6 py-2 border border-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Export PDF Report
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$1.2M', delta: '+12.5%' },
          { label: 'Active Projects', value: '48', delta: '+3' },
          { label: 'Completion Rate', value: '94%', delta: '-2%' },
          { label: 'Engagement Score', value: '8.4', delta: '+0.4' }
        ].map((kpi, i) => (
          <div key={i} className="p-8 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all">
            <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-500 mb-4">{kpi.label}</span>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-black">{kpi.value}</span>
              <span className={`text-[10px] font-bold ${kpi.delta.startsWith('+') ? 'text-white' : 'text-zinc-600'}`}>
                {kpi.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-8 border border-zinc-900 bg-black">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">Performance Distribution</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#ffffff" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-8 border border-zinc-900 bg-black">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">Market Segmentation</h4>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DAX / Logic Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-zinc-950 border border-zinc-900">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 underline decoration-zinc-800 underline-offset-8">DAX Engine Simulation</h4>
          <pre className="text-[11px] text-zinc-500 font-mono leading-relaxed overflow-x-auto">
{`Total Sales = 
  SUMX(
    FILTER(
      'SalesData',
      'SalesData'[Region] = "Global"
    ),
    'SalesData'[UnitPrice] * 'SalesData'[Quantity]
  )`}
          </pre>
          <div className="mt-6 pt-6 border-t border-zinc-900">
            <p className="text-xs text-zinc-600 italic">Calculation performed using internal Zenith Measure engine.</p>
          </div>
        </div>

        <div className="p-8 bg-zinc-950 border border-zinc-900">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 underline decoration-zinc-800 underline-offset-8">Data Modeling: Star Schema</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 border border-white text-[10px] font-bold">FACT_TRANSACTIONS</div>
              <div className="h-[1px] flex-1 bg-zinc-800" />
              <div className="px-3 py-1.5 border border-zinc-700 text-[10px] text-zinc-500">DIM_DATE</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 border border-white text-[10px] font-bold invisible">FACT_TRANSACTIONS</div>
              <div className="h-[1px] flex-1 bg-zinc-800" />
              <div className="px-3 py-1.5 border border-zinc-700 text-[10px] text-zinc-500">DIM_PRODUCT</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 border border-white text-[10px] font-bold invisible">FACT_TRANSACTIONS</div>
              <div className="h-[1px] flex-1 bg-zinc-800" />
              <div className="px-3 py-1.5 border border-zinc-700 text-[10px] text-zinc-500">DIM_GEOGRAPHY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
