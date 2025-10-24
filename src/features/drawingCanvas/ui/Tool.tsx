import { useEffect, useRef, type MouseEvent } from "react";

import { useCanvasScope } from "../model/scope";

export interface ToolMouseEvent extends paper.ToolEvent {
  /** 마우스 이벤트 */
  event: MouseEvent;
  /** 툴(Tool) 객체 */
  tool: paper.Tool;
}

export interface ToolProps {
  /** 고정 거리 (픽셀 단위) */
  fixedDistance?: number;
  /** 최대 이동 거리 (픽셀 단위) */
  maxDistance?: number;
  /** 최소 이동 거리 (픽셀 단위) */
  minDistance?: number;
  /** 마우스 이벤트 핸들러 */
  onMouseDown?: (event: ToolMouseEvent) => void;
  onMouseDrag?: (event: ToolMouseEvent) => void;
  onMouseMove?: (event: ToolMouseEvent) => void;
  onMouseUp?: (event: ToolMouseEvent) => void;
  /** 키보드 이벤트 핸들러 */
  onKeyDown?: (event: paper.ToolEvent) => void;
  onKeyUp?: (event: paper.ToolEvent) => void;
  /** 외부 스코프 */
  scope?: paper.PaperScope | null;
}

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
  scope,
}: ToolProps) {
  // Scope 컨텍스트
  const innerScope = useCanvasScope();
  // Tool 참조 객체
  const tool = useRef<paper.Tool | null>(null);

  /** 툴(Tool) 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      const _scope = scope ?? innerScope;
      if (_scope === null) return;

      // 툴 생성
      tool.current ??= new _scope.Tool();
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
  }, [innerScope, scope]);

  /** 툴 제거 */
  useEffect(() => {
    return () => {
      tool.current?.remove();
      tool.current = null;
    };
  }, []);

  return null;
}
