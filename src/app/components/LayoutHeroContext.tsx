import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * Bidirectional hero context:
 *
 *  - `active`        – true when Layout renders the shared PageHero.
 *                       Individual page heroes check this and return null.
 *  - `override`      – dynamic pages (IndustryPage, CompliancePage, etc.)
 *                       push their resolved hero data here so Layout can
 *                       render it through the ONE centralized PageHeroInner.
 *  - `setOverride()` – called by page components to supply hero props.
 */

export interface HeroOverride {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  button1?: { label: string; href: string };
  button2?: { label: string; href: string };
}

interface LayoutHeroContextValue {
  active: boolean;
  override: HeroOverride | null;
  setOverride: (cfg: HeroOverride | null) => void;
}

const LayoutHeroContext = createContext<LayoutHeroContextValue>({
  active: false,
  override: null,
  setOverride: () => {},
});

export function LayoutHeroProvider({
  active,
  pathname,
  children,
}: {
  active: boolean;
  pathname?: string;
  children: React.ReactNode;
}) {
  const [override, setOverrideRaw] = useState<HeroOverride | null>(null);
  const setOverride = useCallback((cfg: HeroOverride | null) => setOverrideRaw(cfg), []);

  // Reset override on route change so stale data never bleeds between pages
  useEffect(() => {
    setOverrideRaw(null);
  }, [pathname]);

  return (
    <LayoutHeroContext.Provider value={{ active, override, setOverride }}>
      {children}
    </LayoutHeroContext.Provider>
  );
}

export function useLayoutHero() {
  return useContext(LayoutHeroContext);
}