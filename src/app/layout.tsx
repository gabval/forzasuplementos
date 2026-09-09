import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FORZA SUPLEMENTOS | Potencia Tu Rendimiento - Tienda Oficial",
  description:
    "Tienda online de suplementación deportiva de alto rendimiento: creatinas micronizadas, whey protein, pre-entrenos, colágeno y accesorios. Envíos a todo el país y checkout directo por WhatsApp.",
  keywords: [
    "suplementos deportivos",
    "creatina micronizada",
    "whey protein",
    "pre entreno",
    "star nutrition",
    "gold nutrition",
    "one fit",
    "gym",
    "fitness argentina",
  ],
  authors: [{ name: STORE_CONFIG.name }],
  openGraph: {
    title: "FORZA SUPLEMENTOS | Potencia Tu Rendimiento",
    description:
      "Catálogo oficial de suplementos deportivos: Creatinas, Proteínas, Pre-entrenos y Salud. Comprá directo por WhatsApp con envío a todo el país.",
    type: "website",
    locale: "es_AR",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable} dark h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-lime-400 selection:text-zinc-950 font-sans" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
