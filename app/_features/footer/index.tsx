import { IntroSection } from "./_components/IntroSection";
import { QuickLinks } from "./_components/QuickLinks";
import { ContactInfo } from "./_components/ContactInfo";
import { Logo } from "./_components/Logo";

export default function Footer() {
  return (
    <footer className="space-y-12 md:space-y-4">
      <div className="lg:grid grid-cols-[1fr_auto] gap-8 md:space-y-0 space-y-12">
        <IntroSection />
        <div className="self-end flex flex-col items-center md:items-start md:grid grid-cols-[auto_auto] gap-8 md:gap-x-16">
          <QuickLinks />
          <ContactInfo />
        </div>
      </div>
      <Logo />
    </footer>
  );
}
