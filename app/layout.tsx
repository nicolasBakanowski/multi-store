import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/navbar";
import ApiAndSocketSync from "@/components/ApiAndSocketSync";
import GlobalStylesClient from "./GlobalStylesClient";
import SorteoBar from "@/components/SorteoBar";
import AnalyticsInit from "@/components/AnalyticsInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Despacho",
  description: "Bebidas y almacén",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="bg-crema text-carbon font-sans antialiased">
        <Providers>
          <AnalyticsInit />
          <ApiAndSocketSync />
          <GlobalStylesClient />
          <Navbar />
          <SorteoBar />
          <div className="container mx-auto px-3 sm:px-4 py-5">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
