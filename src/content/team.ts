export type TeamMember = {
  name: string;
  role: string;
  /** Socio principal: se presenta destacado en la sección de equipo. */
  lead?: boolean;
  /** Cifra destacada (solo para el socio principal). */
  highlight?: { value: string; label: string };
  /** Formación académica. */
  education: string[];
  bio: string;
  focus: string[];
  photo: { src: string };
};

export const team: TeamMember[] = [
  {
    name: "Alain Martínez Guevara",
    role: "Socio director",
    lead: true,
    highlight: { value: "10+", label: "años de experiencia en litigio" },
    education: [
      "Abogado, Universidad Popular del Cesar",
      "Especialista en Derecho Procesal, Universidad Libre",
    ],
    bio: "Más de diez años dedicados al litigio. Dirige la estrategia de los casos del despacho y ha representado a sus clientes en procesos de divorcio, ejecutivos, laborales, disciplinarios, administrativos y civiles.",
    focus: ["Civil", "Familia", "Disciplinario"],
    photo: { src: "/images/team/alain-martinez.jpg" },
  },
  {
    name: "Jefferson Torne Tamara",
    role: "Abogado asociado",
    education: [
      "Abogado, Universidad de Santander",
      "Especialista en Derecho Administrativo, Universidad Santo Tomás",
    ],
    bio: "Más de cinco años de ejercicio profesional, con especial dedicación a las reclamaciones laborales y a los litigios contra entidades públicas.",
    focus: ["Laboral", "Administrativo"],
    photo: { src: "/images/team/jefferson-torne.jpg" },
  },
];
