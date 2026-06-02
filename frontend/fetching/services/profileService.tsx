import { API_BASE_URL } from '@/fetching/response/responseconfig';
import type { ControllerResponse } from '@/fetching/response/response';
import { authFetch } from '@/fetching/auth/auth';

type UpdatePengunjungProfileResponse = {
  IDPengunjung: number;
  NoHandphone: string;
  JenisKendaraan: string;
  PlatKendaraan: string;
};

type ProfileInformasiPengunjungResponse = {
  User: {
    Username: string;
  };
  Pengunjung: {
    NoPengguna: string;
    KendaraanPengguna: string;
    PlatPengguna: string;
    FotoPengunjung?: string | null;
  };
  Statistik: {
    TotalBooking: number;
    TotalJumlahPembayaran: number;
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

export async function updatePengunjungProfile(
  jenisKendaraan: string,
  platKendaraan: string
): Promise<UpdatePengunjungProfileResponse> {
  const url = `${API_BASE_URL}/api/profile/edit/pengunjung`;
  const body = new URLSearchParams();
  body.append('JenisKendaraan', jenisKendaraan);
  body.append('PlatKendaraan', platKendaraan);

  const response = await authFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const text = await response.text();
  console.log('updatePengunjungProfile response', {
    status: response.status,
    ok: response.ok,
    text,
  });

  const payload = text
    ? (JSON.parse(text) as UpdatePengunjungProfileResponse | ControllerResponse)
    : null;

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload, `failed to update profile (${response.status})`)
    );
  }

  if (!payload || typeof payload !== 'object' || 'ResponseMessage' in payload) {
    throw new Error('Invalid profile update response');
  }

  return payload as UpdatePengunjungProfileResponse;
}

export async function getPengunjungProfile(): Promise<ProfileInformasiPengunjungResponse> {
  const url = `${API_BASE_URL}/api/profile/informasi/pengunjung`;
  const response = await authFetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await readJsonPayload(response);

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload, `failed to load profile (${response.status})`)
    );
  }

  if (
    !payload ||
    typeof payload !== 'object' ||
    !('User' in payload) ||
    !('Pengunjung' in payload) ||
    !('Statistik' in payload)
  ) {
    throw new Error('Invalid profile response');
  }

  return payload as ProfileInformasiPengunjungResponse;
}
