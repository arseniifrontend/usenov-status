export type ServiceStatus =
    | "online"
    | "degraded"
    | "down";

export type Service = {
    id: string;
    name: string;
    url: string;
    type: "website" | "api";
    status: ServiceStatus;
    statusCode: number | null;
    responseTime: number | null;
    checkedAt: string;
    error?: string;
};

export type StatusResponse = {
    success: boolean;
    checkedAt: string;
    services: Service[];
};