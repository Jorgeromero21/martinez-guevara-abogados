/**
 * Curva y duraciones compartidas. El movimiento del sitio es deliberadamente
 * discreto: fundidos y desplazamientos cortos, nunca rebotes.
 * El equivalente CSS está en globals.css (--ease-out).
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  ui: 0.3,
  reveal: 1.1,
} as const;
