"use client";

import { MapPin } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const { lat, lng } = site.location;
/**
 * Dirección final del mapa de Google (sin clave de API). Se usa directamente para
 * ahorrar la redirección que hace maps.google.com/maps?output=embed.
 */
const embedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${lat},${lng}!6i17!3m1!1ses!5m1!1ses`;

/**
 * Mapa del despacho (Google Maps incrustado).
 *
 * El mapa pesa más de 1 MB, así que no se pide al principio (retrasaría la
 * portada) ni al llegar a él (se vería vacío un rato en el celular). Se pide en
 * segundo plano en cuanto la página terminó de cargar, o antes si el visitante
 * se acerca a la sección. Mientras llega se muestra un aviso discreto.
 */
export function OfficeMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Abre la conexión con Google desde ya: ahorra tiempo cuando se pida el mapa.
    preconnect("https://www.google.com");
    preconnect("https://maps.gstatic.com", { crossOrigin: "anonymous" });

    let idle = 0;
    let timer = 0;
    const request = () => setRequested(true);
    const whenIdle = () => {
      // Safari no tiene requestIdleCallback: espera breve como alternativa.
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(request, { timeout: 2500 });
      else timer = setTimeout(request, 1200) as unknown as number;
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    // Si el visitante baja rápido, se pide antes de que llegue.
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && request(), { rootMargin: "1500px 0px" });
    if (ref.current) io.observe(ref.current);

    return () => {
      window.removeEventListener("load", whenIdle);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cn("group relative overflow-hidden bg-paper-deep", className)}>
      {!loaded && (
        <div role="status" className="absolute inset-0 grid place-items-center text-muted">
          <span className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.2em]">
            <MapPin size={28} weight="light" aria-hidden className="animate-pulse text-slate motion-reduce:animate-none" />
            Cargando mapa…
          </span>
        </div>
      )}
      {requested && (
        <iframe
          src={embedUrl}
          title={`Mapa de ubicación: ${site.contact.office}, ${site.contact.city}`}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full border-0 grayscale-[0.9] contrast-[1.05] transition-[filter,opacity] duration-700 ease-out group-hover:grayscale-0",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
