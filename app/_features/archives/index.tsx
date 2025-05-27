import React from "react";
import Link from "next/link";

import { ARCHIVES_DATA } from "@/app/_lib/_const/archives";
import { UI_UX_IMAGES, GRAPHIC_DESIGN_IMAGES } from "@/app/_lib/_const/designs";

import { DesignCategoryCard } from "./_components/DesignCategoryCard";
import { ArchiveCard } from "./_components/ArchiveCard";

const CATEGORIES = [
  { title: "UI/UX", images: UI_UX_IMAGES },
  { title: "Graphic Designs", images: GRAPHIC_DESIGN_IMAGES },
];

export default function Archives() {
  return (
    <div className="w-full space-y-2">
      {/* Designs */}
      <div className="flex justify-between items-center">
        <h2>Selected Designs</h2>
        <Link
          href="/projects#graphics"
          prefetch={false}
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
        >
          View All
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <DesignCategoryCard
            key={category.title}
            title={category.title}
            images={category.images}
          />
        ))}
      </div>

      {/* Archives */}
      <div className="flex justify-between items-center mb-4 mt-10 md:mt-16">
        <h2>Archives</h2>
        <span className="text-sm text-gray-600 cursor-not-allowed">
          View All (Coming Soon)
        </span>
      </div>
      <div>
        {ARCHIVES_DATA.map((item) => (
          <ArchiveCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
