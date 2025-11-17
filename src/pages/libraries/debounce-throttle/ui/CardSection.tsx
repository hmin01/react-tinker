import type { HTMLAttributes } from "react";

import { classNames } from "@shared/utils";

export function CardSection({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "relative rounded-lg border border-gray-300 px-4 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
