"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(
  end: number,
  {
    from = 0,
    duration = 2,
    decimals = 0,
    step = 1,
    pre = "",
    post = "",
    enabled = false,
  }: {
    from?: number;
    duration?: number;
    decimals?: number;
    step?: number;
    pre?: string;
    post?: string;
    enabled?: boolean;
  }
) {
  const [display, setDisplay] = useState(`${pre}${from.toFixed(decimals)}${post}`);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    const range = end - from;

    const snap = (n: number) => Math.round(n / step) * step;
    const fmt = (n: number) =>
      `${pre}${snap(n).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${post}`;

    // Sine-in-out easing
    const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const current = from + range * ease(t);
      setDisplay(fmt(current));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(fmt(end));
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [enabled]);

  return display;
}

// ── Animated stat item ─────────────────────────────────────────────────────────
function StatItem({
  value,
  label,
  visible,
}: {
  value: string;
  label: string;
  visible: boolean;
}) {
  // Parse the numeric value and any pre/post decorators
  const match = value.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
  const pre     = match?.[1] ?? "";
  const numStr  = match?.[2] ?? "0";
  const post    = match?.[3] ?? "";
  const end     = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  // Use a step of 0.5 if decimals present, else 1
  const step = decimals > 0 ? 0.5 : 1;

  const display = useCountUp(end, { from: 0, duration: 2, decimals, step, pre, post, enabled: visible });

  return (
    <div className="flex flex-col gap-0">
      <span className="font-zalando text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111] tracking-[-0.02em] tabular-nums">
        {display}
      </span>
      <span className="font-zalando text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11px] font-normal tracking-[0.1em] uppercase text-black/40">
        {label}
      </span>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function BrandsPage() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);
  const [isMobile, setIsMobile]         = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver fires count-up when stats scroll into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const brands = [
    { name: "Nike",    logo: "/logos/nike.svg",     color: "#E7682D", description: "Global sportswear leader"   },
    { name: "Apple",   logo: "/logos/apple.svg",    color: "#000000", description: "Technology innovation"      },
    { name: "Spotify", logo: "/logos/spotify2.svg", color: "#1DB954", description: "Audio streaming pioneer"    },
    { name: "Adidas",  logo: "/logos/adidas.svg",   color: "#000000", description: "Sports performance brand"   },
    { name: "Netflix", logo: "/logos/netflix.svg",  color: "#E50914", description: "Entertainment redefined"    },
    { name: "Airbnb",  logo: "/logos/airbnb.svg",   color: "#FF5A5F", description: "Hospitality ecosystem"      },
    { name: "Notion",  logo: "/logos/notion.svg",   color: "#000000", description: "Productivity platform"      },
    { name: "Puma",    logo: "/logos/puma.svg",     color: "#000000", description: "Sports lifestyle brand"     },
  ];

  const stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "8×",   label: "Agency of the year"  },
    { value: "94%",  label: "Client retention"    },
  ];

  return (
    <div className="min-h-screen text-[#111] overflow-hidden font-zalando pt-50 md:pt-24 lg:pt-22">

      {/* ── HERO ── */}
      <section className="flex flex-col gap-1 px-4 sm:px-6 md:px-7 lg:px-10 pt-6 sm:pt-8 md:pt-7 lg:pt-10 pb-6 sm:pb-7 md:pb-7 lg:pb-8">

        {/* eyebrow */}
        <div className="flex items-center justify-between pl-2 sm:pl-3 md:pl-4 lg:pl-1">
          <span className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-zalando text-black/70">
            Trusted by modern brands
          </span>
          <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[12px] font-zalando tracking-[0.08em] sm:tracking-[0.1em] text-black/70">
            Global Partners
          </span>
        </div>

        {/* headline */}
        <h1
          className="font-zalando relative sm:left-[5px] md:left-[10px] lg:left-[19px] sm:top-[5px] md:top-[10px] lg:top-[19px]"
          style={{ fontSize: "clamp(32px, 8vw, 86px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.05em", color: "#111" }}
        >
          We create digital<br className="hidden sm:block" />
          experiences that<br className="hidden sm:block" />
          move brands forward.
        </h1>

        {/* ── STATS with count-up ── */}
        <div
          ref={statsRef}
          className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 lg:gap-7 pt-4 sm:pt-5 md:pt-6 lg:pt-8 lg:translate-x-5"
        >
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} visible={statsVisible} />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-[#f5f3ef] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-[#f5f3ef] to-transparent z-10 pointer-events-none" />

        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 pr-7 pl-5 py-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/30 whitespace-nowrap">Partners</span>
        </div>

        <div ref={marqueeRef} className="overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: isMobile ? 20 : 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <motion.div
                key={i}
                className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px] flex-shrink-0 flex flex-col items-center justify-center relative group cursor-pointer mx-2 sm:mx-3 md:mx-4"
                onMouseEnter={() => setHoveredBrand(i)}
                onMouseLeave={() => setHoveredBrand(null)}
                whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-[50px] h-[35px] sm:w-[60px] sm:h-[40px] md:w-[65px] md:h-[44px] lg:w-[72px] lg:h-[48px]">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                <AnimatePresence>
                  {hoveredBrand === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-4 sm:bottom-0 text-center whitespace-nowrap"
                    >
                      <p className="text-[7px] sm:text-[8px] tracking-[0.15em] uppercase text-black/40">
                        {brand.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 pl-7 pr-5 py-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black/30 whitespace-nowrap">Since 2019</span>
        </div>
      </section>

      {/* Mobile partner dots */}
      <div className="flex md:hidden justify-center gap-1 py-2">
        {brands.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-black/20" />
        ))}
      </div>

      {/* ── CLIENT QUOTE ── */}
      <section className="text-[#080808] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-8 sm:w-10 md:w-12 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-4 sm:mb-5" />
          <p className="text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-black/50 mb-2 sm:mb-3">
            What our clients say
          </p>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] leading-[1.5] sm:leading-[1.55] md:leading-[1.6] text-black italic max-w-2xl mx-auto px-2">
            "A partner who truly understands how to blend creativity with strategic thinking."
          </p>
          <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-black/30" />
            <div className="w-1 h-1 rounded-full bg-black/30" />
            <div className="w-1 h-1 rounded-full bg-black/30" />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mx-4 sm:mx-6 md:mx-8 lg:mx-10" />
    </div>
  );
}