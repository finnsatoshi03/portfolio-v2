import React, { ReactNode } from "react";

export function GeneralCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-700/30 p-2 md:p-4 space-y-2">
      <div>
        <h2>{title}</h2>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}
