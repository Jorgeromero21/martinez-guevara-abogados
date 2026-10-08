import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Política de seguridad de contenido (CSP), según la guía "Without Nonces" de
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
 * - Solo se cargan recursos del propio sitio; el mapa de Google es el único
 *   marco externo permitido (frame-src).
 * - 'unsafe-inline' en scripts es necesario sin nonces (scripts en línea de
 *   Next.js, de la intro y de los datos estructurados). Usar nonces obligaría
 *   a renderizar cada visita en el servidor y perder las páginas estáticas.
 * - vercel.live: barra de comentarios de las vistas previas de Vercel.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://vercel.live${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://vercel.live",
  "frame-src https://maps.google.com https://www.google.com https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Nadie puede incrustar el sitio en un marco ajeno (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // El navegador no "adivina" tipos de archivo.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Al salir hacia otro sitio solo se envía el dominio, no la ruta completa.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // El sitio no usa cámara, micrófono ni ubicación; se bloquean explícitamente.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // HTTPS obligatorio (Vercel ya lo envía; se declara también por si se cambia de alojamiento).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // No anunciar la tecnología del servidor.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
