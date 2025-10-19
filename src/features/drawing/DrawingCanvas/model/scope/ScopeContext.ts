import { createContext, useContext, type RefObject } from "react";

interface ScopeContextValue {
  scope: RefObject<paper.PaperScope>;
}

export const ScopeContext = createContext<ScopeContextValue | null>(null);

export function useScopeContext() {
  const context = useContext(ScopeContext);
  if (!context) {
    throw new Error("useScopeContext must be used within a ScopeProvider");
  }
  return context;
}
