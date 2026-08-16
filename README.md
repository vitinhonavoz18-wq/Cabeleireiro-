# Robson Lopes — Cabeleireiro

Site institucional premium. Projeto **independente** do app FlyDelivery que vive
neste mesmo repositório: nenhum arquivo do app foi alterado.

## Status das fases

| Fase | Escopo | Situação |
| --- | --- | --- |
| **1/4** | Fundação, tokens, arquitetura, header, estrutura de seções | ✅ concluída |
| 2/4 | Hero principal, apresentação profissional, posicionamento | ⏳ aguardando |
| 3/4 | Carrossel de fotos e vídeos, portfólio, antes e depois | ⏳ aguardando |
| 4/4 | Conversão, serviços, responsividade final, SEO, performance | ⏳ aguardando |

## Stack

Sem framework e sem build step, por decisão de projeto:

- **HTML semântico** — SEO e acessibilidade nativos, sem hidratação.
- **CSS moderno** — custom properties, `clamp()`, `grid`, `aspect-ratio`,
  `backdrop-filter`. Zero framework de estilo.
- **JavaScript ES modules** — `IntersectionObserver` puro para animações.
  Nenhuma dependência de terceiros; nenhuma biblioteca de animação.

O bundle de JS do site inteiro fica na casa de poucos KB, o que sustenta os
Core Web Vitals sem trabalho de otimização posterior.

### Por que não Expo / React Native Web

O repositório hospeda o app FlyDelivery em Expo + expo-router. Essa stack renderiza
via JavaScript, sem HTML servido, o que é ruim para SEO, para o LCP e para o
comportamento editorial que um site de marca exige. Manter o site isolado
preserva integralmente o app e entrega a melhor performance possível.

## Rodar localmente

```bash
cd robson-lopes
python3 -m http.server 4173
# http://localhost:4173
```

Qualquer servidor estático serve. Não há instalação de dependências.

## Estrutura

```
robson-lopes/
├── index.html            # página única, seções ancoradas
├── styles/
│   ├── tokens.css        # ← identidade visual: cor, tipografia, espaço, movimento
│   ├── base.css          # reset, tipografia, botões
│   ├── layout.css        # containers, grid, seções, proporções de mídia
│   ├── motion.css        # microanimações e prefers-reduced-motion
│   ├── header.css        # header premium + menu mobile
│   └── sections.css      # hero, faixa de autoridade, footer
├── scripts/
│   ├── main.js           # bootstrap
│   ├── site.config.js    # ← dados de marca e contato (fonte única)
│   ├── header.js         # scroll, menu, scrollspy
│   └── reveal.js         # reveal + barra de progresso
└── assets/
    ├── MEDIA.md          # ← como enviar logo, fotos e vídeos
    ├── brand/  fotos/  videos/
```

## Identidade visual

Extraída da logo oficial:

| Papel | Token | Valor |
| --- | --- | --- |
| Fundo | `--ink-900` | `#050505` |
| Dourado primário | `--gold-400` | `#CFA74F` |
| Dourado claro | `--gold-300` | `#E2C179` |
| Off-white | `--bone-50` | `#F6F3EE` |
| Texto secundário | `--neutral-400` | `#A5A19A` |

**Regra do dourado:** destaque, nunca preenchimento. Por tela, no máximo um
botão sólido dourado, um filete e uma ou duas palavras em `.text-metal`.

**Tipografia:** Cormorant Garamond (serif editorial) nos títulos, Inter (sans)
em interface e texto corrido. Escala fluida com `clamp()` — o layout nunca
depende de zoom do navegador.

## Pendências de conteúdo

Marcadas como `PENDENTE` em `scripts/site.config.js`: número de WhatsApp,
Instagram, endereço, cidade e e-mail. As perguntas objetivas virão ao final da
Fase 4, conforme combinado.
