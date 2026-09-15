import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/button";
import { ShieldCheck, BrainCircuit, BarChart3, Database, ArrowRight, CheckCircle2, ShieldAlert, Globe, Hammer, Siren, Shield } from "lucide-react";
import { Link } from "react-router";
import { HeartbeatWave } from "../components/HeartbeatWave";
import { ThreePlatformsSection } from "../components/ThreePlatformsSection";
import { MOUNTAIN } from "../components/heroImages";
import { heroImage as optimizeHero, cardImage } from "../components/optimizeImage";

// Animation Component: Floating Geometric Elements
const FloatingGeometry = () => {
  const elements = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute border border-sky-500/10 bg-sky-500/5 backdrop-blur-sm rounded-3xl"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-600/10 rounded-full blur-[120px]" />
    </div>
  );
};

export function Home() {
  const [taglines, setTaglines] = useState<any[]>([{ id: 'default', text: "Transmute Noise Into Sovereignty", duration: 5000 }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const taglineRef = useRef<HTMLDivElement>(null);
  // Wave replay: fire timed to arrive just before hero text finishes fading
  const [waveKey, setWaveKey] = useState(0);
  const [waveBoltDuration, setWaveBoltDuration] = useState<number | undefined>(undefined);
  const [bgWaveActive, setBgWaveActive] = useState(false);

  // ── Wait for loading screen to finish before firing the first wave ──
  const [pageReady, setPageReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // ── Hero images (declared early so brightness sampling can reference heroImage) ──
  const DEFAULT_HERO_IMAGES = [
    optimizeHero(MOUNTAIN.alpinePeakCerulean),
    optimizeHero(MOUNTAIN.iceClimbingFrozenWaterfall),
    optimizeHero(MOUNTAIN.snowCoveredRidge),
    optimizeHero(MOUNTAIN.summitSunriseClimber),
  ];
  const [heroImages, setHeroImages] = useState(DEFAULT_HERO_IMAGES);
  const heroImagesRef = useRef(DEFAULT_HERO_IMAGES);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGES[0]);
  const [nextHeroImage, setNextHeroImage] = useState<string | null>(null);

  // ── Background brightness sampling for adaptive Strategic Advantage card ──
  const [bgBrightness, setBgBrightness] = useState(0.3);
  const brightnessCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const sampleBrightness = useCallback((imgSrc: string) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => {
      try {
        if (!brightnessCanvasRef.current) {
          brightnessCanvasRef.current = document.createElement("canvas");
        }
        const canvas = brightnessCanvasRef.current;
        const sw = 64;
        const sh = 64;
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, sw, sh);
        const data = ctx.getImageData(Math.floor(sw / 2), 0, Math.floor(sw / 2), sh).data;
        let total = 0;
        const pixelCount = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          total += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        }
        setBgBrightness(total / pixelCount);
      } catch {
        // CORS or other error — keep current brightness
      }
    };
  }, []);

  useEffect(() => {
    sampleBrightness(heroImage);
  }, [heroImage, sampleBrightness]);

  // ── Auto-fit font sizing (keep tagline ≤ 2 lines) ─────────────────────
  const [taglineFontSize, setTaglineFontSize] = useState<number | null>(null);
  const h1ElRef = useRef<HTMLHeadingElement | null>(null);

  const autoFitFont = useCallback(() => {
    const el = h1ElRef.current;
    if (!el) return;

    const isMd = window.matchMedia("(min-width: 768px)").matches;
    const maxSize = isMd ? 72 : 48;
    const minSize = isMd ? 34 : 26;

    el.style.fontSize = `${maxSize}px`;
    void el.offsetHeight;

    const getLineCount = () => {
      const lh =
        parseFloat(getComputedStyle(el).lineHeight) ||
        parseFloat(getComputedStyle(el).fontSize) * 1.25;
      return Math.round(el.scrollHeight / lh);
    };

    if (getLineCount() <= 2) {
      setTaglineFontSize(maxSize);
      measureWaveY();
      return;
    }

    let lo = minSize;
    let hi = maxSize;
    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      el.style.fontSize = `${mid}px`;
      void el.offsetHeight;
      if (getLineCount() <= 2) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    el.style.fontSize = `${lo}px`;
    setTaglineFontSize(lo);
    requestAnimationFrame(measureWaveY);
  }, []);

  const h1RefCallback = useCallback(
    (node: HTMLHeadingElement | null) => {
      h1ElRef.current = node;
      if (node) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            autoFitFont();
          });
        });
      }
    },
    [autoFitFont]
  );

  useEffect(() => {
    const onResize = () => autoFitFont();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [autoFitFont]);

  // ── Wave Y measurement (midpoint between tagline and paragraph) ────────
  const heroSectionRef = useRef<HTMLElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const [waveY, setWaveY] = useState(0);

  const measureWaveY = useCallback(() => {
    if (!heroSectionRef.current || !taglineRef.current || !subtextRef.current) return;
    const heroRect = heroSectionRef.current.getBoundingClientRect();
    const tagRect  = taglineRef.current.getBoundingClientRect();
    const subRect  = subtextRef.current.getBoundingClientRect();
    const midY = (tagRect.bottom + subRect.top) / 2;
    setWaveY(midY - heroRect.top);
  }, []);

  useEffect(() => {
    measureWaveY();
    window.addEventListener("resize", measureWaveY);
    return () => window.removeEventListener("resize", measureWaveY);
  }, [measureWaveY]);

  // ── Fetch remote slideshow images + pick initial random hero ──
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/content.json");
        if (res.ok) {
          const data = await res.json();
          const images = data?.home_slideshow?.images;
          if (images?.length) {
            const optimized = images.map((u: string) => optimizeHero(u));
            setHeroImages(optimized);
            heroImagesRef.current = optimized;
            setHeroImage(optimized[Math.floor(Math.random() * optimized.length)]);
            return;
          }
        }
      } catch {
        // Offline — use defaults
      }
      // Fallback: pick random from defaults
      setHeroImage(heroImagesRef.current[Math.floor(Math.random() * heroImagesRef.current.length)]);
    })();
  }, []);

  // Keep ref in sync when heroImages state changes
  useEffect(() => {
    heroImagesRef.current = heroImages;
  }, [heroImages]);

  // ── Hero image rotation (uses ref to avoid stale closure) ──
  useEffect(() => {
    const interval = setInterval(() => {
      const imgs = heroImagesRef.current;
      let nextIndex = Math.floor(Math.random() * imgs.length);
      while (imgs[nextIndex] === heroImage && imgs.length > 1) {
        nextIndex = Math.floor(Math.random() * imgs.length);
      }
      
      const nextUrl = imgs[nextIndex];
      
      const img = new Image();
      img.src = nextUrl;
      img.onload = () => {
        setNextHeroImage(nextUrl);
        setTimeout(() => {
           setHeroImage(nextUrl);
           setNextHeroImage(null);
        }, 1000);
      };
    }, 12000);
    
    return () => clearInterval(interval);
  }, [heroImage]);

  // ── Load taglines + content from API ──
  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch("/content.json");
        if (res.ok) {
          const data = await res.json();
          if (data?.taglines?.length) {
            setTaglines(data.taglines);
          }
          if (data?.waveBoltDuration) {
            setWaveBoltDuration(data.waveBoltDuration);
          }
        }
      } catch {
        // Offline resilience — use defaults
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (taglines.length === 0 || !pageReady) return;
    const currentDuration = taglines[currentIndex]?.duration || 5000;

    const wt = setTimeout(() => {
      setWaveKey(k => k + 1);
      setBgWaveActive(true);
    }, 100);

    const bt = setTimeout(() => setBgWaveActive(false), 100 + 3800);

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, currentDuration);

    return () => {
      clearTimeout(wt);
      clearTimeout(bt);
      clearTimeout(timer);
    };
  }, [currentIndex, taglines, pageReady]);

  // Adaptive card background based on hero brightness
  const cardBg = bgBrightness > 0.55
    ? "rgba(15,23,42,0.72)"
    : "rgba(15,23,42,0.45)";
  const cardBorder = bgBrightness > 0.55
    ? "rgba(14,165,233,0.25)"
    : "rgba(14,165,233,0.18)";

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900" ref={heroSectionRef}>
        
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0">
             {/* Current Image */}
             <img 
               src={heroImage} 
               alt="Hero Background" 
               className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${bgWaveActive ? 'brightness-110 saturate-125' : 'brightness-100 saturate-100'}`}
             />
             
             {/* Next Image - Overlay Layer */}
             <img 
               src={nextHeroImage || heroImage} 
               alt="Next Hero Background"
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${nextHeroImage ? 'opacity-100' : 'opacity-0'}`}
             />

             {/* Wave-triggered background effects */}
             {bgWaveActive && (
               <>
                 <motion.div
                   className="absolute inset-y-0 pointer-events-none"
                   style={{
                     width: '380px',
                     background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.07) 25%, rgba(186,230,253,0.18) 50%, rgba(56,189,248,0.07) 75%, transparent 100%)',
                     zIndex: 2,
                   }}
                   initial={{ x: '-380px' }}
                   animate={{ x: '120vw' }}
                   transition={{ duration: 0.50, ease: [0.15, 0, 0.85, 1] }}
                 />
                 <motion.div
                   className="absolute inset-y-0 pointer-events-none"
                   style={{
                     width: '260px',
                     background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.04) 40%, rgba(239,68,68,0.09) 50%, rgba(239,68,68,0.04) 60%, transparent 100%)',
                     zIndex: 2,
                   }}
                   initial={{ x: '-260px' }}
                   animate={{ x: '125vw' }}
                   transition={{ duration: 0.52, ease: [0.15, 0, 0.85, 1], delay: 0.015 }}
                 />
                 <motion.div
                   className="absolute inset-0 pointer-events-none"
                   style={{
                     background: 'radial-gradient(ellipse 90% 35% at 50% 58%, rgba(56,189,248,0.10) 0%, rgba(14,165,233,0.04) 50%, transparent 80%)',
                     zIndex: 1,
                   }}
                   initial={{ opacity: 0, scaleX: 0.6 }}
                   animate={{ opacity: [0, 1, 0.6, 0], scaleX: [0.6, 1.15, 1, 0.8] }}
                   transition={{ duration: 2.2, ease: 'easeOut' }}
                 />
               </>
             )}

             {/* Gradient overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent z-10" />
           </div>
           
           <FloatingGeometry />
        </div>

        {/* Content Overlay */}
        <div className="container relative z-20 px-6 md:px-16 pt-20" style={{ marginTop: "-90px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 backdrop-blur-md border border-sky-400/20 text-sky-300 text-sm font-medium shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                The Extraction &amp; Transmutation Engine
              </div>
              <div ref={taglineRef} className="min-h-[160px] flex items-center">
                <AnimatePresence mode="wait">
                  {taglines.length > 0 && (
                    <motion.h1
                      key={`${currentIndex}-${taglines[currentIndex]?.id}`}
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                      ref={h1RefCallback}
                      style={taglineFontSize ? { fontSize: `${taglineFontSize}px` } : {}}
                    ><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-500">{taglines[currentIndex]?.text || "Transmute Noise Into Sovereignty"}</span></motion.h1>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed" ref={subtextRef}>
                Enterprise AI Data Governance &amp; Self-Healing Pipelines.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/about/explainability">
                  <Button size="lg" className="rounded-full px-6 shadow-sky-900/20 shadow-xl hover:shadow-sky-500/20 transition-all">
                    Explainability <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="glass" size="lg" className="rounded-full px-6 border-sky-500/30 hover:bg-sky-500/10">
                    Our Constitution
                  </Button>
                </Link>
              </div>
              <div className="pt-0">
                <Link to="/decisionscape">
                  <Button size="lg" className="rounded-full px-6 shadow-sky-900/20 shadow-xl hover:shadow-sky-500/20 transition-all">
                    Observability <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { value: "$5M", label: "Liability Insurance", color: "text-sky-400" },
                  { value: "90%", label: "Core Code Complete", color: "text-emerald-400" },
                  { value: "350ms", label: "Decision Latency", color: "text-violet-400" },
                  { value: "PNW", label: "HQ Super-Cluster", color: "text-slate-300" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Strategic Advantage Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-end perspective-1000"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div
                  className="p-8 w-full max-w-sm relative overflow-hidden rounded-2xl transition-all duration-700"
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: `1px solid ${cardBorder}`,
                    boxShadow: "0 32px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset",
                    marginLeft: "52px",
                    paddingLeft: "calc(20px + 2rem)",
                  }}
                >
                   <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl" />
                   
                   <h3 className="text-3xl font-semibold text-white mb-6 relative z-10 flex items-center gap-2">
                     Strategic Advantage
                     <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                   </h3>
                   <ul className="space-y-4 relative z-10">
                      {[
                        { icon: Database, text: "Data Governance", link: "/solutions/defog-fluidity" },
                        { icon: ShieldCheck, text: "Enterprise Governance", link: "/solutions/defog-shield" },
                        { icon: BarChart3, text: "AI-Native IDE", link: "/solutions/skylane-one" },
                        { icon: BrainCircuit, text: "Agentic Workflows", link: "/solutions/navtrax" },
                        { icon: ShieldAlert, text: "Cybersecurity", link: "/solutions/defog-shield" },
                        { icon: Globe, text: "Compliance & Industries", link: "/regulatory-compliance" },
                      ].map((item, idx) => (
                        <Link key={idx} to={item.link}>
                          <li className="flex items-center gap-4 text-slate-100 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-sky-500/20 hover:translate-x-2 hover:shadow-lg hover:shadow-sky-500/20">
                            <div className="bg-sky-500/10 p-2 rounded-lg transition-colors duration-300">
                              <item.icon className="w-5 h-5 text-sky-300" />
                            </div>
                            <span className="font-medium text-lg text-slate-200">{item.text}</span>
                          </li>
                        </Link>
                      ))}
                   </ul>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Heartbeat wave — hidden on mobile for performance */}
        <div className="hidden md:block">
          <HeartbeatWave waveY={waveY} trigger={waveKey} />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-sky-400 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sky-50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Intelligence without Compromise
            </h2>
            <ThreePlatformsSection />
            <p className="text-lg text-slate-600">
              We deliver enterprise-grade AI solutions that respect your data privacy and security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Hammer,
                title: "Precision Services",
                desc: "White-glove deployment and 'In-Person Certification' by our Pacific Northwest engineering teams.",
                image: MOUNTAIN.snowyPeakBlueSky,
              },
              {
                icon: ShieldCheck,
                title: "Defog Shield\u2122",
                desc: "Every license includes a $5M white-labeled Cyber/E&O liability policy backed by A+ global carriers.",
                image: MOUNTAIN.valleyFogPeaks,
              },
              {
                icon: Siren,
                title: "RCF Deployment",
                desc: "Rapid Containment & Forensics. A 24/7 global response network (Mandiant/CrowdStrike partners) on speed dial.",
                image: MOUNTAIN.alpinePeakStorm,
              },
            ].map((service, idx) => (
              <GlassCard key={idx} variant="light" className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-slate-200 bg-white cursor-pointer h-full flex flex-col">
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-sky-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <service.icon className="w-5 h-5 text-sky-600" />
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-grow">
                    {service.desc}
                  </p>
                  <Link to="/solutions" className="text-sky-600 text-sm font-medium group-hover:text-sky-700 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Constitution/Trust Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-20 relative z-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Corporate Constitution
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  "We do not build 'Magic'. We build the Operating System that allows humans to command AI with mathematical certainty."
                </p>
                <div className="space-y-4">
                  {[
                    "Deficiency-Driven Design",
                    "Governance Over Speed",
                    "Quantum Readiness",
                    "Skin in the Game (Insured)"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-sky-400 w-5 h-5 flex-shrink-0" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                   <Link to="/about">
                     <Button variant="primary" size="lg">Read Our Full Constitution</Button>
                   </Link>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center">
                {/* Layered ambient glows */}
                <div className="absolute inset-0 bg-sky-500 blur-[120px] opacity-25 rounded-full" />
                <div className="absolute inset-6 bg-white blur-[60px] opacity-[0.07] rounded-full" />

                {/* Glassmorphic card */}
                <div
                  className="relative w-full"
                  style={{
                    borderRadius: "20px",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 60%, rgba(14,165,233,0.06) 100%)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: [
                      "0 32px 64px -16px rgba(0,0,0,0.55)",
                      "0 16px 32px -8px rgba(0,0,0,0.35)",
                      "0 0 0 1px rgba(255,255,255,0.06) inset",
                      "0 1px 0 0 rgba(255,255,255,0.28) inset",
                      "0 -1px 0 0 rgba(0,0,0,0.2) inset",
                      "0 0 80px -20px rgba(14,165,233,0.18)",
                    ].join(", "),
                    transform: "translateY(-6px)",
                  }}
                >
                  {/* Top shine strip */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "10%",
                      right: "10%",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                      borderRadius: "999px",
                    }}
                  />
                  {/* Inner surface highlight */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "20px",
                      background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />

                  <div className="relative p-8">
                    <div className="flex items-start gap-4 mb-6">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="absolute inset-0 rounded-full blur-md opacity-70"
                          style={{ background: "linear-gradient(135deg, #38bdf8, #6366f1)", transform: "scale(1.3)" }}
                        />
                        <div
                          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)", boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 4px 12px rgba(14,165,233,0.4)" }}
                        >
                          A
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg tracking-tight">Aurix Transparency Promise</h4>
                        <p className="text-sky-400/80 text-sm font-medium">Signed by Leadership</p>
                      </div>
                    </div>

                    <p className="text-slate-200 italic mb-6 leading-relaxed text-[15px]"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                      "In an era of black-box AI, Aurix stands for the glass box. We believe that trust is engineered, not just promised."
                    </p>

                    <div
                      className="mb-4"
                      style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                    />

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Verified Standard</span>
                      <span
                        className="font-semibold text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(14,165,233,0.15)",
                          border: "1px solid rgba(14,165,233,0.35)",
                          color: "#38bdf8",
                          boxShadow: "0 0 12px rgba(14,165,233,0.2)",
                        }}
                      >
                        ISO 27001 Compliant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
