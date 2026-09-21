import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { getGscData, type GscResult } from "@/lib/gsc.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Get Gutters — Site Analytics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const PASSCODE = "gutters2025";

type Row = {
  path: string;
  referrer: string | null;
  user_agent: string | null;
  visitor_id: string | null;
  created_at: string;
};

type MetricKey =
  | "visitors"
  | "pageviews"
  | "pageviewsPerVisit"
  | "sessionDuration"
  | "bounceRate";

const METRICS: { key: MetricKey; label: string; format: (v: number) => string }[] = [
  { key: "visitors", label: "Visitors", format: (v) => v.toLocaleString() },
  { key: "pageviews", label: "Pageviews", format: (v) => v.toLocaleString() },
  { key: "pageviewsPerVisit", label: "Pages / visit", format: (v) => v.toFixed(2) },
  { key: "sessionDuration", label: "Avg. session (sec)", format: (v) => `${Math.round(v)}s` },
  { key: "bounceRate", label: "Bounce rate", format: (v) => `${Math.round(v)}%` },
];

function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("gg-estimator") === "1"
  );
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4">
        <form
          className="w-full max-w-sm text-center space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (code === PASSCODE) {
              window.sessionStorage.setItem("gg-estimator", "1");
              setUnlocked(true);
            } else {
              setError(true);
            }
          }}
        >
          <p className="font-display text-2xl text-[#e4c36a] tracking-wide">
            Get Gutters Analytics
          </p>
          <p className="text-sm text-[#9aa6b8]">Private — enter access code</p>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="Access code"
            className="w-full rounded-md border border-[#e4c36a]/30 bg-[#0d1424] px-4 py-3 text-center text-[#f4f6fa] outline-none focus:border-[#e4c36a]"
          />
          {error && <p className="text-sm text-red-400">Incorrect code</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-[#e4c36a] px-4 py-3 font-semibold text-[#070b14]"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard />;
}

type EstimateRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

function Dashboard() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [requests, setRequests] = useState<EstimateRequest[] | null>(null);
  const [days, setDays] = useState(30);
  const [metric, setMetric] = useState<MetricKey>("visitors");
  const [gsc, setGsc] = useState<GscResult | null>(null);

  useEffect(() => {
    let active = true;
    const since = new Date(Date.now() - days * 86400000).toISOString();
    supabase
      .from("page_views")
      .select("path, referrer, user_agent, visitor_id, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10000)
      .then(({ data }) => {
        if (active) setRows((data as Row[]) ?? []);
      });
    supabase
      .from("estimate_requests")
      .select("id, name, phone, email, service, message, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (active) setRequests((data as EstimateRequest[]) ?? []);
      });
    getGscData().then((data) => {
      if (active) setGsc(data);
    });
    return () => {
      active = false;
    };
  }, [days]);

  const stats = useMemo(() => {
    const list = rows ?? [];

    // Build day buckets
    const dayKeys: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dayKeys.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));
    }
    const visitorsByDay = new Map<string, Set<string>>(dayKeys.map((k) => [k, new Set()]));
    const viewsByDay = new Map<string, number>(dayKeys.map((k) => [k, 0]));
    // visitor+day -> timestamps (for session duration & bounce)
    const sessions = new Map<string, number[]>();

    for (const r of list) {
      const day = r.created_at.slice(0, 10);
      const vid = r.visitor_id ?? "?";
      if (visitorsByDay.has(day)) {
        visitorsByDay.get(day)!.add(vid);
        viewsByDay.set(day, (viewsByDay.get(day) ?? 0) + 1);
      }
      const skey = `${vid}|${day}`;
      const arr = sessions.get(skey) ?? [];
      arr.push(new Date(r.created_at).getTime());
      sessions.set(skey, arr);
    }

    const chart = dayKeys.map((day) => {
      const visitors = visitorsByDay.get(day)!.size;
      const views = viewsByDay.get(day) ?? 0;
      let durationTotal = 0;
      let durationCount = 0;
      let bounced = 0;
      for (const [skey, times] of sessions) {
        if (!skey.endsWith(`|${day}`)) continue;
        times.sort((a, b) => a - b);
        if (times.length <= 1) {
          bounced += 1;
        } else {
          let dur = 0;
          for (let i = 1; i < times.length; i++) {
            const gap = times[i] - times[i - 1];
            if (gap < 30 * 60 * 1000) dur += gap; // ignore >30min gaps (new session)
          }
          durationTotal += dur / 1000;
          durationCount += 1;
        }
      }
      return {
        date: day.slice(5),
        visitors,
        pageviews: views,
        pageviewsPerVisit: visitors > 0 ? views / visitors : 0,
        sessionDuration: durationCount > 0 ? durationTotal / durationCount : 0,
        bounceRate: visitors > 0 ? (bounced / visitors) * 100 : 0,
      };
    });

    const totals = {
      visitors: new Set(list.map((r) => r.visitor_id ?? "?")).size,
      pageviews: list.length,
      pageviewsPerVisit: 0,
      sessionDuration: 0,
      bounceRate: 0,
    };
    totals.pageviewsPerVisit =
      totals.visitors > 0 ? totals.pageviews / totals.visitors : 0;

    let durTotal = 0;
    let durCount = 0;
    let bounced = 0;
    for (const [, times] of sessions) {
      times.sort((a, b) => a - b);
      if (times.length <= 1) {
        bounced += 1;
      } else {
        let dur = 0;
        for (let i = 1; i < times.length; i++) {
          const gap = times[i] - times[i - 1];
          if (gap < 30 * 60 * 1000) dur += gap;
        }
        durTotal += dur / 1000;
        durCount += 1;
      }
    }
    totals.sessionDuration = durCount > 0 ? durTotal / durCount : 0;
    totals.bounceRate =
      sessions.size > 0 ? (bounced / sessions.size) * 100 : 0;

    const count = (get: (r: Row) => string) => {
      const m = new Map<string, number>();
      for (const r of list) {
        const k = get(r);
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    };

    return {
      totals,
      chart,
      pages: count((r) => r.path || "/"),
      sources: count((r) => {
        if (!r.referrer) return "Direct";
        try {
          return new URL(r.referrer).hostname.replace(/^www\./, "");
        } catch {
          return "Other";
        }
      }),
      devices: count((r) =>
        /Mobi|Android|iPhone/i.test(r.user_agent ?? "") ? "Mobile" : "Desktop"
      ),
    };
  }, [rows, days]);

  const activeMetric = METRICS.find((m) => m.key === metric)!;

  return (
    <div className="min-h-screen bg-[#070b14] px-4 py-10 text-[#f4f6fa]">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-[#e4c36a]">
              Website Analytics
            </h1>
            <p className="text-sm text-[#9aa6b8]">
              getguttersjax.com — private dashboard
            </p>
          </div>
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded-md px-3 py-2 text-sm ${
                  days === d
                    ? "bg-[#e4c36a] text-[#070b14] font-semibold"
                    : "border border-[#e4c36a]/30 text-[#9aa6b8]"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </header>

        {rows === null ? (
          <p className="text-[#9aa6b8]">Loading…</p>
        ) : (
          <>
            {/* Metric selector cards — like the Lovable eyeball view */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {METRICS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMetric(m.key)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    metric === m.key
                      ? "border-[#e4c36a] bg-[#0d1424]"
                      : "border-[#e4c36a]/15 bg-[#0d1424]/50 hover:border-[#e4c36a]/40"
                  }`}
                >
                  <p className="text-xs text-[#9aa6b8]">{m.label}</p>
                  <p className="mt-1 font-display text-3xl text-[#e4c36a]">
                    {m.format(stats.totals[m.key])}
                  </p>
                </button>
              ))}
            </div>

            {/* Line chart for the selected metric */}
            <Panel title={`${activeMetric.label} per day`}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.chart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2942" />
                    <XAxis dataKey="date" stroke="#9aa6b8" fontSize={11} />
                    <YAxis stroke="#9aa6b8" fontSize={11} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#0d1424",
                        border: "1px solid #e4c36a55",
                        color: "#f4f6fa",
                      }}
                      formatter={(value: number) => [
                        activeMetric.format(value),
                        activeMetric.label,
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey={metric}
                      stroke="#e4c36a"
                      strokeWidth={2}
                      dot={{ fill: "#e4c36a", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <div className="grid gap-4 md:grid-cols-3">
              <Panel title="Pages">
                <List items={stats.pages} total={stats.totals.pageviews} />
              </Panel>
              <Panel title="Sources">
                <List items={stats.sources} total={stats.totals.pageviews} />
              </Panel>
              <Panel title="Devices">
                <List items={stats.devices} total={stats.totals.pageviews} />
              </Panel>
            </div>

            {/* Estimate requests */}
            <Panel title={`Estimate Requests${requests ? ` (${requests.length})` : ""}`}>
              {requests === null ? (
                <p className="text-sm text-[#9aa6b8]">Loading…</p>
              ) : requests.length === 0 ? (
                <p className="text-sm text-[#9aa6b8]">
                  No estimate requests yet — they'll appear here when someone
                  fills out the form.
                </p>
              ) : (
                <ul className="space-y-3">
                  {requests.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-md border border-[#e4c36a]/15 bg-[#070b14] p-4 text-sm"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-semibold text-[#e4c36a]">
                          {r.name}
                        </span>
                        <span className="text-xs text-[#9aa6b8]">
                          {new Date(r.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[#cdd6e4]">
                        <a className="underline" href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}>
                          {r.phone}
                        </a>
                        {r.email && (
                          <a className="underline" href={`mailto:${r.email}`}>
                            {r.email}
                          </a>
                        )}
                        {r.service && (
                          <span className="text-[#9aa6b8]">{r.service}</span>
                        )}
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-[#cdd6e4]">
                        {r.message}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            {/* Google Search Console */}
            <Panel title="Google Search Console">
              {gsc === null ? (
                <p className="text-sm text-[#9aa6b8]">Loading…</p>
              ) : gsc.error ? (
                <p className="text-sm text-[#9aa6b8]">{gsc.error}</p>
              ) : (
                <div className="space-y-4">
                  {gsc.indexing && (
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          gsc.indexing.verdict === "PASS"
                            ? "bg-green-500/20 text-green-400"
                            : gsc.indexing.verdict === "FAIL"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {gsc.indexing.verdict === "PASS"
                          ? "Indexed ✓"
                          : gsc.indexing.verdict}
                      </span>
                      <span className="text-xs text-[#9aa6b8]">
                        {gsc.indexing.coverageState} · {gsc.indexing.pageFetchState}
                      </span>
                      {gsc.indexing.lastCrawlTime && (
                        <span className="text-xs text-[#9aa6b8]">
                          Last crawled:{" "}
                          {new Date(gsc.indexing.lastCrawlTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <GscMetric
                      label="Clicks"
                      value={
                        gsc.performance
                          ? gsc.performance.clicks.toLocaleString()
                          : "—"
                      }
                    />
                    <GscMetric
                      label="Impressions"
                      value={
                        gsc.performance
                          ? gsc.performance.impressions.toLocaleString()
                          : "—"
                      }
                    />
                    <GscMetric
                      label="Avg. CTR"
                      value={
                        gsc.performance
                          ? `${(gsc.performance.ctr * 100).toFixed(1)}%`
                          : "—"
                      }
                    />
                    <GscMetric
                      label="Avg. Position"
                      value={
                        gsc.performance
                          ? gsc.performance.position.toFixed(1)
                          : "—"
                      }
                    />
                  </div>

                  {gsc.performance &&
                    gsc.performance.clicks === 0 &&
                    gsc.performance.impressions === 0 && (
                      <p className="text-xs text-[#9aa6b8]">
                        No search data yet — Google typically takes 3–7 days
                        to show search performance. Date range:{" "}
                        {gsc.dateRange.start} to {gsc.dateRange.end}
                      </p>
                    )}

                  {gsc.topQueries.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9aa6b8]">
                        Top Search Queries
                      </p>
                      <ul className="space-y-1 text-sm">
                        {gsc.topQueries.map((q) => (
                          <li
                            key={q.key}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="truncate text-[#cdd6e4]">
                              {q.key}
                            </span>
                            <span className="flex gap-3 text-xs text-[#9aa6b8]">
                              <span>{q.clicks} clicks</span>
                              <span>{q.impressions} impr.</span>
                              <span>#{q.position.toFixed(0)}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {gsc.topPages.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9aa6b8]">
                        Top Pages in Search
                      </p>
                      <ul className="space-y-1 text-sm">
                        {gsc.topPages.map((p) => (
                          <li
                            key={p.key}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="truncate text-[#cdd6e4]">
                              {p.key.replace("https://getguttersjax.com", "")}
                            </span>
                            <span className="flex gap-3 text-xs text-[#9aa6b8]">
                              <span>{p.clicks} clicks</span>
                              <span>{p.impressions} impr.</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {gsc.sitemaps.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9aa6b8]">
                        Sitemap
                      </p>
                      {gsc.sitemaps.map((s) => (
                        <div
                          key={s.path}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="truncate text-[#cdd6e4]">
                            {s.path}
                          </span>
                          <span
                            className={`text-xs ${
                              s.status === "OK"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {s.status} ({s.errors} errors, {s.warnings} warnings)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Panel>

            {stats.totals.pageviews === 0 && (
              <p className="text-sm text-[#9aa6b8]">
                No visits recorded yet — numbers start counting from today.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#e4c36a]/20 bg-[#0d1424] p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#9aa6b8]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function List({ items, total }: { items: [string, number][]; total: number }) {
  if (items.length === 0)
    return <p className="text-sm text-[#9aa6b8]">No data yet</p>;
  return (
    <ul className="space-y-2 text-sm">
      {items.map(([label, count]) => (
        <li key={label} className="flex items-center justify-between gap-3">
          <span className="truncate text-[#cdd6e4]">{label}</span>
          <span className="flex items-center gap-3">
            <span className="text-xs text-[#9aa6b8]">
              {total > 0 ? `${Math.round((count / total) * 100)}%` : ""}
            </span>
            <span className="font-semibold text-[#e4c36a] w-8 text-right">
              {count}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function GscMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#e4c36a]/15 bg-[#070b14] p-3">
      <p className="text-xs text-[#9aa6b8]">{label}</p>
      <p className="mt-1 font-display text-2xl text-[#e4c36a]">{value}</p>
    </div>
  );
}
