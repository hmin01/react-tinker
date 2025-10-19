import { useCallback, useEffect, useRef } from "react";

import { useScopeContext } from "../../model";
import type { UseCanvasProps } from "./Canvas.props";

export function useCanvas({ onLoad, ref }: UseCanvasProps) {
  // 스코프 컨텍스트
  const scope = useScopeContext();
  // 캔버스 참조 객체
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** 참조 객체 매핑 */
  const setRef = useCallback(
    (elem: HTMLCanvasElement | null) => {
      // 외부 ref 설정
      if (typeof ref === "function") {
        ref(elem);
      } else if (ref) {
        ref.current = elem;
      }
      // 내부 캔버스 ref 설정
      canvasRef.current = elem;
    },
    [ref],
  );

  /** 초기 설정 */
  useEffect(() => {
    if (scope) {
      // paper.js 초기화
      scope.setup(canvasRef.current!);
      scope.activate();
      // 로드 완료 이벤트 호출
      requestAnimationFrame(() => {
        onLoad?.(scope);
      });

      // Cleanup
      return () => {
        canvasRef.current?.remove();
        canvasRef.current = null;
        scope.project.clear();
      };
    }
  }, []);

  return {
    /** 참조 객체 매핑 함수 */
    setRef,
  };
}
