"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Work3() {
  return (
    <div className="w-full h-full flex font-zalando" style={{ background: "#DCD7C9", color: "#3d4f2e" }}>

      {/* LEFT — project info */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: "45%",
          padding: "3rem 3.5rem",
          background: "#DCD7C9",
        }}
      >
        {/* Top meta */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span
            className="font-zalando"
            style={{ fontSize: 12, letterSpacing: "0.14em", color: "#3d4f2e", opacity: 0.6 }}
          >
            MOTION IDENTITY
          </span>
          <span
            className="font-zalando"
            style={{
              fontSize: 11, letterSpacing: "0.12em", color: "#3d4f2e",
              border: "0.5px solid rgba(61,79,46,0.3)",
              padding: "3px 12px", borderRadius: 999, opacity: 0.7,
            }}
          >
            FILM DIRECTION
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
              color: "#3d4f2e",
              margin: 0,
            }}
          >
            Light<br />
            Moves<br />
            Through
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p
              className="font-zalando"
              style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.55, margin: 0, maxWidth: "28ch" }}
            >
              Brand film direction and motion identity for an independent production house. From concept to final cut.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Motion", "Film", "Direction", "Colour"].map((tag) => (
                <span
                  key={tag}
                  className="font-zalando"
                  style={{
                    fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "0.5px solid rgba(61,79,46,0.25)",
                    padding: "5px 14px", borderRadius: 999, opacity: 0.7,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#"
            className="font-zalando"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, letterSpacing: "0.12em", fontWeight: 600,
              color: "#3d4f2e", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            Watch the film <span style={{ fontSize: 18, opacity: 0.8 }}>↗</span>
          </a>
        </div>

        <div
          style={{
            display: "flex", gap: "3rem",
            borderTop: "0.5px solid rgba(61,79,46,0.15)",
            paddingTop: "1.5rem",
          }}
        >
          {[
            { value: "8", label: "Film Cuts" },
            { value: "2+", label: "Mins Runtime" },
            { value: "4K", label: "Resolution" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-zalando" style={{ fontSize: "2rem", fontWeight: 700, color: "#3d4f2e", lineHeight: 1, marginBottom: 6 }}>
                {stat.value}
              </div>
              <div className="font-zalando" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3d4f2e", opacity: 0.45 }}>
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
          <div style={{ width: "100%", aspectRatio: "16/10", background: "#b8b2a2", position: "relative" }}>
            <Image src="/newspaper.jpg" alt="Project screenshot" fill className="object-cover object-top" />
          </div>
        </div>
      </div>

    </div>
  );
}