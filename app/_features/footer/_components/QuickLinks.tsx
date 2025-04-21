import { NavLink } from "./NavLink";

export const QuickLinks = () => {
  const navLinks = [
    { href: "/#bio", label: "Bio" },
    { href: "/#projects", label: "Projects" },
    { href: "/#archives", label: "Archives" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <div className="space-y-6 text-center flex flex-col items-center md:block md:text-left">
      <h2 className="text-4xl">Quick Links</h2>
      <ul className="flex items-center gap-2">
        {navLinks.map((link, index) => (
          <NavLink key={index} {...link} />
        ))}
      </ul>
    </div>
  );
};
