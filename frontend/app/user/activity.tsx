import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { loadPendingBooking, clearPendingBooking, PendingBooking } from '@/fetching/viewmodels/bookingStorage';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ActivityScreen(){
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    let active = true;

    async function loadBooking() {
      const booking = await loadPendingBooking();
      if (!active) return;

      if (!booking) {
        setPendingBooking(null);
        setTimeLeft(0);
        setElapsed(0);
        return;
      }

      if (booking.status === 'pending') {
        const secondsLeft = Math.max(0, Math.round((booking.expiresAt - Date.now()) / 1000));
        if (secondsLeft <= 0) {
          await clearPendingBooking();
          if (!active) return;
          setPendingBooking(null);
          setTimeLeft(0);
          setElapsed(0);
          return;
        }
        setPendingBooking(booking);
        setTimeLeft(secondsLeft);
        setElapsed(0);
      } else {
        const startAt = booking.startAt ?? booking.createdAt;
        const initial = Math.max(0, Math.floor((Date.now() - startAt) / 1000));
        setPendingBooking(booking);
        setElapsed(initial);
        setTimeLeft(0);
      }
    }

    if (isFocused) {
      loadBooking();
    }

    return () => {
      active = false;
    };
  }, [isFocused]);

  useEffect(() => {
    if (!pendingBooking) return;

    if (pendingBooking.status === 'pending') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            void clearPendingBooking();
            setPendingBooking(null);
            setElapsed(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingBooking]);

  const formatElapsed = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatCountdown = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatTimeOnly = (timestamp: number) => {
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  const isPending = pendingBooking?.status === 'pending';
  const displayTimer = isPending ? formatCountdown(timeLeft) : formatElapsed(elapsed);
  const statusLabel = isPending ? 'Menunggu konfirmasi kedatangan' : 'Parkir sedang berlangsung';
  const description = isPending
    ? 'Konfirmasi kedatangan sebelum waktu habis.'
    : 'Parkir aktif di slot Anda.';
  const statusDotStyle = isPending ? styles.yellowDot : styles.greenDot;
  const statusTextStyle = isPending ? styles.statusText : styles.greenText;
  const timerLabel = isPending ? 'Sisa Waktu' : 'Durasi';

  const handleCardPress = () => {
    if (!pendingBooking) return;

    if (isPending) {
      router.push({
        pathname: '/user/konfirmasiKedatangan',
        params: {
          customerName: pendingBooking.customerName,
          customerPhone: pendingBooking.customerPhone,
          vehicleType: pendingBooking.vehicleType,
          plateNumber: pendingBooking.plateNumber,
          slot: pendingBooking.slot,
          floor: pendingBooking.area,
          mall: pendingBooking.mall,
          createdAt: String(pendingBooking.createdAt),
          expiresAt: String(pendingBooking.expiresAt),
          remainingSeconds: String(timeLeft),
        },
      });
      return;
    }

    router.push({
      pathname: '/user/KonfirmasiSelesaiParkir',
      params: {
        customerName: pendingBooking.customerName,
        customerPhone: pendingBooking.customerPhone,
        vehicleType: pendingBooking.vehicleType,
        plateNumber: pendingBooking.plateNumber,
        slot: pendingBooking.slot,
        floor: pendingBooking.area,
        mall: pendingBooking.mall,
        startAt: String(pendingBooking.startAt ?? pendingBooking.createdAt),
        createdAt: String(pendingBooking.createdAt),
        expiresAt: String(pendingBooking.expiresAt),
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.sectionTitle}>Booking Aktif</Text>

        {pendingBooking ? (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={handleCardPress}
          >
            <View style={styles.statusRow}>
              <View style={statusDotStyle} />
              <Text style={statusTextStyle}>{statusLabel}</Text>
            </View>

            <View style={styles.mallRow}>
              <View style={styles.mallInfo}>
                <View style={styles.parkingIcon}>
                  <Ionicons name="car-outline" size={26} color="#111" />
                </View>
                <View>
                  <Text style={styles.mallName}>{pendingBooking.mall}</Text>
                  <Text style={styles.location}>{pendingBooking.area}</Text>
                </View>
              </View>

              <View style={styles.arrowButton}>
                <Ionicons name="chevron-forward-outline" size={24} color="#1565C0" />
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>Slot Parkir</Text>
                <Text style={styles.bigText}>{pendingBooking.slot ?? '-'}</Text>
                <Text style={styles.smallText}>{pendingBooking.area}</Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>{timerLabel}</Text>
                <Text style={styles.timeText}>{displayTimer}</Text>
                <Text style={styles.smallText}>{formatTimeOnly(pendingBooking.createdAt)}</Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>Plat Kendaraan</Text>
                <Text style={styles.plate}>{pendingBooking.plateNumber ?? '—'}</Text>
              </View>
            </View>

            <View>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.emptyText}>Tidak ada booking aktif saat ini.</Text>
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
    marginHorizontal: 1,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  smallText: {
    marginTop: 4,
    color: '#333',
  },
  timeText: {
    fontWeight: '700',
    color: '#111',
  },
  verticalLine: {
    width: 1,
    height: 70,
    backgroundColor: '#1565C0',
    marginHorizontal: 15,
  },
  plate: {
    fontWeight: '800',
    fontSize: 16,
    color: '#111',
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
  emptyText: {
    marginHorizontal: 20,
    marginTop: 24,
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
  },
  runningText: {
    fontWeight: '800',
    color: '#111',
    fontSize: 15,
  },
  activeBanner: {
    marginTop: 15,
    backgroundColor: '#E8F6EE',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6E6C8',
  },
  activeBannerLeft: {
    flex: 1,
    alignItems: 'center'
  },
  activeBannerTitle: {
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
    fontSize: 15,
  },
  activeBannerDesc: {
    color: '#2E7D32',
    opacity: 0.92,
    fontSize: 13,
  },
  activeBannerRight: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDurationBox: {
    backgroundColor: '#DFF3DE',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 96,
    alignItems: 'center',
  },
  activeDurationLabel: {
    color: '#2E7D32',
    fontSize: 11,
    marginBottom: 6,
    opacity: 0.95,
  },
  activeDurationText: {
    color: '#2E7D32',
    fontWeight: '800',
    fontSize: 18,
  },
});