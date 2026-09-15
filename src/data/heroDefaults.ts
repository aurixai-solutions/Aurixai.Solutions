/**
 * Default hero configurations for every route.
 * Stored centrally so Layout.tsx can render a shared PageHero.
 * These serve as offline fallbacks — the KV store overrides them when available.
 */

import { MOUNTAIN, TEACHING } from "../app/components/heroImages";

export interface HeroConfig {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  button1?: { label: string; href: string };
  button2?: { label: string; href: string };
}

/** Static route → hero config map (exact path matches) */
export const HERO_DEFAULTS: Record<string, HeroConfig> = {
  // ── Core ────────────────────────────────────────────────────────────
  "/solutions": {
    title: "The Aurix Triple Shield",
    subtitle: "Builders. Auditors. Firefighters.",
    image: MOUNTAIN.steepCliffSnow,
  },
  "/about": {
    title: "The Pacific Northwest Super-Cluster",
    subtitle: "Engineered in Tacoma. Strategized in Seattle. Executed in Portland.",
    image: MOUNTAIN.himalayanPeaksDramatic,
  },
  "/about/explainability": {
    title: "Explainability",
    subtitle: "From black box to glass box — every AI decision traced, inspectable, and auditable end to end.",
    badge: "AI Transparency",
    image: MOUNTAIN.aerialSnowPeaks,
  },
  "/contact": {
    title: "Engage the Super-Cluster",
    subtitle: "Tacoma HQ \u00b7 Seattle Strategy \u00b7 Portland Precision",
    badge: "Contact Us",
    image: MOUNTAIN.snowCoveredRidge,
  },
  "/policy-management": {
    title: "Policy Management",
    subtitle: "Comprehensive governance frameworks designed to ensure regulatory adherence and operational transparency.",
    image: MOUNTAIN.winterPanorama,
  },
  "/industries": {
    title: "Built for Your Industry",
    subtitle: "770+ security capability profiles tailored to the specific threats, compliance requirements, and operational needs of 15 major industries.",
    badge: "Industry Solutions",
    image: MOUNTAIN.valleyFogPeaks,
  },

  // ── SWARM ───────────────────────────────────────────────────────────
  "/solutions/swarm": {
    title: "SWARM",
    subtitle: "Self-Organizing Workforce for Autonomous Resource Management",
    badge: "Autonomous Security Operations",
    image: MOUNTAIN.steepCliffSnow,
  },
  "/solutions/swarm/agents": {
    title: "Autonomous Agents",
    subtitle: "Self-directing AI entities that think, adapt, and execute without constant human oversight",
    badge: "SWARM Intelligence",
    image: MOUNTAIN.highAltitudeIceAxe,
  },
  "/solutions/swarm/vessels": {
    title: "Vessels",
    subtitle: "Purpose-built hardware and software containers for every deployment scenario",
    badge: "Deployment Containers",
    image: MOUNTAIN.verticalRockFaceClimber,
  },
  "/solutions/swarm/embedded-ai": {
    title: "Embedded AI Models",
    subtitle: "Bringing frontier AI reasoning to the edge — without cloud connectivity",
    badge: "Edge Intelligence",
    image: MOUNTAIN.glacierCrevassBlueIce,
  },
  "/solutions/swarm/communications": {
    title: "Communication Architecture",
    subtitle: "Multiple redundant channels ensuring data gets home — even from the most isolated networks",
    badge: "Covert Channels",
    image: MOUNTAIN.snowCoveredRidge,
  },
  "/solutions/swarm/central-management": {
    title: "Central Management",
    subtitle: "Real-time visibility into your autonomous agent fleet",
    badge: "Command & Control",
    image: MOUNTAIN.winterPanorama,
  },
  "/solutions/swarm/lost-agent-recovery": {
    title: "Lost Agent Recovery",
    subtitle: "No agent left behind — intent journaling and intelligent recovery for disconnected operations",
    badge: "Operational Continuity",
    image: MOUNTAIN.mountaineeringGlacier,
  },
  "/solutions/swarm/thread": {
    title: "Thread Fabric",
    subtitle: "From Trigger to Outcome: Complete Visibility Across Every Boundary",
    badge: "Transaction Tracing",
    image: MOUNTAIN.summitSunriseClimber,
  },
  "/solutions/swarm/deployment": {
    title: "Deploy Intelligence Anywhere",
    subtitle: "Any Cloud. Any Data Center. Any Edge Device.",
    badge: "Distributed Architecture",
    image: MOUNTAIN.aerialSnowPeaks,
  },
  "/solutions/swarm/integration": {
    title: "Built Into Everything",
    subtitle: "Describe What You Need. Deploy in Minutes.",
    badge: "Platform Integration",
    image: MOUNTAIN.rockySummitDramatic,
  },

  // ── PHANTOM ─────────────────────────────────────────────────────────
  "/solutions/phantom": {
    title: "Aurix PHANTOM\u2122",
    subtitle: "Parallel Hostile Assessment",
    image: MOUNTAIN.alpinePeakStorm,
  },
  "/solutions/lattice/phantom-audit": {
    title: "PHANTOM Shield\u2122",
    subtitle: "AI-Powered Security & Compliance Auditing — purpose-built for modern enterprise security",
    badge: "AI-Native Audit Platform",
    image: MOUNTAIN.steepCliffSnow,
  },
  "/solutions/lattice/phantom-strike": {
    title: "PHANTOM Strike\u2122",
    subtitle: "Autonomous penetration testing powered by self-orchestrating AI agents ��� discover vulnerabilities before adversaries do",
    image: MOUNTAIN.iceClimberVerticalCascade,
  },
  "/solutions/lattice/phantom-mandate": {
    title: "PHANTOM Mandate\u2122",
    subtitle: "Industry-Specific Audit & Remediation Requirements — technical requirements, control frameworks, and automated remediation scripts tailored to your regulatory landscape",
    image: MOUNTAIN.rockySummitDramatic,
  },
  "/solutions/lattice/phantom-nodes": {
    title: "PHANTOM Nodes\u2122",
    subtitle: "Distributed Linux Scanning Probes for Air-Gapped & Isolated Networks",
    image: MOUNTAIN.highAltitudeIceAxe,
  },
  "/solutions/phantom/audit-services": {
    title: "PHANTOM\u2122 Audit Services",
    subtitle: "AI-Powered Security & Compliance Auditing",
    image: MOUNTAIN.steepCliffSnow,
  },
  "/solutions/phantom/audit-requirements": {
    title: "Industry Audit Requirements",
    subtitle: "Deep technical requirements, control frameworks, assessment methodologies, and automated remediation packages tailored to your industry\u2019s regulatory landscape.",
    image: MOUNTAIN.himalayanPeaksDramatic,
  },

  // ── Lattice ─────────────────────────────────────────────────────────
  "/solutions/lattice": {
    title: "Lattice: The First Stage of Distillation",
    subtitle: "Automated Data Quality & Noise Reduction Engine.",
    badge: "Data Purification",
    image: MOUNTAIN.snowRidgeTraverse,
  },
  "/solutions/lattice/threat-intelligence": {
    title: "Threat Intelligence",
    subtitle: "Real-time adversary intelligence — 2.4 billion indicators processed daily to keep you ahead of every attacker",
    badge: "Aurix Lattice\u2122",
    image: MOUNTAIN.glacierCrevassBlueIce,
  },
  "/solutions/lattice/behavioral-analytics": {
    title: "Behavioral Analytics",
    subtitle: "UEBA powered by ML — detect insider threats, compromised accounts, and lateral movement before damage is done",
    badge: "Aurix Lattice\u2122",
    image: MOUNTAIN.summitSunriseClimber,
  },
  "/solutions/lattice/deployment": {
    title: "Deployment",
    subtitle: "Deploy in hours, not months — cloud-native, on-premises, or hybrid architecture",
    badge: "Aurix Lattice\u2122",
    image: MOUNTAIN.aerialSnowPeaks,
  },
  "/solutions/lattice/capability-profiles": {
    title: "Security Capability Profiles",
    subtitle: "770+ industry-specific threat detection profiles — pre-built by domain experts, deployable in hours",
    image: MOUNTAIN.snowRidgeTraverse,
  },

  // ── Prism ───────────────────────────────────────────────────────────
  "/solutions/prism": {
    title: "Prism: The Final Transmutation",
    subtitle: "Zero-Trust Governance & Cryptographic Data Borders.",
    badge: "Security Core",
    image: MOUNTAIN.dolomiteSpires,
  },
  "/solutions/prism/pen": {
    title: "Aurix PEN\u2122",
    subtitle: "Pipeline Engineering Network — Build enterprise data pipelines in minutes, not months. Visual design, AI-assisted automation, and native Prism\u2122 integration.",
    badge: "Data Engineering Platform",
    image: MOUNTAIN.iceClimbingFrozenWaterfall,
  },
  "/solutions/prism/self-healing": {
    title: "Self-Optimizing Pipelines",
    subtitle: "Data Quality is not a chore. It is an automated loop.",
    image: MOUNTAIN.expeditionTeamSummit,
  },
  "/solutions/prism/digital-twin": {
    title: "Digital Twin",
    subtitle: "Full-fidelity data lineage modeling — see every transformation, dependency, and impact before it happens",
    image: MOUNTAIN.mountaineerCrossingGlacier,
  },
  "/solutions/prism/prismgpt": {
    title: "PrismGPT",
    subtitle: "Natural language interface for data governance — ask questions, get answers, take action",
    image: MOUNTAIN.alpinePeakCerulean,
  },

  // ── Sentinel / Clarity ──────────────────────────────────────────────
  "/solutions/sentinel": {
    title: "Aurix SENTINEL\u2122",
    subtitle: "Multi-AI Orchestration & Governance — Enterprise Command Center for AI",
    image: MOUNTAIN.verticalGraniteCliff,
  },
  "/solutions/sentinel/clarity": {
    title: "Clarity\u2122 & DecisionScape",
    subtitle: "Don't Just Audit. Simulate.",
    image: MOUNTAIN.climberBelaying,
  },
  "/solutions/sentinel/gateway": {
    title: "AI Gateway",
    subtitle: "The secure entry point for every AI interaction — policy enforcement, routing, and observability for your entire AI estate",
    image: MOUNTAIN.alpinePeakStorm,
  },
  "/solutions/sentinel/audit": {
    title: "Audit Store",
    subtitle: "Immutable, cryptographically signed records of every AI decision — the compliance foundation your auditors require",
    image: MOUNTAIN.winterMassif,
  },

  // ── Shield ──────────────────────────────────────────────────────────
  "/solutions/shield": {
    title: "Aurix Shield\u2122 Guarantee",
    subtitle: "We Don\u2019t Just Promise Safety. We Insure It.",
    image: MOUNTAIN.glacialIceWallBlue,
  },

  // ── Agenta.Red ──────────────────────────────────────────────────────
  "/solutions/agenta": {
    title: "Agenta.Red",
    subtitle: "The Vanguard Application \u2014 90% Code Complete",
    badge: "Private Beta \u00b7 Running on Aurix OS",
    image: MOUNTAIN.climberBelaying,
  },
  "/solutions/agenta/campaigns": {
    title: "Hybrid Automated Campaigns",
    subtitle: "Agenta.Red Campaigns — AI agents that plan, write, launch, and optimise your campaigns while your team focuses on strategy",
    image: MOUNTAIN.alpinePeakCerulean,
  },
  "/solutions/agenta/prospecting": {
    title: "Agenta Prospecting",
    subtitle: "Coming Soon",
    badge: "Agenta.Red",
    image: MOUNTAIN.snowCoveredRidge,
  },
  "/solutions/agenta/pipelines": {
    title: "Agenta Pipelines",
    subtitle: "Coming Soon",
    badge: "Agenta.Red",
    image: MOUNTAIN.snowCoveredRidge,
  },
  "/solutions/agenta/analytics": {
    title: "Agenta Analytics",
    subtitle: "Coming Soon",
    badge: "Agenta.Red",
    image: MOUNTAIN.snowCoveredRidge,
  },

  // ── Forge / AgenticMind / AgentVerse ────────────────────────────────
  "/solutions/forge-studio": {
    title: "AgenticMind\u2122",
    subtitle: "Build, deploy, and govern production-ready AI agents and autonomous workflows with 1,015+ pre-built components.",
    badge: "Agentic Framework & Process Builder",
    image: MOUNTAIN.highAltitudeIceAxe,
  },
  "/solutions/agentic-mind": {
    title: "AgenticMind™",
    subtitle: "The No-Boundaries Agentic Framework — Distill, Connect, and Govern AI Agents Without Code.",
    badge: "Sovereign Workflows",
    image: MOUNTAIN.highAltitudeIceAxe,
  },
  "/solutions/agentverse": {
    title: "AgenticVerse",
    subtitle: "The Universal Agent Governor — discover, subscribe, wrap, govern, meter, pay, and publish agents across every marketplace and protocol",
    badge: "Universal Agent Marketplace & Governance",
    image: MOUNTAIN.iceClimbingFrozenWaterfall,
  },

  // ── Lustro ──────────────────────────────────────────────────────────
  "/solutions/lustro": {
    title: "Aurix Lustro\u2122",
    subtitle: "The Blackbird Lab Engine",
    image: MOUNTAIN.aerialSnowPeaks,
  },
  "/solutions/lustro/data-model": {
    title: "Infrastructure Schema Reference",
    subtitle: "Comprehensive documentation of Lustro\u2019s 50+ entity types, relationships, and data normalization for enterprise infrastructure mapping",
    image: MOUNTAIN.toweringSpire,
  },
  "/solutions/lustro/environment": {
    title: "Azure-Hosted Infrastructure Mirroring",
    subtitle: "Deploy complete replicas of production infrastructure for training, testing, and demonstrations — zero production risk",
    image: MOUNTAIN.winterPanorama,
  },
  "/solutions/lustro/integrations": {
    title: "Tool Integrations",
    subtitle: "40+ security and infrastructure tool integrations — import, normalize, and cross-reference data from your entire ecosystem",
    image: MOUNTAIN.alpineLakeReflection,
  },
  "/solutions/lustro/interfaces": {
    title: "Lustro Interfaces",
    subtitle: "Deep bidirectional interfaces to 24+ security and IT tools — enriching your infrastructure data store in real time",
    image: MOUNTAIN.climberBelaying,
  },

  // ── Data capabilities ───────────────────────────────────────────────
  "/solutions/data-sovereignty": {
    title: "Data Sovereignty",
    subtitle: "True Data Sovereignty in a Hyperscaler World — The pure chemical essence of your market data, securely contained.",
    badge: "Sovereignty as a Service",
    image: MOUNTAIN.verticalRockFaceClimber,
  },
  "/solutions/hallucination-mitigation": {
    title: "AI Hallucination Mitigation",
    subtitle: "Parallel Sentinel Architecture for real-time detection and recovery.",
    badge: "AI Safety & Reliability",
    image: MOUNTAIN.mountaineeringGlacier,
  },
  "/solutions/real-time-monitoring": {
    title: "Real-Time Monitoring",
    subtitle: "Trace Profiling & Live Observability — sub-second visibility into every transaction, API call, and data flow",
    image: MOUNTAIN.toweringSpire,
  },
  "/solutions/security-profiles": {
    title: "Security Capability Profiles",
    subtitle: "770+ industry-specific threat detection profiles — pre-built by domain experts, deployable in hours",
    image: MOUNTAIN.snowRidgeTraverse,
  },
  "/solutions/demos": {
    title: "Solution Demos",
    subtitle: "See Aurix in Action — video demonstrations of each platform in real enterprise environments",
    image: MOUNTAIN.dolomiteSpires,
  },

  // ── Concept / Category pages ───────────────────────────────────────
  "/solutions/data-governance": {
    title: "Data Governance",
    subtitle: "Enterprise-grade data governance powered by transparent AI — policies, lineage, and compliance in a single platform.",
    badge: "Coming Soon",
    image: MOUNTAIN.winterPanorama,
  },
  "/solutions/data-quality": {
    title: "Data Quality Assurance",
    subtitle: "Autonomous data quality monitoring, profiling, and self-healing pipelines that maintain trust in every dataset.",
    badge: "Coming Soon",
    image: MOUNTAIN.glacierCrevassBlueIce,
  },
  "/solutions/marketing-intelligence": {
    title: "Marketing Intelligence",
    subtitle: "AI-native revenue intelligence — autonomous agents that prospect, qualify, and close alongside your team.",
    badge: "Coming Soon",
    image: MOUNTAIN.summitSunriseClimber,
  },
  "/solutions/agentic-frameworks": {
    title: "Agentic Frameworks",
    subtitle: "Build, deploy, and govern production-ready AI agents and autonomous workflows with safety guardrails.",
    badge: "Coming Soon",
    image: MOUNTAIN.highAltitudeIceAxe,
  },
  "/solutions/cybersecurity": {
    title: "Cybersecurity & PEN Testing",
    subtitle: "Proactive defense strategies — autonomous penetration testing and continuous threat monitoring for your digital infrastructure.",
    badge: "Coming Soon",
    image: MOUNTAIN.alpinePeakStorm,
  },
  "/solutions/industries": {
    title: "Industry Solutions",
    subtitle: "Tailored AI solutions for highly regulated sectors — Finance, Healthcare, Government, and more.",
    badge: "Coming Soon",
    image: MOUNTAIN.valleyFogPeaks,
  },

  // ── Learn / Education ───────────────────────────────────────────────
  "/learn": {
    title: "The Aurix Curriculum",
    subtitle: "Master Data Governance, Quality & Security \u2014 a comprehensive 8-part curriculum for business leaders",
    image: TEACHING.digitalLearning,
  },
  "/learn/data-landscape": {
    title: "The Data Landscape",
    subtitle: "A Bird\u2019s Eye View — understand how data flows, where it lives, and why modern infrastructure matters",
    badge: "Part 1 \u2014 Lesson 2: Foundations",
    image: TEACHING.mentoringSession,
  },
  "/learn/what-is-data-governance": {
    title: "What is Data Governance?",
    subtitle: "The Definition in Plain Language — how organisations take control of their data assets",
    badge: "Part 2 \u2014 Lesson 9: Governance Essentials",
    image: TEACHING.modernClassroom,
  },
  "/learn/what-is-data-quality": {
    title: "The Six Dimensions of Data Quality",
    subtitle: "How to measure, monitor, and improve data quality across your organisation",
    badge: "Part 3 \u2014 Lesson 17: Quality",
    image: TEACHING.workshopWhiteboard,
  },
  "/learn/regulatory-compliance": {
    title: "AI Regulatory Compliance",
    subtitle: "Navigate the Global AI Regulatory Landscape — from GDPR and EU AI Act to industry-specific requirements",
    image: TEACHING.mentoringSession,
  },
  "/learn/step-by-step": {
    title: "Step-by-Step Learning",
    subtitle: "Master Data Governance, Quality & Security — a comprehensive 8-part curriculum for business leaders",
    image: TEACHING.digitalLearning,
  },
  "/start-here": {
    title: "Sometimes You Don\u2019t Know What You Don\u2019t Know",
    subtitle: "And that\u2019s perfectly okay \u2014 this page is for decision makers, board members, and curious minds who want to understand what we actually do.",
    badge: "Resources \u00b7 Start Here",
    image: TEACHING.teamLearning,
  },

  // ── Developer ───────────────────────────────────────────────────────
  "/developer-ecosystem": {
    title: "Build Once. Share Everywhere.",
    subtitle: "The World\u2019s First Enterprise AI Data Platform with a Developer Marketplace.",
    badge: "Developer Ecosystem",
    image: MOUNTAIN.snowCoveredRidge,
  },
  "/api-docs": {
    title: "API Documentation",
    subtitle: "Complete reference for the Aurix API — RESTful endpoints, webhooks, and real-time streaming.",
    badge: "Documentation",
    image: MOUNTAIN.summitSunriseClimber,
  },

  // ── About-family ────────────────────────────────────────────────────
  "/careers": {
    title: "Careers at Aurix",
    subtitle: "Help us build the Human Interface\u2122 for artificial intelligence.",
    badge: "\ud83d\ude80 Join Us",
    image: MOUNTAIN.winterMassif,
  },
  "/blog": {
    title: "Insights & Research",
    subtitle: "Technical deep dives, industry analysis, and product perspectives from the Aurix team.",
    badge: "Insights",
    image: MOUNTAIN.snowyPeakBlueSky,
  },
  "/case-studies": {
    title: "Blackbird Lab Simulations",
    subtitle: "Projected Outcomes based on Adversarial Modeling",
    badge: "Simulations",
    image: MOUNTAIN.frozenWaterfallClimbing,
  },
  "/patents": {
    title: "Patent Portfolio",
    subtitle: "Innovations protected by pending patents across AI safety, transparency, data engineering, agentic AI, and security.",
    badge: "Innovation",
    image: MOUNTAIN.peakSunsetGolden,
  },
  "/media": {
    title: "Advertisements & Media",
    subtitle: "Watch our latest product demos, customer stories, and thought leadership content.",
    badge: "Media",
    image: MOUNTAIN.peakSunsetGolden,
  },
  "/global": {
    title: "Global Operations & RCF",
    subtitle: "Follow-the-Sun Support & Forensics",
    badge: "International",
    image: MOUNTAIN.jaggedPeaksClouds,
  },

  // ── Utility ─────────────────────────────────────────────────────────
  "/demo": {
    title: "See Aurix in Action",
    subtitle: "Book a personalized demo with our engineering team.",
    badge: "Schedule a Demo",
    image: MOUNTAIN.alpinePeakCerulean,
  },
  "/clarity-demo": {
    title: "See Aurix in Action",
    subtitle: "Schedule a personalized demo with our team.",
    badge: "Schedule a Demo",
    image: MOUNTAIN.alpinePeakCerulean,
  },
  "/coming-soon": {
    title: "Something Great Is Coming",
    subtitle: "We\u2019re working hard to bring you this new capability.",
    badge: "Coming Soon",
    image: MOUNTAIN.alpinistRidgeWalk,
  },
  "/regulatory-compliance": {
    title: "Regulatory Compliance",
    subtitle: "Built-In, Not Bolted On — The Only AI Platform Designed for Compliance from the Ground Up",
    image: MOUNTAIN.alpineLakeReflection,
  },
  "/training": {
    title: "Aurix Training Academy",
    subtitle: "Comprehensive training programs for every role — from executives to engineers",
    image: TEACHING.professionalTraining,
  },
  "/video-showcase": {
    title: "Data Theater",
    subtitle: "Watch and learn — product demos, tutorials, case studies, and educational content from the Aurix team",
    image: MOUNTAIN.verticalGraniteCliff,
  },
  "/decisionscape": {
    title: "DecisionScape\u2122",
    subtitle: "AI Decision Observability \u2014 See How AI Thinks. Every path explored, every factor weighed.",
    badge: "Aurix AI Solutions \u00d7 Claude",
    image: MOUNTAIN.verticalRockFaceClimber,
  },
};

/**
 * Resolve hero config for a given pathname.
 * 1. Exact match in HERO_DEFAULTS
 * 2. Generic fallback from path segments
 */
export function resolveHeroConfig(pathname: string): HeroConfig | null {
  // Skip home and admin
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  // Exact match
  if (HERO_DEFAULTS[pathname]) return HERO_DEFAULTS[pathname];

  // Generic fallback: derive title from last path segment
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";
  const title = last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title,
    subtitle: "Aurix AI Solutions",
    image: MOUNTAIN.alpinePeakCerulean,
  };
}