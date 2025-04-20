import type { Metadata } from "next";
import { Didact_Gothic } from "next/font/google";
import "./globals.css";

const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "<markistry /> | Creative Developer Portfolio",
    template: "%s | <markistry />",
  },
  description:
    "Innovative developer portfolio showcasing projects, skills, and creative solutions in web development, interactive design, and software engineering.",
  keywords: [
    "developer",
    "portfolio",
    "web development",
    "front-end",
    "UI/UX",
    "React",
    "Next.js",
  ],
  creator: "Markistry",
  publisher: "Markistry",
  // metadataBase: new URL("https://markistry.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    // url: "https://markistry.dev",
    title: "<markistry /> | Creative Developer Portfolio",
    description:
      "Innovative developer portfolio showcasing modern web development and interactive design projects",
    siteName: "<markistry />",
  },
  twitter: {
    card: "summary_large_image",
    title: "<markistry /> | Creative Developer Portfolio",
    description:
      "Innovative developer portfolio showcasing modern web development and interactive design projects",
    creator: "@markistry",
  },
  icons: {
    icon: "/icon.png",
    // apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${didactGothic.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
