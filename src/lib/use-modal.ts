"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

/**
 * Comportamiento común de las capas modales (menú móvil, visor de video):
 * - bloquea el scroll de la página mientras está abierta (data-scroll-locked en <html>),
 * - Escape la cierra,
 * - el tabulador circula dentro de la capa (no se escapa a la página de fondo),
 * - al cerrar, el foco vuelve al elemento que la abrió.
 */
export function useModal(open: boolean, onClose: () => void, container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.dataset.scrollLocked = "true";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !container.current) return;
      const items = [...container.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      delete root.dataset.scrollLocked;
      // Devuelve el foco solo si sigue en el documento (p. ej. no si se navegó a otra página).
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open, onClose, container]);
}
