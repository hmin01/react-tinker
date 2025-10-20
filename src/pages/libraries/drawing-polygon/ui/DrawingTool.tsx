import { Tool } from "@/features/drawing";
import { useDrawing } from "../hooks";
import type { DrawingToolProps } from "../types";
export function DrawingTool({ onComplete }: DrawingToolProps) {
  // 캔버스 관리
  const { handleMouseDown, handleMouseDrag, handleMouseMove, handleMouseUp } =
    useDrawing({ onComplete });

  return (
    <Tool
      onMouseDown={handleMouseDown}
      onMouseDrag={handleMouseDrag}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
