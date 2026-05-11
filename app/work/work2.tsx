"use client";

import Image from "next/image";

export default function Work2() {
  return (
    <div className="w-full h-full flex font-zalando" style={{ background: "#3d4f2e", color: "#f5ede0" }}>

      {/* LEFT — project info */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: "45%",
          padding: "3rem 3.5rem",
          background: "#3d4f2e",
        }}
      >
        {/* Top meta */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span
            className="font-zalando"
            style={{ fontSize: 12, letterSpacing: "0.14em", color: "#f5ede0", opacity: 0.6 }}
          >
            ORGANIC COLLECTIVE
          </span>
          <span
            className="font-zalando"
            style={{
              fontSize: 11, letterSpacing: "0.12em", color: "#f5ede0",
              border: "0.5px solid rgba(245,237,224,0.3)",
              padding: "3px 12px", borderRadius: 999, opacity: 0.7,
            }}
          >
            BRAND IDENTITY
          </span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.8rem" }}>
          <h1
            className="font-zalando"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#f5ede0",
              margin: 0,
            }}
          >
            Growing<br />
            Something<br />
            Beautiful
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p
              className="font-zalando"
              style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.55, margin: 0, maxWidth: "28ch" }}
            >
              Full brand identity and packaging system for an organic farm-to-table collective rooted in sustainability.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Brand", "Print", "Packaging"].map((tag) => (
                <span
                  key={tag}
                  className="font-zalando"
                  style={{
                    fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "0.5px solid rgba(245,237,224,0.25)",
                    padding: "5px 14px", borderRadius: 999, opacity: 0.7,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Fixed: Added missing opening <a> tag */}
          <a
            href="#"
            className="font-zalando"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, letterSpacing: "0.12em", fontWeight: 600,
              color: "#f5ede0", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            View Project <span style={{ fontSize: 18, opacity: 0.8 }}>↗</span>
          </a>
        </div>

        <div
          style={{
            display: "flex", gap: "3rem",
            borderTop: "0.5px solid rgba(245,237,224,0.15)",
            paddingTop: "1.5rem",
          }}
        >
          {[
            { value: "12", label: "Deliverables" },
            { value: "6mo", label: "Timeline" },
            { value: "4", label: "Brand Touchpoints" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-zalando" style={{ fontSize: "2rem", fontWeight: 700, color: "#f5ede0", lineHeight: 1, marginBottom: 6 }}>
                {stat.value}
              </div>
              <div className="font-zalando" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f5ede0", opacity: 0.45 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — blurred background with framed image */}
      <div className="relative overflow-hidden" style={{ width: "55%" }}>
        <Image
          src="/newspaper.jpg"
          alt="Project background"
          fill
          className="object-cover opacity-60"
          style={{ filter: "blur(6px)", transform: "scale(1.08)" }}
        />
        <div
          className="absolute"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-56%, -50%)",
            width: "72%", borderRadius: 10, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          }}
        >
          {/* Mock browser chrome */}
          <div style={{ background: "#fff", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <div style={{ flex: 1, height: 20, borderRadius: 4, background: "#f0f0f0", marginLeft: 8 }} />
          </div>
          <div style={{ width: "100%", aspectRatio: "16/10", background: "#4a6038", position: "relative" }}>
            <Image src="/newspaper.jpg" alt="Project screenshot" fill className="object-cover object-top" />
          </div>
        </div>
      </div>

    </div>
  );
}