import React, { useState, useEffect } from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, Eye, Users, User, ChevronDown, ChevronUp, Mail, MapPin } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";

interface StaffMember {
  id: string;
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
}

export function About() {
  const [teamMembers, setTeamMembers] = useState<StaffMember[]>([]);
  const [activePillar, setActivePillar] = useState(1);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const res = await fetch("/staff.json");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTeamMembers(data);
          }
        }
      } catch (e) {}
    };
    loadStaff();
  }, []);

  const toggleBio = (id: string) => {
    setExpandedBio(expandedBio === id ? null : id);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'rgba(241, 245, 249, 0.85)', backdropFilter: 'blur(12px)' }}>
      <PageHero 
        title="About Aurix AI" 
        subtitle="Building the future of enterprise intelligence on a foundation of trust."
        image={MOUNTAIN.himalayanPeaksDramatic}
      />

      {/* Three Pillars */}
      <section className="py-20 relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(8px)' }}>
        <div className="container mx-auto px-6 space-y-12">

          {/* Intro */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Three Pillars</h2>
            <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full mb-8" />
            <p className="text-lg text-slate-600 leading-relaxed">
              These are not marketing copy. They are engineering mandates. Every system, every API,
              every agent in the Aurix ecosystem is evaluated against these three principles before
              it ships. They also form the foundation of how we hire, how we build, and how we hold
              ourselves accountable.
            </p>
          </div>

          {/* Clickable Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: 1, label: "Pillar 1:", title: "Transparency First", icon: Eye,
                desc: "No black boxes. We provide full visibility into how our AI models make decisions and handle your data." },
              { num: 2, label: "Pillar 2:", title: "Security by Design", icon: Shield,
                desc: "Our systems are built with security as a foundational layer, not an afterthought. Your data's integrity is paramount." },
              { num: 3, label: "Pillar 3:", title: "Human-Centric AI", icon: Users,
                desc: "AI should make human expertise more effective, not obsolete. The decision authority stays with the human operator." },
            ].map((p) => (
              <button
                key={p.num}
                onClick={() => setActivePillar(p.num)}
                className="text-left w-full focus:outline-none"
              >
                <GlassCard className={`p-6 transition-all duration-300 cursor-pointer ${
                  activePillar === p.num
                    ? 'ring-2 ring-sky-500 shadow-lg bg-white'
                    : 'hover:shadow-md bg-white/70'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      activePillar === p.num ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-600'
                    }`}>
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{p.label}</h3>
                      <p className={`font-semibold text-sm transition-colors duration-300 ${
                        activePillar === p.num ? 'text-sky-600' : 'text-slate-500'
                      }`}>{p.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </GlassCard>
              </button>
            ))}
          </div>

          {/* Tabbed Detail Panel */}
          <div className="relative">
            {activePillar === 1 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pillar 1: Transparency First</h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The AI industry has a trust problem, and it&apos;s self-inflicted. Most platforms treat
                    their decision-making as proprietary magic — data goes in, recommendations come out,
                    and the customer is expected to trust the black box. We watched this pattern destroy
                    enterprise confidence for two decades before AI even entered the conversation.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    At Aurix, transparency is not a feature toggle. It is the architectural foundation.
                    Every AI decision rendered by our platforms produces a complete reasoning chain: what
                    data was considered, what was weighted, what was excluded, and why.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p><strong className="text-slate-800">Decision Audit Trails:</strong> Every AI-generated recommendation, score, or action is logged with full provenance — the complete decision graph.</p>
                    <p><strong className="text-slate-800">Explainable Outputs:</strong> Our agents don&apos;t just return answers. They return answers with reasoning.</p>
                    <p><strong className="text-slate-800">Human-Readable Governance Logs:</strong> Prism&apos;s governance layer produces narrative-style audit reports that anyone can read.</p>
                    <p><strong className="text-slate-800">The Anti-Palantir Standard:</strong> Where competitors hide complexity behind proprietary walls, we expose it.</p>
                  </div>
                </div>
              </GlassCard>
            )}
            {activePillar === 2 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pillar 2: Security by Design</h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Security-as-afterthought has been the default operating model in enterprise software.
                    Ship the feature, patch the vulnerability, apologize to the customer, repeat.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    At Aurix, security is not a layer bolted on after release. It is embedded at the
                    architectural level from day one.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p><strong className="text-slate-800">Compliance-Native Architecture:</strong> GDPR, NIS2, and emerging regulatory frameworks are design constraints, not checklists.</p>
                    <p><strong className="text-slate-800">Role-Based Access at Every Layer:</strong> Our 5-tier role matrix is enforced at the database level, not the UI level.</p>
                    <p><strong className="text-slate-800">Defog Shield:</strong> Insurance-backed liability transfer — we are the only AI platform that backs its governance guarantees with actual insurance coverage.</p>
                    <p><strong className="text-slate-800">Quantum-Ready Security:</strong> Native quantum computing integration with quantum-resistant encryption protocols.</p>
                  </div>
                </div>
              </GlassCard>
            )}
            {activePillar === 3 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pillar 3: Human-Centric AI</h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The dominant narrative in AI is replacement. We&apos;ve watched this ideology wreck more
                    organizations than any technology failure ever could.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Aurix is built on a fundamentally different premise: AI should make human expertise
                    more effective, not obsolete.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p><strong className="text-slate-800">Truthfulness Over Helpfulness:</strong> Our systems are optimized to be truthful — to give users what they need to know.</p>
                    <p><strong className="text-slate-800">Human-in-the-Loop by Default:</strong> No Aurix agent executes a consequential action without human approval. This is not configurable. It is structural.</p>
                    <p><strong className="text-slate-800">Caspian — The Two-Model Advisory Architecture:</strong> Strategy model evaluates business context, Builder model generates implementation.</p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Why These Principles Exist */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why These Principles Exist</h2>
            <GlassCard className="p-8 md:p-10 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                These three pillars didn&apos;t come from a whiteboard session or a consultant&apos;s
                framework. They came from 25 years of watching enterprise software fail in predictable,
                preventable ways.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Transparency First</strong> exists because we spent years
                debugging systems where nobody could explain how a number was calculated.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Security by Design</strong> exists because we watched
                organizations bolt security onto systems that were never designed for it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Human-Centric AI</strong> exists because we saw what
                happens when automation removes human judgment instead of augmenting it.
              </p>
              <p className="text-slate-600 leading-relaxed italic font-medium">
                We believe with every line of code we write that there is no such thing as a problem without
                a solution.
              </p>
            </GlassCard>
          </div>

        </div>
      </section>

      {/* Leadership / Team */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership</h2>
              <p className="text-slate-600 mb-8 text-sm">The Aurix super-cluster — building enterprise AI from the Pacific Northwest.</p>

              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="w-full">
                    {/* Member Header Row */}
                    <button
                      onClick={() => toggleBio(member.id)}
                      className="w-full flex items-center justify-between p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-sky-200">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-7 h-7 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{member.name}</h4>
                          <p className="text-sm text-sky-600 font-medium">{member.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            {member.location && (
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <MapPin className="w-3 h-3" />{member.location}
                              </span>
                            )}
                            {member.email && (
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Mail className="w-3 h-3" />{member.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {expandedBio === member.id ? (
                          <ChevronUp className="w-5 h-5 text-sky-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Bio Panel */}
                    {expandedBio === member.id && (
                      <div className="mt-1 animate-in slide-in-from-top-2 fade-in duration-300">
                        <div
                          className="rounded-xl overflow-hidden shadow-lg border border-sky-200"
                          style={{ maxWidth: "950px" }}
                        >
                          <div className="bg-sky-600 px-6 py-3">
                            <h5 className="text-white font-bold text-sm tracking-wide">Executive Bio</h5>
                          </div>
                          <div className="bg-white px-6 py-5">
                            <p className="text-slate-600 leading-relaxed text-sm">{member.bio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: The 'Kansas' Incident */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <GlassCard className="p-6 bg-slate-800 border-slate-700">
                  <h3 className="text-white font-bold text-lg mb-3">The 'Kansas' Incident</h3>
                  <p className="text-sm text-slate-400 mb-2 font-bold">Historical Context</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Our architecture was born from the reality of failure. We reference the 'Kansas' scenario — a theoretical catastrophic failure of un-governed AI — as our baseline. We assume the AI <em className="text-sky-300">will</em> fail, the human <em className="text-sky-300">will</em> be complacent, and the data <em className="text-sky-300">will</em> be messy. We build systems that survive those realities.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
