"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useScrollSmoother = () => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    // Get the ScrollSmoother instance with retry logic
    let retryCount = 0;
    const maxRetries = 10;

    const getSmoother = () => {
      const smootherInstance = ScrollSmoother.get();
      if (smootherInstance) {
        setSmoother(smootherInstance);
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(getSmoother, 100);
      }
    };

    getSmoother();
  }, []);

  const scrollTo = (target: string | number | Element, smooth?: boolean) => {
    // Prioritize ScrollSmoother if available
    if (smoother) {
      try {
        smoother.scrollTo(target, smooth !== false);
        return;
      } catch {
        // Fall through to native scrolling if ScrollSmoother fails
      }
    }

    // Fallback to native scrolling for better performance
    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: smooth !== false ? "smooth" : "auto",
          block: "start",
          inline: "nearest",
        });
        return;
      }
    }

    // Final fallback for numeric targets
    if (typeof target === "number") {
      window.scrollTo({
        top: target,
        behavior: smooth !== false ? "smooth" : "auto",
      });
    }
  };

  const scrollToTop = (smooth?: boolean) => {
    // Prioritize ScrollSmoother if available
    if (smoother) {
      try {
        smoother.scrollTo(0, smooth !== false);
        return;
      } catch {
        // Fall through to native scrolling if ScrollSmoother fails
      }
    }

    // Use native scrolling as fallback
    window.scrollTo({
      top: 0,
      behavior: smooth !== false ? "smooth" : "auto",
    });
  };

  const refresh = () => {
    if (smoother) {
      smoother.refresh();
    }
  };

  const paused = (value?: boolean) => {
    if (smoother) {
      if (value !== undefined) {
        smoother.paused(value);
      }
      return smoother.paused();
    }
    return false;
  };

  return {
    smoother,
    scrollTo,
    scrollToTop,
    refresh,
    paused,
  };
};
