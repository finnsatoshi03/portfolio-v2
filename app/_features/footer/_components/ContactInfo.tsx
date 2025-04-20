import Link from "next/link";

export const ContactInfo = () => (
  <div className="space-y-6 flex flex-col items-center md:block md:text-left text-center">
    <h2 className="text-4xl">Direct contact me at </h2>
    <ul className="flex flex-col gap-2">
      <li>
        <Link href="/" className="hover:underline">
          marknelson.mamerto03@gmail.com
        </Link>
      </li>
      <li>
        <Link href="/" className="hover:underline">
          +63 905 365 8267
        </Link>
      </li>
    </ul>
  </div>
);
