import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Facebook,
  Home,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
} from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { siteImages } from "@/lib/site-images";
import { serviceAreaPages, serviceAreaSlugs, type ServiceAreaContent } from "@/lib/service-areas";

const PHONE = "(904) 589-0000";
const PHONE_TEL = "+19045890000";
const ADDRESS = "585 Bowie Blvd, Orange Park, FL 32073";
const HOURS = "Mon–Fri 7 AM–7 PM · Sat 7 AM–3 PM · Sun 9 AM–5 PM";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Get+Gutters+585+Bowie+Blvd+Orange+Park+FL";

const services = [
  {
    title: "Seamless Gutter Installation",
    description: "Continuous 6-inch K-style aluminum gutter runs formed on-site for the property.",
    to: "/services/seamless-gutter-installation" as const,
  },
  {
    title: "Gutter Repair",
    description:
      "Assessment of leaks, sagging runs, loose hangers, damaged sections, and overflow.",
    to: "/services/gutter-repair" as const,
  },
  {
    title: "Gutter Cleaning",
    description:
      "Debris removal, flushing, and inspection of the visible gutter and downspout path.",
    to: "/services/gutter-cleaning" as const,
  },
  {
    title: "Gutter Guards",
    description: "Protection options that can reduce leaves, pine needles, and debris entry.",
    to: "/services/gutter-guards" as const,
  },
  {
    title: "Fascia & Soffit",
    description: "Roof-edge work for damaged or exposed fascia and soffit around the gutter line.",
    to: "/services/fascia-soffit" as const,
  },
  {
    title: "Commercial Gutters",
    description: "Gutter and downspout systems planned for commercial roof and drainage demands.",
    to: "/services/commercial-gutters" as const,
  },
  {
    title: "Downspout Installation",
    description: "Outlet and downspout placement designed to move water away from the structure.",
    to: "/services/downspout-installation" as const,
  },
];

