"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Code, Zap, Target } from "lucide-react";

import { COLLABORATORS } from "@/app/_lib/_const/collaborators";

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}> = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
    >
      <div className="text-blue-400">{icon}</div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">{value}</p>
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
    </motion.div>
  );
};

export const TeamStats: React.FC = () => {
  const totalCollaborators = COLLABORATORS.length;
  const uniqueSpecializations = new Set(
    COLLABORATORS.flatMap((c) => c.specialization)
  ).size;
  const totalSkills = new Set(COLLABORATORS.flatMap((c) => c.skills)).size;

  return (
    <div className="h-full flex flex-col justify-center space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Users className="size-5" />}
          value={totalCollaborators.toString()}
          label="Team Members"
          delay={0.1}
        />
        <StatCard
          icon={<Target className="size-5" />}
          value={uniqueSpecializations.toString()}
          label="Specializations"
          delay={0.2}
        />
        <StatCard
          icon={<Code className="size-5" />}
          value={`${totalSkills}+`}
          label="Technologies"
          delay={0.3}
        />
        <StatCard
          icon={<Zap className="size-5" />}
          value="100%"
          label="Dedication"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-400 text-xs">
          Building the future through collaborative innovation
        </p>
      </motion.div>
    </div>
  );
};
