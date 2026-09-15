import React, { useState, useEffect } from "react";
import { PageHero } from "../components/ui/PageHero";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, Eye, Users, User } from "lucide-react";
import { Link } from "react-router";
import { MOUNTAIN } from "../components/heroImages";

export function About() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [activePillar, setActivePillar] = useState(1);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch('/content.json');
        if (res.ok) {
          const data = await res.json();
          if (data.executive_team && Array.isArray(data.executive_team) && data.executive_team.length > 0) {
            setTeamMembers(data.executive_team);
          }
        }
      } catch (e) {}
    };
    loadContent();
  }, []);

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

          {/* Clickable Pillar Cards — act as tab selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: 1, label: "Pillar 1:", title: "Transparency First", icon: Eye,
                desc: "No black boxes. We provide full visibility into how our AI models make decisions and handle your data." },
              { num: 2, label: "Pillar 2:", title: "Security by Design", icon: Shield,
                desc: "Our systems are built with security as a foundational layer, not an afterthought. Your data\u2019s integrity is paramount." },
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
            {/* Pillar 1: Transparency First */}
            {activePillar === 1 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Pillar 1: Transparency First
                </h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The AI industry has a trust problem, and it&apos;s self-inflicted. Most platforms treat
                    their decision-making as proprietary magic — data goes in, recommendations come out,
                    and the customer is expected to trust the black box. We watched this pattern destroy
                    enterprise confidence for two decades before AI even entered the conversation. ERP
                    systems that couldn&apos;t explain their own calculations. BI platforms that surfaced
                    insights with no audit trail. CRM tools that scored leads with invisible logic.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    At Aurix, transparency is not a feature toggle. It is the architectural foundation.
                    Every AI decision rendered by our platforms produces
                    a complete reasoning chain: what data was considered, what was weighted, what was
                    excluded, and why. This isn't a debug mode for developers. This is the default
                    experience for every user at every role level.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      <strong className="text-slate-800">Decision Audit Trails:</strong> Every AI-generated
                      recommendation, score, or action is logged with full provenance. Not just timestamps —
                      the complete decision graph. Which data sources contributed, what confidence thresholds
                      were applied, what alternatives were considered and rejected.
                    </p>
                    <p>
                      <strong className="text-slate-800">Explainable Outputs:</strong> Our agents don&apos;t
                      just return answers. They return answers with reasoning. A marketing recommendation
                      from Agenta tells you why it&apos;s recommending a specific channel, what historical
                      data supports it, and what the risk profile looks like if conditions change.
                    </p>
                    <p>
                      <strong className="text-slate-800">Human-Readable Governance Logs:</strong> Prism&apos;s
                      governance layer doesn&apos;t produce machine logs that require a data engineer to
                      interpret. It produces narrative-style audit reports that a compliance officer, a board
                      member, or a regulator can read and understand without technical translation.
                    </p>
                    <p>
                      <strong className="text-slate-800">The Anti-Palantir Standard:</strong> We position
                      explicitly against the opacity model. Where competitors hide complexity behind
                      proprietary walls, we expose it. Not because it&apos;s easy — it&apos;s significantly
                      harder to build transparent systems — but because trustworthy AI cannot exist without
                      it. If a customer can&apos;t explain to their own board how our platform reached a
                      conclusion, we have failed.
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Pillar 2: Security by Design */}
            {activePillar === 2 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Pillar 2: Security by Design
                </h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Security-as-afterthought has been the default operating model in enterprise software
                    for as long as enterprise software has existed. Ship the feature, patch the vulnerability,
                    apologize to the customer, repeat. We&apos;ve sat in enough post-breach war rooms to know
                    exactly how that cycle plays out — and exactly what it costs. Not just in dollars, but in
                    customer trust, regulatory exposure, and institutional reputation that takes years to rebuild.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    At Aurix, security is not a layer bolted on after release. It is embedded at the
                    architectural level from day one. Our systems ship with GDPR and NIS2 compliance as
                    structural requirements, not optional modules. Every data pipeline, every API endpoint,
                    every agent interaction is designed with the assumption that it will be audited, attacked,
                    and scrutinized.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      <strong className="text-slate-800">Compliance-Native Architecture:</strong> GDPR, NIS2,
                      and emerging regulatory frameworks aren&apos;t checklists we complete before launch.
                      They&apos;re design constraints that shape how systems are built. Data residency, consent
                      management, right-to-erasure, breach notification — these are first-class architectural
                      concerns, not aftermarket add-ons.
                    </p>
                    <p>
                      <strong className="text-slate-800">Aurix AI — Cybersecurity Intelligence Platform:</strong> We
                      didn't build a security product because the market needed one. We built it because our
                      own infrastructure demanded it. Aurix AI is the same threat intelligence and response platform
                      we use internally, productized for customers who need the same level of protection.
                    </p>
                    <p>
                      <strong className="text-slate-800">Role-Based Access at Every Layer:</strong> Our 5-tier
                      role matrix (Super Admin, Admin, Editor, User, Viewer) is enforced at the database level,
                      not the UI level. A Viewer doesn&apos;t just see a disabled button — the API rejects the
                      request entirely. There is no path from the frontend to an unauthorized action.
                    </p>
                    <p>
                      <strong className="text-slate-800">Defog Shield — Insurance-Backed Liability Transfer:</strong> We
                      are the only AI platform that backs its governance guarantees with actual insurance coverage.
                      This isn't a marketing gimmick — it's a structural commitment. If our platform&apos;s
                      governance layer fails to catch a compliance violation, the liability doesn't sit with
                      the customer.
                    </p>
                    <p>
                      <strong className="text-slate-800">Quantum-Ready Security:</strong> Aurix is the only AI
                      company launching with native quantum computing integration across all agents. This includes
                      quantum-resistant encryption protocols and quantum-classical hybrid decision systems that
                      cannot be retrofitted by competitors operating on legacy architectures.
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Pillar 3: Human-Centric AI */}
            {activePillar === 3 && (
              <GlassCard className="p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Pillar 3: Human-Centric AI
                </h2>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What This Means</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The dominant narrative in AI is replacement. Automate the human out of the loop.
                    Reduce headcount. Cut costs. We&apos;ve watched this ideology wreck more organizations
                    than any technology failure ever could. Not because automation is wrong, but because
                    undirected automation is dangerous. Systems that remove human judgment don&apos;t
                    eliminate errors — they eliminate the ability to catch errors before they compound.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Aurix is built on a fundamentally different premise: AI should make human expertise
                    more effective, not obsolete. Our agents are designed as collaborators, not replacements.
                    They surface patterns humans would miss, handle repetitive processing humans shouldn&apos;t
                    waste time on, and present options with context — but the decision authority stays with the
                    human operator. Always.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">How We Enforce It</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      <strong className="text-slate-800">Truthfulness Over Helpfulness:</strong> This is our core
                      governance principle and it cuts against the entire industry. Most AI systems are optimized
                      to be helpful — to give users what they want to hear. Our systems are optimized to be
                      truthful — to give users what they need to know, even when it&apos;s uncomfortable. An
                      Agenta campaign recommendation that says &quot;this strategy has a 30% chance of failure
                      based on historical precedent&quot; is more valuable than one that says &quot;great idea,
                      here&apos;s how to execute it.&quot;
                    </p>
                    <p>
                      <strong className="text-slate-800">Human-in-the-Loop by Default:</strong> No Aurix agent
                      executes a consequential action without human approval. Suggestions, recommendations,
                      analysis, pattern detection — all automated. Execution of decisions that affect customers,
                      budgets, security posture, or compliance status — all require human confirmation. This is
                      not configurable. It is structural.
                    </p>
                    <p>
                      <strong className="text-slate-800">Caspian — The Two-Model Advisory Architecture:</strong> Our
                      AI advisor doesn&apos;t just answer questions. It runs a Strategy model that evaluates
                      business context and a Builder model that generates implementation. Neither model operates
                      alone. The Strategy layer is trained on $300B+ in documented business failures — Quibi,
                      WeWork, Theranos, Bud Light — specifically so it can tell you when your plan resembles a
                      pattern that has already failed. That&apos;s not adversarial. That&apos;s partnership.
                    </p>
                    <p>
                      <strong className="text-slate-800">Aurix AI — Visual Human-AI Collaboration:</strong> Our
                      workflow canvas is designed so that humans can see, modify, and understand every step of an
                      AI-driven process. It&apos;s not a black box pipeline. It&apos;s a visual workspace where
                      human operators maintain full situational awareness of what AI agents are doing, why, and
                      what they&apos;ll do next. The human is always the conductor, never the passenger.
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Why These Principles Exist */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Why These Principles Exist
            </h2>
            <GlassCard className="p-8 md:p-10 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                These three pillars didn&apos;t come from a whiteboard session or a consultant&apos;s
                framework. They came from 25 years of watching enterprise software fail in predictable,
                preventable ways.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Transparency First</strong> exists because we spent years
                debugging systems where nobody could explain how a number was calculated. We sat in meetings
                where a BI dashboard showed a figure, a stakeholder asked &quot;where does that come
                from,&quot; and the room went silent. That silence costs organizations millions in bad
                decisions made on unverifiable data.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Security by Design</strong> exists because we watched
                organizations bolt security onto systems that were never designed for it, then act surprised
                when the bolts sheared off. Every major breach we&apos;ve witnessed followed the same
                pattern: a system built for functionality first, with security treated as someone else&apos;s
                problem, until it became everyone&apos;s problem.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Human-Centric AI</strong> exists because we saw what
                happens when automation removes human judgment instead of augmenting it. Organizations that
                automate without governance don&apos;t get efficiency — they get faster mistakes with no
                circuit breaker.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Aurix isn&apos;t building AI platforms because the market is hot. We&apos;re building them
                because after 25 years of enterprise architecture, we know exactly what&apos;s missing — and
                we know exactly how to build it right.
              </p>
              <p className="text-slate-600 leading-relaxed italic font-medium">
                We believe with every line of code we write that there is no such thing as a problem without
                a solution.
              </p>
            </GlassCard>
          </div>

        </div>
      </section>

      {/* Leadership / Team (Abstract) */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership</h2>
              <p className="text-slate-600 mb-8 text-sm">Founder (Tacoma), CTO (Seattle/Issaquah - Enterprise Cloud Architect), Director of Precision Services (Portland). The 'Super-Cluster' model.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {teamMembers.length > 0 ? (
                  // Use dynamic team members
                  teamMembers.map((member, i) => (
                    <div key={member.id || i} className="group relative overflow-hidden rounded-2xl shadow-lg border border-slate-200" style={{ minHeight: '380px' }}>
                      <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <User className="w-20 h-20 text-slate-300" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h4 className="text-white font-bold text-lg">{member.name}</h4>
                        <p className="text-sky-300 text-sm font-medium mb-2">{member.title}</p>
                        {member.description && (
                          <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed mb-2">
                            {member.description}
                          </p>
                        )}
                        {member.id && (
                          <Link
                            to={`/about/team/${member.id}`}
                            className="inline-flex items-center text-sky-400 hover:text-sky-300 text-xs font-medium transition-colors"
                          >
                            Read more &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback to placeholders if no records
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg border border-slate-200">
                       <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                          <User className="w-16 h-16 text-slate-300 opacity-50" />
                       </div> 
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                       <div className="absolute bottom-0 left-0 p-6">
                         <h4 className="text-white font-bold text-lg">Executive Name</h4>
                         <p className="text-sky-300 text-sm">Position Title</p>
                       </div>
                     </div>
                  ))
                )}
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