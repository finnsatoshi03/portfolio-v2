import React from "react";

import Bio from "./_features/bio";
import Skills from "./_features/skills";
import Projects from "./_features/projects";
import Archives from "./_features/archives";
import Footer from "./_features/footer";

import { ProjectsHeader } from "./_features/projects/_components/ProjectsHeader";
import { ArchivesHeader } from "./_features/archives/_components/ArchivesHeader";

import LightEffect from "./_components/LightEffect";
import SkillsShadow from "./_components/SkillsShadow";
import BrickGrid from "./_components/BrickGrid";

import { Header } from "./_components/Header";
import { Navigation } from "./_components/Navigation";
import { ProgressCallToActionBar } from "./_components/ProgressCallToActionBar";

export default function Home() {
  return (
    <>
      <div id="bio" className="p-4 pb-0 flex flex-col min-h-screen">
        <Header />
        <div className="p-[clamp(1rem,8vw,2rem)] pb-0 flex-1 flex flex-col gap-4">
          <Navigation />
          <Bio className="flex-1 h-full" />
        </div>
      </div>
      <div
        id="skills"
        className="skills-section h-screen flex items-center justify-center relative"
      >
        <BrickGrid className="z-0" />
        <SkillsShadow className="z-10" />
        <LightEffect className="z-20" />
        <Skills className="z-30" />
      </div>
      <div
        id="projects"
        className="projects-section space-y-8 h-full flex flex-col relative p-4 md:p-8"
      >
        <ProjectsHeader />
        <Projects />
      </div>
      <div
        id="archives"
        className="archives-section space-y-8 h-full flex flex-col relative p-4 md:p-8"
      >
        <ArchivesHeader />
        <Archives />
      </div>
      {/* Footer */}
      <div
        id="contact"
        className="footer-section space-y-8 h-full flex flex-col relative p-4 md:p-8 md:mt-0 mt-8"
      >
        <Footer />
      </div>
      <ProgressCallToActionBar />
    </>
  );
}
