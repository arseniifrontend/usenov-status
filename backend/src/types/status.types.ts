export type ServiceType = "website" | "api";

export type ServiceStatus = "online" | "degraded" | "down";

export type ServiceConfig = {
    id: string;
    name: string;
    url: string;
    type: ServiceType;
};

export type ServiceCheckResult = ServiceConfig & {
    status: ServiceStatus;
    statusCode: number | null;
    responseTime: number | null;
    checkedAt: string;
    error?: string;
};