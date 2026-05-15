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
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        linksRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.07, ease: "power4.out", delay: 0.15 }
      );
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.65 }
      );
    } else {
      gsap.set(linksRef.current, { y: 80, opacity: 0 });
      gsap.set(footerRef.current, { opacity: 0 });
    }
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[190] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "#111111",
        clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      }}
    >
      <div className="relative h-full flex flex-col px-8 lg:px-14 pt-36 pb-10">

        {/* Nav links — large stacked type, bottom-anchored */}
        <ul className="flex-1 flex flex-col justify-end gap-0">
          {links.map((link, i) => (
            <li
              key={link.name}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              className="overflow-hidden"
            >
              <button
                onClick={onClose}
                className="group flex items-baseline gap-3 w-full text-left py-1 transition-opacity duration-200 hover:opacity-55 active:opacity-35"
              >
                <span
                  className="font-zalando font-bold uppercase leading-none text-[#f5ede0] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(36px, 8vw, 72px)" }}
                >
                  {link.name}
                </span>
                {/* {link.sub && (
                  <span
                    className="text-[#f5ede0] opacity-45 transition-opacity duration-200 group-hover:opacity-70"
                    style={{ fontSize: "clamp(18px, 2.5vw, 30px)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    ↘
                  </span>
                )} */}
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-10 pt-5 flex items-end justify-between"
          style={{ borderTop: "1px solid rgba(26,26,24,0.18)" }}
        >
          <div className="flex flex-col gap-0.5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#f5ede0] opacity-40 font-zalando">
              Inquiries
            </p>
            <a
              href="mailto:hello@klyro.in"
              className="text-[13px] text-[#f5ede0] tracking-[-0.01em] font-zalando transition-opacity duration-200 hover:opacity-50"
            >
              hello@klyro.in
            </a>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-0.5">
            <span className="text-[13px] text-[#f5ede0] font-zalando font-normal opacity-65 tabular-nums">
              {time} IST
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#f5ede0] opacity-32 font-zalando">
              Tamil Nadu, IN
            </span>
          </div>

          <p className="text-[9px] uppercase tracking-[0.18em] text-[#f5ede0] opacity-32 font-zalando">
            © 2026 Klyro Studio
          </p>
        </div>

      </div>
    </div>
  );
}