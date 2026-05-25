import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function postKonfirmasiTiba(idBooking: number, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/konfirmasitiba/booking/${idBooking}`, { method: 'POST' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi tiba failed'));

  return payload;
}

export async function postKonfirmasiSelesai(idBooking: number, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/konfirmasiselesai/booking/${idBooking}`, { method: 'POST' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi selesai failed'));

  return payload;
}

export async function postKonfirmasiBatal(idBooking: number, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/konfirmasibatal/booking/${idBooking}`, { method: 'POST' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi batal failed'));

  return payload;
}
