import { ParkingHistory } from "@/models/ParkingHistory";
import { useEffect, useState } from 'react';
import { getFinishedBookings } from '@/fetching/services/bookingActivityService';
import { getLokasiDisplayName } from '@/fetching/response/locationDisplayName';

export function useActivityHistoryVM() {
  const [historyData, setHistoryData] = useState<ParkingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchHistory() {
      try {
        setLoading(true);
        setError(null);

        const data = await getFinishedBookings();
        if (!mounted) return;

        const mapped = data.map((item, idx) => {
          const waktuMasuk = item.RiwayatBooking?.WaktuMasuk ? new Date(item.RiwayatBooking.WaktuMasuk) : null;
          const waktuKeluar = (item as any).RiwayatBooking?.WaktuKeluar ? new Date((item as any).RiwayatBooking.WaktuKeluar) : null;

          const checkIn = waktuMasuk ? waktuMasuk.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
          const checkOut = waktuKeluar ? waktuKeluar.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
          const date = new Date(item.Booking.WaktuBooking).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

          return {
            id: item.Booking.IDBooking,
            date,
            mall: getLokasiDisplayName(item.LokasiMall),
            area: item.TempatParkir.KodeTempat,
            checkIn,
            checkOut,
            duration: '',
            total: '',
          } as ParkingHistory;
        });

        setHistoryData(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        if (!mounted) return;
        setError(message);
        setHistoryData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void fetchHistory();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    historyData,
    loading,
    error,
  };
}