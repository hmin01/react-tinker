import {
  forwardRef,
  useEffect,
  useRef,
  type CanvasHTMLAttributes,
} from "react";

import { classNames } from "@shared/utils";
import { useScopeContext } from "../hooks";

export interface CanvasProps
  extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "onLoad"> {
  /** 로드 완료 이벤트 핸들러 */
  onLoad?: (scope: paper.PaperScope) => void;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, onLoad, ...props }, ref) => {
    // 스코프 컨텍스트
    const { scope } = useScopeContext();
    // 캔버스 참조 객체
    const canvas = useRef<HTMLCanvasElement>(null);

    /** 초기 설정 */
    useEffect(() => {
      if (canvas.current) {
        const _scope = scope.current;
        // paper.js 초기화
        _scope.setup(canvas.current);
        // 로드 완료 이벤트 호출
        onLoad?.(_scope);

        // Cleanup
        return () => {
          // paper.js 정리
          canvas.current?.remove();
          canvas.current = null;
          _scope.project.clear();
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** 캔버스 리사이즈 처리 */
    useEffect(() => {
      const observer = new ResizeObserver(() => {
        if (canvas.current) {
          const rect = canvas.current.getBoundingClientRect();
          canvas.current.width = rect.width;
          canvas.current.height = rect.height;
          // 스코프 뷰 업데이트
          scope.current.view.viewSize = new scope.current.Size(
            rect.width,
            rect.height,
          );
        }
      });

      if (canvas.current) {
        // 초기 리사이즈
        observer.observe(canvas.current);
      }

      // Cleanup
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <canvas
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
          // 내부 캔버스 참조 설정
          canvas.current = el;
        }}
        className={classNames("drawing-canvas h-full w-full", className)}
        {...props}
      />
    );
  },
);
Canvas.displayName = "Canvas";
