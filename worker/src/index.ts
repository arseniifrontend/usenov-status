type ServiceStatus = "online" | "degraded" | "down";

type ServiceInput = {
	id?: string;
	name: string;
	url: string;
	type?: "website" | "api";
};

type ServiceResult = {
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

const defaultServices: ServiceInput[] = [
	{
		id: "usenov",
		name: "Usenov",
		url: "https://usenov.com",
		type: "website",
	},
	{
		id: "flowtab",
		name: "Flowtab",
		url: "https://flowtab.usenov.com",
		type: "website",
	},
	{
		id: "19mushrooms",
		name: "19Mushrooms",
		url: "https://19mushrooms.usenov.com/",
		type: "website",
	},
	{
		id: "borutska-browser",
		name: "Borutska Browser",
		url: "https://borutska-brows.usenov.com/",
		type: "website",
	},
];

function getStatus(statusCode: number): ServiceStatus {
	if (statusCode >= 200 && statusCode < 400) return "online";
	if (statusCode >= 400 && statusCode < 500) return "degraded";
	return "down";
}

function createId(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

async function checkService(service: ServiceInput): Promise<ServiceResult> {
	const startedAt = Date.now();

	try {
		const response = await fetch(service.url, {
		method: "GET",
		signal: AbortSignal.timeout(5000),
		});

		return {
		id: service.id ?? createId(service.name),
		name: service.name,
		url: service.url,
		type: service.type ?? "website",
		status: getStatus(response.status),
		statusCode: response.status,
		responseTime: Date.now() - startedAt,
		checkedAt: new Date().toISOString(),
		};
	} catch (error) {
		return {
		id: service.id ?? createId(service.name),
		name: service.name,
		url: service.url,
		type: service.type ?? "website",
		status: "down",
		statusCode: null,
		responseTime: null,
		checkedAt: new Date().toISOString(),
		error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

async function checkServices(services: ServiceInput[]) {
	const results = await Promise.all(services.map(checkService));

	return {
		success: true,
		checkedAt: new Date().toISOString(),
		services: results,
	};
}

export default {
	async fetch(request: Request) {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
		return json(null);
		}

		if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/api/status")) {
		const data = await checkServices(defaultServices);
		return json(data);
		}

		if (request.method === "POST" && url.pathname === "/api/check") {
		try {
			const body = await request.json<{ services?: ServiceInput[] }>();

			if (!body.services || !Array.isArray(body.services)) {
			return json(
				{
				success: false,
				message: "services array is required",
				},
				400
			);
			}

			const safeServices = body.services.slice(0, 10);

			const data = await checkServices(safeServices);
			return json(data);
		} catch {
			return json(
			{
				success: false,
				message: "Invalid JSON body",
			},
			400
			);
		}
		}

		return json(
		{
			success: false,
			message: "Not found",
		},
		404
		);
	},
};