import { forwardRef } from "react";

import { classNames } from "@/shared";
import type { CanvasProps } from "./Canvas.props";
import { useCanvas } from "./useCanvas";

// 외부 컴포넌트 (Context Provider 포함)
export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, onLoad, ...props }, ref) => {
    // 캔버스 관리
    useCanvas({ onLoad });

    return (
      <canvas
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={classNames("drawing-canvas h-full w-full", className)}
        {...props}
      />
    );
  },
);
Canvas.displayName = "Canvas";
