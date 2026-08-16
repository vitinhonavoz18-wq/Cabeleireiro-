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

Nomenclatura sugerida (facilita a curadoria automática nas fases 2–4):

```
retrato-robson-01.jpg        → Hero e seção Sobre
resultado-loiro-01.jpg       → Portfólio / carrossel
resultado-morena-01.jpg      → Portfólio / carrossel
antes-01.jpg / depois-01.jpg → Comparador antes e depois (mesmo enquadramento)
processo-01.jpg              → Bastidores / especialidades
```

### Curadoria já definida a partir das 4 fotos enviadas

| Imagem enviada | Melhor uso |
| --- | --- |
| Morena iluminada, cabelo ondulado, fundo do salão | **Hero** (vertical, olhar em câmera, alto contraste) |
| Loiro acinzentado, close frontal | **Portfólio** — destaque de coloração fria |
| Loiro dourado, cabelo longo, fundo cimento queimado | **Portfólio** / abertura do carrossel — a mais editorial |
| Loiro mel com franja, blusa marrom | **Transformações** — leitura clara de luz e movimento |

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
