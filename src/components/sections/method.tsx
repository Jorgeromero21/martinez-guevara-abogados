import { Reveal } from "@/components/motion/reveal";
import { steps } from "@/content/approach";
import { sectionIds } from "@/content/site";
import { MethodSteps } from "./method-steps";

/** Método de trabajo sobre banda oscura: cuatro etapas recorridas por una barra de progreso. */
export function Method() {
  return (
    <section id={sectionIds.method} className="bg-night py-28 text-on-night md:py-40">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label text-on-night-muted">Método</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="serif mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">
                Sin sorpresas. <i>Con orden.</i>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-on-night-muted">
              Todo encargo sigue el mismo recorrido, para que sepa siempre qué se está haciendo y
              qué viene después.
            </p>
          </Reveal>
        </div>

        <MethodSteps steps={steps} />
      </div>
    </section>
  );
}
