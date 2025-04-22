"use client";

import React, { useState } from "react";
import { DynamicImage } from "@/app/_components/DynamicImage";

export interface StackedImage {
  id: number;
  src: string;
  alt: string;
}

interface StackedImagesCardProps {
  images: StackedImage[];
  className?: string;
}

export const StackedImagesCard = ({
  images,
  className = "",
}: StackedImagesCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative h-48 w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label="Stacked images gallery"
    >
      <div
        className="absolute h-full transition-all duration-300"
        style={{
          right: "-20%",
          bottom: "-18%",
          width: "120%",
        }}
      >
        {images.map((image, index) => {
          const baseOverlap = 10;
          const hoverOverlap = 8;
          const overlap = isHovered ? hoverOverlap * 3 : baseOverlap * 1.5;
          const visibleWidth = 100 - (images.length - 1) * overlap;

          return (
            <div
              key={image.id}
              className="absolute h-full shadow-xl rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                right: `${index * overlap}%`,
                width: `${visibleWidth}%`,
                zIndex: images.length - index,
              }}
            >
              <DynamicImage
                src={image.src}
                alt={image.alt}
                imageClassName={`object-top`}
                className="h-full border-2 border-gray-800/50 rounded-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
