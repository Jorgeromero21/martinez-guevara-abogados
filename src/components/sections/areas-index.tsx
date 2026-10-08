"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { areaAnchor, areaWhatsappMessage, type PracticeArea } from "@/content/practice-areas";
import { contactCta } from "@/content/site";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/contact";
import { twoDigits } from "@/lib/format";
import { easeOut } from "@/lib/motion";

/**
 * Índice desplegable de especialidades. Al hacer clic en una fila, su ficha
 * se abre en el mismo lugar (solo una abierta a la vez). Las anclas
 * /#area-<slug> abren directamente la ficha correspondiente.
 */
export function AreasIndex({ areas }: { areas: PracticeArea[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const recenter = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(recenter.current), []);
  const id = useId();

  // Abre la ficha indicada en la URL (enlaces desde la portada o el pie).
  useEffect(() => {
    const sync = () => {
      const match = areas.find((a) => `#${areaAnchor(a.slug)}` === window.location.hash);
      if (match) setOpen(match.slug);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [areas]);

  function toggle(slug: string, row: HTMLElement) {
    const opening = open !== slug;
    setOpen(opening ? slug : null);
    if (!opening) return;
    // Si otra ficha se cierra por encima, la fila se desplaza: la devolvemos a la vista.
    window.clearTimeout(recenter.current);
    recenter.current = window.setTimeout(() => {
      const top = row.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.45) {
        row.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 520);
  }

  return (
    <ul className="mt-16 border-t border-ink md:mt-20">
      {areas.map((area, i) => {
        const isOpen = open === area.slug;
        const panelId = `${id}-panel-${i}`;
        return (
          <li key={area.slug} id={areaAnchor(area.slug)} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={(e) => toggle(area.slug, e.currentTarget.parentElement!)}
              className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-8 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-x-4 text-left md:grid-cols-[4rem_1fr_1fr_auto] md:py-10"
            >
              <span className="text-xs tabular-nums text-muted">{twoDigits(i + 1)}</span>
              <span
                className={cn(
                  "serif text-[1.85rem] transition-[color,transform] duration-500 ease-out [overflow-wrap:anywhere] sm:text-5xl md:text-6xl lg:text-7xl",
                  open && !isOpen ? "text-ink/30" : "text-ink",
                  isOpen ? "italic md:translate-x-3" : "md:group-hover:translate-x-3",
                )}
              >
                {area.name}
              </span>
              <span className="col-start-2 mt-3 text-sm leading-relaxed text-muted md:col-start-3 md:mt-0 md:text-base">
                {area.summary}
              </span>
              <ToggleIcon open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label={area.title}
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto", transition: { duration: 0.75, ease: easeOut } }}
                  exit={{ height: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
                >
                  <AreaDetail area={area} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/** Círculo con una cruz que gira y se rellena al abrir. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "col-start-3 row-start-1 grid size-11 place-items-center self-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-out md:col-start-4 md:size-14",
        open
          ? "rotate-[135deg] border-ink bg-ink text-paper"
          : "border-line-strong text-ink group-hover:border-ink group-hover:rotate-90",
      )}
    >
      <span className="relative block size-3.5 md:size-4">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
      </span>
    </span>
  );
}

const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

function AreaDetail({ area }: { area: PracticeArea }) {
  const reduce = useReducedMotion();

  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
      };

  return (
    <div className="pb-14 md:pb-20">
      {/* Filete que se dibuja de izquierda a derecha al abrir. */}
      <motion.div
        aria-hidden
        className="h-px origin-left bg-ink/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: easeOut }}
      />

      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-[4rem_1fr_1fr] md:gap-x-4 lg:gap-x-10">
        {/* Fotografía: cortina que se descorre de arriba abajo mientras la imagen se asienta. */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden bg-paper-deep md:col-start-2 md:aspect-[4/5]"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, delay: 0.1, ease: easeOut }}
          >
            <Image
              src={area.image.src}
              alt={area.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="photo object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div className="md:col-start-3" variants={stagger} initial="hidden" animate="shown">
          <motion.p variants={item} className="label text-muted">
            {area.title}
          </motion.p>
          <motion.h3 variants={item} className="serif mt-6 text-3xl md:text-4xl lg:text-[2.75rem]">
            {area.headline}
          </motion.h3>
          <motion.p variants={item} className="mt-6 leading-relaxed text-ink-soft">
            {area.description}
          </motion.p>

          <motion.p variants={item} className="mt-10 text-xs uppercase tracking-[0.2em] text-muted">
            En qué intervenimos
          </motion.p>
          <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2">
            {area.services.map((s) => (
              <li key={s} className="border border-line-strong px-3 py-1.5 text-sm text-ink-soft">
                {s}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={contactCta.href}>{contactCta.label}</ButtonLink>
            <ButtonLink
              href={whatsappUrl(areaWhatsappMessage(area))}
              variant="line"
              arrow="external"
            >
              WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Link
              href={`/areas/${area.slug}`}
              className="tap group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Abrir en página propia
              <ArrowUpRight size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
