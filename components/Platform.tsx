import React from 'react';
import { motion } from 'framer-motion';

export const Platform: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6"
          >
            Core Infrastructure
          </motion.h4>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none"
          >
            The Zenith <br /> <span className="text-zinc-800">Architecture.</span>
          </motion.h1>

          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl">
            A distributed microservices environment powered by FastAPI, optimized for high-throughput data processing and real-time inference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="p-10 border border-zinc-900 bg-zinc-950">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">
              Backend Engine: FastAPI
            </h3>

            <pre className="font-mono text-[10px] text-zinc-500 mb-8 p-6 bg-black border border-zinc-900 overflow-x-auto rounded-md">
<code>
<span className="text-white">@app.post</span>("&#47;v1&#47;analyze&#47;predictive"){"\n"}
<span className="text-zinc-700">async def</span>{" "}
<span className="text-white">run_inference</span>(payload: DatasetPayload):{"\n"}
  engine = MLEngine(model="random_forest_v3"){"\n"}
  result = <span className="text-zinc-700">await</span> engine.compute(payload.data){"\n"}
  <span className="text-zinc-700">return</span>{" "}
  {"{ status: \"success\", prediction: result }"}
</code>
            </pre>

            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Asynchronous I/O handling ensures sub-100ms response times for complex analytical queries.
              Python-native typing ensures strict data validation.
            </p>
          </div>

          <div className="p-10 border border-zinc-900 bg-zinc-950">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">
              ML Pipeline: Scikit-Learn
            </h3>

            <div className="flex flex-col gap-6">
              {[
                { label: 'Data Imputation', v: 'Mean / Median Vectorization' },
                { label: 'Dimensionality', v: 'PCA Component Reduction' },
                { label: 'Gradient Boosting', v: 'XGBoost v2.1 Parallelized' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-end border-b border-zinc-900 pb-4"
                >
                  <span className="text-[10px] uppercase font-black text-zinc-600">
                    {item.label}
                  </span>
                  <span className="text-xs font-bold">{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-24 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              t: 'AUTO-SCALING',
              d: 'Horizontal scaling via Kubernetes pods based on CPU/RAM thresholds.'
            },
            {
              t: 'DATA PERSISTENCE',
              d: 'High-concurrency PostgreSQL cluster with automated WAL archiving.'
            },
            {
              t: 'SECURE ENDPOINTS',
              d: 'OAuth2 with password hashing and JWT bearer token validation.'
            }
          ].map((f, i) => (
            <div key={i} className="space-y-4">
              <div className="w-10 h-1 border-t-2 border-white" />
              <h4 className="text-xs font-black uppercase tracking-widest">
                {f.t}
              </h4>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
