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
  marcaDagua: false,
};

export const brand = {
  name: 'Robson Lopes',
  role: 'Cabeleireiro',
  tagline: 'Cortes, tratamentos e transformações — com um olhar especial para os loiros.',
};

/**
 * Oferta em destaque ("Super Combo").
 * Os valores aparecem numa única seção do site; mudá-los aqui atualiza a
 * tela inteira, inclusive a mensagem que o cliente envia no WhatsApp.
 * Para tirar a oferta do ar, basta `ativo: false` — a seção some sem
 * deixar buraco no layout.
 */
export const combo = {
  ativo: true,
  titulo: 'Combo',
  itens: ['Mechas', 'tratamento', 'finalização'],
  precoDe: 'R$ 850,00',
  precoPor: 'R$ 699,00',
};

export const contact = {
  /** Número real, formato internacional, só dígitos: 55 + DDD + número.
   *
   *  ⚠ CONFERIR ANTES DE PUBLICAR. O número informado foi (71) 8159-7670,
   *  que tem oito dígitos. Celular na Bahia tem nove e começa em 9, então
   *  o número discável é (71) 9 8159-7670 → 5571981597670. Se ao clicar
   *  em "Agendar pelo WhatsApp" a conversa não abrir no contato certo,
   *  é esta linha — e só esta — que precisa mudar.
   */
  whatsapp: '5571981597670',

  whatsappMessage:
    'Olá, Robson! Vim pelo site e gostaria de agendar um horário.',

  /** Apenas o usuário, sem @. */
  instagram: 'robsonlopesoficiall',

  /** PENDENTE */
  email: '',

  /** Empresarial Mundo Plaza, em Salvador.
   *  PENDENTE — falta o logradouro (rua e número) e o CEP. A sala já está
   *  confirmada e o ponto no mapa abaixo é o endereço exato. */
  address: 'Empresarial Mundo Plaza — Sala 222 · Salvador, BA',

  city: 'Salvador, BA',

  /** PENDENTE — ex.: 'Terça a sábado · 9h às 19h' */
  hours: '',

  /**
   * Localização no Google Maps.
   * As coordenadas vieram do ponto marcado pelo próprio Robson, por isso
   * os links usam latitude/longitude em vez de busca por texto: o pino cai
   * sempre no mesmo lugar, independentemente de como o Maps interpreta o
   * nome do prédio.
   */
  geo: {
    lat: -12.9788299,
    lng: -38.4615469,
  },
};

/** Coordenadas no formato que a API de URLs do Google Maps espera. */
const geoQuery = () => `${contact.geo.lat},${contact.geo.lng}`;

/** Abre o local no Google Maps (app no celular, site no desktop). */
export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(geoQuery())}`;

/** Traça a rota até o salão a partir de onde o visitante estiver. */
export const mapsDirectionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    geoQuery()
  )}`;

/** Mapa incorporado na seção de localização. */
export const mapsEmbedUrl = () =>
  'https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3887.890890445314' +
  '!2d-38.4615469!3d-12.9788299!3m2!1i1024!2i768!4f13.1!2m1' +
  '!1smundo%20plaza%20empresarial%20sala%20222!5e0!3m2!1spt-BR!2sbr' +
  '!4v1787313272103!5m2!1spt-BR!2sbr';

/** Link de agendamento. Sem número cadastrado, cai na seção de contato.
 *  Aceita uma mensagem própria — usada pelo CTA da oferta, para que Robson
 *  saiba de onde veio o contato. */
export const whatsappUrl = (message) => {
  if (!contact.whatsapp) return '#contato';
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    message || contact.whatsappMessage
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
  { label: 'Localização', href: '#localizacao' },
];
