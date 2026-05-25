import { API_BASE_URL } from '@/fetching/response/responseconfig';
import type { ControllerResponse } from '@/fetching/response/response';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export async function getProfilePengunjung(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/profile/informasi/pengunjung`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching profile failed'));

  return payload;
}

export async function editProfilePengunjung(
  token: string,
  data: { JenisKendaraan?: string; PlatKendaraan?: string; FotoPengunjung?: any }
) {
  const form = new FormData();
  if (data.JenisKendaraan) form.append('JenisKendaraan', data.JenisKendaraan);
  if (data.PlatKendaraan) form.append('PlatKendaraan', data.PlatKendaraan);
  if (data.FotoPengunjung) form.append('FotoPengunjung', data.FotoPengunjung as any);

  const res = await fetch(`${API_BASE_URL}/api/profile/edit/pengunjung`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'editing profile failed'));

  return payload;
}

export async function getProfilePetugas(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/profile/informasi/petugas`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching petugas profile failed'));

  return payload;
}

export async function getDashboardPengunjung(token?: string) {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/pengunjung`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching dashboard failed'));

  return payload;
}

export async function getTempatParkir(idLokasiMall: number) {
  const res = await fetch(`${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, {
    method: 'GET',
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));

  return payload;
}

export async function postBookingPengunjung(token: string, body: {
  IDTempatParkir: number;
  NamaPengguna: string;
  NoPengguna: string;
  KendaraanPengguna: string;
  PlatPengguna: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/booking/pengunjung`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'booking failed'));

  return payload;
}

export async function postMonitoringPetugas(token: string, body: { IDTempatParkir: number }) {
  const res = await fetch(`${API_BASE_URL}/api/monitoring/petugas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'monitoring failed'));

  return payload;
}

export async function postKonfirmasiTiba(token: string, idBooking: number) {
  const res = await fetch(`${API_BASE_URL}/api/konfirmasitiba/booking/${idBooking}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi tiba failed'));

  return payload;
}

export async function postKonfirmasiSelesai(token: string, idBooking: number) {
  const res = await fetch(`${API_BASE_URL}/api/konfirmasiselesai/booking/${idBooking}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi selesai failed'));

  return payload;
}

export async function postKonfirmasiBatal(token: string, idBooking: number) {
  const res = await fetch(`${API_BASE_URL}/api/konfirmasibatal/booking/${idBooking}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'konfirmasi batal failed'));

  return payload;
}

export async function getPembayaranInformasiBooking(token: string, idBooking: number) {
  const res = await fetch(`${API_BASE_URL}/api/pembayaran/informasi/booking/${idBooking}`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching pembayaran info failed'));

  return payload;
}

export async function postPembayaranBayar(token: string, idBooking: number, body: { PaymentMethod: string; QRCodeBase64?: string | null }) {
  const res = await fetch(`${API_BASE_URL}/api/pembayaran/bayar/booking/${idBooking}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

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

export async function getRiwayatAktif(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/riwayataktif/pengunjung`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat aktif failed'));

  return payload;
}

export async function getRiwayatBatal(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/riwayatbatal/pengunjung`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat batal failed'));

  return payload;
}

export async function getRiwayatSelesai(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/riwayatselesai/pengunjung`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching riwayat selesai failed'));

  return payload;
}
