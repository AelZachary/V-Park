import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  getCurrentSessionUser,
  setCurrentUser,
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

        setProfile({
          name: data.User.Username || defaultProfile.name,
          phone: data.Pengunjung.NoPengguna || defaultProfile.phone,
          totalBooking: data.Statistik.TotalBooking ?? defaultProfile.totalBooking,
          totalExpenses: formatRupiah(data.Statistik.TotalJumlahPembayaran ?? 0),
          vehicle: data.Pengunjung.KendaraanPengguna || defaultProfile.vehicle,
          plate: data.Pengunjung.PlatPengguna || defaultProfile.plate,
        });
      } catch {
        // keep local defaults when profile fetch fails
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      mounted = false;
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