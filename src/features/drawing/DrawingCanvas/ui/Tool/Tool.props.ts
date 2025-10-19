export interface ToolProps {
  /** 고정 거리 (픽셀 단위) */
  fixedDistance?: number;
  /** 최대 이동 거리 (픽셀 단위) */
  maxDistance?: number;
  /** 최소 이동 거리 (픽셀 단위) */
  minDistance?: number;
  /** 마우스 이벤트 핸들러 */
  onMouseDown?: (event: paper.ToolEvent) => void;
  onMouseDrag?: (event: paper.ToolEvent) => void;
  onMouseMove?: (event: paper.ToolEvent) => void;
  onMouseUp?: (event: paper.ToolEvent) => void;
  /** 키보드 이벤트 핸들러 */
  onKeyDown?: (event: paper.ToolEvent) => void;
  onKeyUp?: (event: paper.ToolEvent) => void;
}
