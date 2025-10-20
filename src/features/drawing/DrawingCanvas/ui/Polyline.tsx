import { useEffect, useRef } from "react";

import { useLayerContext, useScopeContext } from "../hooks";
import type { PolylineProps } from "../types";

export function Polyline({
  closed,
  coordinates,
  dashArray,
  strokeColor = "black",
  strokeWidth = 1,
}: PolylineProps) {
  // Scope 컨텍스트
  const { scope } = useScopeContext();
  // Layer 컨텍스트
  const { layer } = useLayerContext();
  // 폴리라인 참조 객체
  const polyline = useRef<paper.Path | null>(null);

  /** 폴리라인 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      const _scope = scope.current;
      // 새로운 폴리라인 생성
      if (polyline.current === null) {
        polyline.current = new _scope.Path(
          coordinates.map((coord) => new _scope.Point(coord)),
        );
        // 레이어에 추가
        if (layer?.current) {
          polyline.current.insertAbove(layer.current);
        }
      } else {
        // 좌표 업데이트
        polyline.current.segments = coordinates.map(
          (coord) => new _scope.Segment(new _scope.Point(coord)),
        );
      }

      // 옵션 설정
      if (closed) polyline.current.closed = closed;
      if (dashArray) polyline.current.dashArray = dashArray;
      if (strokeColor)
        polyline.current.strokeColor = new _scope.Color(strokeColor);
      if (strokeWidth) polyline.current.strokeWidth = strokeWidth;
    });

    return () => {
      polyline.current?.remove();
      polyline.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed, coordinates, dashArray, strokeColor, strokeWidth]);

  return null;
}
