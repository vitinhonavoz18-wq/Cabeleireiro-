/**
 * Fonte única de verdade do site — Robson Lopes
 *
 * ► É AQUI QUE SE PERSONALIZA O SITE. Trocar os valores marcados como
 *   PENDENTE atualiza header, hero, CTA, rodapé, botão flutuante, dados
 *   estruturados e todos os links de WhatsApp de uma só vez.
 */

/**
 * Modo de apresentação.
 * Enquanto o site está sendo mostrado ao cliente antes da venda, a marca
 * da ConectFly fica sobreposta e centralizada na tela. Trocar para false
 * remove a marca — é o único lugar que precisa mudar na entrega.
 */
export const previa = {
  marcaDagua: true,
};

export const brand = {
  name: 'Robson Lopes',
  role: 'Cabeleireiro',
  tagline: 'Cortes, tratamentos e transformações — com um olhar especial para os loiros.',
};

export const contact = {
  /** PENDENTE — número real, formato internacional, só dígitos.
   *  Ex.: 5511987654321 (55 + DDD + número). */
  whatsapp: '',

  whatsappMessage:
    'Olá, Robson! Vim pelo site e gostaria de agendar um horário.',

  /** PENDENTE — apenas o usuário, sem @. Ex.: 'robsonlopes.hair' */
  instagram: '',

  /** PENDENTE */
  email: '',

  /** Empresarial Mundo Plaza, em Salvador.
   *  PENDENTE — falta o complemento (torre, andar e sala) e o CEP. */
  address: 'Empresarial Mundo Plaza — Salvador, BA',

  city: 'Salvador, BA',

  /** PENDENTE — ex.: 'Terça a sábado · 9h às 19h' */
  hours: '',

  /** PENDENTE — link do Google Maps, se houver */
  maps: '',
};

/** Link de agendamento. Sem número cadastrado, cai na seção de contato. */
export const whatsappUrl = () => {
  if (!contact.whatsapp) return '#contato';
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;
};

export const instagramUrl = () =>
  contact.instagram ? `https://instagram.com/${contact.instagram}` : '';

export const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Transformações', href: '#transformacoes' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];
