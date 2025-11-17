import { debounce, throttle } from "@hmin/js-toolkit";
import { useCallback, useEffect, useRef, useState } from "react";

import type { IntervalEvent } from "../model";

const INTERVAL = 250;
const EVENT_DURATION = 500;

export function useEventVisualizer() {
  // 이벤트 타이머
  const intervalRef = useRef<number | null>(null);
  // 이벤트 기록
  const [intervalEvents, setIntervalEvents] = useState<IntervalEvent[]>([]);

  // Raw 이벤트 발생 상태
  const rawEventOccurred = useRef(false);
  // Debounce 이벤트 발생 상태
  const debouncedEventOccurred = useRef(false);
  // Throttle 이벤트 발생 상태
  const throttledEventOccurred = useRef(false);

  // Debounce 함수
  const debounced = useRef(
    debounce(() => {
      debouncedEventOccurred.current = true;
    }, EVENT_DURATION),
  );
  // Throttle 함수
  const throttled = useRef(
    throttle(() => {
      throttledEventOccurred.current = true;
    }, EVENT_DURATION),
  );

  /** [Handler] 이벤트 감지 */
  const handleEventDetect = useCallback(() => {
    rawEventOccurred.current = true;
  }, []);

  /** [Handler] 이벤트 종료 */
  const handleEventEnd = useCallback(() => {
    rawEventOccurred.current = false;
  }, []);

  /** [Handler] 이벤트 시작 */
  const handleEventStart = useCallback(() => {
    intervalRef.current ??= setInterval(() => {
      setIntervalEvents((prev) => {
        // Raw 이벤트가 발생했을 때, 디바운스 함수 실행
        if (rawEventOccurred.current) {
          debounced.current();
          throttled.current();
        }
        // 이전 이벤트가 디바운스 이벤트였고, 현재 디바운스 이벤트가 발생한 상태라면 초기화 (한 번만 기록하기 위함)
        if (
          prev.length > 1 &&
          prev[prev.length - 1].occurred.debounce &&
          debouncedEventOccurred.current
        ) {
          debouncedEventOccurred.current = false;
        }
        // 이전 이벤트가 스로틀 이벤트였고, 현재 스로틀 이벤트가 발생한 상태라면 초기화 (한 번만 기록하기 위함)
        if (
          prev.length > 1 &&
          prev[prev.length - 1].occurred.throttle &&
          throttledEventOccurred.current
        ) {
          throttledEventOccurred.current = false;
        }

        return [
          ...prev,
          {
            occurred: {
              debounce: debouncedEventOccurred.current,
              raw: rawEventOccurred.current,
              throttle: throttledEventOccurred.current,
            },
            timestamp: Date.now(),
          },
        ];
      });
    }, INTERVAL);
  }, []);

  /** [Handler] 이벤트 중지 */
  const handleEventStop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 디바운스 종료
    debounced.current.cancel();
    // 스로틀 종료
    throttled.current.cancel();
  }, []);

  /** [Handler] 이벤트 리셋 */
  const handleEventReset = useCallback(() => {
    handleEventStop();
    // 이벤트 기록 초기화
    setIntervalEvents([]);
  }, [handleEventStop]);

  useEffect(() => {
    return () => {
      handleEventReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleEventDetect,
    handleEventEnd,
    handleEventReset,
    handleEventStart,
    handleEventStop,
    intervalEvents,
  };
}
