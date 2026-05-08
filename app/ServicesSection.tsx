"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const SERVICES = [
  {
    name: "Branding",
    tag: "Identity",
    description: "Building memorable identities through strategy, positioning, typography, and visual storytelling.",
    video: "/videos/v2.mp4",
  },
  {
    name: "Webflow",
    tag: "Development",
    description: "Developing responsive, high-performance websites with seamless interactions.",
    video: "/videos/v3.mp4",
  },
  {
    name: "UI/UX Design",
    tag: "Interface",
    description: "Designing intuitive digital products focused on usability, clarity, and elegant experiences.",
    video: "/videos/v4.mp4",
  },
  {
    name: "Advertising",
    tag: "Campaigns",
    description: "Launching performance-driven campaigns that increase visibility and brand growth.",
    video: "/videos/v6.mp4",
  },
  {
    name: "SEO & Content",
    tag: "Growth",
    description: "Optimizing content and search strategy to improve reach and long-term discoverability.",
    video: "/videos/v7.mp4",
  },
];

export function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!boxRef.current) return;

    if (active !== null) {
      // Smooth fade in for the video container
      gsap.to(boxRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "expo.out",
      });

      // Animate the description reveal
      gsap.to(descriptionRefs.current[active], {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      if (videoRef.current) {
        videoRef.current.src = SERVICES[active].video;
        videoRef.current.play().catch(() => {});
      }
    } else {
      gsap.to(boxRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    // Close all other descriptions
    SERVICES.forEach((_, i) => {
      if (i !== active) {
        gsap.to(descriptionRefs.current[i], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [active]);

  return (
    <section className="relative min-h-screen w-full flex items-center px-12 overflow-hidden">
      
      {/* ── VIDEO PANEL ── */}
      <div className="relative w-1/2 h-[500px] flex items-center justify-center z-10 pointer-events-none">
        <div
          ref={boxRef}
          className="w-[90%] h-full rounded-2xl overflow-hidden bg-[#111] origin-left"
          style={{ opacity: 0, transform: "translateX(-20px)" }}
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <div className="w-1/2 flex flex-col justify-center items-start pl-12">
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group w-full cursor-pointer py-4 border-b border-black/5 last:border-none"
          >
            <div className="flex items-center gap-6">
              <h2 
                className={`font-black uppercase tracking-tighter transition-colors duration-500 ${
                  active === i ? "text-black" : "text-black/20"
                }`}
                style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: "0.9" }}
              >
                {s.name}
              </h2>
              <span className={`text-[10px] uppercase tracking-widest transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}>
                {s.tag}
              </span>
            </div>

            {/* Description Container handled by GSAP */}
            <div
              ref={(el) => { descriptionRefs.current[i] = el; }}
              className="overflow-hidden opacity-0 h-0"
            >
              <p className="text-black/60 text-lg max-w-md pt-4 font-light leading-snug">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}