"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useScrollSmoother = () => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    // Get the ScrollSmoother instance
    const smootherInstance = ScrollSmoother.get();
    setSmoother(smootherInstance || null);
  }, []);

  const scrollTo = (target: string | number | Element, smooth?: boolean) => {
    if (smoother) {
      smoother.scrollTo(target, smooth !== false);
    }
  };

  const scrollToTop = (smooth?: boolean) => {
    if (smoother) {
      smoother.scrollTo(0, smooth !== false);
    }
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
