"use client";

import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const playfairDisplay = Playfair_Display({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
});

export function Header() {
  const [mounted, setMounted] = useState(false);
  const firstPart = "Everyday artisan";
  const secondPart = "of frontend";

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const secondContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        // Calculate delay based on firstPart length to ensure continuity
        delayChildren: 0.1 + firstPart.length * 0.04 + 0.3, // base delay + first part + gap
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.4,
      },
    },
  };

  return (
    <h1
      className={`text-center leading-[1.2] text-[clamp(2rem,8vw,15rem)] md:leading-[1] overflow-hidden transition-opacity duration-300 ${
        !mounted ? "opacity-0" : "opacity-100"
      }`}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className={`inline-block ${!mounted ? "opacity-0" : "opacity-100"}`}
      >
        {firstPart.split("").map((char, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        <motion.span className="inline-block">&nbsp;</motion.span>
      </motion.span>

      <motion.span
        variants={secondContainer}
        initial="hidden"
        animate="visible"
        className={`${playfairDisplay.className} italic inline-block ${
          !mounted ? "opacity-0" : "opacity-100"
        }`}
      >
        {secondPart.split("").map((char, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}
