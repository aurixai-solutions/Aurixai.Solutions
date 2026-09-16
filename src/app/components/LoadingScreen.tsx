import React, { useEffect, useState } from "react";
import { MOUNTAIN } from "./heroImages";
import { heroImage as optimizeHero } from "./optimizeImage";

/* ── Resources to preload during the loading screen ── */
const CAROUSEL_IMAGES = [
  optimizeHero(MOUNTAIN.alpinePeakCerulean),
  optimizeHero(MOUNTAIN.iceClimbingFrozenWaterfall),
  optimizeHero(MOUNTAIN.snowCoveredRidge),
  optimizeHero(MOUNTAIN.summitSunriseClimber),
  // Home page service section card images
  MOUNTAIN.snowyPeakBlueSky,
  MOUNTAIN.valleyFogPeaks,
  MOUNTAIN.alpinePeakStorm,
];

/** Preload an image and return a promise; uses browser cache on subsequent visits */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don't block on failure
  });
}

/** Preload a JS module via <link rel="modulepreload"> so it's cached */
function preloadModule(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = href;
  document.head.appendChild(link);
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800; // ms

    // Kick off preloading of carousel images (cached by browser)
    const imagePromises = CAROUSEL_IMAGES.map(preloadImage);

    // Preload modal & key page script chunks via modulepreload hints
    // These use Vite's chunk naming — the browser will cache them
    const scriptPaths = document.querySelectorAll('script[type="module"][src]');
    scriptPaths.forEach((s) => {
      const src = (s as HTMLScriptElement).src;
      if (src) preloadModule(src);
    });

    // Also eagerly fetch the standalone page modules
    // by using dynamic import (Vite will resolve and cache them)
    const modulePromises = [
      import("./MagicQuadrantModal").catch(() => {}),
    ];

    // Wait for both timer animation and resource preloading
    const allReady = Promise.all([...imagePromises, ...modulePromises]);

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Ensure resources are loaded before completing
        allReady.then(() => {
          setFadeOut(true);
          setTimeout(onComplete, 500);
        });
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  const radius = 52;
  const stroke = 4;
  const normalizedRadius = radius - stroke;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`glass-loading-backdrop ${fadeOut ? "fade-out" : ""}`}>
      {/* Ambient glow */}
      <div className="glass-loading-glow" />

      {/* Glass card */}
      <div className="glass-loading-card">
        {/* Top shine */}
        <div className="glass-loading-card-shine" />

        {/* Circular progress */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="glass-loading-spinner-glow" />

          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
            style={{ filter: "drop-shadow(0 0 8px rgba(14,165,233,0.3))" }}
          >
            {/* Track */}
            <circle
              stroke="rgba(255,255,255,0.08)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress arc */}
            <circle
              stroke="url(#progressGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
                <stop offset="50%" stopColor="rgba(14,165,233,1)" />
                <stop offset="100%" stopColor="rgba(2,132,199,0.9)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="glass-loading-percent text-lg font-semibold tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="glass-loading-brand text-xl font-bold tracking-wider">
            AURIX <span className="glass-loading-brand-accent">AI</span>
          </span>
          <span className="glass-loading-subtitle text-xs tracking-[0.25em] uppercase">
            Loading Experience
          </span>
        </div>
      </div>
    </div>
  );
}