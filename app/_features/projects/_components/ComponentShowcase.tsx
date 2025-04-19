"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

export const ComponentShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize components to prevent unnecessary re-renders
  const components = useMemo(
    () => [
      {
        name: "Button",
        element: (
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary">Click Me</Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">Button Component</PopoverContent>
          </Popover>
        ),
      },
      {
        name: "Card",
        element: (
          <Card className="w-full">
            <CardHeader className="pb-2">Card Header</CardHeader>
            <CardContent>Card Content</CardContent>
          </Card>
        ),
      },
      {
        name: "Input",
        element: <Input placeholder="Type something..." className="w-full" />,
      },
    ],
    []
  );

  // Unified animation config
  const springConfig = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  };

  // Optimized interval handler
  const updateIndex = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % components.length);
  }, [components.length]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(updateIndex, 2500);
      return () => clearInterval(interval);
    }
  }, [isHovered, updateIndex]);

  return (
    <motion.div
      className="relative w-full h-full bg-background/80 rounded-xl p-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Component Stack Animation */}
      <div className="w-full h-full flex items-center justify-center">
        {components.map((component, index) => (
          <motion.div
            key={component.name}
            className="absolute will-change-transform"
            initial={{ scale: 0 }}
            animate={{
              scale: index === activeIndex ? 1 : 0,
              transition: {
                ...springConfig,
                delay: index === activeIndex ? 0 : 0.1,
              },
            }}
          >
            <div className="relative hover:scale-105 transition-transform duration-200">
              {component.element}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
