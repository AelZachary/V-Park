import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  active: 'aktif' | 'history' | 'cancelled';
};

const { width } = Dimensions.get('window');

/* LEBAR TAB */
const TAB_WIDTH = (width - 40 - 12) / 3;

export default function ActivityTabs({ active }: Props) {

  /* POSISI AWAL */
  const getInitialPosition = () => {

    switch (active) {

      case 'aktif':
        return 0;

      case 'history':
        return TAB_WIDTH;

      case 'cancelled':
        return TAB_WIDTH * 2;

      default:
        return 0;
    }
  };

  const translateX = useRef(
    new Animated.Value(getInitialPosition())
  ).current;

  /* ANIMASI */
  useEffect(() => {

    let position = 0;

    switch (active) {

      case 'aktif':
        position = 0;
        break;

      case 'history':
        position = TAB_WIDTH;
        break;

      case 'cancelled':
        position = TAB_WIDTH * 2;
        break;
    }

    Animated.spring(translateX, {
      toValue: position,
      useNativeDriver: true,
      friction: 8,
      tension: 70,
    }).start();

  }, [active]);

  return (
    <View style={styles.tabContainer}>

      {/* ACTIVE BUBBLE */}
      <Animated.View
        style={[
          styles.activeBubble,
          {
            transform: [{ translateX }],
          },
        ]}
      />

      {/* AKTIF */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          if (active !== 'aktif') {
            router.push('/user/activity');
          }
        }}
      >

        <Text
          style={
            active === 'aktif'
              ? styles.activeTabText
              : styles.tabText
          }
        >
          Aktif
        </Text>

      </TouchableOpacity>

      {/* HISTORY */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          if (active !== 'history') {
            router.push('/user/activityHistory');
          }
        }}
      >

        <Text
          style={
            active === 'history'
              ? styles.activeTabText
              : styles.tabText
          }
        >
          Riwayat
        </Text>

      </TouchableOpacity>

      {/* CANCELLED */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          if (active !== 'cancelled') {
            router.push('/user/activityCancelled');
          }
        }}
      >

        <Text
          style={
            active === 'cancelled'
              ? styles.activeTabText
              : styles.tabText
          }
        >
          Dibatalkan
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 6,
    marginTop: 10,

    position: 'relative',
    overflow: 'hidden',
  },

  /* BUBBLE */
  activeBubble: {
    position: 'absolute',

    width: TAB_WIDTH,
    height: 42,

    backgroundColor: '#1565C0',

    borderRadius: 12,

    top: 6,
    left: 6,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',

    zIndex: 2,
  },

  tabText: {
    color: '#1565C0',
    fontWeight: '700',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

});