import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
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
  const [pendingElapsed, setPendingElapsed] = useState(0);

  // STATE KETIKA SUDAH TIBA
  const params = useLocalSearchParams();
  const [isArrived, setIsArrived] = useState(
    params.arrived == 'true'
  )
  const [parkingDuration, setParkingDuration] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    let active = true;

    async function loadBooking() {
      const booking = await loadPendingBooking();
      if (!active) return;

      if (!booking) {
        setPendingBooking(null);
        setPendingElapsed(0);
        return;
      }

      setPendingBooking(booking);
      // start elapsed from createdAt
      const initial = Math.max(0, Math.floor((Date.now() - booking.createdAt) / 1000));
      setPendingElapsed(initial);
      // also set timeLeft for backward compatibility if needed (not used for active)
      const secondsLeft = Math.max(0, Math.round((booking.expiresAt - Date.now()) / 1000));
      setTimeLeft(secondsLeft);
    }

    if (isFocused) loadBooking();

    return () => {
      active = false;
    };
  }, [isFocused]);

  useEffect(() => {
    if (!pendingBooking) return;

    const timer = setInterval(() => {
      setPendingElapsed((prev) => prev + 1);
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingBooking, timeLeft]);

  // TIMER PARKIR BERJALAN 
  useEffect(() => {
    if (!isArrived) return;

    const parkingTimer = setInterval(() => {
      setParkingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(parkingTimer);
  }, [isArrived]);

  // FORMAT TIMER COUNTDOWN 
  const formatElapsed = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formattedTime = formatElapsed(pendingElapsed);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  const formatTimeOnly = (timestamp: number) => {
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  // FORMAT TIMER PARKIR BERJALAN
  const parkingHours = Math.floor(parkingDuration / 3600);
  const parkingMinutes = Math.floor((parkingDuration % 3600) / 60);
  const parkingSeconds = parkingDuration % 60;
  const runningParkingTime =
    `${String(parkingHours).padStart(2, '0')}:` +
    `${String(parkingMinutes).padStart(2, '0')}:` +
    `${String(parkingSeconds).padStart(2, '0')}`;
  
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}
      >
        {/* SEBELUM TIBA DI MALL */}
        {!isArrived ? (
          <>
            <Text style={styles.sectionTitle}>
              Booking Aktif
            </Text>

            {pendingBooking ? (
              <>
                {/* STATUS */}
                <View style={styles.statusRow}>
                  <View style={styles.greenDot}/>
                  <Text style={styles.greenText}>
                    Parkir sedang berlangsung
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.card}
                  activeOpacity={0.85}
                  onPress={() => router.push({
                    pathname: '/user/KonfirmasiSelesaiParkir',
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
                    },
                  })}
                >
                  <View style={styles.mallRow}>
                    <View style={styles.mallInfo}>
                      <View style={styles.parkingIcon}>
                        <Ionicons
                          name="car-outline"
                          size={26}
                          color="#111"
                        />
                      </View>
                      <View>
                        <Text style={styles.mallName}>
                          {pendingBooking.mall}
                        </Text>
                        <Text style={styles.location}>
                          {pendingBooking.area}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.arrowButton}>
                      <Ionicons
                        name='chevron-forward-outline'
                        size={24}
                        color="#1565C0"
                      />
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailTitle}>
                        Slot Parkir
                      </Text>
                      <Text style={styles.bigText}>
                        {pendingBooking.slot ?? '-'}
                      </Text>
                      <Text style={styles.smallText}>
                        {pendingBooking.area}
                      </Text>
                    </View>

                    <View style={styles.verticalLine}/>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailTitle}>
                        Parkir Berjalan
                      </Text>
                      <Text style={styles.timeText}>
                        ⏱ {formattedTime}
                      </Text>
                      <Text style={styles.smallText}>
                        {formatTimeOnly(pendingBooking.createdAt)}
                      </Text>
                    </View>

                    <View style={styles.verticalLine}/>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailTitle}>
                        Plat Kendaraan                  
                      </Text>
                      <Text style={styles.plate}>
                        {pendingBooking.plateNumber ?? '—'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.activeBanner}>
                    <View style={styles.activeBannerLeft}>
                      <Text style={styles.activeBannerTitle}>Parkir sedang berlangsung</Text>
                      <Text style={styles.activeBannerDesc}>Parkir aktif di slot Anda.</Text>
                    </View>

                    <View style={styles.activeBannerRight}>
                      <View style={styles.activeDurationBox}>
                        <Text style={styles.activeDurationLabel}>Durasi</Text>
                        <Text style={styles.activeDurationText}>{formattedTime}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.emptyText}>
                Tidak ada booking aktif saat ini.
              </Text>
            )}
          </>
        ):(

          // SUDAH TIBA DI MALL
          <>
            <Text style={styles.sectionTitle}>
              Parkir Aktif
            </Text>

            {/* STATUS */}
            <View style={styles.statusRow}>
              <View style={styles.greenDot}/>
              <Text style={styles.greenText}>
                Parkir sedang berlangsung
              </Text>
            </View>

            {/* 👇 PERBAIKAN 2: Mengubah kartu Parkir Aktif agar bisa diklik seutuhnya */}
            <TouchableOpacity 
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push('/user/KonfirmasiSelesaiParkir')}
            >
              <View style={styles.mallRow}>
                <View style={styles.mallInfo}>
                  <View style={styles.parkingIcon}>
                    <Ionicons
                      name="car-outline"
                      size={26}
                      color="#111"
                    />
                  </View>
                  <View>
                    <Text style={styles.mallName}>
                      Mall Ratu Indah
                    </Text>
                    <Text style={styles.location}>
                      Ground Floor - Area A
                    </Text>
                  </View>
                </View>

                {/* Indikator Panah */}
                <View>
                  <Ionicons
                    name='chevron-forward-outline'
                    size={24}
                    color="#1565C0"
                  />
                </View>
              </View>

              {/* DETAIL */}
              <View style={styles.detailRow}>
                {/* SLOT */}
                <View style={styles.detailItem}>
                  <Text style={styles.detailTitle}>
                    Slot Parkir
                  </Text>
                  <Text style={styles.bigText}>
                    C4
                  </Text>
                  <Text style={styles.smallText}>
                    Ground Floor - Area A
                  </Text>
                </View>

                <View style={styles.verticalLine} />
                
                {/* PARKING */}
                <View style={styles.detailItem}>
                  <Text style={styles.detailTitle}>
                    Parkir Berjalan
                  </Text>
                  <Text style={styles.runningText}>
                    🟢 {runningParkingTime}
                  </Text>
                  <Text style={styles.smallText}>
                    Sejak 10 Mei 2024, 12:15
                  </Text>
                </View>

                <View style={styles.verticalLine} />
                
                {/* PLATE */}
                <View style={styles.detailItem}>
                  <Text style={styles.detailTitle}>
                    Plat Kendaraan 
                  </Text>
                  <Text style={styles.plate}>
                    DD 1234 TNF
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  )
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
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.12)',
  },
  activeBannerLeft: {
    flex: 1,
  },
  activeBannerTitle: {
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
    fontSize: 14,
  },
  activeBannerDesc: {
    color: '#2E7D32',
    opacity: 0.9,
    fontSize: 12,
  },
  activeBannerRight: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDurationBox: {
  },
  activeDurationLabel: {
    color: '#2E7D32',
    fontSize: 11,
    marginBottom: 4,
    opacity: 0.9,
  },
  activeDurationText: {
    color: '#2E7D32',
    fontWeight: '800',
    fontSize: 16,
  },
});