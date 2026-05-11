"use client";

import Image from "next/image";

export default function Work4() {
  return (
    <div
      className="w-full h-full"
      style={{
        background: "#E8E1D8",
        color: "#1E3A34",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP — full width image strip with overlaid title */}
      <div
        style={{
          flex: "0 0 58%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div style={{ position: "absolute", inset: 0, background: "#c8bfb2" }} />
        <Image
          src="/projects/work4-main.jpg"
          alt="Work 4 main"
          fill
          className="object-cover"
        />

        {/* Dark gradient from bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(30,58,52,0.55) 0%, transparent 55%)",
          }}
        />

        {/* Bottom-left title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "1.75rem",
            left: "2.5rem",
            right: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#E8E1D8",
              margin: 0,
            }}
          >
            Rooted in
            <br />
            <em style={{ fontStyle: "italic", opacity: 0.7 }}>craft</em> &amp; purpose
          </h1>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "sans-serif",
              fontSize: 11,
              letterSpacing: "0.14em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#E8E1D8",
              textDecoration: "none",
              border: "0.5px solid rgba(232,225,216,0.45)",
              padding: "9px 22px",
              borderRadius: 999,
              flexShrink: 0,
              marginBottom: 4,
            }}
          >
            View Project <span style={{ fontSize: 16 }}>↗</span>
          </a>
        </div>

        {/* Top-left meta */}
        <div
          style={{
            position: "absolute",
            top: "1.75rem",
            left: "2.5rem",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E8E1D8",
              opacity: 0.6,
            }}
          >
            04 / Strategy
          </span>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E8E1D8",
              opacity: 0.6,
            }}
          >
            2023
          </span>
        </div>
      </div>

      {/* BOTTOM — three columns */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "0.5px solid rgba(30,58,52,0.15)",
        }}
      >
        {/* Col 1 — description */}
        <div
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "0.5px solid rgba(30,58,52,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 13,
              lineHeight: 1.75,
              opacity: 0.55,
              margin: 0,
              maxWidth: "30ch",
            }}
          >
            Brand strategy and visual identity for a Copenhagen studio rooted in considered, slow design.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Strategy", "Identity", "Print"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "0.5px solid rgba(30,58,52,0.25)",
                  padding: "4px 12px",
                  borderRadius: 999,
                  color: "#1E3A34",
                  opacity: 0.65,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — small image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRight: "0.5px solid rgba(30,58,52,0.15)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "#d4cbbf" }} />
          <Image
            src="/projects/work4-thumb.jpg"
            alt="Work 4 detail"
            fill
            className="object-cover"
          />
        </div>

        {/* Col 3 — stats */}
        <div
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          {[
            { value: "18", label: "Brand Guidelines" },
            { value: "3mo", label: "Timeline" },
            { value: "5", label: "Touchpoints" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: i < 2 ? "1rem" : 0,
                borderBottom: i < 2 ? "0.5px solid rgba(30,58,52,0.1)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "#1E3A34",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}