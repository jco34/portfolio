import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/layout/Navbar";
import { NowPlayingWidget } from "@/components/widgets/NowPlayingWidget";
import { nav } from "@/content/nav";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Jeremiah Comeda — Full-Stack Developer";
const description = "Building the logic behind great products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Jeremiah Comeda",
    type: "website",
    images: [
      { url: "/images/avatar.png", width: 527, height: 527, alt: "Jeremiah Comeda" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/avatar.png"],
  },
};

// Tints mobile browser UI to the page background so the chrome doesn't flash
// white above a dark page.
export const viewport: Viewport = {
  themeColor: "#141414",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${GeistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-fg text-bg rounded-pill sr-only px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <Navbar items={nav} />
        {children}
        <NowPlayingWidget />
      </body>
    </html>
  );
}
