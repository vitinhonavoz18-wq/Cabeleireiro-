# Materiais de mídia — Robson Lopes

Os arquivos enviados no chat **não chegam ao repositório automaticamente**.
Para que o site use as imagens oficiais, elas precisam ser commitadas nestas
pastas com os nomes abaixo.

## Situação atual

Os seis arquivos enviados no chat já estão no repositório, processados:

| Arquivo | Onde aparece |
| --- | --- |
| `brand/robson-lopes-wordmark.webp` | Header |
| `brand/robson-lopes-logo.webp` | Rodapé |
| `brand/robson-lopes-mark.webp` | Reserva (selo, favicon) |
| `fotos/robson-retrato.webp` | **Hero** |
| `fotos/loiro-dourado-01.webp` | Seção de loiros · parede · portfólio |
| `fotos/loiro-acinzentado-01.webp` | Parede · portfólio |
| `fotos/loiro-mel-01.webp` | Parede |
| `fotos/loiro-franja-01.webp` | Parede · portfólio |
| `fotos/loiro-bege-01.webp` | Parede · portfólio |
| `fotos/loiro-luminoso-01.webp` | Parede |
| `fotos/ruivo-acobreado-01.webp` | Parede · portfólio |
| `fotos/morena-iluminada-01.webp` | Parede · portfólio |

São **oito fotografias de trabalho distintas**, uma por card da parede — sem
repetição. Seis são loiro, uma é ruivo e uma é morena iluminada.

**Processamento aplicado:** a logo veio sobre fundo preto texturizado — o fundo
foi removido por chave de luminância e a arte recortada em três peças. As fotos
de trabalho foram redimensionadas para 1400px no lado maior e reencodadas em
WebP (de ~1,6 MB somados para ~845 KB). O retrato já era um recorte com canal
alfa e foi apenas reencodado.

## O que ainda falta

| Slot | Por que importa |
| --- | --- |
| `fotos/robson-atendimento.jpg` | Única mídia ausente que deixa um espaço vazio visível, na seção **Sobre Robson**. Robson trabalhando, vertical 4:5. |
| Fotos de **corte** e de **tratamento** | As oito atuais são todas de coloração. O ruivo e a morena iluminada já quebram a leitura de "só faz loiro", mas corte e tratamento aparecem no texto sem prova visual. |
| **Vídeos** | Os cards de vídeo foram retirados da parede até existirem arquivos. Ver seção de vídeos abaixo. |
| **Antes e depois** | O bloco continua oculto: exige um par do mesmo atendimento. |

> **Antes de enviar material novo:** duas das imagens recebidas eram a mesma
> fotografia em recortes diferentes. A verificação foi feita por assinatura
> perceptual (dHash 16×16), que sobrevive a recompressão e redimensionamento —
> comparar bytes ou tamanho de arquivo não detecta esse caso.

### Arquivos da Fase 3 — parede diagonal e portfólio

A parede tem hoje **8 cards** (4 por fileira) e o portfólio **4**, todos já
apontando para fotos reais. As tabelas abaixo listam os nomes sugeridos para o
material adicional — cada arquivo novo vira um card a mais.

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

## 3. Recomendações técnicas

- Largura máxima útil: **1600px** para full-bleed, **1200px** para grid.
- Comprimir antes de subir; acima de ~500 KB por arquivo o ganho visual some
  e o custo de carregamento não.
- Fotos de clientes exigem autorização de uso de imagem.
