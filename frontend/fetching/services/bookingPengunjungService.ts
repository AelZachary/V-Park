import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

export type BookingPengunjungRequest = {
  IDTempatParkir: number;
  NamaPengguna: string;
  NoPengguna: string;
  KendaraanPengguna: string;
  PlatPengguna: string;
};

type BookingResponse = {
  IDBooking: number;
  IDPengunjung: number;
  NamaPengunjung: string;
  NoPengguna: string;
  KendaraanPengguna: string;
  PlatPengguna: string;
  WaktuBooking: string;
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

export type BookingPengunjungResponse = {
  Booking: BookingResponse;
  TempatParkir: TempatParkirResponse;
  LokasiMall: LokasiMallResponse;
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

export async function createBookingPengunjung(
  request: BookingPengunjungRequest
): Promise<BookingPengunjungResponse> {
  const res = await authFetch(`${API_BASE_URL}/api/booking/pengunjung`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to create booking (${res.status})`));
  }

  return payload as BookingPengunjungResponse;
}
