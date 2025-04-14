import React from "react";

export function SectionHeader({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4 text-center">
      <p>{category}</p>
      <div className="space-y-1 max-w-[1140px] mx-auto">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
