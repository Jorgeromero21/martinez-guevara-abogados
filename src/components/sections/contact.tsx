import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { sectionIds, site } from "@/content/site";
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/contact";
import { ContactForm } from "./contact-form";

const channels = [
  { label: "WhatsApp", value: site.contact.whatsapp, href: whatsappUrl(site.whatsappGreeting), external: true },
  { label: "Teléfono", value: site.contact.phone, href: telUrl() },
  { label: "Correo", value: site.contact.email, href: mailtoUrl() },
  { label: "Instagram", value: site.social.instagram.handle, href: site.social.instagram.url, external: true },
];

export function Contact() {
  return (
    <section id={sectionIds.contact} className="border-t border-line py-28 md:py-44">
      <div className="shell grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label text-muted">Contacto</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.5rem]">
              Hablemos de <i>su caso.</i>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md leading-relaxed text-muted">
              Escríbanos por el medio que prefiera. Revisamos cada solicitud y le respondemos
              para acordar una primera conversación.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-14 border-t border-ink">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
                      <span className="w-24 shrink-0 text-xs uppercase tracking-[0.2em] text-muted">
                        {c.label}
                      </span>
                      <span className="min-w-0 text-[0.9375rem] text-ink [overflow-wrap:anywhere] sm:text-base">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-ink/35 transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`#${sectionIds.location}`}
              className="group mt-8 block text-sm leading-relaxed text-muted transition-colors hover:text-ink"
            >
              <span className="mb-1 block text-xs uppercase tracking-[0.2em]">Oficina</span>
              {site.contact.office}, {site.contact.city}
              <span className="mt-2 block text-ink underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">
                Ver en el mapa ↓
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
