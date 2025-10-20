import { useEffect, useRef } from "react";

import { useScopeContext } from "../hooks";
import type { ToolProps } from "../types";

export function Tool({
  fixedDistance,
  maxDistance,
  minDistance,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseDrag,
  onMouseMove,
  onMouseUp,
}: ToolProps) {
  // Scope 컨텍스트
  const { scope } = useScopeContext();
  // 툴 참조 객체
  const tool = useRef<paper.Tool>(null);

  /** 툴 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      const _scope = scope.current;
      // 새로운 툴 생성
      tool.current = new _scope.Tool();
      tool.current.activate();
      // 옵션 설정
      if (fixedDistance) tool.current.fixedDistance = fixedDistance;
      if (maxDistance) tool.current.maxDistance = maxDistance;
      if (minDistance) tool.current.minDistance = minDistance;
      // 이벤트 등록
      if (onKeyDown) tool.current.onKeyDown = onKeyDown;
      if (onKeyUp) tool.current.onKeyUp = onKeyUp;
      if (onMouseDown) tool.current.onMouseDown = onMouseDown;
      if (onMouseDrag) tool.current.onMouseDrag = onMouseDrag;
      if (onMouseMove) tool.current.onMouseMove = onMouseMove;
      if (onMouseUp) tool.current.onMouseUp = onMouseUp;
    });

    // Cleanup
    return () => {
      tool.current?.remove();
      tool.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
