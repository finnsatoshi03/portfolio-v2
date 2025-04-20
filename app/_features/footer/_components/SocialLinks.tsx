import { SocialLink } from "./SocialLink";

import { SOCIAL_LINKS } from "@/app/_lib/_const/contact";

export const SocialLinks = () => {
  return (
    <ul className="flex gap-4 items-center">
      {SOCIAL_LINKS.map((link, index) => (
        <SocialLink key={index} {...link} />
      ))}
    </ul>
  );
};
