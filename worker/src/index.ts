import { json } from './response';
import { checkDefaultServices, checkServices, defaultServices } from './services';
import { getServiceHistory, saveChecks } from './supabase';

import type { Env, ServiceInput } from './types';

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return json(null);
		}

		if (
			request.method === 'GET' &&
			(url.pathname === '/' || url.pathname === '/api/status')
		) {
			const { data, shouldSave } = await checkDefaultServices();

			if (shouldSave) {
				await saveChecks(env, data.services);
			}

			return json(data);
		}

		if (request.method === 'GET' && url.pathname.startsWith('/api/history/')) {
			const serviceId = decodeURIComponent(url.pathname.replace('/api/history/', ''));

			if (!serviceId) {
				return json(
					{
						success: false,
						message: 'serviceId is required',
					},
					400
				);
			}

			const data = await getServiceHistory(env, serviceId);

			return json(data, data.success ? 200 : 500);
		}

		if (request.method === 'POST' && url.pathname === '/api/check') {
			try {
				const body = await request.json<{ services?: ServiceInput[] }>();

				if (!body.services || !Array.isArray(body.services)) {
					return json(
						{
							success: false,
							message: 'services array is required',
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
						message: 'Invalid JSON body',
					},
					400
				);
			}
		}

		return json(
			{
				success: false,
				message: 'Not found',
			},
			404
		);
	},

	async scheduled(_controller: ScheduledController, env: Env) {
		const data = await checkServices(defaultServices);

		await saveChecks(env, data.services);
	},
};