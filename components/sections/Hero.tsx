"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// Subtle star-dot background (white dots, not neon)
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots: Array<{ x: number; y: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 120; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.4 + 0.05,
      });
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d) => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 204, ${d.opacity})`;
      ctx.fill();
    });

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 204, ${d.opacity})`;
        ctx.fill();
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

const rotatingWords = ["Build Skills.", "Crack Placements.", "Shape Your Future."];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const word = rotatingWords[wordIdx];
    let timer: NodeJS.Timeout;
    if (!deleting) {
      if (charIdx < word.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), 70);
      } else {
        timer = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), 35);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % rotatingWords.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* Subtle dot field */}
      <StarField />

      {/* Very subtle gradient glow — not neon, just warmth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,229,204,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Main content — takes full height */}
      <div
        className="section-container flex-1 flex flex-col justify-center relative"
        style={{ zIndex: 2, paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Community label */}
        <div className="section-tag mb-6">
          Nexus Community · Est. 2022
        </div>

        {/* Massive headline */}
        <h1
          className="font-black text-white leading-[0.92] tracking-tight mb-10"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(56px, 10vw, 140px)",
            letterSpacing: "-0.03em",
          }}
        >
          {rotatingWords[wordIdx].slice(0, charIdx)}
          <span
            className="inline-block w-[4px] align-middle ml-2"
            style={{
              height: "0.85em",
              background: "#00e5cc",
              animation: "blink 1s step-end infinite",
              borderRadius: "2px",
            }}
          />
        </h1>

        {/* Description + CTAs — side by side on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 max-w-5xl">
          <p
            className="text-base leading-relaxed max-w-md"
            style={{ color: "#888888", fontSize: "15px", flexShrink: 0 }}
          >
            We are a student-driven community helping college students master
            coding, aptitude, hackathons, and real-world skills — so you can
            crack your dream placement.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "14px", padding: "12px 28px" }}
            >
              Join Community
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#events"
              className="btn-secondary"
              style={{ fontSize: "14px", padding: "11px 28px" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Events
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-10 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { value: "1500+", label: "Students" },
            { value: "100+", label: "Events" },
            { value: "30+", label: "Hackathons" },
            { value: "4+", label: "Years" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-black text-white leading-none"
                style={{ fontSize: "clamp(22px, 3vw, 36px)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
              >
                {s.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest mt-1.5"
                style={{ color: "#808080", letterSpacing: "0.15em" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar of hero — like reference site (©2025 | /BUILDING SINCE 2022) */}
      <div
        className="section-container relative flex justify-between items-center py-5"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#808080", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>
          ©2025
        </span>
        <span style={{ color: "#808080", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          /Building Since 2022
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
