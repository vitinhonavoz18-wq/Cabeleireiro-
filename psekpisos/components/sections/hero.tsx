"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Background: madeira polida em sala clara */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/fotos/sala-brilho-teka.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          onError={(e) => (e.currentTarget.style.opacity = "0")}
        />
      </div>
      {/* Vignette + tint */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-graphite-900/85 via-graphite-900/55 to-graphite-900" />
      <div className="absolute inset-0 -z-10 bg-hero-vignette" />

      <div className="container relative flex min-h-[100svh] flex-col justify-end pb-16 pt-40 md:pb-24 md:pt-44">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-graphite-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Sinteco premium
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl xl:text-8xl"
          >
            Seu piso de madeira{" "}
            <span className="text-gold-shine">novo de novo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Sinteco, restauração de tacos e aplicação de verniz com acabamento
            espelhado. Recuperamos o brilho, protegemos a madeira e devolvemos
            valor ao seu imóvel — sem sujeira e no prazo combinado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#contato">
              <Button size="lg">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#galeria">
              <Button variant="secondary" size="lg">
                Ver transformações
              </Button>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            <HeroBadge
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Garantia real"
              text="12 meses de garantia no acabamento aplicado."
            />
            <HeroBadge
              icon={<Sparkles className="h-5 w-5" />}
              title="Acabamento espelhado"
              text="Alto brilho, semibrilho ou fosco a seu critério."
            />
            <HeroBadge
              icon={<Clock className="h-5 w-5" />}
              title="Prazo respeitado"
              text="Entrega no dia combinado, sem surpresas."
            />
          </motion.ul>
        </div>
      </div>

      {/* linha ouro */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

function HeroBadge({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="glass flex items-start gap-3 rounded-2xl p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-gradient text-graphite-900">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {title}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}
