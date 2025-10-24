import { useEffect, useRef, type CSSProperties } from "react";

import { useCanvasScope } from "../model/scope";

export interface RectangleProps {
  /** 채우기 색상 */
  fillColor?: CSSProperties["backgroundColor"];
  /** 시작 포인트 */
  from: [number, number];
  /** 모서리 굴곡 */
  rounded?: number;
  /** 테두리 색상 */
  strokeColor?: CSSProperties["color"];
  /** 테두리 두께 */
  strokeWidth?: number;
  /** 끝 포인트 */
  to: [number, number];
}

export function Rectangle({
  fillColor,
  from,
  rounded,
  strokeColor = "black",
  strokeWidth = 1,
  to,
}: RectangleProps) {
  // Scope 컨텍스트
  const scope = useCanvasScope();
  // 사각형 도형 참조 객체
  const rectangle = useRef<paper.Path.Rectangle | null>(null);

  /** 사각형 도형 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (scope === null) return;
      // 기존 도형이 있을 경우, 제거
      if (rectangle.current !== null) rectangle.current.remove();

      // 새로운 사각형 도형 생성
      rectangle.current = new scope.Path.Rectangle({
        fillColor: fillColor ? new scope.Color(fillColor) : undefined,
        from: new scope.Point(from),
        radius: rounded,
        strokeColor: new scope.Color(strokeColor),
        strokeWidth,
        to: new scope.Point(to),
      });
    });
  }, [fillColor, from, rounded, scope, strokeColor, strokeWidth, to]);

  /** 사각형 도형 제거 */
  useEffect(() => {
    return () => {
      rectangle.current?.remove();
      rectangle.current = null;
    };
  }, []);

  return null;
}
