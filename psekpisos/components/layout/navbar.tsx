"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border border-white/5 px-4 py-2 transition-all duration-500",
            scrolled
              ? "bg-graphite-900/80 backdrop-blur-xl shadow-deep"
              : "bg-transparent"
          )}
        >
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="PsekPisos"
              className="h-10 w-auto object-contain md:h-12"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="hidden text-lg font-display uppercase tracking-widest text-gold-shine sm:inline">
              PsekPisos
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
              <Button size="sm">
                <Phone className="h-4 w-4" /> Orçamento
              </Button>
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="container mt-2 md:hidden"
          >
            <div className="glass flex flex-col gap-2 rounded-3xl p-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="mt-2"
              >
                <Button size="md" className="w-full">
                  <Phone className="h-4 w-4" /> Falar no WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
