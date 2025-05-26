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
        scale: 0.4,
        filter: "blur(40px)",
        y: -150,
      },
      {
        opacity: 0.7,
        scale: 0.9,
        filter: "blur(30px)",
        y: -30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "bottom-=150 bottom-=100",
          end: "center center",
          toggleActions: "play reverse play reverse",
          scrub: 2,
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
        className="w-[80%] h-[80%] rounded-full bg-gradient-to-b from-black via-black/70 to-transparent opacity-0"
        style={{
          filter: "blur(30px)",
          boxShadow: "0 0 100px 50px rgba(0, 0, 0, 0.7)",
          transform: "translateY(-30%)",
        }}
      />
    </div>
  );
};

export default SkillsShadow;
