"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";

export const ProgressCallToActionBar = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const texts = ["I'M", "CURRENTLY", "LOOKING", "FOR", "CLIENTS"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupScrollTrigger = () => {
      const bioSection = document.getElementById("bio");
      const contactSection = document.getElementById("contact");

      if (bioSection && contactSection && ctaRef.current) {
        ScrollTrigger.create({
          trigger: bioSection,
          start: "bottom center",
          endTrigger: contactSection,
          end: "top center",
          onUpdate: (self) => {
            const totalProgress = self.progress;
            const activeIndex = Math.floor(totalProgress / 0.2);

            texts.forEach((_, index) => {
              const segmentStart = index * 0.2;
              const progress = Math.min(
                Math.max((totalProgress - segmentStart) / 0.2, 0),
                1
              );

              // Progress bar animation
              gsap.to(progressRefs.current[index], {
                width: `${progress * 100}%`,
                backgroundColor: progress >= 1 ? "transparent" : "#fff",
                overwrite: true,
                duration: 0,
              });

              // Border animation - only apply border to the active item
              gsap.to(containerRefs.current[index], {
                borderColor:
                  index === activeIndex && progress < 1
                    ? "#fff"
                    : "transparent",
                overwrite: true,
                duration: 0.2,
              });
            });
          },
          onEnter: () => animateCTA("show"),
          onLeave: () => animateCTA("hide"),
          onEnterBack: () => animateCTA("show"),
          onLeaveBack: () => animateCTA("hide"),
        });
      }
    };

    const animateCTA = (y: "show" | "hide") => {
      gsap.to(ctaRef.current, {
        y: y === "show" ? 0 : 100,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    setupScrollTrigger();
    window.addEventListener("resize", setupScrollTrigger);
    return () => {
      window.removeEventListener("resize", setupScrollTrigger);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={ctaRef}
      className="fixed bottom-[5%] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="p-1 bg-border rounded flex text-xs items-center justify-center gap-1">
        {texts.map((text, index) => (
          <div
            key={text}
            ref={(el) => {
              containerRefs.current[index] = el;
              return undefined;
            }}
            className="relative rounded px-4 py-2 overflow-hidden group transition-colors"
            style={{ border: "1px solid transparent" }}
          >
            <div
              ref={(el) => {
                progressRefs.current[index] = el;
                return undefined;
              }}
              className="absolute top-0 left-0 h-full origin-left pointer-events-none"
              style={{ width: "0%", backgroundColor: "#fff" }}
            />
            <span className="relative z-10 mix-blend-exclusion">{text}</span>
          </div>
        ))}
        <Link
          href="/#contact"
          className="px-4 py-2 bg-white text-black rounded hover:bg-white/60 cursor-pointer pointer-events-auto transition-colors"
        >
          CONTACT ME
        </Link>
      </div>
    </div>
  );
};
