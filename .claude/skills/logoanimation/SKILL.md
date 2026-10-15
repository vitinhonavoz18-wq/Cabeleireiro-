---
name: logoanimation
description: Cria uma animação premium de entrada para qualquer logomarca em sites, inspirada em "SVG path draw": a marca é desenhada por traços, ganha preenchimento sólido e então revela o conteúdo da página. Funciona com SVG, PNG, WebP e JPG, com fallback automático e respeito a reduced motion.
---

# Universal Logo Reveal Animation

## Objetivo

Ao receber uma logomarca e um projeto web, implemente uma animação de abertura elegante em que:

1. a tela de intro aparece limpa e sem ruído visual;
2. a geometria da logo começa como traços finos;
3. os traços são desenhados progressivamente;
4. a construção pode acontecer em caminhos/camadas com pequeno `stagger`;
5. ao terminar o desenho, a logo recebe seu preenchimento final;
6. o traço desaparece suavemente;
7. a logo permanece em destaque por um curto período;
8. a intro sai com fade/scale sutil;
9. o conteúdo real da página entra sem salto de layout.

A referência visual é um efeito de **SVG path draw + fill reveal**, e não uma rotação, bounce ou spinner.

---

## Quando usar esta skill

Use esta skill quando o usuário pedir, por exemplo:

- animação de entrada da logo;
- intro de site com logo;
- desenhar a logo ao carregar;
- animação semelhante a assinatura/desenho vetorial;
- splash screen premium;
- logo reveal;
- animação para qualquer logo PNG/SVG;
- reproduzir o efeito em que o contorno aparece primeiro e o preenchimento vem depois.

Não use uma animação genérica de `fadeIn` se a intenção for reproduzir o desenho progressivo da marca.

---

## Stack preferencial

Em projetos React/Next.js:

- React
- TypeScript
- Tailwind CSS
- Framer Motion / Motion

Se o projeto já usa outra biblioteca de motion, preserve a stack existente.

Evite adicionar dependências pesadas se a animação puder ser feita com SVG + CSS.

---

## Contrato de entrada

A implementação deve conseguir receber:

```ts
type LogoRevealProps = {
  src: string;
  alt: string;
  duration?: number;
  hold?: number;
  background?: string;
  maxWidth?: number | string;
  className?: string;
  onComplete?: () => void;
  showOncePerSession?: boolean;
};
```

Também aceite SVG inline quando disponível:

```ts
type VectorLogoRevealProps = {
  paths: Array<{
    d: string;
    fill?: string;
    stroke?: string;
  }>;
  viewBox: string;
};
```

---

# REGRA PRINCIPAL: preserve a identidade da logo

Nunca redesenhe a marca de forma criativa.

A animação deve preservar:

- proporção original;
- cores finais;
- espessuras;
- símbolo;
- tipografia;
- espaçamento;
- orientação;
- transparência;
- relação entre símbolo e lettering.

É permitido criar uma versão vetorial auxiliar apenas para a fase de traçado, mas o estado final deve corresponder visualmente ao arquivo original fornecido.

---

# Pipeline por tipo de arquivo

## 1. SVG — caminho ideal

Se a logo já for SVG:

1. leia o `viewBox`;
2. mantenha cada `<path>`, `<line>`, `<polyline>`, `<polygon>`, `<circle>` etc.;
3. normalize cada elemento para uma animação baseada em comprimento de caminho;
4. use `pathLength="1"` quando aplicável;
5. inicie com:
   - `strokeDasharray: 1`;
   - `strokeDashoffset: 1`;
   - `fillOpacity: 0`;
6. anime o `strokeDashoffset` de `1` para `0`;
7. depois anime `fillOpacity` de `0` para `1`;
8. reduza `strokeOpacity` de `1` para `0`;
9. preserve o preenchimento/colorido original no estado final.

Para várias partes da logo, aplique `staggerChildren` sutil.

### Comportamento desejado

```txt
estado inicial
  ↓
traço invisível
  ↓
traço começa a ser desenhado
  ↓
geometria completa
  ↓
preenchimento surge
  ↓
traço desaparece
  ↓
logo sólida
  ↓
hold curto
  ↓
revelação da interface
```

---

## 2. PNG / WebP com transparência

Não tente aplicar `stroke-dashoffset` diretamente na imagem raster.

Use o seguinte processo:

### Estratégia

- Preserve a imagem original para o estado final.
- Crie ou derive um SVG auxiliar de contorno/silhueta para a fase de desenho.
- Anime o SVG auxiliar.
- Faça `crossfade` para o PNG/WebP original ao concluir o traçado.

