import Link from "next/link";
import { Monogram } from "@/components/ui/logo";
import { areaAnchor, practiceAreas } from "@/content/practice-areas";
import { navigation, sectionIds, site } from "@/content/site";
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/contact";
import { CurrentYear } from "./current-year";

const linkClass = "text-sm text-on-night-muted transition-colors duration-300 hover:text-on-night";

export function Footer() {
  return (
    <footer className="bg-night text-on-night">
      <div className="shell grid grid-cols-1 gap-14 py-20 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-5">
          <Monogram tone="paper" className="w-12" />
          <p className="serif mt-10 max-w-sm text-[2rem] leading-[1.1]">
            {site.tagline}
          </p>
        </div>

        <FooterColumn title="Sitio" className="md:col-span-2">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Especialidades" className="md:col-span-2">
          {practiceAreas.map((area) => (
            <Link key={area.slug} href={`/#${areaAnchor(area.slug)}`} className={linkClass}>
              Derecho {area.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Contacto" className="md:col-span-3">
          <a href={telUrl()} className={linkClass}>
            {site.contact.phone}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={linkClass}>
            WhatsApp
          </a>
          <a href={mailtoUrl()} className={`${linkClass} break-all`}>
            {site.contact.email}
          </a>
          <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className={linkClass}>
            Instagram
          </a>
          <a href={site.location.mapsUrl} target="_blank" rel="noreferrer" className={linkClass}>
            {site.contact.office}, {site.contact.city}
          </a>
        </FooterColumn>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-on-night/10 py-7 text-xs text-on-night-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © <CurrentYear /> {site.legalName}
        </span>
        <span>La información de este sitio es general y no constituye asesoría jurídica.</span>
        <Link href={`/#${sectionIds.home}`} className="transition-colors hover:text-on-night">
          Volver arriba ↑
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-[0.6875rem] uppercase tracking-[0.22em] text-on-night">{title}</h2>
      <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}
