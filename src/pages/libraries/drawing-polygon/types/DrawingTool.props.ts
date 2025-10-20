import type { DrawingCanvasProps, Point } from "@features/drawing";

export interface DrawingToolProps extends DrawingCanvasProps {
  /** 도형 완성 이벤트 핸들러 */
  onComplete?: (coordinates: Point[]) => void;
}
