import ActivityHistoryCard from '@/components/activity/ActivityHistory';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useActivityHistoryVM } from '@/viewmodels/useActivityHistoryVM';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export default function ActivityHistoryScreen() {

  const { historyData, loading, error } = useActivityHistoryVM();

  const isEmpty = !loading && !error && historyData.length === 0;

  return (
    <View style={styles.container}>
      {loading || error || isEmpty ? (
        <View style={styles.loadingContainer}>
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#1565C0" />
              <Text style={styles.loadingText}>Memuat riwayat...</Text>
            </>
          ) : error ? (
            <>
              <Text style={styles.emptyTitle}>Gagal memuat riwayat</Text>
              <Text style={styles.loadingText}>{error}</Text>
            </>
          ) : (
            <>
              <Text style={styles.emptyTitle}>Belum ada riwayat transaksi</Text>
              <Text style={styles.loadingText}>Riwayat transaksi akan muncul di sini.</Text>
            </>
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* TITLE */}
          <Text style={styles.sectionTitle}>
            Riwayat Booking
          </Text>

          <Text style={styles.sectionDesc}>
            Daftar parkir yang sudah selesai.
          </Text>

          {historyData.map((item, index) => (
            <ActivityHistoryCard
              key={String(item.id)}
              mall={item.mall}
              area={item.area}
              date={item.date}
              checkIn={item.checkIn}
              checkOut={item.checkOut}
              duration={item.duration}
              total={item.total}
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

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },

  logo: {
    width: 57,
    height: 66,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  sectionTitle: {
    marginTop: 25,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  sectionDesc: {
    marginTop: 5,
    marginHorizontal: 20,
    color: '#2E8BEF',
    fontSize: 16,
    marginBottom: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -150
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

});