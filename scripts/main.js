/**
 * Bootstrap — Robson Lopes
 * Fase 1/4: header, revelações, progresso, links de WhatsApp e ano do rodapé.
 */

import { initHeader, initScrollSpy } from './header.js';
import { initReveal, initProgressBar } from './reveal.js';
import { whatsappUrl } from './site.config.js';

/** Aplica a URL do WhatsApp a todos os CTAs de agendamento. */
function initBookingLinks() {
  const url = whatsappUrl();
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', url);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * Enquanto o PNG oficial da logo não estiver no repositório, exibe o nome
 * na tipografia da marca. Nenhuma logo alternativa é criada.
 */
function initBrandFallback() {
  document.querySelectorAll('[data-brand]').forEach((brand) => {
    const img = brand.querySelector('img');
    if (!img) return;
    const fail = () => brand.classList.add('is-fallback');
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail, { once: true });
  });
}

function initYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}

function boot() {
  initHeader();
  initScrollSpy();
  initReveal();
  initProgressBar();
  initBookingLinks();
  initBrandFallback();
  initYear();
  document.documentElement.classList.add('js-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
