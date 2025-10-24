import type { HTMLAttributes } from "react";

import { classNames } from "@shared/utils";

export function PageHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "flex h-14 w-full items-center justify-between border-b border-gray-200 px-4 drop-shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
