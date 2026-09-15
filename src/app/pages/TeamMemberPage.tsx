import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import { useLayoutHero } from "../components/LayoutHeroContext";
import { MOUNTAIN } from "../components/heroImages";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  bio?: string;
  phone: string;
  email: string;
  photo: string;
}

export function TeamMemberPage() {
  const { memberId } = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const { setOverride } = useLayoutHero();

  useEffect(() => {
    const load = async () => {
      let team: TeamMember[] = [];

      try {
        const res = await fetch("/content.json");
        if (res.ok) {
          const data = await res.json();
          if (data.executive_team?.length) team = data.executive_team;
        }
      } catch {}

      if (team.length && memberId) {
        const found = team.find((m) => m.id === memberId);
        if (found) {
          setMember(found);
          // Push hero data to Layout's centralized hero
          setOverride({
            title: found.name,
            subtitle: found.title,
            image: MOUNTAIN.himalayanPeaksDramatic,
          });
        }
      }
      setLoading(false);
    };
    load();
    return () => setOverride(null);
  }, [memberId, setOverride]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Team member not found</h2>
        <Link to="/about" className="text-sky-600 hover:text-sky-700 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to About
        </Link>
      </div>
    );
  }

  // Use bio for full content, fall back to description
  const fullBio = member.bio || member.description || "";

  return (
    <div className="min-h-screen relative">
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Leadership
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Photo & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-24 h-24 text-slate-300" />
                    </div>
                  )}
                </div>

                <GlassCard className="p-5 bg-white/70 border-slate-200 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Contact</h3>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-slate-700 hover:text-sky-600 transition-colors">
                      <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-sm text-slate-700 hover:text-sky-600 transition-colors">
                      <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                      {member.phone}
                    </a>
                  )}
                  {!member.email && !member.phone && (
                    <p className="text-sm text-slate-400 italic">No contact info available</p>
                  )}
                </GlassCard>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{member.name}</h2>
              <p className="text-sky-600 font-medium text-lg mb-8">{member.title}</p>
              <div className="prose prose-slate prose-lg max-w-none">
                {fullBio.split("\n").map((para, i) => (
                  para.trim() ? <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p> : null
                ))}
                {!fullBio && (
                  <p className="text-slate-400 italic">Full bio coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}