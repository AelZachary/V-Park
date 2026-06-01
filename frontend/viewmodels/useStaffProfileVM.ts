import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { setCurrentUser } from '@/fetching/auth/session';
import { getStaffProfile } from '@/fetching/services/staffProfileService';

export const useStaffProfileVM = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: '—',
    role: 'Petugas Parkir',
    staffId: '—',
    area: '—',
    shift: '—',
  });

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const data = await getStaffProfile();
        const name = data.User.Username || '—';
        const area = data.Petugas.MallBertugas || '—';

        // Format shift times (HH:MM - HH:MM)
        const start = new Date(data.Petugas.ShiftMulaiBertugas).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const end = new Date(data.Petugas.ShiftSelesaiBertugas).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setProfile({
          name,
          role: 'Petugas Parkir',
          staffId: name, // fallback: use username if no explicit id provided
          area,
          shift: `${start} - ${end}`,
        });
      } catch (err) {
        // ignore silently — keep defaults
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    setShowLogout(false);
    setCurrentUser(null);
    router.replace('/auth/login');
  };

  const updateProfile = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    showLogout,
    setShowLogout,
    loading,

    profile,
    updateProfile,

    logout,
  };
};