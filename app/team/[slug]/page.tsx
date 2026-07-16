import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink, Instagram, Mail, ArrowLeft, Trophy, Folder, Award } from "lucide-react";
import { teamMembers } from "@/data/team";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return { title: "Member Not Found" };
  return {
    title: `${member.name} — Nexus Community`,
    description: member.bio,
  };
}

export default async function MemberProfile({ params }: Props) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  const skillColors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#EC4899", "#F59E0B"];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Hero Banner */}
      <div className="relative flex items-end" style={{ minHeight: "clamp(180px, 32vw, 260px)" }}>
        {/* Background */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, #0d0d0d 100%)",
          }}
        >
          <div className="absolute inset-0 animated-grid opacity-20" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.2) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="section-container relative z-10 w-full" style={{ paddingBottom: "clamp(20px, 4vw, 32px)", paddingTop: "clamp(20px, 4vw, 32px)" }}>
          <div className="flex flex-wrap items-end gap-4">
            {/* Avatar */}
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center font-bold border-4 flex-shrink-0"
              style={{
                width: "clamp(72px, 14vw, 112px)",
                height: "clamp(72px, 14vw, 112px)",
                fontSize: "clamp(22px, 4vw, 36px)",
                background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))",
                borderColor: "rgba(139,92,246,0.5)",
                boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              }}
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              )}
            </div>
            {/* Name + role */}
            <div style={{ paddingBottom: "2px", flex: "1 1 180px", minWidth: 0 }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#A78BFA" }}>
                {member.branch} · {member.year}
              </div>
              <h1
                className="font-bold text-white"
                style={{ fontSize: "clamp(20px, 5vw, 30px)", lineHeight: 1.15 }}
              >
                {member.name}
              </h1>
              <p style={{ color: "#A78BFA", fontSize: "clamp(13px, 2.5vw, 16px)" }}>{member.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container pt-12 pb-16">
        {/* Back link */}
        <Link
          href="/#team"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Team
        </Link>

        <style>{`
            .member-profile-grid { display: grid; gap: 2rem; grid-template-columns: 1fr; }
            @media (min-width: 1024px) {
              .member-profile-grid { grid-template-columns: 1fr 2fr; }
            }
          `}</style>
        <div className="member-profile-grid">
          {/* Left sidebar */}
          <div className="flex flex-col gap-6">
            {/* Bio */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">About</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{member.bio}</p>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Connect</h2>
              <div className="flex flex-col gap-3">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                      <ExternalLink className="w-4 h-4 text-blue-400" />
                    </div>
                    LinkedIn Profile
                  </a>
                )}

                {member.social.github && (
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Github className="w-4 h-4 text-slate-300" />
                    </div>
                    GitHub Profile
                  </a>
                )}

                {member.social.instagram && (
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)" }}>
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    Instagram
                  </a>
                )}
                {member.social.email && (
                  <a href={`mailto:${member.social.email}`}
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
                      <Mail className="w-4 h-4 text-purple-400" />
                    </div>
                    {member.social.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Skills */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-6">Skills & Expertise</h2>
              <div className="flex flex-col gap-4">
                {member.skills.map((skill, i) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{skill}</span>
                      <span style={{ color: skillColors[i % skillColors.length] }}>
                        {[85, 90, 78, 92, 88, 80][i % 6]}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${[85, 90, 78, 92, 88, 80][i % 6]}%`,
                          background: `linear-gradient(90deg, ${skillColors[i % skillColors.length]}, ${skillColors[(i + 1) % skillColors.length]})`,
                          boxShadow: `0 0 8px ${skillColors[i % skillColors.length]}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-6">
                <span className="mr-2">🗂️</span> Projects
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {member.projects.map((project, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl transition-all duration-300 hover:border-purple-500/30"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Folder className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#A78BFA" }} />
                      <h3 className="font-semibold text-white text-sm">{project.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed ml-7">{project.description}</p>
                    {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="ml-7 mt-2 inline-block text-xs hover:underline" style={{ color: "#60A5FA" }}>
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-6">
                <span className="mr-2">🏆</span> Achievements
              </h2>
              <div className="flex flex-col gap-3">
                {member.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#F59E0B" }} />
                    <span className="text-slate-300 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
