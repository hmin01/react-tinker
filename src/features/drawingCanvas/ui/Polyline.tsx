import { useEffect, useRef, type CSSProperties } from "react";

import { useCanvasScope } from "../model/scope";

export interface PolylineProps {
  /** 대시 스타일 */
  dashArray?: [number, number];
  /** 라인 좌표 목록 */
  points: [number, number][];
  /** 선 색상 */
  strokeColor?: CSSProperties["color"];
  /** 선 두께 */
  strokeWidth?: number;
}

export function Polyline({
  dashArray,
  points,
  strokeColor = "black",
  strokeWidth = 1,
}: PolylineProps) {
  // Scope 컨텍스트
  const scope = useCanvasScope();
  // 폴리라인 도형 참조 객체
  const polyline = useRef<paper.Path | null>(null);

  /** 폴리라인 도형 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (scope === null) return;

      // Segments 생성
      const _segments = points.map((point) => new scope.Point(point));
      // 새로운 라인 생성
      if (polyline.current === null) {
        polyline.current = new scope.Path(_segments);
      } else {
        // 좌표만 업데이트
        polyline.current.removeSegments();
        polyline.current.add(..._segments);
      }

      // 옵션 설정
      if (dashArray) polyline.current.dashArray = dashArray;
      if (strokeColor)
        polyline.current.strokeColor = new scope.Color(strokeColor);
      if (strokeWidth) polyline.current.strokeWidth = strokeWidth;
    });
  }, [dashArray, points, scope, strokeColor, strokeWidth]);

  /** 폴리라인 도형 제거 */
  useEffect(() => {
    return () => {
      polyline.current?.remove();
      polyline.current = null;
    };
  }, []);

  return null;
}
