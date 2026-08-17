/**
 * Parede diagonal de trabalhos — Fase 3/4
 *
 * Motor de trilha contínua próprio (nenhuma biblioteca de carrossel):
 * - um único rAF conduz todas as trilhas;
 * - a posição é escrita em translate3d, então o navegador resolve tudo no
 *   compositor: zero layout, zero reflow por frame;
 * - o loop é infinito por duplicação do grupo de cards;
 * - hover desacelera suavemente em vez de travar de uma vez;
 * - fora da viewport o rAF é desligado, para não gastar bateria à toa.
 */

const HOVER_FACTOR = 0.18; // velocidade durante o hover
const EASE = 0.08; // suavização da mudança de velocidade

export function initShowcase() {
  const tracks = Array.from(document.querySelectorAll('[data-track]'));
  if (!tracks.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Duplica o grupo até a trilha ser larga o bastante para o laço não abrir
     buraco. Com poucos cards, uma única cópia não cobre a tela: a posição
     percorre um ciclo inteiro e sobra vazio na borda. O fator 1,5 cobre a
     ampliação que a rotação da parede provoca. */
  tracks.forEach((track) => {
    const group = track.querySelector('[data-track-group]');
    if (!group) return;

    const largura = group.offsetWidth;
    const necessario = window.innerWidth * 1.5;
    const copias = largura > 0 ? Math.max(1, Math.ceil(necessario / largura)) : 1;

    for (let i = 0; i < copias; i += 1) {
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      // Cópia decorativa: não pode ser focável nem duplicar conteúdo para leitores
      clone.querySelectorAll('[tabindex], button, a').forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
      // Sem alt na cópia: evita leitura duplicada e, se o arquivo faltar, o
      // navegador não desenha o texto alternativo por cima do card.
      clone.querySelectorAll('img').forEach((img) => img.setAttribute('alt', ''));
      // As cópias ficam no pôster: sem data-src elas nunca baixam nem
      // decodificam vídeo. Com cinco vídeos e três cópias por trilha, o
      // navegador estaria decodificando quinze streams ao mesmo tempo.
      clone.querySelectorAll('source[data-src]').forEach((el) => el.removeAttribute('data-src'));
      track.appendChild(clone);
    }
    track._group = group;
  });

  if (reduced.matches) return; // sem animação: vira faixa arrastável (CSS)

  const state = tracks.map((track) => ({
    el: track,
    group: track._group,
    x: 0,
    speed: Number(track.dataset.speed || 22) / 1000, // px por ms
    dir: track.dataset.direction === 'right' ? 1 : -1,
    factor: 1,
    target: 1,
  }));

  /* -------- Hover: desacelera a trilha, não paralisa -------- */
  state.forEach((s) => {
    s.el.addEventListener('pointerenter', () => {
      if (window.matchMedia('(hover: hover)').matches) s.target = HOVER_FACTOR;
    });
    s.el.addEventListener('pointerleave', () => {
      s.target = 1;
    });
    // Teclado: quem navega por tab também precisa que a trilha desacelere
    s.el.addEventListener('focusin', () => {
      s.target = 0;
    });
    s.el.addEventListener('focusout', () => {
      s.target = 1;
    });
  });

  /* -------- Arraste (mobile e desktop) --------
     A trilha acompanha o dedo; ao soltar, o movimento contínuo retoma.
     Um arraste maior que DRAG_SLOP cancela o clique seguinte, para não
     abrir o lightbox sem querer no fim de um swipe. */
  const DRAG_SLOP = 8;

  state.forEach((s) => {
    let dragging = false;
    let startX = 0;
    let originX = 0;
    let moved = 0;

    s.el.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = event.clientX;
      originX = s.x;
      s.target = 0;
      s.factor = 0;
      s.el.setPointerCapture(event.pointerId);
    });

    s.el.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      moved = Math.abs(dx);
      s.x = originX + dx;
    });

    const release = (event) => {
      if (!dragging) return;
      dragging = false;
      if (s.el.hasPointerCapture?.(event.pointerId)) {
        s.el.releasePointerCapture(event.pointerId);
      }
      s.target = 1;
      if (moved > DRAG_SLOP) {
        // Consome só este clique — o próximo toque volta a abrir o lightbox
        s.el.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
        }, { capture: true, once: true });
      }
    };

    s.el.addEventListener('pointerup', release);
    s.el.addEventListener('pointercancel', release);
  });

  /* -------- Laço único -------- */
  let last = performance.now();
  let running = false;
  let frame = 0;

  const tick = (now) => {
    const dt = Math.min(now - last, 64); // aba em segundo plano não "teleporta"
    last = now;

    state.forEach((s) => {
      s.factor += (s.target - s.factor) * EASE;
      s.x += s.dir * s.speed * s.factor * dt;

      const span = s.group.offsetWidth + parseFloat(getComputedStyle(s.el).gap || 0);
      if (span > 0) {
        // Mantém x sempre dentro de um ciclo: o laço nunca acumula erro
        if (s.x <= -span) s.x += span;
        if (s.x >= 0) s.x -= span;
      }

      s.el.style.transform = `translate3d(${s.x.toFixed(2)}px, 0, 0)`;
    });

    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frame);
  };

  /* -------- Só anima quando a seção está na tela -------- */
  const section = tracks[0].closest('[data-showcase]') || tracks[0];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    },
    { rootMargin: '200px 0px' }
  );
  observer.observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (section.getBoundingClientRect().top < window.innerHeight) start();
  });
}

