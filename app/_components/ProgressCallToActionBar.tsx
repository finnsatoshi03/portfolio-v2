"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { useScrollSmoother } from "@/app/_hooks/useScrollSmoother";

export const ProgressCallToActionBar = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const texts = ["I'M", "CURRENTLY", "LOOKING", "FOR", "CLIENTS"];
  const { scrollTo } = useScrollSmoother();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("#contact", true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize hidden state - start from below the visible area
    gsap.set(ctaRef.current, { y: "100%", opacity: 0 });

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

              gsap.to(progressRefs.current[index], {
                width: `${progress * 100}%`,
                backgroundColor: progress >= 1 ? "transparent" : "#fff",
                overwrite: true,
                duration: 0,
              });

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

    const animateCTA = (action: "show" | "hide") => {
      gsap.to(ctaRef.current, {
        y: action === "show" ? 0 : "100%",
        opacity: action === "show" ? 1 : 0,
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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-0 z-50 pointer-events-none mb-4"
    >
      <div className="p-1 bg-border rounded flex text-[10px] md:text-xs items-center justify-center gap-1 min-w-[300px] md:min-w-[450px]">
        {texts.map((text, index) => (
          <div
            key={text}
            ref={(el) => {
              containerRefs.current[index] = el;
              return undefined;
            }}
            className="relative rounded md:px-4 px-1 py-0.5 md:py-2 overflow-hidden group transition-colors"
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
          onClick={handleContactClick}
          className="md:px-4 px-1 py-0.5 md:py-2 bg-white text-black rounded hover:bg-white/60 cursor-pointer pointer-events-auto transition-colors duration-200"
        >
          CONTACT ME
        </Link>
      </div>
    </div>
  );
};
