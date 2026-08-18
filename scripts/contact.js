/**
 * Dados de contato — Fase 4/4
 *
 * Aplica ao DOM tudo o que vem de site.config.js: links de WhatsApp e
 * Instagram, endereço, cidade e horários. Enquanto um dado estiver vazio,
 * o texto "a confirmar" do HTML permanece — nada é inventado na tela.
 */

import { combo, contact, whatsappUrl, instagramUrl } from './site.config.js';

/** Aplica a URL do WhatsApp a todos os CTAs de agendamento. */
export function initBookingLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    // data-whatsapp-message permite um texto próprio por CTA (a oferta usa
    // isso para que Robson saiba de qual seção veio o contato).
    const url = whatsappUrl(el.getAttribute('data-whatsapp-message'));
    const external = url.startsWith('http');

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

/**
 * Oferta em destaque.
 * O HTML já traz os valores escritos — a seção aparece igual sem JavaScript.
 * Aqui só sincronizamos com site.config.js, para que quem for mexer no preço
 * mexa num lugar só, e desligamos a seção inteira quando `ativo` for false.
 */
export function initCombo() {
  const section = document.querySelector('[data-combo]');
  if (!section) return;

  if (!combo.ativo) {
    section.hidden = true;
    return;
  }

  const setText = (selector, value) => {
    if (!value) return;
    const el = section.querySelector(selector);
    if (el) el.textContent = value;
  };

  setText('[data-combo-title]', combo.titulo);
  setText('[data-combo-de]', combo.precoDe);
  setText('[data-combo-por]', combo.precoPor);

  // Itens intercalados por "+" dourado; o do meio em itálico, como na arte.
  const items = section.querySelector('[data-combo-items]');
  if (items && Array.isArray(combo.itens) && combo.itens.length) {
    const meio = Math.floor((combo.itens.length - 1) / 2);
    items.replaceChildren(
      ...combo.itens.flatMap((item, i) => {
        const node = document.createElement(i === meio ? 'em' : 'span');
        node.textContent = item;

        if (i === 0) return [node];

        const plus = document.createElement('span');
        plus.className = 'combo__plus';
        plus.setAttribute('aria-hidden', 'true');
        plus.textContent = '+';

        // O "+" e o item seguinte viajam juntos num grupo que não quebra:
        // assim a linha quebra antes do sinal e nunca deixa um "+" órfão
        // no fim. Um &nbsp; solto não basta, porque a borda do inline-block
        // do sinal já é oportunidade de quebra.
        const par = document.createElement('span');
        par.className = 'combo__pair';
        par.append(plus, document.createTextNode('\u00a0'), node);
        return [document.createTextNode(' '), par];
      })
    );
  }
}

/** Copyright sempre no ano corrente. */
export function initYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
