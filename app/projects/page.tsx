"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SELECTED_PROJECTS, PROJECTS } from "@/app/_lib/_const/projects";
import { ARCHIVES_DATA } from "@/app/_lib/_const/archives";
import { GRAPHIC_DESIGN_IMAGES, UI_UX_IMAGES } from "@/app/_lib/_const/designs";

import { ProjectsSidebar } from "./_components/ProjectsSidebar";
import { ProjectsSection } from "./_components/ProjectsSection";
import { GraphicDesignsSection } from "./_components/GraphicDesignsSection";
import { UIUXSection } from "./_components/UIUXSection";

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState<string>("systems");

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const sections = ["systems", "uiux", "graphics"];
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Throttled scroll event listener
  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Handle URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ["systems", "uiux", "graphics"].includes(hash)) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(hash);
        }
      }, 100);
    }
  }, []);

  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);

      // Update URL without triggering navigation
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-80 right-0 border-b border-gray-700/30 p-4 md:p-6 bg-black/95 backdrop-blur-sm z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-gray-700/50" />
            <div>
              <h1 className="text-xl md:text-2xl font-medium">Portfolio</h1>
              <p className="text-sm text-gray-400 mt-1">
                App Development & Design Showcase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <ProjectsSidebar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Main Content */}
      <div className="ml-80 pt-24">
        {/* Websites Section */}
        <section id="systems" className="min-h-screen">
          <div className="p-6 md:p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold">Systems</h2>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-8" />
            </div>
            <ProjectsSection
              featuredProjects={SELECTED_PROJECTS}
              allProjects={PROJECTS}
              archives={ARCHIVES_DATA}
            />
          </div>
        </section>

        {/* UI/UX Section */}
        <section id="uiux" className="min-h-screen">
          <div className="p-6 md:p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-8 bg-green-500 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold">UI/UX Design</h2>
              </div>
              <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent mb-8" />
            </div>
            <UIUXSection designs={UI_UX_IMAGES} />
          </div>
        </section>

        {/* Graphic Designs Section */}
        <section id="graphics" className="min-h-screen">
          <div className="p-6 md:p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-8 bg-purple-500 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Graphic Designs
                </h2>
              </div>
              <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent mb-8" />
            </div>
            <GraphicDesignsSection designs={GRAPHIC_DESIGN_IMAGES} />
          </div>
        </section>
      </div>
    </div>
  );
}
