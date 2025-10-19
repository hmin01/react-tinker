import paper from "paper";
import { useEffect } from "react";

import type { LineProps } from "./Line.props";
import { useScopeContext } from "../../model";

export function useLine({
  from,
  to,
  dashArray,
  strokeColor = "black",
  strokeWidth = 1,
}: LineProps) {
  // 스코프 컨텍스트
  const scope = useScopeContext();

  useEffect(() => {
    if (!scope?.view) return;

    const _line = new paper.Path.Line(
      new paper.Point(from),
      new paper.Point(to),
    );
    // 옵션 설정
    if (dashArray) _line.dashArray = dashArray;
    if (strokeColor) _line.strokeColor = new paper.Color(strokeColor);
    if (strokeWidth) _line.strokeWidth = strokeWidth;
  }, []);
}
