"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/app/_lib/utils";
import { motion } from "framer-motion";

import profileImage from "@/public/profile.jpg";
import { ArrowDownRight } from "lucide-react";

interface BioProps {
  className?: string;
}

export default function Bio({ className }: BioProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.4,
        delay: 0.6, // Delay after header and navigation animations
      },
    },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
        delay: 0.8, // Slightly delayed after text animation
      },
    },
  };

  const iconAnimation = {
    hidden: { opacity: 0, rotate: -45, x: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.6,
        delay: 0.7,
      },
    },
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 w-full h-full transition-opacity duration-300",
        className,
        !mounted ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="self-end lg:mb-8">
        <motion.div variants={iconAnimation} initial="hidden" animate="visible">
          <ArrowDownRight className="size-14 -ml-4" strokeWidth={1} />
        </motion.div>
        <motion.p
          className="text-sm lg:text-lg"
          variants={textAnimation}
          initial="hidden"
          animate="visible"
        >
          I&apos;m a frontend developer passionate about crafting seamless,
          user-friendly experiences. Since 2023, I&apos;ve honed my skills in
          clean UI design, responsive layouts, and performance optimization
          while staying up to date with modern frameworks and best practices.
        </motion.p>
      </div>
      <motion.div
        className="relative h-full -mr-[3rem] sm:-mr-[clamp(2rem,8vw,3rem)]"
        variants={imageAnimation}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={profileImage}
          alt="profile"
          className="object-cover object-top"
          fill
          priority
        />
      </motion.div>
    </div>
  );
}
