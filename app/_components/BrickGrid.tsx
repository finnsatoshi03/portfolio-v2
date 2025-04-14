"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "../_lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BrickGrid = ({ className }: { className?: string }) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;

    // Set initial state
    gsap.set([row1Ref.current, row2Ref.current, row3Ref.current], {
      opacity: 0,
    });

    // Row 1 animation - scroll to right
    gsap.to(row1Ref.current, {
      opacity: 1,
      x: "-3%",
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

    // Row 2 animation - scroll to left
    gsap.to(row2Ref.current, {
      opacity: 1,
      x: "-6%",
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

    // Row 3 animation - scroll to right
    gsap.to(row3Ref.current, {
      opacity: 1,
      x: "-3%",
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

    // Cleanup function
    return () => {
      // Using type assertion to avoid linter errors
      const triggers = ScrollTrigger.getAll() as unknown as {
        kill: () => void;
      }[];
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full h-full absolute inset-0 flex flex-col gap-4 p-4 overflow-hidden",
        className
      )}
    >
      {/* Row 1 - Base position */}
      <div ref={row1Ref} className="flex gap-4 h-1/3 w-[200%] -translate-x-1/4">
        {[...Array(10)].map((_, i) => (
          <div
            key={`row1-${i}`}
            className="flex-1 h-full bg-gray-800/20 border border-gray-700/30 rounded-lg"
          />
        ))}
      </div>

      {/* Row 2 - Offset by half a brick width */}
      <div ref={row2Ref} className="flex gap-4 h-1/3 w-[200%] translate-x-1/4">
        {[...Array(10)].map((_, i) => (
          <div
            key={`row2-${i}`}
            className="flex-1 h-full bg-gray-800/20 border border-gray-700/30 rounded-lg"
          />
        ))}
      </div>

      {/* Row 3 - Back to base position */}
      <div ref={row3Ref} className="flex gap-4 h-1/3 w-[200%] -translate-x-1/4">
        {[...Array(10)].map((_, i) => (
          <div
            key={`row3-${i}`}
            className="flex-1 h-full bg-gray-800/20 border border-gray-700/30 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default BrickGrid;
