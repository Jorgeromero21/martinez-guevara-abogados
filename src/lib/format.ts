/** Número con dos cifras para índices editoriales: 1 → "01", 12 → "12". */
export const twoDigits = (n: number) => String(n).padStart(2, "0");

/** Palabra para cantidades pequeñas en titulares ("Cinco frentes"). Por encima de diez, la cifra. */
const words = ["Cero", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez"];
export const countWord = (n: number) => words[n] ?? String(n);
