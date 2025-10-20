import { ScopeProvider } from "../model";
import type { DrawingCanvasProps } from "../types";

import { Canvas } from "./Canvas";

export function DrawingCanvas({ children, ...props }: DrawingCanvasProps) {
  return (
    <ScopeProvider>
      <Canvas {...props}>{children}</Canvas>
    </ScopeProvider>
  );
}
