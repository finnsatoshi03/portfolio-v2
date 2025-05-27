"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ScrollSmootherProviderProps {
  children: React.ReactNode;
}

export const ScrollSmootherProvider: React.FC<ScrollSmootherProviderProps> = ({
  children,
}) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smoother: ScrollSmoother | null = null;

    const initSmoother = () => {
      if (smoothWrapperRef.current && smoothContentRef.current) {
        smoother = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 1, // Balanced smoothness for good performance and UX
          effects: false, // Keep effects disabled for performance
          smoothTouch: 0.1, // Light smooth touch for mobile
          normalizeScroll: true, // Re-enable for better cross-browser compatibility
          ignoreMobileResize: true, // Keep this for performance
        });
      }
    };

    // Initialize with a small delay to ensure DOM is ready
    const timer = setTimeout(initSmoother, 50);

    return () => {
      clearTimeout(timer);
      if (smoother) {
        smoother.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef} className="min-h-screen">
      <div id="smooth-content" ref={smoothContentRef}>
        {children}
      </div>
    </div>
  );
};
