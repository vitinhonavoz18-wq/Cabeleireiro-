import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Sinteco, Restauração e Verniz em ${site.location.city}`,
  description: `${site.name}: sinteco premium, restauração de tacos e aplicação de verniz com acabamento espelhado em ${site.location.region}. Orçamento sem compromisso.`,
  openGraph: {
    title: `${site.name} — Sinteco Premium em ${site.location.city}`,
    description: `Devolvemos o brilho dos seus pisos de madeira: sinteco, restauração, verniz e manutenção em ${site.location.region}.`,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/brand/favicon.svg" },
  alternates: { canonical: site.url },
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
