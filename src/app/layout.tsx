import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Meta Workers for Change",
  description: "Meta employees holding their employer accountable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${barlowCondensed.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
        <Footer />
      </body>
    </html>
  );
}
