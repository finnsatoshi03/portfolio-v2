import React from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["700", "900"],
});

export function SectionHeader({
  category,
  title,
  description,
  isArchives = false,
}: {
  category: string;
  title: string;
  description: string;
  isArchives?: boolean;
}) {
  // If isArchives is true, replace "Impactful" with styled version using Vanchrome Bold
  // and replace "Timeless" with styled version using Playfair Display
  const renderTitle = () => {
    if (!isArchives) return <h2 className="text-4xl font-bold">{title}</h2>;

    // Split the title to style specific words
    const titleParts = title.split(/(Impactful|Timeless)/g);

    return (
      <h2 className="text-4xl font-bold">
        {titleParts.map((part, index) => {
          if (part === "Impactful") {
            return (
              <span key={index} className={`${inter.className}`}>
                {part}
              </span>
            );
          } else if (part === "Timeless") {
            return (
              <span key={index} className={`${playfairDisplay.className}`}>
                {part}
              </span>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </h2>
    );
  };

  return (
    <div className="space-y-4 text-center">
      <p>{category}</p>
      <div className="space-y-1 max-w-[1140px] mx-auto">
        {renderTitle()}
        <p>{description}</p>
      </div>
    </div>
  );
}
