import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/common/Header";
import Footer from "@/components/ui/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const getoutfit= Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevConnect - Share your Creations, Discover New Launches",
  description: "A community platform for creators to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, real builders, genuine feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body
        className={`${getoutfit.className} bg-amber-50 min-h-screen`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
