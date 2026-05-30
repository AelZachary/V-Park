import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

type BookingData = {
  IDBooking: number;
  PlatPengguna: string;
  WaktuBooking: string;
};

type RiwayatBookingData = {
  WaktuMasuk: string | null;
  StatusBooking: string;
};

type TempatParkirData = {
  KodeTempat: string;
};

type LokasiMallData = {
  AlamatLokasi: string;
};

type FotoLokasiMallResponse = {
  FotoLokasi: string;
};

export type DetailLokasiResponse = {
  Booking: BookingData;
  RiwayatBooking: RiwayatBookingData;
  TempatParkir: TempatParkirData;
  LokasiMall: LokasiMallData;
  FotoLokasiMall?: FotoLokasiMallResponse[];
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

export async function getDetailLokasi(): Promise<DetailLokasiResponse | null> {
  const res = await authFetch(`${API_BASE_URL}/api/riwayataktif/pengunjung`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch detail lokasi (${res.status})`));
  }

  if (!Array.isArray(payload)) {
    throw new Error(`Invalid detail lokasi response: expected array but got ${typeof payload}`);
  }

  if (payload.length === 0) {
    return null;
  }

  const pendingBooking = payload.find((item: any) => {
    const status = String(item?.RiwayatBooking?.StatusBooking || '').trim().toLowerCase();
    return status === 'menunggukonfirmasi' || status === 'menunggu konfirmasi';
  });

  const selectedBooking = pendingBooking || payload[0];

  // Prefer the booking that is still waiting for arrival confirmation.
  return selectedBooking as DetailLokasiResponse;
}
