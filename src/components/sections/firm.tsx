import { Reveal } from "@/components/motion/reveal";
import { commitments } from "@/content/approach";
import { practiceAreas } from "@/content/practice-areas";
import { sectionIds } from "@/content/site";
import { team } from "@/content/team";
import { VideoPresentation } from "./video-presentation";

const numerals = ["I", "II", "III"];

/** Cifras del despacho: todas salen de datos reales del sitio. */
const lead = team.find((m) => m.lead);
const facts = [
  ...(lead?.highlight ? [{ value: lead.highlight.value, label: "Años de litigio" }] : []),
  { value: String(practiceAreas.length), label: "Especialidades" },
  { value: "1", label: "Grupo de profesionales" },
];

/**
 * Presentación del despacho: declaración y, al pie de la columna (a la altura
 * de la base del video), tres cifras en una sola línea; a la derecha, el video
 * del socio director. Debajo, los tres compromisos.
 */
export function Firm() {
  return (
    <section id={sectionIds.firm} className="pb-12 pt-28 md:pb-20 md:pt-44">
      <div className="shell">
        <Reveal>
          <p className="label text-muted">El despacho</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <h2 className="serif text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">
                Cada caso, en manos de <i>quien lo estudia.</i>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Cuando nos confía un asunto, trabaja directamente con el abogado que lo lleva. Sin
                intermediarios y sin respuestas de formulario.
              </p>
              <p className="text-base text-muted">
                Preferimos decirle desde el inicio lo que es posible, lo que no lo es y lo que
                cuesta en tiempo y esfuerzo. Con esa claridad, las decisiones son suyas y la
                estrategia es nuestra.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-16 lg:mb-14 lg:mt-auto">
              <dl className="grid max-w-xl grid-cols-3 gap-6 border-t border-line-strong pt-8">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="sr-only">{fact.label}</dt>
                    <dd>
                      <span className="serif block text-3xl leading-none sm:text-[2.6rem]">{fact.value}</span>
                      <span className="mt-3 block text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                        {fact.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <VideoPresentation />
          </Reveal>
        </div>

        <ol className="mt-24 grid grid-cols-1 border-t border-ink md:mt-32 md:grid-cols-3">
          {commitments.map((item, i) => (
            <li
              key={item.title}
              className="border-b border-line py-10 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <Reveal delay={i * 0.08}>
                <span className="serif text-2xl italic text-slate">{numerals[i]}</span>
                <h3 className="serif mt-6 text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-xs leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
