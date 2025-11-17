import type { HTMLAttributes } from "react";

import { classNames } from "@shared/utils";

import type { IntervalEvent, OccurredEventKey } from "../model";

interface EventViewLineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 발생 이벤트 목록 */
  events: IntervalEvent[];
  /** 이벤트 유형 */
  eventType: OccurredEventKey;
  /** 섹션 제목 */
  title?: string;
}

const colorMap: Record<OccurredEventKey, string> = {
  debounce: "bg-orange-500",
  raw: "bg-blue-500",
  throttle: "bg-green-500",
};

export function EventViewLine({
  className,
  events,
  eventType,
  title,
  ...props
}: EventViewLineProps) {
  return (
    <div className="mb-2">
      <h4 className="mb-1 text-sm font-semibold">{title}</h4>
      <div
        className={classNames("relative flex h-6 w-full gap-1", className)}
        {...props}
      >
        {events.map(({ occurred, timestamp }) => (
          <span
            key={timestamp}
            className={classNames(
              "inline-block h-full w-2",
              occurred[eventType] ? colorMap[eventType] : "bg-gray-100",
              className,
            )}
          />
        ))}
      </div>
    </div>
  );
}
