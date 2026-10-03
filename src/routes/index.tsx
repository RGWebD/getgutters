import { createFileRoute, Link } from "@tanstack/react-router";
import { OptimizedImage } from "@/components/OptimizedImage";
import { siteImages } from "@/lib/site-images";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Shield,
  Wrench,
  Droplets,
  Home,
  Building2,
  Sparkles,
  CheckCircle2,
  Hammer,
  ArrowRight,
  Award,
  Instagram,
  Facebook,
  MessageSquare,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Gutter Installation & Repair Jacksonville FL | Get Gutters",
      },
      {
        name: "description",
        content:
          "Family-owned seamless gutter pros in Orange Park serving Jacksonville FL — 6-inch gutters fabricated on-site. Free estimates: call or text (904) 589-0000.",
      },
      {
        property: "og:title",
        content: "Gutter Installation & Repair Jacksonville FL | Get Gutters",
      },
      {
        property: "og:description",
        content:
          "Family-owned seamless gutter pros in Orange Park serving Jacksonville FL — 6-inch gutters fabricated on-site. Free estimates: call or text (904) 589-0000.",
      },
      { property: "og:image", content: "https://getguttersjax.com/images/get-gutters-social.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://getguttersjax.com/images/get-gutters-social.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://getguttersjax.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": "https://getguttersjax.com/#business",
          name: "Get Gutters",
          url: "https://getguttersjax.com/",
          telephone: "+1-904-589-0000",
          description:
            "Family-owned gutter company providing seamless gutter installation, gutter cleaning, gutter repair, gutter guards, fascia and soffit work, commercial gutters, and downspout installation in Orange Park, Jacksonville, and nearby Northeast Florida communities.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "585 Bowie Blvd",
            addressLocality: "Orange Park",
            addressRegion: "FL",
            postalCode: "32073",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "07:00",
              closes: "19:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Saturday",
              opens: "07:00",
              closes: "15:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Sunday",
              opens: "09:00",
              closes: "17:00",
            },
          ],
          areaServed: serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: `${area.name}, Florida`,
          })),
          sameAs: [
            "https://www.facebook.com/getguttersjax",
            "https://www.instagram.com/getguttersjax/",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Gutter Services",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                url: `https://getguttersjax.com${service.to}`,
              },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homepageFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const PHONE = "(904) 589-0000";
const PHONE_TEL = "+19045890000";
const ADDRESS = "585 Bowie Blvd, Orange Park, FL 32073";
const HOURS = "Mon–Fri 7 AM–7 PM · Sat 7 AM–3 PM · Sun 9 AM–5 PM";

const services = [
  {
    icon: Droplets,
    title: "Seamless Gutter Installation",
    desc: "Custom-fabricated on-site with our commercial K-style machine. One continuous piece — no leaks, no seams, no compromises.",
    to: "/services/seamless-gutter-installation" as const,
  },
  {
    icon: Shield,
    title: "Gutter Guards & Leaf Protection",
    desc: "Micro-mesh and reverse-curve systems that keep leaves, pine needles and debris out — permanently.",
    to: "/services/gutter-guards" as const,
  },
  {
    icon: Sparkles,
    title: "Gutter Cleaning",
    desc: "Hand-cleaned, flushed, and inspected. We haul away every bit of debris and leave your property spotless.",
    to: "/services/gutter-cleaning" as const,
  },
  {
    icon: Wrench,
    title: "Gutter Repair",
    desc: "Sagging sections, leaking miters, loose hangers, and downspout damage — repaired to factory-new condition.",
    to: "/services/gutter-repair" as const,
  },
  {
    icon: Home,
    title: "Fascia & Soffit Installation",
    desc: "Precision aluminum fascia wrap and soffit installation to protect your roofline and eliminate wood rot.",
    to: "/services/fascia-soffit" as const,
  },
  {
    icon: Building2,
    title: "Commercial Gutter Systems",
    desc: "Heavy-gauge commercial gutters engineered for warehouses, storefronts, and multi-unit properties.",
    to: "/services/commercial-gutters" as const,
  },
  {
    icon: Hammer,
    title: "Downspout Installation",
    desc: "Oversized downspouts, decorative options, and underground drainage routing to protect your foundation.",
    to: "/services/downspout-installation" as const,
  },
];

