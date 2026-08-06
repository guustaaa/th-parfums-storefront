import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thparfums.example.com"),
  title: {
    default: "THPARFUMS — Perfumaria de alto padrão",
    template: "%s · THPARFUMS",
  },
  description:
    "Fragrâncias selecionadas com elegância. Perfumes masculinos, femininos e unissex — alta fixação e personalidade.",
  openGraph: {
    title: "THPARFUMS — Perfumaria de alto padrão",
    description:
      "Fragrâncias selecionadas com elegância. Alta fixação e personalidade.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-foreground">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
