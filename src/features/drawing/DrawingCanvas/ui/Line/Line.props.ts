export interface LineProps {
  /** 대시 옵션 */
  dashArray?: [number, number];
  /** 시작 좌표 */
  from: [number, number];
  /** 끝 좌표 */
  to: [number, number];
  /** 선 색상 */
  strokeColor?: string;
  /** 선 두께 */
  strokeWidth?: number;
}
