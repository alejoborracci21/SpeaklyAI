import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"

import { Montserrat, Chewy } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const chewy = Chewy({ subsets: ["latin"], weight: "400", variable: "--font-chewy" })


import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // según lo que uses
})


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpeaklyAI",
  description: "SpeaklyAI - Learn a language with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${chewy.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
