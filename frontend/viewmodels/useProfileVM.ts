import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { clearToken } from '@/fetching/auth/auth';
import { getProfilePengunjung, ProfilePengunjungResponse } from '@/fetching/services/profileService';

const initialProfile = {
  User: { Username: '' },
  Pengunjung: { NoPengguna: '', KendaraanPengguna: '', PlatPengguna: '', FotoPengunjung: null },
  Statistik: { TotalBooking: 0, TotalJumlahPembayaran: 0 },
};

export const useProfileVM = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState<ProfilePengunjungResponse>(initialProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProfilePengunjung();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const logout = async () => {
    setShowLogout(false);
    await clearToken();
    router.replace('/auth/login');
  };

  return {
    showLogout,
    setShowLogout,
    profile,
    loading,
    error,
    logout,
  };
};