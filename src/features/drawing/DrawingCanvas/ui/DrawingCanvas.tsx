import { classNames } from "@/shared";
import { useDrawing } from "../hooks";
import type { DrawingCanvasProps } from "../types";
export function DrawingCanvas({
  className,
  onComplete,
  polygon,
  ...props
}: DrawingCanvasProps) {
  // 캔버스 관리
  const { canvasRef, handleDoubleClick } = useDrawing({ onComplete, polygon });

  return (
    <div
      className={classNames(
        "border border-solid border-black",
        "h-[600px] w-[800px]",
        className,
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{ height: "100%", width: "100%" }}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
}
