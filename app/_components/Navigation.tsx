import Link from "next/link";
import React from "react";

export function Navigation() {
  return (
    <nav className="w-full">
      <ul className="flex justify-between items-center uppercase">
        <li>
          <Link href="/#bio">bio</Link>
        </li>
        <li>
          <Link href="/#projects">projects</Link>
        </li>
        <li>
          <Link href="/#archives">archives</Link>
        </li>
        <li>
          <Link href="/#contact">contact</Link>
        </li>
      </ul>
    </nav>
  );
}
