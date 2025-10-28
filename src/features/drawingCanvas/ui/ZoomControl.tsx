import { useCallback, type CSSProperties } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { useCanvasScope, useZoomContext } from "../model";

const ZOOM_IN_FACTOR = 1.1;
const ZOOM_OUT_FACTOR = 0.9;

export interface ZoomControlProps {
  /** 배치 위치 (하단, 단위 포함) */
  bottom?: CSSProperties["bottom"];
  /** 배치 위치 (왼쪽, 단위 포함) */
  left?: CSSProperties["left"];
  /** 배치 위치 (오른쪽, 단위 포함) */
  right?: CSSProperties["right"];
  /** 배치 위치 (상단, 단위 포함) */
  top?: CSSProperties["top"];
  /** 줌 이벤트 핸들러 */
  onZoom?: (zoom: number) => void;
}

export function ZoomControl({
  bottom,
  left,
  onZoom,
  right = 24,
  top = 24,
}: ZoomControlProps) {
  // Scope 컨텍스트
  const { scope, setScope } = useCanvasScope();
  // 줌(Zoom) 컨텍스트
  const { maxZoom, minZoom } = useZoomContext();

  /** [Handler] 확대 */
  const handleZoomIn = useCallback(() => {
    // 스코프가 없을 경우, 종료
    if (scope === null) return;

    // 현재 줌 레벨 계산
    const _zoom = Math.round(scope.view.zoom * ZOOM_IN_FACTOR * 10) / 10;
    // 최대 줌 레벨과 비교
    if (maxZoom !== undefined && _zoom > maxZoom) return;
    // 확대 적용
    setScope((_scope) => {
      if (_scope) {
        _scope.view.scale(_zoom * ZOOM_IN_FACTOR);
        _scope.view.zoom =
          maxZoom !== undefined ? Math.min(_zoom, maxZoom) : _zoom;
      }
      return _scope;
    });
    // 외부 이벤트 핸들러 호출
    onZoom?.(_zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxZoom, onZoom, scope]);

  /** [Handler] 축소 */
  const handleZoomOut = useCallback(() => {
    // 스코프가 없을 경우, 종료
    if (scope === null) return;

    // 현재 줌 레벨 계산
    const _zoom = Math.round(scope.view.zoom * ZOOM_OUT_FACTOR * 10) / 10;
    // 최대 줌 레벨과 비교
    if (minZoom !== undefined && _zoom < minZoom) return;
    // 확대 적용
    setScope((_scope) => {
      if (_scope) {
        _scope.view.scale(_zoom * ZOOM_OUT_FACTOR);
        _scope.view.zoom =
          minZoom !== undefined ? Math.max(_zoom, minZoom) : _zoom;
      }
      return _scope;
    });
    // 외부 이벤트 핸들러 호출
    onZoom?.(_zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minZoom, onZoom, scope]);

  return (
    <div
      className="fixed z-10 overflow-hidden rounded-md border border-gray-300 bg-white"
      style={{ bottom, left, right, top }}
    >
      <button
        className="flex h-6 w-6 cursor-pointer items-center justify-center border-b border-gray-200"
        onClick={handleZoomIn}
      >
        <FaPlus size={14} />
      </button>
      <button
        className="flex h-6 w-6 cursor-pointer items-center justify-center"
        onClick={handleZoomOut}
      >
        <FaMinus size={14} />
      </button>
    </div>
  );
}
