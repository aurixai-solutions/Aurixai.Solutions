import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "react-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { GlassPanelProvider } from "./GlassPanelContext";
import { LayoutHeroProvider, useLayoutHero } from "./LayoutHeroContext";
import { LoadingScreen } from "./LoadingScreen";
import { PageHeroInner } from "./ui/PageHero";
import { resolveHeroConfig, HeroConfig } from "../../data/heroDefaults";
import { JsonPageWrapper } from "./JsonPageWrapper";
import { AnnouncementPanel } from "./AnnouncementPanel";

const HERO_API = "/content.json";

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutShell({
  heroConfig,
  isGlassPanel,
  children,
}: {
  heroConfig: HeroConfig | null;
  isGlassPanel: boolean;
  children: React.ReactNode;
}) {
  const { override } = useLayoutHero();
  const { pathname } = useLocation();
  const finalHero = override ?? heroConfig;

  const hideFooter = false;

  if (isGlassPanel) {
    return (
      <div className="glass-page-bg">
        <div className="glass-panel">
          <div className="glass-shine-top" />
          <div className="glass-shine-left" />
          <div className="glass-shine-right" />
          <Navbar />
          {finalHero && (
            <PageHeroInner
              title={finalHero.title}
              subtitle={finalHero.subtitle}
              badge={finalHero.badge}
              image={finalHero.image}
              button1={finalHero.button1}
              button2={finalHero.button2}
            />
          )}
          {pathname === "/" && <AnnouncementPanel />}
          <main className="flex-grow relative"><JsonPageWrapper>{children}</JsonPageWrapper></main>
          <div className="h-5" />
          {!hideFooter && <Footer />}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <div className="h-20" />
      {finalHero && (
        <PageHeroInner
          title={finalHero.title}
          subtitle={finalHero.subtitle}
          badge={finalHero.badge}
          image={finalHero.image}
          button1={finalHero.button1}
          button2={finalHero.button2}
        />
      )}
      {pathname === "/" && <AnnouncementPanel />}
      <main className="flex-grow relative"><JsonPageWrapper>{children}</JsonPageWrapper></main>
      <div className="h-5" />
      {!hideFooter && <Footer />}
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [remoteHeroes, setRemoteHeroes] = useState<Record<string, HeroConfig> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(HERO_API);
        if (res.ok) {
          const json = await res.json();
          const data = json?.hero_configs;
          if (data && typeof data === "object") {
            setRemoteHeroes(data);
          }
        }
      } catch {
        // Offline or endpoint missing — local defaults will be used
      }
    })();
  }, []);

  const heroConfig = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/admin")) return null;
    if (remoteHeroes && remoteHeroes[pathname]) return remoteHeroes[pathname];
    return resolveHeroConfig(pathname);
  }, [pathname, remoteHeroes]);

  const layoutHeroActive = pathname !== "/" && !pathname.startsWith("/admin");
  const isGlassPanel = !pathname.startsWith("/admin");

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <GlassPanelProvider active={isGlassPanel}>
          <LayoutHeroProvider active={layoutHeroActive} pathname={pathname}>
            <LayoutShell heroConfig={heroConfig} isGlassPanel={isGlassPanel}>
              {children}
            </LayoutShell>
          </LayoutHeroProvider>
        </GlassPanelProvider>
      )}
    </>
  );
}
