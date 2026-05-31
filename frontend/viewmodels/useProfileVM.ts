import { router } from 'expo-router';
import { useState } from 'react';
import {
  getCurrentSessionUser,
  setCurrentUser,
} from '@/fetching/auth/session';

export const useProfileVM = () => {
  const currentUser = getCurrentSessionUser();

  const [showLogout, setShowLogout] = useState(false);

  const profile = currentUser
    ? {
        name: currentUser.Username,
        phone:
          'Pengunjung' in currentUser
            ? currentUser.Pengunjung.NoHandphone
            : '+628213456789',
        totalBooking: 28,
        totalExpenses: 'Rp 500.000',
        vehicle:
          'Pengunjung' in currentUser
            ? currentUser.Pengunjung.JenisKendaraan
            : 'Toyota Fortuner',
        plate:
          'Pengunjung' in currentUser
            ? currentUser.Pengunjung.PlatKendaraan
            : 'DD 1234 TNF',
      }
    : {
        name: 'Pinky Pie',
        phone: '+628213456789',
        totalBooking: 28,
        totalExpenses: 'Rp 500.000',
        vehicle: 'Toyota Fortuner',
        plate: 'DD 1234 TNF',
      };

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