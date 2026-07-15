"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Github, ExternalLink, Instagram, Mail, Search } from "lucide-react";
import { teamMembers } from "@/data/team";

function TeamCard({ member, index, visible }: { member: typeof teamMembers[0]; index: number; visible: boolean }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      className="card p-6 group transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
    >
      {/* Avatar */}
      <div className="flex items-start gap-4 mb-4">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
              const sibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (sibling) sibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ 
            background: "#1e1e1e", 
            border: "1px solid rgba(255,255,255,0.1)",
            display: member.photo ? "none" : "flex"
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-white leading-tight mb-1 truncate"
            style={{ fontSize: "15px", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {member.name}
          </h3>
          <p className="text-xs truncate" style={{ color: "#00e5cc" }}>{member.role}</p>
          <p className="text-xs mt-0.5" style={{ color: "#808080" }}>{member.branch} · {member.year}</p>
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <p
          className="text-xs leading-relaxed mb-4 line-clamp-2"
          style={{ color: "#a0a0a0" }}
        >
          {member.bio}
        </p>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", color: "#a0a0a0", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {skill}
          </span>
        ))}
        {member.skills.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "#808080" }}>+{member.skills.length - 4}</span>
        )}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "#808080", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "#808080", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <Github className="w-3 h-3" />
          </a>
        )}
        {member.social.email && (
          <a
            href={`mailto:${member.social.email}`}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "#808080", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <Mail className="w-3 h-3" />
          </a>
        )}
        <Link
          href={`/team/${member.slug}`}
          className="ml-auto text-xs transition-colors duration-200"
          style={{ color: "#808080" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; }}
        >
          Profile →
        </Link>
      </div>
    </div>
  );
}

export default function Team() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = teamMembers.filter((m) => {
    return m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
  });

  const categories = [
    { name: "Leadership & Core", key: "leadership" as const },
    { name: "Technical Team", key: "technical" as const },
    { name: "Content & PR Team", key: "content_pr" as const },
    { name: "Social Media Team", key: "social_media" as const }
  ];

  const grouped = {
    leadership: filtered.filter(m => {
      const r = m.role.toLowerCase();
      return r.includes("founder") || r.includes("community");
    }),
    technical: filtered.filter(m => {
      const r = m.role.toLowerCase();
      return r.includes("technical");
    }),
    content_pr: filtered.filter(m => {
      const r = m.role.toLowerCase();
      return r.includes("content") || r.includes("event");
    }),
    social_media: filtered.filter(m => {
      const r = m.role.toLowerCase();
      return r.includes("social");
    })
  };

  return (
    <section id="team" className="section-padding" style={{ background: "#111111" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-tag">The Team</div>
            <h2
              className="font-black text-white leading-[0.95] mt-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              Meet the<br />
              <span style={{ color: "#00e5cc" }}>People</span>
            </h2>
          </div>

          
        </div>

        <div ref={sectionRef} className="flex flex-col gap-16">
          {categories.map((cat) => {
            const list = grouped[cat.key];
            if (list.length === 0) return null;
            return (
              <div key={cat.key} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <h3
                    className="text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap"
                    style={{ letterSpacing: "0.2em", color: "#808080" }}
                  >
                    {cat.name}
                  </h3>
                  <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {list.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} visible={visible} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "#808080" }}>
            No members found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}
