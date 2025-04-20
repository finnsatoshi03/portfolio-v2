import { Playfair_Display } from "next/font/google";
import { SocialLinks } from "./SocialLinks";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic"],
});

export const IntroSection = () => (
  <div className="space-y-6 flex items-center text-center flex-col md:block md:text-left">
    <h2 className="text-4xl">
      Let&apos;s build
      <br />
      something <span className={`${playfair.className}`}>exceptional</span>
    </h2>
    <SocialLinks />
  </div>
);
