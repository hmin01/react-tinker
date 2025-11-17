export interface OccurredEvent {
  /** Debounce */
  debounce: boolean;
  /** Raw 이벤트 */
  raw: boolean;
  /** Throttle */
  throttle: boolean;
}
export type OccurredEventKey = keyof OccurredEvent;

export interface IntervalEvent {
  /** 이벤트 발생 여부 */
  occurred: OccurredEvent;
  /** 이벤트 발생 일시 */
  timestamp: number;
}