/**
 * Vídeos sob demanda.
 * O arquivo só é atribuído (e só começa a baixar) quando o card se aproxima
 * da viewport; sai da viewport, pausa. Nada de baixar todos de uma vez.
 */
const MAX_TOCANDO = 3;

export function initLazyVideos() {
  const videos = Array.from(document.querySelectorAll('video[data-lazy-video]'));
  if (!videos.length) return;

  // Conexão limitada ou economia de dados: fica no poster, não baixa vídeo
  const conn = navigator.connection;
  const saveData = conn?.saveData === true;
  const slow = /^(slow-2g|2g)$/.test(conn?.effectiveType || '');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (saveData || slow) return;

  const load = (video) => {
    if (video.dataset.loaded) return;
    const fontes = video.querySelectorAll('source[data-src]');
    // Nenhuma fonte: é uma cópia decorativa da trilha, fica só no pôster.
    if (!fontes.length) return;
    fontes.forEach((f) => f.setAttribute('src', f.dataset.src));
    video.dataset.loaded = 'true';
    video.load();
  };

  const naTela = new Set();

  /**
   * Toca no máximo MAX_TOCANDO vídeos, escolhendo os mais próximos do centro
   * da tela. Sem esse teto, uma parede com vários vídeos visíveis derruba a
   * taxa de quadros em aparelho modesto.
   */
  const reavaliar = () => {
    const meio = window.innerHeight / 2;
    const ordenados = Array.from(naTela).sort((a, b) => {
      const ca = a.getBoundingClientRect();
      const cb = b.getBoundingClientRect();
      return (
        Math.abs(ca.top + ca.height / 2 - meio) -
        Math.abs(cb.top + cb.height / 2 - meio)
      );
    });

    ordenados.forEach((video, i) => {
      if (i < MAX_TOCANDO) {
        load(video);
        // play() rejeita em algumas políticas de autoplay — silenciar é o
        // comportamento correto: o pôster continua no lugar.
        if (!reduced && video.paused) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    });

    videos.forEach((video) => {
      if (!naTela.has(video) && !video.paused) video.pause();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) naTela.add(entry.target);
        else naTela.delete(entry.target);
      });
      reavaliar();
    },
    { rootMargin: '150px 0px', threshold: 0.1 }
  );

  let agendado = false;
  window.addEventListener(
    'scroll',
    () => {
      if (agendado || !naTela.size) return;
      agendado = true;
      requestAnimationFrame(() => {
        agendado = false;
        reavaliar();
      });
    },
    { passive: true }
  );

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    observer.observe(video);
  });
}
