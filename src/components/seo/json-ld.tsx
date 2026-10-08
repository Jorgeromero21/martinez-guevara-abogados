import { practiceAreas } from "@/content/practice-areas";
import { site } from "@/content/site";
import { team } from "@/content/team";

/** Datos estructurados para buscadores (schema.org LegalService). */
const [locality, region] = site.contact.city.split(",").map((part) => part.trim());

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.legalName,
    url: site.url,
    image: `${site.url}/images/og.png`,
    logo: `${site.url}/images/brand/logo-seal.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.office,
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "CO",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
    hasMap: site.location.mapsUrl,
    sameAs: [site.social.instagram.url],
    knowsAbout: practiceAreas.map((area) => area.title),
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
