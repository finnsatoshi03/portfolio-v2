import Link from "next/link";
import { CONTACT_INFO } from "@/app/_lib/_const/contact";

export const ContactInfo = () => (
  <div className="space-y-6 flex flex-col items-center md:block md:text-left text-center">
    <h2 className="text-4xl">Direct contact me at </h2>
    <ul className="flex flex-col gap-2">
      <li>
        <Link href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
          {CONTACT_INFO.email}
        </Link>
      </li>
      <li>
        <p className="hover:underline">{CONTACT_INFO.phone}</p>
      </li>
    </ul>
  </div>
);
