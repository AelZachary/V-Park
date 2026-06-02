import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

export type ActiveBookingRecord = {
  Booking: {
    IDBooking: number;
    PlatPengguna: string;
    WaktuBooking: string;
  };
  RiwayatBooking: {
    WaktuMasuk: string | null;
    StatusBooking: string;
  };
  TempatParkir: {
    KodeTempat: string;
  };
  LokasiMall: {
    AlamatLokasi: string;
  };
};

export type FinishedBookingRecord = ActiveBookingRecord & {
  RiwayatBooking: ActiveBookingRecord['RiwayatBooking'] & {
    WaktuKeluar: string | null;
    DurasiParkir: number | null;
  };
  MetodePembayaran?: {
    JumlahPembayaran: number;
  } | null;
};

export type CancelledBookingRecord = {
  Booking: {
    IDBooking: number;
    PlatPengguna: string;
    WaktuBooking: string;
  };
  RiwayatBooking: {
    StatusBooking: string;
  };
  TempatParkir: {
    KodeTempat: string;
  };
  LokasiMall: {
    AlamatLokasi: string;
  };
};

function extractErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const typedPayload = payload as Record<string, unknown>;

  if (typeof typedPayload.ResponseMessage === 'string') {
    return typedPayload.ResponseMessage;
  }

  if (typeof typedPayload.message === 'string') {
    return typedPayload.message;
  }

  return fallback;
}

async function readJsonPayload(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getActiveBookings(): Promise<ActiveBookingRecord[]> {
  const res = await authFetch(`${API_BASE_URL}/api/riwayataktif/pengunjung`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await readJsonPayload(res);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch active booking (${res.status})`));
  }

  if (!Array.isArray(payload)) {
    throw new Error(`Invalid active booking response: expected array but got ${typeof payload}`);
  }

  return payload as ActiveBookingRecord[];
}

export async function getCancelledBookings(): Promise<CancelledBookingRecord[]> {
  const res = await authFetch(`${API_BASE_URL}/api/riwayatbatal/pengunjung`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await readJsonPayload(res);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch cancelled booking (${res.status})`));
  }

  if (!Array.isArray(payload)) {
    throw new Error(`Invalid cancelled booking response: expected array but got ${typeof payload}`);
  }

  return payload as CancelledBookingRecord[];
}

export async function cancelBookingPengunjung(bookingID: number) {
  const res = await authFetch(`${API_BASE_URL}/api/konfirmasibatal/booking/${bookingID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const payload = await readJsonPayload(res);

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to cancel booking (${res.status})`));
  }

  return payload;
}

export async function getFinishedBookings(): Promise<FinishedBookingRecord[]> {
  const res = await authFetch(`${API_BASE_URL}/api/riwayatselesai/pengunjung`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await readJsonPayload(res);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch finished booking (${res.status})`));
  }

  if (!Array.isArray(payload)) {
    throw new Error(`Invalid finished booking response: expected array but got ${typeof payload}`);
  }

  return payload as FinishedBookingRecord[];
}