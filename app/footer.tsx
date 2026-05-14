"use client";

import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavColor } from "@/context/NavColorProvider";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_COLOR = "#000000";

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState("");
  const { setLogoColor } = useNavColor();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = wrapperRef.current;
    
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Create a single ScrollTrigger for logo color change
      ScrollTrigger.create({
        trigger: footer,
        start: "top 10%",
  end: "bottom 70%",
        onEnter: () => {
          console.log("Footer entered - changing logo color");
          setLogoColor("#f5ede0");
        },
        onLeave: () => {
          console.log("Footer left - resetting logo color");
          setLogoColor(DEFAULT_COLOR);
        },
        onEnterBack: () => {
          console.log("Footer entered from bottom - changing logo color");
          setLogoColor("#f5ede0");
        },
        onLeaveBack: () => {
          console.log("Footer left from top - resetting logo color");
          setLogoColor(DEFAULT_COLOR);
        },
        // Toggle actions to ensure it triggers properly
        toggleActions: "play none play reverse",
      });

      // Optional: Add a second trigger for when footer is fully visible
    //   ScrollTrigger.create({
    //     trigger: footer,
    //     start: "top 30%",
    //     end: "bottom 70%",
    //     onToggle: (self) => {
    //       if (self.isActive) {
    //         console.log("Footer active area - logo color changed");
    //         setLogoColor("#f5ede0");
    //       }
    //     },
    //   });
    }, footer);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setLogoColor]);

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Track mouse for glow effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "→" },
    { label: "Behance", href: "https://behance.net", icon: "→" },
    { label: "Dribbble", href: "https://dribbble.com", icon: "→" }
  ];

  const navigationLinks = [
    { label: "Services", href: "/services" },
    { label: "Works", href: "/works" },
    { label: "Team", href: "/team" }
  ];

  const secondaryLinks = [
    { label: "Blog (Coming Soon)", href: "#", isDisabled: true },
    { label: "Creative Space", href: "/creative-space" }
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" }
  ];

  const awards = [
    { name: "AWWWARDS", year: "2024" },
    { name: "CSS DA", year: "2023" },
    { name: "FWA", year: "2024" }
  ];

  return (
    <footer
    ref={wrapperRef}
     className="w-full min-w-full h-screen bg-[#000000] text-[#FFFFFF] font-zalando px-6 lg:px-12 flex flex-col justify-end overflow-hidden relative select-none">
      
      {/* Animated gradient orb following mouse */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none transition-all duration-500"
        style={{ 
          left: mousePosition.x - 192, 
          top: mousePosition.y - 192,
          opacity: 0.3
        }}
      />
      
      {/* Elegant gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Scrolling marquee line */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden whitespace-nowrap opacity-5 pointer-events-none">
        <div className="animate-marquee text-[8rem] font-bold tracking-wider">
          SIRNIK • STUDIO • EST. 2020 • CREATIVE • DIGITAL • INNOVATION • 
        </div>
      </div>
      
      {/* Content Columns Layer */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-100 z-10">
        
        {/* Column 1: Contact & Socials */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <span className="text-[10px] tracking-wider text-white/40 block mb-1">Contact</span>
            <a href="mailto:info@sirnik.co" className="text-sm font-medium hover:text-white/80 transition-all duration-300 hover:translate-x-0.5 inline-block group">
              info@sirnik.co
              <span className="block h-[1px] w-0 bg-white/40 group-hover:w-full transition-all duration-300 mt-0.5" />
            </a>
          </div>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-sm font-medium hover:text-white/60 transition-all duration-300 hover:translate-x-0.5 inline-flex items-center gap-2 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(link.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {link.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                    {link.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Added: Brief response time note */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
              <span className="text-[9px] text-white/30 tracking-wide">Response within 24h</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Map */}
        <div className="md:col-span-4">
          <span className="text-[10px] tracking-wider text-white/40 block mb-4">Navigation</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-medium hover:text-white/60 transition-all duration-300 hover:translate-x-0.5 inline-block group">
                    {link.label}
                    <span className="block h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
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
                    <a href={link.href} className="text-sm font-medium hover:text-white/60 transition-all duration-300 hover:translate-x-0.5 inline-block group">
                      {link.label}
                      <span className="block h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-0.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Added: Quick stats */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div>
              <div className="text-lg font-light text-white/60">50+</div>
              <div className="text-[9px] text-white/30 tracking-wide">Projects delivered</div>
            </div>
            <div>
              <div className="text-lg font-light text-white/60">12</div>
              <div className="text-[9px] text-white/30 tracking-wide">Global awards</div>
            </div>
          </div>
        </div>

        {/* Column 3: Spacer for visual asymmetry */}
        <div className="hidden md:block md:col-span-1" />

        {/* Column 4: Editorial Studio Note */}
        <div className="md:col-span-4 space-y-2">
          <span className="text-[10px] tracking-wider text-white/40 block">Studio Note</span>
          <p className="text-sm font-light text-white/80 leading-relaxed max-w-sm hover:text-white/90 transition-colors duration-500">
            This space brings together work we've done and work we're currently doing, along with conversations that continue beyond individual projects. If it feels right, this can be the starting point
            <span className="block mt-3 text-white/20 text-[10px] tracking-wide">— SIRNIK Studio</span>
          </p>
          
          {/* Added: Current status */}
          <div className="mt-4 pt-3 flex items-center gap-3 text-[9px] text-white/30">
            <span>Currently accepting commissions</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Open for collabs</span>
          </div>
        </div>

      </div>

      {/* Massive Brand Element & Metadata Layer */}
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-4 pb-6 z-10 gap-6">
        
        {/* Massive Typography combined with Framed Image - Enhanced */}
        <div className="flex items-end gap-4 md:gap-6 w-full md:w-auto">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
          <div className="text-[8px] tracking-[0.2em] text-white/20 uppercase">
            Est. 2020
          </div>
          {/* Added: Scroll indicator */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[8px] tracking-wider text-white/20">∞</span>
          </div>
        </div>

        {/* Added: Current time display */}
        <div className="text-[10px] tracking-wider text-white/30 font-mono">
          {currentTime} • LOCAL TIME
        </div>

        {/* Legal & Meta Info Block */}
        <div className="flex flex-col space-y-6 text-right self-end md:self-auto flex-shrink-0">
          {/* Added: Awards section */}
          <div className="hidden md:flex gap-4 justify-end mb-2">
            {awards.map((award) => (
              <div key={award.name} className="text-right">
                <div className="text-[9px] font-mono text-white/30">{award.year}</div>
                <div className="text-[8px] tracking-wide text-white/20">{award.name}</div>
              </div>
            ))}
          </div>
          
          <ul className="space-y-1 text-left md:text-right">
            {legalLinks.map((link, index) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="text-xs font-medium text-white/80 hover:text-white transition-all duration-300 hover:tracking-wider inline-block"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="hidden md:inline mx-2 text-white/20 text-xs">/</span>
                )}
              </li>
            ))}
          </ul>
          
          <div className="text-[10px] tracking-wide text-white/30 text-left md:text-right font-light hover:text-white/40 transition-colors">
            © {new Date().getFullYear()} SIRNIK. All rights reserved.
          </div>
        </div>

      </div>

      {/* Elegant corner accents */}
      <div className="absolute bottom-6 right-6 w-16 h-16 opacity-20 pointer-events-none">
        <div className="w-full h-full border-r border-b border-white/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/30" />
      </div>
      
      <div className="absolute top-6 left-6 w-16 h-16 opacity-20 pointer-events-none">
        <div className="w-full h-full border-l border-t border-white/30" />
        <div className="absolute top-0 left-0 w-2 h-2 bg-white/30" />
      </div>

      {/* Added: Bottom navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-white/40" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}