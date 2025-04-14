"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "../_lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LightEffectProps {
  className?: string;
}

const LightEffect = ({ className = "" }: LightEffectProps) => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lightRef.current) return;

    // Create the light effect animation
    gsap.fromTo(
      lightRef.current,
      {
        opacity: 0,
        scale: 0.3,
        filter: "blur(60px)",
        y: -300, // Start further above the section
      },
      {
        opacity: 0.7,
        scale: 0.9,
        filter: "blur(40px)",
        y: 0, // Move to its final position
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "bottom-=150 bottom-=100", // Start when the top of the section is near the bottom of the viewport
          end: "center center", // End when the bottom of the section is near the top of the viewport
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave, play on enter again, reverse on leave again
          scrub: 1, // Smooth scrubbing effect for better reverse scrolling
        },
      }
    );

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
      ref={lightRef}
      className={cn(
        "absolute -top-[40vh] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-b from-[#6CFF56]/40 to-transparent pointer-events-none",
        className
      )}
      style={{
        boxShadow: "0 0 200px 100px rgba(108, 255, 86, 0.25)",
      }}
    />
  );
};

export default LightEffect;
