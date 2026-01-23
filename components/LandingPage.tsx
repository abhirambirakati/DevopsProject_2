
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse avoidance
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.3)';
        context.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
};

// Fix: Made children optional to resolve JSX property missing error on line 289, 292, 295
const DataScanner = ({ children, title }: { children?: React.ReactNode, title: string }) => {
  return (
    <motion.div 
      whileHover="hover"
      initial="initial"
      className="relative group p-12 bg-black/40 backdrop-blur-sm border border-zinc-900 hover:border-white transition-all overflow-hidden flex flex-col h-full"
    >
      {/* Scanning Line Effect */}
      <motion.div 
        variants={{
          initial: { top: '-10%', opacity: 0 },
          hover: { top: '110%', opacity: [0, 1, 1, 0] }
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent z-20 pointer-events-none"
      />

      <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-10 group-hover:border-white transition-colors relative">
        <div className="w-2 h-2 bg-white" />
        {/* Decorative corners */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-white transition-colors" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-white transition-colors" />
      </div>

      <h3 className="text-2xl font-black mb-6 tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">
        {title}
      </h3>
      
      <div className="text-zinc-500 font-light leading-relaxed mb-12 flex-grow">
        {children}
      </div>

      <div className="pt-10 border-t border-zinc-900 flex justify-between items-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-zinc-300 transition-colors">
          Status: Operational
        </span>
        <motion.div 
          variants={{ hover: { scaleX: 1.5 } }}
          className="w-8 h-[1px] bg-zinc-700 origin-left"
        />
      </div>
    </motion.div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(15px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative bg-black selection:bg-white selection:text-black">
      <NeuralCanvas />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          style={{ opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="z-10 max-w-6xl w-full"
        >
          <motion.div variants={itemVariants} className="mb-10 inline-block">
            <div className="relative py-2 px-6">
               <div className="absolute inset-0 border border-zinc-800 skew-x-[-20deg]" />
               <span className="relative z-10 text-[10px] font-black tracking-[0.5em] uppercase text-zinc-400">
                Neural Analytics Engine v4.0
              </span>
            </div>
          </motion.div>
          
          <div className="relative mb-12">
            <motion.h1 
              variants={itemVariants}
              className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.75] text-mask select-none"
            >
              DATA <br /> MIND
            </motion.h1>
            {/* Ghost text for depth */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              className="absolute -top-4 -left-4 w-full h-full text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.75] text-white pointer-events-none italic"
            >
              DATA <br /> MIND
            </motion.div>
          </div>
          
          <motion.p 
            variants={itemVariants}
            className="text-zinc-400 text-lg md:text-2xl max-w-4xl mx-auto mb-16 font-light leading-relaxed px-4 border-l border-zinc-900 md:border-l-0"
          >
            The world is driven by signals. DataMind translates noise into strategic clarity.
            Experience the fusion of <span className="text-white">Neural Modeling</span> and <span className="text-white">Predictive Intelligence</span>.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={onGetStarted}
              className="group relative w-full sm:w-72 h-20 bg-white text-black font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-xs">Initialize Engine</span>
              <svg className="relative z-10 ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
            <button className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors flex items-center gap-4 group">
              <span className="w-10 h-[1px] bg-zinc-800 group-hover:w-16 transition-all group-hover:bg-white" />
              View Architecture
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Code Bits */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute right-10 top-1/4 font-mono text-[9px] text-zinc-500 text-left hidden lg:block leading-loose"
        >
          {`0x8842: MAPPING_SCHEMA\n0x2110: VECTOR_INIT\n0x00FF: NEURAL_CLEAN\n0xDC02: ANALYZE_TENSOR`}
        </motion.div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-48 px-6 border-y border-zinc-900 bg-black z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 mb-8 border-l-4 border-white pl-6">Deep Tooling</h4>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                The Anatomy of <br /> <span className="text-zinc-800">Intelligence.</span>
              </h2>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-lg italic">
                Our tools aren't just features. They are specialized neural nodes designed to dismantle complexity and rebuild it as structured insight.
              </p>
            </motion.div>
            
            <div className="lg:pt-24 flex gap-4">
               <div className="w-20 h-[1px] bg-zinc-800 mt-2" />
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">System Ready / 100% Core Load</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DataScanner title="Neural Cleaning">
              Our automated pipeline uses deep learning to identify and repair anomalies, outliers, and schema drifts in real-time. It's not just scrubbing; it's healing your data.
            </DataScanner>
            <DataScanner title="Star Modeling">
              Build complex dimensional schemas instantly. Interactive drag-and-drop relationships with SQL-optimized exports. Performance by design, not by accident.
            </DataScanner>
            <DataScanner title="Cognitive AI">
              Deploy neural networks trained on specific industry verticals—from fintech to bio-genomics—in seconds. Predictive power accessible to every analyst.
            </DataScanner>
          </div>
        </div>
      </section>

      {/* Advanced Visualization Preview */}
      <section className="py-48 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 order-2 lg:order-1 w-full aspect-square border border-zinc-900 bg-black relative flex items-center justify-center overflow-hidden group"
          >
            {/* Inner Rotating Visuals */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-4/5 h-4/5 border border-dashed border-zinc-800 rounded-full flex items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-2/3 h-2/3 border-2 border-zinc-900 rounded-full border-t-white flex items-center justify-center"
              />
            </motion.div>

            {/* Central "Eye" */}
            <div className="absolute w-12 h-12 bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div className="w-2 h-8 bg-black animate-pulse" />
            </div>

            {/* Data HUD markers */}
            <div className="absolute top-8 left-8 text-[8px] font-mono text-zinc-700">COORD: 40.7128° N, 74.0060° W</div>
            <div className="absolute bottom-8 right-8 text-[8px] font-mono text-zinc-700">LATENCY: 12ms / SIG_STR: 99%</div>
            
            <motion.div 
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-4 border border-zinc-800 pointer-events-none"
            />
          </motion.div>

          <div className="lg:w-1/2 order-1 lg:order-2 space-y-12">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Visual <br /> <span className="text-zinc-600">Spectroscopy.</span>
            </h2>
            <div className="space-y-12">
              {[
                { label: "Interactive Heatmaps", detail: "Density analysis for spatial distributions with sub-pixel precision." },
                { label: "Neural Flowcharts", detail: "Visualize model weights and decision tree paths in 3D-space." },
                { label: "Temporal Streaming", detail: "Live data pipelines processed and rendered with GPU acceleration." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 group cursor-default"
                >
                  <div className="shrink-0 w-10 h-10 border border-zinc-800 flex items-center justify-center text-[10px] font-black group-hover:bg-white group-hover:text-black transition-all">
                    0{i+1}
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-zinc-300 group-hover:text-white transition-colors">{item.label}</h5>
                    <p className="text-zinc-600 text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-56 px-6 text-center bg-white text-black relative overflow-hidden">
        {/* Animated Background Numbers */}
        <div className="absolute inset-0 font-mono text-[14vw] text-black/[0.03] flex items-center justify-center pointer-events-none select-none font-black">
          DATAMIND 4.0
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.8]">
            Master the <br /> Machine.
          </h2>
          <button 
            onClick={onGetStarted}
            className="group relative px-20 py-10 bg-black text-white font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95 text-lg"
          >
            <div className="absolute inset-0 bg-zinc-900 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Start Deployment</span>
          </button>
          
          <div className="mt-20 flex justify-center items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
            <span>SOC2 TYPE II</span>
            <div className="w-1.5 h-1.5 bg-zinc-300 rotate-45" />
            <span>ISO 27001</span>
            <div className="w-1.5 h-1.5 bg-zinc-300 rotate-45" />
            <span>GDPR READY</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
