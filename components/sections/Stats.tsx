"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1500, suffix: "+", label: "Students Guided" },
  { value: 100, suffix: "+", label: "Events Conducted" },
  { value: 50, suffix: "+", label: "Coding Sessions" },
  { value: 30, suffix: "+", label: "Hackathons" },
  { value: 95, suffix: "%", label: "Positive Feedback" },
];

function useCountUp(end: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) { setCount(0); return; }
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, started]);
  return count;
}

function StatItem({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.value, 1600, started);
  return (
    <div className="text-center">
      <div
        className="font-black text-white leading-none mb-2"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(36px, 5vw, 60px)",
          letterSpacing: "-0.03em",
        }}
      >
        {count}{stat.suffix}
      </div>
      <div
        className="text-xs uppercase tracking-widest"
        style={{ color: "#808080", letterSpacing: "0.15em" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
