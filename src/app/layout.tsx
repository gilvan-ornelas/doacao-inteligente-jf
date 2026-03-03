import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doação Inteligente para JF",
  description:
    "Plataforma colaborativa que conecta doadores e pontos de coleta em Juiz de Fora. Saiba onde doar e o que cada ponto precisa em tempo real.",
  openGraph: {
    title: "Doação Inteligente para JF",
    description:
      "Conectando doadores e pontos de coleta em Juiz de Fora — em tempo real.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
