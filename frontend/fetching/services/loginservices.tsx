import { API_BASE_URL } from '@/fetching/response/responseconfig';
import type { ControllerResponse } from '@/fetching/response/response';

type PengunjungLoginResponse = {
  IDPengunjung: number;
  NoHandphone: string;
  JenisKendaraan: string;
  PlatKendaraan: string;
};

type PetugasLoginResponse = {
  IDPetugas: number;
  MallBertugas: string;
  ShiftMulaiBertugas: string;
  ShiftSelesaiBertugas: string;
};

export type PengunjungLoginResult = {
  User: {
    IDUser: number;
    Username: string;
    Pengunjung: PengunjungLoginResponse;
  };
};

export type PetugasLoginResult = {
  User: {
    IDUser: number;
    Username: string;
    Petugas: PetugasLoginResponse;
  };
};

export type LoginResult =
  | PengunjungLoginResult
  | PetugasLoginResult;

export function isPengunjungLoginResult(
  value: LoginResult
): value is PengunjungLoginResult {
  return 'Pengunjung' in value.User;
}

export function isPetugasLoginResult(
  value: LoginResult
): value is PetugasLoginResult {
  return 'Petugas' in value.User;
}

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

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/authentication/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    }
  );

  const rawBody = await response.text();
  const payload = rawBody
    ? (JSON.parse(rawBody) as LoginResult | ControllerResponse)
    : null;

  if (!response.ok) {
    const message = extractErrorMessage(
      payload,
      'name or password is incorrect'
    );

    throw new Error(message);
  }

  if (!payload || !('User' in payload)) {
    throw new Error('Invalid login response');
  }

  return payload;
}