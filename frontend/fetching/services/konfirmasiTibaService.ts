import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

type RiwayatBookingResponse = {
  IDRiwayatBooking: number;
  IDBooking: number;
  WaktuMasuk: string | null;
  WaktuKeluar: string | null;
  DurasiParkir: number | null;
  StatusBooking: string;
};

type TempatParkirResponse = {
  IDTempatParkir: number;
  KodeTempat: string;
  StatusTempatParkir: string;
};

type LokasiMallResponse = {
  IDLokasiMall: number;
  AlamatLokasi: string;
};

type PembayaranResponse = {
  IDPembayaran: number;
  IDRiwayatBooking: number;
  BiayaLayanan: number;
  BiayaPajak: number;
  TotalPembayaran: number;
  WaktuPembayaran: string | null;
  StatusPembayaran: string;
};

export type KonfirmasiTibaResponse = {
  RiwayatBooking: RiwayatBookingResponse;
  TempatParkir: TempatParkirResponse;
  LokasiMall: LokasiMallResponse;
  Pembayaran: PembayaranResponse;
};

function extractErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const typedPayload = payload as Record<string, unknown>;

  if (typeof typedPayload.message === 'string') {
    return typedPayload.message;
  }

  if (typeof typedPayload.ResponseMessage === 'string') {
    return typedPayload.ResponseMessage;
  }

  return fallback;
}

export async function konfirmasiTiba(bookingID: number): Promise<KonfirmasiTibaResponse> {
  const res = await authFetch(`${API_BASE_URL}/api/konfirmasitiba/booking/${bookingID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to confirm arrival (${res.status})`));
  }

  return payload as KonfirmasiTibaResponse;
}
