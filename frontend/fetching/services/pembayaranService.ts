import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

type LokasiResponse = {
  AlamatLokasi: string;
};

type TempatParkirResponse = {
  KodeTempat: string;
};

type BookingResponse = {
  NoOrderan: number;
  PlatKendaraan: string;
};

type RiwayatBookingResponse = {
  WaktuTiba?: string | null;
  Durasi: number;
};

type PembayaranResponse = {
  TotalPembayaran: number;
  WaktuPembayaran?: string | null;
  StatusPembayaran: string;
};

type MetodePembayaranResponse = {
  QRCodeBase64: string;
  ExpiresAt?: string | null;
  ExpiresIn: number;
  JumlahPembayaran: number;
  MetodePembayaran: string;
};

export type PembayaranByBookingResponse = {
  Lokasi: LokasiResponse;
  TempatParkir: TempatParkirResponse;
  Booking: BookingResponse;
  RiwayatBooking: RiwayatBookingResponse;
  Pembayaran: PembayaranResponse;
  MetodePembayaran: MetodePembayaranResponse;
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

export async function getPembayaranByBooking(bookingID: number): Promise<PembayaranByBookingResponse> {
  const res = await authFetch(`${API_BASE_URL}/api/pembayaran/informasi/booking/${bookingID}`);
  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch payment info (${res.status})`));
  }

  return payload as PembayaranByBookingResponse;
}

export async function initiatePembayaran(
  bookingID: number,
  paymentMethod: string,
  qrCodeBase64: string,
): Promise<PembayaranByBookingResponse> {
  const res = await authFetch(`${API_BASE_URL}/api/pembayaran/bayar/booking/${bookingID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ PaymentMethod: paymentMethod, QRCodeBase64: qrCodeBase64 }),
  });

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to initiate payment (${res.status})`));
  }

  return payload as PembayaranByBookingResponse;
}
