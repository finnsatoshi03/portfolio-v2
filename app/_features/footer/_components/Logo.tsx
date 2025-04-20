import localFont from "next/font/local";

const helveticaNueue = localFont({
  src: "./../../../_assets/fonts/HelveticaNeueHeavyItalic.otf",
  weight: "900",
  style: "italic",
});

export const Logo = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h1
        className={`${helveticaNueue.className} uppercase text-center leading-[0.9] tracking-tighter w-full inline-block
        text-[clamp(4rem,15vw,10rem)] 
        md:text-[clamp(6rem,16vw,14rem)]
        lg:text-[clamp(10rem,16.5vw,26rem)]`}
      >
        <span className="relative inline-block">
          mark<span className="text-[#4ead3f]">i</span>stry
        </span>
      </h1>
      <p className="text-center md:text-left md:ml-2 -mt-2 md:-mt-5 lg:-mt-6 lg:ml-4">
        © {currentYear} Markistry. Some rights reserved.
      </p>
    </div>
  );
};
