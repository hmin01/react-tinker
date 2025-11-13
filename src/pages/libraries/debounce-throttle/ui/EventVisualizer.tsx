import { useCallback, useRef, useState } from "react";

import { Button } from "@shared/ui";

interface OccurredEvent {
  /** 이벤트 발생 여부 */
  occurred: boolean;
  /** 이벤트 발생 일시 */
  timestamp: number;
}

export function EventVisualizer() {
  const intervalRef = useRef<number | null>(null);

  // 이벤트 기록
  const [rawEvents, setRawEvents] = useState<OccurredEvent[]>([]);
  // 이벤트 발생 상태
  const [occurred, setOccurred] = useState<boolean>(false);

  /** [Handler] 이벤트 종료 */
  const handleEventEnd = useCallback(() => {
    setOccurred(() => false);
    // if (intervalRef.current) {
    //   clearInterval(intervalRef.current);
    //   intervalRef.current = null;
    //   // Raw 이벤트 초기화
    //   setRawEvents([]);
    // }
  }, []);

  /** [Handler] 이벤트 리셋 */
  const handleEventReset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // 이벤트 초기화
      setRawEvents([]);
    }
  }, []);

  /** [Handler] 이벤트 시작 */
  const handleEventStart = useCallback(() => {
    const timestamp = Date.now();

    setOccurred(() => true);

    // Raw 이벤트 기록 시작
    intervalRef.current ??= setInterval(() => {
      setRawEvents((prev) => [...prev, { occurred, timestamp }]);
    }, 250);
  }, [occurred]);

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Button onMouseLeave={handleEventEnd} onMouseMove={handleEventStart}>
          Hover 트리거
        </Button>
        <Button onClick={handleEventReset}>이벤트 중지</Button>
      </div>
      <div className="relative flex h-6 w-full gap-1">
        {rawEvents.map(({ occurred, timestamp }) => {
          const color = occurred ? "bg-red-500" : "bg-gray-300";

          return (
            <span
              key={timestamp}
              className={`inline-block h-full w-2 ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
}
