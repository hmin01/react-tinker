import { createContext, useContext, type RefObject } from "react";

interface LayerContextValue {
  layer: RefObject<paper.Layer>;
}

export const LayerContext = createContext<LayerContextValue | null>(null);

export function useLayerContext() {
  return useContext(LayerContext);
}
