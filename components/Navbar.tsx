"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavColor } from "@/context/NavColorProvider";

interface NavbarProps {
  open: boolean;
  onToggle: () => void;
}

export function Navbar({ open, onToggle }: NavbarProps) {
  const leftLineRef = useRef<HTMLSpanElement>(null);
  const rightLineRef = useRef<HTMLSpanElement>(null);
  const { logoColor } = useNavColor();

  const handleToggle = () => {
    gsap.fromTo(
      [leftLineRef.current, rightLineRef.current],
      { y: open ? 20 : -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
    onToggle();
  };

  const resolvedColor = open ? "#f0ede8" : logoColor;
  const burgerColor = open ? "#f0ede8" : "#0a0a0a";

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-start p-8 z-[200] pointer-events-none">
  
        {/* LOGO */}
        <div
          className="relative pointer-events-auto leading-none"
          style={{
            fontSize: "7em",
            fontWeight: 200,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            textTransform: "uppercase",
            top: -20,
            left: 8,
            color: resolvedColor,
            transition: "color 0.4s ease",
          }}
        >
          klyro
          <span
            className="absolute"
            style={{
              fontSize: "0.50em",
              fontWeight: 100,
              top: "0.1em",
              right: "-0.5em",
            }}
          >
            ®
          </span>
        </div>
  
        {/* MENU BUTTON */}
        <button
          onClick={handleToggle}
          className="flex flex-col gap-[7px] items-end pointer-events-auto cursor-pointer border-none bg-transparent group pt-1.5"
        >
          <span
            ref={leftLineRef}
            className="block h-[1.5px] transition-all duration-300 group-hover:!w-9"
            style={{
              width: open ? 32 : 36,
              background: burgerColor,
            }}
          />
  
          <span
            ref={rightLineRef}
            className="block h-[1.5px] transition-all duration-300 group-hover:!w-9"
            style={{
              width: open ? 32 : 22,
              background:burgerColor,
            }}
          />
        </button>
      </div>
  
      {/* BOTTOM LABEL */}
      <div className="fixed bottom-8 left-9 right-9 flex items-center justify-between z-[100]">
  
  <p className="text-[14px] text-[#888]">
    Design · Strategy · Performance
  </p>

  <p className="text-[14px] text-[#888]">
    Available Worldwide
  </p>

</div>
    </>
  );
}
