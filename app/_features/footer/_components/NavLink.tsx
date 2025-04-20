import Link from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
};

export const NavLink = ({ href, label }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      className="rounded-full bg-gray-800 text-white px-4 py-0.5 hover:bg-gray-700 transition-colors"
    >
      {label}
    </Link>
  </li>
);
