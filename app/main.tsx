"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function DesignAgencyLanding() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const heroBlockRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const linksRef = useRef([]);

  // ── Clock Logic ──
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Kolkata",
      }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // ── Lock body scroll ──
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // ── Parallax Effect ──
  useEffect(() => {
    const handleScroll = () => {
      gsap.to(heroBlockRef.current, {
        y: -(window.scrollY * 0.10),
        duration: 0.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Menu Animation ──
  useEffect(() => {
    if (open) {
      gsap.fromTo(
        linksRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }
  }, [open]);

  const handleToggle = () => {
    gsap.fromTo([leftLineRef.current, rightLineRef.current],
      { y: open ? 20 : -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
    setOpen(!open);
  };

  const menuLinks = [
    { name: "Work", sub: "Featured Projects" },
    { name: "Services", sub: "Capabilities" },
    { name: "About", sub: "Our Story" },
    { name: "Grow with us", sub: "Careers" },
  ];

  return (
    <div className="bg-[#f5f3ef] min-h-screen">
      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-start p-8 z-[200] pointer-events-none">
        <div
          className="relative px-2 leading-none pointer-events-auto"
          style={{
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 500,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            color: open ? "#f0ede8" : "#000",
            transition: "color 0.4s ease",
            textTransform: "uppercase",
          }}
        >
          klyro
          <span className="absolute top-2 -right-4 text-[35px] font-bold">®</span>
        </div>

        <button
          onClick={handleToggle}
          className="flex flex-col gap-[7px] items-end cursor-pointer pointer-events-auto pt-1.5 border-none bg-transparent group"
        >
          <span
            ref={leftLineRef}
            className="block h-[1.5px] transition-all duration-300 group-hover:w-9"
            style={{
              width: open ? 32 : 36,
              background: open ? "#f0ede8" : "#0a0a0a",
            }}
          />
          <span
            ref={rightLineRef}
            className="block h-[1.5px] transition-all duration-300 group-hover:w-9"
            style={{
              width: open ? 32 : 22,
              background: open ? "#f0ede8" : "#0a0a0a",
            }}
          />
        </button>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 pt-20 font-zalando">
        <div className="grid grid-cols-1 md:grid-cols-3 px-12 py-10 gap-1 items-start">
          <div className="mt-14">
            <h3 className="text-[20px] text-[#111] mb-8 font-zalando">Our brand philosophy</h3>
            <div className="flex flex-col gap-3 max-w-[360px]">
              <p className="text-[15px] leading-[1.65] text-[#111]">We approach design through logic, systems, and human emotion.</p>
              <p className="text-[15px] leading-[1.65] text-[#444]">Every detail we craft carries clarity, intention, and quiet confidence.</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-1">
            <p className="text-[20px] text-[#555] font-medium">Based in India · Worldwide ({time})</p>
            <p className="text-[13px] text-[#888]">Founded in Tamil Nadu</p>
            <p className="text-[13px] text-[#888]">8x Agency of the Year</p>
          </div>
        </div>

        <div className="mx-9 w-[65%] h-[2px] bg-[#ddd]" />

        {/* HERO GRID: Text Left (2fr), Image Right (1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] px-9 py-20 gap-10 items-center">
          <div ref={heroBlockRef} className="will-change-transform">
            <h1 className="text-[clamp(32px,5.2vw,70px)] font-semibold leading-[1.05] tracking-tighter text-[#111] max-w-[1000px] uppercase">
              We help brands scale through strategy, content, and performance marketing.
            </h1>
            <p className="text-[14px] text-[#888] mt-6 max-w-[320px]">Design · Strategy · Performance</p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-sm  lg:-translate-x-20 lg:-translate-y-10">
              <Image 
                src="/cat.png" 
                alt="Preview" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MENU OVERLAY ── */}
      <div
        className={`fixed inset-0 z-[190] bg-[#0c0b09] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
      >
        <div className="relative h-full flex flex-col px-6 lg:px-12 pt-[140px] pb-10">
          
          {/* Main Menu Section */}
          <div className="flex-1 flex flex-col lg:flex-row justify-between items-start gap-12">
            
            {/* Navigation Links */}
            <ul className="flex flex-col w-full lg:w-1/2">
              {menuLinks.map((link, i) => (
                <li
                  key={link.name}
                  ref={(el) => (linksRef.current[i] = el)}
                  className="border-b border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-7 px-8 group flex flex-col items-start transition-all duration-500 ease-out hover:bg-[#f0ede8]"
                  >
                    {/* Index & Line Row */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-5 h-[1px] bg-[#333] transition-all duration-500 group-hover:w-12 group-hover:bg-black" />
                      <span className="text-[9px] font-medium tracking-[0.2em] text-[#444] transition-colors duration-300 group-hover:text-black">
                        0{i + 1}
                      </span>
                    </div>
                    
                    {/* Main Link Name */}
                    <span
                      className="font-semibold text-[#888] uppercase leading-none transition-colors duration-300 group-hover:text-black"
                      style={{ 
                        fontSize: "clamp(24px, 4vw, 48px)", 
                        letterSpacing: "-0.01em" 
                      }}
                    >
                      {link.name}
                    </span>
                    
                    {/* Subtitle / Description */}
                    <div className="mt-2 overflow-hidden">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-[#333] transition-all duration-500 transform group-hover:text-black/50 group-hover:translate-x-1">
                        {link.sub}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Cat Image in Menu - Same style as hero image */}
            <div className="w-[320px] h-[420px] lg:-translate-x-1 bg-[#151515] items-center justify-center overflow-hidden rounded-sm">
              <Image
                src="/cat.png"
                alt="Cat Preview"
                fill
                className="object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/50 to-transparent" />
              <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.18em] text-white/50">
                Selected Works '26
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 items-end pt-10 border-t border-[#1c1c1a] mt-auto">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#3a3a38]">Inquiries</p>
              <a href="mailto:hello@klyro.in" className="text-[14px] text-[#f0ede8] tracking-[-0.01em] hover:text-[#666] transition-colors">
                hello@klyro.in
              </a>
            </div>
            
            <div className="hidden lg:block text-center text-[11px] text-[#3a3a38] tracking-[0.06em]">
              <strong className="block text-[14px] text-[#f0ede8] font-normal mb-0.5">{time} IST</strong>
              Tamil Nadu, IN
            </div>

            <div className="text-right flex flex-col items-end">
              <p className="text-[10px] text-[#3a3a38] tracking-[0.16em]">© 2026 KLYRO STUDIO</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}