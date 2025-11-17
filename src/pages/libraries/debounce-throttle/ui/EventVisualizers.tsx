import { Button } from "@shared/ui";
import { useEventVisualizer } from "../hooks";
import { EventViewSection } from "./EventViewSection";
export function EventVisualizers() {
  const {
    handleEventDetect,
    handleEventEnd,
    handleEventReset,
    handleEventStart,
    handleEventStop,
    sequentialEvents,
  } = useEventVisualizer();

  return (
    <div className="relative w-full">
      <div className="mb-4 flex gap-2">
        <Button
          onClick={handleEventStart}
          onMouseEnter={handleEventDetect}
          onMouseLeave={handleEventEnd}
          onMouseMove={handleEventDetect}
        >
          Hover 트리거
        </Button>
        <Button onClick={handleEventStop}>이벤트 중지</Button>
        <Button onClick={handleEventReset}>이벤트 초기화</Button>
      </div>
      <EventViewSection
        events={sequentialEvents}
        eventType="dom"
        title="Raw Event"
      />
      <EventViewSection
        events={sequentialEvents}
        eventType="debounce"
        title="Debounce"
      />
      <EventViewSection
        events={sequentialEvents}
        eventType="throttle"
        title="Throttle"
      />
    </div>
  );
}
