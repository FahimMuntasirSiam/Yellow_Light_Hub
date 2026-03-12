import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from 'react-hot-toast';
import Providers from "@/components/Providers";

import { FloatingUI } from "@/components/layout/FloatingUI";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#1E3A8A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "YellowLight Hub | Bangladesh's Trusted Electronics & Digital Store",
    template: "%s | YellowLight Hub"
  },
  description: "Premier destination for gadgets, mobile accessories, software licenses, and digital tools in Bangladesh. Fast delivery and instant digital access.",
  keywords: ["electronics", "gadgets", "software licenses", "digital products", "Bangladesh", "YellowLight Hub", "mobile accessories"],
  authors: [{ name: "YellowLight Hub Team" }],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://yellowlighthub.com",
    siteName: "YellowLight Hub",
    title: "YellowLight Hub | Quality Electronics & Digital Products",
    description: "Shop the best electronics and digital products in Bangladesh.",
    images: [{ url: "https://yellowlighthub.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YellowLight Hub | Premium Store",
    description: "Quality gadgets and digital tools delivered fast in BD.",
    images: ["https://yellowlighthub.com/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-slate-700 bg-white min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <FloatingUI />
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: 'font-bold text-sm rounded-2xl shadow-2xl border-none',
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
