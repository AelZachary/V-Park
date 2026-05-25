import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function getTempatParkir(idLokasiMall: number) {
  const res = await authFetch(`${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, {
    method: 'GET',
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));

  return payload;
}
