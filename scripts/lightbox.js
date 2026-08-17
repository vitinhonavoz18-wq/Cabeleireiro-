/**
 * Lightbox — Fase 3/4
 *
 * Lê as mídias diretamente do DOM (elementos [data-lightbox]), então não há
 * uma segunda lista de arquivos para manter em sincronia: o que está na
 * página é o que abre ampliado.
 *
 * Acessibilidade: dialog modal, foco preso, ESC fecha, setas navegam,
 * o foco volta para o card de origem ao fechar.
 * Mobile: swipe horizontal.
 */

const SWIPE_MIN = 45; // px

export function initLightbox() {
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  const box = document.querySelector('[data-lightbox-root]');
  if (!items.length || !box) return;

  const stage = box.querySelector('[data-lightbox-figure]');
  const tagEl = box.querySelector('[data-lightbox-tag]');
  const labelEl = box.querySelector('[data-lightbox-label]');
  const currentEl = box.querySelector('[data-lightbox-current]');
  const totalEl = box.querySelector('[data-lightbox-total]');
  const btnClose = box.querySelector('[data-lightbox-close]');
  const btnPrev = box.querySelector('[data-lightbox-prev]');
  const btnNext = box.querySelector('[data-lightbox-next]');

  /* Cards clonados pelo carrossel são decorativos: entram como duplicata e
     bagunçariam a contagem. A lista real vem só dos originais. */
  const list = items.filter((el) => !el.closest('[aria-hidden="true"]'));
  if (!list.length) return;

  totalEl.textContent = String(list.length).padStart(2, '0');

  let index = 0;
  let opener = null;

  const render = () => {
    const el = list[index];
    const type = el.dataset.type || 'image';
    const src = el.dataset.full || el.dataset.src || '';
    const alt = el.dataset.alt || '';

    stage.innerHTML = '';

    // Arquivo ainda não enviado: painel elegante no lugar do ícone de
    // mídia quebrada do navegador.
    const fallback = () => {
      stage.innerHTML = '';
      const box = document.createElement('div');
      box.className = 'lightbox__empty';
      box.innerHTML =
        '<span class="lightbox__empty-mark">RL</span>' +
        `<span class="lightbox__empty-label">${el.dataset.label || ''}</span>`;
      stage.appendChild(box);
    };

    if (type === 'video') {
      const video = document.createElement('video');
      // Duas fontes pela mesma razão da parede: <video> tenta a seguinte
      // quando a anterior não é suportada.
      [[el.dataset.fullAlt, 'video/webm'], [src, 'video/mp4']].forEach(([u, t]) => {
        if (!u) return;
        const f = document.createElement('source');
        f.src = u;
        f.type = t;
        video.appendChild(f);
      });
      video.poster = el.dataset.poster || '';
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      // Abre sem som: barulho inesperado é o oposto de premium.
      video.muted = true;
      video.setAttribute('aria-label', alt);
      stage.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.decoding = 'async';
      img.addEventListener('error', fallback, { once: true });
      stage.appendChild(img);
    }

    tagEl.textContent = el.dataset.tag || '';
    labelEl.textContent = el.dataset.label || alt;
    currentEl.textContent = String(index + 1).padStart(2, '0');

    const single = list.length < 2;
    btnPrev.hidden = single;
    btnNext.hidden = single;
  };

  const focusables = () =>
    Array.from(box.querySelectorAll('button:not([hidden]), video[controls]')).filter(
      (el) => el.offsetParent !== null || el.tagName === 'VIDEO'
    );

  const open = (i, from) => {
    index = i;
    opener = from || null;
    render();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => box.classList.add('is-ready'));
    btnClose.focus({ preventScroll: true });
  };

  const close = () => {
    box.classList.remove('is-open', 'is-ready');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    // Libera o vídeo: sem isso ele continua tocando em segundo plano
    stage.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.querySelectorAll('source').forEach((f) => f.removeAttribute('src'));
      v.removeAttribute('src');
      v.load();
    });
    stage.innerHTML = '';
    opener?.focus({ preventScroll: true });
    opener = null;
  };

  const go = (step) => {
    index = (index + step + list.length) % list.length;
    box.classList.remove('is-ready');
    render();
    requestAnimationFrame(() => box.classList.add('is-ready'));
  };

  const isOpen = () => box.classList.contains('is-open');

  /* -------- Abertura -------- */
  items.forEach((el) => {
    el.addEventListener('click', () => {
      // O card clonado não está na lista: abre pelo original equivalente
      const i = list.indexOf(el);
      const target = i >= 0 ? i : list.findIndex((x) => x.dataset.full === el.dataset.full);
      open(target >= 0 ? target : 0, el);
    });

    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        el.click();
      }
    });
  });

  /* -------- Controles -------- */
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => go(-1));
  btnNext.addEventListener('click', () => go(1));
  box.querySelector('[data-lightbox-backdrop]')?.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') return close();
    if (event.key === 'ArrowLeft') return go(-1);
    if (event.key === 'ArrowRight') return go(1);

    if (event.key === 'Tab') {
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* -------- Swipe no mobile -------- */
  let startX = 0;
  let startY = 0;

  box.addEventListener(
    'touchstart',
    (event) => {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    },
    { passive: true }
  );

  box.addEventListener(
    'touchend',
    (event) => {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      // Só conta como swipe se o gesto for claramente horizontal
      if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) {
        go(dx < 0 ? 1 : -1);
      }
    },
    { passive: true }
  );
}
