import { useState } from 'react';
import { getProfilePengunjung, editProfilePengunjung, getProfilePetugas } from '@/fetching/services/profileService';
import { getDashboardPengunjung } from '@/fetching/services/dashboardService';
import { getTempatParkir } from '@/fetching/services/tempatparkirService';
import { postBookingPengunjung } from '@/fetching/services/bookingService';
import { postMonitoringPetugas } from '@/fetching/services/monitoringService';
import { postKonfirmasiTiba, postKonfirmasiSelesai, postKonfirmasiBatal } from '@/fetching/services/konfirmasiService';
import { getPembayaranInformasiBooking, postPembayaranBayar, postPembayaranWebhook } from '@/fetching/services/pembayaranService';
import { getRiwayatAktif, getRiwayatBatal, getRiwayatSelesai } from '@/fetching/services/riwayatService';

export function useProfileVM() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(token: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await getProfilePengunjung();
      setData(res);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  async function edit(formData: { JenisKendaraan?: string; PlatKendaraan?: string; FotoPengunjung?: any }) {
    setLoading(true);
    setError(null);
    try {
      const res = await editProfilePengunjung(formData);
      setData(res);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, load, edit };
}

export function useDashboardVM() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardPengunjung();
      setData(res);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, load };
}

export function useTempatParkirVM() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(idLokasiMall: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await getTempatParkir(idLokasiMall);
      setData(res);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, load };
}

export function useBookingVM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function book(body: any) {
    setLoading(true);
    setError(null);
    try {
      const res = await postBookingPengunjung(body);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, book };
}

export function useMonitoringVM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post(body: { IDTempatParkir: number }) {
    setLoading(true);
    setError(null);
    try {
      const res = await postMonitoringPetugas(body);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, post };
}

export function useKonfirmasiVM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function tiba(idBooking: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await postKonfirmasiTiba(idBooking);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function selesai(idBooking: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await postKonfirmasiSelesai(idBooking);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function batal(idBooking: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await postKonfirmasiBatal(idBooking);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, tiba, selesai, batal };
}

export function usePembayaranVM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function info(idBooking: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await getPembayaranInformasiBooking(idBooking);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function bayar(idBooking: number, body: { PaymentMethod: string; QRCodeBase64?: string | null }) {
    setLoading(true);
    setError(null);
    try {
      const res = await postPembayaranBayar(idBooking, body);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function webhook(body: any) {
    setLoading(true);
    setError(null);
    try {
      const res = await postPembayaranWebhook(body);
      return res;
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, info, bayar, webhook };
}

export function useRiwayatVM() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function aktif() {
    setLoading(true);
    setError(null);
    try {
      const res = await getRiwayatAktif();
      setData(res as any[]);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  async function batal() {
    setLoading(true);
    setError(null);
    try {
      const res = await getRiwayatBatal();
      setData(res as any[]);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  async function selesai() {
    setLoading(true);
    setError(null);
    try {
      const res = await getRiwayatSelesai();
      setData(res as any[]);
    } catch (e) {
      setError((e instanceof Error && e.message) || 'error');
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, aktif, batal, selesai };
}
