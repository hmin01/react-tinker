import paper from "paper";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CanvasHTMLAttributes,
  type MouseEvent,
} from "react";

import { CanvasScopeContext } from "../model/scope";

export interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  /** 리사이즈 이벤트 핸들러 */
  onResize?: (rect: DOMRectReadOnly) => void;
}

export function Canvas({ children, onResize, style, ...props }: CanvasProps) {
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
        ref={canvasRef}
        onContextMenu={handleContextMenu}
        style={{ height: "100%", width: "100%", ...style }}
        {...props}
      />
      {children}
    </CanvasScopeContext.Provider>
  );
}
