import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, Space_Mono } from "next/font/google";
import "./globals.css";

// Bodoni Moda and Archivo are variable fonts, so no `weight` is needed.
// Space Mono is static — its available weights have to be listed explicitly.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-util",
});

export const metadata: Metadata = {
  title: "6CRYPTO6GOOCHI6 — Omerta Row",
  description:
    "Digital luxury. Music, souvenirs and a house currency in the making. An Omerta Row artist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${archivo.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
