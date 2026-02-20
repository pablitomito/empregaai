// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "intl-tel-input/build/css/intlTelInput.css";



const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmpregaAI - IA que te arranja emprego em Portugal",
  description: "Currículos premium criados por IA + candidaturas automáticas. Primeiro currículo grátis.",
  keywords: "emprego Portugal, curriculo IA, encontrar trabalho, emprego 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
       
          {children}
       
      </body>
    </html>
  );
}