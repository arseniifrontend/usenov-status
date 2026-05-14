import type { Service, ServiceHistoryPoint } from "../types/status.types";

type Props = {
    service: Service;
    history?: ServiceHistoryPoint[];
    onClick?: () => void;
};

function getStatusStyles(status: Service["status"]) {
    if (status === "online") {
        return "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20";
    }

    if (status === "degraded") {
        return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20";
    }

    return "bg-red-500/10 text-red-400 ring-red-500/20";
}

function getLatencyColor(responseTime: number | null) {
    if (responseTime === null) return "text-zinc-500";
    if (responseTime < 250) return "text-emerald-400";
    if (responseTime < 800) return "text-yellow-400";

    return "text-red-400";
}

function getStatusLabel(status: Service["status"]) {
    if (status === "online") return "Operational";
    if (status === "degraded") return "Degraded";

    return "Major outage";
}

function getBlockColor(status: Service["status"]) {
    if (status === "online") return "bg-emerald-400/80";
    if (status === "degraded") return "bg-yellow-400/80";

    return "bg-red-400/80";
}

export function ServiceCard({ service, history = [], onClick }: Props) {
    const uptimeBlocks = history.slice(-24);
    const emptyBlocksCount = Math.max(24 - uptimeBlocks.length, 0);

    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-emerald-500/5 sm:p-6"
        >
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold sm:text-xl">
                        {service.name}
                    </h2>

                    <p className="mt-1 break-all text-sm text-zinc-500">
                        {service.url}
                    </p>
                </div>

                <div
                    className={`w-fit rounded-full px-3 py-1 text-sm font-medium ring-1 ${getStatusStyles(
                        service.status
                    )}`}
                >
                    {getStatusLabel(service.status)}
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-600">
                        Status code
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">
                        {service.statusCode ?? "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-600">
                        Response time
                    </p>
                    <p
                        className={`mt-1 text-sm font-medium ${getLatencyColor(
                            service.responseTime
                        )}`}
                    >
                        {service.responseTime !== null ? `${service.responseTime} ms` : "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-600">
                        Type
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">{service.type}</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-600">
                    <span>Last 24 checks</span>
                    <span>Click for details</span>
                </div>

                <div className="flex gap-1">
                    {Array.from({ length: emptyBlocksCount }).map((_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="h-7 flex-1 rounded-sm bg-white/10"
                        />
                    ))}

                    {uptimeBlocks.map((point) => (
                        <div
                            key={point.checkedAt}
                            title={`${new Date(point.checkedAt).toLocaleString()} · ${
                                point.status
                            } · ${point.responseTime ?? "N/A"} ms`}
                            className={`h-7 flex-1 rounded-sm ${getBlockColor(point.status)}`}
                        />
                    ))}
                </div>
            </div>
        </button>
    );
}