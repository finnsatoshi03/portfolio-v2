import { Globe } from "lucide-react";
import React from "react";
import { DynamicImage } from "../../../_components/DynamicImage";
import Image from "next/image";

type Project = {
  id: number;
  date: string;
  category: string;
  title: string;
  image?: string;
  isLive: boolean;
  logo: string | null;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-gray-700/30 p-2 md:p-4 flex flex-col h-full space-y-2">
      <div>
        <p className="text-white/50 text-sm">{project.date}</p>
        <h3 className="">{project.category}</h3>
      </div>
      <div className="flex-1 min-h-[250px]">
        <DynamicImage
          src={project.image}
          alt={project.title}
          className="h-full"
        />
      </div>
      <h2 className="text-center text-white/70 text-sm">{project.title}</h2>
      <div className="flex items-center justify-between mt-auto">
        <p className="text-xs">{project.isLive ? "Live" : "Code only"}</p>
        <div>
          {project.isLive ? (
            <Image
              src={project.logo ?? ""}
              alt={`${project.title} logo`}
              height={16}
              width={16}
            />
          ) : (
            <Globe className="size-4" />
          )}
        </div>
      </div>
    </div>
  );
}
