import React, { ReactNode } from "react";
import { cn } from "../_lib/utils";

export function GeneralCard({
  title,
  description,
  children,
  isTitleOnBottom = false,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
  isTitleOnBottom?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700/30 flex flex-col justify-between p-2 md:p-4 space-y-2",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!isTitleOnBottom && (
        <div>
          <h2>{title}</h2>
          <p className="text-white/50 text-sm">{description}</p>
        </div>
      )}
      {children}
      {isTitleOnBottom && (
        <div className="text-center">
          <h2>{title}</h2>
        </div>
      )}
    </div>
  );
}
