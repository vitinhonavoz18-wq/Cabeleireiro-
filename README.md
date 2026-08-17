# Robson Lopes — Cabeleireiro

Site institucional premium. Projeto **independente** do app FlyDelivery que vive
neste mesmo repositório: nenhum arquivo do app foi alterado.

## Status das fases

| Fase | Escopo | Situação |
| --- | --- | --- |
| **1/4** | Fundação, tokens, arquitetura, header, estrutura de seções | ✅ concluída |
| **2/4** | Hero, competências, Sobre Robson, assinatura em loiros | ✅ concluída |
| **3/4** | Parede diagonal, portfólio, lightbox, antes e depois | ✅ concluída |
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
│   ├── fonts.css         # @font-face das fontes auto-hospedadas
│   ├── base.css          # reset, tipografia, botões
│   ├── layout.css        # containers, grid, proporções e estados de mídia
│   ├── motion.css        # microanimações e prefers-reduced-motion
│   ├── header.css        # header premium + menu mobile
│   ├── hero.css          # hero dividido + faixa de competências
│   ├── about.css         # Sobre Robson + assinatura em loiros
│   ├── showcase.css      # parede diagonal + grade do portfólio
│   ├── lightbox.css      # visualização ampliada
│   ├── compare.css       # comparador antes/depois
│   └── sections.css      # footer e blocos gerais
├── scripts/
│   ├── main.js           # bootstrap
│   ├── site.config.js    # ← dados de marca e contato (fonte única)
│   ├── header.js         # scroll, menu, scrollspy
│   ├── hero.js           # entrada orquestrada + parallax
│   ├── showcase.js       # motor da parede diagonal + vídeos sob demanda
│   ├── lightbox.js       # visualização ampliada, teclado e swipe
│   ├── compare.js        # comparador antes/depois
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

## Posicionamento (Fase 2)

Robson é apresentado como **cabeleireiro completo** — cortes, tratamentos e
transformações — com o loiro tratado como **assinatura**, não como limite. Isso
aparece em três camadas:

1. **Faixa de competências** sob o hero: quatro áreas, e só a quarta (Loiros)
   recebe realce dourado e o selo "Assinatura".
2. **Sobre Robson**: o texto abre pela atuação ampla e só então chega ao loiro.
3. **Seção de loiros**: conta a especialização como processo em três tempos
   (diagnóstico → construção da luz → tonalização), e fecha com uma nota
   explícita de que a mesma exigência vale para todo o resto do trabalho.

A headline do hero usa a sugestão original — "Beleza, técnica e transformação
em cada detalhe." — com "transformação" em dourado metálico. Alternativa
pronta para troca de uma linha em `index.html`, caso se prefira algo mais
conceitual: *"Cada transformação começa por um olhar."*

## Parede diagonal (Fase 3)

Motor de trilha próprio, sem Swiper nem qualquer biblioteca de carrossel:

- duas trilhas contínuas em direções opostas, inclinadas em conjunto;
- **um único `requestAnimationFrame`** conduz todas as trilhas, escrevendo
  `translate3d` — o trabalho fica no compositor, sem layout por frame;
- o laço é infinito por duplicação do grupo de cards, e a posição é sempre
  normalizada dentro de um ciclo, então não acumula erro em sessões longas;
- **hover desacelera** para 18% em vez de travar de uma vez; foco por teclado
  para totalmente;
- **arraste** com Pointer Events no mobile e no desktop, com limiar que
  impede o swipe de abrir o lightbox por engano;
- o `rAF` é **desligado** quando a seção sai da tela ou a aba perde o foco.

Vídeos usam `preload="none"` e só recebem `src` quando o card se aproxima da
tela; pausam ao sair; e nem chegam a ser baixados em conexões 2G ou com
economia de dados ativa.

Em `prefers-reduced-motion` a parede vira uma faixa estática que o próprio
usuário rola — sem inclinação, sem movimento e sem perder nenhum card.

**Carga inicial medida: 31 requisições, 240 KB** (majoritariamente as fontes),
com zero vídeo baixado.

## Pendências de conteúdo

Marcadas como `PENDENTE` em `scripts/site.config.js`: número de WhatsApp,
Instagram, endereço, cidade e e-mail. As perguntas objetivas virão ao final da
Fase 4, conforme combinado.
