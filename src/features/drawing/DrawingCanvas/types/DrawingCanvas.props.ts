import type { HTMLAttributes } from "react";

import type { Point } from "./shape";

export interface DrawingCanvasProps extends HTMLAttributes<HTMLDivElement> {
  /** 도형 완성 이벤트 핸들러 */
  onComplete?: (coordinates: Point[]) => void;
  /** 완성된 도형 좌표 목록 */
  polygon?: Point[] | null;
}
