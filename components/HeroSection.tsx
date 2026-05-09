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
        duration: 0.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-10 pt-20 font-zalando">
      {/* Top meta grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 px-12 py-10 gap-1 items-start">
        <div className="mt-14">
          <h3 className="text-[20px] text-[#111] mb-8 font-zalando">Our brand philosophy</h3>
          <div className="flex flex-col gap-3 max-w-[360px]">
            <p className="text-[15px] leading-[1.65] text-[#111]">
              We approach design through logic, systems, and human emotion.
            </p>
            <p className="text-[15px] leading-[1.65] text-[#444]">
              Every detail we craft carries clarity, intention, and quiet confidence.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-1">
          <p className="text-[20px] text-[#555] font-medium">
            Based in India · Worldwide ({time})
          </p>
          <p className="text-[13px] text-[#888]">Founded in Tamil Nadu</p>
          <p className="text-[13px] text-[#888]">8x Agency of the Year</p>
        </div>
      </div>

      <div className="mx-9 w-[65%] h-[2px] bg-[#ddd]" />

      {/* Hero headline — right col is empty, HeroImage is fixed and fills it */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] px-9 py-20 gap-10 items-center">
          <div
          //  ref={heroBlockRef}
           style={{ transform: "translateY(-20px)" }}>
            <h1 className="text-[clamp(32px,5.2vw,70px)] font-semibold leading-[1.05] tracking-tighter text-[#111] max-w-[1000px] uppercase">
              We help brands scale through strategy, content, and performance marketing.
            </h1>
            {/* <p className="text-[14px] text-[#888] mt-6 max-w-[320px]">Design · Strategy · Performance</p> */}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-sm  lg:-translate-x-20 lg:-translate-y-10">
              <Image
                src="/cat.png" 
                alt="Preview" 
                fill 
                // className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>
        </div>
    </div>
  );
}