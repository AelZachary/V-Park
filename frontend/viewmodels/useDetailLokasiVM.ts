import { useState, useEffect } from 'react';
import { DetailLokasiResponse, getDetailLokasi } from '@/fetching/services/detailLocationService';

export function useDetailLokasiVM() {
  const [data, setData] = useState<DetailLokasiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await getDetailLokasi();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching detail lokasi:', errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
