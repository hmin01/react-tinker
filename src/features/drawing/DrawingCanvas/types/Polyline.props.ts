export interface PolylineProps {
  /** 닫힘 여부 */
  closed?: boolean;
  /** 좌표 배열 */
  coordinates: [number, number][];
  /** 대시 옵션 */
  dashArray?: [number, number];
  /** 선 색상 */
  strokeColor?: string;
  /** 선 두께 */
  strokeWidth?: number;
}
