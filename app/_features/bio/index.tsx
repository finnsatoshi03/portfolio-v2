import React from "react";
import Image from "next/image";
import { cn } from "@/app/_lib/utils";

import profileImage from "@/public/profile.jpg";
import { ArrowDownRight } from "lucide-react";

interface BioProps {
  className?: string;
}

export default function Bio({ className }: BioProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 w-full h-full", className)}>
      <div className="self-end lg:mb-8">
        <ArrowDownRight className="size-14 -ml-4" strokeWidth={1} />
        <p className="text-sm lg:text-lg">
          I&apos;m a frontend developer passionate about crafting seamless,
          user-friendly experiences. Since 2023, I&apos;ve honed my skills in
          clean UI design, responsive layouts, and performance optimization
          while staying up to date with modern frameworks and best practices.
        </p>
      </div>
      <div className="relative h-full -mr-[3rem] sm:-mr-[clamp(2rem,8vw,3rem)]">
        <Image
          src={profileImage}
          alt="profile"
          className="object-cover object-top"
          fill
          //   sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
