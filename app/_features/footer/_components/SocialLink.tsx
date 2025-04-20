import Link from "next/link";

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  target?: string;
  rel?: string;
};

export const SocialLink = ({
  href,
  icon,
  label,
  target,
  rel,
}: SocialLinkProps) => (
  <li>
    <Link
      href={href}
      aria-label={label}
      tabIndex={0}
      target={target}
      rel={rel}
      className="block hover:text-gray-400 transition-colors"
    >
      {icon}
    </Link>
  </li>
);
