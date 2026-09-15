import { useEffect } from "react";
import { useLayoutHero, HeroOverride } from "./LayoutHeroContext";

/**
 * Dynamic pages call this hook to push their hero data up to Layout.
 * Layout's centralized PageHeroInner will render it — ensuring every
 * interior page hero is identical in size, structure, and styling.
 *
 * Usage:
 *   useHeroOverride({ title: "GDPR", subtitle: "...", image: "..." });
 *
 * Pass `null` or omit to use the default from heroDefaults.ts.
 */
export function useHeroOverride(config: HeroOverride | null) {
  const { setOverride } = useLayoutHero();

  useEffect(() => {
    if (config) {
      setOverride(config);
    }
    // Clean up when component unmounts so next page gets fresh state
    return () => setOverride(null);
  }, [config?.title, config?.subtitle, config?.badge, config?.image]);
}
