# Publicar o site

O site é estático e não tem build. Qualquer hospedagem de arquivos serve.
Abaixo, os dois caminhos na Cloudflare, onde a ConectFly já tem conta.

## Antes de qualquer coisa

Confirme o domínio. O `wrangler.toml` está com `robsonlopes.conectfly.com.br`,
que é uma **suposição** a partir do identificador do app FlyDelivery
(`br.com.conectfly.flydelivery`). Troque pelo domínio real.

A zona precisa já estar na Cloudflare. Se estiver, o registro DNS do
subdomínio é criado pelo próprio deploy — não é preciso mexer no painel.

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

## Depois de publicar

Três arquivos ainda apontam para `robsonlopes.com.br` e precisam do endereço
definitivo: a tag `canonical` e o Open Graph no `index.html`, o `sitemap.xml`
e o `robots.txt`.

Enquanto o site for só apresentação, vale manter em `robots.txt`:

```
User-agent: *
Disallow: /
```

Assim o Google não indexa uma versão com marca d'água e dados pendentes.

## Ao entregar ao cliente

Em `scripts/site.config.js`, trocar `previa.marcaDagua` para `false` — é o
que remove a marca da ConectFly da tela.
