import { useEffect, useState } from 'react';
import { getDashboardPengunjung } from '@/fetching/services/dashboardService';

type ParkingPlace = {
  id: number;
  name: string;
  description: string;
  image: unknown;
};

const DEFAULT_IMAGE = require('../assets/images/V-Park.png');

export const useHomeVM = () => {
  const [search, setSearch] = useState('');
  const [parkingPlaces, setParkingPlaces] = useState<ParkingPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadParkingPlaces() {
    setLoading(true);
    setError(null);

    try {
      const payload = await getDashboardPengunjung();
      const list = Array.isArray((payload as any)?.data)
        ? (payload as any).data
        : [];

      const mapped = list.map((item: any, index: number) => {
        const alamat = item?.LokasiMall?.AlamatLokasi ?? '';
        const id = Number(item?.LokasiMall?.IDLokasiMall ?? index + 1);
        const title = `Lokasi Mall ${id}`;

        return {
          id,
          name: title,
          description: alamat,
          image: DEFAULT_IMAGE,
        };
      });

      setParkingPlaces(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load dashboard data');
      setParkingPlaces([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadParkingPlaces();
  }, []);

  const filteredParking = parkingPlaces.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase()) ||
    place.description.toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,
    loading,
    error,
    filteredParking,
  };
};
