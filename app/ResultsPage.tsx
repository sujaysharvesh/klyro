"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);
import { useNavColor } from "@/context/NavColorProvider";

const CASES = [
  {
    brand: "Luxe Apparel",
    industry: "E-commerce",
    year: "2024",
    service: "Branding + Campaigns",
    desc: "Re-engineered their digital storefront and visual identity, focusing on high-conversion animations and a complete brand refresh.",
    growth: [45, 62, 88, 95],
    stat: "+112%",
    label: "Revenue Increase",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [38, 40, 37, 42, 41, 43, 44, 45, 47, 46, 49, 50],
    after:  [38, 48, 61, 78, 97,118,140,164,188,210,234,258],
    bgColor: "#0F0F0F",
    textColor: "#f5ede0",
    accentColor: "#f5ede0",
    chartLineColor: "#f5ede0",
    chartGridColor: "rgba(245,237,224,0.15)",
    logoColor: "#f5ede0"
  },
  {
    brand: "Nova Tech",
    industry: "SaaS",
    year: "2023",
    service: "UI/UX + Development",
    desc: "Scaled their DevOps infrastructure and implemented a custom UI library for their dashboard product used by 40k+ daily users.",
    growth: [20, 35, 55, 78],
    stat: "4.2×",
    label: "User Engagement",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [12, 13, 12, 14, 15, 13, 16, 14, 17, 15, 18, 16],
    after:  [12, 17, 25, 36, 50, 66, 83,102,124,148,173,200],
    bgColor: "#3d4f2e",
    textColor: "#f5ede0",
    accentColor: "#f5ede0",
    chartLineColor: "#f5ede0",
    chartGridColor: "rgba(245,237,224,0.15)",
    logoColor: "#f0ede8" 
  },
  {
    brand: "Studio Mamma",
    industry: "Creative Agency",
    year: "2025",
    service: "Webflow + SEO",
    desc: "Strategic SEO and content overhaul paired with a high-performance Webflow implementation and a comprehensive art direction system.",
    growth: [30, 40, 70, 92],
    stat: "+240%",
    label: "Search Visibility",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [8,  9,  8, 10, 11,  9, 12, 10, 13, 11, 14, 12],
    after:  [8, 12, 19, 30, 46, 65, 87,112,140,170,202,237],
    bgColor: "#DCD7C9",
    textColor: "#3d4f2e",
    accentColor: "#3d4f2e",
    chartLineColor: "#3d4f2e",
    chartGridColor: "rgba(61,79,46,0.12)",
    logoColor: "#3d4f2e"
  },
];

function LineChart({ c, theme }: { c: (typeof CASES)[0], theme: { lineColor: string, gridColor: string, textColor: string } }) {
  const data = {
    labels: c.months,
    datasets: [
      {
        label: "After",
        data: c.after,
        borderColor: theme.lineColor,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, `${theme.lineColor}00`);
          gradient.addColorStop(0.4, `${theme.lineColor}08`);
          gradient.addColorStop(1, `${theme.lineColor}18`);
          return gradient;
        },
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.lineColor,
        pointHoverBorderColor: theme.lineColor,
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
        order: 1,
      },
      {
        label: "Before",
        data: c.before,
        borderColor: `${theme.lineColor}40`,
        backgroundColor: "transparent",
        borderWidth: 1.8,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: `${theme.lineColor}80`,
        pointHoverBorderColor: theme.lineColor,
        pointHoverBorderWidth: 1.5,
        tension: 0.3,
        fill: false,
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme.textColor === "#f5ede0" ? "#1a1a1a" : "#ffffff",
        titleColor: theme.textColor === "#f5ede0" ? "#f5ede0" : "#1a1a1a",
        bodyColor: theme.textColor === "#f5ede0" ? "rgba(245,237,224,0.7)" : "rgba(0,0,0,0.7)",
        borderColor: theme.lineColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        titleFont: { size: 11, weight: "bold" },
        bodyFont: { size: 10 },
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          font: { size: 9, weight: "400" }, 
          color: theme.gridColor, 
          maxRotation: 0, 
          autoSkip: true,
          padding: 8,
        },
      },
      y: {
        grid: { 
          color: theme.gridColor, 
          drawBorder: false,
          lineWidth: 0.5,
        },
        ticks: { 
          display: false,
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        capBezierPoints: true,
      },
    },
  };

  return <div className="h-[280px] w-full"><Line data={data} options={options} /></div>;
}

