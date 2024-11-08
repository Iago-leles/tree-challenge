import type { Metadata } from "next";
import { Inter } from "next/font/google"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tree View",
  description: "Tree View Challenge",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        {children}
      </body>
    </html>
  );
}
