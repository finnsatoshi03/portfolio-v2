"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, Layout, Zap } from "lucide-react";
import Image from "next/image";

type StackedImage = {
  id: number;
  src: string;
  alt: string;
};

interface GraphicDesignsSectionProps {
  designs: StackedImage[];
}

type DesignCategory =
  | "posters"
  | "banners"
  | "brochures"
  | "posts"
  | "logos"
  | "branding"
  | "packaging"
  | "cards";

const designCategories = [
  { id: "posters", label: "Posters", icon: Layout },
  { id: "banners", label: "Banners", icon: ImageIcon },
  { id: "brochures", label: "Brochure & Flyers", icon: Layout },
  { id: "posts", label: "Post Designs", icon: ImageIcon },
  { id: "logos", label: "Logo Designs", icon: Zap },
  { id: "branding", label: "Brand Guidelines", icon: Palette },
  { id: "packaging", label: "Packaging Designs", icon: Layout },
  { id: "cards", label: "Business Cards", icon: ImageIcon },
];

const DesignCard: React.FC<{ design: StackedImage; index: number }> = ({
  design,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-square rounded-lg overflow-hidden bg-gray-900/30 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
    >
      {design.src ? (
        <Image
          src={design.src}
          alt={design.alt}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <ImageIcon className="size-8 text-gray-600 mx-auto" />
            <p className="text-gray-500 text-sm">Coming Soon</p>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </motion.div>
  );
};

const CategorySection: React.FC<{
  category: { id: string; label: string; icon: React.ElementType };
  designs: StackedImage[];
  index: number;
}> = ({ category, designs, index }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2">
        <Icon className="size-5 text-gray-400" />
        <h3 className="text-lg font-medium">{category.label}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {designs.length > 0
          ? designs.map((design, designIndex) => (
              <DesignCard key={design.id} design={design} index={designIndex} />
            ))
          : // Placeholder cards for categories without designs
            Array.from({ length: 4 }).map((_, placeholderIndex) => (
              <div
                key={placeholderIndex}
                className="aspect-square rounded-lg bg-gray-900/20 border border-gray-700/20 flex items-center justify-center"
              >
                <div className="text-center space-y-2">
                  <Icon className="size-6 text-gray-600 mx-auto" />
                  <p className="text-gray-600 text-xs">Coming Soon</p>
                </div>
              </div>
            ))}
      </div>
    </motion.div>
  );
};

export const GraphicDesignsSection: React.FC<GraphicDesignsSectionProps> = ({
  designs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    DesignCategory | "all"
  >("all");

  const getDesignsForCategory = (categoryId: string): StackedImage[] => {
    // For now, we'll distribute the available designs across categories
    // In a real app, you'd have designs categorized properly
    switch (categoryId) {
      case "posters":
        return designs.slice(0, 2);
      case "logos":
        return designs.slice(2, 4);
      case "branding":
        return designs.slice(4, 6);
      default:
        return [];
    }
  };

  const filteredCategories =
    selectedCategory === "all"
      ? designCategories
      : designCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform ideas into visually stunning designs. Whether for print or
          digital media, I create compelling graphics that effectively
          communicate your message.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategory === "all"
              ? "bg-white text-black"
              : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          All Categories
        </button>
        {designCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as DesignCategory)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-white text-black"
                : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Featured Designs */}
      {designs.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="size-4 text-gray-400" />
            <h3 className="text-lg font-medium">Featured Work</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {designs.map((design, index) => (
              <DesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-12">
        {filteredCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            designs={getDesignsForCategory(category.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
