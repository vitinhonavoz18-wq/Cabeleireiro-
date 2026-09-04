"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: "t1",
    quote:
      "Chegaram no horário, protegeram tudo e entregaram o piso brilhando como nunca. Um ano depois, continua igualzinho.",
    author: "Marina S.",
    role: "Apartamento · Perdizes",
  },
  {
    id: "t2",
    quote:
      "Contratei para restaurar tacos antigos que eu achava perdidos. O resultado foi melhor que a expectativa e o preço, justo.",
    author: "Ricardo A.",
    role: "Casa · Alto de Pinheiros",
  },
  {
    id: "t3",
    quote:
      "Equipe cuidadosa, obra limpa e um acabamento espelhado impressionante. Recomendo de olhos fechados.",
    author: "Camila F.",
    role: "Escritório · Vila Olímpia",
  },
  {
    id: "t4",
    quote:
      "Fizeram sinteco em três ambientes e cumpriram o prazo à risca. Voltaram no vencimento da garantia para conferir.",
    author: "Otávio L.",
    role: "Casa · Granja Viana",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const total = testimonials.length;
  const t = testimonials[i];

  const next = useCallback(() => setI((v) => (v + 1) % total), [total]);
  const prev = useCallback(() => setI((v) => (v - 1 + total) % total), [total]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Depoimentos"
          title={
            <>
              O que dizem quem já{" "}
              <span className="text-gold-shine">pisou de novo</span>
            </>
          }
          description="Feedback real de clientes que renovaram seus pisos com a PsekPisos."
        />

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative rounded-3xl border border-white/5 bg-card/70 p-8 md:p-12">
            <div className="mb-6 flex items-center gap-1 text-gold-400">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[8rem]"
              >
                <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-gradient font-bold text-graphite-900">
                    {t.author[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-gold-400">/</span>{" "}
                {String(total).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={prev}
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={next}
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
