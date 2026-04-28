import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SamirOS v1.0",
  description:
    "Samir Kumal — CS @ Georgia State University | Data Engineering · ML · AI Systems",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${inter.variable} h-full`}
    >
      <body className="h-full overflow-hidden bg-[#050810]">{children}</body>
    </html>
  );
}
