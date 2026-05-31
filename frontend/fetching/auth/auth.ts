import { ensureCurrentUserLoaded, getCurrentSessionToken } from '@/fetching/auth/session';

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  await ensureCurrentUserLoaded();
  const token = getCurrentSessionToken();
  if (!token) {
    console.warn('authFetch: no token available for authenticated request', { input });
  }

  const headers = new Headers(init.headers ?? undefined);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
