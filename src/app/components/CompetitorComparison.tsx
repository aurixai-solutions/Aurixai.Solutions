import React, { useState, useEffect, useRef } from "react";
import { Shield, Play, CheckCircle, AlertTriangle, Terminal } from "lucide-react";
const laptopImage = "/images/laptop-comparison.png";

/**
 * CONFIGURATION
 * ------------------------------------------------------------------
 * VIDEO_URL: Leave blank ("") to force Text Mode until you have the file.
 * LAPTOP_IMAGE_URL: Using the imported Figma asset.
 */
const VIDEO_URL = "";
const LAPTOP_IMAGE_URL = laptopImage;

const AUDIT_LOGS = [
  "Initializing Agentic Analysis Protocol...",
  "Scanning target documentation for SLA liabilities...",
  "Querying Global Insurance Databases...",
  "\u26a0 ALERT: No Native Liability Insurance found...",
  "Analyzing Data Ingestion Pipelines...",
  "Cross-referencing RCF capabilities...",
  "Running Blackbird Lab Simulation...",
  "Verifying Quantum-Readiness routing...",
  "calculating_liability_delta.exe running...",
  "Comparing SOC 2 Type II status...",
  "Validating Aurix Shield\u2122 Guarantee...",
  "Synthesizing DecisionTrace\u2122 Report...",
];

export function CompetitorComparison() {
  const [competitor, setCompetitor] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [auditLogIndex, setAuditLogIndex] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- AUDIO / TEXT LOOP LOGIC ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnalyzing && !showVideo && auditLogIndex < AUDIT_LOGS.length) {
      interval = setInterval(() => {
        setAuditLogIndex((prev) => prev + 1);
      }, 1800);
    } else if (auditLogIndex >= AUDIT_LOGS.length) {
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, showVideo, auditLogIndex]);

  // --- HANDLE ANALYSIS TRIGGER ---
  const handleAnalyze = () => {
    if (!competitor) return;
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAuditLogIndex(0);

    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e));
    }
  };

  return (
    <section
      id="aurix-arena-component"
      className="relative w-full py-16 lg:py-24 bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans isolate rounded-3xl"
      style={{ isolation: "isolate" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 -z-10 rounded-3xl" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            The <span className="text-sky-400">Aurix Arena</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Don't guess. Simulate. Run a live forensic audit against any
            competitor.
          </p>
        </div>

        {/* Input Control Panel */}
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 flex items-center mb-12 shadow-2xl shadow-sky-900/10 transition-all focus-within:border-sky-500/50 focus-within:shadow-sky-500/20">
          <input
            type="text"
            placeholder="Enter Competitor (e.g., OneTrust)..."
            className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-slate-600 text-lg"
            value={competitor}
            onChange={(e) => setCompetitor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />

          {/* Toggle only appears if VIDEO_URL is valid */}
          {VIDEO_URL && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`mr-3 p-2 rounded-lg transition-all ${
                showVideo
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-600 hover:text-slate-400"
              }`}
              title={showVideo ? "Switch to Text Mode" : "Switch to Video Mode"}
            >
              {showVideo ? <Play size={20} /> : <Terminal size={20} />}
            </button>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!competitor || isAnalyzing}
            className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
          >
            {isAnalyzing ? "RUNNING..." : "AUDIT"}
          </button>
        </div>

        {/* --- THE STAGE --- */}
        <div className="relative w-full max-w-4xl aspect-[16/10] flex items-center justify-center">
          {/* 1. LAPTOP IMAGE (SENT TO BACK via z-0) */}
          <img
            src={LAPTOP_IMAGE_URL}
            alt="Audit Terminal"
            className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none select-none"
          />

          {/* 2. SCREEN CONTENT (BROUGHT TO FRONT via z-20) */}
          <div
            className="absolute z-20 bg-black overflow-hidden perspective-[1000px] rounded-t-sm"
            style={{
              top: "4.2%",
              left: "3.6%",
              width: "92.8%",
              height: "80.5%",
              transform: "rotateX(0deg)",
            }}
          >
            <div className="w-full h-full relative">
              {/* VIDEO LAYER */}
              <video
                ref={videoRef}
                src={VIDEO_URL}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  showVideo ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                loop={false}
                muted={false}
                playsInline
                onEnded={() => setAnalysisComplete(true)}
              />

              {/* TEXT CONSOLE LAYER */}
              <div
                className={`absolute inset-0 bg-black p-4 md:p-8 font-mono text-sm md:text-base overflow-hidden flex flex-col justify-end transition-opacity duration-700 ${
                  !showVideo ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_4px,6px_100%] z-20 opacity-20" />

                <div className="space-y-1 md:space-y-2 z-10 pb-2 relative">
                  {AUDIT_LOGS.slice(0, auditLogIndex + 1).map((log, i) => (
                    <div
                      key={i}
                      className={`flex items-start space-x-2 ${
                        log.includes("ALERT")
                          ? "text-amber-500"
                          : log.includes("Validating")
                          ? "text-sky-400"
                          : "text-slate-400"
                      }`}
                    >
                      <span className="opacity-30 text-[10px] mt-1 shrink-0">
                        [{new Date().toLocaleTimeString()}]
                      </span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {isAnalyzing && !analysisComplete && (
                    <span className="animate-pulse text-sky-500 ml-2">_</span>
                  )}
                </div>
              </div>

              {/* RESULT OVERLAY (Appears after Audit completes) */}
              {analysisComplete && (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                  <Shield className="w-12 h-12 md:w-16 md:h-16 text-sky-400 mb-4 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Audit Complete
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Liability Analysis Finalized
                  </p>

                  <div className="w-3/4 grid grid-cols-2 gap-3 text-left">
                    {/* Competitor Box */}
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-red-400 text-[10px] uppercase font-bold tracking-wider truncate">
                          {competitor || "TARGET"}
                        </span>
                      </div>
                      <span className="text-white text-xs md:text-sm font-semibold">
                        Uninsured Liability
                      </span>
                    </div>

                    {/* Aurix Box */}
                    <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle size={14} className="text-sky-400" />
                        <span className="text-sky-400 text-[10px] uppercase font-bold tracking-wider">
                          AURIX AI
                        </span>
                      </div>
                      <span className="text-white text-xs md:text-sm font-semibold">
                        $5M Guarantee
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAnalysisComplete(false);
                      setIsAnalyzing(false);
                      setCompetitor("");
                    }}
                    className="mt-6 text-xs text-slate-500 hover:text-white transition-colors underline"
                  >
                    Run New Audit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompetitorComparison;