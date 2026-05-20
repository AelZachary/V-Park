import { API_BASE_URL } from '@/fetching/response/responseconfig';
import type { ControllerResponse } from '@/fetching/response/response';
import type { LoginResult } from '@/fetching/services/loginservices';

export async function getUserProfile(
  username: string
): Promise<LoginResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/authentication/profile?username=${encodeURIComponent(
      username
    )}`
  );

  const rawBody = await response.text();
  const payload = rawBody
    ? (JSON.parse(rawBody) as LoginResult | ControllerResponse)
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
          : 'Failed to fetch profile'
        : 'Failed to fetch profile';

    throw new Error(message);
  }

  if (!payload || !('User' in payload)) {
    throw new Error('Invalid profile response');
  }

  return payload;
}
