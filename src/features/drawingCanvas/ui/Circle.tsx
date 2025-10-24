import { useEffect, useRef, type CSSProperties } from "react";

import { useCanvasScope } from "../model/scope";

export interface CircleProps {
  /** 중심 좌표 */
  center: [number, number];
  /** 채우기 색상 */
  fillColor?: CSSProperties["backgroundColor"];
  /** 반지름 */
  radius: number;
  /** 테두리 색상 */
  strokeColor?: CSSProperties["color"];
  /** 테두리 두께 */
  strokeWidth?: number;
}

export function Circle({
  center,
  fillColor,
  radius = 4,
  strokeColor = "black",
  strokeWidth = 1,
}: CircleProps) {
  // Scope 컨텍스트
  const scope = useCanvasScope();
  // 원형 도형 참조 객체
  const circle = useRef<paper.Path.Circle | null>(null);

  /** 원형 도형 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (scope === null) return;

      // 기존 도형이 있을 경우, 제거
      if (circle.current !== null) circle.current.remove();
      // 새로운 원형 도형 생성
      circle.current = new scope.Path.Circle({
        center: new scope.Point(center),
        fillColor: fillColor ? new scope.Color(fillColor) : undefined,
        radius,
        strokeColor: new scope.Color(strokeColor),
        strokeWidth,
      });
    });
  }, [center, fillColor, radius, scope, strokeColor, strokeWidth]);

  /** 원형 도형 제거 */
  useEffect(() => {
    return () => {
      circle.current?.remove();
      circle.current = null;
    };
  }, []);

  return null;
}
