import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { COLLABORATORS } from "@/app/_lib/_const/collaborators";
import { CollaboratorsSection } from "./_components/CollaboratorsSection";

export default function CollaboratorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Collaborators
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Meet the talented individuals who bring diverse expertise and
            innovative solutions to our collaborative projects. Each member
            contributes unique skills and perspectives that drive our collective
            success.
          </p>
        </div>

        {/* Collaborators Section */}
        <CollaboratorsSection collaborators={COLLABORATORS} />
      </div>
    </div>
  );
}
