import { forwardRef } from "react";

import { classNames } from "@/shared";
import { ScopeProvider } from "../../model";
import type { CanvasProps } from "./Canvas.props";
import { useCanvas } from "./useCanvas";

// 외부 컴포넌트 (Context Provider 포함)
export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ children, ...props }, ref) => {
    return (
      <ScopeProvider>
        <CanvasInner ref={ref} {...props} />
        {children}
      </ScopeProvider>
    );
  },
);
Canvas.displayName = "Canvas";

// 내부 컴포넌트 (Context를 사용하는 실제 Canvas 컴포넌트)
const CanvasInner = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ children, className, onLoad, ...props }, ref) => {
    // 캔버스 관리
    const { setRef } = useCanvas({ onLoad, ref });

    return (
      <canvas
        className={classNames("drawing-canvas h-full w-full", className)}
        ref={setRef}
        {...props}
      />
    );
  },
);
CanvasInner.displayName = "CanvasInner";
