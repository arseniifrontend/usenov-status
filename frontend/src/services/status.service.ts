import type { StatusResponse } from "../types/status.types";

export async function getServicesStatus(): Promise<StatusResponse> {
    const response = await fetch("http://localhost:5000/api/status");

    if (!response.ok) {
        throw new Error("Failed to fetch status");
    }

    return response.json();
}