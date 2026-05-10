import type { StatusResponse } from "../types/status.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getServicesStatus(): Promise<StatusResponse> {
    const response = await fetch(`${API_URL}/api/status`);

    if (!response.ok) {
        throw new Error("Failed to fetch status");
    }

    return response.json();
}