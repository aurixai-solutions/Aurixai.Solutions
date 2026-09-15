import React from "react";

/**
 * JsonPageWrapper — pass-through (CMS KV store removed).
 * Simply renders the route's own component.
 */
export function JsonPageWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