export default function ResultsPage() {
  const { setLogoColor } = useNavColor();
  const DEFAULT_COLOR = "#000000";
  
  const [active, setActive] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = CASES[active];
  const theme = {
    lineColor: c.chartLineColor,
    gridColor: c.chartGridColor,
    textColor: c.textColor,
  };

  // Update logo color only after user has scrolled
  useEffect(() => {
    if (hasScrolled) {
      setLogoColor(c.logoColor);
    }
    
    // Cleanup function to reset logo color when component unmounts
    return () => {
      setLogoColor(DEFAULT_COLOR);
    };
  }, [active, hasScrolled, setLogoColor, c.logoColor, DEFAULT_COLOR]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);

      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - sectionTop;
      const zoneHeight = window.innerHeight;
      
      let newIndex = Math.floor(scrolled / zoneHeight);
      newIndex = Math.min(CASES.length - 1, Math.max(0, newIndex));
      
      // Set hasScrolled to true once user actually scrolls
      if (scrolled > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
      
      if (newIndex !== active) {
        setActive(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [active, hasScrolled]);

  return (
    <>
      <div
        ref={sectionRef}
        style={{ height: `${CASES.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.main
            animate={{
              backgroundColor: c.bgColor,
              color: c.textColor,
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="h-full px-6 lg:px-12 py-10 flex flex-col selection:bg-black selection:text-white"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-8 translate-y-20">
              <h1 className="text-[15px] tracking-[0.12em] opacity-70">Capabilities</h1>
              <p className="text-[15px] opacity-70 hidden lg:block">Since 2019</p>
            </div>

            {/* Scroll hint */}
            <AnimatePresence>
              {active === 0 && !hasScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] opacity-40">
                    Scroll to explore results
                  </span>
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="opacity-30 text-xs"
                  >
                    ↓
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 flex-1 min-h-0">

              {/* LEFT: Brand list */}
              <div className="w-full lg:w-[420px] flex flex-col justify-center space-y-0">
                {CASES.map((item, i) => (
                  <div
                    key={item.brand}
                    className="relative py-7 border-b transition-colors duration-500"
                    style={{ borderBottomColor: `${c.textColor}10` }}
                  >
                    {/* Progress bar on active item */}
                    {active === i && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-0 bottom-0 w-[2px]"
                        style={{ backgroundColor: c.accentColor }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                      />
                    )}

                    <div className="flex items-baseline gap-6 pl-4">
                      <motion.span
                        animate={{
                          opacity: active === i ? 0.8 : 0.2,
                          color: active === i ? c.accentColor : undefined,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-[11px] font-mono"
                      >
                        0{i + 1}
                      </motion.span>
                      <div>
                        <motion.h2
                          animate={{
                            opacity: active === i ? 1 : 0.15,
                            x: active === i ? 4 : 0,
                            color: active === i ? c.accentColor : undefined,
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-4xl lg:text-5xl font-black uppercase tracking-tighter"
                        >
                          {item.brand}
                        </motion.h2>

                        <AnimatePresence mode="wait">
                          {active === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, y: -10 }}
                              animate={{ height: "auto", opacity: 1, y: 0 }}
                              exit={{ height: 0, opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1.5">
                                  {item.service}
                                </p>
                                <p className="text-sm opacity-60 leading-relaxed font-light max-w-xs">
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination dots */}
                <div className="flex gap-2 pt-6 pl-4">
                  {CASES.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: active === i ? 24 : 8,
                        backgroundColor: active === i ? c.accentColor : `${c.textColor}20`,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-[2px] rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: Chart panel */}
              <div className="flex-1 flex flex-col justify-center min-h-0">
                <motion.div
                  animate={{
                    backgroundColor: c.textColor === "#f5ede0" ? `${c.bgColor}CC` : "white",
                    borderColor: `${c.textColor}10`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-3xl p-8 lg:p-10 border relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]"
                  style={{
                    backgroundColor: c.textColor === "#f5ede0" ? `${c.bgColor}CC` : "rgba(255,255,255,0.9)",
                    backdropFilter: c.textColor === "#f5ede0" ? "blur(10px)" : "none",
                  }}
                >

                  {/* Top stat bar */}
                  <AnimatePresence mode="wait">
                    <div className="flex justify-between items-start mb-10">
                      <div className="space-y-1">
                        <motion.p
                          key={`label-${active}`}
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 0.5 }}
                          transition={{ duration: 0.4, delay: 0.05 }}
                          className="text-[10px] uppercase tracking-[0.2em]"
                        >
                          Performance Metrics
                        </motion.p>
                        <motion.h3
                          key={`brand-${active}`}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="text-2xl font-bold tracking-tight"
                          style={{ color: c.textColor === "#f5ede0" ? "#f5ede0" : "#1a1a1a" }}
                        >
                          {c.brand}
                        </motion.h3>
                        <motion.p
                          key={`industry-${active}`}
                          initial={{ y: 6, opacity: 0 }}
                          animate={{ y: 0, opacity: 0.5 }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                          className="text-[11px]"
                        >
                          {c.industry} · {c.year}
                        </motion.p>
                      </div>

                      <motion.div
                        key={`stat-${active}`}
                        initial={{ scale: 0.85, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.2 }}
                        className="px-5 py-4 rounded-2xl flex flex-col items-end"
                        style={{ backgroundColor: c.accentColor, color: c.textColor === "#f5ede0" ? "#0F0F0F" : "#f5ede0" }}
                      >
                        <span className="text-3xl font-black tracking-tighter">{c.stat}</span>
                        <span className="text-[9px] uppercase tracking-widest opacity-60 mt-0.5">{c.label}</span>
                      </motion.div>
                    </div>
                  </AnimatePresence>

                  {/* Chart Legend */}
                  <div className="flex justify-end gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-[2px]" style={{ backgroundColor: theme.lineColor }}></div>
                      <span className="text-[10px] uppercase tracking-wider opacity-50">After</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-[2px]" style={{ backgroundColor: `${theme.lineColor}30` }}></div>
                      <span className="text-[10px] uppercase tracking-wider opacity-40">Before</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`chart-${active}`}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                    >
                      <LineChart c={c} theme={theme} />
                    </motion.div>
                  </AnimatePresence>

                  {/* Quarterly pips */}
                  <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderTopColor: `${c.textColor}15` }}>
                    {c.growth.map((g, i) => (
                      <motion.div
                        key={`${active}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                        className="space-y-1"
                      >
                        <p className="text-[9px] uppercase tracking-tighter opacity-40">Q{i + 1}</p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 + i * 0.07 }}
                          className="text-sm font-bold"
                        >
                          +{g}%
                        </motion.p>
                        <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ backgroundColor: `${c.textColor}10` }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${g}%` }}
                            transition={{ delay: 0.35 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                            className="h-full"
                            style={{ backgroundColor: c.accentColor }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.main>
        </div>
      </div>
    </>
  );
}