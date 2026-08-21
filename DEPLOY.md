# Publicar o site

O site é estático e não tem build. Qualquer hospedagem de arquivos serve.

**Caminho em uso: VPS própria com EasyPanel** — é o Caminho 0, logo abaixo.
Os caminhos 1 a 3 descrevem a publicação na Cloudflare e ficam registrados
como alternativa.

## Caminho 0 — VPS com EasyPanel (em uso)

O EasyPanel monta cada serviço como um contêiner Docker e põe um Traefik na
frente, que cuida do domínio e do certificado HTTPS sozinho. Por isso este
repositório traz um `Dockerfile`: ele é só o nginx com os arquivos dentro,
sem npm e sem etapa de build, então o deploy leva segundos.

Três arquivos sustentam esse caminho, todos em `robson-lopes/`:

| Arquivo | Para quê |
| --- | --- |
| `Dockerfile` | nginx alpine + os arquivos do site |
| `nginx.conf` | compressão, cache por tipo de arquivo e cabeçalhos de segurança |
| `.dockerignore` | mantém README, DEPLOY.md, MEDIA.md e wrangler.toml fora do ar |

### 1. Apontar o DNS

Antes de criar o serviço, crie um registro **A** do domínio do salão para o
**IP da VPS**. O Traefik só consegue emitir o certificado Let's Encrypt
depois que o domínio já resolve para o servidor — se criar o serviço antes,
a emissão falha e é preciso repetir.

### 2. Criar o serviço no EasyPanel

**Create Service → App.** Na aba **Source**:

- **GitHub** → repositório `vitinhonavoz18-wq/Flydelivery`
- **Branch:** `claude/website-updates-8tiixx`

> O repositório é **privado**. O EasyPanel gera uma chave SSH para o serviço;
> copie a chave pública e cadastre no GitHub em **Settings → Deploy keys** do
> repositório, como **somente leitura**. Sem isso o clone falha.

Na aba **Build**:

- **Método:** `Dockerfile`
- **Build Path:** `/robson-lopes` ← **o passo que mais se erra.** O
  repositório guarda o app FlyDelivery na raiz e o site nesta subpasta; sem
  isso o EasyPanel procura um Dockerfile na raiz e a build quebra.
- **File:** deixe vazio (ele assume `Dockerfile` dentro do Build Path). Se a
  build reclamar que não encontrou o arquivo, preencha
  `/robson-lopes/Dockerfile`.

### 3. Domínio e HTTPS

Na aba **Domains**, adicione o domínio do salão e aponte para a **porta 80**
— é a porta em que o nginx do contêiner escuta. Ative o HTTPS; o certificado
é emitido e renovado sozinho.

O `nginx.conf` **não trata de HTTPS de propósito**: dentro do contêiner só
existe HTTP na porta 80, porque quem termina o TLS é o Traefik do painel.
Duplicar isso no nginx criaria redirecionamento em loop.

### 4. Publicar

**Deploy.** A cada `git push` nessa branch, o EasyPanel reconstrói e
republica — não é preciso voltar no painel.

### Conferir depois de subir

```bash
# Deve responder 200 e sem marca d'água
curl -sI https://SEU-DOMINIO/ | head -1

# Arquivos de projeto não podem estar no ar — os quatro devem dar 404
for f in README.md DEPLOY.md wrangler.toml assets/MEDIA.md; do
  echo "$f -> $(curl -s -o /dev/null -w '%{http_code}' https://SEU-DOMINIO/$f)"
done
```

---

## Caminhos na Cloudflare (alternativa)

**Estado do Worker:** o Worker `robsonlopessss` existe e já detém o
subdomínio, mas contém o bundle do app SiteCreatorFly/ConectFly — por isso o
endereço responde com a página errada.

## Endereço

`robsonlopes.conectfly.com.br` — já configurado no `wrangler.toml`, no
`index.html` (canonical, Open Graph, dados estruturados), no `sitemap.xml`
e no `robots.txt`.

### Por que o endereço usa rota e não Custom Domain

A zona `conectfly.com.br` já tem o Worker `conectfly` numa **rota curinga**:
é ele que gera os subdomínios dos cardápios dos clientes. Isso não pode ser
alterado.

Rotas rodam **antes** de Custom Domains — o Worker da rota atende a
requisição e só passa adiante se chamar `fetch()`. Um Custom Domain neste
hostname, portanto, nunca seria alcançado: o curinga responderia primeiro.

A saída é uma **rota mais específica**, que vence a curinga por cobrir um
único hostname. É o que está no `wrangler.toml`. O curinga continua intacto
e os cardápios seguem funcionando.

**Requisito:** rotas não criam DNS. O hostname `robsonlopes` precisa de um
registro **proxiado** (nuvem laranja) na zona. Se a zona já tem um registro
curinga `*`, ele cobre.

**Conflito:** um hostname não pode ser Custom Domain e rota ao mesmo tempo.
Se algum Custom Domain para este endereço tiver sido criado no painel,
remova-o antes do próximo deploy.

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

## Saída do modo apresentação

O site nasceu em modo **apresentação**, para ser mostrado ao cliente antes da
venda. Três coisas marcavam isso. A primeira já saiu:

| Onde | Estado | Situação |
| --- | --- | --- |
| `scripts/site.config.js` | `previa.marcaDagua: false` | ✅ **feito** — a marca da ConectFly saiu da tela |
| `index.html` | `<meta name="robots" content="noindex, nofollow">` | ⏳ aguarda o domínio definitivo |
| `robots.txt` | `Disallow: /` | ⏳ mesma razão, no nível do rastreador |

As duas pendentes andam juntas e dependem de uma decisão que não é técnica:
enquanto o endereço no ar for provisório, liberar a indexação faz esse
endereço competir no Google com o domínio definitivo. **Ao publicar no
domínio final**, libere as duas de uma vez.

O card de compartilhamento (`assets/brand/og-image.jpg`, 1200×630) já existe,
então o link colado no WhatsApp abre com a imagem da marca.

## Checklist de entrega ao cliente

1. ✅ `scripts/site.config.js` → `previa.marcaDagua: false`.
2. ✅ WhatsApp e Instagram preenchidos. **Conferir o número antes de
   divulgar**: foi informado (71) 8159-7670, com oito dígitos, e o cadastrado
   é `5571981597670` — (71) 9 8159-7670, com o nono dígito que todo celular
   da Bahia tem.
3. ⏳ `scripts/site.config.js` → falta **horários**, **e-mail** e o
   **logradouro** (rua, número e CEP).
4. ⏳ Foto do salão: commitar `assets/fotos/salao-fachada.webp` (ver
   `assets/MEDIA.md`). Até lá a seção Localização mostra o estado vazio "RL".
5. ⏳ `index.html` → trocar o `noindex, nofollow` por
   `index, follow, max-image-preview:large`.
6. ⏳ `robots.txt` → `Disallow: /` vira `Allow: /`.
7. ⏳ Domínio definitivo: trocar o endereço em `index.html` (canonical,
   `og:url`, `og:image`, `twitter:image` e os dados estruturados),
   `sitemap.xml` e `robots.txt` — e, se ainda usar a Cloudflare, no
   `wrangler.toml`.
