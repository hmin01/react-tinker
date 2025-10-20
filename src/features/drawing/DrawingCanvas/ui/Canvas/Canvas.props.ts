import type { CanvasHTMLAttributes } from "react";

export interface CanvasProps
  extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "onLoad"> {
  /** 로드 완료 이벤트 핸들러 */
  onLoad?: (scope: paper.PaperScope) => void;
}
