import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  getUserProfile,
} from '@/fetching/services/profileservice';
import {
  isPengunjungLoginResult,
} from '@/fetching/services/loginservices';
import {
  clearCurrentUsername,
  currentUsername,
} from '@/fetching/authSession';

export const useProfileVM = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: 'Guest',
    phone: '',
    totalBooking: 0,
    totalExpenses: 'Rp 0',
    vehicle: '',
    plate: '',
  });

  const fetchProfile = async () => {
    if (!currentUsername) {
      setError('No user logged in. Please log in again.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserProfile(currentUsername);

      if (isPengunjungLoginResult(result)) {
        setProfile({
          name: result.User.Username,
          phone: result.User.Pengunjung.NoHandphone,
          totalBooking: 0,
          totalExpenses: 'Rp 0',
          vehicle: result.User.Pengunjung.JenisKendaraan ?? '',
          plate: result.User.Pengunjung.PlatKendaraan ?? '',
        });
      } else {
        setProfile({
          name: result.User.Username,
          phone: '',
          totalBooking: 0,
          totalExpenses: 'Rp 0',
          vehicle: '',
          plate: '',
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load profile.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProfile();
  }, []);

  const logout = () => {
    clearCurrentUsername();
    setShowLogout(false);
    router.replace('/auth/login');
  };

  return {
    showLogout,
    setShowLogout,
    profile,
    isLoading,
    error,
    logout,
  };
};