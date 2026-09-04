"use client";

import { Instagram, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-graphite-900 py-14">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="PsekPisos"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              PsekPisos — sinteco, restauração e verniz para pisos de madeira.
              Trabalho técnico com garantia e acabamento premium.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-300">
              Site
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                { href: "#servicos", label: "Serviços" },
                { href: "#processo", label: "Processo" },
                { href: "#galeria", label: "Galeria" },
                { href: "#sobre", label: "Sobre" },
                { href: "#contato", label: "Contato" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-300">
              Fale com a gente
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  <Phone className="h-4 w-4" /> (11) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/psekpisos"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  <Instagram className="h-4 w-4" /> @psekpisos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-10" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PsekPisos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
