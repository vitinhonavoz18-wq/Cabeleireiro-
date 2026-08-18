/**
 * Bootstrap — Robson Lopes
 * Fase 4/4: hero, parede diagonal, lightbox, comparador, contato e CTAs.
 */

import { initHeader, initScrollSpy } from './header.js';
import { initReveal, initProgressBar } from './reveal.js';
import { initHero } from './hero.js';
import { initShowcase, initLazyVideos } from './showcase.js';
import { initLightbox } from './lightbox.js';
import { initCompare } from './compare.js';
import { previa } from './site.config.js';
import {
  initBookingLinks,
  initInstagramLinks,
  initContactDetails,
  initFloatingCta,
  initYear,
} from './contact.js';

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
 * Estado vazio elegante para mídias ainda não enviadas.
 * Assim que o arquivo existir em assets/, o estado some sozinho.
 */
function initMediaStates() {
  document.querySelectorAll('[data-media]').forEach((media) => {
    const el = media.querySelector('img, video');
    if (!el) return;

    // Vídeo não entra no estado vazio: se o navegador não conseguir decodificar
    // (Linux sem H.264, por exemplo), o pôster continua na tela — uma imagem
    // real do conteúdo é melhor fallback que o painel "RL".
    if (el.tagName === 'VIDEO') return;

    const fail = () => media.classList.add('is-empty');
    if (el.complete && el.naturalWidth === 0) fail();
    el.addEventListener('error', fail, { once: true });
  });
}

/** Liga a marca d'água de apresentação, se o modo prévia estiver ativo. */
function initMarcaDagua() {
  document.documentElement.classList.toggle('com-marca-dagua', previa.marcaDagua);
}

function boot() {
  initMarcaDagua();
  initBrandFallback();
  initHero();

  // initShowcase vem primeiro porque duplica os cards da trilha. Os clones
  // precisam entrar no DOM antes de initMediaStates, senão ficam sem o
  // tratamento de imagem ausente; e antes do lightbox, que os identifica
  // como decorativos para não contá-los duas vezes.
  initShowcase();
  initMediaStates();
  initLightbox();
  initLazyVideos();
  initCompare();

  initHeader();
  initScrollSpy();
  initReveal();
  initProgressBar();

  initBookingLinks();
  initInstagramLinks();
  initContactDetails();
  initFloatingCta();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
