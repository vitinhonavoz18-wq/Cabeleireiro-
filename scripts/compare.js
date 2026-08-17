/**
 * Comparador antes / depois — Fase 3/4
 *
 * Arraste com mouse, toque e caneta (Pointer Events), teclado pelas setas e
 * um pequeno gesto de apresentação na primeira vez que entra na tela.
 *
 * Regra de honestidade: o bloco só aparece se as DUAS imagens do par
 * realmente existirem. Nada de par montado com fotos de procedimentos
 * diferentes — sem os arquivos, a seção simplesmente não é exibida.
 */

const KEY_STEP = 4; // % por tecla
const KEY_STEP_BIG = 12; // % com Page Up/Down

export function initCompare() {
  document.querySelectorAll('[data-compare]').forEach(setup);
}

function setup(root) {
  const before = root.querySelector('[data-compare-before]');
  const after = root.querySelector('[data-compare-after]');
  const grip = root.querySelector('[data-compare-grip]');
  const block = root.closest('[data-compare-block]');
  if (!before || !after || !grip) return;

  /* -------- O par existe mesmo? -------- */
  let pending = 2;
  let ok = 0;

  const settle = () => {
    if (--pending > 0) return;
    if (ok === 2) {
      root.hidden = false;
      if (block) block.hidden = false;
      start();
    } else if (block) {
      // Falta pelo menos uma das duas imagens: o bloco não vai ao ar.
      block.hidden = true;
    }
  };

  [before, after].forEach((img) => {
    if (img.complete) {
      if (img.naturalWidth > 0) ok += 1;
      settle();
    } else {
      img.addEventListener('load', () => {
        ok += 1;
        settle();
      }, { once: true });
      img.addEventListener('error', settle, { once: true });
    }
  });

  /* -------- Interação -------- */
  function start() {
    let split = 50;
    let dragging = false;

    const apply = (value) => {
      split = Math.min(100, Math.max(0, value));
      root.style.setProperty('--split', `${split.toFixed(2)}%`);
      grip.setAttribute('aria-valuenow', String(Math.round(split)));
    };

    const fromEvent = (event) => {
      const rect = root.getBoundingClientRect();
      return ((event.clientX - rect.left) / rect.width) * 100;
    };

    root.addEventListener('pointerdown', (event) => {
      dragging = true;
      root.setPointerCapture(event.pointerId);
      root.style.transition = 'none';
      apply(fromEvent(event));
    });

    root.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      event.preventDefault();
      apply(fromEvent(event));
    });

    const end = (event) => {
      if (!dragging) return;
      dragging = false;
      if (event.pointerId != null && root.hasPointerCapture?.(event.pointerId)) {
        root.releasePointerCapture(event.pointerId);
      }
    };

    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', end);

    grip.addEventListener('keydown', (event) => {
      const map = {
        ArrowLeft: -KEY_STEP,
        ArrowRight: KEY_STEP,
        PageDown: -KEY_STEP_BIG,
        PageUp: KEY_STEP_BIG,
      };
      if (event.key in map) {
        event.preventDefault();
        apply(split + map[event.key]);
      } else if (event.key === 'Home') {
        event.preventDefault();
        apply(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        apply(100);
      }
    });

    apply(50);

    /* -------- Gesto de apresentação -------- */
    // Na primeira vez que entra na tela, o divisor "respira" uma vez para o
    // visitante entender que aquilo se arrasta. Só isso — nada de loop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hint = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          hint.disconnect();
          const from = 50;
          const to = 68;
          const dur = 1400;
          const t0 = performance.now();
          const step = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            // ida e volta suave
            const e = Math.sin(p * Math.PI);
            apply(from + (to - from) * e);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    hint.observe(root);
  }
}
