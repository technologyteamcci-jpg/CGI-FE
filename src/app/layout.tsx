import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryClient from "@/config/ReactQueryClient";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CGI Admin",
  description: "cgi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="#0D1F23" />
        <ReactQueryClient>
          <Suspense>{children}</Suspense>
          <Toaster />
        </ReactQueryClient>
      </body>
    </html>
  );
}

