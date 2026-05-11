"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Work1 from "./work/work1";
import Work2 from "./work/work2";
import Work3 from "./work/work3";
import Work4 from "./work/work4";
import { useNavColor } from "@/context/NavColorProvider";

gsap.registerPlugin(ScrollTrigger);

const GAP = 8;

const slides: {
  content: React.ReactNode;
  alt: string;
  logoColor: string; // <-- pass any hex/rgb/hsl per slide
}[] = [
  { content: <Work1 />, alt: "Slide 1", logoColor: "#f5ede0" }, // default dark
  { content: <Work2 />, alt: "Slide 2", logoColor: "#f0ede8" }, // light on dark bg
  { content: <Work3 />, alt: "Slide 3", logoColor: "#3d4f2e" }, // red accent
  // { content: <Work4 />, alt: "Slide 4", logoColor: "#1E3A34" }, // teal
];

const DEFAULT_COLOR = "#000000";

export default function Works() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setLogoColor } = useNavColor();

  useLayoutEffect(() => {
    // Set color for the first slide immediately
    // setLogoColor(slides[0].logoColor);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".ss-panel");

      panels.forEach((panel, i) => {
        if (i === 0) return;

        gsap.set(panel, { yPercent: 110 });

        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: `top+=${(i - 1) * window.innerHeight} top`,
          end: `top+=${i * window.innerHeight} top`,
          scrub: true,
          // When this slide is more than 50% in, switch the logo color
          onUpdate: (self) => {
            gsap.set(panel, { yPercent: (1 - self.progress) * 100 });

            // Crossover at 50% progress — new slide is dominant
            if (self.progress >= 0.8) {
              setLogoColor(slides[i].logoColor);
            } else {
              setLogoColor(slides[i - 1].logoColor);
            }
          },
          onLeaveBack: () => {
            // Scrolled back above this trigger entirely
            setLogoColor(DEFAULT_COLOR);
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [setLogoColor]);

  return (
    <section
      ref={wrapperRef}
      className="px-2 pt-1"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div
        style={{
          position: "sticky",
          top: 8,
          height: "calc(100vh - 80px)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="ss-panel"
            style={{
              position: "absolute",
              inset: 0,
              bottom: `${(slides.length - 1 - i) * GAP}px`,
              overflow: "hidden",
              borderRadius: "16px 16px 32px 32px",
              zIndex: i + 1,
            }}
          >
            {slide.content}
          </div>
        ))}
      </div>
    </section>
  );
}