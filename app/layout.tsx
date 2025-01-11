import { PrimeReactProvider } from "primereact/api";
import type { Metadata } from "next";
import React from "react";
import "./globals.scss";
import "primereact/resources/themes/saga-orange/theme.css";
import 'primeicons/primeicons.css';

export const metadata: Metadata = {
  title: "Financial Data Filtering App",
  description: "An example of app listing financial info",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <body className="bg-gradient-to-r from-[#f5f5dc] via-[#fefae0] to-[#ffefdb]">
          {children}
        </body>
      </html>
    </PrimeReactProvider>
  );
}
