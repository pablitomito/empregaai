import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configuramos a fonte Inter, que é estável e nativa do Next.js 14
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Emprega AI",
  description: "Gerado por Emprega AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}