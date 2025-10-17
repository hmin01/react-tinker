import paper from "paper";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { previewLineStyle } from "../model";
import type { DrawingCanvasProps, Path, Point } from "../types";

/**
 * [Hook] 도형을 그리기 위한 로직
 * @param props DrawingCanvas 속성
 * @returns 변수 및 이벤트 핸들러
 */
export function useDrawing({ onComplete, polygon }: DrawingCanvasProps) {
  // 캔버스 참조 객체
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 생성 중인 폴리곤 좌표
  const [coordinates, setCoordinates] = useState<Point[]>([]);
  // 그려진 선 (선택 완료)
  const drawLine = useRef<Path | null>(null);
  // 미리보기 선
  const previewLine = useRef<paper.Path | null>(null);

  /** [Handler] 마우스 다운 (좌표 생성) */
  const handleMouseDown = useCallback((e: paper.ToolEvent) => {
    setCoordinates((prev) => [...prev, new paper.Point(e.point.x, e.point.y)]);
  }, []);

  /** [Handler] 마우스 이동 (미리보기 선 그리기) */
  const handleMouseMove = useCallback((e: paper.ToolEvent) => {
    // 선택한 좌표가 1개 미만일 경우, 로직 종료
    if (coordinates.length === 0) return;

    // 현재 좌표
    const currentPoint = e.point;
  }, []);
}

// export function useDrawing({ onComplete, polygon }: DrawingCanvasProps) {
//   // 캔버스 참조 객체
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // 좌표
//   const [coordinates, setCoordinates] = useState<Point[]>([]);

//   // 그려진 선 (선택 완료)
//   const [drewLine, setDrewLine] = useState<Path | null>(null);
//   // 미리보기 선
//   const previewLine = useRef<paper.Path | null>(null);

//   /** [Handler] 클릭 이벤트 */
//   const handleClick = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
//     console.log("click", e);
//     // 좌표 추가
//     setCoordinates((prev) => [
//       ...prev,
//       new paper.Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY),
//     ]);
//   }, []);

//   /** [Handler] 마우스 다운 */
//   const handleMouseDown = useCallback((e: paper.ToolEvent) => {
//     setCoordinates((prev) => [...prev, new paper.Point(e.point.x, e.point.y)]);
//   }, []);

//   /** [Handler] 마우스 이동 */
//   const handleMouseMove = useCallback(
//     (e: paper.ToolEvent) => {
//       // 선택한 좌표가 1개 미만일 경우, 로직 종료
//       if (coordinates.length === 0) return;

//       // 마지막 포인트
//       const lastPoint = coordinates[coordinates.length - 1];
//       // 클릭 위치
//       const clickPoint = new paper.Point(e.point.x, e.point.y);

//       // 미리보기 선 그리기
//       setPreviewLine((prev) => {
//         if (prev) {
//           prev.segments[0].point = lastPoint;
//           prev.segments[1].point = clickPoint;
//           prev.smooth();
//           return prev;
//         } else {
//           return new paper.Path({
//             segments: [lastPoint, clickPoint],
//             ...previewLineStyle,
//           });
//         }
//       });
//     },
//     [coordinates],
//   );

//   /** [Handler] 더블 클릭 (폴리곤 완료) */
//   const handleDoubleClick = useCallback(() => {
//     // 최소 3개의 좌표로 폴리곤 완성
//     if (coordinates.length < 3) return;

//     // 미리보기 선 제거
//     if (previewLine) {
//       previewLine.remove();
//       setPreviewLine(null);
//     }
//     // 그려진 선 제거
//     if (drewLine) {
//       setDrewLine((prev) => {
//         if (prev) prev.remove();
//         return null;
//       });
//       // 좌표 초기화
//       setCoordinates([]);
//       // 완료 상태 변경
//       onComplete?.(coordinates);
//     }
//   }, [coordinates, drewLine, onComplete, previewLine]);

//   // 좌표 변경 시, 선 그리기
//   useEffect(() => {
//     if (coordinates.length > 1) {
//       setDrewLine((prev) => {
//         // 이전 라인 제거
//         if (prev) prev.remove();
//         // 새로운 라인 생성
//         return new paper.Path({
//           segments: coordinates,
//           selected: true,
//         });
//       });
//     }
//   }, [coordinates]);

//   /** 폴리곤 완성 시, 도형 그리기 */
//   useEffect(() => {
//     if (polygon && polygon.length > 0) {
//       new paper.Path({
//         segments: polygon,
//         strokeColor: "blue",
//         strokeWidth: 2,
//         closed: true,
//       });
//     }
//   }, [polygon]);

//   /** 캔버스 초기화 */
//   useEffect(() => {
//     if (canvasRef.current) {
//       // paper.js 초기화
//       paper.setup(canvasRef.current);
//       // 툴 생성
//       const tool = new paper.Tool();
//       // 이벤트 등록
//       tool.onMouseDown = handleMouseDown;
//       tool.onMouseMove = handleMouseMove;

//       // Clear up
//       return () => {
//         // 정리 작업
//         paper.project.clear();
//       };
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return {
//     canvasRef,
//     handleClick,
//     handleDoubleClick,
//     handleMouseMove,
//   };
// }
