import Link from "next/link";

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <li>
    <Link
      href={href}
      aria-label={label}
      tabIndex={0}
      className="block hover:text-gray-400 transition-colors"
    >
      {icon}
    </Link>
  </li>
);
