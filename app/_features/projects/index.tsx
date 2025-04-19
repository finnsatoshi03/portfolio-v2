import React from "react";
import { GeneralCard } from "@/app/_components/GeneralCard";

import { ProjectCard } from "./_components/ProjectCard";
import { DevSkills } from "./_components/DevSkills";
import { CollaborativeCoding } from "./_components/CollaborativeCoding";

import { InfiniteLoopingMasonry } from "./_components/InfiniteLoopingMasonry";

import { CodeGlobe } from "./_components/CodeGlobal";
import { DeviceMorph } from "./_components/DeviceMorph";
import { ComponentShowcase } from "./_components/ComponentShowcase";

export default function Projects() {
  const selectedProjects = [
    {
      id: 1,
      date: "2023",
      category: "Company System",
      title: "Project 1",
      image: "",
      isLive: false,
      logo: null,
    },
    {
      id: 2,
      date: "2024",
      category: "Thesis Commission",
      title: "Project 2",
      image: "",
      isLive: false,
      logo: null,
    },
    {
      id: 3,
      date: "2025",
      category: "Educational System",
      title: "Project 3",
      image: "",
      isLive: false,
      logo: null,
    },
    {
      id: 4,
      date: "2025",
      category: "Thesis Commission",
      title: "Project 4",
      image: "",
      isLive: false,
      logo: null,
    },
  ];

  return (
    <div className="w-full space-y-2">
      <h2>Selected Projects</h2>
      <div className="flex flex-col h-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedProjects.map((project) => (
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
          className="row-span-2 lg:col-start-4 flex flex-col overflow-hidden min-h-[600px] md:min-h-full"
        >
          <InfiniteLoopingMasonry />
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
            <GeneralCard title="Integration" isTitleOnBottom></GeneralCard>
          </div>
        </GeneralCard>
      </div>
    </div>
  );
}
