import { useEffect, useMemo, useState } from "react";

import { ServiceCard } from "./components/ServiceCard";
import { getServicesStatus } from "./services/status.service";

import type { Service } from "./types/status.types";

import { StatusWidget } from "@usenov/status-widget";
import "@usenov/status-widget/dist/status-widget.css";

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadStatus(isRefresh = false) {
    try {
      if (isRefresh) setRefreshing(true);

      const data = await getServicesStatus();

      setServices(data.services);
      setCheckedAt(data.checkedAt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadStatus();

    const intervalId = window.setInterval(() => {
      loadStatus(true);
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  const summary = useMemo(() => {
    const total = services.length;
    const online = services.filter((s) => s.status === "online").length;
    const degraded = services.filter((s) => s.status === "degraded").length;
    const down = services.filter((s) => s.status === "down").length;

    const avgResponse =
      services.length > 0
        ? Math.round(
            services.reduce((sum, s) => sum + (s.responseTime ?? 0), 0) /
              services.length
          )
        : 0;

    return {
      total,
      online,
      degraded,
      down,
      avgResponse,
    };
  }, [services]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-white/10" />
          <div className="mt-8 grid gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-3xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
            {refreshing ? "Checking services..." : "Live monitoring"}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Usenov Status
          </h1>

          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            {summary.down === 0 && summary.degraded === 0
              ? "All systems operational"
              : "Some services require attention"}
          </p>

          {checkedAt && (
            <p className="mt-2 text-xs text-zinc-600">
              Last updated: {new Date(checkedAt).toLocaleTimeString()}
            </p>
          )}
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-500">Services</p>
            <p className="mt-2 text-3xl font-bold">{summary.total}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-500">Operational</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {summary.online}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-500">Degraded</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {summary.degraded}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-500">Avg latency</p>
            <p className="mt-2 text-3xl font-bold">{summary.avgResponse} ms</p>
          </div>
        </section>

        <section className="grid gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>Ц

        <footer className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Usenov Status · Monitoring websites and APIs across the Usenov ecosystem.
            </p>

            <p>
              Built with React, TypeScript and Node.js.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;