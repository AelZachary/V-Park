import ActivityTabs from '@/components/navigation/ActivityTabs';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ActivityScreen(){
  const [timeLeft, setTimeLeft] = useState(1800);

  // STATE KETIKA SUDAH TIBA
  const params = useLocalSearchParams();
  const [isArrived, setIsArrived] = useState(
    params.arrived == 'true'
  )
  const [parkingDuration, setParkingDuration] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // TIMER PARKIR BERJALAN 
  useEffect(() => {
    if (!isArrived) return;

    const parkingTimer = setInterval(() => {
      setParkingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(parkingTimer);
  }, [isArrived]);

  // FORMAT TIMER COUNTDOWN 
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

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
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Activity</Text>
      </View>

      {/* TAB */}
      <ActivityTabs active="aktif"/>

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

          {/* STATUS */}
          <View style={styles.statusRow}>
            <View style={styles.yellowDot}/>

            <Text style={styles.statusText}>
              Menunggu Kedatangan Anda di Mall
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
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
                    Basement
                  </Text>
                </View>
              </View>

              {/* ARROW */}
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => 
                  router.push('/user/konfirmasiKedatangan')
                } activeOpacity={0.7}
              >
                <Ionicons
                  name='chevron-forward-outline'
                  size={24}
                  color="#1565C0"
                />
              </TouchableOpacity>
            </View>

            {/* DETAIL */}
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>
                  Slot Parkir
                </Text>

                <Text style={styles.bigText}>
                  C4
                </Text>

                <Text style={styles.smallText}>
                  Basement
                </Text>
              </View>

              <View style={styles.verticalLine}/>
              {/* TIME */}
              <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>
                  Dipesan
                </Text>

                <Text style={styles.timeText}>
                  ⏰ 12 Menit yang lalu
                </Text>

                <Text style={styles.smallText}>
                  Basement
                </Text>
              </View>

              <View style={styles.verticalLine}/>
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

            {/* WARNING */}
            <View style={styles.warningBox}>
              <View style={{ flex: 1}}>
                <Text style={styles.warningTitle}>
                  Slot Anda sedang ditahan
                </Text>

                <Text style={styles.warningDesc}>
                  Silahkan tiba di Mall sebelum waktu habis
                </Text>
              </View>

              <View style={styles.timerBox}>
                <Text style={styles.timerLabel}>
                  Sisa Waktu
                </Text>

                <Text style={styles.timer}>
                  {formattedTime}
                </Text>
              </View>
            </View>
          </View>
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

          {/* MAIN CARD */}
          <View style={styles.card}>
            {/* KIRI */}
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
                    Basement
                  </Text>
                </View>
              </View>

              {/* KANAN */}
              <TouchableOpacity
                onPress={() =>
                  router.push('/user/KonfirmasiSelesaiParkir')
                }
              >
                <Ionicons
                  name='chevron-forward-outline'
                  size={24}
                  color="#1565C0"
                />
              </TouchableOpacity>
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
                  Basement
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
          </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
     backgroundColor: '#EEF4FA',
     paddingTop: 50, 
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

  runningText: {
    fontWeight: '800',
    color: '#111',
    fontSize: 15,
  },
});