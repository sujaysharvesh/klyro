"use client";

import Image from "next/image";

export default function Work1() {
  return (
    <div className="w-full h-full flex" style={{ background: "#111111", color: "#f5ede0" }}>
      
      {/* LEFT — project image/mockup */}
      <div className="relative w-[55%] h-full overflow-hidden">
        {/* blurred bg image */}
        <div
          className="absolute inset-0 scale-110"
          style={{ background: "#1a1a1a", filter: "blur(0px)" }}
        />
        {/* Replace src with your actual project screenshot */}
        <Image
          src="/newspaper.jpg"
          alt="Project background"
          fill
          className="object-cover opacity-60"
          style={{ filter: "blur(6px)", transform: "scale(1.08)" }}
        />
        {/* Floating browser mockup */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-44%, -50%)",
            width: "72%",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          }}
        >
          {/* Browser chrome */}
          <div style={{ background: "#fff", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <div style={{ flex: 1, height: 20, borderRadius: 4, background: "#f0f0f0", marginLeft: 8 }} />
          </div>
          {/* Screenshot — replace with your actual project image */}
          <div style={{ width: "100%", aspectRatio: "16/10", background: "#e8e8e8", position: "relative" }}>
            <Image
              src="/newspaper.jpg"
              alt="Project screenshot"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — project info */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: "45%",
          padding: "3rem 3.5rem",
          background: "#111111",
        }}
      >
        {/* Top meta */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span
            style={{
              // fontFamily: "font-zalando",
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "#f5ede0",
              opacity: 0.6,
            }}
            className="font-zalando"
          >
            CLIENT NAME
          </span>
          <span
            style={{
              // fontFamily: "font-zalando",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "#f5ede0",
              border: "0.5px solid rgba(245,237,224,0.3)",
              padding: "3px 12px",
              borderRadius: 999,
              opacity: 0.7,
            }}
            className="font-zalando"
          >
            
            WEBSITES
          </span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }}>
          <h1
            style={{
              // fontFamily: "sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#f5ede0",
              margin: 0,
            }}
            className="font-zalando"
          >
            The UK's Number One Street Paper and Social Enterprise
          </h1>

          {/* View project link */}
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              // fontFamily: "sans-serif",
              fontSize: 13,
              letterSpacing: "0.12em",
              fontWeight: 600,
              color: "#f5ede0",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
            className="font-zalando"
          >
            View Project
            <span style={{ fontSize: 18, opacity: 0.8 }}>↗</span>
          </a>
        </div>

        {/* Bottom stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            borderTop: "0.5px solid rgba(245,237,224,0.15)",
            paddingTop: "1.5rem",
          }}
        >
          {[
            { value: "1", label: "Award Nomination" },
            { value: "3+", label: "Years Partnership" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  // fontFamily: "sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#f5ede0",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
                className="font-zalando"
              >
                {stat.value}
              </div>
              <div
                style={{
                  // fontFamily: "sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#f5ede0",
                  opacity: 0.45,
                }}
                className="font-zalando"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}