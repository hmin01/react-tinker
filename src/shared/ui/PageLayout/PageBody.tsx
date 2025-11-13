import type { HTMLAttributes } from "react";

import { classNames } from "../../utils";

export function PageBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("relative w-full flex-1", className)} {...props}>
      {children}
    </div>
  );
}
