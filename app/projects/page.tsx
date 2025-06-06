"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";

import { useIsMobile } from "@/app/_hooks/use-mobile";
import { SELECTED_PROJECTS, PROJECTS } from "@/app/_lib/_const/projects";
import { ARCHIVES_DATA } from "@/app/_lib/_const/archives";
import { GRAPHIC_DESIGN_IMAGES, UI_UX_IMAGES } from "@/app/_lib/_const/designs";

import { ProjectsSidebar } from "./_components/ProjectsSidebar";
import { ProjectsSection } from "./_components/ProjectsSection";
import { GraphicDesignsSection } from "./_components/GraphicDesignsSection";
import { UIUXSection } from "./_components/UIUXSection";

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState<string>("systems");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Calculate dynamic counts
  const systemsCount =
    SELECTED_PROJECTS.length + PROJECTS.length + ARCHIVES_DATA.length;
  const uiuxCount = UI_UX_IMAGES.length;
  const graphicsCount = GRAPHIC_DESIGN_IMAGES.length;

  // handlers
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Auto-close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);

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

  const handleSectionClick = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);

        // Update URL without triggering navigation
        window.history.replaceState(null, "", `#${sectionId}`);
      }
      // Close sidebar on mobile when section is clicked
      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [isMobile]
  );

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("projects-sidebar");
      const target = event.target as Node;

      if (sidebarOpen && sidebar && !sidebar.contains(target) && isMobile) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, isMobile]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  console.log(isMobile, sidebarOpen);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Header */}
      <div
        className={`fixed top-0 right-0 border-b border-gray-700/30 p-4 md:p-6 bg-black/95 backdrop-blur-sm z-30 transition-all duration-300 ${
          isMobile ? "left-0" : "left-80"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={handleToggleSidebar}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            )}

            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-gray-700/50 hidden sm:block" />
            <div className="hidden sm:block">
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
        isOpen={sidebarOpen}
        isMobile={isMobile}
        systemsCount={systemsCount}
        uiuxCount={uiuxCount}
        graphicsCount={graphicsCount}
      />

      {/* Main Content */}
      <div
        className={`pt-20 md:pt-24 transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-80"
        }`}
      >
        {/* Websites Section */}
        <section id="systems" className="min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-6 md:h-8 bg-blue-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Systems
                </h2>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-6 md:mb-8" />
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
          <div className="p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-6 md:h-8 bg-green-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  UI/UX Design
                </h2>
              </div>
              <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent mb-6 md:mb-8" />
            </div>
            <UIUXSection designs={UI_UX_IMAGES} />
          </div>
        </section>

        {/* Graphic Designs Section */}
        <section id="graphics" className="min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-6 md:h-8 bg-purple-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Graphic Designs
                </h2>
              </div>
              <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent mb-6 md:mb-8" />
            </div>
            <GraphicDesignsSection designs={GRAPHIC_DESIGN_IMAGES} />
          </div>
        </section>
      </div>
    </div>
  );
}
