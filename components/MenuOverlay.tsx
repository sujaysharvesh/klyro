"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MenuLink {
  name: string;
  sub: string;
}

interface MenuOverlayProps {
  open: boolean;
  time: string;
  onClose: () => void;
  links: MenuLink[];
}

export function MenuOverlay({ open, time, onClose, links }: MenuOverlayProps) {
  const linksRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        linksRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[190] bg-[#0c0b09] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
    >
      <div className="relative h-full flex flex-col px-6 lg:px-12 pt-[140px] pb-10">

        {/* Links */}
        <div className="flex-1 flex flex-col lg:flex-row justify-between items-start gap-12">
          <ul className="flex flex-col w-full lg:w-1/2">
            {links.map((link, i) => (
              <li
                key={link.name}
                ref={(el) => (linksRef.current[i] = el!)}
                className="border-b border-white/5 overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="w-full py-7 px-8 group flex flex-col items-start transition-all duration-500 ease-out hover:bg-[#f0ede8]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-[1px] bg-[#333] transition-all duration-500 group-hover:w-12 group-hover:bg-black" />
                    <span className="text-[9px] font-medium tracking-[0.2em] text-[#444] transition-colors duration-300 group-hover:text-black font-zalando">
                      0{i + 1}
                    </span>
                  </div>

                  <span
                    className="font-zalando font-semibold text-[#888] uppercase leading-none transition-colors duration-300 group-hover:text-black"
                    style={{ fontSize: "clamp(24px, 4vw, 48px)", letterSpacing: "-0.01em" }}
                  >
                    {link.name}
                  </span>

                  <div className="mt-2 overflow-hidden">
                    <span className="font-zalando block text-[9px] uppercase tracking-[0.2em] text-[#333] transition-all duration-500 group-hover:text-black/50 group-hover:translate-x-1">
                      {link.sub}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-end pt-10 border-t border-[#1c1c1a] mt-auto">
          <div className="flex flex-col gap-1">
            <p className="font-zalando text-[10px] uppercase tracking-[0.2em] text-[#3a3a38]">Inquiries</p>
            <a href="mailto:hello@klyro.in" className="font-zalando text-[14px] text-[#f0ede8] tracking-[-0.01em] hover:text-[#666] transition-colors">
              hello@klyro.in
            </a>
          </div>

          <div className="hidden lg:block text-center text-[11px] text-[#3a3a38] tracking-[0.06em]">
            <strong className="font-zalando block text-[14px] text-[#f0ede8] font-normal mb-0.5">
              {time} IST
            </strong>
            Tamil Nadu, IN
          </div>

          <div className="text-right">
            <p className="font-zalando text-[10px] text-[#3a3a38] tracking-[0.16em]">© 2026 KLYRO STUDIO</p>
          </div>
        </div>

      </div>
    </div>
  );
}