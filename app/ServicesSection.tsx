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

// Animation style presets
const ANIMATION_STYLES = {
  vertical: {
    out: { clipPath: "inset(0% 0% 100% 0%)" },
    in: { clipPath: "inset(0% 0% 0% 0%)" },
    reset: { clipPath: "inset(100% 0% 0% 0%)" },
    duration: 0.5,
    ease: "power2.inOut",
  },
  horizontal: {
    out: { clipPath: "inset(0% 0% 0% 100%)" },
    in: { clipPath: "inset(0% 0% 0% 0%)" },
    reset: { clipPath: "inset(0% 100% 0% 0%)" },
    duration: 0.5,
    ease: "power2.inOut",
  },
  radial: {
    out: { scale: 0, opacity: 0, borderRadius: "50%" },
    in: { scale: 1, opacity: 1, borderRadius: "0%" },
    reset: { scale: 0, opacity: 0 },
    duration: 0.6,
    ease: "back.out(0.5)",
  },
  slideBottom: {
    out: { y: 50, opacity: 0 },
    in: { y: 0, opacity: 1 },
    reset: { y: 50, opacity: 0 },
    duration: 0.5,
    ease: "power3.out",
  },
  rotate: {
    out: { rotate: -10, scale: 0.8, opacity: 0 },
    in: { rotate: 0, scale: 1, opacity: 1 },
    reset: { rotate: -10, scale: 0.8, opacity: 0 },
    duration: 0.6,
    ease: "back.out(0.4)",
  },
  blur: {
    out: { filter: "blur(20px)", opacity: 0 },
    in: { filter: "blur(0px)", opacity: 1 },
    reset: { filter: "blur(20px)", opacity: 0 },
    duration: 0.5,
    ease: "power2.out",
  },
  flip: {
    out: { rotateX: 90, opacity: 0 },
    in: { rotateX: 0, opacity: 1 },
    reset: { rotateX: 90, opacity: 0 },
    duration: 0.6,
    ease: "power2.out",
  },
  zoom: {
    out: { scale: 1.5, opacity: 0 },
    in: { scale: 1, opacity: 1 },
    reset: { scale: 1.5, opacity: 0 },
    duration: 0.5,
    ease: "power3.out",
  },
};

type AnimationType = keyof typeof ANIMATION_STYLES;

interface ServicesSectionProps {
  animationStyle?: AnimationType;
}

