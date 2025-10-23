import { useCallback, useRef } from "react";

import {
  useScopeContext,
  type Path,
  type Segment,
  type ToolMouseEvent,
} from "@features/drawing";
import type { DrawingToolProps } from "../types";

const previewLineStyle = {
  strokeColor: "lightgray",
  strokeWidth: 1,
  dashArray: [2, 2],
};
const HitOptions = {
  fill: true,
  segments: true,
  stroke: true,
  tolerance: 10,
};

/**
 * [Hook] 도형을 그리기 위한 로직
 * @param props DrawingCanvas 속성
 * @returns 변수 및 이벤트 핸들러
 */
export function useDrawing({ onComplete }: DrawingToolProps) {
  // Scope 컨텍스트
  const { scope } = useScopeContext();

  // 그려진 선 (선택 완료)
  const drawnLine = useRef<Path | null>(null);
  // 미리보기 선
  const previewLine = useRef<Path | null>(null);
  // 현재 선택된 세그먼트
  const segment = useRef<Segment | null>(null);
  // 현재 선택된 도형
  const selectedPath = useRef<Path | null>(null);

  /** [Handler] 도형 완성 */
  const handleComplete = useCallback(() => {
    if (drawnLine.current) {
      // 완성 이벤트 호출
      console.log("완성된 도형:", drawnLine.current);
      // onComplete?.(.);
    }
  }, [onComplete]);

  /** [Handler] 마우스 드래그 */
  const handleMouseDrag = useCallback(({ delta, point }: paper.ToolEvent) => {
    // 선택된 세그먼트가 있을 경우
    if (segment.current) {
      if (drawnLine.current)
        drawnLine.current.segments[segment.current.index].point = point;
    }
    // 선택된 도형이 있을 경우
    else if (selectedPath.current) {
      selectedPath.current.position.x += delta.x;
      selectedPath.current.position.y += delta.y;
    }
  }, []);

  /** [Handler] 마우스 다운 (좌표 생성) */
  const handleMouseDown = useCallback(
    ({ event, point }: ToolMouseEvent) => {
      // 좌측 클릭인 경우
      if (event.button === 0) {
        const _scope = scope.current;
        // Segment 생성
        const _segment = new _scope.Segment(point);

        // 새로운 선 생성
        drawnLine.current ??= new _scope.Path({
          fillColor: new _scope.Color(0, 0, 0, 0.1),
          closed: true,
          segments: [],
          selected: true,
          strokeColor: new _scope.Color("blue"),
          strokeWidth: 1,
        });

        // 기존 좌표 및 도형 클릭 여부 확인
        const _hitResult = drawnLine.current.hitTest(
          point,
          HitOptions,
        ) as paper.HitResult | null;

        // 좌표 클릭인 경우, 해당 세그먼트 선택
        if (_hitResult?.type === "segment") {
          segment.current = _hitResult.segment;
        }
        // 선 클릭인 경우, 새로운 좌표 추가
        else if (_hitResult?.type === "stroke") {
          // 새로운 좌표 추가
          drawnLine.current.insertSegments(_hitResult.location.index + 1, [
            _segment,
          ]);
          // 추가된 세그먼트 선택
          segment.current = _segment;
        }
        // 도형 내부 클릭인 경우, 도형 선택
        else if (_hitResult?.type === "fill") {
          selectedPath.current = _hitResult.item as Path;
        }
        // 선택 요소가 없을 경우, 새로운 좌표 추가
        else {
          drawnLine.current.add(_segment);
        }
      }
      // 우측 클릭인 경우
      else if (event.button === 2) {
        // 포인트와 일치하는 세그먼트 인덱스 찾기
        const findIndex = drawnLine.current?.segments.findIndex(
          ({ point: _point }) => point.equals(_point),
        );
        // 해당 세그먼트 삭제
        if (findIndex !== undefined && findIndex > -1) {
          drawnLine.current?.removeSegment(findIndex);
        }
      }
    },
    [scope],
  );

  /** [Handler] 마우스 이동 (미리보기 선 그리기) */
  const handleMouseMove = useCallback(
    ({ point }: paper.ToolEvent) => {
      const _scope = scope.current;

      // 그려진 선이 없을 경우, 미리보기 선도 그리지 않음
      if (drawnLine.current === null) return;

      // 좌표가 1개일 경우, 미리보기 선 생성
      if (drawnLine.current.segments.length === 1) {
        // 미리보기 선이 없으면 생성, 있으면 경로 업데이트
        if (previewLine.current === null) {
          previewLine.current = new _scope.Path({
            ...previewLineStyle,
            segments: [
              drawnLine.current.lastSegment,
              new _scope.Segment(point),
            ],
          });
        } else {
          previewLine.current.lastSegment.point = point;
        }
      }
      // 좌표가 2개인 경우, 미리보기 선 업데이트
      else if (drawnLine.current.segments.length === 2) {
        // 미리보기 경로 재구성
        if (previewLine.current) {
          previewLine.current.segments = [
            drawnLine.current.lastSegment,
            new _scope.Segment(point),
            drawnLine.current.firstSegment,
          ];
        }
      }
      // 3개 이상으로 폴리곤이 완성된 경우, 미리보기 선 제거
      else {
        if (previewLine.current) {
          previewLine.current.remove();
          previewLine.current = null;
        }
      }
    },
    [scope],
  );

  /** [Handler] 마우스 업 */
  const handleMouseUp = useCallback(() => {
    // 선택 요소 초기화
    segment.current = null;
    selectedPath.current = null;
  }, []);

  return {
    handleComplete,
    /** 이벤트 핸들러 */
    handleMouseDown,
    handleMouseDrag,
    handleMouseMove,
    handleMouseUp,
  };
}
