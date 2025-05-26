"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { cn } from "../_lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ImageItem = {
  src: string;
  alt: string;
};

type BrickGridProps = {
  className?: string;
  images?: ImageItem[];
};

const BrickGrid = ({ className, images = [] }: BrickGridProps) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  // Configuration - Reduced for better performance
  const IMAGES_PER_ROW = 5;
  const defaultImage = { src: "/placeholder.jpg", alt: "Placeholder image" };

  // Memoize row images to prevent unnecessary recalculations
  const { row1Images, row2Images, row3Images } = useMemo(() => {
    // Helper function to get images for each row
    const getRowImages = (startIndex: number): ImageItem[] => {
      const rowImages = images.slice(startIndex, startIndex + IMAGES_PER_ROW);
      const placeholderCount = IMAGES_PER_ROW - rowImages.length;
      return [
        ...rowImages,
        ...Array(placeholderCount > 0 ? placeholderCount : 0).fill(
          defaultImage
        ),
      ];
    };

    return {
      row1Images: getRowImages(0),
      row2Images: getRowImages(IMAGES_PER_ROW),
      row3Images: getRowImages(IMAGES_PER_ROW * 2),
    };
  }, [images, IMAGES_PER_ROW, defaultImage]);

  // Setup animations with GSAP
  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;

    const rows = [
      { ref: row1Ref.current, initialX: 0, targetX: "-3%" },
      { ref: row2Ref.current, initialX: "-6%", targetX: "0%" },
      { ref: row3Ref.current, initialX: 0, targetX: "-3%" },
    ];

    // Set initial states
    rows.forEach((row) => {
      gsap.set(row.ref, {
        opacity: 0,
        x: row.initialX,
      });
    });

    // Create animations for each row
    rows.forEach((row) => {
      // Opacity animation
      gsap.to(row.ref, {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "bottom-=150 bottom-=100",
          end: "center center",
          scrub: 2.5,
          toggleActions: "play none none reverse",
        },
      });

      // Horizontal movement animation
      gsap.to(row.ref, {
        x: row.targetX,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "bottom-=150 bottom-=100",
          end: "bottom+=50% center",
          scrub: 2.5,
          toggleActions: "play none none reverse",
        },
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Fixed type for renderRow to accept possibly null refs
  const renderRow = (
    images: ImageItem[],
    ref: React.RefObject<HTMLDivElement | null>,
    translateClass: string
  ) => (
    <div ref={ref} className={`flex gap-4 h-1/3 w-[200%] ${translateClass}`}>
      {images.map((image, i) => (
        <div
          key={`row-${i}`}
          className="flex-1 h-full bg-gray-800/20 border min-w-[250px] border-gray-700/30 rounded-lg overflow-hidden relative"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 250px"
            loading="lazy"
            priority={false}
            quality={75}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "w-full h-full absolute inset-0 flex flex-col gap-4 p-4 overflow-hidden",
        className
      )}
    >
      {renderRow(row1Images, row1Ref, "-translate-x-1/4")}
      {renderRow(row2Images, row2Ref, "translate-x-1/4")}
      {renderRow(row3Images, row3Ref, "-translate-x-1/4")}
    </div>
  );
};

export default BrickGrid;
