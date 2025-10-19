import type { CanvasHTMLAttributes, ForwardedRef } from "react";

export interface CanvasProps
  extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "onLoad"> {
  /** 로드 완료 이벤트 핸들러 */
  onLoad?: (scope: paper.PaperScope) => void;
}

export interface UseCanvasProps extends Pick<CanvasProps, "onLoad"> {
  ref: ForwardedRef<HTMLCanvasElement> | null;
}
