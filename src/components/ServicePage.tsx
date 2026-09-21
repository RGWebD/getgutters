import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Home,
  MessageSquare,
  Phone,
} from "lucide-react";
import logo from "@/assets/logo.jpeg.asset.json";
import rgwebdLogo from "@/assets/rgwebd-logo.jpeg.asset.json";

const PHONE = "(904) 589-0000";
const PHONE_TEL = "+19045890000";
const ADDRESS = "585 Bowie Blvd, Orange Park, FL 32073";
const HOURS = "Mon–Fri 7 AM–7 PM · Sat 7 AM–3 PM · Sun 9 AM–5 PM";

export type ServiceLink = {
  title: string;
  description: string;
  to:
    | "/services/seamless-gutter-installation"
    | "/services/gutter-repair"
    | "/services/gutter-guards";
};

export type ServicePageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  overviewTitle: string;
  overview: string[];
  situationsTitle: string;
  situationsIntro: string;
  situations: string[];
  processTitle: string;
  process: Array<{ title: string; description: string }>;
  climateTitle: string;
  climate: string;
  questions: Array<{ question: string; answer: string }>;
  related: ServiceLink[];
};

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Get Gutters home">
            <img src={logo.url} alt="Get Gutters logo" className="h-11 w-11 rounded-md object-contain" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold">
                GET <span className="text-gold-gradient">GUTTERS</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Master Craftsmen
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`sms:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Text {PHONE}</span>
              <span className="sm:hidden">Text</span>
            </a>
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
          <img
            src={content.imageUrl}
            alt={content.imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/65" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Home className="h-4 w-4" aria-hidden="true" /> Home
                  </Link>
                </li>
                <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                <li aria-current="page" className="text-foreground">{content.title}</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">{content.eyebrow}</div>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE}
                </a>
                <a href={`sms:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" /> Text {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{content.overviewTitle}</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                {content.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-card p-6 shadow-luxe sm:p-8">
              <h2 className="font-display text-2xl font-semibold">{content.situationsTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.situationsIntro}</p>
              <ul className="mt-5 space-y-3">
                {content.situations.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">How We Approach It</div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{content.processTitle}</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.process.map((step, index) => (
                <div key={step.title} className="border-l-2 border-primary px-5 py-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step {index + 1}</div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{content.climateTitle}</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">{content.climate}</p>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Helpful Answers</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Common homeowner questions</h2>
            <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-background px-5 sm:px-8">
              {content.questions.map((item) => (
                <section key={item.question} className="py-6">
                  <h3 className="font-display text-xl font-semibold">{item.question}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold">Related gutter services</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {content.related.map((service) => (
                <Link key={service.to} to={service.to} className="group rounded-lg border border-border bg-card p-6 transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                    <ArrowRight className="h-5 w-5 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Talk With Get Gutters</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Discuss what your home needs.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Call or text Get Gutters to discuss your gutter project in Orange Park, Jacksonville, or the surrounding Northeast Florida area.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE}</a>
              <a href={`sms:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageSquare className="h-4 w-4" aria-hidden="true" /> Text {PHONE}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Get Gutters" className="h-11 w-11 rounded-md object-contain" />
              <div className="font-display text-xl font-bold">GET <span className="text-gold-gradient">GUTTERS</span></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Family-owned seamless gutter specialists serving Orange Park, Jacksonville, and Northeast Florida.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/seamless-gutter-installation" className="hover:text-primary">Seamless Gutter Installation</Link></li>
              <li><Link to="/services/gutter-repair" className="hover:text-primary">Gutter Repair</Link></li>
              <li><Link to="/services/gutter-guards" className="hover:text-primary">Gutter Guards</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{PHONE}</li><li>{ADDRESS}</li><li>{HOURS}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Get Gutters. All rights reserved.</div>
        <a href="https://www.rgwebd.com" target="_blank" rel="noreferrer" className="group block overflow-hidden border-t border-primary/30 bg-gradient-to-r from-background via-secondary to-background py-3" aria-label="Powered by RGWebD">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).flatMap((_, group) => Array.from({ length: 6 }).map((_, index) => (
              <div key={`${group}-${index}`} className="mx-8 flex items-center gap-3 text-sm">
                <img src={rgwebdLogo.url} alt="RGWebD" className="h-7 w-auto rounded" />
                <span className="text-muted-foreground">Powered by</span><span className="text-gold-gradient font-semibold tracking-wide">RGWebD — Reese Gets You Ranked</span><span className="text-primary">✦</span>
              </div>
            )))}
          </div>
        </a>
      </footer>
    </div>
  );
}