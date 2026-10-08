import Image from "next/image";
import { site } from "@/content/site";

/**
 * Animación de entrada con el logotipo.
 * Se muestra cada vez que alguien entra al sitio (clic en un enlace, dirección
 * escrita, WhatsApp, Google...). No se muestra al recargar ni al volver con
 * "atrás". Va en el HTML del servidor para cubrir la página desde el primer
 * pintado; el script de <head> (introScript) la omite en esos casos.
 * Todo el movimiento es CSS (globals.css, bloque "Intro") para que siga fluido
 * mientras el navegador termina de cargar la página.
 */
export function Intro() {
  return (
    <div aria-hidden className="intro">
      <div className="intro-content">
        <span className="intro-mark relative block aspect-[245/196] w-16 md:w-24">
          <Image src="/images/brand/monogram-light.png" alt="" fill sizes="96px" preload className="object-contain" />
        </span>
        <span className="intro-name serif mt-8 block text-2xl uppercase sm:text-3xl md:text-4xl">{site.name}</span>
        <span className="intro-rule mt-6 block h-px w-24 md:w-32 bg-[var(--slate-light)]" />
        <span className="intro-descriptor mt-5 block text-[0.625rem] uppercase tracking-[0.34em] text-on-night/60">
          {site.descriptor}
        </span>
      </div>
    </div>
  );
}

/** Se ejecuta en <head>, antes del primer pintado: omite la intro al recargar o al volver atrás. */
export const introScript = `try{var n=performance.getEntriesByType("navigation")[0];var t=n&&n.type;if(t==="reload"||t==="back_forward")document.documentElement.dataset.intro="done"}catch(e){}`;
