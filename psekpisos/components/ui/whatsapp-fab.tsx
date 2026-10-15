"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function WhatsAppFAB() {
  return (
    <motion.a
      href={site.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-graphite-900 shadow-gold ring-1 ring-gold-400/40 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold-400/40" />
    </motion.a>
  );
}
