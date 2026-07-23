import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.jpeg.asset.json";
import truckTrailer from "@/assets/truck-trailer.jpeg.asset.json";
import truckGate from "@/assets/truck-gate.jpeg.asset.json";
import gutterMachine from "@/assets/gutter-machine.jpeg.asset.json";
import fasciaInstall from "@/assets/fascia-install.jpeg.asset.json";
import rgwebdLogo from "@/assets/rgwebd-logo.jpeg.asset.json";
import heroTruck from "@/assets/hero-truck.jpeg.asset.json";
import work1 from "@/assets/work-1.jpeg.asset.json";
import work2 from "@/assets/work-2.jpeg.asset.json";
import work3 from "@/assets/work-3.jpeg.asset.json";
import work4 from "@/assets/work-4.jpeg.asset.json";
import work5 from "@/assets/work-5.jpeg.asset.json";
import work6 from "@/assets/work-6.jpeg.asset.json";
import work7 from "@/assets/work-7.jpeg.asset.json";
import work8 from "@/assets/work-8.jpeg.asset.json";
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
  TreePine,
  ArrowRight,
  Award,
  Instagram,
  Facebook,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Get Gutters | Seamless Gutter Installation, Repair & Cleaning — Jacksonville & Orange Park FL",
      },
      {
        name: "description",
        content:
          "Family-owned seamless gutter experts serving Jacksonville, Orange Park, Ponte Vedra, Nocatee, St. Augustine & 20+ Northeast Florida communities. 5-star rated. Free estimates: (904) 589-0000.",
      },
      {
        property: "og:title",
        content: "Get Gutters | Seamless Gutter Installation, Repair & Cleaning — Jacksonville & Orange Park FL",
      },
      {
        property: "og:description",
        content:
          "Family-owned seamless gutter experts serving Jacksonville, Orange Park, Ponte Vedra, Nocatee, St. Augustine & 20+ Northeast Florida communities. 5-star rated. Free estimates: (904) 589-0000.",
      },
    ],
  }),
  component: Index,
});

const PHONE = "(904) 589-0000";
const PHONE_TEL = "+19045890000";

const services = [
  {
    icon: Droplets,
    title: "Seamless Gutter Installation",
    desc: "Custom-fabricated on-site with our commercial K-style machine. One continuous piece — no leaks, no seams, no compromises.",
  },
  {
    icon: Shield,
    title: "Gutter Guards & Leaf Protection",
    desc: "Micro-mesh and reverse-curve systems that keep leaves, pine needles and debris out — permanently.",
  },
  {
    icon: Sparkles,
    title: "Gutter Cleaning",
    desc: "Hand-cleaned, flushed, and inspected. We haul away every bit of debris and leave your property spotless.",
  },
  {
    icon: Wrench,
    title: "Gutter Repair",
    desc: "Sagging sections, leaking miters, loose hangers, and downspout damage — repaired to factory-new condition.",
  },
  {
    icon: Home,
    title: "Fascia & Soffit Installation",
    desc: "Precision aluminum fascia wrap and soffit installation to protect your roofline and eliminate wood rot.",
  },
  {
    icon: Building2,
    title: "Commercial Gutter Systems",
    desc: "Heavy-gauge commercial gutters engineered for warehouses, storefronts, and multi-unit properties.",
  },
  {
    icon: Hammer,
    title: "Downspout Installation",
    desc: "Oversized downspouts, decorative options, and underground drainage routing to protect your foundation.",
  },
  {
    icon: TreePine,
    title: "Fence Installation & Repair",
    desc: "Wood, aluminum, and vinyl fencing — installed and repaired with the same craftsman-level precision as our gutter work.",
  },
];

