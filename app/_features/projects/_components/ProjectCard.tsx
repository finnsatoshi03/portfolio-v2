"use client";

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
  liveUrl?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const handleLiveClick = (): void => {
    if (project.isLive && project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="rounded-lg border border-gray-700/30 p-2 md:p-4 flex flex-col h-full space-y-2">
      <div>
        <p className="text-white/50 text-sm">{project.date}</p>
        <h3 className="">{project.category}</h3>
      </div>
      <div className="flex-1 flex flex-col min-h-[250px]">
        <DynamicImage
          src={project.image}
          alt={project.title}
          className="flex-1 min-h-[250px]"
        />
      </div>
      <h2 className="text-center text-white/70 text-sm">{project.title}</h2>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          {project.isLive && (
            <div className="size-1.5 bg-red-500 rounded-full animate-pulse"></div>
          )}
          <button
            onClick={handleLiveClick}
            disabled={!project.isLive || !project.liveUrl}
            className={`text-xs mb-0.5 ${
              project.isLive && project.liveUrl
                ? " cursor-pointer transition-colors"
                : "text-white/50"
            }`}
          >
            {project.isLive ? "Live" : "Code only"}
          </button>
        </div>
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
