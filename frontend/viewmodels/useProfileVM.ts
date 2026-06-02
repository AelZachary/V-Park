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

  const defaultProfile = {
    name: currentUser?.Username ?? '—',
    phone:
      currentUser && 'Pengunjung' in currentUser
        ? currentUser.Pengunjung.NoHandphone
        : '+628213456789',
    totalBooking: 28,
    totalExpenses: 'Rp 500.000',
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
        const fallbackBooking = sessionUser && 'Pengunjung' in sessionUser && sessionUser.Pengunjung?.Statistik?.TotalBooking
          ? Number(sessionUser.Pengunjung.Statistik.TotalBooking)
          : undefined;

        const fallbackExpenses = sessionUser && 'Pengunjung' in sessionUser && sessionUser.Pengunjung?.Statistik?.TotalJumlahPembayaran
          ? Number(sessionUser.Pengunjung.Statistik.TotalJumlahPembayaran)
          : undefined;

        const serverBooking = typeof data.Statistik?.TotalBooking === 'number' ? data.Statistik.TotalBooking : undefined;
        const serverExpenses = typeof data.Statistik?.TotalJumlahPembayaran === 'number' ? data.Statistik.TotalJumlahPembayaran : undefined;

        // Treat server 0 as missing (prefer local persisted values when available)
        const serverBookingValid = typeof serverBooking === 'number' && serverBooking > 0;
        const serverExpensesValid = typeof serverExpenses === 'number' && serverExpenses > 0;

        const finalBooking = serverBookingValid ? serverBooking : (fallbackBooking ?? defaultProfile.totalBooking);
        const finalExpenses = serverExpensesValid ? serverExpenses : (fallbackExpenses ?? 0);

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
          const stats = sessionUser.Pengunjung?.Statistik || { TotalBooking: undefined, TotalJumlahPembayaran: undefined };
          setProfile({
            name: sessionUser.Username || defaultProfile.name,
            phone: sessionUser.Pengunjung?.NoHandphone || defaultProfile.phone,
            totalBooking: stats.TotalBooking ?? defaultProfile.totalBooking,
            totalExpenses: formatRupiah(stats.TotalJumlahPembayaran ?? 0),
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
        const stats = sessionUser.Pengunjung?.Statistik || { TotalBooking: undefined, TotalJumlahPembayaran: undefined };
        setProfile((prev) => ({
          ...prev,
          totalBooking: stats.TotalBooking ?? prev.totalBooking,
          totalExpenses: formatRupiah(stats.TotalJumlahPembayaran ?? 0),
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