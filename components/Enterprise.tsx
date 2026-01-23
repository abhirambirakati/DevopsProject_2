
import React from 'react';
import { motion } from 'framer-motion';

export const Enterprise: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6">Military Grade Security</h4>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-10 leading-tight">
              Enterprise <br /> Resilience.
            </h1>
            <p className="text-zinc-400 text-lg font-light mb-12 max-w-lg">
              Zenith Enterprise provides a secure-by-default environment for mission-critical data operations. From SOC2 Type II compliance to air-gapped deployment options.
            </p>
            <div className="space-y-6">
              {[
                "SSO & SAML 2.0 Integration",
                "Advanced Audit Logging",
                "Role-Based Access Control (RBAC)",
                "Custom VPC Deployment"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 bg-white" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square border border-zinc-900 bg-zinc-950 p-12 overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_0.5px,transparent_0.5px)] [background-size:20px_20px]" />
             <div className="relative z-10 h-full border border-white p-8 flex flex-col justify-center text-center">
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-600 mb-4">Secure Sandbox</span>
                <div className="text-5xl font-black mb-6">DOCKER</div>
                <div className="w-full h-1 bg-white mb-6" />
                <p className="text-[10px] font-mono text-zinc-500 leading-loose">
                  FROM python:3.10-slim<br />
                  RUN apt-get update && install -y analytics-core<br />
                  ENTRYPOINT ["fastapi", "run", "main.py"]<br />
                  EXPOSE 8080
                </p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { t: "SOC2 COMPLIANT", d: "Rigorous security auditing for peace of mind." },
             { t: "99.99% UPTIME", d: "SLA-backed infrastructure reliability." },
             { t: "WHITE LABEL", d: "Full branding integration for enterprise partners." },
             { t: "GLOBAL REGIONS", d: "Deploy in US, EU, or APAC for data sovereignty." }
           ].map((stat, i) => (
             <div key={i} className="p-8 border border-zinc-900 bg-black">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-4">{stat.t}</h5>
                <p className="text-zinc-500 text-[11px] font-light">{stat.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
