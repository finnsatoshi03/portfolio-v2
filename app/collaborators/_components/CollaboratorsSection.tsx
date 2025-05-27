"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Filter, Search } from "lucide-react";

import { Collaborator } from "@/app/_lib/_const/collaborators";
import { CollaboratorCard } from "@/app/_features/collaborators/_components/CollaboratorCard";

interface CollaboratorsSectionProps {
  collaborators: Collaborator[];
}

export const CollaboratorsSection: React.FC<CollaboratorsSectionProps> = ({
  collaborators,
}) => {
  const [filterSpecialization, setFilterSpecialization] =
    useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique specializations for filter
  const allSpecializations = Array.from(
    new Set(collaborators.flatMap((c) => c.specialization))
  );

  // Filter collaborators
  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSpecialization =
      filterSpecialization === "all" ||
      collaborator.specialization.includes(filterSpecialization);

    const matchesSearch =
      searchTerm === "" ||
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.specialization.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      collaborator.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesSpecialization && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="size-5 text-gray-400" />
          <h2 className="text-xl font-semibold">
            All Collaborators ({filteredCollaborators.length})
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search collaborators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 w-full sm:w-64"
            />
          </div>

          {/* Specialization Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-gray-600 appearance-none cursor-pointer w-full sm:w-48"
            >
              <option value="all">All Specializations</option>
              {allSpecializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Collaborators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCollaborators.map((collaborator, index) => (
          <motion.div
            key={collaborator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CollaboratorCard collaborator={collaborator} />
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredCollaborators.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="size-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            No collaborators found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900/30 rounded-lg border border-gray-700/30 p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Team Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {collaborators.length}
            </p>
            <p className="text-gray-400 text-sm">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {allSpecializations.length}
            </p>
            <p className="text-gray-400 text-sm">Specializations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {
                Array.from(new Set(collaborators.flatMap((c) => c.skills)))
                  .length
              }
              +
            </p>
            <p className="text-gray-400 text-sm">Technologies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">100%</p>
            <p className="text-gray-400 text-sm">Dedication</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
