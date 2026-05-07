import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  active: 'aktif' | 'history' | 'cancelled';
};

export default function ActivityTabs({ active }: Props) {

  return (
    <View style={styles.tabContainer}>

      {/* AKTIF */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          active === 'aktif' && styles.activeTab
        ]}
        onPress={() => router.push('/user/activity')}
      >
        <Text
          style={[
            styles.tabText,
            active === 'aktif' && styles.activeTabText
          ]}
        >
          Aktif
        </Text>
      </TouchableOpacity>

      {/* HISTORY */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          active === 'history' && styles.activeTab
        ]}
        onPress={() => router.push('../user/activityHistory')}
      >
        <Text
          style={[
            styles.tabText,
            active === 'history' && styles.activeTabText
          ]}
        >
          Riwayat
        </Text>
      </TouchableOpacity>

      {/* CANCELLED */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          active === 'cancelled' && styles.activeTab
        ]}
        onPress={() => router.push('../user/activityCancelled')}
      >
        <Text
          style={[
            styles.tabText,
            active === 'cancelled' && styles.activeTabText
          ]}
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
    borderRadius: 14,
    padding: 6,
    marginTop: 10,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: '#1565C0',
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