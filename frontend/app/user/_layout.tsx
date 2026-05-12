import BottomNavbar from '@/components/navigation/BottomNavbar';
import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function UserLayout() {

  const pathname = usePathname();

  /* HALAMAN YANG TIDAK PAKAI NAVBAR */
  const hideNavbarPage = [
    '/user/KonfirmasiSelesaiParkir',
    '/user/konfirmasiKedatangan',
    '/user/detailLocation',
  ];

  /* CEK APAKAH NAVBAR DISSEMBUNYIKAN */
  const shouldHideNavbar =
    hideNavbarPage.includes(pathname);

  const getActiveTab = () => {

    if (pathname.includes('profile')) {
      return 'profile';
    }

    if (pathname.includes('activity')) {
      return 'activity';
    }

    return 'home';
  };

  return (
    <View style={{ flex: 1 }}>

      <Stack screenOptions={{ headerShown: false }} />

      {/* NAVBAR */}
      {!shouldHideNavbar && (
        <BottomNavbar active={getActiveTab()} />
      )}

    </View>
  );
}