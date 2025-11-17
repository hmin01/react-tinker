import { Button } from "@shared/ui";

import { useEventVisualizer } from "../hooks";

import { EventViewLine } from "./EventViewLine";

export function EventVisualizer() {
  const {
    handleEventDetect,
    handleEventEnd,
    handleEventReset,
    handleEventStart,
    handleEventStop,
    intervalEvents,
  } = useEventVisualizer();

  return (
    <div className="relative w-full">
      <div className="flex gap-16">
        <div className="mb-4 flex gap-2">
          <Button onClick={handleEventStart}>인터벌 시작</Button>
          <Button onClick={handleEventStop}>인터벌 중지</Button>
          <Button onClick={handleEventReset}>인터벌 초기화</Button>
        </div>
        <div>
          <Button
            onMouseEnter={handleEventDetect}
            onMouseLeave={handleEventEnd}
          >
            Hover 트리거
          </Button>
        </div>
      </div>
      <EventViewLine
        events={intervalEvents}
        eventType="raw"
        title="Raw Event (250ms)"
      />
      <EventViewLine
        events={intervalEvents}
        eventType="debounce"
        title="Debounce (500ms)"
      />
      <EventViewLine
        events={intervalEvents}
        eventType="throttle"
        title="Throttle (500ms)"
      />
    </div>
  );
}
