import type { HTMLAttributes } from "react";

import { classNames } from "@shared/utils";
import type { OccurredEvent, SequentialEvent } from "../hooks";

interface EventViewSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 발생 이벤트 목록 */
  events: SequentialEvent[];
  /** 이벤트 유형 */
  eventType: keyof OccurredEvent;
  /** 섹션 제목 */
  title?: string;
}

export function EventViewSection({
  className,
  events,
  eventType,
  title,
  ...props
}: EventViewSectionProps) {
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
              occurred[eventType] ? "bg-blue-500" : "bg-gray-200",
              className,
            )}
          />
        ))}
      </div>
    </div>
  );
}
