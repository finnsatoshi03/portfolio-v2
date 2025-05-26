"use client";

import { useState, useMemo } from "react";
import localFont from "next/font/local";
import { Didact_Gothic } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../_lib/utils";

const vanchrome = localFont({
  src: "./../../_assets/fonts/Vanchrome Front.otf",
  weight: "900",
  style: "normal",
});

const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
});

export default function Skills({ className }: { className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills = ["Frontend Dev", "UI/UX Design", "Graphic Design"];

  // Custom scroll text for each skill
  const scrollTexts = {
    "Frontend Dev": "[VIEW PROJECTS]",
    "UI/UX Design": "[VIEW PROJECT DESIGNS]",
    "Graphic Design": "[VIEW ARTWORK]",
  };

  // Memoize the repeated scroll text array to prevent recreation on each render
  const scrollTextArray = useMemo(
    () =>
      Array(15)
        .fill(null)
        .map((_, i) => i),
    []
  );

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={`${vanchrome.className} text-center uppercase text-[clamp(3rem,8vw,9.75rem)] tracking-[-0.05em] leading-[0.8] relative z-10`}
      >
        <h2
          className={`${didactGothic.className} text-white text-base mb-8 tracking-normal leading-normal`}
        >
          I can help you with
        </h2>
        <ul className="relative">
          {skills.map((skill, index) => (
            <li key={skill} className="relative">
              {/* Skill text with hover effects */}
              <motion.div
                className="relative z-10 inline-block cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  opacity: hoveredIndex === index ? 0.6 : 1,
                  scale: hoveredIndex === index ? 0.98 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {skill}
              </motion.div>

              {/* Infinite scroll overlay with customized text */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-full whitespace-nowrap text-white text-base tracking-normal leading-normal ${didactGothic.className}`}
                    >
                      <motion.div
                        className="flex gap-8"
                        animate={{
                          x: ["-20%", "-50%"],
                        }}
                        transition={{
                          x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 6,
                            ease: "linear",
                          },
                        }}
                      >
                        {scrollTextArray.map((i) => (
                          <span key={i}>
                            {scrollTexts[skill as keyof typeof scrollTexts]}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
