"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface HeroSectionProps {
  time: string;
}

export function HeroSection({ time }: HeroSectionProps) {
  const heroBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      gsap.to(heroBlockRef.current, {
        y: -(window.scrollY * 0.1),
        duration: 0.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const marqueeItems = [
    "Strategy",
    "Content Marketing",
    "Performance",
    "Brand Identity",
    "Digital Growth",
    "Tamil Nadu · India",
  ];

  return (
    <div className="relative z-10 pt-2 sm:pt-20 font-zalando">

      {/* ── Top meta grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 px-5 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 gap-6 md:gap-1 items-start">

        {/* Brand philosophy */}
        <div className="mt-6 sm:mt-10 md:mt-14">
          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] text-[#111] mb-4 sm:mb-6 md:mb-8 font-zalando">
            Our brand philosophy
          </h3>
          <div className="flex flex-col gap-2 sm:gap-3 max-w-[360px]">
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] text-[#111]">
              We approach design through logic, systems, and human emotion.
            </p>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] text-[#444]">
              Every detail we craft carries clarity, intention, and quiet confidence.
            </p>
          </div>
        </div>

        {/* Location / awards */}
        <div className="mt-0 md:mt-14 flex flex-col gap-1">
          <p className="text-[15px] sm:text-[17px] md:text-[20px] text-[#555] font-medium">
            Based in India · Worldwide ({time})
          </p>
          <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#888]">
            Founded in Tamil Nadu
          </p>
          <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#888]">
            8x Agency of the Year
          </p>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-y border-black/[0.08] bg-[#eeebe4] py-2 sm:py-2.5 my-0">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#888] px-6 sm:px-10 border-r border-black/10 flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero headline + image ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] px-5 sm:px-8 md:px-9 py-10 sm:py-14 md:py-20 gap-8 sm:gap-10 items-center">

        {/* Headline */}
        <div
          // ref={heroBlockRef}
          className="lg:-translate-y-[90px]"
        >
          <h1 className="text-[clamp(26px,7vw,70px)] font-semibold leading-[1.05] tracking-tighter text-[#111] uppercase">
            We help brands scale through strategy, content, and performance marketing.
          </h1>
        </div>

        {/* Image — shown below headline on mobile, beside it on lg+ */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] aspect-[4/5] overflow-hidden rounded-sm lg:-translate-x-20 lg:-translate-y-20">
            <Image
              src="/cat.png"
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}