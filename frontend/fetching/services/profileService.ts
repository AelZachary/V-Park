import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

export type ProfilePengunjungUserResponse = {
  Username: string;
};

export type ProfilePengunjungDataResponse = {
  NoPengguna: string;
  KendaraanPengguna: string;
  PlatPengguna: string;
  FotoPengunjung?: string | null;
};

export type ProfilePengunjungStatistikResponse = {
  TotalBooking: number;
  TotalJumlahPembayaran: number;
};

export type ProfilePengunjungResponse = {
  User: ProfilePengunjungUserResponse;
  Pengunjung: ProfilePengunjungDataResponse;
  Statistik: ProfilePengunjungStatistikResponse;
};

export async function getProfilePengunjung(token?: string): Promise<ProfilePengunjungResponse> {
  const res = await authFetch(`${API_BASE_URL}/api/profile/informasi/pengunjung`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as ProfilePengunjungResponse | Record<string, unknown>) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching profile failed'));

  return payload as ProfilePengunjungResponse;
}

export async function editProfilePengunjung(
  tokenOrData: string | { JenisKendaraan?: string; PlatKendaraan?: string; FotoPengunjung?: any },
  maybeData?: { JenisKendaraan?: string; PlatKendaraan?: string; FotoPengunjung?: any }
) {
  const token = typeof tokenOrData === 'string' ? tokenOrData : undefined;
  const data = (typeof tokenOrData === 'string' ? maybeData! : tokenOrData) as {
    JenisKendaraan?: string;
    PlatKendaraan?: string;
    FotoPengunjung?: any;
  };

  const headers: Record<string, string> = {};
  const body = data.FotoPengunjung
    ? (() => {
        const form = new FormData();
        if (data.JenisKendaraan !== undefined) form.append('JenisKendaraan', data.JenisKendaraan);
        if (data.PlatKendaraan !== undefined) form.append('PlatKendaraan', data.PlatKendaraan);
        form.append('FotoPengunjung', data.FotoPengunjung as any);
        return form;
      })()
    : (() => {
        const params = new URLSearchParams();
        if (data.JenisKendaraan !== undefined) params.append('JenisKendaraan', data.JenisKendaraan);
        if (data.PlatKendaraan !== undefined) params.append('PlatKendaraan', data.PlatKendaraan);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        return params.toString();
      })();

  const res = await authFetch(
    `${API_BASE_URL}/api/profile/edit/pengunjung`,
    { method: 'POST', headers, body },
    token
  );

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'editing profile failed'));

  return payload;
}

export async function getProfilePetugas(token?: string) {
  const res = await authFetch(`${API_BASE_URL}/api/profile/informasi/petugas`, { method: 'GET' }, token);

  const raw = await res.text();
  const payload = raw ? (JSON.parse(raw) as unknown) : null;

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching petugas profile failed'));

  return payload;
}
