# Deploy do preview na Vercel (60s)

O site vive em `psekpisos/` dentro deste repo — o resto da raiz é outro
projeto. Por isso a única coisa que muda no fluxo padrão da Vercel é
apontar a Root Directory pra `psekpisos`.

## Passo a passo

1. Abre https://vercel.com/new
2. Faz login com o mesmo GitHub que dono do repo (vitinhonavoz18-wq).
3. Clica **Import** ao lado de `Cabeleireiro-`.
4. Na tela de configuração:
   - **Framework Preset:** Next.js (auto-detectado)
   - **Root Directory:** clica em **Edit** e escolhe `psekpisos`
   - **Build/Output/Install:** deixa o padrão (já tem `vercel.json` com
     os valores corretos)
   - **Branch:** `claude/sinteco-presentation-site-xehz05`
5. **Deploy.**

Em ~60s a Vercel devolve uma URL tipo `https://<projeto>.vercel.app`.
Toda vez que houver push nessa branch, sai um novo preview automático.

## Para trocar por dados reais antes de mandar

- WhatsApp: buscar `5511999999999` em `components/` e substituir.
- E-mail: buscar `contato@psekpisos.com.br`.
- Instagram: buscar `@psekpisos` e `instagram.com/psekpisos`.
