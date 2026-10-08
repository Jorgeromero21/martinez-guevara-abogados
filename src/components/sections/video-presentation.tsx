"use client";

import {
  ArrowCounterClockwise,
  ArrowsOutSimple,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { presentationVideo as video } from "@/content/site";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

/** Estado que se traspasa entre la tarjeta y el visor ampliado. */
type Handoff = { time: number; muted: boolean; playing: boolean };

type Status = "idle" | "playing" | "paused" | "ended";

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Video de presentación reproducido en la misma tarjeta (sin visor a pantalla
 * completa). Antes de reproducir solo se carga la miniatura; el video se
 * descarga al pulsar reproducir. Controles: reproducir/pausa, progreso con
 * búsqueda, tiempo, sonido y "Ampliar", que abre el mismo video en un visor
 * centrado (no a pantalla completa) y lo continúa desde el mismo segundo.
 */
export function VideoPresentation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);
  const [second, setSecond] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [expanded, setExpanded] = useState<Handoff | null>(null);
  const expandButton = useRef<HTMLButtonElement>(null);

  const started = status !== "idle";
  const showChrome = status !== "playing" || chromeVisible;

  // Progreso: se escribe directamente en el transform de la barra (sin re-render por fotograma).
  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && barRef.current && v.duration) {
        barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
        const s = Math.floor(v.currentTime);
        setSecond((prev) => (prev === s ? prev : s));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  // Si la tarjeta sale de la pantalla mientras suena, se pausa.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || status !== "playing") return;
    const io = new IntersectionObserver(([entry]) => entry.intersectionRatio < 0.25 && v.pause(), {
      threshold: [0, 0.25],
    });
    io.observe(v);
    return () => io.disconnect();
  }, [status]);

  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  // Mientras reproduce, los controles se ocultan tras un momento sin interacción.
  const wake = useCallback(() => {
    setChromeVisible(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setChromeVisible(false), 2200);
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      void v.play();
      wake();
    } else {
      v.pause();
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    wake();
  }

  function openExpanded() {
    const v = videoRef.current;
    if (!v) return;
    const handoff = { time: v.currentTime, muted: v.muted, playing: !v.paused };
    v.pause();
    setExpanded(handoff);
  }

  function closeExpanded({ time, muted: m, playing }: Handoff) {
    setExpanded(null);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    v.muted = m;
    setMuted(m);
    setSecond(Math.floor(time));
    if (barRef.current && v.duration) barRef.current.style.transform = `scaleX(${time / v.duration})`;
    if (playing) void v.play();
    expandButton.current?.focus();
  }

  function seek(e: PointerEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    setSecond(Math.floor(v.currentTime));
    wake();
  }

  const iconButton =
    "grid size-10 shrink-0 place-items-center text-on-night transition-[background-color,transform] duration-150 ease-out hover:bg-on-night/15 active:scale-[0.94]";

  return (
    // El ancho se limita para que la tarjeta (9:16) nunca supere el 76% del alto de la pantalla.
    <figure className="mx-auto w-full max-w-[calc(76svh*9/16)] lg:mr-0">
      <div
        className="group relative aspect-[9/16] w-full overflow-hidden bg-night text-on-night"
        onPointerMove={status === "playing" ? wake : undefined}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="none"
          playsInline
          onClick={togglePlay}
          onPlay={() => setStatus("playing")}
          onPause={(e) => !e.currentTarget.ended && setStatus("paused")}
          onEnded={() => setStatus("ended")}
          aria-label={`Video: ${video.speaker}, ${video.role.toLowerCase()}, presenta el despacho`}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />

        {/* Miniatura: también es lo que se ve al terminar. */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-200 ease-out",
            status === "idle" || status === "ended" ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(min-width: 640px) 420px, 100vw"
            className="object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/0 to-night/0" />

          <button
            type="button"
            onClick={togglePlay}
            aria-label={status === "ended" ? "Ver el video de nuevo" : `Reproducir video (${video.duration})`}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="relative mt-[22%] grid place-items-center">
              {status === "idle" && (
                <span
                  aria-hidden
                  className="absolute size-24 animate-ping rounded-full border border-on-night/40 [animation-duration:2.6s] motion-reduce:hidden"
                />
              )}
              <span className="relative grid size-20 place-items-center rounded-full border border-on-night/70 bg-night/35 backdrop-blur-sm transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.96] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-on-night [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-ink">
                {status === "ended" ? (
                  <ArrowCounterClockwise size={24} aria-hidden />
                ) : (
                  <Play size={22} weight="fill" aria-hidden className="translate-x-0.5" />
                )}
              </span>
            </span>
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <p className="serif text-2xl leading-tight">{video.speaker}</p>
            <p className="shrink-0 text-xs tabular-nums text-on-night/75">{video.duration}</p>
          </div>
        </div>

        {/* Controles durante la reproducción. */}
        {started && status !== "ended" && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-night/0 pt-16 transition-opacity duration-200 ease-out",
              showChrome ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Progreso del video"
              aria-valuemin={0}
              aria-valuemax={29}
              aria-valuenow={second}
              aria-valuetext={`${formatTime(second)} de ${video.duration}`}
              onPointerDown={seek}
              onKeyDown={(e) => {
                const v = videoRef.current;
                if (!v || !v.duration || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
                e.preventDefault();
                v.currentTime = Math.min(v.duration, Math.max(0, v.currentTime + (e.key === "ArrowRight" ? 5 : -5)));
                if (barRef.current) barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
                setSecond(Math.floor(v.currentTime));
              }}
              className="mx-4 flex h-5 cursor-pointer items-center"
            >
              <span className="relative block h-px w-full bg-on-night/30">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left bg-on-night"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </div>

            <div className="flex items-center gap-1 px-2 pb-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={status === "playing" ? "Pausar" : "Reproducir"}
                className={iconButton}
              >
                {status === "playing" ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
              </button>
              <span className="px-1 text-xs tabular-nums text-on-night/80">
                {formatTime(second)} / {video.duration}
              </span>
              <span className="flex-1" />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Activar sonido" : "Quitar sonido"}
                aria-pressed={muted}
                className={iconButton}
              >
                {muted ? <SpeakerSlash size={19} /> : <SpeakerHigh size={19} />}
              </button>
              <button
                ref={expandButton}
                type="button"
                onClick={openExpanded}
                aria-label="Ampliar video"
                className={iconButton}
              >
                <ArrowsOutSimple size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">
        {video.role} · Conozca cómo trabajamos.
      </figcaption>

      <ExpandedVideo handoff={expanded} onClose={closeExpanded} />
    </figure>
  );
}

/**
 * Visor ampliado: video centrado sobre fondo oscuro, sin ocupar la pantalla
 * completa del navegador. Recibe el segundo y el sonido de la tarjeta y los
 * devuelve al cerrar. Cierra con el botón, con Escape o clic fuera del video.
 */
function ExpandedVideo({ handoff, onClose }: { handoff: Handoff | null; onClose: (h: Handoff) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    const v = ref.current;
    if (!handoff) return;
    onClose(v ? { time: v.currentTime, muted: v.muted, playing: !v.paused && !v.ended } : handoff);
  }, [handoff, onClose]);

  useEffect(() => {
    if (!handoff) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [handoff, close]);

  // Portal al <body>: el visor no debe quedar dentro de contenedores animados.
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {handoff && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Presentación de ${video.speaker}`}
          className="fixed inset-0 z-[var(--z-menu)] grid place-items-center bg-night/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3, ease: easeOut }}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            autoFocus
            aria-label="Cerrar video ampliado"
            className="absolute right-4 top-4 z-10 flex h-11 items-center gap-2 px-2 text-[0.75rem] uppercase tracking-[0.18em] text-on-night md:right-8 md:top-6"
          >
            Cerrar
            <X size={18} aria-hidden />
          </button>

          <motion.div
            className="relative aspect-[9/16] h-[min(86svh,calc((100vw-2rem)*16/9))] overflow-hidden bg-night shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px) scale(0.96)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.98)" }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={ref}
              src={video.src}
              poster={video.poster}
              controls
              controlsList="nofullscreen nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              autoPlay={handoff.playing}
              muted={handoff.muted}
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = handoff.time;
              }}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
