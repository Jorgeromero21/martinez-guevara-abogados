import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { sectionIds, site } from "@/content/site";

const { lat, lng, mapsUrl } = site.location;
/** Mapa incrustado de Google (no requiere clave de API). */
const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=es&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

/**
 * Ubicación del despacho: mapa a todo el ancho, en escala de grises para
 * integrarse con la paleta (recupera el color al pasar el cursor), y una
 * ficha con la dirección y accesos directos a Google Maps.
 */
export function Location() {
  return (
    <section id={sectionIds.location} aria-label="Ubicación" className="border-t border-line">
      <div className="relative">
        <div className="group relative h-[28rem] w-full overflow-hidden bg-paper-deep md:h-[36rem]">
          <iframe
            src={embedUrl}
            title={`Mapa de ubicación: ${site.contact.office}, ${site.contact.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.9] contrast-[1.05] transition-[filter] duration-700 ease-out group-hover:grayscale-0"
          />
        </div>

        <div className="shell md:pointer-events-none md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2">
          <Reveal className="-mt-16 md:pointer-events-auto md:mt-0 md:max-w-lg">
            <div className="relative bg-ink p-8 text-paper shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-10">
              <p className="label text-on-night-muted">Ubicación</p>
              <h2 className="serif mt-6 text-4xl md:text-5xl">
                Visítenos en <i>nuestro despacho.</i>
              </h2>

              <p className="mt-8 flex gap-3 leading-relaxed text-on-night/85">
                <MapPin size={20} weight="light" aria-hidden className="mt-0.5 shrink-0" />
                <span>
                  {site.contact.office}
                  <span className="block text-on-night-muted">{site.contact.city}</span>
                </span>
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex h-12 sm:flex-1 whitespace-nowrap items-center justify-center gap-2 bg-paper px-5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-white"
                >
                  Cómo llegar
                  <ArrowUpRight size={14} aria-hidden className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 sm:flex-1 items-center justify-center gap-2 whitespace-nowrap border border-on-night/35 px-5 text-[0.75rem] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-on-night"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="h-16 md:h-0" />
    </section>
  );
}
