"use client";

import React from "react";
import { Filter, Calendar, Globe, Code } from "lucide-react";
import { SELECTED_PROJECTS } from "@/app/_lib/_const/projects";

type FilterState = {
  category: string;
  year: string;
  status: string;
};

interface ProjectsSidebarProps {
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  totalProjects: number;
  filteredCount: number;
}

export const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({
  filters,
  onFilterChange,
  totalProjects,
  filteredCount,
}) => {
  // Extract unique values from projects
  const categories = [
    "All",
    ...Array.from(new Set(SELECTED_PROJECTS.map((p) => p.category))),
  ];
  const years = [
    "All",
    ...Array.from(new Set(SELECTED_PROJECTS.map((p) => p.date)))
      .sort()
      .reverse(),
  ];
  const statuses = ["All", "Live", "Code Only"];

  const FilterSection = ({
    title,
    icon: Icon,
    options,
    activeValue,
    filterType,
  }: {
    title: string;
    icon: React.ElementType;
    options: string[];
    activeValue: string;
    filterType: keyof FilterState;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Icon className="size-4" />
        <span>{title}</span>
      </div>
      <div className="space-y-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(filterType, option)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
              activeValue === option
                ? "bg-white/10 text-white border border-gray-600/50"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {option}
            {option !== "All" && filterType === "category" && (
              <span className="ml-2 text-xs text-gray-500">
                ({SELECTED_PROJECTS.filter((p) => p.category === option).length}
                )
              </span>
            )}
            {option !== "All" && filterType === "year" && (
              <span className="ml-2 text-xs text-gray-500">
                ({SELECTED_PROJECTS.filter((p) => p.date === option).length})
              </span>
            )}
            {option !== "All" && filterType === "status" && (
              <span className="ml-2 text-xs text-gray-500">
                (
                {option === "Live"
                  ? SELECTED_PROJECTS.filter((p) => p.isLive).length
                  : SELECTED_PROJECTS.filter((p) => !p.isLive).length}
                )
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const handleClearFilters = () => {
    onFilterChange("category", "All");
    onFilterChange("year", "All");
    onFilterChange("status", "All");
  };

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.year !== "All" ||
    filters.status !== "All";

  return (
    <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-700/30 p-4 lg:p-6 overflow-y-auto lg:h-full max-h-96 lg:max-h-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="size-4 text-gray-400" />
          <h3 className="font-medium">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 rounded-lg bg-gray-900/50 border border-gray-700/30">
        <div className="text-sm">
          <span className="text-white font-medium">{filteredCount}</span>
          <span className="text-gray-400"> of {totalProjects} projects</span>
        </div>
        {hasActiveFilters && (
          <div className="text-xs text-gray-500 mt-1">Filters applied</div>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        <FilterSection
          title="Category"
          icon={Filter}
          options={categories}
          activeValue={filters.category}
          filterType="category"
        />

        <FilterSection
          title="Year"
          icon={Calendar}
          options={years}
          activeValue={filters.year}
          filterType="year"
        />

        <FilterSection
          title="Status"
          icon={Globe}
          options={statuses}
          activeValue={filters.status}
          filterType="status"
        />
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-gray-700/30">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="size-2 bg-red-500 rounded-full animate-pulse" />
            <span>Live projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="size-3" />
            <span>Code-only projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};
