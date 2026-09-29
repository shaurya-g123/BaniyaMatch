import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DemoBanner } from "@/components/common/DemoBanner";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { MobileNav } from "@/components/common/MobileNav";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baniya Match | Where Traditions Meet Compatibility",
  description: "A modern, premium matchmaking platform for Baniya families, young professionals, and parents across India and global hubs.",
  keywords: ["Baniya Matrimony", "Agarwal Matrimony", "Maheshwari Matrimony", "Gupta Matrimony", "Modern Indian Matchmaking"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory dark:bg-charcoal text-bmText-primary dark:text-bmText-darkPrimary selection:bg-burgundy selection:text-white transition-colors duration-200">
        <DemoBanner />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
