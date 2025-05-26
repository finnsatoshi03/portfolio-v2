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
        scale: 0.4,
        filter: "blur(40px)",
        y: -200,
      },
      {
        opacity: 0.5,
        scale: 0.8,
        filter: "blur(30px)",
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "bottom-=150 bottom-=100",
          end: "center center",
          toggleActions: "play reverse play reverse",
          scrub: 1.5,
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
        "absolute -top-[30vh] left-1/2 -translate-x-1/2 opacity-0 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-b from-[#6CFF56]/40 via-[#6CFF56]/20 to-transparent pointer-events-none",
        className
      )}
      style={{
        filter: "blur(30px)",
        boxShadow: "0 0 100px 50px rgba(108, 255, 86, 0.2)",
      }}
    />
  );
};

export default LightEffect;
