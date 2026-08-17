/**
 * Hero — Fase 2/4
 * - Entrada orquestrada (fotografia, filete, headline por linhas, apoio)
 * - Parallax discreto na fotografia, apenas com transform
 * Sem biblioteca de animação. Tudo em rAF e composited layers.
 */

const PARALLAX_STRENGTH = 0.12;
const PARALLAX_MAX = 90; // px

export function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  /* -------- Entrada -------- */
  // Dois rAF: garante que o navegador pintou o estado inicial escondido antes
  // de trocar para o visível — em um só frame a transição seria ignorada.
  const start = () => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => hero.classList.add('is-ready'))
    );
  };

  const heroImg = hero.querySelector('[data-hero-image]');
  if (heroImg && !heroImg.complete) {
    // Espera a fotografia (ou a sua falha) para não animar sobre um vazio
    heroImg.addEventListener('load', start, { once: true });
    heroImg.addEventListener('error', start, { once: true });
    // Rede lenta não pode segurar a headline
    setTimeout(start, 900);
  } else {
    start();
  }

  /* -------- Parallax -------- */
  const layer = hero.querySelector('[data-parallax]');
  if (!layer) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    // Para de calcular quando o hero já saiu da tela
    if (y < window.innerHeight) {
      const offset = Math.min(y * PARALLAX_STRENGTH, PARALLAX_MAX);
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}
