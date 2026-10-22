import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import SiteHeader from "@/components/common/SiteHeader";
import SiteFooter from "@/components/common/SiteFooter";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { brandData } from "@/data/brand";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flutterhoney | Bespoke Lashes & Brows by Corina · Scottsdale, AZ",
    template: "%s | Flutterhoney — Scottsdale Lash & Brow Studio",
  },
  description:
    "Luxury lash extensions, keratin lash lifts, and brow artistry by Corina Gonzalez at Scottsdale Quarter. AZ State Board-approved trainer delivering personalized beauty.",
  keywords: brandData.meta.keywords,
  authors: [{ name: "Corina Gonzalez" }],
  creator: "Corina Gonzalez",
  publisher: "Flutterhoney",
  metadataBase: new URL("https://flutterhoney-lash.square.site/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flutterhoney | Bespoke Lashes & Brows by Corina · Scottsdale, AZ",
    description:
      "Soft luxury and personalized lash and brow artistry at Scottsdale Quarter, Loft 28. AZ State Board-approved lash trainer.",
    url: "https://flutterhoney-lash.square.site/",
    siteName: "Flutterhoney",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Flutterhoney — Bespoke Lashes and Brows in Scottsdale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterhoney | Bespoke Lashes & Brows by Corina",
    description:
      "Personalized lash extensions, keratin lifts, and brow lamination at Scottsdale Quarter.",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-porcelain text-espresso selection:bg-rose-muted selection:text-white">
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <CartDrawer />
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
