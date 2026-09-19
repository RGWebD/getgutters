import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/free-estimate")({
  head: () => ({
    meta: [
      {
        title: "Get a Free Estimate | Get Gutters — Jacksonville & Orange Park FL",
      },
      {
        name: "description",
        content:
          "Request a free, no-pressure gutter or fence estimate from Get Gutters. Serving Jacksonville, Orange Park, Ponte Vedra, Nocatee, St. Augustine and Northeast Florida.",
      },
      {
        property: "og:title",
        content: "Get a Free Estimate | Get Gutters",
      },
      {
        property: "og:description",
        content:
          "Request a free, no-pressure gutter or fence estimate from Get Gutters — Northeast Florida's seamless gutter experts.",
      },
    ],
  }),
  component: FreeEstimatePage,
});

const PHONE = "(904) 589-0000";
const PHONE_TEL = "+19045890000";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9()+\-\s.]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255)
    .or(z.literal("")),
  service: z.string().max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please describe the work you need (at least 10 characters)")
    .max(2000),
});

const SERVICES = [
  "6\" Seamless Gutter Installation",
  "Gutter Cleaning",
  "Gutter Guards",
  "Fascia & Soffit",
  "Downspouts & Drainage",
  "Wood / Vinyl Fence Installation",
  "Other / Not Sure",
];

function FreeEstimatePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("estimate_requests").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      service: parsed.data.service,
      message: parsed.data.message,
    });
    setStatus(error ? "error" : "sent");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Get Gutters
        </Link>

        <div className="mt-6 text-xs uppercase tracking-[0.3em] text-primary">
          Free Estimate
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Tell us about <span className="text-gold-gradient">your project.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Fill out the form below and Pablo will get back to you with a free,
          no-pressure estimate — most requests answered within 24 hours. Prefer
          to talk? Call{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-primary underline">
            {PHONE}
          </a>
          .
        </p>

        {status === "sent" ? (
          <div className="mt-10 rounded-2xl border border-primary/40 bg-card p-8 text-center shadow-gold">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-semibold">
              Request received!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks, {form.name.split(" ")[0]} — we'll be in touch shortly. If
              it's urgent, call{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-primary underline">
                {PHONE}
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mt-10 space-y-5 rounded-2xl border border-primary/40 bg-card p-6 shadow-luxe sm:p-8"
          >
            <Field label="Your Name *" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                maxLength={100}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                placeholder="John Smith"
              />
            </Field>
            <Field label="Phone Number *" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                maxLength={20}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                placeholder="(904) 555-0123"
              />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                maxLength={255}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                placeholder="you@email.com (optional)"
              />
            </Field>
            <Field label="Service Needed" error={errors.service}>
              <select
                value={form.service}
                onChange={set("service")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Describe the Work *" error={errors.message}>
              <textarea
                value={form.message}
                onChange={set("message")}
                maxLength={2000}
                rows={5}
                className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                placeholder="Tell us what you need done — e.g. new seamless gutters on a two-story home, about 150 ft…"
              />
            </Field>

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong sending your request — please try again or
                call {PHONE}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-lg font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 disabled:opacity-60"
            >
              <Mail className="h-5 w-5" />
              {status === "sending" ? "Sending…" : "Send My Free Estimate Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
