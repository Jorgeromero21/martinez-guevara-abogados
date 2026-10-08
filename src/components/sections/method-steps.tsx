"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { twoDigits } from "@/lib/format";
import { easeOut } from "@/lib/motion";

type Step = { title: string; body: string };

/** Tiempo que tarda la barra en recorrer cada etapa (segundos). */
const STEP_DURATION = 1.4;
const ease = easeOut;

const ROW_QUERY = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(ROW_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Etapas del método recorridas por una barra de progreso.
 * - Escritorio (4 en fila): al entrar la sección, la barra recorre las etapas
 *   en orden, de la primera a la última, y cada una se ilumina al llegar.
 * - Móvil y tableta (apiladas): cada etapa se carga al aparecer en pantalla.
 * Al salir de la vista se reinicia, para volver a verlo. Con movimiento
 * reducido todo aparece completo, sin recorrido.
 */
export function MethodSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const listInView = useInView(ref, { amount: 0.45 });
  const reduce = useReducedMotion() ?? false;
  const row = useSyncExternalStore(subscribe, () => window.matchMedia(ROW_QUERY).matches, () => true);

  return (
    <ol ref={ref} className="mt-20 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <StepItem
          key={step.title}
          step={step}
          index={i}
          reduce={reduce}
          sequence={row ? { active: listInView, delay: i * STEP_DURATION } : null}
        />
      ))}
    </ol>
  );
}

function StepItem({
  step,
  index,
  reduce,
  sequence,
}: {
  step: Step;
  index: number;
  reduce: boolean;
  /** En fila: activación y retardo comunes. Apiladas (null): cada etapa se activa sola. */
  sequence: { active: boolean; delay: number } | null;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const selfInView = useInView(ref, { amount: 0.6 });

  const active = reduce || (sequence ? sequence.active : selfInView);
  const delay = reduce || !sequence ? 0 : sequence.delay;
  const on = (duration: number, extra = {}) =>
    active ? { duration: reduce ? 0 : duration, delay, ...extra } : { duration: 0 };

  return (
    <li ref={ref} className="flex h-full flex-col pb-10 lg:min-h-72">
      {/* Pista y barra de progreso: la barra crece de izquierda a derecha a ritmo constante. */}
      <div aria-hidden className="relative h-px w-full bg-on-night/20">
        <motion.span
          className="absolute inset-0 origin-left bg-on-night"
          initial={false}
          animate={{ transform: active ? "scaleX(1)" : "scaleX(0)" }}
          transition={on(STEP_DURATION, { ease: "linear" })}
        />
        {/* Punto que marca la llegada a la etapa. */}
        <motion.span
          className="absolute -top-[3px] left-0 size-[7px] rounded-full bg-on-night"
          initial={false}
          animate={{ opacity: active ? 1 : 0, transform: active ? "scale(1)" : "scale(0.6)" }}
          transition={on(0.25, { ease })}
        />
      </div>

      {/*
        La etapa pendiente no se atenúa entera (perdería contraste): solo el título pasa
        de gris (6.3:1, legible) a blanco cuando la barra llega a ella.
      */}
      <div className="pt-8">
        <span className="text-xs tabular-nums tracking-[0.2em] text-on-night-muted">ETAPA {twoDigits(index + 1)}</span>
        <h3
          className={`serif mt-10 text-4xl transition-colors duration-500 ease-[var(--ease-out)] ${active ? "text-on-night" : "text-on-night-muted"}`}
          style={{ transitionDelay: active ? `${delay}s` : "0s" }}
        >
          {step.title}
        </h3>
        <p className="mt-4 max-w-xs leading-relaxed text-on-night-muted">{step.body}</p>
      </div>
    </li>
  );
}
