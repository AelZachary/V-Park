import { router } from 'expo-router';
import { useState } from 'react';

export const useProfileVM = () => {

  const [showLogout, setShowLogout] = useState(false);

  const profile = {
    name: 'Pinky Pie',
    phone: '+628213456789',
    totalBooking: 28,
    totalExpenses: 'Rp 500.000',
    vehicle: 'Toyota Fortuner',
    plate: 'DD 1234 TNF',
  };

  const logout = () => {
    setShowLogout(false);
    router.replace('/auth/login');
  };

  return {
    showLogout,
    setShowLogout,
    profile,
    logout,
  };
};