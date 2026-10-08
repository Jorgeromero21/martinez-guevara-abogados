"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { practiceAreas } from "@/content/practice-areas";
import { sectionIds } from "@/content/site";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/contact";
import { easeOut } from "@/lib/motion";

type FieldName = "fullName" | "email" | "area" | "message";
type Errors = Partial<Record<FieldName, string>>;

const inputClass =
  "w-full border-b bg-transparent py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-muted/60 focus-visible:border-ink focus-visible:outline-none";

function validate(data: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (data.fullName.length < 3) errors.fullName = "Indique su nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Revise el correo electrónico.";
  return errors;
}

/**
 * Solicitud de consulta. No guarda datos: abre WhatsApp con un mensaje al
 * despacho ya redactado (nombre, correo, área y descripción); la persona solo
 * tiene que pulsar enviar. Para usar otro canal, reemplace el bloque marcado
 * en onSubmit.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: FieldName) => String(form.get(k) ?? "").trim();
    const data = {
      fullName: get("fullName"),
      email: get("email"),
      area: get("area"),
      message: get("message"),
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    // Envío: abre WhatsApp (app o web) con la solicitud redactada. *texto* = negrita en WhatsApp.
    const lines = [
      "Hola, quisiera solicitar una consulta.",
      "",
      `*Nombre:* ${data.fullName}`,
      `*Correo:* ${data.email}`,
      `*Área:* ${data.area || "Sin especificar"}`,
    ];
    if (data.message) lines.push(`*Descripción:* ${data.message}`);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  }

  const clear = (name: FieldName) => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined }));

  return (
    <form id={sectionIds.contactForm} noValidate onSubmit={onSubmit} className="scroll-mt-3 bg-paper-deep/70 p-7 sm:p-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Solicitud de consulta</p>
      <p className="serif mt-4 text-3xl">Cuéntenos lo esencial.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field name="fullName" label="Nombre completo" error={errors.fullName} className="sm:col-span-2">
          <input id="cf-fullName" name="fullName" type="text" autoComplete="name" required
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "cf-fullName-error" : undefined}
            onChange={() => clear("fullName")}
            className={cn(inputClass, errors.fullName ? "border-danger" : "border-line-strong")} />
        </Field>
        <Field name="email" label="Correo electrónico" error={errors.email} className="sm:col-span-2">
          <input id="cf-email" name="email" type="email" autoComplete="email" required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            onChange={() => clear("email")}
            className={cn(inputClass, errors.email ? "border-danger" : "border-line-strong")} />
        </Field>
        <Field name="area" label="Área (opcional)" className="sm:col-span-2">
          <select id="cf-area" name="area" defaultValue="" className={cn(inputClass, "border-line-strong")}>
            <option value="">Seleccione una opción</option>
            {practiceAreas.map((a) => (
              <option key={a.slug} value={a.title}>
                {a.title}
              </option>
            ))}
            <option value="Otro asunto">Otro asunto</option>
          </select>
        </Field>
        <Field name="message" label="Breve descripción (opcional)" className="sm:col-span-2">
          <textarea id="cf-message" name="message" rows={3}
            className={cn(inputClass, "resize-none border-line-strong")} />
        </Field>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        Al enviar se abrirá WhatsApp con su solicitud ya redactada; solo tiene que pulsar enviar.
        El sitio no almacena sus datos.
      </p>

      <button
        type="submit"
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-ink text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-slate"
      >
        Enviar solicitud
        <ArrowRight size={15} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </button>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="mt-6 border-l border-ink pl-4 text-sm text-ink-soft"
          >
            Abrimos WhatsApp con su solicitud redactada. Solo falta pulsar enviar en el chat.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  className,
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={`cf-${name}`} className="text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`cf-${name}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
