import { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Load Google Fonts in Next.js
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-playfair" });

export const metadata = {
  title: "Mythara – Travel. Discover. Belong.",
  description: "Explore India's diverse travel experiences with ease.",
  icons: {
    icon: "/mythara-icon.png",        // Standard favicon
    shortcut: "/mythara-icon.png",    // Legacy IE support
    apple: "/mythara-icon.png",       // iOS home screen icon
  },
};

// ✅ Explicitly specify the type of 'children' to fix TypeScript error
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
