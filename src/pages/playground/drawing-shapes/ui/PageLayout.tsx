import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@shared/utils";

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  header: ReactNode;
}

export function PageLayout({
  children,
  className,
  header,
  ...props
}: PageLayoutProps) {
  return (
    <div className={classNames("h-screen w-screen", className)} {...props}>
      <>{header}</>
      <div className="flex-1">{children}</div>
    </div>
  );
}
