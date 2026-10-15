"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const shots = [
  {
    src: "/fotos/sala-brilho-teka.jpg",
    alt: "Sala de estar com piso de madeira em alto brilho",
    span: "md:col-span-2 md:row-span-2",
    caption: "Alto brilho · Teka",
  },
  {
    src: "/fotos/aplicacao-verniz-lareira.jpg",
    alt: "Aplicação de verniz em sala com lareira",
    span: "",
    caption: "Aplicação · Verniz",
  },
  {
    src: "/fotos/detalhe-pincel-tacos.jpg",
    alt: "Aplicação manual de acabamento em tacos",
    span: "",
    caption: "Detalhe · Pincel",
  },
  {
    src: "/fotos/dupla-aplicacao-sala.jpg",
    alt: "Dupla aplicando sinteco em sala clara",
    span: "md:col-span-2",
    caption: "Equipe · Em obra",
  },
];

export function Gallery() {
  return (
    <section id="galeria" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Galeria"
          title={
            <>
              Antes e depois em cada{" "}
              <span className="text-gold-shine">tábua</span>
            </>
          }
          description="Um recorte das últimas obras. Nada de imagem de banco: tudo o que aparece aqui foi feito pela nossa equipe."
        />

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {shots.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-graphite-800 ${s.span}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-900/90 via-graphite-900/10 to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
                  {s.caption}
                </span>
                <span className="h-px flex-1 mx-4 bg-gradient-to-r from-gold-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
