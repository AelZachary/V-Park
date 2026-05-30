import { ensureCurrentUserLoaded, getCurrentUser } from '@/fetching/auth/session';

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  await ensureCurrentUserLoaded();
  const currentUser = getCurrentUser();
  const token = currentUser?.token;
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
