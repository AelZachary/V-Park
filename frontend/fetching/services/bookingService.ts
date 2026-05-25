import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function postBookingPengunjung(body: {
  IDTempatParkir: number;
  NamaPengguna: string;
  NoPengguna: string;
  KendaraanPengguna: string;
  PlatPengguna: string;
}, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/booking/pengunjung`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'booking failed'));

  return payload;
}
