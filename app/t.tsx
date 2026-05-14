"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const brands = [
    { name: "Nike", logo: "/logos/nike.svg", color: "#E7682D", description: "Global sportswear leader" },
    { name: "Apple", logo: "/logos/apple.svg", color: "#000000", description: "Technology innovation" },
    { name: "Spotify", logo: "/logos/spotify2.svg", color: "#1DB954", description: "Audio streaming pioneer" },
    { name: "Adidas", logo: "/logos/adidas.svg", color: "#000000", description: "Sports performance brand" },
    { name: "Netflix", logo: "/logos/netflix.svg", color: "#E50914", description: "Entertainment redefined" },
    { name: "Airbnb", logo: "/logos/airbnb.svg", color: "#FF5A5F", description: "Hospitality ecosystem" },
    { name: "Notion", logo: "/logos/notion.svg", color: "#000000", description: "Productivity platform" },
    { name: "Puma", logo: "/logos/puma.svg", color: "#000000", description: "Sports lifestyle brand" },
  ];

  const stats = [
    { value: "150+", label: "Projects Delivered", growth: "+112%" },
    { value: "24", label: "Global Awards", growth: "×3" },
    { value: "98%", label: "Client Retention", growth: "+45%" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic brand reveals
      gsap.utils.toArray<HTMLElement>(".brand-item").forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out"
            });
          },
          once: true
        });
      });

      // Parallax effect for stats
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".stat-item",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(0.4)" }
          );
        },
        once: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden">
      
      {/* ── CINEMATIC HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract motion background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 left-10 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-black/3 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="inline-block text-[11px] tracking-[0.3em] uppercase mb-8 text-black/40">
              Trusted by visionaries
            </span>
            
            <h1 className="text-6xl lg:text-[140px] font-bold tracking-tighter leading-[0.85] mb-12 uppercase">
              Engineered
              <br />
              <span className="italic font-light text-black/20">for scale</span>
            </h1>
            
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-black/60 font-light leading-relaxed">
              We partner with ambitious brands to craft strategy, identity,
              and digital systems that create exponential growth.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-black/30">Explore partners</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[2px] h-12 bg-black/20"
          />
        </motion.div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="stats-section py-40 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item text-center opacity-0"
              initial={{ y: 50, opacity: 0 }}
            >
              <div className="relative inline-block">
                <span className="text-7xl lg:text-8xl font-bold tracking-tighter">
                  {stat.value}
                </span>
                <div className="absolute -top-4 -right-8">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-black/30">
                    {stat.growth}
                  </span>
                </div>
              </div>
              <div className="w-12 h-[2px] bg-black/20 mx-auto mt-6 mb-4" />
              <p className="text-black/50 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BRANDS MARQUEE (Enhanced Cinematic) ── */}
      <section className="relative py-20 overflow-hidden border-y border-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-transparent to-[#FAF9F6] z-10 pointer-events-none" />
        
        {/* Left label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#FAF9F6] pr-8 pl-6 py-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/30">
            Partners
          </span>
        </div>

        {/* Marquee Track */}
        <div ref={marqueeRef} className="overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <motion.div
                key={i}
                className="w-[280px] h-[160px] flex-shrink-0 flex flex-col items-center justify-center border-r border-black/5 bg-[#FAF9F6] relative group cursor-pointer"
                onMouseEnter={() => setHoveredBrand(i)}
                onMouseLeave={() => setHoveredBrand(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-24 h-12 object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <AnimatePresence>
                  {hoveredBrand === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-6 text-center"
                    >
                      <p className="text-[9px] tracking-[0.2em] uppercase text-black/40">
                        {brand.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right label */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#FAF9F6] pl-8 pr-6 py-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/30">
            Since 2019
          </span>
        </div>
      </section>

      {/* ── EDITORIAL GRID: FEATURED WORK ── */}
      <section className="py-40 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[200px] font-bold tracking-tighter text-black/5 select-none block leading-none">
                02
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mt-8">
                Selected
                <br />
                collaborations
              </h2>
              <div className="w-12 h-[2px] bg-black/20 mt-8" />
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-16">
            {brands.slice(0, 4).map((brand, i) => (
              <motion.div
                key={i}
                className="brand-item opacity-0 translate-y-8 group cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-8 border-b border-black/10 pb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-black/30">
                        0{i + 1}
                      </span>
                      <div 
                        className="w-8 h-[2px]" 
                        style={{ backgroundColor: brand.color }}
                      />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter mb-3">
                      {brand.name}
                    </h3>
                    <p className="text-black/50 text-sm font-light">
                      {brand.description}
                    </p>
                  </div>
                  <div className="w-20 h-20 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="w-16 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC QUOTE SECTION ── */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#1A1A1A] my-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format')] bg-cover bg-center opacity-10"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-8" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">
              Client Testimonial
            </p>
            <p className="text-xl md:text-2xl leading-[1.6] text-white/70 italic font-light">
              "A partner who truly understands how to blend creativity with strategic thinking. 
              They don't just deliver—they transform."
            </p>
            <div className="mt-8">
              <p className="text-white/40 text-sm tracking-wider">
                — Sarah Chen, CMO at Global Brand
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-40 px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/30">
            Join the collective
          </span>
          <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter mt-6 mb-8">
            Ready to scale?
          </h2>
          <p className="text-black/50 max-w-2xl mx-auto mb-12 font-light">
            Let's engineer your brand's next chapter together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1A1A1A] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black/80 transition-all duration-300"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}