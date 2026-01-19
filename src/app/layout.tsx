import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// =============================================================================
// FONTS
// =============================================================================

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: {
    default: "Jibal Adventures | Premium Mountain Adventures",
    template: "%s | Jibal Adventures",
  },
  description:
    "Premium adventure travel experiences across the world's most spectacular mountain ranges. Expert guides, small groups, sustainable practices.",
  keywords: [
    "adventure travel",
    "mountain trekking",
    "hiking tours",
    "mountaineering",
    "guided expeditions",
    "Jibal Adventures",
    "Kuwait travel",
  ],
  authors: [{ name: "Jibal Adventures" }],
  creator: "Jibal Adventures",
  metadataBase: new URL("https://jibaladventures.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jibaladventures.com",
    siteName: "Jibal Adventures",
    title: "Jibal Adventures | Premium Mountain Adventures",
    description:
      "Premium adventure travel experiences across the world's most spectacular mountain ranges.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jibal Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jibal Adventures | Premium Mountain Adventures",
    description:
      "Premium adventure travel experiences across the world's most spectacular mountain ranges.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// =============================================================================
// ROOT LAYOUT
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-background-alt focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
