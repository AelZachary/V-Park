import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function getPembayaranInformasiBooking(idBooking: number, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/pembayaran/informasi/booking/${idBooking}`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching pembayaran info failed'));

  return payload;
}

export async function postPembayaranBayar(idBooking: number, body: { PaymentMethod: string; QRCodeBase64?: string | null }, token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/pembayaran/bayar/booking/${idBooking}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'pembayaran gagal'));

  return payload;
}

export async function postPembayaranWebhook(body: { IDMetodePembayaran: number; StatusPembayaran: string; JumlahPembayaran: number; MetodePembayaran: string; SuccessTimestamp: number }) {
  const res = await fetch(`${API_BASE_URL}/api/pembayaran/webhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'webhook failed'));

  return payload;
}
