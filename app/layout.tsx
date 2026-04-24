import "@/styles/globals.css";
import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/navbar";
import ApiAndSocketSync from "@/components/ApiAndSocketSync";
import GlobalStylesClient from "./GlobalStylesClient";
import SorteoBar from "@/components/SorteoBar";
import AnalyticsInit from "@/components/AnalyticsInit";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Vuelta Buena",
  description: "Bebé bien · Pedí fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="bg-vb-crema text-vb-negro font-sans antialiased">
        <Providers>
          <AnalyticsInit />
          <ApiAndSocketSync />
          <GlobalStylesClient />
          <Navbar />
          <SorteoBar />
          <div className="container mx-auto px-3 sm:px-4 pt-[4.25rem] pb-5">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
