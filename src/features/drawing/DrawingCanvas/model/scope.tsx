import paper from "paper";
import { createContext, useContext, type PropsWithChildren } from "react";

export const ScopeContext = createContext<paper.PaperScope | null>(null);

export function useScopeContext() {
  const context = useContext(ScopeContext);
  if (!context) {
    throw new Error("useScopeContext must be used within a ScopeProvider");
  }
  return context;
}

export function ScopeProvider({ children }: PropsWithChildren) {
  return (
    <ScopeContext.Provider value={new paper.PaperScope()}>
      {children}
    </ScopeContext.Provider>
  );
}
