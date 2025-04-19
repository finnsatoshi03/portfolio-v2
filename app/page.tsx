import React from "react";

import Bio from "./_features/bio";
import Skills from "./_features/skills";
import Projects from "./_features/projects";

import { ProjectsHeader } from "./_features/projects/_components/ProjectsHeader";
import { ArchivesHeader } from "./_features/archives/_components/ArchivesHeader";

import LightEffect from "./_components/LightEffect";
import SkillsShadow from "./_components/SkillsShadow";
import BrickGrid from "./_components/BrickGrid";

import { Header } from "./_components/Header";
import { Navigation } from "./_components/Navigation";

export default function Home() {
  return (
    <>
      <div className="p-4 pb-0 flex flex-col min-h-screen">
        <Header />
        <div className="p-[clamp(1rem,8vw,2rem)] pb-0 flex-1 flex flex-col gap-4">
          <Navigation />
          <Bio className="flex-1 h-full" />
        </div>
      </div>
      <div className="skills-section h-screen flex items-center justify-center relative">
        <BrickGrid className="z-0" />
        <SkillsShadow className="z-10" />
        <LightEffect className="z-20" />
        <Skills className="z-30" />
      </div>
      <div className="projects-section space-y-8 h-full flex flex-col relative px-4 md:p-8">
        <ProjectsHeader />
        <Projects />
      </div>
      <div className="archives-section space-y-8 h-screen flex flex-col relative px-4 md:p-8">
        <ArchivesHeader />
      </div>
    </>
  );
}
