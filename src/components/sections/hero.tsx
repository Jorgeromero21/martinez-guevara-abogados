"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { areaAnchor, practiceAreas } from "@/content/practice-areas";
import { contactCta, sectionIds } from "@/content/site";
import { easeOut } from "@/lib/motion";

/**
 * Portada a sangre completa: columnas en blanco y negro, titular de gran
 * formato abajo a la izquierda y el índice de especialidades como zócalo.
 */
export function Hero() {
  const reduce = useReducedMotion();
  // Primera visita: la intro cubre la pantalla ~1.5 s; la entrada del hero espera.
  const wait =
    typeof document !== "undefined" && document.documentElement.dataset.intro !== "done" ? 1.5 : 0;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: delay + wait, ease: easeOut },
  });

  return (
    <section
      id={sectionIds.home}
      aria-label="Presentación"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-on-night"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, delay: wait, ease: easeOut }}
      >
        <Image
          src="/images/photos/hero-columnas.jpg"
          alt="Columnas neoclásicas de un edificio judicial vistas desde abajo"
          fill
          preload
          sizes="100vw"
          className="photo object-cover object-[60%_center]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/30 to-transparent" />

      <div className="shell flex flex-1 flex-col justify-end pb-14 pt-36 md:pb-20">
        <motion.p className="label text-on-night/80" {...enter(0.2)}>
          Abogados &amp; Consultores · Colombia
        </motion.p>

        <motion.h1
          className="serif mt-8 max-w-[14ch] text-[3.4rem] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          {...enter(0.35)}
        >
          El derecho, ejercido <i>con carácter.</i>
        </motion.h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-md text-base leading-relaxed text-on-night/75 md:col-span-5 md:text-lg"
            {...enter(0.6)}
          >
            Representamos a personas, familias y servidores públicos con una estrategia
            precisa y un trato directo, de la primera consulta a la última actuación.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-5 md:col-span-7 md:justify-end"
            {...enter(0.75)}
          >
            <ButtonLink href={contactCta.href} tone="paper">
              {contactCta.label}
            </ButtonLink>
            <ButtonLink href={`/#${sectionIds.areas}`} variant="line" tone="paper" arrow={false}>
              Ver especialidades
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <motion.nav
        aria-label="Especialidades"
        className="border-t border-on-night/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 + wait }}
      >
        <ul className="shell flex gap-8 overflow-x-auto py-5 text-[0.6875rem] uppercase tracking-[0.22em] text-on-night/60 [scrollbar-width:none] md:justify-between">
          {practiceAreas.map((area, i) => (
            <li key={area.slug} className="shrink-0">
              <Link href={`/#${areaAnchor(area.slug)}`} className="transition-colors duration-300 hover:text-on-night">
                <span className="mr-3 tabular-nums text-on-night/35">0{i + 1}</span>
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </section>
  );
}
