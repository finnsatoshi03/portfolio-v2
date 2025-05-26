"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Globe } from "lucide-react";
import Image from "next/image";
import { DynamicImage } from "@/app/_components/DynamicImage";

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

interface ProjectsShowcaseProps {
  projects: Project[];
}

const ProjectShowcaseCard: React.FC<{ project: Project }> = ({ project }) => {
  const handleLiveClick = (): void => {
    if (project.isLive && project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-gray-700/30 p-2 md:p-4 flex flex-col h-full space-y-2"
    >
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
    </motion.div>
  );
};

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects,
}) => {
  return (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
      {projects.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-3">
            <div className="size-16 mx-auto rounded-full bg-gray-800/50 flex items-center justify-center">
              <Tag className="size-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-300">
                No projects found
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your filters to see more projects
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <ProjectShowcaseCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer Stats */}
          <div className="mt-8 pt-6 border-t border-gray-700/30">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Showing {projects.length} projects</span>
              <div className="flex items-center space-x-4">
                <span>{projects.filter((p) => p.isLive).length} live</span>
                <span>
                  {projects.filter((p) => !p.isLive).length} code-only
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
