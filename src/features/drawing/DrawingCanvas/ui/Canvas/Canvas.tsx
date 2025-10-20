import { forwardRef } from "react";

import { classNames } from "@/shared";
import type { CanvasProps } from "./Canvas.props";
import { useCanvas } from "./useCanvas";

// 외부 컴포넌트 (Context Provider 포함)
export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, onLoad, ...props }, ref) => {
    // 캔버스 관리
    const { canvasRef } = useCanvas({ onLoad });

    return (
      <canvas
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
          // 내부 캔버스 참조 설정
          canvasRef.current = el;
        }}
        className={classNames("drawing-canvas h-full w-full", className)}
        {...props}
      />
    );
  },
);
Canvas.displayName = "Canvas";
