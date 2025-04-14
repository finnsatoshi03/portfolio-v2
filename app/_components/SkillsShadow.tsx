"use client";

import { cn } from "../_lib/utils";

interface SkillsShadowProps {
  className?: string;
}

const SkillsShadow = ({ className = "" }: SkillsShadowProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <div
        className="w-[80%] h-[80%] rounded-full bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        style={{
          filter: "blur(40px)",
          boxShadow: "0 0 100px 50px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
};

export default SkillsShadow;
