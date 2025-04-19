"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAnimationControl } from "@/app/_hooks/useAnimationControl";

export const DeviceMorph = ({ className }: { className?: string }) => {
  const [currentDevice, setCurrentDevice] = useState(0);
  const devices = ["desktop", "tablet", "mobile"] as const;

  // Use animation control hook
  const { isAnimating, ref } = useAnimationControl<HTMLDivElement>({
    threshold: 0.1,
    deactivationDelay: 200,
  });

  // Memoized device dimensions
  const deviceDimensions = useCallback(
    () => ({
      desktop: {
        width: "100%",
        height: "80%",
        notchSize: 0,
      },
      tablet: {
        width: "80%",
        height: "90%",
        notchSize: 32,
      },
      mobile: {
        width: "40%",
        height: "95%",
        notchSize: 24,
      },
    }),
    []
  );

  // Simplified animation config
  const springConfig = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  };

  useEffect(() => {
    // Only run animation when component is visible and window is focused
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentDevice((prev) => (prev + 1) % devices.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [devices.length, isAnimating]);

  const currentDeviceType = devices[currentDevice];
  const dimensions = deviceDimensions()[currentDeviceType];

  return (
    <div className={`relative ${className}`} ref={ref}>
      <motion.div
        className="absolute top-1/2 left-1/2 border shadow-lg"
        style={{
          x: "-50%",
          y: "-50%",
          borderRadius: 8,
          width: dimensions.width,
          height: dimensions.height,
        }}
        transition={springConfig}
        initial={false}
        animate={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        {/* Conditional Notch */}
        {currentDeviceType !== "desktop" && (
          <div
            className="absolute inset-x-0 top-2 mx-auto border"
            style={{
              width: dimensions.notchSize,
              height: dimensions.notchSize / 4,
              borderRadius: dimensions.notchSize / 8,
            }}
          />
        )}

        {/* Static Home Indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-border"
          style={{
            width: currentDeviceType === "mobile" ? "25%" : "15%",
            height: currentDeviceType === "mobile" ? 5 : 4,
            borderRadius: 2,
          }}
        />
      </motion.div>
    </div>
  );
};
