# Materiais de mídia — Robson Lopes

Os arquivos enviados no chat **não chegam ao repositório automaticamente**.
Para que o site use as imagens oficiais, elas precisam ser commitadas nestas
pastas com os nomes abaixo.

## 1. Marca — `assets/brand/`

| Arquivo | Uso | Observação |
| --- | --- | --- |
| `robson-lopes-logo.png` | Header e rodapé | Logo oficial **com fundo transparente** (PNG). O arquivo enviado tem fundo preto sólido; recortar o fundo evita o "quadrado" sobre fotografias. |
| `robson-lopes-logo-mark.png` | Monograma RL isolado | Para favicon, selo e usos pequenos. |
| `apple-touch-icon.png` | iOS | 180×180. |
| `favicon.svg` | Aba do navegador | **Provisório** — hoje é apenas "RL" na tipografia da marca. Substituir pelo recorte do monograma oficial. |

> Nenhuma logo nova foi criada. Enquanto o PNG oficial não estiver aqui, o site
> exibe automaticamente o nome "Robson Lopes / Cabeleireiro" na tipografia da
> marca (fallback declarado em `scripts/main.js`).

## 2. Fotografias — `assets/fotos/`

### Arquivos que a Fase 2 já referencia (obrigatórios)

| Arquivo | Onde aparece | Enquadramento ideal |
| --- | --- | --- |
| `robson-retrato.jpg` | **Hero** | Retrato vertical do Robson, 3:4 ou 4:5. No desktop ocupa a metade direita; no mobile, a tela inteira. Deixe espaço à esquerda do rosto — é onde entra o texto. |
| `robson-atendimento.jpg` | Seção **Sobre Robson** | Robson trabalhando, vertical 4:5. |
| `loiro-assinatura.jpg` | Seção **Um olhar especial para os loiros** | O melhor resultado em loiro, vertical 4:5. |

> ⚠️ **Não há fotografia do Robson entre os arquivos enviados até agora** —
> as quatro imagens recebidas são resultados em clientes. O hero e a seção
> Sobre exibem um estado vazio elegante até que `robson-retrato.jpg` e
> `robson-atendimento.jpg` sejam adicionados. É o material mais importante
> que falta no projeto.

Cada arquivo aceita também a versão `.webp` de mesmo nome — o site já usa
`<picture>` e serve o WebP automaticamente quando existir.

### Arquivos da Fase 3 — parede diagonal e portfólio

A parede tem 15 cards (13 fotos + 2 vídeos) e o portfólio tem 6. Cada slot já
está nomeado no `index.html`; basta subir o arquivo com o nome correspondente.

**Fileira 1 da parede**

| Arquivo | Formato | Legenda |
| --- | --- | --- |
| `loiro-01.jpg` | vertical 4:5 | Loiro iluminado com raiz esfumada |
| `corte-01.jpg` | vertical 3:4 | Corte repicado com movimento |
| `procedimento-01.mp4` + `procedimento-01-poster.jpg` | vertical 9:16 | Mechas em construção |
| `loiro-02.jpg` | vertical 3:4 | Loiro acinzentado |
| `tratamento-01.jpg` | horizontal 3:2 | Brilho e reconstrução do fio |
| `morena-01.jpg` | vertical 3:4 | Morena iluminada com ondas |
| `loiro-03.jpg` | vertical 4:5 | Loiro mel com franja |
| `finalizacao-01.jpg` | quadrado 1:1 | Ondas amplas e definidas |

**Fileira 2 da parede**

| Arquivo | Formato | Legenda |
| --- | --- | --- |
| `resultado-01.mp4` + `resultado-01-poster.jpg` | vertical 9:16 | Movimento do loiro |
| `corte-02.jpg` | vertical 3:4 | Corte médio com franja cortina |
| `loiro-04.jpg` | vertical 4:5 | Loiro frio de raiz esfumada |
| `coloracao-01.jpg` | horizontal 3:2 | Ruivo acobreado |
| `loiro-05.jpg` | vertical 3:4 | Mechas douradas |
| `detalhe-01.jpg` | quadrado 1:1 | Transição de raiz |
| `transformacao-01.jpg` | vertical 3:4 | Do escuro ao loiro em etapas |

**Portfólio:** `portfolio-01.jpg` … `portfolio-06.jpg` (verticais 4:5).

> A proporção de loiros (6 de 15 na parede, 3 de 6 no portfólio) foi calibrada
> de propósito: presença forte o bastante para virar assinatura, variedade
> suficiente para não parecer que ele só faz loiro. Se trocar os arquivos,
> mantenha esse equilíbrio.

### Antes e depois — regra de honestidade

```
antes-01.jpg   +   depois-01.jpg
```

O bloco de comparação **só entra no ar quando as duas imagens existirem**
(verificado em `scripts/compare.js`). Se faltar uma, a seção inteira é
ocultada — nenhum par é montado artificialmente.

Requisitos do par: mesmo enquadramento, mesma distância, mesma iluminação e
**a mesma cliente no mesmo atendimento**. Fotos de procedimentos diferentes
não servem.

### Vídeos

- H.264/MP4, **sem áudio**, até 1080p e idealmente abaixo de 6 MB.
- O `-poster.jpg` é obrigatório: é ele que aparece antes do vídeo carregar e
  o que evita um retângulo preto no lugar do card.
- Nenhum vídeo é baixado até o card se aproximar da tela, e o site nem tenta
  baixá-los em conexões 2G ou com economia de dados ligada.

### Curadoria já definida a partir das 4 fotos enviadas

| Imagem enviada | Melhor uso | Motivo |
| --- | --- | --- |
| Loiro dourado, cabelo longo, fundo de cimento queimado | **`loiro-assinatura.jpg`** — seção de loiros | A mais editorial das quatro: luz lateral, fundo neutro, mechas com leitura clara de profundidade |
| Loiro acinzentado, close frontal | Portfólio — destaque de coloração fria | Mostra domínio do tom frio, mas o close deixa pouco espaço de composição |
| Morena iluminada, ondulado, fundo do salão | Portfólio / carrossel | Prova de trabalho em cabelos não loiros — importante para o posicionamento completo |
| Loiro mel com franja, blusa marrom | Transformações | Boa leitura de movimento e finalização |

Todas são verticais (3:4 / 4:5), o que combina com as proporções já definidas
em `styles/layout.css` (`.ratio--portrait`, `.ratio--tall`).

## 3. Vídeos — `assets/videos/`

```
processo-01.mp4   (H.264, ≤ 1080p, sem áudio para autoplay silencioso)
resultado-01.mp4
poster-processo-01.jpg  (frame de capa — evita tela preta e melhora o LCP)
```

## 4. Recomendações técnicas

- Exportar também em **WebP** (ou AVIF) além do JPG — o site usará `<picture>`.
- Largura máxima útil: **1600px** para full-bleed, **1200px** para grid.
- Manter os originais fora do repositório se ultrapassarem ~500 KB por arquivo.
- Fotos de clientes exigem autorização de uso de imagem.
