/**
 * Microanimações de entrada — Robson Lopes
 * IntersectionObserver puro: nenhuma biblioteca de animação.
 * Respeita prefers-reduced-motion (o CSS já neutraliza o movimento).
 */

export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal], .draw-line');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    // threshold 0 + margem inferior negativa: dispara assim que o elemento
    // cruza 10% acima da borda inferior. Blocos mais altos que a viewport
    // (seções full-bleed) também são revelados corretamente.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Barra capilar de progresso de leitura no topo.
 */
export function initProgressBar() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;

  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.setProperty('--progress', ratio.toFixed(4));
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}
