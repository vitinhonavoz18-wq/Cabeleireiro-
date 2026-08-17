# Materiais de mídia — Robson Lopes

Os arquivos enviados no chat **não chegam ao repositório automaticamente**.
Para que o site use as imagens oficiais, elas precisam ser commitadas nestas
pastas com os nomes abaixo.

## Situação atual

Os seis arquivos enviados no chat já estão no repositório, processados:

| Arquivo | Onde aparece |
| --- | --- |
| `brand/robson-lopes-mark.webp` | Header — símbolo |
| `brand/robson-lopes-wordmark.webp` | Header — assinatura, ao lado do símbolo |
| `brand/robson-lopes-logo.webp` | Rodapé — lockup completo |
| `fotos/robson-retrato.webp` | **Hero** |
| `fotos/loiro-dourado-01.webp` | Seção de loiros · parede · portfólio |
| `fotos/loiro-acinzentado-01.webp` | Parede · portfólio |
| `fotos/loiro-mel-01.webp` | Parede |
| `fotos/loiro-franja-01.webp` | Parede · portfólio |
| `fotos/loiro-bege-01.webp` | Parede · portfólio |
| `fotos/loiro-luminoso-01.webp` | Parede |
| `fotos/ruivo-acobreado-01.webp` | Parede · portfólio |
| `fotos/morena-iluminada-01.webp` | Parede · portfólio |

São **oito fotografias** e **cinco vídeos**, um por card da parede — sem
repetição. Entre as fotos: seis loiros, um ruivo e uma morena iluminada.

### Vídeos — `assets/videos/`

| Arquivo | Conteúdo |
| --- | --- |
| `transformacao-escuro-marrom` | Do escuro ao marrom iluminado, com Robson conduzindo |
| `transformacao-loiro-iluminado` | Do escuro ao loiro |
| `loiro-platinado-processo` | Construção de um loiro claro |
| `antes-depois-loiro` | Antes e depois de um loiro personalizado |
| `bastidores-salao` | Finalização no salão |

Cada vídeo tem três arquivos: `.webm` (VP9), `.mp4` (H.264) e `-poster.jpg`.

**Processamento:** áudio removido (exigência do autoplay silencioso),
reduzidos a 540×960 e recomprimidos — de 24 MB somados para 11 MB nos dois
formatos, dos quais cada navegador baixa só um. Os pôsteres são escolhidos
automaticamente entre cinco instantes do vídeo, ficando com o quadro de maior
detalhe: isso descarta flashes brancos e cortes escuros.

**Marcas removidas por corte, mantendo 9:16 exatos:**

| Vídeo | Corte | O que saiu |
| --- | --- | --- |
| `transformacao-loiro-iluminado` | topo 68px | marca do CapCut |
| `antes-depois-loiro` | topo 68px | marca do CapCut |
| `loiro-platinado-processo` | topo 68px e base 90px | CapCut e crédito sobreposto |

O corte duplo do terceiro dá um zoom de ~14%; nos outros, ~5%. Ambos ficam
imperceptíveis no tamanho em que os cards são exibidos. Os originais intactos
não estão no repositório — se precisar reverter, é preciso reenviá-los.

## O que ainda falta

| Slot | Por que importa |
| --- | --- |
| Foto real do Robson trabalhando | A seção **Sobre Robson** hoje exibe o vídeo de bastidores. Funciona bem, mas uma fotografia própria daria mais nitidez e mais controle de enquadramento. |
| Fotos de **corte** e de **tratamento** | As oito atuais são todas de coloração. O ruivo e a morena iluminada já quebram a leitura de "só faz loiro", mas corte e tratamento aparecem no texto sem prova visual. |
| **Antes e depois** (par de fotos) | O bloco segue oculto. Existe material da mesma sessão dentro dos vídeos, mas o "depois" está espelhado e com enquadramento diferente — num slider isso vira um salto. Precisa de duas fotos com o mesmo enquadramento. |

> **Antes de enviar material novo:** duas das imagens recebidas eram a mesma
> fotografia em recortes diferentes. A verificação foi feita por assinatura
> perceptual (dHash 16×16), que sobrevive a recompressão e redimensionamento —
> comparar bytes ou tamanho de arquivo não detecta esse caso.

### Como adicionar mídia nova

Cada card da parede e cada peça do portfólio é um `<figure>` em `index.html`.
Para incluir material novo, copie um bloco existente e troque o arquivo, a
proporção (`data-ratio`), a etiqueta e a legenda. Nada mais precisa mudar: a
duplicação da trilha, o lightbox e o carregamento sob demanda se ajustam
sozinhos ao número de cards.

Proporções disponíveis em `data-ratio`: `portrait` (3:4), `tall` (4:5),
`square` (1:1), `landscape` (3:2) e `story` (9:16, usada nos vídeos).

**Ao acrescentar fotos, mantenha o equilíbrio do acervo.** A proporção atual
— seis loiros para um ruivo e uma morena iluminada — foi calibrada para o
loiro ler como assinatura sem parecer que é a única coisa que ele faz.

### Antes e depois — regra de honestidade

```
antes-01.jpg   +   depois-01.jpg
```

O bloco de comparação **só entra no ar quando as duas imagens existirem**
(verificado em `scripts/compare.js`). Se faltar uma, a seção inteira é
ocultada — nenhum par é montado artificialmente.

Requisitos do par: mesmo enquadramento, mesma distância, mesma iluminação e
**a mesma cliente no mesmo atendimento**. Fotos de procedimentos diferentes
não servem, e frames de vídeo com a câmera espelhada também não.

### Novos vídeos

- Vertical 9:16, **sem áudio**, até ~15 s.
- Gere `.webm` (VP9), `.mp4` (H.264) e `-poster.jpg` com os mesmos nomes.
- Nenhum vídeo é baixado até o card se aproximar da tela; no máximo três
  tocam ao mesmo tempo; e nada é baixado em 2G ou com economia de dados.

## Recomendações técnicas

- Largura máxima útil: **1600px** para full-bleed, **1200px** para grid.
- Comprimir antes de subir; acima de ~500 KB por arquivo o ganho visual some
  e o custo de carregamento não.
- Fotos de clientes exigem autorização de uso de imagem.
