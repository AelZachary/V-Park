import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/fetching/auth/session';
import { getDashboardLokasiMall, type DashboardLokasiMallResponse } from '@/fetching/services/dashboardService';

export const useHomeVM = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parkingPlaces, setParkingPlaces] = useState<DashboardLokasiMallResponse[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);

      const currentSession = getCurrentUser();
      const token = currentSession && typeof currentSession === 'object' && 'token' in currentSession
        ? currentSession.token
        : null;

      if (!token) {
        setError('Token tidak tersedia. Silakan masuk ulang.');
        setLoading(false);
        return;
      }

      try {
        const data = await getDashboardLokasiMall();
        setParkingPlaces(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Gagal memuat data lokasi mall';
        console.error('loadDashboard error', message, err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const filteredParking = parkingPlaces.filter((place) => {
    if (!search.trim()) {
      return true;
    }

    const normalizedSearch = search.trim().toLowerCase();
    const mallLabel = `Mall ${place.LokasiMall.IDLokasiMall}`.toLowerCase();
    const address = place.LokasiMall.AlamatLokasi.toLowerCase();

    return mallLabel.includes(normalizedSearch) || address.includes(normalizedSearch);
  });

  return {
    search,
    setSearch,
    filteredParking,
    loading,
    error,
  };
};
