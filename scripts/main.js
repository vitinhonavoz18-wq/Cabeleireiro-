/**
 * Bootstrap — Robson Lopes
 * Fase 2/4: hero animado, estados de mídia, header, revelações e CTAs.
 */

import { initHeader, initScrollSpy } from './header.js';
import { initReveal, initProgressBar } from './reveal.js';
import { initHero } from './hero.js';
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

/**
 * Estado vazio elegante para fotografias ainda não enviadas.
 * Assim que o arquivo existir em assets/fotos/, o estado some sozinho.
 */
function initMediaStates() {
  document.querySelectorAll('[data-media]').forEach((media) => {
    const img = media.querySelector('img');
    if (!img) return;
    const fail = () => media.classList.add('is-empty');
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
  initMediaStates();
  initBrandFallback();
  initHero();
  initHeader();
  initScrollSpy();
  initReveal();
  initProgressBar();
  initBookingLinks();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
