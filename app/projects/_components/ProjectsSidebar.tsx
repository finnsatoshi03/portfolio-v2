"use client";

import React from "react";
import {
  Globe,
  Palette,
  Layers,
  Calendar,
  Code2,
  Briefcase,
  MapPin,
  Coffee,
  Clock,
  Target,
  ExternalLink,
} from "lucide-react";

interface ProjectsSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const navigationItems = [
  {
    id: "websites",
    label: "Websites",
    icon: Globe,
    description: "Full-stack web applications",
    color: "blue",
    count: 9,
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    icon: Layers,
    description: "User interface & experience design",
    color: "green",
    count: 4,
  },
  {
    id: "graphics",
    label: "Graphic Designs",
    icon: Palette,
    description: "Visual design & branding",
    color: "purple",
    count: 3,
  },
];

const stats = [
  { label: "Total Projects", value: "9", icon: ExternalLink },
  { label: "Years Active", value: "3+", icon: Calendar },
  { label: "Tech Stack", value: "15+", icon: Code2 },
  { label: "Coffee Consumed", value: "∞", icon: Coffee },
];

const recentWork = [
  { name: "Veripay HRIS", status: "Live", color: "green" },
  { name: "EduQuest System", status: "Live", color: "green" },
  { name: "RMS Avisha", status: "Live", color: "green" },
  { name: "E-Habi System", status: "Live", color: "green" },
  { name: "Autobox System", status: "Live", color: "green" },
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
    <div className="fixed left-0 top-0 w-80 h-screen border-r border-gray-700/30 bg-black/95 backdrop-blur-sm overflow-y-auto z-10">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-12 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-white">Portfolio</h3>
              <p className="text-sm text-gray-400 mt-1">
                Web Development & Design Showcase
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <MapPin className="size-3 text-gray-500" />
                <span className="text-xs text-gray-500">Philippines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className="size-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{stat.label}</span>
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Navigation Items */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Target className="size-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-300">Sections</h4>
          </div>
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      {/* Active Indicator */}
                      <Icon className="size-5 mt-0.5" />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{item.label}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                      {item.count}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Recent Work */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="size-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-300">Recent Work</h4>
          </div>
          <div className="space-y-2">
            {recentWork.map((work, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-900/30"
              >
                <span className="text-sm text-gray-300">{work.name}</span>
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      work.color === "green" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500">{work.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-900/30 border border-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="size-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              Available for Work
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Open to freelance projects and full-time opportunities
          </p>
        </div>

        {/* Progress Indicator */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Scroll Progress</span>
            <span className="text-xs text-gray-500">
              {Math.round(
                ((navigationItems.findIndex(
                  (item) => item.id === activeSection
                ) +
                  1) /
                  navigationItems.length) *
                  100
              )}
              %
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 transition-all duration-300 rounded-full"
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
    </div>
  );
};
