import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "../../utils";

interface PageHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 페이지 제목 */
  title: ReactNode;
}

export function PageHeader({ className, title }: PageHeaderProps) {
  return (
    <header
      className={classNames(
        "flex h-14 w-full items-center justify-between gap-4 border-b border-gray-200 px-6 shadow-sm",
        className,
      )}
    >
      <h2 className="text-base leading-5 font-semibold">{title}</h2>
    </header>
  );
}
