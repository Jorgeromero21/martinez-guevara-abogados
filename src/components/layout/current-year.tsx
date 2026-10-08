"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Año actual calculado en el navegador (el prerender no puede depender de la fecha). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <span suppressHydrationWarning>{year}</span>;
}
