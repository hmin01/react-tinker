import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "../../utils";

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** 헤더 영역 */
  header?: ReactNode;
}

export function PageLayout({ children, className, header }: PageLayoutProps) {
  return (
    <main
      className={classNames("relative flex min-h-screen w-full", className)}
    >
      {header}
      {children}
    </main>
  );
}
