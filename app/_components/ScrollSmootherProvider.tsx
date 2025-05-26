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
          smooth: 1.2, // Smoothness level (0-3, higher = smoother)
          effects: true, // Enable data-speed effects
          smoothTouch: 0.1, // Smooth scrolling on touch devices (0-1)
          normalizeScroll: true, // Normalize scroll behavior across browsers
        });
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initSmoother, 100);

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
