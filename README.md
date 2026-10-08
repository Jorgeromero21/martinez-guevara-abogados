# Martínez Guevara · Abogados & Consultores

Sitio web de la firma. Next.js 16 (App Router), Tailwind CSS v4, Motion y Phosphor Icons.
Publicado en https://mg-abogados-opal.vercel.app (Vercel; cada `git push` a `main` se publica solo).

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm run start    # servir la compilación
npm run lint
```

## Estructura

```
src/
├─ app/                      Rutas (App Router)
│  ├─ layout.tsx             Fuentes, metadatos, intro, cabecera, pie
│  ├─ page.tsx               Inicio: orden de las secciones
│  ├─ areas/[slug]/page.tsx  Página por especialidad (generada desde content/)
│  ├─ sitemap.ts · robots.ts SEO
│  └─ globals.css            Tokens de diseño, portada, intro (colores, fuentes, curvas, capas)
├─ content/                  ← el texto y los datos del sitio
│  ├─ site.ts                Contacto, ubicación, video, navegación, anclas, mensajes de WhatsApp
│  ├─ practice-areas.ts      Especialidades: nombre, textos, servicios, mensaje de WhatsApp
│  ├─ team.ts                Abogados (lead: true = socio principal)
│  └─ approach.ts            Compromisos del despacho y etapas del método
├─ components/
│  ├─ layout/                Intro, cabecera, menú móvil, pie, botón de WhatsApp,
│  │                         anchor-scroll (desplazamiento fiable a secciones)
│  ├─ sections/              Una sección de la página por archivo (video, mapa, formulario…)
│  ├─ motion/                Animación de aparición reutilizable (cliente)
│  ├─ ui/                    Botón y logotipo
│  └─ seo/                   Datos estructurados schema.org
└─ lib/                      Enlaces de contacto, curvas de animación, formato, capas modales
public/images/               Fotografías, logotipo y imagen para redes sociales
public/videos/               Video de presentación y su miniatura
next.config.ts               Cabeceras de seguridad (CSP, anti-clickjacking, etc.)
```

## Tareas frecuentes

| Quiero… | Edite |
| --- | --- |
| Cambiar teléfono, correo, dirección o Instagram | `src/content/site.ts` |
| Cambiar la ubicación del mapa | `location` en `src/content/site.ts` |
| Agregar una especialidad | `src/content/practice-areas.ts` + fotografía en `public/images/photos/`. La página `/areas/<slug>`, el sitemap, el índice de la portada, el formulario y el pie se generan solos. |
| Agregar un abogado | `src/content/team.ts` + foto en `public/images/team/` |
| Cambiar colores | Variables en `src/app/globals.css` (bloque `:root`) |
| Reordenar o quitar secciones | `src/app/page.tsx` |
| Cambiar el video de presentación | Reemplace `public/videos/presentacion.mp4` y `presentacion-miniatura.jpg`; ajuste `duration` en `presentationVideo` (`src/content/site.ts`). El reproductor lee la duración real del archivo. |
| Cambiar el destino del formulario | `src/components/sections/contact-form.tsx` (bloque marcado en `onSubmit`; hoy abre WhatsApp con la solicitud) |
| Permitir un nuevo servicio externo (p. ej. analítica) | Añadir su dominio a la CSP en `next.config.ts` |

## Sistema de diseño

- **Tipografía:** Bodoni Moda reforzada en titulares (eje óptico fijo en 11 y peso 500 para que los trazos finos se vean en Android) + Inter Tight en texto. Rótulos de 12 px como mínimo.
- **Color:** casi monocromo: papel hueso, tinta grafito y el azul pizarra del logotipo como único acento. Bandas oscuras para el método y el pie.
- **Fotografía:** ambientes en blanco y negro (clase `.photo`); retratos del equipo y video a color. Imágenes de Unsplash (licencia libre) en `public/images/photos/`.
- **Forma:** esquinas rectas, filetes finos y numeración editorial.
- **Movimiento:** discreto (fundidos y desplazamientos cortos); curva compartida en `src/lib/motion.ts` y `--ease-out`. Toda animación respeta `prefers-reduced-motion`.
- **Toque:** zonas táctiles de 44 px como mínimo (clase `.tap` para enlaces de texto pequeños).
- **Capas (z-index):** definidas en `globals.css` (`--z-fab`, `--z-header`, `--z-menu`, `--z-intro`).
