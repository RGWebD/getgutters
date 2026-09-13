import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "gg-visitor-id";

function getVisitorId(): string {
  try {
    let id = window.localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/admin") || path.startsWith("/estimat") || path.startsWith("/database")) return;

  try {
    await supabase.from("page_views").insert({
      path,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      visitor_id: getVisitorId(),
    });
  } catch {
    /* analytics must never break the page */
  }

  const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"];
  if (measurementId) {
    const w = window as unknown as { dataLayer?: unknown[]; __ggGaLoaded?: boolean };
    w.dataLayer = w.dataLayer || [];
    const gtag = (...args: unknown[]) => w.dataLayer!.push(args);
    if (!w.__ggGaLoaded) {
      w.__ggGaLoaded = true;
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
      gtag("js", new Date());
      gtag("config", measurementId, { send_page_view: false });
    }
    gtag("event", "page_view", { page_path: path });
  }
}
