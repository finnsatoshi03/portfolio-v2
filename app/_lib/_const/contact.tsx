import { FaLinkedinIn, FaFacebookMessenger, FaGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/mark-nelson-mamerto-b616a0336/",
    icon: <FaLinkedinIn className="size-6" />,
    label: "LinkedIn Profile",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "mailto:marknelson.mamerto03@gmail.com",
    icon: <SiGmail className="size-6" />,
    label: "Email Me",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "http://m.me/FabulousEggPie/",
    icon: <FaFacebookMessenger className="size-6" />,
    label: "Facebook Messenger",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "https://github.com/finnsatoshi03",
    icon: <FaGithub className="size-6" />,
    label: "GitHub Profile",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export const CONTACT_INFO = {
  email: "marknelson.mamerto03@gmail.com",
  phone: "+63 905 365 8267",
};
