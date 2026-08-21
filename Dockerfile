# ==========================================================================
# Imagem do site — Robson Lopes
#
# O site é estático e não tem etapa de build: nenhum npm, nenhum bundler.
# A imagem é só o nginx com os arquivos dentro, o que a mantém pequena e
# faz o deploy no EasyPanel levar segundos.
#
# No EasyPanel, o "Build Path" deste serviço precisa ser /robson-lopes —
# o repositório guarda o app FlyDelivery na raiz, e o site numa subpasta.
# ==========================================================================

FROM nginx:stable-alpine

# A configuração entra antes dos arquivos: assim uma mudança no conteúdo do
# site não invalida a camada da configuração no cache do Docker.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# O que NÃO deve ir para o ar (README, DEPLOY.md, wrangler.toml, MEDIA.md,
# o próprio Dockerfile) está listado no .dockerignore.
COPY . /usr/share/nginx/html

# Documental: quem publica a porta é o EasyPanel, não o contêiner.
EXPOSE 80

# Falha visível em vez de silenciosa — o painel marca o serviço como não
# saudável se o site parar de responder.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
