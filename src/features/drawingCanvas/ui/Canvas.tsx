import paper from "paper";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CanvasHTMLAttributes,
  type MouseEvent,
  type WheelEvent,
} from "react";

import { CanvasScopeContext } from "../model/scope";

export interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  /** 리사이즈 이벤트 핸들러 */
  onResize?: (rect: DOMRectReadOnly) => void;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ children, onResize, style, ...props }, ref) => {
    // 캔버스 참조 객체
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // 스코프
    const [scope, setScope] = useState<paper.PaperScope | null>(null);
    // Resize Observer
    const resizeObserver = useRef<ResizeObserver | null>(null);

    /** [Handler] 마우스 우측 클릭 방지 */
    const handleContextMenu = useCallback((e: MouseEvent) => {
      e.preventDefault();
    }, []);

    /** [Handler] 마우스 휠(Wheel) 이벤트 */
    const handleWheel = useCallback(
      (e: WheelEvent) => {
        // 스코프가 없으면 종료
        if (scope === null) return;

        // 마우스 위치
        const point = scope.view.getEventPoint(e as any);
        // 확대/축소 비율
        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newZoom = Math.min(
          Math.max(scope.view.zoom * scaleFactor, 0.1),
          5,
        );
        //
        scope.view.scale(scaleFactor, point);
        scope.view.zoom = newZoom;
      },
      [scope],
    );

    /** PaperScope 초기화 */
    useEffect(() => {
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          // 스코프 생성
          const _scope = new paper.PaperScope();
          // 캔버스에 스코프 설정
          _scope.setup(canvasRef.current);
          setScope(() => _scope);

          // resizeObserver
          resizeObserver.current = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            // 캔버스 크기 조정
            if (canvasRef.current) {
              canvasRef.current.width = rect.width;
              canvasRef.current.height = rect.height;
              _scope.view.viewSize = new _scope.Size(rect.width, rect.height);
            }
            // onResize 콜백 호출
            onResize?.(rect);
          });
          // 감시 시작
          resizeObserver.current.observe(canvasRef.current);
        }
      });

      // Cleanup
      return () => {
        // ResizeObserver 해제
        resizeObserver.current?.disconnect();
        // PaperScope 정리
        scope?.project.clear();
        setScope(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <CanvasScopeContext.Provider value={{ scope }}>
        <canvas
          ref={(el) => {
            // 내부 Ref 설정
            canvasRef.current = el;
            // 외부 Ref 설정
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          onContextMenu={handleContextMenu}
          onWheel={handleWheel}
          style={{ height: "100%", width: "100%", ...style }}
          {...props}
        />
        {children}
      </CanvasScopeContext.Provider>
    );
  },
);
Canvas.displayName = "Canvas";
