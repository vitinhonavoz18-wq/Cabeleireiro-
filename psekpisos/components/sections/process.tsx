"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    n: "01",
    title: "Avaliação técnica",
    text: "Visitamos o local, medimos a área, identificamos o tipo de madeira e o estado do piso. Você recebe o orçamento por escrito em até 24h.",
  },
  {
    n: "02",
    title: "Raspagem controlada",
    text: "Máquinas com aspiração acoplada removem o acabamento antigo praticamente sem poeira. Móveis grandes ficam no local, protegidos.",
  },
  {
    n: "03",
    title: "Calafetação e selagem",
    text: "Frestas fechadas com massa da cor da madeira. Aplicação de seladora que uniformiza tom e prepara o piso para o verniz.",
  },
  {
    n: "04",
    title: "Acabamento em três demãos",
    text: "Aplicação técnica do verniz escolhido, com lixamento fino entre demãos. Resultado: profundidade, brilho controlado e proteção duradoura.",
  },
  {
    n: "05",
    title: "Entrega e garantia",
    text: "Vistoria com o cliente, orientação de uso e garantia de 12 meses sobre o acabamento aplicado.",
  },
];

export function Process() {
  return (
    <section id="processo" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-graphite-800/30" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="container">
        <SectionHeading
          eyebrow="Processo"
          title={
            <>
              Cinco etapas.{" "}
              <span className="text-gold-shine">Zero improviso.</span>
            </>
          }
          description="Método que se repete em cada obra — porque previsibilidade é o que separa um bom acabamento de um problema recorrente."
        />

        <ol className="mx-auto mt-16 max-w-4xl">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative grid grid-cols-[auto_1fr] items-start gap-6 border-l border-white/5 pb-10 pl-6 md:gap-10 md:pl-10"
            >
              <span
                aria-hidden
                className="absolute -left-3 top-0 grid h-6 w-6 place-items-center rounded-full border border-gold-400/40 bg-graphite-900 text-[10px] font-bold text-gold-300"
              >
                {step.n.slice(-1)}
              </span>
              <span className="font-display text-5xl leading-none text-gold-shine md:text-7xl">
                {step.n}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-2xl uppercase tracking-wide text-foreground md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {step.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
