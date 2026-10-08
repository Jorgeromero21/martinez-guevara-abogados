"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const { lat, lng } = site.location;

/**
 * Mapa interactivo del despacho (Leaflet + OpenStreetMap).
 * - Se mueve con un solo dedo en el celular (el mapa incrustado de Google
 *   obliga a usar dos) y con el ratón en el computador.
 * - Está en escala de grises; recupera el color al pasar el ratón o al
 *   tocarlo, y vuelve a gris cuando sale de la pantalla.
 * - La rueda del ratón no hace zoom, para no atrapar el scroll de la página.
 */
export function OfficeMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    void import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;
      map = L.map(el, {
        center: [lat, lng],
        zoom: 17,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
      L.control.zoom({ position: "topright", zoomInTitle: "Acercar", zoomOutTitle: "Alejar" }).addTo(map);
      L.control
        .attribution({ position: "bottomright", prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>')
        .addTo(map);

      const pin = L.divIcon({ className: "office-pin", html: "<span></span>", iconSize: [22, 22], iconAnchor: [11, 11] });
      L.marker([lat, lng], { icon: pin, title: "Martínez Guevara Abogados" })
        .addTo(map)
        .bindPopup(`<strong>${site.legalName}</strong><br>${site.contact.office}<br>${site.contact.city}`);
    });

    // Al salir de la pantalla vuelve a gris.
    const io = new IntersectionObserver(([entry]) => !entry.isIntersecting && setActive(false));
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={`Mapa: ${site.contact.office}, ${site.contact.city}`}
      data-active={active || undefined}
      onPointerDown={() => setActive(true)}
      className={`office-map relative isolate z-0 bg-paper-deep ${className ?? ""}`}
    />
  );
}
