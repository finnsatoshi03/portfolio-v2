import React from "react";
import { GeneralCard } from "../../../_components/GeneralCard";
import { StackedImagesCard, StackedImage } from "./StackedImagesCard";

interface DesignCategoryCardProps {
  title: string;
  images: StackedImage[];
  className?: string;
}

export const DesignCategoryCard = ({
  title,
  images,
  className = "",
}: DesignCategoryCardProps) => {
  return (
    <GeneralCard title={title} className={`overflow-hidden ${className}`}>
      <StackedImagesCard images={images} />
    </GeneralCard>
  );
};
