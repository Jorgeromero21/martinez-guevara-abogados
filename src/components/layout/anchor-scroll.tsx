"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sectionIds } from "@/content/site";

/** En móvil y tableta (columnas apiladas), "Contacto" lleva directo al formulario. */
const STACKED_QUERY = "(max-width: 1023px)";
const FORM_ID = sectionIds.contactForm;

function resolveTarget(id: string) {
  if (id === sectionIds.contact && matchMedia(STACKED_QUERY).matches) {
    return document.getElementById(FORM_ID) ?? document.getElementById(id);
  }
  return document.getElementById(id);
}

const behavior = (): ScrollBehavior =>
  matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/**
 * Desplazamiento fiable a secciones de la misma página.
 *
 * El navegador (y el router) ignoran un enlace a "/#contacto" si la dirección
 * ya termina en "#contacto", y un enlace a "/" estando en "/" no sube. Este
 * componente intercepta esos clics, desplaza siempre a la sección (o arriba
 * del todo para "/") y actualiza la dirección sin recargar.
 * Los enlaces a otra página siguen su curso normal con next/link; al llegar,
 * si la dirección apunta a Contacto en móvil, se ajusta al formulario.
 */
export function AnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? resolveTarget(id) : null;
      if (id && !target) return;

      // Se evita la navegación del router; el resto de manejadores del enlace (p. ej. cerrar el menú) siguen funcionando.
      e.preventDefault();
      history.replaceState(history.state, "", id ? `#${id}` : location.pathname + location.search);
      if (id) window.dispatchEvent(new HashChangeEvent("hashchange"));

      const go = () => (target ? target.scrollIntoView({ behavior: behavior(), block: "start" }) : window.scrollTo({ top: 0, behavior: behavior() }));
      // Si un menú o visor tenía el scroll bloqueado (useModal), se espera a que lo libere.
      if (document.documentElement.dataset.scrollLocked) window.setTimeout(go, 80);
      else requestAnimationFrame(go);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Llegada desde otra página (p. ej. /areas/... → /#contacto): en móvil, ajustar al formulario.
  useEffect(() => {
    if (location.hash !== `#${sectionIds.contact}` || !matchMedia(STACKED_QUERY).matches) return;
    const timer = window.setTimeout(() => {
      document.getElementById(FORM_ID)?.scrollIntoView({ behavior: behavior(), block: "start" });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
