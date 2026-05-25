import { API_BASE_URL } from '@/fetching/response/responseconfig';

import type { ControllerResponse } from '@/fetching/response/response';
import type { PengunjungLoginResult } from '@/fetching/services/loginservices';

type RegistrasiRequest = {
	Username: string;
	Password: string;
	NoHandphone: string;
	IsPengunjung: boolean;
};

export async function registerUser(
	username: string,
	password: string,
	noHandphone: string
): Promise<PengunjungLoginResult> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 10000);

	let response: Response;
	try {
		response = await fetch(`${API_BASE_URL}/api/authentication/registrasi`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ Username: username, Password: password, NoHandphone: noHandphone, IsPengunjung: true } satisfies RegistrasiRequest),
			signal: controller.signal,
		});
	} catch (err: any) {
		if (err && err.name === 'AbortError') throw new Error('Request timed out');
		throw new Error(`Cannot reach server: ${err?.message ?? String(err)}`);
	} finally {
		clearTimeout(timeout);
	}

	const rawBody = await response.text();
	const payload = rawBody
		? (JSON.parse(rawBody) as
			| PengunjungLoginResult
			| ControllerResponse)
		: null;

	if (!response.ok) {
		const message =
			payload && typeof payload === 'object'
				? 'ResponseMessage' in payload &&
					typeof payload.ResponseMessage === 'string'
					? payload.ResponseMessage
					: 'message' in payload &&
							typeof payload.message === 'string'
						? payload.message
						: 'name or password is already taken'
				: 'name or password is already taken';

		throw new Error(message);
	}

	if (!payload || !('User' in payload)) {
		throw new Error('Invalid register response');
	}

	return payload;
}
