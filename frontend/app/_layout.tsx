import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ensureCurrentUserLoaded } from '@/fetching/auth/session';

export default function RootLayout() {
  useEffect(() => {
    void ensureCurrentUserLoaded();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}