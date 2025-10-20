import { useContext } from "react";

import { ScopeContext } from "../model";

export function useScopeContext() {
  const context = useContext(ScopeContext);
  if (!context) {
    throw new Error("useScopeContext must be used within a ScopeProvider");
  }
  return context;
}
