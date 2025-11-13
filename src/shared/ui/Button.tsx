import type { ButtonHTMLAttributes } from "react";

import { classNames } from "../utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

export function Button({
  children,
  className,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  let variantClasses = "";
  switch (variant) {
    case "outline":
      variantClasses =
        "bg-white border border-gray-500 text-gray-800 hover:bg-gray-50";
      break;
    default:
      variantClasses = "bg-gray-300 text-gray-800 hover:bg-gray-400";
      break;
  }

  return (
    <button
      className={classNames(
        "cursor-pointer rounded-md p-1.5 text-sm font-normal transition-colors duration-200",
        variantClasses,
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
