"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Hammer,
  Brush,
  Layers,
  ShieldCheck,
  Ruler,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    icon: Sparkles,
    title: "Sinteco completo",
    description:
      "Raspagem, calafetação, seladora e três demãos de resina. Piso 100% renovado, com acabamento espelhado.",
  },
  {
    icon: Brush,
    title: "Aplicação de verniz",
    description:
      "Verniz poliuretano de alta durabilidade. Escolha entre alto brilho, semibrilho ou fosco.",
  },
  {
    icon: Hammer,
    title: "Restauração de tacos",
    description:
      "Reposição de peças, nivelamento e fixação. Cuidamos até dos tacos mais antigos.",
  },
  {
    icon: Layers,
    title: "Manutenção anual",
    description:
      "Uma demão de conservação por ano preserva o brilho e evita o custo de um sinteco completo.",
  },
  {
    icon: ShieldCheck,
    title: "Impermeabilização",
    description:
      "Camada protetora contra umidade, riscos e manchas. Ideal para áreas de alto tráfego.",
  },
  {
    icon: Ruler,
    title: "Orçamento no local",
    description:
      "Avaliação técnica gratuita: metragem, estado do piso e escolha do acabamento no mesmo dia.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Cuidado <span className="text-gold-shine">completo</span> para o
              seu piso
            </>
          }
          description="Do sinteco tradicional à manutenção anual, entregamos cada etapa com técnica, produtos premium e time treinado."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-card/70 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-graphite-900 shadow-gold">
                <s.icon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
