/**
 * Datos globales de la firma.
 * Toda la información de contacto vive aquí: cambiarla una vez actualiza
 * cabecera, pie de página, formulario, botón de WhatsApp y SEO.
 */
export const site = {
  name: "Martínez Guevara",
  legalName: "Martínez Guevara Abogados & Consultores",
  descriptor: "Abogados & Consultores",
  tagline: "El derecho, ejercido con carácter.",
  title: "Martínez Guevara | Abogados & Consultores en Colombia",
  description:
    "Despacho de abogados en Colombia. Representación en derecho civil, de familia, laboral, administrativo y disciplinario, con estrategia precisa y trato directo con su abogado.",
  url: "https://martinezguevara-abogados.vercel.app",
  locale: "es_CO",

  contact: {
    email: "asesoriasintegralesmartinezg@gmail.com",
    phone: "+57 320 768 2171",
    whatsapp: "+57 320 768 2171",
    office: "Carrera 11A No. 13C-56, Edificio Manaure, oficina 301",
    city: "Valledupar, Cesar",
  },

  /** Ubicación del despacho (Edificio Manaure). */
  location: {
    lat: 10.4759254,
    lng: -73.2505889,
    /** Enlace para abrir la ficha del lugar en Google Maps. */
    mapsUrl: "https://maps.app.goo.gl/XFfAcvWDLXBjE8FRA",
  },

  social: {
    instagram: {
      url: "https://www.instagram.com/martinezguevaraabogados/",
      handle: "@martinezguevaraabogados",
    },
  },
} as const;

/**
 * Video de presentación (sección "El despacho"). Vertical, grabado con celular.
 * Para reemplazarlo: sustituya los archivos en /public/videos y ajuste la duración.
 */
export const presentationVideo = {
  src: "/videos/presentacion.mp4",
  poster: "/videos/presentacion-miniatura.jpg",
  duration: "0:29",
  speaker: "Alain Martínez Guevara",
  role: "Socio director",
} as const;

/** Anclas de la página de inicio. */
export const sectionIds = {
  home: "inicio",
  firm: "despacho",
  areas: "especialidades",
  method: "metodo",
  team: "equipo",
  contact: "contacto",
  location: "ubicacion",
} as const;

export const navigation = [
  { href: `/#${sectionIds.firm}`, label: "Despacho" },
  { href: `/#${sectionIds.areas}`, label: "Especialidades" },
  { href: `/#${sectionIds.method}`, label: "Método" },
  { href: `/#${sectionIds.team}`, label: "Equipo" },
] as const;

/** Llamado principal: una sola etiqueta para la intención "contactar". */
export const contactCta = {
  label: "Agendar una consulta",
  href: `/#${sectionIds.contact}`,
} as const;
