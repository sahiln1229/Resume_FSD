import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Scene3D from "@/components/3d/Scene3D";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ResumeAI | Next-Gen Career Intelligence",
  description: "Elite ATS diagnostic engine and AI interview simulator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased selection:bg-primary/30`}
      >
        <Scene3D />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
