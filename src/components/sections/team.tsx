import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { sectionIds } from "@/content/site";
import { team, type TeamMember } from "@/content/team";
import { cn } from "@/lib/cn";

/**
 * Equipo en dos columnas simétricas. El socio principal se distingue por
 * detalles y no por tamaño: marco desplazado en azul pizarra, franja
 * "Socio principal" sobre el retrato, filete en color y cifra destacada.
 */
export function Team() {
  return (
    <section id={sectionIds.team} className="py-28 md:py-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label text-muted">Equipo</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="serif mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">
                Quiénes <i>le representan.</i>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-muted">
              Formación especializada y años de práctica en los tribunales. Conozca a los abogados
              que llevarán su caso.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 lg:gap-16">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <Profile member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profile({ member }: { member: TeamMember }) {
  const lead = member.lead;

  return (
    <article className="group">
      {/* Ambos retratos ocupan exactamente el mismo espacio; el marco del socio va por fuera. */}
      <div className="relative">
        {lead && (
          <div
            aria-hidden
            className="absolute -right-3 -top-3 bottom-3 left-3 border border-slate sm:-right-4 sm:-top-4 sm:bottom-4 sm:left-4"
          />
        )}
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
          <Image
            src={member.photo.src}
            alt={`Retrato de ${member.name}, ${member.role.toLowerCase()}`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-[center_18%] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
          {lead && (
            <span className="absolute bottom-0 left-0 bg-slate px-5 py-3 text-[0.6875rem] uppercase tracking-[0.22em] text-paper">
              Socio principal
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-8 flex flex-col items-start gap-2 border-b pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
          lead ? "border-slate" : "border-ink",
        )}
      >
        <h3 className="serif text-3xl md:text-4xl">{member.name}</h3>
        <p
          className={cn(
            "shrink-0 text-[0.6875rem] uppercase tracking-[0.2em]",
            lead ? "font-medium text-slate" : "text-muted",
          )}
        >
          {member.role}
        </p>
      </div>

      {member.highlight && (
        <p className="mt-6 flex items-baseline gap-3 text-slate">
          <span className="serif text-4xl leading-none">{member.highlight.value}</span>
          <span className="text-[0.6875rem] uppercase tracking-[0.18em]">{member.highlight.label}</span>
        </p>
      )}

      <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">{member.bio}</p>

      <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-[1fr_auto] sm:gap-10">
        <div>
          <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">Formación</dt>
          {member.education.map((line) => (
            <dd key={line} className="mt-2 text-ink-soft">
              {line}
            </dd>
          ))}
        </div>
        <div>
          <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">Enfoque</dt>
          <dd className="mt-2 text-ink-soft">{member.focus.join(" · ")}</dd>
        </div>
      </dl>
    </article>
  );
}
