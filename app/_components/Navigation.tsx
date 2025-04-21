"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const navItems = ["bio", "projects", "archives", "contact"];
  const [randomizedTexts, setRandomizedTexts] = useState(
    navItems.map(() => "")
  );
  const characters = "01</>{};";

  useEffect(() => {
    setMounted(true);

    // Start animation after a small delay
    const timeoutId = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 20; // Increased from 10 to 20 iterations

      // Create random text effect
      const interval = setInterval(() => {
        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          // Set final text after randomization
          setRandomizedTexts([...navItems]);
          return;
        }

        // Create random texts
        setRandomizedTexts(
          navItems.map((item) => {
            // Make progress slower by reducing this value
            const progress = (iteration / maxIterations) * 0.5; // Slowed down by multiplying by 0.8
            let result = "";

            for (let i = 0; i < item.length; i++) {
              // Decrease chance to show correct character to extend the random phase
              const showCorrect = Math.random() < progress;

              if (showCorrect) {
                result += item[i];
              } else {
                // Random character
                result += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
            }

            return result;
          })
        );
      }, 60); // Increased from 60ms to 100ms for slower iterations

      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    }, 300); // Increased delay before starting

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <nav
      className={`w-full transition-opacity duration-500 ${
        !mounted ? "opacity-0" : "opacity-100"
      }`}
    >
      <ul className="flex justify-between items-center uppercase">
        {navItems.map((item, index) => (
          <li key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 * index }}
            >
              <Link href={`/#${item}`} className="inline-block">
                {mounted ? randomizedTexts[index] : item}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
