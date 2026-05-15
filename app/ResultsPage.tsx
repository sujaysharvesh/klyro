"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavColor } from "@/context/NavColorProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);
gsap.registerPlugin(ScrollTrigger);

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
    logoColor: "#f5ede0",
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
    logoColor: "#f0ede8",
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
    logoColor: "#3d4f2e",
  },
];

const DEFAULT_COLOR = "#000000";

// ─── Chart with Animation ────────────────────────────────────────────────────

const LineChart = React.memo(function LineChart({
  c,
  theme,
  isActive,
}: {
  c: (typeof CASES)[0];
  theme: { lineColor: string; gridColor: string; textColor: string };
  isActive: boolean;
}) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const chartRef = useRef<any>(null);

  // Animate chart data when it becomes active
  useEffect(() => {
    if (isActive) {
      setAnimationProgress(0);
      const startTime = performance.now();
      const duration = 1000; // 1 second animation

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setAnimationProgress(easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isActive, c.brand]);

  // Animated data
  const animatedAfter = React.useMemo(() => {
    return c.after.map(value => value * animationProgress);
  }, [c.after, animationProgress]);

  const animatedBefore = React.useMemo(() => {
    return c.before.map(value => value * animationProgress);
  }, [c.before, animationProgress]);

  const data = React.useMemo(() => ({
    labels: c.months,
    datasets: [
      {
        label: "After",
        data: animatedAfter,
        borderColor: theme.lineColor,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;
          const g = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          g.addColorStop(0, `${theme.lineColor}00`);
          g.addColorStop(0.4, `${theme.lineColor}08`);
          g.addColorStop(1, `${theme.lineColor}25`);
          return g;
        },
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: theme.lineColor,
        pointHoverBorderColor: theme.lineColor,
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
        order: 1,
      },
      {
        label: "Before",
        data: animatedBefore,
        borderColor: `${theme.lineColor}40`,
        backgroundColor: "transparent",
        borderWidth: 1.8,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: `${theme.lineColor}80`,
        pointHoverBorderColor: theme.lineColor,
        pointHoverBorderWidth: 1.5,
        tension: 0.3,
        fill: false,
        order: 2,
      },
    ],
  }), [c, theme.lineColor, animatedAfter, animatedBefore]);

  const options = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 }, // Disable default animation
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme.textColor === "#f5ede0" ? "#1a1a1a" : "#ffffff",
        titleColor: theme.textColor === "#f5ede0" ? "#f5ede0" : "#1a1a1a",
        bodyColor: theme.textColor === "#f5ede0"
          ? "rgba(245,237,224,0.7)"
          : "rgba(0,0,0,0.7)",
        borderColor: theme.lineColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        titleFont: { size: 11, weight: "bold" as const },
        bodyFont: { size: 10 },
        callbacks: {
          label: (ctx: any) => `${ctx.dataset.label}: ${Math.round(ctx.raw)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 9, weight: "400" as const },
          color: theme.gridColor,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
          padding: 8,
        },
      },
      y: {
        grid: { color: theme.gridColor, lineWidth: 0.5 },
        ticks: { display: false },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        borderJoin: 'round' as const,
        borderCap: 'round' as const,
      },
    },
  }), [theme]);

  return (
    <div className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px]">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const { setLogoColor } = useNavColor();
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    return () => setLogoColor(DEFAULT_COLOR);
  }, [setLogoColor]);

  const goTo = useCallback((idx: number) => {
    if (rafRef.current !== undefined) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined;
      if (idx === activeRef.current) return;
      activeRef.current = idx;
      setActive(idx);
      setLogoColor(CASES[idx].logoColor);
    });
  }, [setLogoColor]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      CASES.forEach((_, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: () => `top+=${(i - 1) * window.innerHeight} top`,
          end:   () => `top+=${i       * window.innerHeight} top`,
          scrub: 0.3,
          onUpdate(self) {
            if (self.progress >= 0.5) {
              if (activeRef.current !== i)     goTo(i);
            } else {
              if (activeRef.current !== i - 1) goTo(i - 1);
            }
          },
          onLeave()     { goTo(i); },
          onEnterBack() { goTo(i); },
          onLeaveBack() { goTo(i - 1); },
        });
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end:   "top top+=1",
        onEnter()     { setLogoColor(CASES[0].logoColor); },
        onLeaveBack() { setLogoColor(DEFAULT_COLOR); },
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "bottom bottom",
        end:   "bottom top",
        onLeave()     { setLogoColor(DEFAULT_COLOR); },
        onEnterBack() { setLogoColor(CASES[CASES.length - 1].logoColor); },
      });
    }, wrapperRef);

    return () => {
      ctx.revert();
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [goTo, setLogoColor, isMobile]);

  const c = CASES[active];
  const theme = {
    lineColor: c.chartLineColor,
    gridColor: c.chartGridColor,
    textColor: c.textColor,
  };
  const isDark = c.textColor === "#f5ede0";

  // Mobile simple scroll view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black">
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="flex justify-between items-center px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/45">
              Capabilities
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Since 2019
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-4 py-6 pb-24">
          {CASES.map((item, idx) => (
            <motion.div
              key={item.brand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest opacity-40" style={{ color: item.textColor }}>
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.22em] opacity-40" style={{ color: item.textColor }}>
                    {item.service}
                  </span>
                </div>

                <h2 className="text-[28px] font-black uppercase tracking-[-0.04em] leading-none mb-3" style={{ color: item.textColor }}>
                  {item.brand}
                </h2>

                <p className="text-[12px] opacity-55 leading-relaxed mb-4" style={{ color: item.textColor }}>
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] opacity-40" style={{ color: item.textColor }}>{item.industry}</span>
                  <span className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: item.textColor }} />
                  <span className="text-[10px] opacity-40" style={{ color: item.textColor }}>{item.year}</span>
                </div>

                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: `${item.accentColor}20` }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-widest opacity-55" style={{ color: item.textColor }}>
                      {item.label}
                    </span>
                    <span className="text-2xl font-black tracking-tight" style={{ color: item.accentColor }}>
                      {item.stat}
                    </span>
                  </div>
                </div>

                <div className="h-[200px] mb-4">
                  <LineChart c={item} theme={{
                    lineColor: item.chartLineColor,
                    gridColor: item.chartGridColor,
                    textColor: item.textColor,
                  }} isActive={true} />
                </div>

                <div className="grid grid-cols-4 gap-2 pt-3">
                  {item.growth.map((g, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[7px] uppercase tracking-tight opacity-35" style={{ color: item.textColor }}>Q{i + 1}</p>
                      <p className="text-[11px] font-bold" style={{ color: item.textColor }}>+{g}%</p>
                      <div className="h-[1.5px] w-full rounded-full overflow-hidden" style={{ backgroundColor: `${item.textColor}10` }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${g}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.accentColor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 py-3 px-4">
          <div className="flex justify-between items-center">
            <p className="text-[9px] text-white/40">{active + 1} / {CASES.length}</p>
            <div className="flex gap-2">
              {CASES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActive(idx);
                    setLogoColor(CASES[idx].logoColor);
                  }}
                  className={`transition-all duration-300 ${
                    active === idx ? "w-8 h-1 bg-white" : "w-1.5 h-1 bg-white/30"
                  } rounded-full`}
                />
              ))}
            </div>
            <p className="text-[9px] text-white/40">Swipe ↑</p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Original layout with full graph
  return (
    <div
      ref={wrapperRef}
      style={{ height: `${CASES.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.main
          animate={{ backgroundColor: c.bgColor, color: c.textColor }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="h-full flex flex-col"
        >
          {/* ── TOP BAR ── */}
          <div className="flex justify-between items-center px-5 sm:px-8 lg:px-12 pt-5 sm:pt-6 lg:pt-10 pb-0 mt-16 sm:mt-18 lg:mt-20">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium opacity-45">
              Capabilities
            </p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] opacity-30 hidden lg:block">
              Since 2019
            </p>
          </div>

          {/* ── BODY ── */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-16 flex-1 min-h-0 px-5 sm:px-8 lg:px-12 pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-10">

            {/* LEFT: brand list */}
            <div className="w-full lg:w-[420px] flex flex-col justify-center shrink-0">
              <AnimatePresence>
                {active === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 mb-3 sm:mb-5"
                  >
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-30">
                      Scroll to explore
                    </span>
                    <motion.span
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                      className="opacity-25 text-xs"
                    >
                      ↓
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col">
                {CASES.map((item, i) => (
                  <div
                    key={item.brand}
                    className="relative py-3 sm:py-4 lg:py-6 cursor-pointer"
                    style={{ borderBottom: `1px solid ${c.textColor}10` }}
                    onClick={() => goTo(i)}
                  >
                    {active === i && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-0 bottom-0 w-[1.5px]"
                        style={{ backgroundColor: c.accentColor }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                      />
                    )}

                    <div className="flex items-baseline gap-3 sm:gap-5 pl-4 sm:pl-5">
                      <motion.span
                        animate={{ opacity: active === i ? 0.6 : 0.15 }}
                        transition={{ duration: 0.25 }}
                        className="text-[9px] sm:text-[10px] font-mono tracking-widest shrink-0"
                      >
                        0{i + 1}
                      </motion.span>

                      <div className="flex-1 min-w-0">
                        <motion.h2
                          animate={{
                            opacity: active === i ? 1 : 0.12,
                            x: active === i ? 4 : 0,
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="font-black uppercase tracking-[-0.04em] leading-none"
                          style={{
                            fontSize: "clamp(20px, 4vw, 48px)",
                            color: active === i ? c.accentColor : undefined,
                          }}
                        >
                          {item.brand}
                        </motion.h2>

                        <AnimatePresence mode="wait">
                          {active === i && (
                            <motion.div
                              key={`desc-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 sm:pt-3 space-y-1">
                                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] opacity-40">
                                  {item.service}
                                </p>
                                <p className="hidden sm:block text-[12px] sm:text-[13px] opacity-55 leading-relaxed font-light max-w-[280px]">
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
              </div>

              <div className="flex gap-2 pt-3 sm:pt-5 pl-4 sm:pl-5">
                {CASES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: active === i ? 20 : 6,
                      backgroundColor: active === i ? c.accentColor : `${c.textColor}20`,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-[1.5px] rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Full graph card */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <motion.div
                animate={{
                  borderColor: `${c.textColor}10`,
                  backgroundColor: isDark
                    ? `${c.bgColor}CC`
                    : "rgba(255,255,255,0.88)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border relative overflow-hidden w-full"
                style={{
                  backdropFilter: isDark ? "blur(12px)" : "none",
                  boxShadow: isDark
                    ? "0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 80px -20px rgba(0,0,0,0.4)"
                    : "0 40px 80px -20px rgba(0,0,0,0.08)",
                }}
              >
                {/* Card header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3 flex-wrap">
                  <div className="space-y-0.5 min-w-0">
                    <motion.p
                      key={`lbl-${active}`}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.4 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em]"
                    >
                      Performance Metrics
                    </motion.p>
                    <motion.h3
                      key={`brand-${active}`}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="text-base sm:text-lg lg:text-xl font-black uppercase tracking-[-0.03em]"
                    >
                      {c.brand}
                    </motion.h3>
                    <motion.p
                      key={`ind-${active}`}
                      initial={{ y: 4, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.4 }}
                      transition={{ duration: 0.25, delay: 0.12 }}
                      className="text-[10px] sm:text-[11px]"
                    >
                      {c.industry} · {c.year}
                    </motion.p>
                  </div>

                  <motion.div
                    key={`stat-${active}`}
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 26,
                      delay: 0.15,
                    }}
                    className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl flex flex-col items-end shrink-0"
                    style={{
                      backgroundColor: c.accentColor,
                      color: isDark ? "#0F0F0F" : "#f5ede0",
                    }}
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
                      {c.stat}
                    </span>
                    <span className="text-[7px] sm:text-[8px] uppercase tracking-widest opacity-55 mt-0.5">
                      {c.label}
                    </span>
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="flex justify-end gap-3 sm:gap-5 mb-3 sm:mb-4">
                  {[
                    { label: "After",  dash: false },
                    { label: "Before", dash: true  },
                  ].map(({ label, dash }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <svg width="22" height="8" viewBox="0 0 22 8">
                        <line
                          x1="0" y1="4" x2="22" y2="4"
                          stroke={dash ? `${theme.lineColor}35` : theme.lineColor}
                          strokeWidth={dash ? 1.5 : 2}
                          strokeDasharray={dash ? "4 3" : undefined}
                        />
                      </svg>
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider opacity-40">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Full Width Chart */}
                <div className="w-full min-h-[260px] sm:min-h-[280px] md:min-h-[300px] lg:min-h-[340px] -mx-2 sm:mx-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`chart-${active}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                      className="w-full h-full"
                    >
                      <LineChart c={c} theme={theme} isActive={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Quarterly pips */}
                <div
                  className="grid grid-cols-4 gap-2 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t"
                  style={{ borderTopColor: `${c.textColor}12` }}
                >
                  {c.growth.map((g, i) => (
                    <motion.div
                      key={`${active}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                      className="space-y-1"
                    >
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-tight opacity-35">
                        Q{i + 1}
                      </p>
                      <p className="text-[12px] sm:text-[14px] font-bold">+{g}%</p>
                      <div
                        className="h-[2px] w-full rounded-full overflow-hidden"
                        style={{ backgroundColor: `${c.textColor}10` }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${g}%` }}
                          transition={{
                            delay: 0.3 + i * 0.1,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
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
  );
}