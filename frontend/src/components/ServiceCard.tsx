import type { Service } from "../types/status.types";

type Props = {
    service: Service;
};

export function ServiceCard({ service }: Props) {
    const isOnline = service.status === "online";

    return (
        <div
        className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl

            p-5
            sm:p-6

            transition-all
            duration-300

            hover:border-white/20
            hover:bg-white/[0.07]
        "
        >
        <div
            className="
            flex
            flex-col-reverse
            gap-4

            sm:flex-row
            sm:items-start
            sm:justify-between
            "
        >
            <div className="min-w-0">
            <h2
                className="
                text-lg
                font-semibold

                sm:text-xl
                "
            >
                {service.name}
            </h2>

            <p
                className="
                mt-1
                break-all
                text-sm
                text-zinc-500
                "
            >
                {service.url}
            </p>
            </div>

            <div
            className={`
                w-fit
                rounded-full
                px-3
                py-1
                text-sm
                font-medium

                ${
                isOnline
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }
            `}
            >
            {service.status}
            </div>
        </div>

        <div
            className="
            mt-6
            flex
            flex-col
            gap-2

            text-sm
            text-zinc-400

            sm:flex-row
            sm:gap-6
            "
        >
            <span>
            Status: {service.statusCode}
            </span>

            <span>
            Response: {service.responseTime ?? "--"} ms
            </span>
        </div>
        </div>
    );
}