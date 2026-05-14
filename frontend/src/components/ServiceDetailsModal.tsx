import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import CloseIcon from "../assets/close-icon.svg";
import { getServiceHistory } from "../services/status.service";

import type { Service, ServiceHistoryPoint } from "../types/status.types";

type ServiceDetailsModalProps = {
    service: Service;
    onClose: () => void;
};

const statusConfig = {
    online: {
        label: "Operational",
        dot: "bg-emerald-400",
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    degraded: {
        label: "Degraded",
        dot: "bg-yellow-400",
        text: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    down: {
        label: "Down",
        dot: "bg-red-400",
        text: "text-red-400",
        bg: "bg-red-400/10",
    },
};

export function ServiceDetailsModal({ service, onClose }: ServiceDetailsModalProps) {
    const [history, setHistory] = useState<ServiceHistoryPoint[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const config = statusConfig[service.status];

    useEffect(() => {
        async function loadHistory() {
            try {
                setLoadingHistory(true);

                const data = await getServiceHistory(service.id);

                setHistory(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingHistory(false);
            }
        }

        loadHistory();
    }, [service.id]);

    const successfulChecks = history.filter((point) => point.status === "online").length;

    const uptime =
        history.length > 0 ? Math.round((successfulChecks / history.length) * 100) : 0;

    const avgLatency =
        history.length > 0
            ? Math.round(
                history.reduce((sum, point) => sum + (point.responseTime ?? 0), 0) /
                    history.length
            )
            : 0;

    const chartData = history.map((point) => ({
        ...point,
        latency: point.responseTime ?? 0,
    }));

    return (
        <div
            className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl animate-[modalIn_0.25s_ease-out] rounded-3xl border border-white/10 bg-[#080808] p-6 text-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close details"
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                >
                    <img src={CloseIcon} alt="" className="h-4 w-4 opacity-70" />
                </button>

                <div className="pr-16">
                    <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${config.dot}`} />

                        <p
                            className={`rounded-full px-3 py-1 text-sm ${config.bg} ${config.text}`}
                        >
                            {config.label}
                        </p>
                    </div>

                    <h2 className="mt-4 text-3xl font-bold">{service.name}</h2>

                    <p className="mt-2 break-all text-sm text-zinc-500">{service.url}</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-zinc-500">Status code</p>
                        <p className="mt-2 text-2xl font-bold">
                            {service.statusCode ?? "N/A"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-zinc-500">Response time</p>
                        <p className="mt-2 text-2xl font-bold">
                            {service.responseTime !== null
                                ? `${service.responseTime} ms`
                                : "N/A"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-zinc-500">Stored uptime</p>
                        <p className="mt-2 text-2xl font-bold">
                            {loadingHistory ? "--" : `${uptime}%`}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-zinc-500">Avg latency</p>
                        <p className="mt-2 text-2xl font-bold">
                            {loadingHistory ? "--" : `${avgLatency} ms`}
                        </p>
                    </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">Latency graph</h3>
                            <p className="text-sm text-zinc-500">
                                Supabase history from stored checks
                            </p>
                        </div>

                        <p className="text-sm text-zinc-500">
                            {loadingHistory ? "Loading..." : `${history.length} checks`}
                        </p>
                    </div>

                    <div
                        className="h-72 select-none"
                        onMouseDown={(event) => event.preventDefault()}
                    >
                        {loadingHistory ? (
                            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                                Loading history...
                            </div>
                        ) : chartData.length > 1 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient
                                            id={`latencyGradient-${service.id}`}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#34d399"
                                                stopOpacity={0.35}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#34d399"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="rgba(255,255,255,0.08)"
                                    />

                                    <XAxis
                                        dataKey="time"
                                        stroke="#71717a"
                                        tick={{ fontSize: 12 }}
                                        minTickGap={40}
                                        tickMargin={10}
                                    />

                                    <YAxis
                                        stroke="#71717a"
                                        tick={{ fontSize: 12 }}
                                        unit="ms"
                                    />

                                    <Tooltip
                                        cursor={{ stroke: "rgba(52, 211, 153, 0.25)", strokeWidth: 1 }}
                                        contentStyle={{
                                            background: "#09090b",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "14px",
                                            color: "#fff",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="latency"
                                        stroke="#34d399"
                                        fill={`url(#latencyGradient-${service.id})`}
                                        strokeWidth={2}
                                        activeDot={{ r: 4 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                                Not enough Supabase data yet. Wait for more stored checks.
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold">Recent checks</h3>

                        <span className="text-sm text-zinc-500">
                            {loadingHistory ? "Loading..." : `${history.length} stored`}
                        </span>
                    </div>

                    <div className="modal-scrollbar mt-4 max-h-80 overflow-y-auto pr-2">
                        <div className="grid gap-3">
                            {loadingHistory ? (
                                <div className="rounded-2xl bg-black/20 p-4 text-sm text-zinc-500">
                                    Loading recent checks...
                                </div>
                            ) : (
                                history
                                    .slice()
                                    .reverse()
                                    .map((point) => {
                                        const pointConfig = statusConfig[point.status];

                                        return (
                                            <div
                                                key={point.checkedAt}
                                                className="flex items-center justify-between rounded-2xl bg-black/20 p-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`h-2.5 w-2.5 rounded-full ${pointConfig.dot}`}
                                                    />

                                                    <div>
                                                        <p
                                                            className={`text-sm font-medium ${pointConfig.text}`}
                                                        >
                                                            {pointConfig.label}
                                                        </p>

                                                        <p className="text-xs text-zinc-600">
                                                            {new Date(
                                                                point.checkedAt
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-white">
                                                        {point.responseTime !== null
                                                            ? `${point.responseTime} ms`
                                                            : "N/A"}
                                                    </p>

                                                    <p className="text-xs text-zinc-600">
                                                        Code: {point.statusCode ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}