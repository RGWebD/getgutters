import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

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

function Dashboard() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [days, setDays] = useState(30);

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
    return () => {
      active = false;
    };
  }, [days]);

  const stats = useMemo(() => {
    const list = rows ?? [];
    const visitors = new Set(list.map((r) => r.visitor_id ?? "?")).size;
    const today = new Date().toDateString();
    const todayCount = list.filter(
      (r) => new Date(r.created_at).toDateString() === today
    ).length;

    const byDay = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      byDay.set(d.toISOString().slice(0, 10), 0);
    }
    for (const r of list) {
      const key = r.created_at.slice(0, 10);
      if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1);
    }

    const count = (get: (r: Row) => string) => {
      const m = new Map<string, number>();
      for (const r of list) {
        const k = get(r);
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    };

    return {
      total: list.length,
      visitors,
      todayCount,
      chart: [...byDay.entries()].map(([date, views]) => ({
        date: date.slice(5),
        views,
      })),
      pages: count((r) => r.path || "/"),
      sources: count((r) => {
        if (!r.referrer) return "Direct / typed in";
        try {
          return new URL(r.referrer).hostname.replace(/^www\./, "");
        } catch {
          return "Other";
        }
      }),
      devices: count((r) =>
        /Mobi|Android|iPhone/i.test(r.user_agent ?? "") ? "Phone" : "Computer"
      ),
    };
  }, [rows, days]);

  return (
    <div className="min-h-screen bg-[#070b14] px-4 py-10 text-[#f4f6fa]">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-[#e4c36a]">
              Website Traffic
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
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Page visits" value={stats.total} />
              <Stat label="Unique visitors" value={stats.visitors} />
              <Stat label="Visits today" value={stats.todayCount} />
            </div>

            <Panel title="Visits per day">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.chart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2942" />
                    <XAxis dataKey="date" stroke="#9aa6b8" fontSize={11} />
                    <YAxis stroke="#9aa6b8" fontSize={11} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#0d1424",
                        border: "1px solid #e4c36a55",
                        color: "#f4f6fa",
                      }}
                    />
                    <Bar dataKey="views" fill="#e4c36a" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <div className="grid gap-4 md:grid-cols-3">
              <Panel title="Most viewed pages">
                <List items={stats.pages} />
              </Panel>
              <Panel title="Where visitors come from">
                <List items={stats.sources} />
              </Panel>
              <Panel title="Devices">
                <List items={stats.devices} />
              </Panel>
            </div>

            {stats.total === 0 && (
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#e4c36a]/20 bg-[#0d1424] p-5">
      <p className="text-sm text-[#9aa6b8]">{label}</p>
      <p className="mt-1 font-display text-4xl text-[#e4c36a]">
        {value.toLocaleString()}
      </p>
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

function List({ items }: { items: [string, number][] }) {
  if (items.length === 0)
    return <p className="text-sm text-[#9aa6b8]">No data yet</p>;
  return (
    <ul className="space-y-2 text-sm">
      {items.map(([label, count]) => (
        <li key={label} className="flex justify-between gap-3">
          <span className="truncate text-[#cdd6e4]">{label}</span>
          <span className="font-semibold text-[#e4c36a]">{count}</span>
        </li>
      ))}
    </ul>
  );
}
