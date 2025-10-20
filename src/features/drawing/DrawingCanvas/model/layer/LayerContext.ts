import { createContext, useContext, type RefObject } from "react";

interface LayerContextValue {
  layer: RefObject<paper.Layer> | null;
}

export const LayerContext = createContext<LayerContextValue>({
  layer: null,
});

export function useLayerContext() {
  return useContext(LayerContext);
}
