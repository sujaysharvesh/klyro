"use client";

import { motion, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";


export default function BrandsPage() {

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

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
    { value: "120+", label: "Projects delivered" },
    { value: "8×",   label: "Agency of the year"  },
    { value: "94%",  label: "Client retention"     },
  ];

  return (
    <div className="min-h-screen text-[#111] overflow-hidden font-zalando">

      {/* ── HERO ── */}
      <section className="flex flex-col gap-1 px-10 pt-10 pb-8 md:px-7 md:pt-7 md:pb-7">

        {/* eyebrow row */}
        <div className="flex items-center justify-between pl-5">
          <span className="text-[14px] font-zalando text-black/70">
            Trusted by modern brands
          </span>
          <span className="text-[12px] font-zalando tracking-[0.1em] text-black/70">
            Global Partners
          </span>
        </div>

        {/* headline */}
        <h1
          className="font-zalando"
          style={{
            position: "relative",
            fontSize: "clamp(38px, 6vw, 86px)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.09em",
            color: "#111",
            left: 19,
            top: 19,
          }}
        >
          We create digital<br />
          experiences that<br />
          <em className="not-italic font-zalando" style={{ fontStyle: "italic", color: "#555" }}>
            move brands forward.
          </em>
        </h1>

        {/* stats */}
        <div className="flex flex-wrap gap-7 pt-3 md:gap-7">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0">
              <span className="font-zalando text-[26px] font-normal text-[#111] tracking-[-0.02em]">
                {s.value}
              </span>
              <span className="font-zalando text-[11px] font-normal tracking-[0.12em] uppercase text-black/40">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
<section className="relative py-16 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-transparent to-[#FAF9F6] z-10 pointer-events-none" />

  {/* Left label */}
  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pr-7 pl-5 py-3">
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
          className="
            w-[180px] h-[70px]
            flex-shrink-0
            flex flex-col items-center justify-center
            relative
            group
            cursor-pointer
          "
          onMouseEnter={() => setHoveredBrand(i)}
          onMouseLeave={() => setHoveredBrand(null)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <img
            src={brand.logo}
            alt={brand.name}
            className="
              w-[72px] h-[48px]
              object-contain
              opacity-40
              grayscale
              transition-all duration-500
              group-hover:opacity-100
              group-hover:grayscale-0
              group-hover:scale-110
            "
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Hover Description */}
          <AnimatePresence>
            {hoveredBrand === i && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-5 text-center"
              >
                <p className="text-[8px] tracking-[0.2em] uppercase text-black/40">
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
  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20  pl-7 pr-5 py-3">
    <span className="text-[10px] tracking-[0.3em] uppercase text-black/30">
      Since 2019
    </span>
  </div>
</section>

      {/* ── CLIENT QUOTE ── */}
      <section className="text-[#080808] px-10 py-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-5" />
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#fffff] mb-3">
            What our clients say
          </p>
          <p className="text-[17px] md:text-[19px] leading-[1.6] text-black italic max-w-2xl mx-auto">
            "A partner who truly understands how to blend creativity with strategic thinking."
          </p>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

    </div>
  );
}