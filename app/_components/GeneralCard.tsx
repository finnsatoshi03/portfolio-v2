import React, { ReactNode } from "react";
import { cn } from "../_lib/utils";

export function GeneralCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700/30 p-2 md:p-4 space-y-2",
        className
      )}
    >
      <div>
        <h2>{title}</h2>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}
