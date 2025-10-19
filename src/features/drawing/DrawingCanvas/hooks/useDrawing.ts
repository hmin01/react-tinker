import paper from "paper";
import { useCallback, useEffect, useRef, useState } from "react";

import { previewLineStyle, useScopeContext } from "../model";
import type { DrawingCanvasProps, Path, Point } from "../types";

/**
 * [Hook] 도형을 그리기 위한 로직
 * @param props DrawingCanvas 속성
 * @returns 변수 및 이벤트 핸들러
 */
export function useDrawing({ onComplete, polygon }: DrawingCanvasProps) {
  // 그려진 선 (선택 완료)
  const drawnLine = useRef<Path | null>(null);
  // 미리보기 선
  const previewLine = useRef<Path | null>(null);

  /** [Handler] 마우스 다운 (좌표 생성) */
  const handleMouseDown = useCallback(({ point }: paper.ToolEvent) => {
    if (drawnLine.current === null) {
      drawnLine.current = new paper.Path({
        closed: true,
        fillColor: new paper.Color("lightblue"),
        segments: [new paper.Segment(point)],
        selected: true,
      });
    } else if (drawnLine.current.segments.length < 3) {
      drawnLine.current.add(new paper.Segment(point));
    }
  }, []);

  /** [Handler] 마우스 이동 (미리보기 선 그리기) */
  const handleMouseMove = useCallback(({ point }: paper.ToolEvent) => {
    // 그려진 선이 없을 경우, 미리보기 선도 그리지 않음
    if (drawnLine.current === null) return;

    // 좌표가 1개일 경우, 미리보기 선 생성
    if (drawnLine.current.segments.length === 1) {
      // 미리보기 선이 없으면 생성, 있으면 경로 업데이트
      if (previewLine.current === null) {
        previewLine.current = new paper.Path({
          ...previewLineStyle,
          segments: [drawnLine.current.lastSegment, new paper.Segment(point)],
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
          new paper.Segment(point),
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
  }, []);

  /** [Handler] 더블 클릭 (폴리곤 완료) */
  const handleDoubleClick = useCallback(() => {
    // 최소 3개의 좌표로 폴리곤 완성
    if (drawnLine.current && drawnLine.current.segments.length >= 3) {
      // 완료 콜백 호출
      onComplete?.(
        drawnLine.current.segments.map((_segment) => _segment.point),
      );
    }

    // if (coordinates.length < 3) return;
    // // 미리보기 선 제거
    // if (previewLine.current) {
    //   previewLine.current.forEach((line) => line.remove());
    //   previewLine.current = [];
    // }
    // // 선택한 좌표를 기반으로 도형 생성
    // if (drawLine.current) {
    //   drawLine.current.strokeColor = new paper.Color("blue");
    //   drawLine.current.fillColor = new paper.Color("lightblue");
    //   drawLine.current.closed = true;
    //   drawLine.current.selected = false;
    //   // 좌표 초기화
    //   setCoordinates([]);
    //   // 완료 콜백 호출
    //   onComplete?.(coordinates);
    // }
  }, [drawnLine, onComplete]);

  // /** 좌표 변경 시, 선 그리기 */
  // useEffect(() => {
  //   if (coordinates.length > 1) {
  //     // 이전 라인 제거
  //     if (drawLine.current) {
  //       drawLine.current.remove();
  //     }
  //     // 새로운 라인 생성
  //     drawLine.current = new paper.Path({
  //       project: scope.project,
  //       segments: coordinates,
  //       selected: true,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [coordinates]);

  return {
    /** 이벤트 핸들러 */
    handleDoubleClick,
    handleMouseDown,
    handleMouseMove,
  };
}