export function ServicesSection({ animationStyle = "blur" }: ServicesSectionProps) {
  const [active, setActive] = useState<number | null>(0);
  const [currentStyle] = useState<AnimationType>(animationStyle);

  const activeRef = useRef<number | null>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const currentTl = useRef<gsap.core.Timeline | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const style = ANIMATION_STYLES[currentStyle];

  useEffect(() => {
    gsap.set(boxRef.current, { opacity: 1, x: 0 });
    
    wrapperRefs.current.forEach((el, idx) => {
      if (el) {
        if (idx === 0) {
          if (currentStyle === "vertical" || currentStyle === "horizontal") {
            gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
          } else if (currentStyle === "radial") {
            gsap.set(el, { scale: 1, opacity: 1, borderRadius: "0%" });
          } else if (currentStyle === "slideBottom") {
            gsap.set(el, { y: 0, opacity: 1 });
          } else if (currentStyle === "rotate") {
            gsap.set(el, { rotate: 0, scale: 1, opacity: 1 });
          } else if (currentStyle === "blur") {
            gsap.set(el, { filter: "blur(0px)", opacity: 1 });
          } else if (currentStyle === "flip") {
            gsap.set(el, { rotateX: 0, opacity: 1 });
          } else if (currentStyle === "zoom") {
            gsap.set(el, { scale: 1, opacity: 1 });
          }
        } else {
          gsap.set(el, style.reset);
        }
      }
    });
    
    descriptionRefs.current.forEach((el, idx) => {
      if (el) {
        if (idx === 0) {
          gsap.set(el, { height: "auto", opacity: 1 });
        } else {
          gsap.set(el, { height: 0, opacity: 0 });
        }
      }
    });

    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.load();
      firstVideo.play().catch((err) => {
        console.log("Auto-play prevented:", err);
      });
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (currentTl.current) currentTl.current.kill();
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, [currentStyle]);

  const playVideo = async (video: HTMLVideoElement | null) => {
    if (!video) return;
    try {
      video.currentTime = 0;
      await video.play();
    } catch (err) {
      console.log("Video play error:", err);
    }
  };

  const pauseVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.pause();
  };

  const transition = (from: number | null, to: number | null) => {
    if (currentTl.current) {
      currentTl.current.kill();
      currentTl.current = null;
    }

    const tl = gsap.timeline();
    currentTl.current = tl;

    const isFirstEnter = from === null && to !== null;
    const isFullLeave = to === null && from !== null;

    if (from !== null && descriptionRefs.current[from]) {
      tl.to(
        descriptionRefs.current[from],
        {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );
    }

    if (to !== null && descriptionRefs.current[to]) {
      tl.to(
        descriptionRefs.current[to],
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        from !== null ? 0.1 : 0
      );
    }

    if (from !== null && wrapperRefs.current[from]) {
      tl.to(
        wrapperRefs.current[from],
        {
          ...style.out,
          duration: style.duration,
          ease: style.ease,
        },
        0
      );
    }

    if (to !== null && wrapperRefs.current[to]) {
      const video = videoRefs.current[to];
      if (video) {
        playVideo(video);
      }
      
      gsap.set(wrapperRefs.current[to], style.reset);
      
      tl.to(
        wrapperRefs.current[to],
        {
          ...style.in,
          duration: style.duration,
          ease: style.ease,
        },
        from !== null ? 0.08 : 0
      );
    }

    if (isFirstEnter && boxRef.current) {
      tl.to(
        boxRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );
    }

    if (isFullLeave && boxRef.current) {
      tl.to(
        boxRef.current,
        {
          opacity: 0,
          x: -16,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );
    }

    if (from !== null) {
      tl.call(() => {
        if (wrapperRefs.current[from]) {
          gsap.set(wrapperRefs.current[from], style.reset);
        }
        pauseVideo(videoRefs.current[from]);
      });
    }
  };

  const handleEnter = (i: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (activeRef.current === i) return;
    
    const from = activeRef.current;
    activeRef.current = i;
    setActive(i);
    transition(from, i);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as Node | null;
    if (listRef.current?.contains(related)) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      if (activeRef.current === null) return;
      
      const from = activeRef.current;
      activeRef.current = null;
      setActive(null);
      transition(from, null);
    }, 100);
  };

  const handleListLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as Node | null;
    const box = boxRef.current;
    
    if (box?.contains(related)) return;
    handleLeave(e);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center px-12 overflow-hidden">

      <div className="absolute top-30 left-12 right-10 flex justify-between items-center z-20 ">
        <h1 className="text-[15px] font-zalando text-black/70 leading-tight">Our Services</h1>
        <p className="text-[15px] font-zalando text-black/70 leading-tight hidden lg:block">
          Built for modern brands
        </p>
      </div>

      {/* ── VIDEO PANEL ── */}
      <div className="relative w-1/2 h-[500px] flex items-center justify-center z-10">
        <div
          ref={boxRef}
          className="w-full max-w-[90%] h-full rounded-2xl overflow-hidden bg-[#111] relative shadow-2xl"
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => { wrapperRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full"
              style={{ willChange: "transform, opacity, filter" }}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={s.video}
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                style={{ pointerEvents: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <div
        ref={listRef}
        className="w-1/2 flex flex-col justify-center items-start pl-12"
        onMouseLeave={handleListLeave}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            onMouseEnter={() => handleEnter(i)}
            className="group w-full cursor-pointer py-4 border-b border-black/5 last:border-none transition-all duration-300"
          >
            <div className="flex items-baseline gap-6">
              <h2
                className={`font-black uppercase tracking-tighter transition-colors duration-300 ${
                  active === i ? "text-black" : "text-black/20 group-hover:text-black/40"
                }`}
                style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: "0.9" }}
              >
                {s.name}
              </h2>
              <span
                className={`text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  active === i ? "opacity-100 text-black/60" : "opacity-0"
                }`}
              >
                {s.tag}
              </span>
            </div>

            <div
              ref={(el) => { descriptionRefs.current[i] = el; }}
              className="overflow-hidden"
              style={{ 
                height: i === 0 ? "auto" : 0, 
                opacity: i === 0 ? 1 : 0 
              }}
            >
              <p className="text-black/60 text-base max-w-md pt-4 font-light leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}