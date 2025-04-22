// Define all project images
const allImages = [
  { src: "/images/e-habi/1.png", alt: "E-Habi project screenshot 1" },
  { src: "/images/e-habi/2.png", alt: "E-Habi project screenshot 2" },
  { src: "/images/eduQuest/1.png", alt: "EduQuest project screenshot 1" },
  { src: "/images/eduQuest/2.png", alt: "EduQuest project screenshot 2" },
  { src: "/images/eduQuest/3.png", alt: "EduQuest project screenshot 3" },
  { src: "/images/gas-sim/1.png", alt: "Gas Simulation project screenshot 1" },
  { src: "/images/rms-info/1.png", alt: "RMS Info project screenshot 1" },
  { src: "/images/rms-info/2.png", alt: "RMS Info project screenshot 2" },
  { src: "/images/rms-system/1.png", alt: "RMS System project screenshot 1" },
  { src: "/images/rms-system/2.png", alt: "RMS System project screenshot 2" },
  { src: "/images/rms-system/3.png", alt: "RMS System project screenshot 3" },
  {
    src: "/images/sucat-system/1.png",
    alt: "Sucat System project screenshot 1",
  },
  {
    src: "/images/sucat-system/2.png",
    alt: "Sucat System project screenshot 2",
  },
  {
    src: "/images/sucat-system/3.png",
    alt: "Sucat System project screenshot 3",
  },
  { src: "/images/taguig-web/1.jpg", alt: "Taguig Web project screenshot 1" },
  { src: "/images/taguig-web/3.png", alt: "Taguig Web project screenshot 3" },
  { src: "/images/graphics/homero.jpg", alt: "Homero Infographics" },
  {
    src: "/images/graphics/pythagoream-theorem.jpg",
    alt: "Pythagoream Theorem Infographics",
  },
  { src: "/images/graphics/socio.jpg", alt: "Sociolinguistics Infographics" },
  {
    src: "/images/graphics/trigo.jpg",
    alt: "Trigonometry Infographics",
  },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const PROJECT_IMAGES = shuffleArray(allImages);
