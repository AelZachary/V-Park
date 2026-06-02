import ActivityCancelled from '@/components/activity/ActivityCancelled';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useActivityCancelledVM } from '@/viewmodels/useActivityCancelledVM';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ActivityCancelledScreen() {

  const { cancelledData, loading, error } = useActivityCancelledVM();

  const isEmpty = !loading && !error && cancelledData.length === 0;

  return (
    <View style={styles.container}>
      {loading || error || isEmpty ? (
        <View style={styles.loadingContainer}>
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#1565C0" />
              <Text style={styles.loadingText}>Memuat riwayat batal...</Text>
            </>
          ) : error ? (
            <>
              <Text style={styles.emptyTitle}>Gagal memuat riwayat batal</Text>
              <Text style={styles.loadingText}>{error}</Text>
            </>
          ) : (
            <>
              <Text style={styles.emptyTitle}>Belum ada booking yang dibatalkan</Text>
              <Text style={styles.loadingText}>Data batal akan muncul di sini.</Text>
            </>
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {cancelledData.map((item, index) => (
            <ActivityCancelled
              key={index}
              mall={item.mall}
              area={item.area}
              date={item.date}
            />
          ))}
        </ScrollView>
      )}

      {/* BOTTOM NAV */}
      <BottomNavbar active="activity" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF4FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#607080',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

});