"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Github, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Collaborator } from "@/app/_lib/_const/collaborators";

interface CollaboratorCardProps {
  collaborator: Collaborator;
}

export const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  collaborator,
}) => {
  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm p-6 flex flex-col h-full hover:border-gray-700/50 hover:from-gray-900/60 hover:to-gray-900/40 transition-all duration-300"
    >
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {collaborator.status === "coming-soon" ? (
            <>
              <div className="size-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-yellow-400 font-medium">
                Coming Soon
              </span>
            </>
          ) : (
            <>
              <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Active</span>
            </>
          )}
        </div>

        {/* Social Links - Top Right */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {collaborator.github && (
            <button
              onClick={() => handleSocialClick(collaborator.github!)}
              className="p-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 transition-colors duration-200"
              aria-label={`${collaborator.name}'s GitHub`}
            >
              <Github className="size-3 text-gray-300" />
            </button>
          )}
          {collaborator.linkedin && (
            <button
              onClick={() => handleSocialClick(collaborator.linkedin!)}
              className="p-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 transition-colors duration-200"
              aria-label={`${collaborator.name}'s LinkedIn`}
            >
              <Linkedin className="size-3 text-gray-300" />
            </button>
          )}
          {collaborator.portfolio && (
            <button
              onClick={() => handleSocialClick(collaborator.portfolio!)}
              className="p-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 transition-colors duration-200"
              aria-label={`${collaborator.name}'s Portfolio`}
            >
              <ExternalLink className="size-3 text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Image - Rectangular */}
      <div className="mb-4">
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-800/30">
          {collaborator.image ? (
            <Image
              src={collaborator.image}
              alt={collaborator.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
              <User className="size-12 text-gray-600" />
            </div>
          )}
        </div>
      </div>

      {/* Name and Role */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-base mb-1">
          {collaborator.name}
        </h3>
        <p className="text-gray-400 text-sm">{collaborator.role}</p>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {collaborator.specialization.map((spec, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20 font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {collaborator.skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-800/40 text-gray-300 text-xs rounded-md border border-gray-700/30"
            >
              {skill}
            </span>
          ))}
          {collaborator.skills.length > 6 && (
            <span className="px-2 py-0.5 bg-gray-800/20 text-gray-500 text-xs rounded-md border border-gray-700/20">
              +{collaborator.skills.length - 6}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
