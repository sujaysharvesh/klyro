"use client";

import { motion } from "framer-motion";

const SHOWCASE_ITEMS = [
  {
    id: "01",
    title: "Aura Sculpture",
    category: "3D Art Direction",
    description: "A digital exploration of light and form in virtual spaces.",
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1200&q=80",
    size: "large", // Determines grid span
  },
  {
    id: "02",
    title: "Monolith Identity",
    category: "Branding",
    description: "Minimalist visual systems for modern architecture firms.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    id: "03",
    title: "Vessel UI",
    category: "Development",
    description: "A high-performance interface built with React and GSAP.",
    image: "https://images.unsplash.com/photo-1635332205315-77983637e69b?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
];

export default function CurvyShowcase() {
  return (
    <main className="bg-[#fcfaf7] text-[#1a1a1a] min-h-screen px-6 py-20 lg:px-24 font-zalando overflow-hidden selection:bg-black selection:text-white">
      
      {/* ── HEADER ── */}
      <header className="max-w-4xl mb-24 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-6 font-medium"
        >
          Portfolio Selection 2026
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-7xl font-semibold tracking-tighter leading-[1.05]"
        >
          Focusing on the <span className="italic font-light">intersection</span> of technical precision and creative clarity.
        </motion.h1>
      </header>

      {/* ── Wave Divider ── */}
      <div className="absolute left-0 right-0 h-[300px] pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3%3Cpath fill='%23000000' fill-opacity='1' d='M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3%3C/path%3%3C/svg%3%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* ── GRID SHOWCASE ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 gap-x-16 relative z-10">
        {SHOWCASE_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col ${
              item.size === "large" ? "lg:col-span-12" : "lg:col-span-6"
            }`}
          >
            {/* The Curvy Image Mask */}
            <div className="group relative aspect-[14/10] overflow-hidden mb-10" style={{
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3%3Cpath d='M0,0 C20,10 80,10 100,0 L100,100 C80,90 20,90 0,100 Z'/%3%3C/svg%3%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3%3Cpath d='M0,0 C20,10 80,10 100,0 L100,100 C80,90 20,90 0,100 Z'/%3%3C/svg%3%3E")`,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content - Softer Typography */}
            <div className="flex flex-col lg:flex-row lg:justify-between items-start pt-2">
              <div className="flex gap-6 items-center mb-4 lg:mb-0">
                <span className="text-[9px] font-mono opacity-20 border border-black/10 px-2 py-0.5 rounded-full">{item.id}</span>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {item.title}
                </h2>
              </div>
              <div className="lg:mt-0 max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.18em] text-black/40 mb-2 font-medium">
                  {item.category}
                </p>
                <p className="text-[15px] text-black/60 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── FOOTER — Softened Borders ── */}
      <footer className="mt-64 pb-12 flex justify-between items-end border-t border-black/5 pt-12">
        <div className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-medium">
          Built for Fluid Performance
        </div>
        <div className="text-right bg-white px-6 py-4 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] border border-black/[0.02]">
          <p className="text-sm font-semibold tracking-tight">Connect</p>
          <p className="text-[11px] opacity-40 font-mono">hello@yourdomain.com</p>
        </div>
      </footer>
    </main>
  );
}