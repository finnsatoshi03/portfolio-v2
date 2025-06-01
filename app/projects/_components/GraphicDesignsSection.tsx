"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, Layout, Zap, X } from "lucide-react";
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

const MasonryImage: React.FC<{
  design: StackedImage;
  index: number;
  onImageClick: (design: StackedImage) => void;
}> = ({ design, index, onImageClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (design.src) {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        setImageLoaded(true);
      };
      img.src = design.src;
    }
  }, [design.src]);

  if (!design.src) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-gray-900/20 border border-gray-700/20 rounded-lg flex items-center justify-center p-8"
        style={{ height: "200px" }}
      >
        <div className="text-center space-y-2">
          <ImageIcon className="size-8 text-gray-600 mx-auto" />
          <p className="text-gray-500 text-sm">Coming Soon</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer break-inside-avoid mb-4"
      onClick={() => onImageClick(design)}
    >
      {imageLoaded && (
        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            src={design.src}
            alt={design.alt}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Hover Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium">{design.alt}</p>
            <p className="text-gray-300 text-xs">Click to view full size</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const CategoryMasonry: React.FC<{
  category: { id: string; label: string; icon: React.ElementType };
  designs: StackedImage[];
  index: number;
  onImageClick: (design: StackedImage) => void;
}> = ({ category, designs, index, onImageClick }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Icon className="size-5 text-gray-400" />
        <h3 className="text-lg font-medium">{category.label}</h3>
      </div>

      {designs.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {designs.map((design, designIndex) => (
            <MasonryImage
              key={design.id}
              design={design}
              index={designIndex}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 4 }).map((_, placeholderIndex) => (
            <div
              key={placeholderIndex}
              className="bg-gray-900/20 border border-gray-700/20 rounded-lg flex items-center justify-center p-8 mb-4 break-inside-avoid"
              style={{ height: `${200 + Math.random() * 100}px` }}
            >
              <div className="text-center space-y-2">
                <Icon className="size-6 text-gray-600 mx-auto" />
                <p className="text-gray-600 text-xs">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ImageModal: React.FC<{
  design: StackedImage | null;
  onClose: () => void;
}> = ({ design, onClose }) => {
  if (!design) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={design.src}
            alt={design.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-medium text-center">{design.alt}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const GraphicDesignsSection: React.FC<GraphicDesignsSectionProps> = ({
  designs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    DesignCategory | "all"
  >("all");
  const [selectedImage, setSelectedImage] = useState<StackedImage | null>(null);

  const handleImageClick = (design: StackedImage) => {
    setSelectedImage(design);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const getDesignsForCategory = (categoryId: string): StackedImage[] => {
    switch (categoryId) {
      case "posters":
        return designs;
      case "logos":
        return [];
      case "branding":
        return [];
      default:
        return [];
    }
  };

  const filteredCategories =
    selectedCategory === "all"
      ? designCategories
      : designCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <>
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

        {/* Featured Designs - Masonry Layout */}
        {designs.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Palette className="size-4 text-gray-400" />
              <h3 className="text-lg font-medium">Featured Work</h3>
            </div>
            <div className="columns-1 sm:columns-2 md:columns-4 gap-4 mb-8">
              {designs.map((design, index) => (
                <MasonryImage
                  key={design.id}
                  design={design}
                  index={index}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category, index) => (
            <CategoryMasonry
              key={category.id}
              category={category}
              designs={getDesignsForCategory(category.id)}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal design={selectedImage} onClose={handleCloseModal} />
    </>
  );
};
