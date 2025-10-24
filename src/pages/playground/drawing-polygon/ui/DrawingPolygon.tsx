import { Canvas } from "@features/drawingCanvas";

import { DrawingTool } from "./DrawingTool";
import { InfoWindow } from "./InfoWindow";

export function DrawingPolygon() {
  return (
    <div className="relative h-screen w-screen">
      <Canvas>
        <DrawingTool />
      </Canvas>
      <InfoWindow />
    </div>
  );
}
