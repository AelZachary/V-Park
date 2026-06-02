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

function getStringField(source: unknown, keys: string[]) {
  if (!source || typeof source !== 'object') return undefined;
  const typedSource = source as Record<string, unknown>;

  for (const key of keys) {
    const value = typedSource[key];
    if (typeof value === 'string') {
      return value;
    }
  }

  return undefined;
}

function getNumberField(source: unknown, keys: string[]) {
  if (!source || typeof source !== 'object') return undefined;
  const typedSource = source as Record<string, unknown>;

  for (const key of keys) {
    const value = typedSource[key];
    if (typeof value === 'number') {
      return value;
    }
  }

  return undefined;
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

        const mapped = data
          .slice()
          .sort((a, b) => b.Booking.IDBooking - a.Booking.IDBooking)
          .map((item: FinishedBookingRecord) => {
            // Parse times
            const waktuMasukValue = getStringField(item.RiwayatBooking, ['WaktuMasuk', 'waktu_masuk']);
            const waktuKeluarValue = getStringField(item.RiwayatBooking, ['WaktuKeluar', 'waktu_keluar']);
            const durasiValue = getNumberField(item.RiwayatBooking, ['DurasiParkir', 'durasi_parkir']);

            const waktuMasuk = waktuMasukValue ? new Date(waktuMasukValue) : null;
            const waktuKeluar = waktuKeluarValue ? new Date(waktuKeluarValue) : null;

            const checkIn = formatTime(waktuMasuk);
            const checkOut = formatTime(waktuKeluar);
            const date = new Date(item.Booking.WaktuBooking).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

            // Calculate duration
            let durationSeconds = 0;
            if (typeof durasiValue === 'number' && durasiValue > 0) {
              durationSeconds = durasiValue;
            } else if (waktuMasuk && waktuKeluar) {
              durationSeconds = Math.max(0, Math.floor((waktuKeluar.getTime() - waktuMasuk.getTime()) / 1000));
            }

            const duration = durationSeconds > 0 ? formatParkingDuration(durationSeconds) : '';

            // Parse payment
            let paymentAmount: number | undefined;
            if (item.MetodePembayaran) {
              paymentAmount = getNumberField(item.MetodePembayaran, ['JumlahPembayaran', 'jumlah_pembayaran']);
            }

            const total = typeof paymentAmount === 'number' && paymentAmount > 0
              ? formatRupiah(paymentAmount)
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