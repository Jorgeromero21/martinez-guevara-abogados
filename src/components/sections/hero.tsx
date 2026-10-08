import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { areaAnchor, practiceAreas } from "@/content/practice-areas";
import { contactCta, sectionIds } from "@/content/site";
import { twoDigits } from "@/lib/format";

/** Retardo de entrada de cada elemento (s); lo consume la clase .hero-enter de globals.css. */
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Portada a sangre completa: columnas en blanco y negro, titular de gran
 * formato abajo a la izquierda y el índice de especialidades como zócalo.
 *
 * Sin JavaScript de animación: el contenido está visible desde el primer
 * pintado. Si la intro se muestra, ella misma lo revela al subir; si no
 * (recarga), entra con un fundido CSS (.hero-enter / .hero-zoom en globals.css).
 */
export function Hero() {
  return (
    <section
      id={sectionIds.home}
      aria-label="Presentación"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-on-night"
    >
      <div className="hero-zoom absolute inset-0 -z-20">
        <Image
          src="/images/photos/hero-columnas.jpg"
          alt="Columnas neoclásicas de un edificio judicial vistas desde abajo"
          fill
          preload
          sizes="100vw"
          className="photo object-cover object-[60%_center]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/30 to-transparent" />

      <div className="shell flex flex-1 flex-col justify-end pb-14 pt-36 md:pb-20">
        <p className="hero-enter label text-on-night/80" style={delay(0.2)}>
          Abogados &amp; Consultores · Colombia
        </p>

        <h1
          className="hero-enter serif mt-8 max-w-[14ch] text-[3.4rem] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          style={delay(0.35)}
        >
          El derecho, ejercido <i>con carácter.</i>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <p
            className="hero-enter max-w-md text-base leading-relaxed text-on-night/75 md:col-span-5 md:text-lg"
            style={delay(0.6)}
          >
            Representamos a personas, familias y servidores públicos con una estrategia
            precisa y un trato directo, de la primera consulta a la última actuación.
          </p>

          <div
            className="hero-enter flex flex-wrap items-center gap-x-8 gap-y-5 md:col-span-7 md:justify-end"
            style={delay(0.75)}
          >
            <ButtonLink href={contactCta.href} tone="paper">
              {contactCta.label}
            </ButtonLink>
            <ButtonLink href={`/#${sectionIds.areas}`} variant="line" tone="paper" arrow={false}>
              Ver especialidades
            </ButtonLink>
          </div>
        </div>
      </div>

      <nav aria-label="Especialidades" className="hero-enter border-t border-on-night/15" style={delay(1)}>
        <ul className="shell flex gap-8 overflow-x-auto py-5 text-xs uppercase tracking-[0.22em] text-on-night/60 [scrollbar-width:none] md:justify-between">
          {practiceAreas.map((area, i) => (
            <li key={area.slug} className="shrink-0">
              <Link href={`/#${areaAnchor(area.slug)}`} className="tap transition-colors duration-300 hover:text-on-night">
                <span className="mr-3 tabular-nums text-on-night/35">{twoDigits(i + 1)}</span>
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
