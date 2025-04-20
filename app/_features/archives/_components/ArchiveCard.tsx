"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type ArchiveItem = {
  id: number;
  title: string;
  category: string;
  year: number;
};

interface ArchiveCardProps {
  item: ArchiveItem;
}

export const ArchiveCard: React.FC<ArchiveCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[0.5fr_1fr_1fr] transition-all duration-300 ease-in-out hover:text-black gap-4 text-lg -mx-4 md:-mx-8 py-2 md:px-8 px-4 border-b group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[#4ead3f] -translate-y-full text-left group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
      <h3 className="relative z-10 truncate flex items-center">
        <span
          className={`absolute transition-all duration-300 ease-in-out ${
            isHovered
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-3 scale-90"
          }`}
        >
          <ArrowUpRight size={24} strokeWidth={1} />
        </span>
        <span
          className={`transition-all duration-300 ${
            isHovered ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {item.title}
        </span>
      </h3>
      <p className="relative z-10">{item.category}</p>
      <p className="relative z-10 justify-self-end">{item.year}</p>
    </div>
  );
};
