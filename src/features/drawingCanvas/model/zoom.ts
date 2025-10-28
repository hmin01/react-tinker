import { createContext, useContext } from "react";

export interface ZoomContextValue {
  /** 최대 줌 레벨 */
  maxZoom?: number;
  /** 최소 줌 레벨 */
  minZoom?: number;
}

export const ZoomContext = createContext<ZoomContextValue>({});

export function useZoomContext() {
  const context = useContext(ZoomContext);
  if (!context) {
    console.warn("ZoomContext is not available");
  }
  return context;
}
