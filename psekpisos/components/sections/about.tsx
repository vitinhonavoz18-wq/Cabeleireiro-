"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const bullets = [
  "Equipe própria treinada — sem terceirização.",
  "Máquinas com aspiração para obra praticamente sem poeira.",
  "Produtos de alta durabilidade, resistentes a UV e umidade.",
  "Garantia formal de 12 meses no acabamento aplicado.",
];

const stats = [
  { n: "+800", label: "Ambientes entregues" },
  { n: "12 anos", label: "de estrada" },
  { n: "12 meses", label: "de garantia" },
  { n: "4,9/5", label: "de avaliação média" },
];

export function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 shadow-deep"
          >
            <img
              src="/fotos/detalhe-pincel-tacos.jpg"
              alt="Detalhe da aplicação do verniz nos tacos"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
                PsekPisos · Sinteco Premium
              </p>
              <p className="mt-2 font-display text-2xl uppercase leading-tight text-foreground">
                Feito à mão. Feito para durar.
              </p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Sobre a PsekPisos"
              center={false}
              title={
                <>
                  Especialistas em{" "}
                  <span className="text-gold-shine">pisos de madeira</span>
                </>
              }
              description="Nasce em 2013 uma equipe pequena com um método rigoroso. Mais de uma década depois, seguimos com o mesmo compromisso: entregar o piso brilhando e no prazo — e voltar depois de um ano para conferir se continua assim."
            />

            <ul className="mt-8 grid gap-3">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 text-base text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/5 bg-card/60 p-4 text-center"
                >
                  <dt className="font-display text-2xl text-gold-shine">
                    {s.n}
                  </dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
