import ActivityTabs from '@/components/navigation/ActivityTabs';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import HeaderActivity from '@/components/navigation/HeaderActivity';

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
    '/user/payment',
    '/user/paymentProcessing',
    '/user/paymentSuccessful',
    '/user/selectParkingSpot',
  ];

  /* CEK APAKAH NAVBAR DISSEMBUNYIKAN */
  const shouldHideNavbar =
    hideNavbarPage.includes(pathname);

  /* CEK HALAMAN ACTIVITY */
  const isActivityPage =
    pathname.includes('activity');

  /* ACTIVE TAB NAVBAR */
  const getActiveTab = () => {

    if (pathname.includes('profile')) {
      return 'profile';
    }

    if (pathname.includes('activity')) {
      return 'activity';
    }

    return 'home';
  };

  /* ACTIVE TAB ACTIVITY */
  const getActivityTab = () => {

    if (pathname.includes('activityHistory')) {
      return 'history';
    }

    if (pathname.includes('activityCancelled')) {
      return 'cancelled';
    }

    return 'aktif';
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EEF4FA',
      }}
    >

      {/* HEADER + TABS KHUSUS ACTIVITY */}
      {isActivityPage && (
        <>
          <HeaderActivity />

          <ActivityTabs
            active={getActivityTab()}
          />
        </>
      )}

      {/* SCREEN */}
      <Stack
        screenOptions={{
          headerShown: false,

          contentStyle: {
            backgroundColor: '#EEF4FA',
          },
        }}
      />

      {/* BOTTOM NAVBAR */}
      {!shouldHideNavbar && (
        <BottomNavbar active={getActiveTab()} />
      )}

    </View>
  );
}