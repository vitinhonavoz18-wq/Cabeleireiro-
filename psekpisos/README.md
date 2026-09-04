# PsekPisos — Site apresentativo

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Lucide.

## Rodar localmente

```bash
cd psekpisos
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Estrutura

- `app/` — layout, página inicial e estilos globais
- `components/ui/` — primitivos reutilizáveis (Button, LogoReveal, SectionHeading, WhatsAppFAB)
- `components/layout/` — Navbar e Footer
- `components/sections/` — Hero, Services, Process, Gallery, About, Testimonials, Contact
- `lib/utils.ts` — helper `cn()`
- `public/brand/` — logo e favicon
- `public/fotos/` — fotos de obras

## Animação da logo

Implementada em `components/ui/logo-reveal.tsx` seguindo o pipeline da skill
Universal Logo Reveal: traço → preenchimento → crossfade para a logo raster
oficial. Exibida uma vez por sessão, respeita `prefers-reduced-motion`.

## Substituir o WhatsApp / Instagram / e-mail

Buscar por `5511999999999`, `contato@psekpisos.com.br` e `@psekpisos` para
trocar em Navbar, Hero, Contact, Footer e FAB.
