export const site = {
  name: "PsekPisos",
  domain: "psekpisos.site",
  url: "https://psekpisos.site",
  tagline: "Sinteco Premium",

  whatsapp: {
    display: "(31) 99128-7292",
    intl: "5531991287292",
    href: "https://wa.me/5531991287292",
    tel: "tel:+5531991287292",
  },
  email: {
    display: "contatopsekpisos@gmail.com",
    href: "mailto:contatopsekpisos@gmail.com",
  },
  location: {
    display: "Belo Horizonte · MG",
    long: "Belo Horizonte e região metropolitana",
    city: "Belo Horizonte",
    state: "MG",
    region: "BH e região metropolitana",
  },
  hours: {
    display: "Seg-Sex · 08h-17h",
    long: "Segunda a sexta, das 08h às 17h",
  },
} as const;

export function waLink(message?: string) {
  const base = site.whatsapp.href;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
