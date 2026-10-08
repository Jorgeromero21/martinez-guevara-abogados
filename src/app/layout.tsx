import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { AnchorScroll } from "@/components/layout/anchor-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Intro, introScript } from "@/components/layout/intro";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

/** Eje óptico activo: la Bodoni gana contraste a medida que crece el tamaño. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.legalName,
    title: site.title,
    description: site.shareDescription,
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: site.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
    images: ["/images/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${interTight.variable} ${bodoni.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <JsonLd />
      </head>
      <body className="min-h-dvh">
        <Intro />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-menu)] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />
        <AnchorScroll />
      </body>
    </html>
  );
}
