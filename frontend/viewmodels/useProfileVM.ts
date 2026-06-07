import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  getCurrentSessionUser,
  setCurrentUser,
  onCurrentUserChanged,
} from '@/fetching/auth/session';
import { getPengunjungProfile } from '@/fetching/services/profileService';

function formatRupiah(value: number) {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

export const useProfileVM = () => {
  const currentUser = getCurrentSessionUser();

  const initialSessionStats = currentUser && 'Pengunjung' in currentUser
    ? (currentUser.Pengunjung as { Statistik?: { TotalBooking?: number; TotalJumlahPembayaran?: number } }).Statistik
    : undefined;

  const initialTotalBooking = initialSessionStats?.TotalBooking ?? 0;

  const defaultProfile = {
    name: currentUser?.Username ?? '—',
    phone:
      currentUser && 'Pengunjung' in currentUser
        ? currentUser.Pengunjung.NoHandphone
        : '+628213456789',
    totalBooking: initialTotalBooking,
    totalExpenses: formatRupiah(initialTotalBooking * 20000),
    vehicle:
      currentUser && 'Pengunjung' in currentUser
        ? currentUser.Pengunjung.JenisKendaraan
        : 'Toyota Fortuner',
    plate:
      currentUser && 'Pengunjung' in currentUser
        ? currentUser.Pengunjung.PlatKendaraan
        : 'DD 1234 TNF',
  };

  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const data = await getPengunjungProfile();

        if (!mounted) {
          return;
        }

        // Prefer server statistics, but fall back to locally persisted
        // statistics stored in the current session user when available.
        const sessionUser = getCurrentSessionUser();
        const sessionPengunjung = sessionUser && 'Pengunjung' in sessionUser
          ? (sessionUser.Pengunjung as { Statistik?: { TotalBooking?: number; TotalJumlahPembayaran?: number } })
          : undefined;

        const fallbackBookingRaw = sessionPengunjung?.Statistik?.TotalBooking;
        const fallbackBooking = fallbackBookingRaw != null
          ? Number(fallbackBookingRaw)
          : undefined;

        const fallbackExpensesRaw = sessionPengunjung?.Statistik?.TotalJumlahPembayaran;
        const fallbackExpenses = fallbackExpensesRaw != null
          ? Number(fallbackExpensesRaw)
          : undefined;

        const serverBooking = data.Statistik?.TotalBooking != null ? Number(data.Statistik.TotalBooking) : undefined;
        const serverExpenses = data.Statistik?.TotalJumlahPembayaran != null ? Number(data.Statistik.TotalJumlahPembayaran) : undefined;

        // Accept 0 as a valid server statistic value.
        const finalBooking = serverBooking !== undefined && !Number.isNaN(serverBooking)
          ? serverBooking
          : (fallbackBooking ?? defaultProfile.totalBooking);
        // Use server value only if it's > 0, otherwise calculate from booking count
        const finalExpenses = (serverExpenses && serverExpenses > 0)
          ? serverExpenses
          : finalBooking * 20000;

        setProfile({
          name: data.User.Username || defaultProfile.name,
          phone: data.Pengunjung.NoPengguna || defaultProfile.phone,
          totalBooking: finalBooking,
          totalExpenses: formatRupiah(finalExpenses),
          vehicle: data.Pengunjung.KendaraanPengguna || defaultProfile.vehicle,
          plate: data.Pengunjung.PlatPengguna || defaultProfile.plate,
        });
      } catch {
        // keep local defaults when profile fetch fails
        // If fetch failed, try to use persisted session values
        const sessionUser = getCurrentSessionUser();
        if (sessionUser && 'Pengunjung' in sessionUser) {
          const sessionPengunjung = sessionUser.Pengunjung as { Statistik?: { TotalBooking?: number; TotalJumlahPembayaran?: number } };
          const stats = sessionPengunjung.Statistik || { TotalBooking: undefined, TotalJumlahPembayaran: undefined };
          const booking = stats.TotalBooking ?? defaultProfile.totalBooking;
          // Use server expenses only if > 0, otherwise calculate from booking
          const expenses = (stats.TotalJumlahPembayaran && stats.TotalJumlahPembayaran > 0) ? stats.TotalJumlahPembayaran : booking * 20000;
          setProfile({
            name: sessionUser.Username || defaultProfile.name,
            phone: sessionUser.Pengunjung?.NoHandphone || defaultProfile.phone,
            totalBooking: booking,
            totalExpenses: formatRupiah(expenses),
            vehicle: sessionUser.Pengunjung?.JenisKendaraan || defaultProfile.vehicle,
            plate: sessionUser.Pengunjung?.PlatKendaraan || defaultProfile.plate,
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    // subscribe to local session changes so UI updates when we mutate session
    const unsubscribe = onCurrentUserChanged(() => {
      if (!mounted) return;
      const sessionUser = getCurrentSessionUser();
      if (sessionUser && 'Pengunjung' in sessionUser) {
        const sessionPengunjung = sessionUser.Pengunjung as { Statistik?: { TotalBooking?: number; TotalJumlahPembayaran?: number } };
        const booking = sessionPengunjung.Statistik?.TotalBooking ?? 0;
        // Use server expenses only if > 0, otherwise calculate from booking
        const expenses = (sessionPengunjung.Statistik?.TotalJumlahPembayaran && sessionPengunjung.Statistik.TotalJumlahPembayaran > 0) ? sessionPengunjung.Statistik.TotalJumlahPembayaran : booking * 20000;
        setProfile((prev) => ({
          ...prev,
          totalBooking: booking,
          totalExpenses: formatRupiah(expenses),
        }));
      }
    });

    return () => {
      mounted = false;
      try { unsubscribe(); } catch {}
    };
  }, []);

  const logout = () => {
    setShowLogout(false);
    setCurrentUser(null);
    router.replace('/auth/login');
  };

  return {
    showLogout,
    setShowLogout,
    profile,
    logout,
  };
};