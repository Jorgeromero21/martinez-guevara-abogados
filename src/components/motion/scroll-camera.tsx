"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Movimientos de cámara disponibles (0 = inicio del recorrido, 1 = final):
 * - rise: la cámara sube (la foto baja y se acerca). Para la portada.
 * - push: la cámara avanza hacia el fondo de la escena (acercamiento profundo).
 * - pan:  la cámara se desliza en horizontal, con un leve acercamiento.
 */
type Move = "rise" | "push" | "pan";

const moves: Record<Move, { from: [number, number, number]; to: [number, number, number] }> = {
  // [desplazamiento X %, desplazamiento Y %, escala]
  rise: { from: [0, 0, 1.04], to: [0, 14, 1.16] },
  push: { from: [0, 0, 1.05], to: [0, -3, 1.42] },
  pan: { from: [-5, 0, 1.14], to: [5, 0, 1.14] },
};

type ScrollCameraProps = {
  src: string;
  alt: string;
  sizes?: string;
  move: Move;
  /**
   * "pass": el recorrido dura mientras la sección cruza la pantalla.
   * "leave": dura mientras la sección (que empieza arriba, como la portada) sale de la pantalla.
   */
  range?: "pass" | "leave";
  preload?: boolean;
  className?: string;
  imageClassName?: string;
};

/**
 * Fotografía que se mueve con el scroll como un plano de cámara: avanza al
 * bajar y retrocede al subir, igual que un video controlado por el scroll.
 * Solo anima transform (sin coste de maquetación); con movimiento reducido
 * la foto queda quieta.
 */
export function ScrollCamera({
  src,
  alt,
  sizes = "100vw",
  move,
  range = "pass",
  preload,
  className,
  imageClassName,
}: ScrollCameraProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: range === "leave" ? ["start start", "end start"] : ["start end", "end start"],
  });
  const transform = useCameraTransform(scrollYProgress, move);

  return (
    <div ref={ref} aria-hidden={alt === "" || undefined} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className={cn("absolute inset-0 will-change-transform", move === "rise" && "-top-[16%]")}
        style={reduce ? { transform: `scale(${moves[move].from[2]})` } : { transform }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", imageClassName)} />
      </motion.div>
    </div>
  );
}

function useCameraTransform(progress: MotionValue<number>, move: Move) {
  const { from, to } = moves[move];
  return useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, p));
    const [x, y, s] = from.map((v, i) => v + (to[i] - v) * t);
    return `translate3d(${x}%, ${y}%, 0) scale(${s})`;
  });
}
