import "@/styles/globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Navbar from "@/components/navbar";
import ApiAndSocketSync from "@/components/ApiAndSocketSync";
import GlobalStylesClient from "./GlobalStylesClient";

export const metadata: Metadata = {
  title: "Multi-store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-emerald-100">
        <Providers>
          <ApiAndSocketSync />
          <GlobalStylesClient />
          <Navbar />
          <div className="container mx-auto mt-4 p-4 ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

