# Publicar o site

O site é estático e não tem build. Qualquer hospedagem de arquivos serve.
Abaixo, os caminhos na Cloudflare, onde a ConectFly já tem conta.

**Estado atual:** o Worker `robsonlopessss` existe e já detém o subdomínio,
mas contém o bundle do app SiteCreatorFly/ConectFly — por isso o endereço
responde com a página errada. Falta publicar este site por cima dele.

## Endereço

`robsonlopes.conectfly.com.br` — já configurado no `wrangler.toml`, no
`index.html` (canonical, Open Graph, dados estruturados), no `sitemap.xml`
e no `robots.txt`.

A zona `conectfly.com.br` precisa estar na Cloudflare, na mesma conta do
deploy. Estando, o registro DNS do subdomínio é criado pelo próprio deploy —
não é preciso mexer no painel.

## Caminho 1 — Workers Builds, direto do painel (sem computador)

É o caminho para quem está no tablet ou no celular: **não precisa de terminal,
não precisa de token, não precisa instalar nada.** A Cloudflare passa a
construir e publicar o Worker sozinha a cada push no repositório.

1. Painel da Cloudflare → **Workers & Pages** → abra o Worker
   **`robsonlopessss`**.
2. **Settings** → **Builds** → **Connect**, e autorize o GitHub.
3. Repositório `vitinhonavoz18-wq/Flydelivery`.
4. **Root directory:** `robson-lopes` — sem isso a Cloudflare procura o
   `wrangler.toml` na raiz do repositório e a build falha.
5. **Build command:** deixe **vazio**. O site não tem etapa de build.
6. **Deploy command:** `npx wrangler deploy` (é o padrão).
7. **Branch control** → mude a branch de produção para
   `claude/robson-lopes-fase-1-5808qp`. O padrão é a branch principal do
   repositório, onde este site não existe.
8. Salve e faça a build rodar. Todo push nessa branch republica o site.

O nome do Worker no painel **precisa ser igual** ao `name` do `wrangler.toml`
— é exigência da Cloudflare, e é por isso que o `name` aqui é
`robsonlopessss` e não `robson-lopes`.

## Caminho 2 — Worker por linha de comando

```bash
cd robson-lopes
npx wrangler login      # só na primeira vez
npx wrangler deploy
```

O `name` do `wrangler.toml` é **`robsonlopessss`**, que é o Worker já criado
na conta e já ligado ao subdomínio. Isso é proposital: o deploy sobrescreve
esse Worker e o site entra no ar na hora. Se o nome fosse outro, o wrangler
criaria um Worker novo e o subdomínio continuaria servindo o conteúdo antigo.

⚠️ O deploy **substitui inteiramente** o código desse Worker. Ele foi criado
para este site; confirme que não está servindo nada mais.

## Caminho 3 — Cloudflare Pages (conectado ao repositório)

Alternativa ao caminho 1. Exige mover o domínio personalizado do Worker
para o projeto Pages depois de publicar.

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
