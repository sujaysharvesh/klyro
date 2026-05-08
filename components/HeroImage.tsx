"use client";

import Image from "next/image";

interface HeroImageProps {
  /** When true: dark bg + gradient + label fade in */
  open: boolean;
}

export function HeroImage({ open }: HeroImageProps) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        right: 40,
        top: "50%",
        transform: "translateY(-50%)",
        width: 320,
        height: 420,
        zIndex: 195,  /* above overlay (190), below nav (200) */
      }}
    >
      <div
        className="relative w-full h-full rounded-sm overflow-hidden transition-colors duration-500"
        style={{ background: open ? "#151515" : "transparent" }}
      >
        <Image
          src="/cat.png"
          alt="Preview"
          fill
          className={`object-cover transition-all duration-700 ${
            open
              ? "grayscale opacity-80 hover:opacity-100 hover:grayscale-0"
              : "grayscale hover:grayscale-0"
          }`}
        />

        {/* gradient — fades in with overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(to top, rgba(12,11,9,0.55) 0%, transparent 60%)",
            opacity: open ? 1 : 0,
          }}
        />

        {/* label */}
        <p
          className="absolute bottom-5 left-5 font-zalando text-[10px] uppercase tracking-[0.18em] transition-opacity duration-500"
          style={{ color: "rgba(255,255,255,0.45)", opacity: open ? 1 : 0 }}
        >
          Selected Works '26
        </p>
      </div>
    </div>
  );
}