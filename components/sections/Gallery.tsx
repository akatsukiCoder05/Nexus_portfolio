"use client";

import { useState, useRef, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryItems = [
  { id: 1, title: "Registration Desk", category: "Community", image: "/images/gallery/moment1.jpg", height: "h-72" },
  { id: 2, title: "Bootcamp Session", category: "Workshop", image: "/images/gallery/moment2.jpg", height: "h-56" },
  { id: 3, title: "Achievement & Awards", category: "Celebration", image: "/images/gallery/moment3.jpg", height: "h-80" },
  { id: 4, title: "Core Team Meet", category: "Community", image: "/images/gallery/moment4.jpg", height: "h-64" },
  { id: 5, title: "Speaker Session", category: "Event", image: "/images/gallery/moment5.jpg", height: "h-72" },
  { id: 6, title: "Orientation Session", category: "Event", image: "/images/gallery/moment6.jpg", height: "h-56" },
  { id: 7, title: "Interactive Lab", category: "Workshop", image: "/images/gallery/moment7.jpg", height: "h-64" },
];

function GalleryCard({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`masonry-item rounded-xl overflow-hidden relative ${item.height} cursor-pointer`}
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.2s ease",
        borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url(${item.image})`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Dark overlay when not hovered */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
          opacity: hovered ? 0.3 : 0.75
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{ background: "rgba(13,13,13,0.85)", opacity: hovered ? 1 : 0, backdropFilter: "blur(2px)" }}
      >
        <ZoomIn className="w-6 h-6 text-white mb-2 opacity-80" />
        <p className="text-sm font-medium text-white">{item.title}</p>
      </div>

      {/* Category label */}
      <div
        className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-full transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.6)",
          color: "#a0a0a0",
          border: "1px solid rgba(255,255,255,0.08)",
          opacity: hovered ? 0 : 1,
        }}
      >
        {item.category}
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="section-padding" style={{ background: "#0d0d0d" }}>
      <div className="section-container">
        <div className="section-tag">Gallery</div>
        <h2
          className="font-black text-white leading-[0.95] mb-12 mt-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            letterSpacing: "-0.03em",
          }}
        >
          Community<br />
          <span style={{ color: "#00e5cc" }}>Moments</span>
        </h2>

        <div
          ref={sectionRef}
          className="masonry-grid"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
        >
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={() => setLightboxItem(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div className="lightbox-overlay" onClick={() => setLightboxItem(null)}>
          <div
            className="card p-6 max-w-lg w-full mx-4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ color: "#808080", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div 
              className="w-full h-80 rounded-lg mb-6 bg-cover bg-center" 
              style={{ backgroundImage: `url(${lightboxItem.image})`, border: "1px solid rgba(255,255,255,0.1)" }} 
            />
            <h3 className="text-xl font-bold text-white mb-2">{lightboxItem.title}</h3>
            <span
              className="text-xs skill-tag"
            >
              {lightboxItem.category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
