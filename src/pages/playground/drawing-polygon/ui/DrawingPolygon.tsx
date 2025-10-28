import { Canvas, ZoomControl } from "@features/drawingCanvas";

import { DrawingTool } from "./DrawingTool";
import { InfoWindow } from "./InfoWindow";

export function DrawingPolygon() {
  return (
    <div className="relative h-screen w-screen">
      <Canvas
        onZoom={(zoom) => {
          console.log(zoom);
        }}
      >
        <DrawingTool />
        <ZoomControl />
      </Canvas>
      <InfoWindow />
    </div>
  );
}
