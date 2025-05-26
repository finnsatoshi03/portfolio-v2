"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Tag, Globe } from "lucide-react";
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

type ArchiveItem = {
  id: number;
  title: string;
  category: string;
  year: number;
};

interface WebsitesSectionProps {
  projects: Project[];
  archives: ArchiveItem[];
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const handleClick = () => {
    if (project.isLive && project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-lg border border-gray-700/30 p-2 md:p-4 flex flex-col h-full space-y-2 hover:border-gray-600/50 transition-all duration-300"
    >
      {/* Header with date and category */}
      <div>
        <p className="text-white/50 text-sm">{project.date}</p>
        <h3 className="text-white">{project.category}</h3>
      </div>

      {/* Image container */}
      <div className="flex-1 min-h-[250px] relative overflow-hidden rounded-md">
        <DynamicImage
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        {/* Hover overlay with external link */}
        {project.isLive && project.liveUrl && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleClick}
              className="bg-white/90 text-black p-2 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <ExternalLink className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-center text-white/70 text-sm">{project.title}</h2>

      {/* Footer with status and logo */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          {project.isLive && (
            <div className="size-1.5 bg-red-500 rounded-full animate-pulse"></div>
          )}
          <button
            onClick={handleClick}
            disabled={!project.isLive || !project.liveUrl}
            className={`text-xs mb-0.5 ${
              project.isLive && project.liveUrl
                ? "cursor-pointer transition-colors hover:text-white"
                : "text-white/50"
            }`}
          >
            {project.isLive ? "Live" : "Code only"}
          </button>
        </div>
        <div>
          {project.isLive && project.logo ? (
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              height={16}
              width={16}
              className="rounded"
            />
          ) : (
            <Globe className="size-4 text-gray-400" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ArchiveCard: React.FC<{ archive: ArchiveItem; index: number }> = ({
  archive,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
      className="group bg-gray-900/20 rounded-lg border border-gray-700/20 p-4 hover:border-gray-600/30 transition-all duration-300"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">{archive.year}</span>
          <Tag className="size-3 text-gray-600" />
        </div>
        <div>
          <h3 className="text-white font-medium text-sm">{archive.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{archive.category}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const WebsitesSection: React.FC<WebsitesSectionProps> = ({
  projects,
  archives,
}) => {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform your vision into seamless, responsive websites. I create
          visually engaging, user-friendly websites that are designed to
          captivate and convert.
        </p>
      </div>

      {/* Featured Projects */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="size-4 text-gray-400" />
          <h3 className="text-lg font-medium">Featured Projects</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Archives */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Tag className="size-4 text-gray-400" />
          <h3 className="text-lg font-medium">Archive Projects</h3>
          <span className="text-sm text-gray-500">({archives.length})</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {archives.map((archive, index) => (
            <ArchiveCard key={archive.id} archive={archive} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
