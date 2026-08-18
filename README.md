# Robson Lopes — Cabeleireiro

Site institucional premium. Projeto **independente** do app FlyDelivery que vive
neste mesmo repositório: nenhum arquivo do app foi alterado.

## Status das fases

| Fase | Escopo | Situação |
| --- | --- | --- |
| **1/4** | Fundação, tokens, arquitetura, header, estrutura de seções | ✅ concluída |
| **2/4** | Hero, competências, Sobre Robson, assinatura em loiros | ✅ concluída |
| **3/4** | Parede diagonal, portfólio, lightbox, antes e depois | ✅ concluída |
| **4/4** | Especialidades, arte do loiro, conversão, SEO, auditoria | ✅ concluída |

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
│   ├── services.css      # especialidades, arte do loiro, prova social, CTA
│   └── sections.css      # footer, botão flutuante e blocos gerais
├── scripts/
│   ├── main.js           # bootstrap
│   ├── site.config.js    # ← dados de marca e contato (fonte única)
│   ├── header.js         # scroll, menu, scrollspy
│   ├── hero.js           # entrada orquestrada + parallax
│   ├── showcase.js       # motor da parede diagonal + vídeos sob demanda
│   ├── lightbox.js       # visualização ampliada, teclado e swipe
│   ├── compare.js        # comparador antes/depois
│   ├── contact.js        # WhatsApp, Instagram, endereço e botão flutuante
│   └── reveal.js         # reveal + barra de progresso
├── robots.txt · sitemap.xml · site.webmanifest
└── assets/
    ├── MEDIA.md          # ← como enviar logo, fotos e vídeos
    ├── brand/  fonts/  fotos/  videos/
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

**A logo é usada em três peças**, todas recortadas do arquivo oficial: o
símbolo (monograma) e a assinatura tipográfica lado a lado no header, e o
lockup completo no rodapé. O lockup oficial é empilhado, com proporção 1,12:1
— numa barra de 46px o nome sairia com 5px de altura, ilegível.

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

## Auditoria final (Fase 4)

Tudo medido em Chromium real, não estimado.

| Item | Resultado |
| --- | --- |
| Overflow horizontal | nenhum em 320, 360, 375, 390, 412, 430, 768, 834, 1024, 1366, 1440, 1920 e 2560 px |
| Console | sem erros; os 404 restantes são as mídias ainda não enviadas |
| Contraste | todo texto ≥ 4,95:1 (AA exige 4,5:1) |
| Headings | um único `h1`, sem saltos de nível |
| Teclado | skip link no primeiro Tab, foco sempre visível, lightbox por Enter/setas/ESC, foco devolvido ao card |
| Links | nenhuma âncora quebrada, nenhum `target="_blank"` sem `noopener` |
| Carga inicial | 33 requisições, 265 KB, zero vídeo baixado |
| Movimento reduzido | animações desligadas e nenhum conteúdo inacessível |

### Correções aplicadas nesta fase

- `--text-faint` estava em **2,66:1** — reprovado no AA. Ajustado para ~5,2:1.
- Numerais em `--gold-700` davam 3,41:1; passaram para `--gold-500` (6,85:1).
- A barra do header transbordava entre 1024 e 1179 px: o menu desktop agora
  começa em 1180 px.
- Botões estouravam o contêiner em 320 px por causa do tracking largo.
- A logo do rodapé exibia o texto alternativo quebrado — a regra de fallback
  só cobria a classe do header.
- `<address>` herdava o itálico padrão do navegador.
- O botão flutuante cobria os ícones sociais do rodapé.
- Sete conceitos numa grade de duas colunas deixavam uma célula vazia com
  aparência de card quebrado.

## Marca d'água de apresentação

Enquanto o site é mostrado ao cliente antes da venda, a marca da ConectFly
fica sobreposta e centralizada na tela, a 45% de opacidade, acompanhando a
rolagem.

Ela é fixa e `pointer-events: none`: **não intercepta nenhum clique, toque ou
arraste**, não entra no fluxo do documento e não gera rolagem. Fica acima até
do lightbox, para que nenhuma tela escape da marcação, e sai da impressão.

**Para remover na entrega**, troque um booleano:

```js
// scripts/site.config.js
export const previa = {
  marcaDagua: false,
};
```

## Personalização

**Tudo o que falta de dado real está em `scripts/site.config.js`**, marcado
como `PENDENTE`: WhatsApp, Instagram, horários, e-mail e o complemento do
endereço (torre, andar, sala e CEP).

Já preenchido: **Salvador, BA — Empresarial Mundo Plaza**. A cidade entra no
`<title>`, na description, no Open Graph e no `PostalAddress` dos dados
estruturados. Só a localidade foi declarada no schema: número e logradouro
não foram inventados, porque endereço incorreto em SEO local penaliza em vez
de ajudar.
Preencher esse arquivo atualiza header, hero, CTA, rodapé, botão flutuante e
todos os links de uma só vez — não é preciso editar HTML.

Enquanto um campo estiver vazio, a tela mostra "a confirmar" e os botões de
WhatsApp apontam para a seção de contato. Nada é inventado.

Outros pontos que aguardam material real:

- **Fotos e vídeos** — inventário completo em `assets/MEDIA.md`.
- **Depoimentos** — a seção tem um modelo comentado no HTML; nenhum
  depoimento, nome ou nota foi criado.
- **Antes e depois** — o bloco só aparece com as duas imagens do par.
- **Domínio** — marcado como `TODO personalização` no `index.html`,
  `sitemap.xml` e `robots.txt`.
