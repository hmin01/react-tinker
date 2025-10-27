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
  /** 최대 줌 레벨 */
  maxZoom?: number;
  /** 최소 줌 레벨 */
  minZoom?: number;
  /** 리사이즈 이벤트 핸들러 */
  onResize?: (rect: DOMRectReadOnly) => void;
  /** 줌 이벤트 핸들러 */
  onZoom?: (zoom: number) => void;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (
    {
      children,
      maxZoom = 5,
      minZoom = 0.1,
      onResize,
      onWheel,
      onZoom,
      style,
      ...props
    },
    ref,
  ) => {
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
      (e: WheelEvent<HTMLCanvasElement>) => {
        // 스코프가 없으면 종료
        if (scope === null) return;

        // 마우스 위치
        const _point = scope.view.getEventPoint(e as unknown as paper.Event);
        // 현재 줌 레벨
        const _zoom = scope.view.zoom;

        // 확대/축소 비율 (deltaY가 음수이면 확대, 양수이면 축소), 10% 단위
        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;

        // 최대 줌 레벨 및 최소 줌 레벨 적용 (소수점 1자리까지 반올림)
        const clampedZoom =
          Math.round(
            Math.min(Math.max(_zoom * scaleFactor, minZoom), maxZoom) * 10,
          ) / 10;
        // 현재 줌 레벨과 비교
        if (clampedZoom === _zoom) return;

        // 줌 적용
        scope.view.scale(scaleFactor, _point);
        scope.view.zoom = clampedZoom;
        // 외부 이벤트 핸들러 호출
        onZoom?.(clampedZoom);
      },
      [maxZoom, minZoom, onZoom, scope],
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
          {...props}
          ref={(el) => {
            // 내부 Ref 설정
            canvasRef.current = el;
            // 외부 Ref 설정
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          style={{ height: "100%", width: "100%", ...style }}
          onContextMenu={handleContextMenu}
          onWheel={onWheel ?? handleWheel}
        />
        {children}
      </CanvasScopeContext.Provider>
    );
  },
);
Canvas.displayName = "Canvas";
