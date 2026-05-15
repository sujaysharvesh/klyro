"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const [activeStat, setActiveStat] = useState(0);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Stats data for cinematic scrolling
  const stats = [
    { value: "150+", label: "Projects Delivered", growth: "+240%" },
    { value: "98%", label: "Client Retention", growth: "+45%" },
    { value: "24", label: "Global Awards", growth: "×3" },
    { value: "12M", label: "Combined Reach", growth: "+187%" }
  ];

  useEffect(() => {
    const target = spanRef.current;
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.style.backgroundSize = "200% 200%";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(target, {
        backgroundSize: "200% 200%",
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          end: "bottom 35%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic text reveals
      ScrollTrigger.batch(".reveal-text", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
          });
        },
        start: "top 85%"
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((img) => {
        ScrollTrigger.create({
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const y = self.progress * 100;
            gsap.set(img, { y: y * 0.5 });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="text-[#1A1A1A] overflow-x-hidden selection:bg-[#1A1A1A] selection:text-[#FAF9F6] w-full"
    >
      {/* ── CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden py-24 lg:py-0">
        {/* Abstract background motion */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-10 left-4 md:top-20 md:left-10 w-64 h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-72 h-72 md:w-[500px] md:h-[500px] bg-black/3 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-center"
          >
            <p className="fill-text js-fill text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto font-zalando leading-relaxed tracking-tight break-words">
              <span ref={spanRef}>
                We engineer unignorable market presence through cinematic
                storytelling, radical typography, and data-driven infrastructure,
                helping ambitious brands build stronger emotional connection,
                cultural relevance, and long-term digital growth across every
                customer touchpoint.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL GRID: PHILOSOPHY ── */}
      <section className="py-20 md:py-40 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - oversized number */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[100px] sm:text-[150px] lg:text-[200px] font-black tracking-tighter text-black/5 select-none block leading-none">
                01
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter mt-4 lg:mt-8 leading-tight">
                Logic meets<br className="hidden sm:inline" /> Luxury
              </h2>
              <div className="w-12 h-[2px] bg-black/20 mt-6 lg:mt-8" />
            </motion.div>
          </div>

          {/* Right column - editorial content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <div className="reveal-text opacity-0 translate-y-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">Technical-First Infrastructure</h3>
              <p className="text-black/60 leading-relaxed text-base sm:text-lg font-light">
                We don't just guess. We build the architecture to track every conversion,
                analyze every touchpoint, and optimize every interaction. Our proprietary
                analytics stack processes millions of data points in real-time.
              </p>
            </div>

            <div className="reveal-text opacity-0 translate-y-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">Radical Visual Identity</h3>
              <p className="text-black/60 leading-relaxed text-base sm:text-lg font-light">
                Bold, unrefined, and elegant. Our creative direction captures market share
                instantly through oversized typography, raw spacing, and cinematic motion.
                We don't follow trends—we set them.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-6 lg:pt-12">
              <div className="reveal-text opacity-0 translate-y-8">
                <div className="w-12 sm:w-16 h-[2px] bg-black/20 mb-4" />
                <p className="text-3xl sm:text-4xl font-black mb-2">100%</p>
                <p className="text-black/40 text-[10px] sm:text-sm uppercase tracking-wider">Custom Strategy</p>
              </div>
              <div className="reveal-text opacity-0 translate-y-8">
                <div className="w-12 sm:w-16 h-[2px] bg-black/20 mb-4" />
                <p className="text-3xl sm:text-4xl font-black mb-2">24/7</p>
                <p className="text-black/40 text-[10px] sm:text-sm uppercase tracking-wider">Global Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC PROCESS SECTION ── */}
      <section className="relative bg-[#1A1A1A] text-white w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32">
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 opacity-10 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 mb-20 md:mb-32">
            <div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-mono text-white/30">Process Framework</span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter mt-4 lg:mt-6 italic leading-tight">
                How we
                <br />
                engineer scale.
              </h2>
            </div>
            <div className="max-w-md w-full">
              <div className="w-12 h-[2px] bg-white/30 mb-6" />
              <p className="text-white/40 font-light leading-relaxed text-sm sm:text-base">
                A proprietary three-phase methodology that transforms brands into
                market leaders through systematic growth engineering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            {[
              {
                phase: "Phase 01",
                title: "Audit & Architecture",
                desc: "Deep diagnostic analysis of your current infrastructure, market positioning, and growth vectors.",
                metric: "2 weeks",
                number: "01"
              },
              {
                phase: "Phase 02",
                title: "Deploy & Amplify",
                desc: "Rapid implementation of creative campaigns, high-performance UX, and strategic scaling.",
                metric: "4-6 weeks",
                number: "02"
              },
              {
                phase: "Phase 03",
                title: "Optimize & Scale",
                desc: "Real-time data loops, continuous optimization, and exponential growth acceleration.",
                metric: "Ongoing",
                number: "03"
              }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative pt-8 md:pt-0"
              >
                <div className="absolute -top-10 right-0 text-[80px] sm:text-[100px] lg:text-[120px] font-black text-white/5 pointer-events-none transition-all duration-500 group-hover:text-white/10 leading-none">
                  {phase.number}
                </div>
                <div className="mb-4 lg:mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/30">
                    {phase.phase}
                  </span>
                  <div className="w-12 h-[2px] bg-white/30 mt-3 mb-4 lg:mb-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight">{phase.title}</h3>
                <p className="text-white/40 leading-relaxed font-light text-sm sm:text-base mb-6">{phase.desc}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-white/30" />
                  <span className="text-[10px] tracking-wider uppercase font-mono text-white/30">
                    {phase.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS GRID ── */}
      <section className="py-20 md:py-40 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-black/30">
              Performance Metrics
            </span>
            <div className="w-full h-[2px] bg-black/10 mt-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="text-center group cursor-pointer"
              onMouseEnter={() => setActiveStat(i)}
            >
              <div className="h-16 sm:h-24 flex items-center justify-center overflow-hidden mb-2 sm:mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStat === i ? "active" : "inactive"}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter"
                  >
                    {stat.value}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="text-black/60 text-[11px] sm:text-sm uppercase tracking-wider font-mono mb-2 min-h-[2.5rem] sm:min-h-0 flex items-center justify-center">
                {stat.label}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 sm:w-8 h-[2px] bg-black/20 group-hover:w-12 transition-all duration-300" />
                <span className="text-[9px] tracking-wider uppercase text-black/30">
                  {stat.growth}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LEADERSHIP GRID (Editorial Layout) ── */}
      <section className="py-20 md:py-40 bg-[#F5F3F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="mb-16 md:mb-32 text-center">
            <span className="text-[11px] tracking-[0.3em] uppercase font-mono text-black/30">
              Collective Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mt-4 lg:mt-6 leading-tight">
              The architects
              <br />
              behind the system.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 md:gap-12">
            {[
              {
                name: "S. Namma",
                role: "Creative Director",
                bio: "Former CD at Wieden+Kennedy, leading creative vision for global brands.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format"
              },
              {
                name: "M. Russo",
                role: "Head of Strategy",
                bio: "Ex-McKinsey strategist specializing in growth architecture and market expansion.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format"
              },
              {
                name: "J. Chen",
                role: "Tech Lead",
                bio: "Former engineering lead at Google, building scalable digital infrastructure.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format"
              }
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`group ${i === 2 ? "sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none md:mx-0" : ""}`}
              >
                <div className="relative overflow-hidden mb-6 aspect-square w-full bg-neutral-200">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-black/30">
                    0{i + 1}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tighter">{person.name}</h3>
                  <p className="text-xs sm:text-sm font-medium text-black/50">{person.role}</p>
                  <p className="text-black/40 text-xs sm:text-sm font-light leading-relaxed pt-1">
                    {person.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}