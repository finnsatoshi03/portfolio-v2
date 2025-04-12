import React from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
});

export function Header() {
  return (
    <h1 className="text-center leading-[1.2] text-[clamp(2rem,8vw,15rem)] md:leading-[1]">
      Everyday artisan{" "}
      <span className={`${playfairDisplay.className} italic`}>of frontend</span>
    </h1>
  );
}
