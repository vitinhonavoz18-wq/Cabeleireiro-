# Publicar o site

O site é estático e não tem build. Qualquer hospedagem de arquivos serve.
Abaixo, os dois caminhos na Cloudflare, onde a ConectFly já tem conta.

## Endereço

`robsonlopes.conectfly.com.br` — já configurado no `wrangler.toml`, no
`index.html` (canonical, Open Graph, dados estruturados), no `sitemap.xml`
e no `robots.txt`.

A zona `conectfly.com.br` precisa estar na Cloudflare, na mesma conta do
deploy. Estando, o registro DNS do subdomínio é criado pelo próprio deploy —
não é preciso mexer no painel.

## Caminho 1 — Worker (um comando)

```bash
cd robson-lopes
npx wrangler login      # só na primeira vez
npx wrangler deploy
```

Sai um endereço `robson-lopes.<sua-conta>.workers.dev` para teste imediato,
e o subdomínio definitivo assim que o DNS propagar.

## Caminho 2 — Cloudflare Pages (conectado ao repositório)

Útil se quiser que cada push atualize o site sozinho.

1. Painel da Cloudflare → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Repositório `vitinhonavoz18-wq/Flydelivery`,
   branch `claude/robson-lopes-fase-1-5808qp`.
3. **Build command:** deixe vazio.
   **Build output directory:** `robson-lopes`.
4. Depois de publicar: **Custom domains** → adicionar o subdomínio.

## Modo apresentação (estado atual)

O site está publicado como **apresentação**, não como lançamento. Três coisas
marcam isso, e as três são intencionais:

| Onde | Estado | Por quê |
| --- | --- | --- |
| `scripts/site.config.js` | `previa.marcaDagua: true` | marca da ConectFly sobre a tela |
| `index.html` | `<meta name="robots" content="noindex, nofollow">` | endereço provisório não deve ser indexado |
| `robots.txt` | `Disallow: /` | mesma razão, no nível do rastreador |

Sem isso, o Google indexaria uma versão com marca d'água e dados pendentes
num subdomínio que depois seria abandonado — o que compete com o domínio
definitivo em vez de ajudar.

O card de compartilhamento (`assets/brand/og-image.jpg`, 1200×630) já existe,
então o link colado no WhatsApp abre com a imagem da marca.

## Checklist de entrega ao cliente

1. `scripts/site.config.js` → `previa.marcaDagua: false`.
2. `scripts/site.config.js` → preencher WhatsApp, Instagram, e-mail,
   horários e o complemento do endereço (torre, andar, sala, CEP).
3. `index.html` → trocar o `noindex, nofollow` por
   `index, follow, max-image-preview:large`.
4. `robots.txt` → `Disallow: /` vira `Allow: /`.
5. Se o domínio definitivo for outro, trocar o endereço em `index.html`
   (canonical, `og:url`, `og:image`, `twitter:image` e os dados estruturados),
   `sitemap.xml`, `robots.txt` e `wrangler.toml`.
