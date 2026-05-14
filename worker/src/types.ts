export type ServiceStatus = 'online' | 'degraded' | 'down';

export type ServiceInput = {
	id?: string;
	name: string;
	url: string;
	type?: 'website' | 'api';
};

export type ServiceResult = {
	id: string;
	name: string;
	url: string;
	type: 'website' | 'api';
	status: ServiceStatus;
	statusCode: number | null;
	responseTime: number | null;
	checkedAt: string;
	error?: string;
};

export type StatusResponse = {
	success: boolean;
	checkedAt: string;
	services: ServiceResult[];
};

export type Env = {
	SUPABASE_URL: string;
	SUPABASE_SERVICE_ROLE_KEY: string;
};