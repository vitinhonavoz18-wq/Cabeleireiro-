/**
 * Fonte única de verdade do site — Robson Lopes
 * Centraliza dados de marca, contato e navegação.
 * Os valores marcados com PENDENTE serão confirmados após a Fase 4.
 */

export const brand = {
  name: 'Robson Lopes',
  role: 'Cabeleireiro',
  tagline: 'Coloração, loiros e transformações de alto padrão.',
  city: 'PENDENTE — cidade/UF',
  address: 'PENDENTE — endereço do estúdio',
};

export const contact = {
  // PENDENTE — número real (formato internacional, apenas dígitos)
  whatsapp: '5500000000000',
  whatsappMessage:
    'Olá, Robson! Vim pelo site e gostaria de agendar um horário.',
  instagram: 'https://instagram.com/', // PENDENTE — @usuario
  email: '', // PENDENTE
};

export const whatsappUrl = () =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;

export const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Transformações', href: '#transformacoes' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];
