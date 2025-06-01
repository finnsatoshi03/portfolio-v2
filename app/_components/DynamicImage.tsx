import Image from "next/image";
import React from "react";

type DynamicImageProps = {
  src?: string;
  alt: string;
  imageClassName?: string;
  className?: string;
};

export const DynamicImage = ({
  src,
  alt,
  className = "",
  imageClassName = "",
}: DynamicImageProps) => {
  if (!src) {
    return (
      <div
        className={`flex-1 w-full bg-gray-800/50 rounded-lg flex items-center justify-center ${className}`}
        role="img"
        aria-label={`Placeholder for ${alt}`}
      >
        <div className="text-gray-400 text-sm">Coming Soon</div>
      </div>
    );
  }

  return (
    <div className={`flex-1 w-full relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover rounded-lg ${imageClassName}`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority={false}
      />
    </div>
  );
};
