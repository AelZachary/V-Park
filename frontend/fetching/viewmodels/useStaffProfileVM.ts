import { router } from 'expo-router';
import { useState } from 'react';

export const useStaffProfileVM = () => {

  const [showLogout, setShowLogout] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Andi Saputra',
    role: 'Petugas Parkir',
    staffId: 'PGS-0012',
    area: 'Trans Studio Mall Makassar',
    shift: 'Pagi (7:00 - 12:00)',
  });

  const logout = () => {
    setShowLogout(false);
    router.replace('/auth/login');
  };

  const updateProfile = (
    key: string,
    value: string
  ) => {
    setProfile(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    showLogout,
    setShowLogout,

    profile,
    updateProfile,

    logout,
  };
};