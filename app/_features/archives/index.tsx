import React from "react";
import Link from "next/link";
import { DesignCategoryCard } from "./_components/DesignCategoryCard";
import { StackedImage } from "./_components/StackedImagesCard";
import { ArchiveCard, ArchiveItem } from "./_components/ArchiveCard";

const UI_UX_IMAGES: StackedImage[] = [
  { id: 1, src: "", alt: "UI/UX Design 1" },
  { id: 2, src: "", alt: "UI/UX Design 2" },
  { id: 3, src: "", alt: "UI/UX Design 3" },
  { id: 4, src: "", alt: "UI/UX Design 4" },
];

const GRAPHIC_DESIGN_IMAGES: StackedImage[] = [
  { id: 1, src: "", alt: "Graphic Design 1" },
  { id: 2, src: "", alt: "Graphic Design 2" },
  { id: 3, src: "", alt: "Graphic Design 3" },
  { id: 4, src: "", alt: "Graphic Design 4" },
];

const CATEGORIES = [
  { title: "UI/UX", images: UI_UX_IMAGES },
  { title: "Graphic Designs", images: GRAPHIC_DESIGN_IMAGES },
];

const ARCHIVES_DATA: ArchiveItem[] = [
  { id: 1, title: "Portfolio Redesign", category: "UI/UX", year: 2023 },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Graphic Design",
    year: 2023,
  },
  { id: 3, title: "E-commerce App", category: "UI/UX", year: 2022 },
  {
    id: 4,
    title: "Marketing Campaign",
    category: "Graphic Design",
    year: 2022,
  },
  { id: 5, title: "Dashboard Interface", category: "UI/UX", year: 2021 },
  { id: 6, title: "Product Packaging", category: "Graphic Design", year: 2021 },
  { id: 7, title: "Mobile App Redesign", category: "UI/UX", year: 2020 },
  { id: 8, title: "Logo Collection", category: "Graphic Design", year: 2020 },
];

export default function Archives() {
  return (
    <div className="w-full space-y-2">
      {/* Designs */}
      <div className="flex justify-between items-center">
        <h2>Selected Designs</h2>
        <Link href="#" className="text-sm text-gray-500">
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
        <Link href="#" className="text-sm text-gray-500">
          View All
        </Link>
      </div>
      <div>
        {ARCHIVES_DATA.map((item) => (
          <ArchiveCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
