# Martínez Guevara · Abogados y Consultores

Sitio web de la firma. Next.js 16 (App Router), Tailwind CSS v4, Motion y Phosphor Icons.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm run start    # servir la compilación
npm run lint
```

Se despliega en Vercel sin configuración adicional.

## Estructura

```
src/
├─ app/                      Rutas (App Router)
│  ├─ layout.tsx             Fuentes, metadatos, cabecera, pie
│  ├─ page.tsx               Inicio: orden de las secciones
│  ├─ areas/[slug]/page.tsx  Página por especialidad (generada desde content/)
│  ├─ sitemap.ts · robots.ts SEO
│  └─ globals.css            Tokens de diseño (colores, fuentes, curvas, capas)
├─ content/                  ← TODO el texto y los datos del sitio
│  ├─ site.ts                Contacto, redes, navegación, etiqueta del CTA
│  ├─ practice-areas.ts      Especialidades: textos, situaciones y servicios
│  ├─ team.ts                Abogados
│  └─ approach.ts            Compromisos del despacho y etapas del método
├─ components/
│  ├─ layout/                Cabecera, menú móvil, pie, botón de WhatsApp
│  ├─ sections/              Una sección de la página por archivo
│  ├─ motion/                Animaciones reutilizables (cliente)
│  ├─ ui/                    Botón y logotipo
│  └─ seo/                   Datos estructurados schema.org
└─ lib/                      Utilidades (enlaces de contacto, curvas de animación)
public/images/               Fotografías, logotipo y imagen para redes sociales
```

## Tareas frecuentes

| Quiero… | Edite |
| --- | --- |
| Cambiar teléfono, correo, dirección o Instagram | `src/content/site.ts` |
| Agregar una especialidad | `src/content/practice-areas.ts` + fotografía en `public/images/photos/`. La página `/areas/<slug>`, el sitemap, el índice de la portada y el pie se generan solos. |
| Agregar un abogado | `src/content/team.ts` + foto en `public/images/team/` |
| Cambiar colores | Variables en `src/app/globals.css` (bloque `:root`) |
| Reordenar o quitar secciones | `src/app/page.tsx` |
| Cambiar el video de presentación | Reemplace `public/videos/presentacion.mp4` y su portada `presentacion-miniatura.jpg`; ajuste la duración en `presentationVideo` (`src/content/site.ts`) |
| Conectar el formulario a un servicio de envío | `src/components/sections/contact-form.tsx` (bloque marcado en `onSubmit`) |

## Sistema de diseño

- **Tipografía:** Bodoni Moda (titulares, con eje óptico) + Inter Tight (texto y rótulos en versalitas espaciadas).
- **Color:** casi monocromo: papel hueso, tinta grafito y el azul pizarra del logotipo como único acento. Bandas oscuras para el método y el pie.
- **Fotografía:** siempre en blanco y negro (clase `.photo`). Imágenes de Unsplash (licencia libre) en `public/images/photos/`.
- **Forma:** esquinas rectas, filetes finos y numeración editorial.
- **Movimiento:** discreto (fundidos y desplazamientos cortos); curva compartida en `src/lib/motion.ts`. Toda animación respeta `prefers-reduced-motion`.
- **Capas (z-index):** definidas en `globals.css` (`--z-fab`, `--z-header`, `--z-menu`).
