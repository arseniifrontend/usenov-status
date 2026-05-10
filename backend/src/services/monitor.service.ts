import { services } from "../config/services";
import type { ServiceCheckResult, ServiceStatus } from "../types/status.types";

const TIMEOUT_MS = 5000;

function getStatus(statusCode: number): ServiceStatus {
    if (statusCode >= 200 && statusCode < 400) return "online";
    if (statusCode >= 400 && statusCode < 500) return "degraded";
    return "down";
}

async function checkService(service: typeof services[number]): Promise<ServiceCheckResult> {
    const startedAt = Date.now();

    try {
        const response = await fetch(service.url, {
        method: "GET",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        });

        const responseTime = Date.now() - startedAt;

        return {
        ...service,
        status: getStatus(response.status),
        statusCode: response.status,
        responseTime,
        checkedAt: new Date().toISOString(),
        };
    } catch (error) {
        return {
        ...service,
        status: "down",
        statusCode: null,
        responseTime: null,
        checkedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

export async function checkAllServices(): Promise<ServiceCheckResult[]> {
    return Promise.all(services.map(checkService));
}