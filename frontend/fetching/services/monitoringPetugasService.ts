import { API_BASE_URL } from '../response/responseconfig';
import { authFetch } from '../auth/auth';

export interface ToggleMonitoringPetugasResponse {
  Monitoring: {
    IDMonitoring: number;
    IDPetugas: number;
    IDTempatParkir: number;
    WaktuMonitoring: string;
  };
  TempatParkir: {
    IDTempatParkir: number;
    KodeTempat?: string;
    StatusTempatParkir?: string;
  };
  LokasiMall: {
    IDLokasiMall: number;
    AlamatLokasi?: string;
  };
}

export async function toggleMonitoringPetugas(idTempatParkir: number) {
  const res = await authFetch(`${API_BASE_URL}/api/monitoring/petugas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ IDTempatParkir: idTempatParkir }),
  });

  const payload = await res.json();

  if (!res.ok) {
    const errorMessage =
      payload && typeof payload === 'object' && 'ResponseMessage' in payload
        ? (payload as any).ResponseMessage
        : payload?.message || 'Failed to toggle monitoring petugas';
    throw new Error(String(errorMessage));
  }

  return payload as ToggleMonitoringPetugasResponse;
}
