import React from "react";
import { ProjectCard } from "./_components/ProjectCard";

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
      <div className="grid grid-cols-4 gap-4">
        {selectedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
