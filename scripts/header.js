/**
 * Header premium — Robson Lopes
 * - Transparente sobre o hero, preto translúcido ao rolar
 * - Auto-hide ao descer / revela ao subir
 * - Menu mobile em tela cheia com foco preso (focus trap) e ESC
 * - Estado ativo do menu conforme a seção visível
 */

const SCROLL_THRESHOLD = 24;
const HIDE_AFTER = 320;

export function initHeader() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!header) return;

  /* ---------------- Estado de scroll ---------------- */
  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;

    header.classList.toggle('is-scrolled', y > SCROLL_THRESHOLD);

    const menuOpen = header.classList.contains('is-menu-open');
    const goingDown = y > lastY && y > HIDE_AFTER;
    header.classList.toggle('is-hidden', goingDown && !menuOpen);

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------------- Menu mobile ---------------- */
  if (!toggle || !menu) return;

  const focusables = () =>
    Array.from(
      menu.querySelectorAll('a[href], button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    header.classList.toggle('is-menu-open', open);
    document.body.classList.toggle('is-locked', open);
    if (open) {
      header.classList.remove('is-hidden');
      focusables()[0]?.focus({ preventScroll: true });
    }
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setMenu(!isOpen()));

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      setMenu(false);
      toggle.focus({ preventScroll: true });
      return;
    }

    if (event.key === 'Tab') {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Fecha o menu ao passar para o breakpoint desktop
  const desktop = window.matchMedia('(min-width: 1180px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) setMenu(false);
  });
}

/**
 * Marca o link do menu correspondente à seção visível.
 */
export function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('[data-nav-link]'));
  if (!links.length) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute('href')?.replace('#', '');
    const section = id && document.getElementById(id);
    if (section) map.set(section, link);
  });
  if (!map.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove('is-active'));
        map.get(entry.target)?.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  map.forEach((_link, section) => observer.observe(section));
}
