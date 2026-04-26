import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SlideOutCart from "@/components/SlideOutCart";
import PopupModal from "@/components/PopupModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magic Coils | Crowned in Magic",
  description: "Professional formulations designed to nourish, define, and protect. Your hair is a crown.",
  verification: {
    other: { 'p:domain_verify': '93c3e3c4317a41498fc73b6921399419' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-primary bg-background`}
      >
        <CartProvider>
          {children}
          <SlideOutCart />
          <PopupModal />
        </CartProvider>
      </body>
    </html>
  );
}
