import localFont from "next/font/local";

const helveticaBlack = localFont({
  src: "./../../_assets/fonts/HelveticaNeueBlack.otf",
  weight: "900",
  style: "normal",
});

export default function Skills() {
  return (
    <div
      className={`${helveticaBlack.className} text-center uppercase text-[clamp(2rem,8vw,9.75rem)] leading-[1]`}
    >
      <ul>
        <li>Frontend Dev</li>
        <li>UI/UX Design</li>
        <li>Graphic Design</li>
      </ul>
    </div>
  );
}
