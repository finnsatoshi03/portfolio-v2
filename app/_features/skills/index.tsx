"use client";

import { useState } from "react";
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

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className={`${vanchrome.className} text-center cursor-pointer uppercase text-[clamp(3rem,8vw,9.75rem)] tracking-[-0.05em] leading-[0.8] relative z-10`}
      >
        <ul className="relative">
          {skills.map((skill, index) => (
            <motion.li
              key={skill}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Skill text with hover effects */}
              <motion.div
                className={`relative z-10 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-70"
                    : ""
                }`}
                animate={{
                  opacity: hoveredIndex === index ? 0.5 : 1,
                  scale: hoveredIndex === index ? 0.95 : 1,
                  filter: hoveredIndex === index ? "blur(2px)" : "blur(0px)",
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.19, 1, 0.22, 1],
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
                            duration: 8, // Faster animation (reduced from 12)
                            ease: "linear",
                          },
                        }}
                      >
                        {[...Array(30)].map((_, i) => (
                          <span key={i}>
                            {scrollTexts[skill as keyof typeof scrollTexts]}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
