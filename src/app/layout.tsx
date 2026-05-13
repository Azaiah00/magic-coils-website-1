import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SlideOutCart from "@/components/SlideOutCart";
import PopupModal from "@/components/PopupModal";
import DiscountUrlCapture from "@/components/DiscountUrlCapture";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Anchor every relative metadata URL (og/twitter images, canonicals, etc.) to the
  // production domain so social preview cards never reference http://localhost:3000.
  metadataBase: new URL("https://magiccoils.net"),
  title: "Magic Coils | Crowned in Magic",
  description: "Professional formulations designed to nourish, define, and protect. Your hair is a crown.",
  verification: {
    other: { "p:domain_verify": "93c3e3c4317a41498fc73b6921399419" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager — wraps GA4, Clarity, Meta Pixel, TikTok Pixel.
            Container ID: GTM-WFX38LZ2 (owned by info@magiccoils.net).
            All future tracking goes through this container — no further code changes. */}
        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WFX38LZ2');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-primary bg-background`}
      >
        {/* GTM noscript fallback — first child of body per Google's spec */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFX38LZ2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <CartProvider>
          <DiscountUrlCapture />
          {children}
          <SlideOutCart />
          <PopupModal />
        </CartProvider>
      </body>
    </html>
  );
}
