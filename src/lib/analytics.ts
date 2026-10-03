import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "gg-visitor-id";
const DEFAULT_GOOGLE_ANALYTICS_ID = "G-F9QEFRQLFT";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  __ggGaLoaded?: boolean;
};

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

function getMeasurementId(): string | undefined {
  const candidates = [
    import.meta.env["VITE_GOOGLE_ANALYTICS_ID"],
    import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"],
    DEFAULT_GOOGLE_ANALYTICS_ID,
  ];
  return candidates
    .find(
      (value): value is string => typeof value === "string" && /^G-[A-Z0-9]+$/i.test(value.trim()),
    )
    ?.trim();
}

function getGtag() {
  if (typeof window === "undefined") return;
  const measurementId = getMeasurementId();
  if (!measurementId) return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  const gtag = (...args: unknown[]) => analyticsWindow.dataLayer!.push(args);

  if (!analyticsWindow.__ggGaLoaded) {
    analyticsWindow.__ggGaLoaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", measurementId, { send_page_view: false });
  }

  return gtag;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  const gtag = getGtag();
  gtag?.("event", eventName, params);
}

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/admin") || path.startsWith("/estimat") || path.startsWith("/database"))
    return;

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

  trackEvent("page_view", { page_path: path, page_location: window.location.href });
}
