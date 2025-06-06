"use client";

import React from "react";
import Link from "next/link";

import { SELECTED_PROJECTS } from "@/app/_lib/_const/projects";

import { GeneralCard } from "@/app/_components/GeneralCard";

import { ProjectCard } from "./_components/ProjectCard";
import { DevSkills } from "./_components/DevSkills";
import { CollaborativeCoding } from "./_components/CollaborativeCoding";

import { MorphingGrid } from "./_components/MorphingGrid";

import { CodeGlobe } from "./_components/CodeGlobal";
import { DeviceMorph } from "./_components/DeviceMorph";
import { ComponentShowcase } from "./_components/ComponentShowcase";
import { PerformanceWave } from "./_components/PerformanceWave";

export default function Projects() {
  // handlers
  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/projects";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h2>Selected Projects</h2>
        <Link
          href="/projects"
          onClick={handleViewAllClick}
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col h-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SELECTED_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <DevSkills />
        <GeneralCard
          title="Collaborate"
          description="Building seamless digital experiences through clean code, innovation, and teamwork."
        >
          <CollaborativeCoding />
        </GeneralCard>
        <GeneralCard
          title="Layout"
          description="Translating complex Figma designs into pixel-perfect, responsive layouts with precision and efficiency."
          className="row-span-2 lg:col-start-4 flex flex-col overflow-hidden min-h-[600px] max-h-[600px] md:min-h-full"
        >
          <MorphingGrid />
        </GeneralCard>

        <GeneralCard
          title="No Bloat, Just Results"
          description="Focused on building exactly what's needed—efficient, fast, and scalable."
          className="flex flex-col"
        >
          <CodeGlobe className="flex-1 min-h-[250px] aspect-square" />
        </GeneralCard>

        <GeneralCard
          title="Development Expertise"
          description="Building fast, responsive, and scalable web experiences with clean code and seamless integrations."
          className="flex flex-col col-span-2 gap-2"
        >
          <div className="grid md:grid-cols-3 flex-1 gap-4">
            <GeneralCard
              title="Responsiveness"
              isTitleOnBottom
              className="h-full "
            >
              <div className="relative w-full min-h-[250px] h-full">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "100%", height: "30%" }}
                >
                  <DeviceMorph className="w-full h-full" />
                </div>
              </div>
            </GeneralCard>
            <GeneralCard title="Components" isTitleOnBottom>
              <div className="relative w-full h-full min-h-[250px]">
                <ComponentShowcase />
              </div>
            </GeneralCard>
            <GeneralCard title="Performance" isTitleOnBottom>
              <div className="relative w-full h-full min-h-[250px]">
                <PerformanceWave />
              </div>
            </GeneralCard>
          </div>
        </GeneralCard>
      </div>
    </div>
  );
}
