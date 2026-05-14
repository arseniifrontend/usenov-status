import type {
	ServiceInput,
	ServiceResult,
	ServiceStatus,
	StatusResponse,
} from './types';

export const STATUS_CACHE_TTL = 3 * 60 * 1000;

let statusCache: StatusResponse | null = null;
let statusCacheTime = 0;

export const defaultServices: ServiceInput[] = [
	{
		id: 'usenov',
		name: 'Usenov',
		url: 'https://usenov.com',
		type: 'website',
	},
	{
		id: 'flowtab',
		name: 'Flowtab',
		url: 'https://flowtab.usenov.com',
		type: 'website',
	},
	{
		id: '19mushrooms',
		name: '19Mushrooms',
		url: 'https://19mushrooms.usenov.com/',
		type: 'website',
	},
	{
		id: 'borutska-browser',
		name: 'Borutska Browser',
		url: 'https://borutska-brows.usenov.com/',
		type: 'website',
	},
	{
		id: 'artify-api',
		name: 'Artify API',
		url: 'https://api.artify.usenov.com/api/auth/health',
		type: 'api',
	},
];

function getStatus(statusCode: number): ServiceStatus {
	if (statusCode >= 200 && statusCode < 400) return 'online';
	if (statusCode >= 400 && statusCode < 500) return 'degraded';

	return 'down';
}

function createId(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

async function runServiceCheck(service: ServiceInput): Promise<ServiceResult> {
	const startedAt = Date.now();

	try {
		const response = await fetch(service.url, {
			method: 'GET',
			signal: AbortSignal.timeout(5000),
		});

		return {
			id: service.id ?? createId(service.name),
			name: service.name,
			url: service.url,
			type: service.type ?? 'website',
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
			type: service.type ?? 'website',
			status: 'down',
			statusCode: null,
			responseTime: null,
			checkedAt: new Date().toISOString(),
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

export async function checkServices(
	services: ServiceInput[]
): Promise<StatusResponse> {
	const results = await Promise.all(services.map(runServiceCheck));

	return {
		success: true,
		checkedAt: new Date().toISOString(),
		services: results,
	};
}

export async function checkDefaultServices() {
	const now = Date.now();

	if (statusCache && now - statusCacheTime < STATUS_CACHE_TTL) {
		return {
			data: statusCache,
			shouldSave: false,
		};
	}

	const data = await checkServices(defaultServices);

	statusCache = data;
	statusCacheTime = now;

	return {
		data,
		shouldSave: true,
	};
}