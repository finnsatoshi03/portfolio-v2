"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Calendar,
  Tag,
  Globe,
  Star,
  ImageIcon,
} from "lucide-react";
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
  liveUrl?: string | null;
};

type ArchiveItem = {
  id: number;
  title: string;
  category: string;
  year: number;
};

interface WebsitesSectionProps {
  featuredProjects: Project[];
  allProjects: Project[];
  archives: ArchiveItem[];
}

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isFeatured?: boolean;
}> = ({ project, index, isFeatured = false }) => {
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
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-sm">{project.date}</p>
          {isFeatured && (
            <Star className="size-4 text-yellow-400 fill-yellow-400" />
          )}
        </div>
        <h3 className="text-white">{project.category}</h3>
      </div>

      {/* Image container */}
      <div className="flex-1 min-h-[250px] relative overflow-hidden rounded-md">
        {project.image ? (
          <DynamicImage
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-900/50 border border-gray-700/30 rounded-md flex items-center justify-center">
            <div className="text-center space-y-3">
              <ImageIcon className="size-12 text-gray-600 mx-auto" />
              <div>
                <p className="text-gray-400 text-sm font-medium">Image Cover</p>
                <p className="text-gray-500 text-xs">Will be added soon</p>
              </div>
            </div>
          </div>
        )}

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
          {project.isLive ? (
            <div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>
          ) : (
            <div className="size-1.5 bg-gray-500 rounded-full"></div>
          )}
          <button
            onClick={handleClick}
            disabled={!project.isLive || !project.liveUrl}
            className={`text-xs mb-0.5 ${
              project.isLive && project.liveUrl
                ? "cursor-pointer transition-colors hover:text-white text-green-400"
                : "text-gray-500"
            }`}
          >
            {project.isLive ? "Live" : "Code Only"}
          </button>
        </div>
        <div>
          {project.logo ? (
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
  featuredProjects,
  allProjects,
  archives,
}) => {
  const [filterStatus, setFilterStatus] = useState<"all" | "live">("all");

  const filteredProjects = allProjects.filter((project) => {
    if (filterStatus === "live") return project.isLive;
    return true;
  });

  const liveProjectsCount = allProjects.filter((p) => p.isLive).length;

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
          <Star className="size-4 text-yellow-400" />
          <h3 className="text-lg font-medium">Featured Projects</h3>
          <span className="text-sm text-gray-500">
            ({featuredProjects.length})
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={`featured-${project.id}`}
              project={project}
              index={index}
              isFeatured={true}
            />
          ))}
        </div>
      </div>

      {/* All Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="size-4 text-gray-400" />
            <h3 className="text-lg font-medium">All Projects</h3>
            <span className="text-sm text-gray-500">
              ({allProjects.length})
            </span>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-1 bg-gray-900/50 rounded-lg p-1">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                filterStatus === "all"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("live")}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                filterStatus === "live"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Live ({liveProjectsCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`all-${project.id}`}
              project={project}
              index={index}
            />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {archives.map((archive, index) => (
            <ArchiveCard key={archive.id} archive={archive} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