Se houver ferramenta de build disponível, a vetorização do contorno pode ser feita com uma biblioteca como `potrace`, apenas como etapa de preparação do asset.

O arquivo raster original continua sendo a fonte de verdade visual.

### Resultado

Mesmo que a logo seja colorida, com degradê ou textura:

- a introdução pode ser desenhada em linha monocromática;
- o estado final deve revelar a logo original sem perda de fidelidade.

---

## 3. JPG sem transparência

Primeiro identifique/remova o fundo quando tecnicamente seguro.

Se a remoção automática gerar bordas ruins:

- não destrua a logo;
- use o arquivo original como estado final;
- gere somente um contorno auxiliar aproximado para a fase de desenho.

Nunca aplique um recorte agressivo que altere o lettering.

---

# Timeline recomendada

A animação deve parecer sofisticada, e não lenta.

Base recomendada:

```txt
0.00s – 0.10s   intro pronta / fundo visível
0.10s – 1.20s   desenho dos caminhos
1.00s – 1.55s   últimos paths terminam com stagger
1.35s – 1.85s   preenchimento da marca entra
1.45s – 1.90s   traço desaparece
1.85s – 2.35s   hold da logo completa
2.35s – 2.75s   intro sai
2.45s – 2.90s   página real entra
```

Duração total alvo: aproximadamente **2.5 a 3 segundos**.

Para logos complexas, pode chegar a 3.5 s, mas evite intros longas.

---

# Easing

Prefira easing suave e controlado.

Para o desenho:

```ts
ease: [0.22, 1, 0.36, 1]
```

Para a saída:

```ts
ease: [0.4, 0, 0.2, 1]
```

Não use elasticidade, bounce ou spring exagerado.

---

# Movimento da logo

A animação principal é o desenho.

Movimentos adicionais devem ser quase imperceptíveis:

```txt
scale inicial: 0.96–0.98
scale final: 1
y inicial: 4–8px
y final: 0
```

Evite:

- girar 360°;
- pulsar;
- saltar;
- zoom agressivo;
- blur excessivo;
- glow forte;
- partículas desnecessárias.

---

# Implementação React / Framer Motion

Estrutura conceitual:

```tsx
<motion.div className="fixed inset-0 z-[9999] grid place-items-center">
  <motion.svg>
    {paths.map((path, index) => (
      <motion.path
        key={index}
        d={path.d}
        pathLength={1}
        initial={{
          pathLength: 0,
          fillOpacity: 0,
          strokeOpacity: 1,
        }}
        animate={{
          pathLength: 1,
          fillOpacity: 1,
          strokeOpacity: 0,
        }}
        transition={{
          pathLength: {
            duration: 1.1,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          },
          fillOpacity: {
            duration: 0.45,
            delay: 1.2 + index * 0.02,
          },
          strokeOpacity: {
            duration: 0.35,
            delay: 1.35 + index * 0.02,
          },
        }}
      />
    ))}
  </motion.svg>
</motion.div>
```

Essa é uma referência estrutural. Adapte ao SVG real em vez de substituir a marca por um desenho genérico.

---

# Arquitetura recomendada

Crie:

```txt
/components/ui/logo-reveal.tsx
/components/ui/logo-reveal-provider.tsx   // opcional
/lib/logo-reveal.ts                       // helpers, se necessário
/public/brand/...                         // assets da marca
```

O componente precisa ser independente da página.

Uso desejado:

```tsx
<LogoReveal
  src="/brand/logo.svg"
  alt="Nome da marca"
  background="#f7f5ed"
  showOncePerSession
/>
```

---

# Intro sobre a aplicação

A intro deve existir como overlay:

```css
position: fixed;
inset: 0;
z-index: alto;
```

A página pode estar renderizada por baixo desde o início.

Ao terminar:

- fade da intro;
- `pointer-events: none`;
- remova o overlay do DOM;
- não navegue para outra rota apenas para encerrar a animação.

Isso evita tela branca e melhora a percepção de velocidade.

---

# Entrada do conteúdo

A entrada da página deve ser sincronizada com o final da logo.

Use uma transição curta, por exemplo:

```txt
opacity: 0 → 1
transform: translateY(8px) → translateY(0)
duration: 350–500ms
```

Não faça todos os cards da página entrarem individualmente logo após a intro; isso aumenta a sensação de lentidão.

---

# Exibir uma vez ou sempre

Por padrão em produção, prefira:

- primeira visita da sessão: animação completa;
- navegação interna: sem repetir;
- reload explícito: pode repetir conforme requisito do projeto.

Exemplo:

```ts
const key = "brand-intro-seen";

if (sessionStorage.getItem(key)) {
  // pular intro
} else {
  sessionStorage.setItem(key, "1");
}
```

