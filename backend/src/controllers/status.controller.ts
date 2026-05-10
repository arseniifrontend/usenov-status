import type { Request, Response } from "express";
import { checkAllServices } from "../services/monitor.service";

export async function getStatus(req: Request, res: Response) {
    const results = await checkAllServices();

    res.json({
        success: true,
        checkedAt: new Date().toISOString(),
        services: results,
    });
}