const serviceAreas = [
  "Orange Park",
  "Jacksonville",
  "Ponte Vedra Beach",
  "Nocatee",
  "St. Augustine",
  "Fleming Island",
  "Middleburg",
  "Mandarin",
  "San Marco",
  "Avondale",
  "Riverside",
  "Ortega",
  "Julington Creek",
  "Fruit Cove",
  "Jacksonville Beach",
  "Neptune Beach",
  "Atlantic Beach",
  "Queen's Harbour",
  "Deerwood",
  "Sawgrass",
  "World Golf Village",
  "Palm Valley",
  "Vilano Beach",
  "Green Cove Springs",
  "St. Johns",
  "Bartram Park",
  "Amelia Island",
  "Fernandina Beach",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo.url} alt="Get Gutters logo" className="h-11 w-11 rounded-md object-contain" />
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
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary">Services</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary">About</a>
            <a href="#areas" className="text-sm text-muted-foreground hover:text-primary">Service Areas</a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary">Gallery</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</a>
          </nav>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroTruck.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
              <Star className="h-3 w-3 fill-primary" /> 5.0 · 85+ Google Reviews
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Seamless Gutters.{" "}
              <span className="text-gold-gradient">Flawless Craft.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Family-owned. Master-installed. Get Gutters protects Northeast
              Florida's finest homes with custom-fabricated seamless gutter
              systems — engineered on-site, installed to last a lifetime.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> Free Estimate — {PHONE}
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
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-luxe">
              <img src={truckGate.url} alt="Get Gutters truck and trailer" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-primary/40 bg-card/90 p-5 shadow-gold backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Top-of-the-Line Equipment</div>
                  <div className="text-xs text-muted-foreground">2025 Ram 3500 Cummins · Commercial K-Style Mill</div>
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
              From seamless installation to detailed cleanings and full fascia
              rebuilds — we handle it all with the precision of a master craftsman.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60 hover:shadow-gold"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gold-gradient group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / EQUIPMENT */}
      <section id="about" className="border-t border-border/60 bg-card/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <img src={gutterMachine.url} alt="Seamless K-style gutter machine" className="rounded-2xl border border-primary/30 object-cover shadow-luxe" />
              <img src={fasciaInstall.url} alt="Fascia installation" className="rounded-2xl border border-primary/30 object-cover shadow-luxe" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Why Get Gutters</div>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              The gold standard in <span className="text-gold-gradient">Northeast Florida.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              We're a family-owned Orange Park company built on one belief: your
              home deserves the best. That's why we roll up in a fully-loaded 2025
              Ram 3500 Cummins with a commercial-grade seamless gutter mill on
              board — so every foot of gutter is fabricated to your exact roofline,
              on-site, in a single continuous run.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Custom-milled seamless aluminum 6\" K-style gutters",
                "Wood, aluminum & vinyl fence installation and repair",
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
              Based in Orange Park — trusted throughout Jacksonville, the Beaches,
              Ponte Vedra, Nocatee, St. Augustine and every premier community in between.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm transition hover:border-primary/60 hover:bg-primary/5"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>{area}, FL</span>
              </div>
            ))}
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
              Real installs across Northeast Florida — seamless K-style runs, custom
              downspouts, precision miters, and clean fascia lines on every project.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: work3, label: "Seamless white K-style · corner miter" },
              { img: work5, label: "Full perimeter install · modern stucco" },
              { img: work6, label: "Custom downspout routing · patio side" },
              { img: work8, label: "Matte black gutters · coastal home" },
              { img: work4, label: "Bronze fascia detail · new construction" },
              { img: work7, label: "Black seamless · brick estate" },
              { img: work1, label: "Oversized downspouts · entryway" },
              { img: work2, label: "Wrap-around seamless · rear elevation" },
              { img: fasciaInstall, label: "Fascia rebuild · precision fit" },
            ].map((item, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-2xl border border-border shadow-luxe transition hover:border-primary/60 hover:shadow-gold"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.img.url}
                    alt={item.label}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="border-t border-border/60 bg-background/70 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[truckTrailer, truckGate, gutterMachine].map((img, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-primary/30 shadow-luxe">
                <img src={img.url} alt={`Get Gutters fleet ${i + 1}`} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
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
                  Call Pablo today for a no-pressure walkthrough and a free
                  written estimate. Most estimates scheduled within 24 hours.
                </p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-lg font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
                >
                  <Phone className="h-5 w-5" /> {PHONE}
                </a>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-muted-foreground">585 Bowie Blvd, Orange Park, FL 32073</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-muted-foreground">
                      Mon–Fri 7 AM – 7 PM · Sat 7 AM – 3 PM · Sun 9 AM – 5 PM
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-primary">
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
              <img src={logo.url} alt="Get Gutters" className="h-12 w-12 rounded-md object-contain" />
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
              Family-owned seamless gutter specialists serving Orange Park,
              Jacksonville, and all of Northeast Florida.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.facebook.com/getguttersjax" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/getguttersjax/" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Seamless Gutter Installation</li>
              <li>Gutter Cleaning</li>
              <li>Gutter Guards</li>
              <li>Gutter Repair</li>
              <li>Fascia & Soffit</li>
              <li>Commercial Gutters</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {PHONE}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 585 Bowie Blvd, Orange Park, FL</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon–Sun · 7 AM – 7 PM</li>
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
                  <img src={rgwebdLogo.url} alt="RGWebD" className="h-7 w-auto rounded" />
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
