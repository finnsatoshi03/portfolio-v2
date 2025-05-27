"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Figma, Palette } from "lucide-react";
import Image from "next/image";

type StackedImage = {
  id: number;
  src: string;
  alt: string;
};

interface UIUXSectionProps {
  designs: StackedImage[];
}

const UIUXCard: React.FC<{ design: StackedImage; index: number }> = ({
  design,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900/30 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
    >
      {design.src ? (
        <Image
          src={design.src}
          alt={design.alt}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <Layers className="size-8 text-gray-600 mx-auto" />
            <p className="text-gray-500 text-sm">Coming Soon</p>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </motion.div>
  );
};

export const UIUXSection: React.FC<UIUXSectionProps> = ({ designs }) => {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-gray-400 max-w-2xl mx-auto">
          Crafting intuitive and engaging user experiences through thoughtful
          design. From wireframes to high-fidelity prototypes, I create
          interfaces that users love to interact with.
        </p>
      </div>

      {/* Featured UI/UX Work */}
      {designs.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Figma className="size-4 text-gray-400" />
            <h3 className="text-lg font-medium">Featured UI/UX Work</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design, index) => (
              <UIUXCard key={design.id} design={design} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Skills & Tools */}
      <div className="bg-gray-900/30 rounded-lg border border-gray-700/30 p-6">
        <h3 className="text-lg font-medium mb-4">
          UI/UX Design Skills & Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "User Research",
            "Figma",
            "Consistent Design",
            "User Testing",
            "Information Architecture",
            "Interaction Design",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-3 text-center"
            >
              <p className="text-sm text-gray-300">{skill}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design Process */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            icon: Layers,
            title: "Research",
            description: "Understanding user needs and business goals",
          },
          {
            icon: Palette,
            title: "Design",
            description: "Creating wireframes and visual designs",
          },
          {
            icon: Figma,
            title: "Prototype",
            description: "Building interactive prototypes for testing",
          },
          {
            icon: Layers,
            title: "Iterate",
            description: "Refining based on feedback and testing",
          },
        ].map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center space-y-3"
            >
              <div className="size-12 mx-auto rounded-full bg-gray-800/50 flex items-center justify-center">
                <Icon className="size-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
