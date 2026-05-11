type ServiceStatus = "online" | "degraded" | "down";

type Service = {
	id: string;
	name: string;
	url: string;
	type: "website" | "api";
};

const services: Service[] = [
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
	if (statusCode >= 200 && statusCode < 400) {
		return "online";
	}

	if (statusCode >= 400 && statusCode < 500) {
		return "degraded";
	}

	return "down";
}

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		},
	});
	}

	async function checkService(service: Service) {
	const startedAt = Date.now();

	try {
		const response = await fetch(service.url, {
		method: "GET",
		signal: AbortSignal.timeout(5000),
		});

		return {
		...service,
		status: getStatus(response.status),
		statusCode: response.status,
		responseTime: Date.now() - startedAt,
		checkedAt: new Date().toISOString(),
		};
	} catch (error) {
		return {
		...service,
		status: "down",
		statusCode: null,
		responseTime: null,
		checkedAt: new Date().toISOString(),
		error:
			error instanceof Error
			? error.message
			: "Unknown error",
		};
	}
}

export default {
	async fetch(request: Request) {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
		return new Response(null, {
			headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			},
		});
		}

		if (
		url.pathname === "/" ||
		url.pathname === "/api/status"
		) {
		const results = await Promise.all(
			services.map(checkService)
		);

		return json({
			success: true,
			checkedAt: new Date().toISOString(),
			services: results,
		});
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