const serviceAreas = [
  { name: "Orange Park", to: "/areas/orange-park" },
  { name: "Oakleaf Plantation", to: "/areas/oakleaf-plantation" },
  { name: "Lakeside", to: "/areas/lakeside" },
  { name: "Fleming Island", to: "/areas/fleming-island" },
  { name: "Argyle Forest", to: "/areas/argyle-forest" },
  { name: "Mandarin", to: "/areas/mandarin" },
  { name: "Middleburg", to: "/areas/middleburg" },
  { name: "Fruit Cove", to: "/areas/fruit-cove" },
  { name: "Jacksonville", to: null },
  { name: "San Marco", to: null },
  { name: "Avondale", to: null },
  { name: "Riverside", to: null },
  { name: "Ortega", to: null },
  { name: "Green Cove Springs", to: null },
] as const;

const homepageFaqs = [
  {
    question: "What gutter services does Get Gutters provide?",
    answer:
      "Get Gutters provides seamless gutter installation, gutter cleaning, gutter repair, gutter guards, fascia and soffit work, commercial gutter systems, and downspout installation.",
  },
  {
    question: "Do you provide free gutter estimates?",
    answer:
      "Yes. Homeowners and property managers can request a free estimate online or call or text Get Gutters at (904) 589-0000.",
  },
  {
    question: "Are seamless gutters fabricated at the property?",
    answer:
      "Get Gutters uses a commercial K-style gutter machine to form continuous 6-inch aluminum gutter runs on-site for the planned roofline sections.",
  },
  {
    question: "What areas does Get Gutters serve?",
    answer:
      "Get Gutters serves Orange Park, Oakleaf Plantation, Lakeside, Fleming Island, Argyle Forest, Mandarin, Middleburg, Fruit Cove, Jacksonville, San Marco, Avondale, Riverside, Ortega, Green Cove Springs, and nearby Northeast Florida communities.",
  },
  {
    question: "How do I know whether my gutters need repair or replacement?",
    answer:
      "Leaks, sagging, loose hangers, damaged downspouts, overflow, and widespread deterioration should be assessed before deciding whether a focused repair or replacement is the better option.",
  },
] as const;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <OptimizedImage
              image={siteImages.getGuttersLogo}
              sizes="44px"
              alt="Get Gutters logo"
              className="h-11 w-11 rounded-md object-contain"
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight">
                GET <span className="text-gold-gradient">GUTTERS</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Master Craftsmen
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary">
              Services
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary">
              About
            </a>
            <a href="#areas" className="text-sm text-muted-foreground hover:text-primary">
              Service Areas
            </a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary">
              Gallery
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-primary">
              FAQ
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/free-estimate"
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Get Free Estimate</span>
              <span className="sm:hidden">Estimate</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <OptimizedImage
          image={siteImages.heroTruck}
          alt=""
          aria-hidden
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
              <Star className="h-3 w-3 fill-primary" /> 5.0 · 85+ Google Reviews
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Seamless Gutters &amp; Gutter Services in{" "}
              <span className="text-gold-gradient">Jacksonville &amp; Orange Park</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Family-owned. Master-installed. Get Gutters protects Northeast Florida's finest homes
              with custom-fabricated seamless gutter systems — engineered on-site, installed to last
              a lifetime.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> Call {PHONE}
              </a>
              <Link
                to="/free-estimate"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" /> Get Free Estimate
              </Link>
              <a
                href={`sms:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10"
              >
                <MessageSquare className="h-4 w-4" /> Text {PHONE}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10"
              >
                Our Services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {[
                { n: "5.0★", l: "Google Rated" },
                { n: "100%", l: "Satisfaction" },
                { n: "Free", l: "Estimates" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-gold-gradient">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-luxe">
              <OptimizedImage
                image={siteImages.truckGate}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
                alt="Get Gutters truck and trailer"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-primary/40 bg-card/90 p-5 shadow-gold backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Top-of-the-Line Equipment</div>
                  <div className="text-xs text-muted-foreground">
                    2025 Ram 3500 Cummins · Commercial K-Style Mill
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">What We Do</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Every gutter service. <span className="text-gold-gradient">Done right.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From seamless installation to detailed cleanings and full fascia rebuilds — we handle
              it all with the precision of a master craftsman.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gold-gradient group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / EQUIPMENT */}
      <section id="about" className="border-t border-border/60 bg-card/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <OptimizedImage
                image={siteImages.gutterMachine}
                sizes="(min-width: 1024px) 25vw, 50vw"
                alt="Seamless K-style gutter machine"
                className="rounded-2xl border border-primary/30 object-cover shadow-luxe"
              />
              <OptimizedImage
                image={siteImages.fasciaInstall}
                sizes="(min-width: 1024px) 25vw, 50vw"
                alt="Fascia installation"
                className="rounded-2xl border border-primary/30 object-cover shadow-luxe"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Why Get Gutters</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              The gold standard in <span className="text-gold-gradient">Northeast Florida.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              We're a family-owned Orange Park company built on one belief: your home deserves the
              best. That's why we roll up in a fully-loaded 2025 Ram 3500 Cummins with a
              commercial-grade seamless gutter mill on board — so every foot of gutter is fabricated
              to your exact roofline, on-site, in a single continuous run.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Custom-milled seamless aluminum 6" K-style gutters',
                "Hidden hangers with stainless steel screws — no nails",

                "Licensed, insured, and background-checked crew",
                "Written workmanship warranty on every install",
                "Clean job site — every scrap removed, every time",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="areas" className="border-t border-border/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Service Areas</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Proudly serving <span className="text-gold-gradient">Northeast Florida.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Based in Orange Park — trusted throughout Jacksonville.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => {
              const content = (
                <>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span>{area.name}, FL</span>
                  </span>
                  {area.to && <ArrowRight className="h-4 w-4 shrink-0 text-primary" />}
                </>
              );

              return area.to ? (
                <a
                  key={area.name}
                  href={area.to}
                  aria-label={`View gutter services in ${area.name}, Florida`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm transition hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={area.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="border-t border-border/60 bg-card/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Our Work</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Craftsmanship you can <span className="text-gold-gradient">see.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real installs across Orange Park and Jacksonville — every run fabricated on-site from
              a single continuous piece of 6-inch aluminum.
            </p>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/30 bg-card/60 p-6 text-left">
              <div className="font-display text-lg font-semibold">
                Recent projects in{" "}
                <span className="text-gold-gradient">Orange Park &amp; Jacksonville</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  'Full-perimeter seamless 6" K-style installs on homes in Orange Park and Jacksonville',
                  "Oversized downspouts and custom drainage routing at entryways and patios",
                  "Matte black and white seamless systems with precision corner miters",
                  "Fascia and soffit rebuilds paired with new gutter runs",
                  "Gutter guard retrofits keeping pine needles and storm debris out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: siteImages.work1, label: "Oversized downspouts · entryway" },
              { img: siteImages.work3, label: "Seamless white K-style · corner miter" },
              { img: siteImages.work5, label: "Full perimeter install · modern stucco" },
              { img: siteImages.work6, label: "Custom downspout routing · patio side" },
              { img: siteImages.work8, label: "Matte black gutters · coastal home" },
              { img: siteImages.work4, label: "Bronze fascia detail · new construction" },
              { img: siteImages.work7, label: "Black seamless · brick estate" },
              { img: siteImages.work2, label: "Wrap-around seamless · rear elevation" },
              { img: siteImages.fasciaInstall, label: "Fascia rebuild · precision fit" },
            ].map((item, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-2xl border border-border shadow-luxe transition hover:border-primary/60 hover:shadow-gold"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <OptimizedImage
                    image={item.img}
                    alt={item.label}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-border/60 bg-background/70 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[siteImages.truckTrailer, siteImages.truckGate, siteImages.gutterMachine].map(
              (img, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-2xl border border-primary/30 shadow-luxe"
                >
                  <OptimizedImage
                    image={img}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt={`Get Gutters fleet ${i + 1}`}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="border-t border-border/60 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Helpful Answers</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Common gutter <span className="text-gold-gradient">questions.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Clear answers about services, estimates, service areas, and planning the right work
              for the property.
            </p>
          </div>
          <div className="mt-12 space-y-4">
            {homepageFaqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-card px-6 py-5 transition open:border-primary/50 open:shadow-gold"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                  <span>{item.question}</span>
                  <span
                    className="text-2xl font-light text-primary transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="border-t border-border/60 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-secondary to-card p-10 shadow-luxe lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary">Free Estimate</div>
                <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                  Ready for gutters <span className="text-gold-gradient">done right?</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Call Pablo today for a no-pressure walkthrough and a free written estimate. Most
                  estimates scheduled within 24 hours.
                </p>
                <div className="mt-8 flex flex-col items-start gap-3">
                  <Link
                    to="/free-estimate"
                    className="inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-lg font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
                  >
                    <Mail className="h-5 w-5" /> Get Free Estimate
                  </Link>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3 font-semibold text-primary transition hover:bg-primary/10"
                  >
                    <Phone className="h-4 w-4" /> Call {PHONE}
                  </a>
                  <a
                    href={`sms:${PHONE_TEL}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3 font-semibold text-primary transition hover:bg-primary/10"
                  >
                    <MessageSquare className="h-4 w-4" /> Text {PHONE}
                  </a>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-muted-foreground">{ADDRESS}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-muted-foreground">{HOURS}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-background pt-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <OptimizedImage
                image={siteImages.getGuttersLogo}
                sizes="48px"
                alt="Get Gutters"
                className="h-12 w-12 rounded-md object-contain"
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
            <p className="mt-4 text-sm text-muted-foreground">
              Family-owned seamless gutter specialists serving Orange Park, Jacksonville, and all of
              Northeast Florida.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/getguttersjax"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/getguttersjax/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/services/seamless-gutter-installation" className="hover:text-primary">
                  Seamless 6&quot; K-Style Installation
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-cleaning" className="hover:text-primary">
                  Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-guards" className="hover:text-primary">
                  Gutter Guards
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-repair" className="hover:text-primary">
                  Gutter Repair
                </Link>
              </li>
              <li>
                <Link to="/services/fascia-soffit" className="hover:text-primary">
                  Fascia &amp; Soffit
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-gutters" className="hover:text-primary">
                  Commercial Gutters
                </Link>
              </li>
              <li>
                <Link to="/services/downspout-installation" className="hover:text-primary">
                  Downspout Installation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {PHONE}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> {ADDRESS}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" /> {HOURS}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Get Gutters. Licensed & Insured. All rights reserved.
        </div>

        {/* POWERED BY RGWEBD SCROLLING MARQUEE */}
        <a
          href="https://www.rgwebd.com"
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden border-t border-primary/30 bg-gradient-to-r from-background via-secondary to-background py-3"
          aria-label="Powered by RGWebD"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).flatMap((_, group) =>
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`${group}-${i}`} className="mx-8 flex items-center gap-3 text-sm">
                  <OptimizedImage
                    image={siteImages.rgwebdLogo}
                    sizes="112px"
                    alt="RGWebD"
                    className="h-7 w-auto rounded"
                  />
                  <span className="text-muted-foreground">Powered by</span>
                  <span className="text-gold-gradient font-semibold tracking-wide">
                    RGWebD — Reese Gets You Ranked
                  </span>
                  <span className="text-primary">✦</span>
                </div>
              )),
            )}
          </div>
        </a>
      </footer>
    </div>
  );
}
