import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rishu Singh | Creative Developer",
  description: "Portfolio of Rishu Singh, a Creative Developer specializing in high-performance web applications and motion design.",
  keywords: ["Creative Developer", "Web Development", "Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion"],
  openGraph: {
    title: "Rishu Singh | Creative Developer",
    description: "Building digital experiences that merge high-end motion with clean, functional design.",
    type: "website",
    locale: "en_US",
    siteName: "Rishu Singh Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
