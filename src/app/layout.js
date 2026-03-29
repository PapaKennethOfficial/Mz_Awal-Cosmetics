import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Mz.Awal's Cosmetics — Simple. Affordable. Radiant.",
  description: "Science-backed skincare crafted for Gen Z skin.",
  keywords: ["skincare", "cosmetics", "Ghana", "beauty", "radiant", "Mz.Awal's", "cleanser", "serum", "sunscreen"],
  authors: [{ name: "Mz.Awal's Cosmetics" }],
  openGraph: {
    title: "Mz.Awal's Cosmetics",
    description: "Science-backed skincare crafted for Gen Z skin.",
    url: "https://mzawalcosmetics.com",
    siteName: "Mz.Awal's Cosmetics",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mz.Awal's Cosmetics Storefront",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mz.Awal's Cosmetics",
    description: "Science-backed skincare crafted for Gen Z skin.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#D4826A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Mz.Awal's Cosmetics",
    "image": "https://mzawalcosmetics.com/og-image.jpg",
    "@id": "https://mzawalcosmetics.com",
    "url": "https://mzawalcosmetics.com",
    "telephone": "+233000000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Accra",
      "addressCountry": "GH"
    }
  };
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
