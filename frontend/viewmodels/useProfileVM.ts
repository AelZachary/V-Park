import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { clearToken } from '@/fetching/auth/auth';
import { getProfilePengunjung, editProfilePengunjung, ProfilePengunjungResponse } from '@/fetching/services/profileService';

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
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const loadProfile = async () => {
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
  };

  const updateProfile = async (vehicle: string, plate: string) => {
    setSaving(true);
    setSaveError(null);
    try {
      const response = await editProfilePengunjung({ JenisKendaraan: vehicle, PlatKendaraan: plate });
      await loadProfile();
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setSaveError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
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
    saving,
    saveError,
    updateProfile,
    logout,
  };
};