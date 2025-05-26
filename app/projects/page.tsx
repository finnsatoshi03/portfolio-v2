"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SELECTED_PROJECTS } from "@/app/_lib/_const/projects";
import { ProjectsSidebar } from "./_components/ProjectsSidebar";
import { ProjectsShowcase } from "./_components/ProjectsShowcase";

type FilterState = {
  category: string;
  year: string;
  status: string;
};

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    year: "All",
    status: "All",
  });

  const filteredProjects = useMemo(() => {
    return SELECTED_PROJECTS.filter((project) => {
      const categoryMatch =
        filters.category === "All" || project.category === filters.category;
      const yearMatch = filters.year === "All" || project.date === filters.year;
      const statusMatch =
        filters.status === "All" ||
        (filters.status === "Live" && project.isLive) ||
        (filters.status === "Code Only" && !project.isLive);

      return categoryMatch && yearMatch && statusMatch;
    });
  }, [filters]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700/30 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-gray-700/50" />
            <div>
              <h1 className="text-xl md:text-2xl font-medium">All Projects</h1>
              <p className="text-sm text-gray-400 mt-1">
                {filteredProjects.length} of {SELECTED_PROJECTS.length} projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-7rem)]">
        {/* Sidebar */}
        <ProjectsSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalProjects={SELECTED_PROJECTS.length}
          filteredCount={filteredProjects.length}
        />

        {/* Showcase */}
        <ProjectsShowcase projects={filteredProjects} />
      </div>
    </div>
  );
}
