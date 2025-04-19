"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseAnimationControlOptions {
  /**
   * Whether to check if the element is visible in the viewport
   * @default true
   */
  checkVisibility?: boolean;

  /**
   * Whether to check if the window is focused
   * @default true
   */
  checkWindowFocus?: boolean;

  /**
   * Root margin for Intersection Observer
   * @default "0px"
   */
  rootMargin?: string;

  /**
   * Threshold for Intersection Observer (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * Delay in ms before considering animation should be active after conditions are met
   * @default 0
   */
  activationDelay?: number;

  /**
   * Delay in ms before considering animation should be paused after conditions are not met
   * @default 0
   */
  deactivationDelay?: number;
}

/**
 * Hook to control animations based on element visibility and window focus
 * @returns An object containing isAnimating and ref to attach to the component
 */
export function useAnimationControl<T extends HTMLElement = HTMLDivElement>({
  checkVisibility = true,
  checkWindowFocus = true,
  rootMargin = "0px",
  threshold = 0.1,
  activationDelay = 0,
  deactivationDelay = 0,
}: UseAnimationControlOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<T | null>(null);
  const activationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const deactivationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle visibility change using Intersection Observer
  useEffect(() => {
    if (!checkVisibility) {
      setIsVisible(true);
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [checkVisibility, rootMargin, threshold]);

  // Handle window focus change
  useEffect(() => {
    if (!checkWindowFocus) {
      setIsWindowFocused(true);
      return;
    }

    const handleVisibilityChange = () => {
      setIsWindowFocused(!document.hidden);
    };

    const handleFocus = () => {
      setIsWindowFocused(true);
    };

    const handleBlur = () => {
      setIsWindowFocused(false);
    };

    // Initialize with current state
    setIsWindowFocused(!document.hidden);

    // Listen for visibility and focus events
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [checkWindowFocus]);

  // Update animation state with delays
  useEffect(() => {
    const shouldAnimate = isVisible && isWindowFocused;

    // Clear any existing timers
    if (activationTimerRef.current) {
      clearTimeout(activationTimerRef.current);
      activationTimerRef.current = null;
    }

    if (deactivationTimerRef.current) {
      clearTimeout(deactivationTimerRef.current);
      deactivationTimerRef.current = null;
    }

    if (shouldAnimate) {
      if (activationDelay > 0) {
        activationTimerRef.current = setTimeout(() => {
          setIsAnimating(true);
        }, activationDelay);
      } else {
        setIsAnimating(true);
      }
    } else {
      if (deactivationDelay > 0) {
        deactivationTimerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, deactivationDelay);
      } else {
        setIsAnimating(false);
      }
    }

    return () => {
      if (activationTimerRef.current) {
        clearTimeout(activationTimerRef.current);
      }
      if (deactivationTimerRef.current) {
        clearTimeout(deactivationTimerRef.current);
      }
    };
  }, [isVisible, isWindowFocused, activationDelay, deactivationDelay]);

  return {
    isAnimating,
    ref: elementRef as RefObject<T>,
    isVisible,
    isWindowFocused,
  };
}
