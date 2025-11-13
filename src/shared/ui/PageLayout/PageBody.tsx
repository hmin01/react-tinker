import type { HTMLAttributes } from "react";

import { classNames } from "../../utils";

export function PageBody({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("relative w-full flex-1", className)}>
      {children}
    </div>
  );
}
