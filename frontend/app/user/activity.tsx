import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useActivityVM } from '@/viewmodels/useActivityVM';
import { cancelBookingPengunjung } from '@/fetching/services/bookingActivityService';

export default function ActivityScreen(){
  const { loading, error, activities, refreshActivities } = useActivityVM();
  const autoCancelledRef = useRef<Set<number>>(new Set());

  useFocusEffect(
    useCallback(() => {
      autoCancelledRef.current.clear();
    }, [])
  );

  useEffect(() => {
    if (!activities || activities.length === 0) return;

    const pending = activities.filter((a: any) => !a.isArrived);
    if (pending.length === 0) return;

    // Check if any pending booking has countdown === 0
    const hasExpired = pending.some((activity: any) => {
      const countdownStr = activity.countdownLabel;
      return countdownStr === '00:00';
    });

    if (hasExpired) {
      pending.forEach(async (activity: any) => {
        const countdownStr = activity.countdownLabel;
        if (countdownStr === '00:00' && !autoCancelledRef.current.has(activity.bookingId)) {
          autoCancelledRef.current.add(activity.bookingId);

          try {
            await cancelBookingPengunjung(activity.bookingId);

            Alert.alert(
              'Booking Dibatalkan',
              `Booking Anda untuk slot ${activity.slotLabel} telah dibatalkan otomatis karena waktu habis.`
            );

            // Refresh activities after cancel
            setTimeout(() => {
              void refreshActivities();
            }, 500);
          } catch (err) {
            console.error('Auto-cancel failed:', err);
            // Jangan delete dari set, karena kalau fail berarti booking tidak bisa dibatalkan
            // Biarkan tetap di-track agar tidak retry terus-menerus
          }
        }
      });
    }
  }, [activities, refreshActivities]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={styles.loadingText}>Memuat booking aktif...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyTitle}>Gagal memuat aktivitas</Text>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyTitle}>Belum ada booking aktif</Text>
          <Text style={styles.emptyText}>
            Booking baru akan muncul di tab ini setelah berhasil dibuat.
          </Text>
        </View>
      </View>
    );
  }

  const pending = activities.filter((a: any) => !a.isArrived);
  const arrived = activities.filter((a: any) => a.isArrived);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {pending.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Booking Aktif</Text>

            <View style={styles.statusRow}>
              <View style={styles.yellowDot} />
              <Text style={styles.statusText}>{pending[0].statusLabel}</Text>
            </View>

            {pending.map((activity) => (
              <TouchableOpacity
                key={String(activity.bookingId)}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: '/user/konfirmasiKedatangan',
                    params: {
                      bookingID: String(activity.bookingId),
                      slot: activity.slotLabel,
                      bookingTimeIso: activity.bookingTimeIso,
                    },
                  })
                }
              >
                <View style={styles.mallRow}>
                  <View style={styles.mallInfo}>
                    <View style={styles.parkingIcon}>
                      <Ionicons name="car-outline" size={26} color="#111" />
                    </View>
                    <View>
                      <Text style={styles.mallName}>{activity.mallLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.arrowButton}>
                    <Ionicons name="chevron-forward-outline" size={24} color="#1565C0" />
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Slot Parkir</Text>
                    <Text style={styles.bigText}>{activity.slotLabel}</Text>
                  </View>

                  <View style={styles.verticalLine} />

                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Dipesan</Text>
                    <Text style={styles.timeText}>{activity.bookingTimeLabel}</Text>
                  </View>

                  <View style={styles.verticalLine} />

                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Plat</Text>
                    <Text style={styles.plate}>{activity.plateNumber}</Text>
                  </View>
                </View>

                <View style={styles.warningBox}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.warningTitle}>Slot Anda sedang ditahan</Text>
                    <Text style={styles.warningDesc}>Silahkan tiba di Mall sebelum waktu habis</Text>
                  </View>

                  <View style={styles.timerBox}>
                    <Text style={styles.timerLabel}>Sisa Waktu</Text>
                    <Text style={styles.timer}>{activity.countdownLabel}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {arrived.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Parkir Aktif</Text>

            <View style={styles.statusRow}>
              <View style={styles.greenDot} />
              <Text style={styles.greenText}>{arrived[0].statusLabel}</Text>
            </View>

            {arrived.map((activity) => (
              <TouchableOpacity
                key={String(activity.bookingId)}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: '/user/KonfirmasiSelesaiParkir',
                    params: {
                      bookingID: String(activity.bookingId),
                      slot: activity.slotLabel,
                      floor: activity.areaLabel,
                      arrivedAt: activity.arrivedAt,
                    },
                  })
                }
              >
                <View style={styles.mallRow}>
                  <View style={styles.mallInfo}>
                    <View style={styles.parkingIcon}>
                      <Ionicons name="car-outline" size={26} color="#111" />
                    </View>
                    <View>
                      <Text style={styles.mallName}>{activity.mallLabel}</Text>
                      <Text style={styles.location}>{activity.areaLabel}</Text>
                    </View>
                  </View>

                  <View>
                    <Ionicons name="chevron-forward-outline" size={24} color="#1565C0" />
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Slot Parkir</Text>
                    <Text style={styles.bigText}>{activity.slotLabel}</Text>
                  </View>

                  <View style={styles.verticalLine} />

                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Waktu</Text>
                    <Text style={styles.runningText}>🟢 {activity.runningLabel}</Text>
                  </View>

                  <View style={styles.verticalLine} />

                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Plat</Text>
                    <Text style={styles.plate}>{activity.plateNumber}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// Style bawaan kamu tetap aman di bawah ini tanpa ada yang berubah
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
    marginTop: -150
  },
  loadingText: {
    marginTop: 12,
    color: '#1565C0',
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    marginTop: 8,
    color: '#607080',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginTop: 14,
    marginHorizontal: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 20,
  },
  yellowDot: {
    width: 12,
    height: 12, 
    borderRadius: 6,
    backgroundColor:'#F5C542',
    marginRight: 10, 
  },
  statusText:{
    color: '#2E8BEF',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20, 
    marginTop: 14,
    borderRadius: 22,
    padding: 18,
  },
  mallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  mallInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  parkingIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#DCEEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mallName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1565C0',
  },
  location: {
    marginTop: 3,
    color: '#333',
    fontSize: 16,
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  detailItem: {
    flex: 1,
  },
  detailTitle: {
    color: '#1565C0',
    fontWeight: '700',
    marginBottom: 8,
  },
  bigText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111',
    marginBottom: 5,
  },
  smallText: {
    marginTop: 4,
    color: '#333',
  },
  timeText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#111',
    marginTop: 2.99,
  },
  verticalLine: {
    width: 1,
    height: 70,
    backgroundColor: '#1565C0',
    marginHorizontal: 15,
  },
  plate: {
    fontWeight: '800',
    fontSize: 13,
    color: '#111',
    marginBottom: 12,
  },
  warningBox: {
    marginTop: 15,
    backgroundColor: '#FFF6E8',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningTitle: {
    color: '#9D6C23',
    fontWeight: '700',
  },
  warningDesc: {
    marginTop: 4,
    color: '#222',
    fontSize: 13,
  },
  timerBox: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  timerLabel: {
    fontSize: 11,
    color: '#9D6C23',
  },
  timer: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FEAB42',
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#79C57A',
    marginRight: 10,
  },
  greenText: {
    color: '#2E8BEF',
    fontSize: 15,
  },
  runningText: {
    fontWeight: '800',
    color: '#111',
    fontSize: 11.5,
    marginTop: 3,
    marginBottom: 12,
  },
});