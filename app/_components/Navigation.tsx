"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollSmoother } from "@/app/_hooks/useScrollSmoother";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const navItems = [
    "bio",
    "projects",
    "collaborators",
    "services",
    "archives",
    "contact",
  ];
  const [randomizedTexts, setRandomizedTexts] = useState(
    navItems.map(() => "")
  );
  const characters = "01</>{};";
  const { scrollTo } = useScrollSmoother();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    e.preventDefault();

    // Use the optimized scrollTo function which has native fallback
    const target = `#${item}`;
    scrollTo(target, true);
  };

  useEffect(() => {
    setMounted(true);

    // Simplified and faster animation
    const timeoutId = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 15; // Reduced iterations for better performance

      const interval = setInterval(() => {
        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setRandomizedTexts([...navItems]);
          return;
        }

        // Optimized randomization with better progress curve
        setRandomizedTexts(
          navItems.map((item) => {
            const progress = Math.pow(iteration / maxIterations, 1.5); // Exponential curve for smoother transition
            let result = "";

            for (let i = 0; i < item.length; i++) {
              const showCorrect = Math.random() < progress;

              if (showCorrect) {
                result += item[i];
              } else {
                result += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
            }

            return result;
          })
        );
      }, 50); // Faster iterations

      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    }, 200); // Reduced delay

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <nav
      className={`w-full transition-opacity duration-300 ${
        !mounted ? "opacity-0" : "opacity-100"
      }`}
    >
      <ul className="flex justify-between gap-x-10 items-center flex-wrap uppercase">
        {navItems.map((item, index) => (
          <li key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
            >
              <Link
                href={`/#${item}`}
                className="inline-block hover:text-gray-300 transition-colors duration-200"
                onClick={(e) => handleNavClick(e, item)}
              >
                {mounted ? randomizedTexts[index] : item}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
