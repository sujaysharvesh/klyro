"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ];

  const navigationLinks = [
    { label: "Services", href: "/services" },
    { label: "Works", href: "/works" },
    { label: "Team", href: "/team" },
  ];

  const secondaryLinks = [
    { label: "Blog (Coming Soon)", href: "#", isDisabled: true },
    { label: "Creative Space", href: "/creative-space" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
  ];

  const awards = [
    { name: "AWWWARDS", year: "2024" },
    { name: "CSS DA", year: "2023" },
    { name: "FWA", year: "2024" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] text-white font-zalando px-5 sm:px-8 lg:px-12 flex flex-col justify-end overflow-hidden relative select-none">

      {/* Scrolling marquee text */}
      <div className="absolute top-1 sm:top-10 left-0 right-0 overflow-hidden whitespace-nowrap opacity-5 pointer-events-none">
        <div className="animate-marquee text-[4rem] sm:text-[6rem] lg:text-[8rem] font-bold tracking-wider">
          KLYRO • STUDIO • EST. 2020 • CREATIVE • DIGITAL • INNOVATION •&nbsp;
        </div>
      </div>

      {/* Corner accents */}
      {/* <div className="absolute top-6 left-6 w-10 h-10 sm:w-16 sm:h-16 opacity-20 pointer-events-none">
        <div className="w-full h-full border-l border-t border-white/30" />
        <div className="absolute top-0 left-0 w-2 h-2 bg-white/30" />
      </div> */}

      {/* Content Columns */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pt-24 sm:pt-32 pb-8 z-10">

        {/* Column 1: Contact & Socials */}
        <div className="sm:col-span-1 lg:col-span-3  lg:-translate-y-10 space-y-4">
          <div>
            <span className="text-[10px] tracking-wider text-white/40 block mb-1">Contact</span>
            <a
              href="mailto:info@sirnik.co"
              className="text-sm font-medium hover:text-white/80 transition-all duration-300 inline-block group"
            >
              info@sirnik.co
              <span className="block h-[1px] w-0 bg-white/40 group-hover:w-full transition-all duration-300 mt-0.5" />
            </a>
          </div>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium hover:text-white/60 transition-all duration-300 inline-flex items-center gap-2 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Navigation */}
        <div className="sm:col-span-1 lg:col-span-4 lg:-translate-y-10">
          <span className="text-[10px] tracking-wider text-white/40 block mb-4">Navigation</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium hover:text-white/60 transition-all duration-300 inline-block group"
                  >
                    {link.label}
                    <span className="block h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 lg:-translate-y-10">
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  {link.isDisabled ? (
                    <span className="text-sm font-medium text-white/30 cursor-not-allowed relative group">
                      {link.label}
                      <span className="absolute bottom-full left-0 mb-2 px-2 py-1 text-[10px] bg-white/10 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Coming soon ✨
                      </span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm font-medium hover:text-white/60 transition-all duration-300 inline-block group"
                    >
                      {link.label}
                      <span className="block h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-0.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick stats */}
          {/* <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="group cursor-default">
              <div className="text-lg font-light text-white/60 group-hover:text-white/80 transition-colors">50+</div>
              <div className="text-[9px] text-white/30 tracking-wide">Projects delivered</div>
            </div>
            <div className="group cursor-default lg:-translate-y-20">
              <div className="text-lg font-light text-white/60 group-hover:text-white/80 transition-colors " >12</div>
              <div className="text-[9px] text-white/30 tracking-wide">Global awards</div>
            </div>
          </div> */}
        </div>

        {/* Spacer — desktop only */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Column 3: Studio Note */}
        <div className="sm:col-span-2 lg:col-span-4 space-y-2 lg:-translate-y-10">
          <span className="text-[10px] tracking-wider text-white/40 block">Studio Note</span>
          <p className="text-sm font-light text-white/80 leading-relaxed max-w-sm hover:text-white/90 transition-colors duration-500">
            This space brings together work we've done and work we're currently doing, along with
            conversations that continue beyond individual projects. If it feels right, this can be
            the starting point.
            <span className="block mt-3 text-white/20 text-[10px] tracking-wide">— KYLRO Studio</span>
          </p>

          <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] text-white/30">
            <span className="hover:text-white/50 transition-colors cursor-default">Currently accepting commissions</span>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block" />
            <span className="hover:text-white/50 transition-colors cursor-default">Open for collabs</span>
            {currentTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block" />
                <span className="hover:text-white/50 transition-colors cursor-default font-mono">{currentTime}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/10 pt-2 pb-6 z-10 gap-6 lg:-translate-y-10">

        {/* Awards — hidden on mobile */}
        <div className="hidden sm:flex gap-4 items-end">
          {awards.map((award) => (
            <div key={award.name} className="group cursor-default">
              <div className="text-[9px] font-mono text-white/30 group-hover:text-white/50 transition-colors">{award.year}</div>
              <div className="text-[8px] tracking-wide text-white/20 group-hover:text-white/30 transition-colors">{award.name}</div>
            </div>
          ))}
        </div>

        {/* Legal & copyright */}
        <div className="flex flex-col gap-3 sm:items-end ">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.label} className="flex items-center gap-3">
                <a
                  href={link.href}
                  className="text-xs font-medium text-white/80 hover:text-white transition-all duration-300 hover:tracking-wider inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-[10px] tracking-wide text-white/30 font-light hover:text-white/40 transition-colors">
            © {new Date().getFullYear()} KLYRO. All rights reserved.
          </div>
        </div>
      </div>

      {/* Corner accent bottom-right */}
      {/* <div className="absolute bottom-6 right-6 w-10 h-10 sm:w-16 sm:h-16 opacity-20 pointer-events-none">
        <div className="w-full h-full border-r border-b border-white/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/30" />
      </div> */}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </footer>
  );
}