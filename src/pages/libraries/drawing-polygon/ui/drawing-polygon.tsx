import { DrawingCanvas } from "@/features/drawing";
import { DrawingTool } from "./DrawingTool";
export function DrawingPolygon() {
  return (
    <div className="h-[600px] w-[800px] border border-solid border-black">
      <DrawingCanvas>
        <DrawingTool />
      </DrawingCanvas>
    </div>
  );
}
