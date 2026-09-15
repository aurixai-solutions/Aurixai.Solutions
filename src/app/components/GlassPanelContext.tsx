import React, { createContext, useContext } from "react";

const GlassPanelContext = createContext(false);

export function GlassPanelProvider({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <GlassPanelContext.Provider value={active}>{children}</GlassPanelContext.Provider>;
}

export function useGlassPanel() {
  return useContext(GlassPanelContext);
}
