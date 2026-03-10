import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Scene3D from "@/components/3d/Scene3D";
import ScrollWrapper from "@/components/layout/ScrollWrapper";
import CustomCursor from "@/components/ui/CustomCursor";

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
  title: "ResumeAI | Futuristic Career Intelligence",
  description: "Elite ATS diagnostic engine and AI interview simulator with interactive neural interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased selection:bg-accent/30`}
      >
        <ScrollWrapper>
          <CustomCursor />
          <Scene3D />
          <div className="relative z-10">
            {children}
          </div>
        </ScrollWrapper>
      </body>
    </html>
  );
}
