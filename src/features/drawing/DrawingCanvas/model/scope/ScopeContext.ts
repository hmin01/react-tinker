import { createContext, type RefObject } from "react";

interface ScopeContextValue {
  scope: RefObject<paper.PaperScope>;
}

export const ScopeContext = createContext<ScopeContextValue | null>(null);
