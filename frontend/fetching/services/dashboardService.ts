import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

const DASHBOARD_CACHE_TTL_MS = 300000;

let cachedDashboardLocations: DashboardLokasiMallResponse[] | null = null;
let cachedDashboardFetchedAt = 0;
let dashboardRequestPromise: Promise<DashboardLokasiMallResponse[]> | null = null;

type LokasiMallData = {
  IDLokasiMall: number;
  AlamatLokasi: string;
  KodeLokasi?: string;
  NamaLokasi?: string;
  kode_lokasi?: string;
  nama_lokasi?: string;
};

type FotoLokasiMallResponse = {
  FotoLokasi: string;
};

export type DashboardLokasiMallResponse = {
  LokasiMall: LokasiMallData;
  FotoLokasiMall: FotoLokasiMallResponse[];
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

function getControllerData(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const typedPayload = payload as Record<string, unknown>;

  if ('data' in typedPayload) {
    return (typedPayload as Record<string, any>).data;
  }

  if ('CoontrollerData' in typedPayload) {
    return (typedPayload as Record<string, any>).CoontrollerData;
  }

  if ('ControllerData' in typedPayload) {
    return (typedPayload as Record<string, any>).ControllerData;
  }

  return payload;
}

export async function getDashboardLokasiMall(): Promise<DashboardLokasiMallResponse[]> {
  if (cachedDashboardLocations && Date.now() - cachedDashboardFetchedAt < DASHBOARD_CACHE_TTL_MS) {
    return cachedDashboardLocations;
  }

  if (dashboardRequestPromise) {
    return dashboardRequestPromise;
  }

  dashboardRequestPromise = (async () => {
  const res = await authFetch(`${API_BASE_URL}/api/dashboard/pengunjung`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(extractErrorMessage(payload, `Failed to fetch dashboard lokasi mall (${res.status})`));
  }

  const data = getControllerData(payload);

  if (data == null) {
    cachedDashboardLocations = [];
    cachedDashboardFetchedAt = Date.now();
    return [];
  }

  if (!Array.isArray(data)) {
    throw new Error(
      `Invalid dashboard response payload: expected array but got ${typeof data}`
    );
  }

  const locations = data as DashboardLokasiMallResponse[];
  cachedDashboardLocations = locations;
  cachedDashboardFetchedAt = Date.now();
  return locations;
  })();

  try {
    return await dashboardRequestPromise;
  } finally {
    dashboardRequestPromise = null;
  }
}
