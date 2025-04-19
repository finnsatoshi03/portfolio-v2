"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/app/_lib/utils";

export function LayoutCarousel({ className }: { className?: string }) {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const images = [1, 2, 3, 4, 5, 6]; // Represents image placeholders
  const lastFrameTime = useRef(0);
  const rotationSpeed = 30; // Degrees per second (slower than before)

  // Use requestAnimationFrame for smoother animations
  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime.current;
      lastFrameTime.current = timestamp;

      if (autoRotate && hoveredIndex === null) {
        // Calculate how much to rotate based on elapsed time
        const rotationDelta = (rotationSpeed * deltaTime) / 1000;
        setRotation((prev) => (prev + rotationDelta) % 360);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate, hoveredIndex, rotationSpeed]);

  // Calculate positions with memoization to avoid unnecessary recalculations
  const getItemStyle = (index: number) => {
    const angle = (index * (360 / images.length) + rotation) % 360;
    const radians = angle * (Math.PI / 180);

    // Calculate position in a spiral pattern with increased radius
    const radius = 150 + index * 8; // Increased radius for larger spiral
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    // Calculate scale based on position and hover state
    const baseScale = 0.8 + (0.4 * (Math.cos(radians) + 1)) / 2; // Increased base scale
    const hoverScale = hoveredIndex === index ? 1.3 : 1; // Increased hover scale
    const scale = baseScale * hoverScale;

    // Calculate z-index
    const zIndex =
      hoveredIndex === index ? 100 : Math.round(50 + 50 * Math.cos(radians));

    // Calculate opacity
    const opacity =
      hoveredIndex === index ? 1 : 0.6 + (0.4 * (Math.cos(radians) + 1)) / 2;

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      zIndex,
      opacity,
      transition:
        hoveredIndex === index
          ? "all 0.3s ease-out"
          : "transform 0s, opacity 0.3s ease-in-out",
    };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setAutoRotate(false);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setAutoRotate(true);
  };

  return (
    <div className={cn("relative h-full -left-1/3 w-full flex-1", className)}>
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={getItemStyle(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src={`/api/placeholder/120/120`}
              alt={`Design sample ${index + 1}`}
              width={120}
              height={120}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
