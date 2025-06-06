import { StackedImage } from "@/app/_features/archives/_components/StackedImagesCard";

export const UI_UX_IMAGES: StackedImage[] = [
  { id: 1, src: "", alt: "UI/UX Design 1" },
  { id: 2, src: "", alt: "UI/UX Design 2" },
  { id: 3, src: "", alt: "UI/UX Design 3" },
  { id: 4, src: "", alt: "UI/UX Design 4" },
];

// Categorized graphic designs
export const POSTER_DESIGNS: StackedImage[] = [
  {
    id: 1,
    src: "/images/graphics/pythagoream-theorem.jpg",
    alt: "Pythagorean Theorem Educational Poster",
  },
  {
    id: 2,
    src: "/images/graphics/socio.jpg",
    alt: "Sociology Educational Poster",
  },
  {
    id: 3,
    src: "/images/graphics/trigo.jpg",
    alt: "Trigonometry Educational Poster",
  },
];

export const POST_DESIGNS: StackedImage[] = [
  {
    id: 4,
    src: "/images/graphics/team.jpg",
    alt: "Team Collaboration Post Design",
  },
];

// Combined for featured works
export const GRAPHIC_DESIGN_IMAGES: StackedImage[] = [
  ...POSTER_DESIGNS,
  ...POST_DESIGNS,
];
