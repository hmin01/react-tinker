import { useEffect, useRef, type CSSProperties } from "react";

import { useCanvasScope } from "../model/scope";

export interface LineProps {
  /** 대시 스타일 */
  dashArray?: [number, number];
  /** 시작 포인트 */
  from: [number, number];
  /** 선 색상 */
  strokeColor?: CSSProperties["color"];
  /** 선 두께 */
  strokeWidth?: number;
  /** 끝 포인트 */
  to: [number, number];
}

export function Line({
  dashArray,
  from,
  strokeColor = "black",
  strokeWidth = 1,
  to,
}: LineProps) {
  // Scope 컨텍스트
  const scope = useCanvasScope();
  // 라인 참조 객체
  const line = useRef<paper.Path.Line | null>(null);

  /** 라인 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (scope === null) return;
      // 새로운 라인 생성
      if (line.current === null) {
        line.current = new scope.Path.Line(
          new scope.Point(from),
          new scope.Point(to),
        );
      } else {
        // 좌표만 업데이트
        line.current.segments = [
          new scope.Segment(new scope.Point(from)),
          new scope.Segment(new scope.Point(to)),
        ];
      }

      // 옵션 설정
      if (dashArray) line.current.dashArray = dashArray;
      if (strokeColor) line.current.strokeColor = new scope.Color(strokeColor);
      if (strokeWidth) line.current.strokeWidth = strokeWidth;
    });
  }, [dashArray, from, to, scope, strokeColor, strokeWidth]);

  /** 라인 제거 */
  useEffect(() => {
    return () => {
      line.current?.remove();
      line.current = null;
    };
  }, []);

  return null;
}
