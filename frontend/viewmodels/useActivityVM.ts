import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActiveBookingRecord, getActiveBookings } from '@/fetching/services/bookingActivityService';

const ARRIVAL_WINDOW_SECONDS = 30 * 60;
const ACTIVE_BOOKING_STATUSES = new Set(['menunggukonfirmasi', 'konfirmasitiba']);

function normalizeStatus(rawStatus: string) {
  return String(rawStatus || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatElapsed(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const useActivityVM = () => {
  const [bookingList, setBookingList] = useState<ActiveBookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const hasLoadedOnceRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      if (!hasLoadedOnceRef.current) {
        setLoading(true);
      }
      setError(null);

      const data = await getActiveBookings();

      if (!Array.isArray(data) || data.length === 0) {
        setBookingList([]);
      } else {
        // filter to only active statuses and sort newest first
        const filtered = data.filter((item) => {
          const status = normalizeStatus(item?.RiwayatBooking?.StatusBooking || '');
          return ACTIVE_BOOKING_STATUSES.has(status);
        });

        const sorted = filtered.sort((a, b) => {
          const ta = new Date(a.Booking.WaktuBooking).getTime();
          const tb = new Date(b.Booking.WaktuBooking).getTime();
          return tb - ta;
        });

        setBookingList(sorted);
      }
      hasLoadedOnceRef.current = true;
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unknown error occurred';
      setError(message);
      setBookingList([]);
    } finally {
      if (!hasLoadedOnceRef.current) {
        hasLoadedOnceRef.current = true;
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      void fetchData();
    }, [fetchData])
  );

  const activities = useMemo(() => {
    if (!bookingList || bookingList.length === 0) return [];

    return bookingList.map((bookingData) => {
      const status = normalizeStatus(bookingData.RiwayatBooking?.StatusBooking || '');
      const isArrived = status === 'konfirmasitiba' || Boolean(bookingData.RiwayatBooking?.WaktuMasuk);
      const bookingTime = new Date(bookingData.Booking.WaktuBooking).getTime();
      const arrivedAt = bookingData.RiwayatBooking?.WaktuMasuk || bookingData.Booking.WaktuBooking;
      const startTime = arrivedAt ? new Date(arrivedAt).getTime() : null;
      const elapsedSeconds = isArrived && startTime ? Math.max(0, Math.floor((now - startTime) / 1000)) : 0;
      const remainingSeconds = Math.max(0, ARRIVAL_WINDOW_SECONDS - Math.floor((now - bookingTime) / 1000));

      return {
        bookingId: bookingData.Booking.IDBooking,
        mallLabel: bookingData.LokasiMall.AlamatLokasi,
        areaLabel: bookingData.TempatParkir.KodeTempat,
        slotLabel: bookingData.TempatParkir.KodeTempat,
        plateNumber: bookingData.Booking.PlatPengguna,
        bookingTimeIso: bookingData.Booking.WaktuBooking,
        bookingTimeLabel: formatDateTime(bookingData.Booking.WaktuBooking),
        countdownLabel: formatCountdown(remainingSeconds),
        runningLabel: formatElapsed(elapsedSeconds),
        arrivedAt,
        isArrived,
        statusLabel: isArrived ? 'Parkir sedang berlangsung' : 'Menunggu Kedatangan Anda di Mall',
        detailLabel: isArrived ? 'Parkir Berjalan' : 'Dipesan',
        detailValue: isArrived ? formatElapsed(elapsedSeconds) : formatDateTime(bookingData.Booking.WaktuBooking),
        raw: bookingData,
      };
    });
  }, [bookingList, now]);

  return {
    loading,
    error,
    activities,
    refreshActivities: fetchData,
  };
};