import {
  FaLinkedinIn,
  FaFacebookMessenger,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { SocialLink } from "./SocialLink";

export const SocialLinks = () => {
  const socialLinks = [
    {
      href: "/",
      icon: <FaLinkedinIn className="size-6" />,
      label: "LinkedIn Profile",
    },
    { href: "/", icon: <SiGmail className="size-6" />, label: "Email Me" },
    {
      href: "/",
      icon: <FaFacebookMessenger className="size-6" />,
      label: "Facebook Messenger",
    },
    {
      href: "/",
      icon: <FaInstagram className="size-6" />,
      label: "Instagram Profile",
    },
    {
      href: "/",
      icon: <FaGithub className="size-6" />,
      label: "GitHub Profile",
    },
  ];

  return (
    <ul className="flex gap-4 items-center">
      {socialLinks.map((link, index) => (
        <SocialLink key={index} {...link} />
      ))}
    </ul>
  );
};
