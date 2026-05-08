"use client";

import { motion } from "framer-motion";

export default function AgencyAboutPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#1a1a1a] min-h-screen px-6 py-20 lg:px-24 font-zalando overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* ── HERO: THE AGENCY MISSION ── */}
      <section className="max-w-5xl mb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full border border-black/10 text-[10px] uppercase tracking-[0.3em] font-bold mb-8"
        >
          Established 2026
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-12"
        >
          We engineer <br />
          <span className="italic font-light text-black/30">unignorable</span> <br />
          market presence.
        </motion.h1>
        <p className="text-xl lg:text-3xl text-black/60 max-w-2xl leading-tight font-light">
          A full-service marketing collective designed to scale brands through data-driven infrastructure and radical creativity.
        </p>
      </section>

      {/* ── CURVY VISUAL BREAK: THE AGECNY CORE ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-40 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="h-[500px] bg-[#e9e4df] overflow-hidden"
          style={{ borderRadius: "100px 300px 100px 100px" }} // Curvy Agency Look
        >
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
            alt="Agency Office"
            className="w-full h-full object-cover grayscale brightness-110 contrast-125"
          />
        </motion.div>
        <div className="space-y-12 pl-0 lg:pl-12">
          <div>
            <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-black/20 mb-4">01 / Logic</h3>
            <p className="text-2xl font-semibold tracking-tight">Technical-first marketing. We don't just guess; we build the infrastructure to track every conversion.</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-black/20 mb-4">02 / Art</h3>
            <p className="text-2xl font-semibold tracking-tight">Bold, unrefined, and elegant visual identities that capture market share instantly.</p>
          </div>
        </div>
      </section>

      {/* ── THE "CURVY" PROCESS ── */}
      <section className="mb-40 bg-black text-white p-12 lg:p-24 rounded-[80px]">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-8">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter italic">How we scale.</h2>
          <p className="text-white/50 max-w-xs text-sm uppercase tracking-widest font-mono">Process_Framework_v2</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { step: "Audit", desc: "Diagnostic analysis of current brand infrastructure and market gaps." },
            { step: "Deploy", desc: "Rapid implementation of creative campaigns and high-performance UX." },
            { step: "Optimize", desc: "Real-time data loops to maximize ROI and scale reach." }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <span className="text-[120px] font-black text-white/5 absolute -top-24 -left-8 pointer-events-none group-hover:text-white/10 transition-colors">
                {i + 1}
              </span>
              <h4 className="text-2xl font-bold mb-4 relative z-10">{item.step}</h4>
              <p className="text-white/40 leading-relaxed font-light relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AGENCY LEADERSHIP (Soft Grid) ── */}
      <section className="mb-40">
        <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-black/20 mb-16 text-center">Collective Leadership</h2>
        <div className="flex flex-wrap justify-center gap-20">
          {[
            { name: "S. Namma", role: "Creative Director" },
            { name: "M. Russo", role: "Head of Strategy" },
            { name: "J. Chen", role: "Tech Lead" }
          ].map((person, i) => (
            <div key={i} className="text-center group">
              <div className="w-48 h-48 bg-[#e9e4df] rounded-full overflow-hidden mb-6 mx-auto transition-transform duration-500 group-hover:scale-105">
                 <div className="w-full h-full bg-black/5" /> {/* Placeholder for portraits */}
              </div>
              <p className="text-xl font-bold tracking-tighter">{person.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-black/30 font-medium">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="bg-white rounded-[100px] p-12 lg:p-32 text-center border border-black/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
        <p className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-8">Next Chapter</p>
        <h3 className="text-5xl lg:text-8xl font-black tracking-tighter mb-12">Let's build <br /> <span className="text-black/20 italic font-light">together.</span></h3>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-12 py-6 rounded-full text-xs uppercase tracking-[0.3em] font-bold"
        >
          Start a Project
        </motion.button>
      </footer>

    </main>
  );
}