"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export const PerformanceWave = () => {
  const columns = 5;
  const rows = 3;

  // Memoize gradient pattern calculations
  const arrows = useMemo(() => {
    return Array.from({ length: columns * rows }).map((_, i) => ({
      id: `arrow-${i}`,
      x: (i % columns) * (100 / (columns - 1)),
      y: (Math.floor(i / columns) % rows) * (100 / (rows - 1)),
      delay: Math.random() * 1.5,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {arrows.map((arrow) => (
        <motion.div
          key={arrow.id}
          className="absolute"
          style={{
            left: `${arrow.x}%`,
            top: `${arrow.y}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.5 + arrow.delay,
            repeat: Infinity,
            ease: "linear",
            delay: arrow.delay,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform"
            style={{
              rotate: arrow.direction > 0 ? "0deg" : "45deg",
            }}
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </motion.div>
      ))}

      {/* Core Metrics Indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 text-center">
          <motion.div
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            +∞%
          </motion.div>
          <p className="text-muted-foreground/80 text-sm mt-2">
            Performance Boost
          </p>
        </div>
      </div>
    </div>
  );
};
