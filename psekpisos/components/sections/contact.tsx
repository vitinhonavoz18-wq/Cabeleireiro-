"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const info = [
  { icon: Phone, label: "Telefone", value: "(11) 99999-9999" },
  { icon: Mail, label: "E-mail", value: "contato@psekpisos.com.br" },
  { icon: MapPin, label: "Atendimento", value: "Grande São Paulo · SP" },
  { icon: Clock, label: "Horário", value: "Seg-Sáb · 08h-19h" },
];

export function Contact() {
  return (
    <section id="contato" className="relative py-24 md:py-32">
      <div className="container">
        <div className="overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-graphite-800 via-graphite-900 to-black shadow-deep">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            {/* Lado esquerdo — proposta + info */}
            <div className="p-8 md:p-12 lg:p-16">
              <SectionHeading
                center={false}
                eyebrow="Fale com a gente"
                title={
                  <>
                    Peça seu orçamento{" "}
                    <span className="text-gold-shine">agora</span>
                  </>
                }
                description="Resposta em até 1 hora útil. Sem burocracia, sem taxa de visita para orçamentos na Grande São Paulo."
              />

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="lg">
                    <MessageCircle className="h-4 w-4" />
                    Chamar no WhatsApp
                  </Button>
                </a>
                <a href="tel:+5511999999999">
                  <Button variant="secondary" size="lg">
                    <Phone className="h-4 w-4" /> Ligar agora
                  </Button>
                </a>
              </div>

              <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                {info.map((it) => (
                  <motion.div
                    key={it.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-card/50 p-4"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-graphite-900">
                      <it.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {it.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-foreground">
                        {it.value}
                      </dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>

            {/* Lado direito — form */}
            <form
              className="flex flex-col gap-4 border-t border-white/5 bg-graphite-900/60 p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-16"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const nome = fd.get("nome") ?? "";
                const area = fd.get("area") ?? "";
                const msg = fd.get("mensagem") ?? "";
                const texto = encodeURIComponent(
                  `Olá, PsekPisos!\n\nMeu nome é ${nome}. Tenho aproximadamente ${area} m² de piso.\n\n${msg}`
                );
                window.open(
                  `https://wa.me/5511999999999?text=${texto}`,
                  "_blank"
                );
              }}
            >
              <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                Solicite um orçamento
              </h3>
              <p className="text-sm text-muted-foreground">
                Preencha os campos e enviamos direto para o WhatsApp.
              </p>

              <Field label="Seu nome" name="nome" required />
              <Field label="Telefone" name="telefone" type="tel" required />
              <Field label="Área aproximada (m²)" name="area" type="number" />
              <Field
                label="Conte um pouco sobre o piso"
                name="mensagem"
                textarea
              />

              <Button type="submit" size="lg" className="mt-2">
                Enviar pelo WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const shared =
    "peer w-full rounded-xl border border-white/10 bg-graphite-900/60 px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-all focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20";
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          required={required}
          className={shared + " resize-none"}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={shared}
        />
      )}
    </label>
  );
}
