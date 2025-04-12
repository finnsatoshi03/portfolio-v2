import React from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <h1>
      Everyday artisan{" "}
      <span className={`${playfairDisplay.className} italic`}>of frontend</span>
    </h1>
  );
}
