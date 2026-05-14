import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonPrimary from '@/components/common/ButtonPrimary';
import ButtonSecondary from '@/components/common/ButtonSecondary';

const INITIAL_SECONDS = 0 * 3600 + 0 * 60 + 0;

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

export default function KonfirmasiSelesaiParkir() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(INITIAL_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const { hours, minutes, seconds } = formatTime(elapsed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1565C0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi Selesai Parkir</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Durasi Parkir</Text>
          <View style={styles.activeRow}>
            <View style={styles.greenDot} />
            <Text style={styles.activeText}>Parkir sedang berlangsung</Text>
          </View>
          <View style={styles.timerRow}>
            <Text style={styles.timerText}>
              {hours}:{minutes}:{seconds}
            </Text>
          </View>
          <View style={styles.timerLabels}>
            <Text style={styles.timerLabel}>Jam</Text>
            <Text style={[styles.timerLabel, styles.timerLabelMenit]}>Menit</Text>
            <Text style={[styles.timerLabel, styles.timerLabelDetik]}>Detik</Text>
          </View>
          <Text style={[styles.activeText, { marginTop: 6 }]}>Parkir sedang berlangsung</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.locationHeader}>
            <View style={styles.parkingIconBox}>
              <MaterialCommunityIcons name="parking" size={18} color="#141B34" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.mallName}>Trans Studio Mall Makassar</Text>
              <Text style={styles.locationSub}>Basement</Text>
            </View>
          </View>
          <View style={styles.slotDivider} />
          <View style={styles.slotRow}>
            <View style={styles.slotBlock}>
              <Text style={styles.slotLabel}>Slot Parkir</Text>
              <Text style={styles.slotValue}>C4</Text>
              <Text style={styles.slotSub}>Basement</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.slotBlock}>
              <Text style={styles.slotLabel}>Plat Kendaraan</Text>
              <Text style={styles.platValue}>DD 1234 TNF</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Rincian Biaya</Text>
          <View style={styles.biayaRow}>
            <Text style={styles.biayaLabel}>Biaya Layanan</Text>
            <Text style={styles.biayaValue}>Rp 15.000</Text>
          </View>
          <View style={styles.solidDivider} />
          <View style={styles.biayaRow}>
            <Text style={styles.biayaLabel}>Pajak</Text>
            <Text style={styles.biayaValue}>Rp 5.000</Text>
          </View>
          <View style={styles.dashedDivider} />
          <View style={styles.biayaRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp 20.000</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.methodHeader}>
            <MaterialCommunityIcons name="credit-card-outline" size={20} color="#000" />
            <Text style={styles.sectionHeading}>Metode Pembayaran</Text>
          </View>
          <View style={styles.qrisCard}>
            <View style={styles.qrisIconBox}>
              <MaterialCommunityIcons name="qrcode-scan" size={28} color="#1565C0" />
            </View>
            <View style={styles.qrisInfo}>
              <Text style={styles.qrisTitle}>QRIS</Text>
              <Text style={styles.qrisSub}>
                Satu QR untuk semua e-wallet
                dan mobile banking
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.alertBanner}>
          <MaterialCommunityIcons name="shield-check-outline" size={24} color="#81C784" />
          <Text style={styles.alertText}>
            Parkiran Anda sedang aktif. Silahkan konfirmasi kepulangan Anda jika sudah selesai.
          </Text>
        </View>

        <ButtonPrimary
          title="Konfirmasi Selesai Parkir"
          icon={<Ionicons name="checkmark-circle-outline" size={22} color="#fff" />}
          onPress={() => router.push('/user/payment')}
        />

        <ButtonSecondary
          title="Belum, Nanti Saja"
          onPress={() => router.push('/user/home')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backBtn: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#1565C0',
  },
  headerSpacer: {
    width: 35,
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 12,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#81C784',
    marginRight: 6,
  },
  activeText: {
    fontSize: 12,
    color: '#1E88E5',
    fontWeight: '400',
  },
  timerRow: {
    marginTop: 4,
  },
  timerText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.4,
  },
  timerLabels: {
    flexDirection: 'row',
    marginTop: 2,
  },
  timerLabel: {
    fontSize: 12,
    color: '#000',
    width: 46,
  },
  timerLabelMenit: {
    width: 60,
  },
  timerLabelDetik: {
    width: 40,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  parkingIconBox: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#CCE9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  locationInfo: {
    flex: 1,
  },
  mallName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1565C0',
  },
  locationSub: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  slotDivider: {
    height: 1,
    backgroundColor: 'rgba(21,101,192,0.2)',
    marginBottom: 10,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 38,
  },
  slotBlock: {
    flex: 1,
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1565C0',
  },
  slotValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 2,
  },
  slotSub: {
    fontSize: 12,
    color: '#000',
  },
  platValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    height: 58,
    backgroundColor: 'rgba(21,101,192,0.5)',
    marginHorizontal: 16,
    alignSelf: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 10,
  },
  biayaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  biayaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1565C0',
  },
  biayaValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  solidDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 2,
  },
  dashedDivider: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1565C0',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  qrisCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: 'rgba(30,136,229,0.2)',
    borderRadius: 10,
    padding: 12,
    gap: 12,
  },
  qrisIconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrisInfo: {
    flex: 1,
  },
  qrisTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  qrisSub: {
    fontSize: 12,
    color: '#000',
    lineHeight: 18,
    marginTop: 2,
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 16,
    gap: 10,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(129,199,132,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(129,199,132,0.5)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#81C784',
    lineHeight: 18,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1565C0',
    borderRadius: 20,
    height: 48,
    gap: 8,
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1565C0',
    borderRadius: 20,
    height: 48,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1565C0',
  },
});
