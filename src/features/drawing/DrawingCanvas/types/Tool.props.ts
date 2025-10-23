import type { ToolMouseEvent } from "./event";

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
}
