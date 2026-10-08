/**
 * Especialidades del despacho.
 * Para agregar una nueva: añada un objeto a este arreglo y su fotografía en
 * /public/images/photos. La página /areas/[slug], el sitemap, el índice de la
 * portada y el pie de página se generan automáticamente.
 */
export type PracticeArea = {
  slug: string;
  /** Nombre corto para índices y títulos grandes ("Familia"). */
  name: string;
  /** Nombre completo de la rama ("Derecho de Familia"). */
  title: string;
  /** Línea breve para el índice de la portada. */
  summary: string;
  /** Titular de la página de detalle. */
  headline: string;
  /** Párrafo de presentación de la página de detalle. */
  description: string;
  services: string[];
  image: { src: string; alt: string };
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "derecho-civil",
    name: "Civil",
    title: "Derecho Civil",
    summary: "Contratos, patrimonio, deudas y responsabilidad.",
    headline: "Lo que se pacta, se cumple. Y lo que es suyo, se defiende.",
    description:
      "Intervenimos cuando un contrato se incumple, una deuda no se paga, un bien está en disputa o un daño debe ser reparado. Analizamos los documentos, medimos el riesgo y elegimos la vía más eficaz: un acuerdo bien negociado o un proceso judicial bien planteado.",
    services: [
      "Elaboración y revisión de contratos",
      "Cumplimiento y resolución de contratos",
      "Procesos ejecutivos y monitorios",
      "Procesos de pertenencia",
      "Procesos divisorios",
      "Responsabilidad civil y seguros",
      "Responsabilidad médica",
      "Insolvencia de persona natural",
      "Divorcio",
    ],
    image: {
      src: "/images/photos/civil.jpg",
      alt: "Mano firmando un documento con pluma estilográfica",
    },
  },
  {
    slug: "derecho-de-familia",
    name: "Familia",
    title: "Derecho de Familia",
    summary: "Divorcio, alimentos, custodia y bienes de la pareja.",
    headline: "Decisiones que cambian una vida merecen calma y firmeza.",
    description:
      "En los asuntos de familia cuidamos dos cosas a la vez: sus derechos y las relaciones que deben seguir existiendo después del proceso. Buscamos acuerdos cuando son posibles y litigamos con decisión cuando no lo son, siempre con los hijos en el centro.",
    services: [
      "Divorcio de mutuo acuerdo y contencioso",
      "Fijación de cuota alimentaria",
      "Ejecución de alimentos",
      "Custodia y cuidado personal",
      "Capitulaciones matrimoniales",
      "Separación de bienes",
      "Liquidación de sociedad conyugal",
    ],
    image: {
      src: "/images/photos/familia.jpg",
      alt: "Familia caminando de la mano hacia el mar",
    },
  },
  {
    slug: "derecho-laboral",
    name: "Laboral",
    title: "Derecho Laboral",
    summary: "Contratos de trabajo, pensión, salud y riesgos laborales.",
    headline: "Su trabajo genera derechos. Nos aseguramos de que se respeten.",
    description:
      "Revisamos su relación laboral y su situación ante el sistema de seguridad social para establecer qué le corresponde. Reclamamos salarios, prestaciones, pensiones e indemnizaciones por accidente o enfermedad laboral ante empleadores, fondos y entidades de salud.",
    services: [
      "Revisión de contratos de trabajo",
      "Reclamaciones de seguridad social",
      "Pensiones",
      "Salud",
      "Riesgos laborales",
    ],
    image: {
      src: "/images/photos/laboral.jpg",
      alt: "Trabajadores con casco en una obra vista desde lo alto",
    },
  },
  {
    slug: "derecho-administrativo",
    name: "Administrativo",
    title: "Derecho Administrativo",
    summary: "Reclamaciones frente a entidades del Estado.",
    headline: "Frente al Estado, también hay caminos para reclamar.",
    description:
      "Cuando una entidad pública le causa un daño o expide una decisión que lesiona sus derechos, la ley prevé medios para controvertirla. Estudiamos el acto, los términos de caducidad y el medio de control adecuado antes de dar el primer paso.",
    services: [
      "Reparación directa",
      "Nulidad y restablecimiento del derecho",
      "Nulidad simple",
      "Actuaciones administrativas",
    ],
    image: {
      src: "/images/photos/administrativo.jpg",
      alt: "Fachada de vidrio de un edificio institucional vista desde abajo",
    },
  },
  {
    slug: "derecho-disciplinario",
    name: "Disciplinario",
    title: "Derecho Disciplinario",
    summary: "Defensa de servidores públicos y profesionales.",
    headline: "Su trayectoria merece una defensa a la altura.",
    description:
      "Una investigación disciplinaria compromete su cargo, su carrera y su reputación. Asumimos la defensa desde la primera citación, vigilamos cada garantía del debido proceso y construimos los argumentos con la prueba en la mano.",
    services: [
      "Defensa en indagación e investigación",
      "Descargos y alegatos",
      "Recursos contra decisiones sancionatorias",
    ],
    image: {
      src: "/images/photos/disciplinario.jpg",
      alt: "Mazo de juez de madera sobre fondo oscuro",
    },
  },
];

/** Mensaje de WhatsApp ya escrito según la especialidad (p. ej. "…asesoría en derecho civil."). */
export const areaWhatsappMessage = (area: PracticeArea) =>
  `Hola, me interesa una asesoría en ${area.title.toLowerCase()}.`;

/** Ancla de cada especialidad en la portada: /#area-<slug> abre su ficha desplegable. */
export const areaAnchor = (slug: string) => `area-${slug}`;

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
