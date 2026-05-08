"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend);

// ─── Data (Preserved) ────────────────────────────────────────────────────────
const CASES = [
  {
    brand: "Luxe Apparel",
    industry: "E-commerce",
    year: "2024",
    service: "Branding + Campaigns",
    desc: "Re-engineered their digital storefront and visual identity, focusing on high-conversion animations.",
    growth: [45, 62, 88, 95],
    stat: "+112%",
    label: "Revenue Increase",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [38, 40, 37, 42, 41, 43, 44, 45, 47, 46, 49, 50],
    after:  [38, 48, 61, 78, 97,118,140,164,188,210,234,258],
  },
  {
    brand: "Nova Tech",
    industry: "SaaS",
    year: "2023",
    service: "UI/UX + Development",
    desc: "Scaled their DevOps infrastructure and implemented a custom UI library for their dashboard product.",
    growth: [20, 35, 55, 78],
    stat: "4.2×",
    label: "User Engagement",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [12, 13, 12, 14, 15, 13, 16, 14, 17, 15, 18, 16],
    after:  [12, 17, 25, 36, 50, 66, 83,102,124,148,173,200],
  },
  {
    brand: "Studio Mamma",
    industry: "Creative Agency",
    year: "2025",
    service: "Webflow + SEO",
    desc: "Strategic SEO and content overhaul paired with a high-performance Webflow implementation.",
    growth: [30, 40, 70, 92],
    stat: "+240%",
    label: "Search Visibility",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    before: [8,  9,  8, 10, 11,  9, 12, 10, 13, 11, 14, 12],
    after:  [8, 12, 19, 30, 46, 65, 87,112,140,170,202,237],
  },
];

// ─── Shared Chart Options (Styled) ───────────────────────────────────────────
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: "index" as const, intersect: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 9 }, color: "#999" } },
    y: { grid: { color: "rgba(0,0,0,0.03)" }, ticks: { display: false } },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function LineChart({ c }: { c: (typeof CASES)[0] }) {
  const data = {
    labels: c.months,
    datasets: [
      {
        data: c.after,
        borderColor: "#1a1a1a",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(26, 26, 26, 0)");
          gradient.addColorStop(1, "rgba(26, 26, 26, 0.08)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.45,
        fill: true,
      },
      {
        data: c.before,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };
  return <div className="h-[280px] w-full"><Line data={data} options={lineOptions} /></div>;
}

export default function ResultsPage() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <main className="min-h-screen text-[#1a1a1a] p-6 lg:p-12 overflow-hidden selection:bg-black selection:text-white">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-16 border-b border-black/5 pb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-2 font-medium">Growth Analysis</p>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">Our Results</h1>
        </div>
        <div className="text-right hidden lg:block">
          <p className="text-[10px] font-mono text-black/30 leading-tight">SYST: 2.049<br/>STATUS: VERIFIED</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT PANEL: The Brand List */}
        <div className="w-full lg:w-[450px] space-y-0">
          {CASES.map((item, i) => (
            <motion.div
              key={item.brand}
              onMouseEnter={() => setActive(i)}
              className="group relative py-8 border-b border-black/5 cursor-pointer"
            >
              <div className="flex items-baseline gap-6 relative z-10">
                <span className={`text-[11px] font-mono transition-colors duration-500 ${active === i ? "text-black" : "text-black/20"}`}>
                  0{i + 1}
                </span>
                <h2 className={`text-4xl lg:text-6xl font-black uppercase tracking-tighter transition-all duration-500 ${
                  active === i ? "translate-x-2 text-black" : "text-black/10 group-hover:text-black/30"
                }`}>
                  {item.brand}
                </h2>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 pl-10">
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mb-3">{item.service}</p>
                      <p className="text-sm text-black/60 leading-relaxed font-light max-w-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Indicator Line */}
              {active === i && (
                <motion.div layoutId="indicator" className="absolute left-0 top-0 bottom-0 w-[2px] bg-black" />
              )}
            </motion.div>
          ))}
        </div>

        {/* RIGHT PANEL: The Dynamic Graph Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden">
            
            {/* Top Stat Bar */}
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-1">
                <motion.p key={c.brand} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                  Performance Metrics
                </motion.p>
                <h3 className="text-2xl font-bold tracking-tight">{c.brand}</h3>
              </div>

              <motion.div 
                key={c.stat} 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1a1a1a] text-white px-6 py-4 rounded-2xl flex flex-col items-end"
              >
                <span className="text-4xl font-black tracking-tighter">{c.stat}</span>
                <span className="text-[9px] uppercase tracking-widest opacity-50">{c.label}</span>
              </motion.div>
            </div>

            {/* The Main Chart */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <LineChart c={c} />
              </motion.div>
            </AnimatePresence>

            {/* Quarterly Growth Pips */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-black/5">
              {c.growth.map((g, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[9px] uppercase tracking-tighter text-black/30">Q{i+1} Target</p>
                  <p className="text-sm font-bold">+{g}%</p>
                  <div className="h-[3px] bg-black/5 w-full rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${g}%` }} 
                      transition={{ delay: 0.4 + (i * 0.1), duration: 1 }} 
                      className="h-full bg-black/80" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] text-black/20">
            <span>Verified 2026 Engagement</span>
            <span>Proprietary Data Model</span>
          </div>
        </div>

      </div>
    </main>
  );
}