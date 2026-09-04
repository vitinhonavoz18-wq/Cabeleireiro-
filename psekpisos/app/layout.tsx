import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PsekPisos — Sinteco, Restauração e Aplicação de Verniz em Pisos de Madeira",
  description:
    "PsekPisos: sinteco premium, restauração de tacos e aplicação de verniz com acabamento espelhado. Orçamento sem compromisso, atendimento em toda a região.",
  openGraph: {
    title: "PsekPisos — Sinteco Premium",
    description:
      "Devolvemos o brilho dos seus pisos de madeira: sinteco, restauração, verniz e manutenção.",
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/brand/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
