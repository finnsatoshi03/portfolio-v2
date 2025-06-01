"use client";

import React from "react";
import Link from "next/link";

import { FEATURED_COLLABORATORS } from "@/app/_lib/_const/collaborators";

import { GeneralCard } from "@/app/_components/GeneralCard";
import { CollaboratorCard } from "./_components/CollaboratorCard";
import { TeamStats } from "./_components/TeamStats";
import { CollaborationNetwork } from "./_components/CollaborationNetwork";

export default function Collaborators() {
  // handlers
  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/collaborators";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h2>Collaborators</h2>
        <Link
          href="/collaborators"
          onClick={handleViewAllClick}
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col h-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_COLLABORATORS.map((collaborator) => (
          <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
        ))}

        <GeneralCard
          title="Team Stats"
          description="Our collaborative network spans multiple domains of expertise."
        >
          <TeamStats />
        </GeneralCard>

        <GeneralCard
          title="Collaboration Network"
          description="Building innovative solutions through diverse expertise and seamless teamwork."
          className="flex flex-col"
        >
          <CollaborationNetwork className="flex-1 min-h-[250px]" />
        </GeneralCard>
      </div>
    </div>
  );
}
