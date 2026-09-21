import { createServerFn } from "@tanstack/react-start";

// Server-only: reads LOVABLE_API_KEY and GOOGLE_SEARCH_CONSOLE_API_KEY.
// Never import from client components directly — always go through this fn.

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://getguttersjax.com/";

export interface GscIndexing {
  verdict: string;
  coverageState: string;
  robotsTxtState: string;
  indexingState: string;
  pageFetchState: string;
  lastCrawlTime: string | null;
  googleCanonical: string;
}

export interface GscPerformance {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscRow {
  key: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface GscSitemap {
  path: string;
  status: string;
  errors: number;
  warnings: number;
  lastDownloaded: string | null;
}

export type GscResult = {
  indexing: GscIndexing | null;
  performance: GscPerformance | null;
  topQueries: GscRow[];
  topPages: GscRow[];
  sitemaps: GscSitemap[];
  dateRange: { start: string; end: string };
  error?: string;
};

export const getGscData = createServerFn({ method: "GET" }).handler(async () => {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const connectionApiKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];

  if (!lovableApiKey || !connectionApiKey) {
    return {
      indexing: null,
      performance: null,
      topQueries: [],
      topPages: [],
      sitemaps: [],
      dateRange: { start: "", end: "" },
      error: "Google Search Console is not connected to this project.",
    } as GscResult;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${lovableApiKey}`,
    "X-Connection-Api-Key": connectionApiKey,
    "Content-Type": "application/json",
  };

  const encodedSite = encodeURIComponent(SITE_URL);

  // GSC data is delayed ~3 days; use last 28 complete days ending 3 days ago
  const now = new Date();
  const end = new Date(now.getTime() - 3 * 86400000);
  const start = new Date(end.getTime() - 27 * 86400000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const dateRange = { start: fmt(start), end: fmt(end) };

  const result: GscResult = {
    indexing: null,
    performance: null,
    topQueries: [],
    topPages: [],
    sitemaps: [],
    dateRange,
  };

  // 1. URL Inspection for homepage
  try {
    const inspectRes = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inspectionUrl: SITE_URL,
        siteUrl: SITE_URL,
      }),
    });
    if (inspectRes.ok) {
      const data = await inspectRes.json();
      const insp = data?.inspectionResult?.indexStatusResult;
      if (insp) {
        result.indexing = {
          verdict: insp.verdict ?? "UNKNOWN",
          coverageState: insp.coverageState ?? "UNKNOWN",
          robotsTxtState: insp.robotsTxtState ?? "UNKNOWN",
          indexingState: insp.indexingState ?? "UNKNOWN",
          pageFetchState: insp.pageFetchState ?? "UNKNOWN",
          lastCrawlTime: insp.lastCrawlTime ?? null,
          googleCanonical: insp.googleCanonical ?? "",
        };
      }
    }
  } catch {
    // non-fatal — continue
  }

  // 2. Search analytics — totals
  try {
    const totalsRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          startDate: dateRange.start,
          endDate: dateRange.end,
          dimensions: [],
          rowLimit: 1000,
        }),
      }
    );
    if (totalsRes.ok) {
      const data = await totalsRes.json();
      const row = data?.rows?.[0];
      result.performance = {
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ?? 0,
        position: row?.position ?? 0,
      };
    }
  } catch {
    // non-fatal
  }

  // 3. Top queries
  try {
    const queriesRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          startDate: dateRange.start,
          endDate: dateRange.end,
          dimensions: ["query"],
          rowLimit: 20,
        }),
      }
    );
    if (queriesRes.ok) {
      const data = await queriesRes.json();
      result.topQueries = (data?.rows ?? []).map(
        (r: { keys?: string[]; clicks: number; impressions: number; position: number }) => ({
          key: r.keys?.[0] ?? "—",
          clicks: r.clicks ?? 0,
          impressions: r.impressions ?? 0,
          position: r.position ?? 0,
        })
      );
    }
  } catch {
    // non-fatal
  }

  // 4. Top pages
  try {
    const pagesRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          startDate: dateRange.start,
          endDate: dateRange.end,
          dimensions: ["page"],
          rowLimit: 20,
        }),
      }
    );
    if (pagesRes.ok) {
      const data = await pagesRes.json();
      result.topPages = (data?.rows ?? []).map(
        (r: { keys?: string[]; clicks: number; impressions: number; position: number }) => ({
          key: r.keys?.[0] ?? "—",
          clicks: r.clicks ?? 0,
          impressions: r.impressions ?? 0,
          position: r.position ?? 0,
        })
      );
    }
  } catch {
    // non-fatal
  }

  // 5. Sitemaps
  try {
    const sitemapsRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/sitemaps`,
      { headers }
    );
    if (sitemapsRes.ok) {
      const data = await sitemapsRes.json();
      result.sitemaps = (data?.sitemap ?? []).map(
        (s: { path: string; errors: number; warnings: number; lastDownloaded?: string }) => ({
          path: s.path ?? "—",
          status: (s.errors ?? 0) > 0 ? "Errors" : (s.warnings ?? 0) > 0 ? "Warnings" : "OK",
          errors: s.errors ?? 0,
          warnings: s.warnings ?? 0,
          lastDownloaded: s.lastDownloaded ?? null,
        })
      );
    }
  } catch {
    // non-fatal
  }

  return result;
});
