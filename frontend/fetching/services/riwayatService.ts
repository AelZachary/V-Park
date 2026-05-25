import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function getRiwayatAktif(token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/riwayataktif/pengunjung`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat aktif failed'));

  return payload;
}

export async function getRiwayatBatal(token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/riwayatbatal/pengunjung`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat batal failed'));

  return payload;
}

export async function getRiwayatSelesai(token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/riwayatselesai/pengunjung`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat selesai failed'));

  return payload;
}
