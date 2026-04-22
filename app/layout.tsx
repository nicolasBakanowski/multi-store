import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/navbar";
import ApiAndSocketSync from "@/components/ApiAndSocketSync";
import GlobalStylesClient from "./GlobalStylesClient";
import SorteoBar from "@/components/SorteoBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pinta Bien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-crema text-carbon font-sans antialiased">
        <Providers>
          <ApiAndSocketSync />
          <GlobalStylesClient />
          <Navbar />
          <SorteoBar />
          <div className="container mx-auto px-4 py-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
