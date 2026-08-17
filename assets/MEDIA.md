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

### Arquivos das fases 3 e 4

```
portfolio-01.jpg … portfolio-08.jpg   → Portfólio e carrossel
antes-01.jpg / depois-01.jpg          → Comparador (mesmo enquadramento!)
processo-01.jpg                       → Bastidores
```

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
