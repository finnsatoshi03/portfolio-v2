"use client";

import Link from "next/link";
import { useScrollSmoother } from "@/app/_hooks/useScrollSmoother";

type NavLinkProps = {
  href: string;
  label: string;
};

export const NavLink = ({ href, label }: NavLinkProps) => {
  const { scrollTo } = useScrollSmoother();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Extract the hash from href (e.g., "/#bio" -> "#bio")
    const hash = href.split("#")[1];
    if (hash) {
      scrollTo(`#${hash}`, true);
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className="rounded-full bg-gray-800 text-white px-4 py-0.5 hover:bg-gray-700 transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
};
