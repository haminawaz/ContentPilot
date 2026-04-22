import type { Metadata } from "next";
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
  title: {
    default: "ContentPilot | AI-Powered Structural SEO & Content Strategy",
    template: "%s | ContentPilot"
  },
  description: "Scale your organic reach with surgical precision. ContentPilot is an AI-powered structural integrity engine for high-performing SEO teams.",
  keywords: ["AI SEO", "Structural Content", "Content Strategy", "Search Visibility", "E-E-A-T", "SEO Automation", "Content Trajectory"],
  authors: [{ name: "ContentPilot Team" }],
  creator: "ContentPilot",
  publisher: "ContentPilot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://contentpilot.ai"), // Placeholder URL
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ContentPilot | AI-Powered Structural SEO & Content Strategy",
    description: "Scale your organic reach with surgical precision. Built for those who demand performance, not just volume.",
    url: "https://contentpilot.ai",
    siteName: "ContentPilot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContentPilot | AI-Powered Structural SEO",
    description: "Scale your organic reach with surgical precision. Structural integrity for the future of content.",
    creator: "@contentpilot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
