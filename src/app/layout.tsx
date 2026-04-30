import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
  title: "SamirOS v1.1",
  description:
    "Samir Kumal — CS @ Georgia State University | Data Engineering · ML · AI Systems",
};

const themeBootScript = `
(function () {
  try {
    var t = localStorage.getItem('samiros-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${inter.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="h-full overflow-hidden bg-[#050810]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
