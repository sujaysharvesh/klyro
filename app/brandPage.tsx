"use client";

export default function BrandsPage() {
  const brands = [
    "/logos/nike.svg",
    "/logos/apple.svg",
    "/logos/spotify2.svg",
    "/logos/adidas.svg",
    "/logos/netflix.svg",
    "/logos/airbnb.svg",
    "/logos/notion.svg",
    "/logos/puma.svg",
  ];

  const stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "8×",   label: "Agency of the year"  },
    { value: "94%",  label: "Client retention"     },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] overflow-hidden font-zalando">

      {/* ── HERO ── */}
      <section className="flex flex-col gap-10 px-12 pt-16 pb-14 border-b border-black/10 md:px-6 md:pt-10 md:pb-10">

        {/* eyebrow row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-normal tracking-[0.22em] uppercase text-black/40 font-zalando">
            Trusted by modern brands
          </span>
          <span className="text-[11px] font-light tracking-[0.1em] text-black/25 font-zalando">
            001
          </span>
        </div>

        {/* headline */}
        <h1
          className="font-zalando"
          style={{
            position: "relative",
            fontSize: "clamp(44px, 6.5vw, 96px)",
            fontWeight: 400,
            lineHeight: 0.8,
            letterSpacing: "-0.09em",
            color: "#111",
            left: 20,
            top: 22
          }}
        >
          We create digital<br />
          experiences that<br />
          <em className="not-italic font-zalando" style={{ fontStyle: "italic", color: "#555" }}>
            move brands forward.
          </em>
        </h1>

        {/* stats */}
        <div className="flex flex-wrap gap-16 pt-4 border-t border-black/[0.08] md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-zalando text-[28px] font-normal text-[#111] tracking-[-0.02em]">
                {s.value}
              </span>
              <span className="font-zalando text-[11px] font-normal tracking-[0.12em] uppercase text-black/40">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="relative flex items-center border-b border-black/10">

        {/* left label */}
        <div className="hidden md:hidden flex-shrink-0 h-[110px] flex items-center justify-center px-6 border-r border-black/[0.08] writing-mode-vertical">
          <span
            className="font-zalando text-[10px] tracking-[0.2em] uppercase text-black/30"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Partners
          </span>
        </div>
        {/* left label — visible on lg+ */}
        <div className="hidden lg:flex flex-shrink-0 h-[110px] items-center justify-center px-6 border-r border-black/[0.08]">
          <span
            className="font-zalando text-[10px] tracking-[0.2em] uppercase text-black/30"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Partners
          </span>
        </div>

        {/* track */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...brands, ...brands, ...brands].map((logo, i) => (
              <div
                key={i}
                className="w-[200px] h-[110px] flex-shrink-0 flex items-center justify-center
                           border-r border-black/[0.07] bg-[#f5f3ef]
                           transition-colors duration-400 hover:bg-black/[0.03]"
              >
                <img
                  src={logo}
                  alt="brand logo"
                  className="w-[100px] h-9 object-contain opacity-45 grayscale
                             transition-opacity duration-300 hover:opacity-70"
                />
              </div>
            ))}
          </div>
        </div>

        {/* right label */}
        <div className="hidden lg:flex flex-shrink-0 h-[110px] items-center justify-center px-6 border-l border-black/[0.08]">
          <span
            className="font-zalando text-[10px] tracking-[0.2em] uppercase text-black/30"
            style={{ writingMode: "vertical-rl" }}
          >
            Since 2019
          </span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">

        {/* left */}
        <div className="flex flex-col justify-between gap-8 px-12 py-14
                        border-b lg:border-b-0 lg:border-r border-black/[0.08]
                        md:px-6 md:py-8">
          <span className="font-zalando text-[11px] font-normal tracking-[0.22em] uppercase text-black/40">
            About
          </span>
          <svg
            width="48" height="48" viewBox="0 0 48 48" fill="none"
            className="opacity-15"
          >
            <circle cx="24" cy="24" r="23" stroke="#111" strokeWidth="1" />
            <line x1="24" y1="1" x2="24" y2="47" stroke="#111" strokeWidth="1" />
            <line x1="1" y1="24" x2="47" y2="24" stroke="#111" strokeWidth="1" />
          </svg>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between gap-1 px-12 py-14 pb-20
                        md:px-6 md:py-8 md:pb-14">
          <p
            className="font-zalando max-w-[1100px] text-black/65 leading-[1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 400 }}
          >
            We partner with ambitious brands to craft strategy, identity,
            content, and digital systems that create long-term growth.
          </p>
          {/* <a
            className="font-zalando inline-flex items-center gap-2.5 w-fit
                       text-[13px] font-medium tracking-[0.06em] uppercase text-[#111]
                       no-underline border-b border-[#111] pb-1 cursor-pointer
                       transition-opacity duration-200 hover:opacity-50"
          >
            Start a project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a> */}
        </div>
      </section>

      {/* marquee keyframes — Tailwind can't generate these */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

    </div>
  );
}