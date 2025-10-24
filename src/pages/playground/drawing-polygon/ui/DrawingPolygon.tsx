import { DrawingCanvas } from "@features/drawing";

import { DrawingTool } from "./DrawingTool";
import { InfoWindow } from "./InfoWindow";

export function DrawingPolygon() {
  return (
    <div className="relative h-screen w-screen">
      <DrawingCanvas>
        <DrawingTool />
      </DrawingCanvas>
      <InfoWindow />
    </div>
  );
}
