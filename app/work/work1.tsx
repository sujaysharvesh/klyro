"use client";

import Image from "next/image";

export default function Work1() {
  return (
    <div
      className="w-full h-full flex flex-col lg:flex-row"
      style={{ background: "#111111", color: "#f5ede0" }}
    >

      {/* LEFT — project image/mockup */}
      <div className="relative w-full h-[45vh] sm:h-[50vh] lg:w-[55%] lg:h-full overflow-hidden flex-shrink-0">
        {/* Blurred bg */}
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
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
            width: "78%",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              background: "#fff",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            <div
              style={{
                flex: 1,
                height: 16,
                borderRadius: 4,
                background: "#f0f0f0",
                marginLeft: 6,
              }}
            />
          </div>
          {/* Screenshot */}
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
        className="flex flex-col justify-between flex-1"
        style={{
          padding: "clamp(1.5rem, 5vw, 3.5rem)",
          background: "#111111",
        }}
      >
        {/* Top meta */}
        <div className="flex flex-wrap gap-3 items-center">
          <span
            className="font-zalando"
            style={{
              fontSize: "clamp(10px, 1.5vw, 12px)",
              letterSpacing: "0.14em",
              color: "#f5ede0",
              opacity: 0.6,
            }}
          >
            CLIENT NAME
          </span>
          <span
            className="font-zalando"
            style={{
              fontSize: "clamp(9px, 1.4vw, 11px)",
              letterSpacing: "0.12em",
              color: "#f5ede0",
              border: "0.5px solid rgba(245,237,224,0.3)",
              padding: "3px 10px",
              borderRadius: 999,
              opacity: 0.7,
            }}
          >
            WEBSITES
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(1rem, 3vw, 2rem)",
            paddingTop: "clamp(1.2rem, 3vw, 0rem)",
          }}
        >
          <h1
            className="font-zalando"
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 4vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#f5ede0",
              margin: 0,
            }}
          >
            The UK's Number One Street Paper and Social Enterprise
          </h1>

          
          <a
  href="#"
  className="font-zalando inline-flex items-center w-fit"
  style={{
    gap: 8,
    fontSize: "clamp(11px, 1.5vw, 13px)",
    letterSpacing: "0.12em",
    fontWeight: 600,
    color: "#f5ede0",
    textDecoration: "none",
    textTransform: "uppercase",
  }}
>
  View Project
  <span style={{ fontSize: 18, opacity: 0.8 }}>↗</span>
</a>
        </div>

        {/* Bottom stats */}
        <div
          className="flex flex-wrap gap-6 sm:gap-10"
          style={{
            borderTop: "0.5px solid rgba(245,237,224,0.15)",
            paddingTop: "clamp(1rem, 2.5vw, 1.5rem)",
            marginTop: "clamp(1rem, 2.5vw, 0rem)",
          }}
        >
          {[
            { value: "1",  label: "Award Nomination" },
            { value: "3+", label: "Years Partnership" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-zalando"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#f5ede0",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-zalando"
                style={{
                  fontSize: "clamp(8px, 1.2vw, 10px)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#f5ede0",
                  opacity: 0.45,
                }}
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