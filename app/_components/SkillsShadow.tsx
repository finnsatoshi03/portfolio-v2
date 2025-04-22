"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "../_lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillsShadowProps {
  className?: string;
}

const SkillsShadow = ({ className = "" }: SkillsShadowProps) => {
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shadowRef.current) return;

    // Create shadow animation
    gsap.fromTo(
      shadowRef.current,
      {
        scale: 0.3,
        filter: "blur(80px)",
        y: -200,
      },
      {
        opacity: 0.9,
        scale: 1,
        filter: "blur(60px)",
        y: -40,
        duration: 1.2,
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
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <div
        ref={shadowRef}
        className="w-[100%] h-[100%] rounded-full bg-gradient-to-b from-black via-black/80 to-transparent opacity-0"
        style={{
          filter: "blur(60px)",
          boxShadow: "0 0 150px 80px rgba(0, 0, 0, 0.9)",
          transform: "translateY(-40%)",
        }}
      />
    </div>
  );
};

export default SkillsShadow;
