import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { practiceAreas } from "@/content/practice-areas";
import { contactCta, sectionIds } from "@/content/site";
import { AreasIndex } from "./areas-index";

export function Areas() {
  return (
    <section id={sectionIds.areas} className="bg-paper-deep/60 py-28 md:py-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label text-muted">Especialidades</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="serif mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">
                Cinco frentes, <i>un mismo estándar.</i>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-muted">
              Concentramos la práctica en las áreas que conocemos a fondo. Despliegue cada una
              para ver en qué casos intervenimos y cómo lo hacemos.
            </p>
          </Reveal>
        </div>

        <AreasIndex areas={practiceAreas} />

        <Reveal className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">¿Su asunto no encaja en ninguna categoría? Igual podemos revisarlo.</p>
          <ButtonLink href={contactCta.href} variant="line">
            Consultar su caso
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
