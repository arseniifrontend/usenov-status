import type {
    ServiceHistoryPoint,
    StatusResponse,
} from "../types/status.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getServicesStatus(): Promise<StatusResponse> {
    const response = await fetch(`${API_URL}/api/status`);

    if (!response.ok) {
        throw new Error("Failed to fetch services status");
    }

    return response.json();
}

export async function getServiceHistory(
    serviceId: string
): Promise<ServiceHistoryPoint[]> {
    const response = await fetch(`${API_URL}/api/history/${serviceId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch service history");
    }

    const data = await response.json();

    return data.history ?? [];
}