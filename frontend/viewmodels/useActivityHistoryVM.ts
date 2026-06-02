import { ParkingHistory } from "@/models/ParkingHistory";
import { useEffect, useState } from 'react';
import { FinishedBookingRecord, getFinishedBookings } from '@/fetching/services/bookingActivityService';
import { getLokasiDisplayName } from '@/fetching/response/locationDisplayName';

function formatParkingDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} jam`);
  }
  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes} menit`);
  }

  return parts.join(' ');
}

function formatRupiah(value: number) {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

function formatTime(date: Date | null) {
  return date ? date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
}

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

        const mapped = data.map((item: FinishedBookingRecord) => {
          const waktuMasuk = item.RiwayatBooking?.WaktuMasuk ? new Date(item.RiwayatBooking.WaktuMasuk) : null;
          const waktuKeluar = item.RiwayatBooking?.WaktuKeluar ? new Date(item.RiwayatBooking.WaktuKeluar) : null;

          const checkIn = formatTime(waktuMasuk);
          const checkOut = formatTime(waktuKeluar);
          const date = new Date(item.Booking.WaktuBooking).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

          const durationSeconds = typeof item.RiwayatBooking?.DurasiParkir === 'number'
            ? item.RiwayatBooking.DurasiParkir
            : waktuMasuk && waktuKeluar
              ? Math.max(0, Math.floor((waktuKeluar.getTime() - waktuMasuk.getTime()) / 1000))
              : 0;

          const duration = durationSeconds > 0 ? formatParkingDuration(durationSeconds) : '';
          const total = typeof item.MetodePembayaran?.JumlahPembayaran === 'number'
            ? formatRupiah(item.MetodePembayaran.JumlahPembayaran)
            : '';

          return {
            id: item.Booking.IDBooking,
            date,
            mall: getLokasiDisplayName(item.LokasiMall),
            area: item.TempatParkir.KodeTempat,
            checkIn,
            checkOut,
            duration,
            total,
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