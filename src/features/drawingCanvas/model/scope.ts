import { createContext, useContext } from "react";

export interface CanvasScopeContextValue {
  scope: paper.PaperScope | null;
}

export const CanvasScopeContext = createContext<CanvasScopeContextValue>({
  scope: null,
});

export function useCanvasScope() {
  const { scope } = useContext(CanvasScopeContext);
  if (!scope) {
    console.warn("Canvas scope is not available");
  }
  return scope;
}
