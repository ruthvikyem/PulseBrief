import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseBrief AI — AI Document & Meeting Action Engine",
  description: "Turn raw customer calls and messy transcripts into structured product specs, prioritized checklists, and Linear-ready JSON in 5 seconds.",
  keywords: ["AI meeting notes", "product specs generator", "transcript to PRD", "Linear action items", "founder MVP engine"],
  authors: [{ name: "PulseBrief Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#07090e] text-slate-100"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