export function LocalServiceAreaPage({ area }: { area: ServiceAreaContent }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Get Gutters home">
            <OptimizedImage
              image={siteImages.getGuttersLogo}
              sizes="44px"
              alt="Get Gutters logo"
              className="h-11 w-11 rounded-md object-contain"
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold">
                GET <span className="text-gold-gradient">GUTTERS</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Master Craftsmen
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <a href="/#services" className="text-sm text-muted-foreground hover:text-primary">
              Services
            </a>
            <a href="/#about" className="text-sm text-muted-foreground hover:text-primary">
              About
            </a>
            <a href="/#areas" className="text-sm text-muted-foreground hover:text-primary">
              Service Areas
            </a>
            <a href="/#gallery" className="text-sm text-muted-foreground hover:text-primary">
              Gallery
            </a>
            <a href="/#contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/free-estimate"
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Get Free Estimate</span>
              <span className="sm:hidden">Estimate</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border/60">
          <OptimizedImage
            image={area.image}
            sizes="100vw"
            alt={area.imageAlt}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/65" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Home className="h-4 w-4" aria-hidden="true" /> Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <a href="/#areas" className="transition hover:text-primary">
                    Service Areas
                  </a>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li aria-current="page" className="text-foreground">
                  {area.name}
                </li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">{area.eyebrow}</div>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {area.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {area.heroIntro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/free-estimate"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Get a Free Estimate
                </Link>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-sm sm:grid-cols-3 sm:px-6">
            {[
              "Free project estimates",
              "6-inch seamless gutters formed on-site",
              `Serving ${area.name} and nearby communities`,
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Local Gutter Planning
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {area.overviewTitle}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                {area.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-luxe sm:p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-primary">
                What We Provide
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                Gutter services available in {area.name}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {services.map((service) => (
                  <li key={service.to}>
                    <Link
                      to={service.to}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 text-sm font-medium transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>{service.title}</span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40 py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Communities We Serve
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Neighborhoods in and around {area.name}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Get Gutters provides estimates throughout {area.name}, including homes in these
                locally recognized communities and nearby streets.
              </p>
              <ul className="mt-7 flex flex-wrap gap-3">
                {area.neighborhoods.map((neighborhood) => (
                  <li
                    key={neighborhood}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm"
                  >
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {neighborhood}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="rounded-2xl border border-primary/30 bg-background p-6 shadow-luxe sm:p-8">
              <div className="flex gap-1 text-primary" aria-label="5-star Google review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-8">
                “{area.customerReview.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{area.customerReview.name}</span>
                <span aria-hidden="true"> · </span>
                Review posted on Get Gutters&apos; Google profile
              </figcaption>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Get Gutters on Google <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </figure>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Watch the Water Path
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {area.concernsTitle}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">{area.concernsIntro}</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {area.concerns.map((concern) => (
                <div
                  key={concern}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-5"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6">{concern}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-luxe">
              <OptimizedImage
                image={siteImages.gutterMachine}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt="Get Gutters commercial K-style gutter machine used to form seamless gutters on-site"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Property-Specific Scope
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {area.localTitle}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                {area.localCopy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/free-estimate"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
                >
                  Request an Estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`sms:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 font-semibold text-primary transition hover:bg-primary/10"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" /> Text Get Gutters
                </a>
              </div>
            </div>
          </div>
        </section>

        {area.projectPhotos.length > 0 && (
          <section className="border-y border-border/60 bg-card/40 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <div className="text-xs uppercase tracking-[0.3em] text-primary">
                  Local Project Work
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Recent Get Gutters projects in {area.name}
                </h2>
              </div>
              <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {area.projectPhotos.map((photo) => (
                  <figure
                    key={photo.caption}
                    className="overflow-hidden rounded-2xl border border-border bg-background shadow-luxe"
                  >
                    <OptimizedImage
                      image={photo.image}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      alt={photo.alt}
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                    <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-border/60 bg-card/40 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Helpful Answers</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              {area.name} gutter service questions
            </h2>
            <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-background px-5 sm:px-8">
              {area.faqs.map((item) => (
                <section key={item.question} className="py-6">
                  <h3 className="font-display text-xl font-semibold">{item.question}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary">
                  Nearby Service Areas
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold">Explore nearby communities</h2>
              </div>
              <a href="/#areas" className="text-sm font-semibold text-primary hover:underline">
                View all service areas
              </a>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {area.nearby.map((slug) => {
                const nearby = serviceAreaPages[slug];
                return (
                  <a
                    key={slug}
                    href={`/areas/${slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex items-center gap-2 font-display text-lg font-semibold">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                      {nearby.name}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-primary transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-secondary to-card p-8 text-center shadow-luxe sm:p-12">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Free {area.name} Estimate
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Show us what your gutter system is doing.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                Request an on-site estimate for gutter installation, repair, cleaning, guards,
                downspouts, fascia, soffit, or commercial gutter work in {area.name}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/free-estimate"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Get a Free Estimate
                </Link>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1.15fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <OptimizedImage
                image={siteImages.getGuttersLogo}
                sizes="44px"
                alt="Get Gutters"
                className="h-11 w-11 rounded-md object-contain"
              />
              <div>
                <div className="font-display text-xl font-bold">
                  GET <span className="text-gold-gradient">GUTTERS</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Master Craftsmen · Seamless Excellence
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Family-owned seamless gutter specialists serving Orange Park, Jacksonville, and nearby
              Northeast Florida communities.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/getguttersjax"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary"
                aria-label="Get Gutters on Facebook"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/getguttersjax/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary"
                aria-label="Get Gutters on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {services.map((service) => (
                <li key={service.to}>
                  <Link to={service.to} className="hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Service Areas</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {serviceAreaSlugs.map((slug) => {
                const item = serviceAreaPages[slug];
                return (
                  <li key={slug}>
                    <a href={`/areas/${slug}`} className="hover:text-primary">
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="flex items-start gap-2 hover:text-primary">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {ADDRESS}
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {HOURS}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Get Gutters. Licensed &amp; Insured. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
