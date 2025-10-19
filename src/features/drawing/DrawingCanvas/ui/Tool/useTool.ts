import paper from "paper";
import { useEffect, useRef } from "react";

import type { ToolProps } from "./Tool.props";

export function useTool({
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
  const tool = useRef<paper.Tool>(null);

  useEffect(() => {
    tool.current = new paper.Tool();
    tool.current.activate();

    // 옵션 설정
    if (fixedDistance !== undefined) tool.current.fixedDistance = fixedDistance;
    if (maxDistance !== undefined) tool.current.maxDistance = maxDistance;
    if (minDistance !== undefined) tool.current.minDistance = minDistance;
    // 이벤트 등록
    if (onKeyDown) tool.current.onKeyDown = onKeyDown;
    if (onKeyUp) tool.current.onKeyUp = onKeyUp;
    if (onMouseDown) tool.current.onMouseDown = onMouseDown;
    if (onMouseDrag) tool.current.onMouseDrag = onMouseDrag;
    if (onMouseMove) tool.current.onMouseMove = onMouseMove;
    if (onMouseUp) tool.current.onMouseUp = onMouseUp;

    // Cleanup
    return () => {
      tool.current?.remove();
      tool.current = null;
    };
  }, []);
}
