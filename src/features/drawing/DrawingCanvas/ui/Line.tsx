import { useEffect, useRef } from "react";

import { useLayerContext, useScopeContext } from "../hooks";
import type { LineProps } from "../types";

export function Line({
  dashArray,
  from,
  to,
  strokeColor = "black",
  strokeWidth = 1,
}: LineProps) {
  // Scope 컨텍스트
  const { scope } = useScopeContext();
  // Layer 컨텍스트
  const { layer } = useLayerContext();
  // 라인 참조 객체
  const line = useRef<paper.Path.Line | null>(null);

  /** 라인 생성 */
  useEffect(() => {
    requestAnimationFrame(() => {
      const _scope = scope.current;
      // 새로운 라인 생성
      if (line.current === null) {
        line.current = new _scope.Path.Line(
          new _scope.Point(from),
          new _scope.Point(to),
        );
        // 레이어에 추가
        if (layer?.current) {
          line.current.insertAbove(layer.current);
        }
      } else {
        // 좌표 업데이트
        line.current.segments = [
          new _scope.Segment(new _scope.Point(from)),
          new _scope.Segment(new _scope.Point(to)),
        ];
      }

      // 옵션 설정
      if (dashArray) line.current.dashArray = dashArray;
      if (strokeColor) line.current.strokeColor = new _scope.Color(strokeColor);
      if (strokeWidth) line.current.strokeWidth = strokeWidth;
    });

    return () => {
      // 라인 삭제
      line.current?.remove();
      line.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashArray, from, to, strokeColor, strokeWidth]);

  return null;
}
