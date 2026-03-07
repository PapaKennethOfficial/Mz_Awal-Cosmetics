import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Mz.Awal's Cosmetics — Simple. Affordable. Radiant.",
  description: "Science-backed skincare crafted for Gen Z skin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
