import { createClient } from '@supabase/supabase-js';

import type { Env, ServiceResult, ServiceStatus } from './types';

type ServiceCheckRow = {
	service_id: string;
	service_name: string;
	service_url: string;
	service_type: 'website' | 'api';
	status: ServiceStatus;
	status_code: number | null;
	response_time: number | null;
	checked_at: string;
};

function createSupabaseClient(env: Env) {
	return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});
}

export async function saveChecks(env: Env, results: ServiceResult[]) {
	const supabase = createSupabaseClient(env);

	const payload = results.map((service) => ({
		service_id: service.id,
		service_name: service.name,
		service_url: service.url,
		service_type: service.type,
		status: service.status,
		status_code: service.statusCode,
		response_time: service.responseTime,
		checked_at: service.checkedAt,
	}));

	const { error } = await supabase.from('service_checks').insert(payload);

	if (error) {
		console.error('Supabase insert error:', error.message);
	}
}

export async function getServiceHistory(env: Env, serviceId: string) {
	const supabase = createSupabaseClient(env);

	const { data, error } = await supabase
		.from('service_checks')
		.select(
			'service_id, service_name, service_url, service_type, status, status_code, response_time, checked_at'
		)
		.eq('service_id', serviceId)
		.order('checked_at', { ascending: false })
		.limit(40);

	if (error) {
		console.error('Supabase history error:', error.message);

		return {
			success: false,
			message: 'Failed to load service history',
			history: [],
		};
	}

	const history = ((data ?? []) as ServiceCheckRow[])
		.reverse()
		.map((row) => ({
			time: new Date(row.checked_at).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}),
			checkedAt: row.checked_at,
			status: row.status,
			responseTime: row.response_time,
			statusCode: row.status_code,
		}));

	return {
		success: true,
		serviceId,
		history,
	};
}