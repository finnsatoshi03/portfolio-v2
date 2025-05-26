"use client";

import React from "react";
import { Globe, Palette, Layers, Users, Calendar } from "lucide-react";

interface ProjectsSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const navigationItems = [
  {
    id: "websites",
    label: "Websites",
    icon: Globe,
    description: "Web development projects",
    color: "blue",
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    icon: Layers,
    description: "User interface & experience design",
    color: "green",
  },
  {
    id: "graphics",
    label: "Graphic Designs",
    icon: Palette,
    description: "Visual design work",
    color: "purple",
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      active: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      inactive: "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10",
      indicator: "bg-blue-500",
    },
    green: {
      active: "bg-green-500/20 text-green-400 border-green-500/50",
      inactive: "text-gray-400 hover:text-green-400 hover:bg-green-500/10",
      indicator: "bg-green-500",
    },
    purple: {
      active: "bg-purple-500/20 text-purple-400 border-purple-500/50",
      inactive: "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10",
      indicator: "bg-purple-500",
    },
  };

  return colors[color as keyof typeof colors] || colors.blue;
};

export const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="fixed left-0 top-0 w-80 h-screen border-r border-gray-700/30 bg-black/95 backdrop-blur-sm p-6 z-10">
      {/* Header */}
      <div className="mb-8 pt-20">
        <h3 className="text-lg font-semibold mb-2">Portfolio Navigation</h3>
        <p className="text-sm text-gray-400">
          Explore my web development and design work
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const colorClasses = getColorClasses(item.color);

          return (
            <button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                isActive
                  ? `${colorClasses.active} border-opacity-50`
                  : `${colorClasses.inactive} border-transparent hover:border-gray-600/30`
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Active Indicator */}
                <div className="relative">
                  <Icon className="size-5 mt-0.5" />
                  {isActive && (
                    <div
                      className={`absolute -left-1 top-0 w-1 h-5 ${colorClasses.indicator} rounded-full`}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{item.label}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700/30">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="size-4 text-gray-500" />
            <span className="text-gray-400">3 Core Disciplines</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Users className="size-4 text-gray-500" />
            <span className="text-gray-400">Continuous Scrolling</span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="text-xs text-gray-500 mb-2">Scroll Progress</div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 transition-all duration-300"
            style={{
              width: `${
                (navigationItems.findIndex(
                  (item) => item.id === activeSection
                ) +
                  1) *
                (100 / navigationItems.length)
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