Se o usuário pedir que a intro apareça em toda visita, respeite.

---

# Reduced Motion

Sempre respeite:

```ts
const shouldReduceMotion = useReducedMotion();
```

Com `prefers-reduced-motion`:

- pule o path draw;
- mostre a logo rapidamente;
- use apenas um fade curto;
- não atrase o acesso ao conteúdo.

---

# Performance

A animação deve rodar de forma fluida em celular.

Obrigatório:

- preferir `transform` e `opacity`;
- evitar filtros animados pesados;
- evitar sombras enormes;
- não atualizar React a cada frame;
- não usar canvas se SVG resolver;
- não carregar bibliotecas de animação duplicadas;
- otimizar SVG removendo metadados inúteis;
- limitar paths extremamente detalhados quando eles não mudarem a percepção visual;
- não bloquear interação além da duração da intro;
- evitar layout shift.

Meta: aparência de 60 fps em aparelhos móveis comuns.

---

# SVGs complexos

Se o SVG tiver centenas ou milhares de paths:

1. agrupe elementos visualmente relacionados;
2. reduza pontos redundantes;
3. preserve o desenho;
4. anime grupos em vez de microfragmentos quando necessário;
5. não aplique delay individual excessivo.

O efeito deve parecer contínuo, não uma montagem peça por peça lenta.

---

# Logos com texto

Para logotipos que misturam ícone e lettering:

Ordem recomendada:

1. símbolo;
2. lettering;
3. preenchimento final dos dois.

Alternativa quando o lettering for muito complexo:

1. desenhe apenas o símbolo;
2. revele o nome com máscara/fade curto;
3. finalize a marca completa.

Nunca transforme fonte oficial em uma fonte aproximada.

---

# Logos multicoloridas

Durante o traçado, duas estratégias são permitidas:

### A. Traço monocromático
Ideal para intro premium e limpa.

### B. Traço por cor original
Cada path utiliza a própria cor da marca.

No preenchimento final, sempre preserve as cores oficiais.

---

# Fundo da intro

O fundo deve derivar da identidade visual da página.

Preferência:

- branco/quase branco para marcas escuras;
- preto/quase preto para marcas claras;
- cor institucional somente se houver contraste excelente.

Evite gradientes decorativos se não fizerem parte da linguagem visual da marca.

---

# Estado de loading

A logo reveal não deve depender de uma espera artificial.

Se a página já estiver pronta, a intro segue sua timeline normal.

Se existirem recursos críticos ainda carregando:

- nunca deixe a animação congelada;
- conclua o reveal;
- use uma estratégia de loading separada se necessário.

Não transforme a logo em spinner infinito.

---

# Acessibilidade

Obrigatório:

- `aria-hidden="true"` no SVG puramente decorativo;
- conteúdo real da página deve continuar semanticamente correto;
- não mover foco para a intro;
- respeitar `prefers-reduced-motion`;
- contraste adequado;
- não usar flashes.

---

# Responsividade

A logo deve usar tamanho fluido:

```css
width: min(42vw, 220px);
```

Ajuste conforme o tipo de marca.

Em mobile:

```txt
largura visual recomendada: 120–190px
```

Em desktop:

```txt
largura visual recomendada: 160–260px
```

Não deixe a logo encostar nas bordas.

---

# Critérios de aceite

A tarefa só está concluída quando:

- [ ] a logo fornecida foi preservada;
- [ ] o desenho progressivo funciona;
- [ ] o preenchimento final aparece de forma suave;
- [ ] o traço some no final;
- [ ] não há bounce/spinner genérico;
- [ ] a intro não causa layout shift;
- [ ] funciona em desktop e mobile;
- [ ] respeita reduced motion;
- [ ] SVGs complexos continuam fluidos;
- [ ] PNG/WebP/JPG têm fallback coerente;
- [ ] a página entra suavemente ao fim da intro;
- [ ] não há loop infinito;
- [ ] a animação pode ser reutilizada trocando apenas o asset da logo.

---

# Regra de decisão automática

Ao receber uma nova logo:

```txt
É SVG?
  ├─ sim → animar paths reais
  └─ não
      ├─ tem transparência? → gerar contorno auxiliar + crossfade para raster original
      └─ fundo sólido → extrair/estimar contorno auxiliar + preservar imagem original como final
```

---

# Resultado esperado

O componente final deve permitir que o desenvolvedor troque:

```tsx
src="/logos/cliente-a.svg"
```

por:

```tsx
src="/logos/cliente-b.png"
```

sem reescrever a lógica da animação.

A skill deve sempre priorizar:

**fidelidade da marca → suavidade → performance → reutilização.**
