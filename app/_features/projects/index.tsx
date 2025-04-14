import React from "react";
import { GeneralCard } from "@/app/_components/GeneralCard";

import { ProjectCard } from "./_components/ProjectCard";
import { DevSkills } from "./_components/DevSkills";
import { CollaborativeCoding } from "./_components/CollaborativeCoding";

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
      </div>
    </div>
  );
}
