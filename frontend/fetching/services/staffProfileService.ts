import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { getCurrentSessionToken } from '@/fetching/auth/session';

type ProfileResponse = {
  User: { Username: string };
  Petugas: {
    MallBertugas: string;
    ShiftMulaiBertugas: string;
    ShiftSelesaiBertugas: string;
    FotoPetugas?: string | null;
  };
};

export async function getStaffProfile(): Promise<ProfileResponse> {
  const token = getCurrentSessionToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${API_BASE_URL}/api/profile/informasi/petugas`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const txt = await res.text();
  const payload = txt ? JSON.parse(txt) : null;

  if (!res.ok) {
    const msg = payload && typeof payload === 'object' && 'ResponseMessage' in payload
      ? (payload as any).ResponseMessage
      : 'Failed to fetch profile';
    throw new Error(msg);
  }

  if (!payload || !('User' in payload) || !('Petugas' in payload)) {
    throw new Error('Invalid profile response');
  }

  return payload as ProfileResponse;
}
