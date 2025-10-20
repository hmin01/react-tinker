import { useEffect, useRef } from "react";

import { useScopeContext } from "../../model";

import type { CanvasProps } from "./Canvas.props";

export function useCanvas({ onLoad }: Pick<CanvasProps, "onLoad">) {
  // 스코프 컨텍스트
  const { scope } = useScopeContext();
  // 캔버스 참조 객체
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** 초기 설정 */
  useEffect(() => {
    if (canvasRef.current) {
      const _scope = scope.current;
      // paper.js 초기화
      _scope.setup(canvasRef.current);
      _scope.activate();
      // 로드 완료 이벤트 호출
      onLoad?.(_scope);

      // Cleanup
      return () => {
        canvasRef.current?.remove();
        canvasRef.current = null;
        _scope.project.clear();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    /** 캔버스 참조 객체 */
    canvasRef,
  };
}
