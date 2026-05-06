import ActivityTabs from '@/components/navigation/ActivityTabs';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ActivityScreen() {

  const [timeLeft, setTimeLeft] = useState(1800);
  const [activeTab, setActiveTab] = useState('Aktif');

  // 🔥 STATE KETIKA SUDAH TIBA
  const [isArrived, setIsArrived] = useState(false);
  const [parkingDuration, setParkingDuration] = useState(0);

  useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  /* TIMER PARKIR BERJALAN */
  useEffect(() => {

    if (!isArrived) return;

    const parkingTimer = setInterval(() => {
      setParkingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(parkingTimer);

  }, [isArrived]);

  /* Format Timer Countdown */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  /* FORMAT TIMER PARKIR BERJALAN */
  const parkingHours = Math.floor(parkingDuration / 3600);

  const parkingMinutes = Math.floor((parkingDuration % 3600) / 60);

  const parkingSeconds = parkingDuration % 60;

  const runningParkingTime =
    `${String(parkingHours).padStart(2, '0')}:` +
    `${String(parkingMinutes).padStart(2, '0')}:` +
    `${String(parkingSeconds).padStart(2, '0')}`;

  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Activity
        </Text>

      </View>

      {/* TAB */}
      <ActivityTabs active="aktif" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
>
    
        {/* SEBELUM TIBA */}

        {!isArrived ? (

        <>

        <Text style={styles.sectionTitle}>
            Booking Aktif
        </Text>

        {/* STATUS */}
        <View style={styles.statusRow}>

            <View style={styles.yellowDot} />

            <Text style={styles.statusText}>
            Menunggu kedatangan Anda di mall
            </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

            {/* TOP */}
            <View style={styles.mallRow}>

            <View style={styles.parkingIcon}>
                <Ionicons
                name="car-outline"
                size={26}
                color="#111"
                />
            </View>

            <View>

                <Text style={styles.mallName}>
                Trans Studio Mall Makassar
                </Text>

                <Text style={styles.location}>
                Basement
                </Text>

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
                Basement
                </Text>

            </View>

            <View style={styles.verticalLine} />

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

            {/* WARNING */}
            <View style={styles.warningBox}>

            <View style={{ flex: 1 }}>

                <Text style={styles.warningTitle}>
                Slot Anda sedang ditahan
                </Text>

                <Text style={styles.warningDesc}>
                Silahkan tiba di mall sebelum waktu habis
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

        {/* INFO */}
        <View style={styles.infoBox}>

            <Ionicons
            name="shield-checkmark-outline"
            size={26}
            color="#1565C0"
            />

            <Text style={styles.infoText}>
            Silahkan konfirmasi kedatangan Anda saat{"\n"}
            sudah tiba di mall untuk mengaktifkan parkir.
            </Text>

        </View>

        {/* CONFIRM */}
        <View style={styles.confirmCard}>

            <Text style={styles.confirmTitle}>
            Konfirmasi Kedatangan
            </Text>

            <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => setIsArrived(true)}
            >

            <Ionicons
                name="location-outline"
                size={22}
                color="#fff"
            />

            <Text style={styles.confirmText}>
                Ya, Saya sudah Tiba di Mall
            </Text>

            </TouchableOpacity>

        </View>

        {/* ACTION */}
        <View style={styles.actionCard}>

            <Text style={styles.actionTitle}>
            Yang Bisa Anda Lakukan
            </Text>

            <View style={styles.actionRow}>

            {/* CANCEL */}
            <TouchableOpacity 
              style={styles.actionBtn} 
              onPress={() => setShowCancelModal(true)}
            >

                <Ionicons
                name="close-circle-outline"
                size={38}
                color="#FF5C46"
                />

                <Text style={styles.actionBtnTitle}>
                Batalkan Booking
                </Text>

                <Text style={styles.actionBtnDesc}>
                Batalkan pesanan
                </Text>

            </TouchableOpacity>

            {/* HELP */}
            <TouchableOpacity style={styles.actionBtn}>

                <Ionicons
                name="headset-outline"
                size={38}
                color="#1E2A4A"
                />

                <Text style={styles.actionBtnTitle}>
                Butuh Bantuan?
                </Text>

                <Text style={styles.actionBtnDesc}>
                Hubungi CS
                </Text>

            </TouchableOpacity>

            </View>

        </View>

        </>

        ) : (

        // SUDAH TIBA DI MALL

        <>
        {/* TITLE */}
        <Text style={styles.sectionTitle}>
            Parkir Aktif
        </Text>

        {/* STATUS */}
        <View style={styles.statusRow}>

            <View style={styles.greenDot} />

            <Text style={styles.greenText}>
            Parkir sedang berlangsung
            </Text>

        </View>

        {/* MAIN CARD */}
        <View style={styles.card}>

            {/* TOP */}
            <View style={styles.mallRow}>

            <View style={styles.parkingIcon}>
                <Ionicons
                name="car-outline"
                size={26}
                color="#111"
                />
            </View>

            <View>

                <Text style={styles.mallName}>
                Trans Studio Mall Makassar
                </Text>

                <Text style={styles.location}>
                Basement
                </Text>

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

        {/* RINGKASAN */}
        <View style={styles.summaryCard}>

            <Text style={styles.summaryTitle}>
            Ringkasan Parkir
            </Text>

            {/* ITEM */}
            <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
                Mulai Parkir
            </Text>

            <Text style={styles.summaryValue}>
                10 Mei 2024, 12:15
            </Text>

            </View>

            <View style={styles.summaryDivider} />

            {/* ITEM */}
            <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
                Durasi Parkir
            </Text>

            <Text style={styles.summaryValue}>
                {runningParkingTime}
            </Text>

            </View>

            <View style={styles.summaryDivider} />

            {/* ITEM */}
            <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>
                Plat Kendaraan
            </Text>

            <Text style={styles.summaryValue}>
                DD 1234 TNF
            </Text>

            </View>

            <View style={styles.dashedLine} />

            {/* ESTIMASI */}
            <View style={styles.priceRow}>

            <View>

                <Text style={styles.priceTitle}>
                Estimasi Biaya
                </Text>

                <Text style={styles.priceDesc}>
                Biaya dapat berubah sesuai durasi parkir aktual
                </Text>

            </View>

            <Text style={styles.priceValue}>
                Rp 20.000
            </Text>

            </View>

        </View>

        {/* GREEN INFO */}
        <View style={styles.activeInfoBox}>

            <Ionicons
            name="shield-checkmark-outline"
            size={26}
            color="#79C57A"
            />

            <Text style={styles.activeInfoText}>
            Parkiran Anda sedang aktif. Silahkan konfirmasi
            kepulangan Anda jika sudah selesai.
            </Text>

        </View>

        {/* CONFIRM */}
        <View style={styles.confirmCard}>

            <Text style={styles.confirmTitle}>
            Konfirmasi Kepulangan
            </Text>

            <TouchableOpacity style={styles.confirmBtn}>

            <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#fff"
            />

            <Text style={styles.confirmText}>
                Konfirmasi Selesai Parkir
            </Text>

            </TouchableOpacity>

        </View>
        </>
        )}

      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNavbar active="activity" />

      {showCancelModal && (
        <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
                Apakah kamu yakin{"\n"}
                ingin membatalkan booking?
            </Text>

            <View style={styles.modalButtonRow}>

                {/* YES */}
                <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                    setShowCancelModal(false);

                    // 🔥 nanti bisa tambah logic:
                    // setIsArrived(false);
                    // router.push('/user/activityCancelled');
                }}
                >
                <Text style={styles.modalBtnText}>Ya</Text>
                </TouchableOpacity>

                {/* NO */}
                <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowCancelModal(false)}
                >
                <Text style={styles.modalBtnText}>Tidak</Text>
                </TouchableOpacity>

            </View>

            </View>
        </View>
    )}

      

    </View>
  );
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

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 6,
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
    backgroundColor: '#F5C542',
    marginRight: 10,
  },

  statusText: {
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
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  location: {
    marginTop: 3,
    color: '#333',
    fontSize: 16,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  detailItem: {
    flex: 1,
  },

  verticalLine: {
    width: 1,
    height: 70,
    backgroundColor: '#1565C0',
    marginHorizontal: 15,
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

  infoBox: {
    backgroundColor: '#DDEEFF',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  infoText: {
    color: '#1565C0',
    fontWeight: '700',
    lineHeight: 22,
  },

  confirmCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 20,
    padding: 18,
  },

  confirmTitle: {
    color: '#1565C0',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 18,
  },

  confirmBtn: {
    backgroundColor: '#1565C0',
    borderRadius: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },

  /* ACTION */
  actionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 20,
    padding: 18,
  },

  actionTitle: {
    color: '#1565C0',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 18,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionBtn: {
    width: '47%',
    borderWidth: 1,
    borderColor: '#B9D7FF',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },

  actionBtnTitle: {
    marginTop: 10,
    color: '#1565C0',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  actionBtnDesc: {
    marginTop: 4,
    color: '#222',
  },


  /* SUCCESS */
  successCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
  },

  checkCircle: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '800',
    color: '#1565C0',
  },

  successDesc: {
    marginTop: 8,
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },

  arrivalInfoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 120,
  },

  infoSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1565C0',
    marginBottom: 15,
  },

  arrivalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },

  arrivalLabel: {
    color: '#666',
  },

  arrivalValue: {
    fontWeight: '700',
    color: '#111',
  },

  statusBadge: {
    backgroundColor: '#DDF7E7',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
  },

  statusBadgeText: {
    color: '#2ECC71',
    fontWeight: '700',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,

    flexDirection: 'row',
    backgroundColor: '#D9ECFF',
    borderRadius: 40,
    padding: 6,
    alignItems: 'center',
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

/* SUMMARY */
summaryCard: {
  backgroundColor: '#fff',
  marginHorizontal: 20,
  marginTop: 15,
  borderRadius: 22,
  padding: 18,

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 4,
},

summaryTitle: {
  color: '#1565C0',
  fontWeight: '800',
  fontSize: 18,
  marginBottom: 18,
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

summaryLabel: {
  color: '#1565C0',
  fontWeight: '700',
  fontSize: 16,
},

summaryValue: {
  color: '#111',
  fontSize: 16,
},

summaryDivider: {
  height: 1,
  backgroundColor: '#E5E5E5',
  marginVertical: 14,
},

dashedLine: {
  borderStyle: 'dashed',
  borderWidth: 1,
  borderColor: '#D9D9D9',
  marginVertical: 16,
},

priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

priceTitle: {
  color: '#1565C0',
  fontWeight: '800',
  fontSize: 18,
},

priceDesc: {
  marginTop: 4,
  color: '#444',
  width: 220,
},

priceValue: {
  fontSize: 18,
  fontWeight: '800',
  color: '#111',
},

/* GREEN BOX */
activeInfoBox: {
  backgroundColor: '#EAF7EA',
  marginHorizontal: 20,
  marginTop: 15,
  borderRadius: 18,
  padding: 18,

  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,

  borderWidth: 1,
  borderColor: '#B9E2BA',
},

activeInfoText: {
  color: '#79C57A',
  fontWeight: '700',
  lineHeight: 22,
  flex: 1,
},

modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalBox: {
  width: 280,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
},

modalTitle: {
  fontSize: 16,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 20,
},

modalButtonRow: {
  flexDirection: 'row',
  gap: 10,
},

modalBtn: {
  flex: 1,
  backgroundColor: '#1565C0',
  paddingVertical: 10,
  borderRadius: 12,
  alignItems: 'center',
},

modalBtnText: {
  color: '#fff',
  fontWeight: '700',
},
});