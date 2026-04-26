import type { Metadata } from "next";
import "./globals.css";
import HUDOverlay from "@/components/HUDOverlay";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Code Noir",
    template: "%s | Code Noir",
  },
  description: "A noir detective game played inside a code editor.",
  openGraph: {
    title: "Code Noir",
    description: "A noir detective game played inside a code editor.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Code Noir social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Noir",
    description: "A noir detective game played inside a code editor.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;800;900&family=Fira+Code:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-noir-bg text-noir-text font-mono antialiased overflow-hidden h-screen">
        {/* Background & Atmosphere (Lowest) */}
        <div className="fixed inset-0 pointer-events-none film-grain vignette-overlay z-[5]" />
        <HUDOverlay />
        
        {/* Interactive App (Middle) */}
        <main className="relative z-[100] h-full w-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
