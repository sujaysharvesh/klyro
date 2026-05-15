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

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      // Initial state - footer content hidden
      gsap.set(content, { yPercent: 100 });
      
      // ScrollTrigger for footer reveal
      ScrollTrigger.create({
        trigger: footer,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 1,
        onUpdate: (self) => {
          // Reveal content as user scrolls
          gsap.to(content, {
            yPercent: 100 - (self.progress * 100),
            duration: 0.1,
            ease: "power2.out"
          });
          
          // Change logo color when footer becomes visible
          if (self.progress > 0.3) {
            setLogoColor("#f5ede0");
          } else {
            setLogoColor(DEFAULT_COLOR);
          }
        },
        onLeaveBack: () => {
          setLogoColor(DEFAULT_COLOR);
          gsap.to(content, {
            yPercent: 100,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    }, footerRef);

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
      ref={footerRef}
      className="w-full min-w-full h-screen bg-[#0a0a0a] text-[#FFFFFF] font-zalando px-6 lg:px-12 flex flex-col justify-end overflow-hidden relative select-none"
    >
      
      {/* Scrolling marquee text - FIXED POSITION */}
      <div className="absolute top-150 left-0 right-0 overflow-hidden whitespace-nowrap opacity-5 pointer-events-none">
        <div className="animate-marquee text-[8rem] font-bold tracking-wider">
          KLYRO • STUDIO • EST. 2020 • CREATIVE • DIGITAL • INNOVATION • 
        </div>
      </div>
      
      {/* Content Columns Layer - GSAP animated */}
      <div ref={contentRef} className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-100 z-10 will-change-transform">
        
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
          
          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="group cursor-default">
              <div className="text-lg font-light text-white/60 group-hover:text-white/80 transition-colors">50+</div>
              <div className="text-[9px] text-white/30 tracking-wide">Projects delivered</div>
            </div>
            <div className="group cursor-default">
              <div className="text-lg font-light text-white/60 group-hover:text-white/80 transition-colors">12</div>
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
            <span className="block mt-3 text-white/20 text-[10px] tracking-wide">— KYLRO Studio</span>
          </p>
          
          {/* Current status */}
          <div className="mt-4 pt-3 flex items-center gap-3 text-[9px] text-white/30">
            <span className="hover:text-white/50 transition-colors cursor-default">Currently accepting commissions</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-white/50 transition-colors cursor-default">Open for collabs</span>
          </div>
        </div>

      </div>
      
      {/* Massive Brand Element & Metadata Layer */}
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-4 pb-6 z-10 gap-6">
        
        {/* Brand elements */}
        <div className="flex items-end gap-4 md:gap-6 w-full md:w-auto">
          {/* Scroll indicator */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
          </div>
        </div>

        {/* Legal & Meta Info Block */}
        <div className="flex flex-col space-y-6 text-right self-end md:self-auto flex-shrink-0">
          {/* Awards section */}
          <div className="hidden md:flex gap-4 justify-end mb-2">
            {awards.map((award) => (
              <div key={award.name} className="text-right group cursor-default">
                <div className="text-[9px] font-mono text-white/30 group-hover:text-white/50 transition-colors">{award.year}</div>
                <div className="text-[8px] tracking-wide text-white/20 group-hover:text-white/30 transition-colors">{award.name}</div>
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

      {/* Scroll progress indicator */}
      <div className="fixed bottom-0 left-0 bg-right-0 h-[10px] bg-gradient-to-r from-white/40 to-white/5 origin-left scale-x-0 z-50 pointer-events-none" 
        style={{ 
          transform: `scaleX(${typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) : 0})` 
        }} 
      />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}