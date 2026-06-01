import { useEffect, useState } from 'react';
import { getCancelledBookings } from '@/fetching/services/bookingActivityService';

export type CancelledBooking = {
  mall: string;
  area: string;
  date: string;
};

export const useActivityCancelledVM = () => {
  const [cancelledData, setCancelledData] = useState<CancelledBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCancelledBookings() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCancelledBookings();
        if (!isMounted) return;

        setCancelledData(
          data.map((item) => ({
            mall: item.LokasiMall.AlamatLokasi,
            area: item.TempatParkir.KodeTempat,
            date: new Date(item.Booking.WaktuBooking).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          }))
        );
      } catch (fetchError) {
        if (!isMounted) return;
        const message = fetchError instanceof Error ? fetchError.message : 'Unknown error occurred';
        setError(message);
        setCancelledData([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCancelledBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    cancelledData,
    loading,
    error,
  };
};