import type { Metadata } from "next";
import { Geist, Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { IsClassMemberProvider, ClassDataProvider } from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Toodles",
  description: "Annonymous messaging but for a graduating class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <IsClassMemberProvider>
        <ClassDataProvider>
          <body
            className={`${geistSans.variable} ${spaceGrotesk.variable} ${unbounded.variable} antialiased`}
          >
            {children}
          </body>
        </ClassDataProvider>
      </IsClassMemberProvider>
    </html>
  );
}
