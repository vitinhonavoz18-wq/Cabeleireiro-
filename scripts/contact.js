/**
 * Dados de contato — Fase 4/4
 *
 * Aplica ao DOM tudo o que vem de site.config.js: links de WhatsApp e
 * Instagram, endereço, cidade e horários. Enquanto um dado estiver vazio,
 * o texto "a confirmar" do HTML permanece — nada é inventado na tela.
 */

import { contact, whatsappUrl, instagramUrl } from './site.config.js';

/** Aplica a URL do WhatsApp a todos os CTAs de agendamento. */
export function initBookingLinks() {
  const url = whatsappUrl();
  const external = url.startsWith('http');

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', url);
    if (external) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      // Sem número cadastrado o link é interno: abrir em nova aba seria erro
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  });
}

/** Instagram: link e @ exibido. */
export function initInstagramLinks() {
  const url = instagramUrl();
  if (url) {
    document.querySelectorAll('[data-instagram]').forEach((el) => {
      el.setAttribute('href', url);
    });
  }

  if (contact.instagram) {
    document.querySelectorAll('[data-instagram-handle]').forEach((el) => {
      el.textContent = `@${contact.instagram}`;
    });
  }
}

/** Endereço, cidade e horários — só substitui o que existir. */
export function initContactDetails() {
  const map = [
    ['[data-contact-address]', contact.address],
    ['[data-contact-city]', contact.city],
    ['[data-contact-hours]', contact.hours],
  ];

  map.forEach(([selector, value]) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  });
}

/**
 * Botão flutuante de WhatsApp.
 * Aparece depois do hero e recolhe quando a seção de agendamento já está
 * na tela — não faz sentido insistir num CTA que o visitante já está vendo.
 */
export function initFloatingCta() {
  const btn = document.querySelector('[data-wa-float]');
  if (!btn) return;

  const hero = document.querySelector('[data-hero]');
  const cta = document.getElementById('contato');
  const footer = document.querySelector('.site-footer');

  let pastHero = false;
  let atCta = false;
  let atFooter = false;

  // Some no rodapé também: lá o botão cobria os ícones de Instagram e
  // WhatsApp, disputando espaço com os próprios links que ele duplica.
  const sync = () =>
    btn.classList.toggle('is-visible', pastHero && !atCta && !atFooter);

  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 }
    ).observe(hero);
  } else {
    pastHero = true;
  }

  if (cta) {
    new IntersectionObserver(
      ([entry]) => {
        atCta = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 }
    ).observe(cta);
  }

  if (footer) {
    new IntersectionObserver(
      ([entry]) => {
        atFooter = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    ).observe(footer);
  }

  sync();
}

/** Copyright sempre no ano corrente. */
export function initYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
