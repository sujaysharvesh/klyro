"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Work1 from "./work/work1";
import Work2 from "./work/work2";
import Work3 from "./work/work3";
import Work4 from "./work/work4";
import { useNavColor } from "@/context/NavColorProvider";

gsap.registerPlugin(ScrollTrigger);

const GAP = 8;
const MOBILE_GAP = 4;

const slides: {
  content: React.ReactNode;
  alt: string;
  logoColor: string;
}[] = [
  { content: <Work1 />, alt: "Slide 1", logoColor: "#f5ede0" },
  { content: <Work2 />, alt: "Slide 2", logoColor: "#f0ede8" },
  { content: <Work3 />, alt: "Slide 3", logoColor: "#3d4f2e" },
  { content: <Work4 />, alt: "Slide 4", logoColor: "#1E3A34" },
];

const DEFAULT_COLOR = "#000000";

export default function Works() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setLogoColor } = useNavColor();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    
    if (!wrapper || !container) return;

    // Set color for the first slide immediately
    setLogoColor(slides[0].logoColor);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".ss-panel");
      const gap = isMobile ? MOBILE_GAP : GAP;

      // Adjust container height for mobile
      if (isMobile) {
        gsap.set(container, { height: `calc(100vh - 60px)` });
      }

      panels.forEach((panel, i) => {
        if (i === 0) return;

        gsap.set(panel, { yPercent: 100 });

        const triggerStart = `top+=${(i - 1) * window.innerHeight} top`;
        const triggerEnd = `top+=${i * window.innerHeight} top`;

        ScrollTrigger.create({
          trigger: wrapper,
          start: triggerStart,
          end: triggerEnd,
          scrub: isMobile ? 0.5 : 1, // Smoother on mobile
          onUpdate: (self) => {
            // Animate panel position
            gsap.set(panel, { 
              yPercent: (1 - self.progress) * 100,
              ease: "power2.out"
            });

            // Logo color transition at 50% progress
            if (self.progress >= 0.5) {
              setLogoColor(slides[i].logoColor);
              if (!isMobile) setCurrentSlide(i);
            } else {
              setLogoColor(slides[i - 1].logoColor);
              if (!isMobile) setCurrentSlide(i - 1);
            }
          },
          onLeaveBack: () => {
            setLogoColor(DEFAULT_COLOR);
            setCurrentSlide(0);
          },
          onEnter: () => {
            setLogoColor(slides[i].logoColor);
          },
        });
      });

      // Add smooth entrance animation for first panel
      gsap.fromTo(panels[0], 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setLogoColor, isMobile]);

  // Mobile swipe handlers
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const diff = touchStart - touchEnd;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      // Scroll direction detected
      if (diff > 0 && currentSlide < slides.length - 1) {
        // Swipe up - next slide
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (diff < 0 && currentSlide > 0) {
        // Swipe down - previous slide
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentGap = isMobile ? MOBILE_GAP : GAP;

  return (
    <section
      ref={wrapperRef}
      className="px-1 sm:px-2 pt-0 sm:pt-1"
      style={{ height: `${slides.length * 100}vh` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={containerRef}
        style={{
          position: "sticky",
          top: isMobile ? 4 : 8,
          height: isMobile ? "calc(100vh - 40px)" : "calc(100vh - 80px)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="ss-panel"
            style={{
              position: "absolute",
              inset: 0,
              bottom: `${(slides.length - 1 - i) * currentGap}px`,
              overflow: "hidden",
              borderRadius: isMobile 
                ? "12px 12px 20px 20px" 
                : "16px 16px 32px 32px",
              zIndex: slides.length - i,
              boxShadow: isMobile 
                ? "0 -2px 10px rgba(0,0,0,0.05)" 
                : "0 -4px 20px rgba(0,0,0,0.1)",
              transition: "border-radius 0.3s ease",
            }}
          >
            {/* Slide content */}
            {slide.content}
            
            {/* Mobile slide indicator */}
            {isMobile && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const targetScroll = idx * window.innerHeight;
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }}
                    className={`transition-all duration-300 ${
                      currentSlide === idx 
                        ? "w-6 h-1.5 bg-white/80" 
                        : "w-1.5 h-1.5 bg-white/30"
                    } rounded-full`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Slide number indicator */}
            <div className={`absolute ${isMobile ? 'top-4 right-4' : 'top-6 right-6'} z-20`}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-white/20">
                  / {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Desktop scroll indicator */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <span className="text-[9px] tracking-[0.2em] text-white/60 uppercase">
                Scroll
              </span>
              <div className="w-px h-12 bg-white/30" />
            </div>
          </div>
        )}
        
        {/* Mobile swipe instruction */}
        {isMobile && currentSlide === 0 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none animate-bounce">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">
                Swipe up
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}