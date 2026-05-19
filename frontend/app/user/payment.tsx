import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PAYMENT_LOGOS = {
  ovo: require('../../assets/images/payment/ovo.jpeg'),
  gopay: require('../../assets/images/payment/gopay.jpeg'),
  dana: require('../../assets/images/payment/dana.jpeg'),
  shopeepay: require('../../assets/images/payment/shopee.jpeg'),
  bca: require('../../assets/images/payment/bca.jpeg'),
  bni: require('../../assets/images/payment/bni.jpeg'),
};

const QR_IMAGE = require('../../assets/images/payment/qr.jpeg');
const QRIS_LOGO = require('../../assets/images/payment/qris.jpeg');

const PAYMENT_METHODS = [
  { key: 'ovo', logo: PAYMENT_LOGOS.ovo, label: 'OVO', wide: false },
  { key: 'gopay', logo: PAYMENT_LOGOS.gopay, label: 'Gopay', wide: false },
  { key: 'dana', logo: PAYMENT_LOGOS.dana, label: 'Dana', wide: false },
  { key: 'shopeepay', logo: PAYMENT_LOGOS.shopeepay, label: 'ShopeePay', wide: false },
  { key: 'bca', logo: PAYMENT_LOGOS.bca, label: 'BCA Mobile', wide: true },
  { key: 'bni', logo: PAYMENT_LOGOS.bni, label: 'BNI Mobile', wide: true },
];

const HOW_TO_STEPS = [
  {
    key: '1',
    icon: 'phone-portrait-outline' as const,
    label: 'Buka aplikasi e-wallet atau mobile banking',
  },
  {
    key: '2',
    icon: 'qr-code-outline' as const,
    label: 'Pilih menu Scan QRIS',
  },
  {
    key: '3',
    icon: 'checkmark-circle-outline' as const,
    label: 'Scan QR Code di atas',
  },
  {
    key: '4',
    icon: 'wallet-outline' as const,
    label: 'Konfirmasi nominal dan selesaikan pembayaran',
  },
];

const PAYMENT_COUNTDOWN_SECONDS = 10 * 60;

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function PembayaranQris() {
  const [detailExpanded, setDetailExpanded] = useState(true);
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [countdown, setCountdown] = useState(PAYMENT_COUNTDOWN_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { minutes, seconds } = formatCountdown(countdown);

  const handleBack = () => {
    router.back();
  };

  const handleRefreshQr = () => {
    // Refresh QR logic
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="#1565C0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pembayaran QRIS</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Selesaikan pembayaran untuk mengamankan slot parkir Anda.
        </Text>

        {/* Countdown Timer Card */}
        <View style={styles.timerCard}>
          <View style={styles.timerLeft}>
            <Ionicons name="time-outline" size={36} color="#FEAB42" />
            <View style={styles.timerTextBlock}>
              <Text style={styles.timerLabel}>Selesaikan pembayaran dalam</Text>
              <Text style={styles.timerValue}>{minutes}:{seconds}</Text>
            </View>
          </View>
          <Text style={styles.timerWarning}>
            Booking akan dibatalkan jika waktu habis
          </Text>
        </View>

        {/* Total Payment Card */}
        <View style={styles.card}>
          <View style={styles.paymentHeaderRow}>
            <View>
              <Text style={styles.paymentLabel}>Total Pembayaran</Text>
              <Text style={styles.paymentAmount}>Rp 20.000</Text>
            </View>
            <TouchableOpacity
              style={styles.detailToggle}
              onPress={() => setDetailExpanded(!detailExpanded)}
            >
              <Text style={styles.detailToggleText}>Lihat Detail</Text>
              <Ionicons
                name={detailExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#1565C0"
              />
            </TouchableOpacity>
          </View>

          {detailExpanded && (
            <>
              <View style={styles.dashedDivider} />
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Biaya Layanan</Text>
                <Text style={styles.feeValue}>Rp 15.000</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Pajak</Text>
                <Text style={styles.feeValue}>Rp 5.000</Text>
              </View>
            </>
          )}
        </View>

        {/* QR Code Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Scan QR untuk Membayar</Text>

          <TouchableOpacity 
            style={styles.qrWrapper}
            onPress={() => router.push('/user/paymentProcessing')}
          >
            <Image source={QR_IMAGE} style={styles.qrImage} resizeMode="contain" />
          </TouchableOpacity>

          <View style={styles.qrisLabelRow}>
            <Image source={QRIS_LOGO} style={styles.qrisLogo} resizeMode="contain" />
            <Text style={styles.qrisLabelText}>
              QR Code Standar{'\n'}Pembayaran Nasional
            </Text>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentMethodsBox}>
            <Text style={styles.paymentMethodsTitle}>Bisa dibayar dengan :</Text>
            <View style={styles.paymentMethodsRow}>
              {PAYMENT_METHODS.map((method) => (
                <View key={method.key} style={styles.paymentMethodItem}>
                  <Image
                    source={method.logo}
                    style={[
                      styles.paymentLogo,
                      method.wide && styles.paymentLogoWide,
                      method.key === 'ovo' && styles.paymentLogoOvo,
                    ]}
                    resizeMode="contain"
                  />
                  <Text style={styles.paymentMethodLabel}>{method.label}</Text>
                </View>
              ))}
              <View style={styles.paymentMethodItem}>
                <Text style={styles.andMoreText}>dan{'\n'}lainnya</Text>
              </View>
            </View>
          </View>
        </View>

        {/* How to Pay Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.howToHeader}
            onPress={() => setStepsExpanded(!stepsExpanded)}
          >
            <Text style={styles.cardTitle}>Cara Pembayaran</Text>
            <Ionicons
              name={stepsExpanded ? 'chevron-up' : 'chevron-down'}
              size={22}
              color="#1565C0"
            />
          </TouchableOpacity>

          {stepsExpanded && (
            <View style={styles.stepsRow}>
              {HOW_TO_STEPS.map((step, index) => (
                <View key={step.key} style={styles.stepItem}>
                  <View style={styles.stepIconBox}>
                    <Ionicons name={step.icon} size={18} color="#141B34" />
                  </View>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#81C784" />
          <Text style={styles.securityText}>
            Pembayaran aman, terenkripsi dan terverifikasi
          </Text>
        </View>

        {/* Refresh QR Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefreshQr}>
          <Ionicons name="refresh-outline" size={20} color="#1565C0" />
          <Text style={styles.refreshButtonText}>Refresh QR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 17,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  backButton: {
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

  // Subtitle
  subtitle: {
    fontWeight: '400',
    fontSize: 11,
    color: '#1E88E5',
    lineHeight: 14,
    marginBottom: 10,
  },

  // Timer Card
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(254,247,234,0.5)',
    backgroundColor: '#FEF7EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerTextBlock: {
    marginLeft: 6,
  },
  timerLabel: {
    fontWeight: '400',
    fontSize: 10,
    color: '#9D6C23',
    lineHeight: 14,
  },
  timerValue: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FEAB42',
    lineHeight: 22,
  },
  timerWarning: {
    fontWeight: '400',
    fontSize: 10,
    color: '#9D6C23',
    lineHeight: 14,
    textAlign: 'right',
    maxWidth: 120,
  },

  // Shared Card
  card: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
  },

  // Payment Total
  paymentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  paymentAmount: {
    fontWeight: '700',
    fontSize: 28,
    color: '#000',
    lineHeight: 44,
    letterSpacing: 0.28,
  },
  detailToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailToggleText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  dashedDivider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    marginVertical: 8,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  feeLabel: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  feeValue: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
  },

  // QR Code
  qrWrapper: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImage: {
    width: 150,
    height: 140,
  },
  qrisLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  qrisLogo: {
    width: 41,
    height: 15,
  },
  qrisLabelText: {
    fontWeight: '500',
    fontSize: 10,
    color: '#000',
    lineHeight: 15,
  },

  // Payment Methods Box
  paymentMethodsBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: 'rgba(30,136,229,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  paymentMethodsTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
    marginBottom: 1,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: 2,
  },
  paymentMethodItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 48,
    paddingVertical: 0,
  },
  paymentLogo: {
    width: 24,
    height: 18,
  },
  paymentLogoWide: {
    width: 42,
    height: 18,
  },
  paymentLogoOvo: {
    width: 34,
    height: 22,
  },
  paymentMethodLabel: {
    fontWeight: '500',
    fontSize: 7,
    color: '#000',
    textAlign: 'center',
    marginTop: 1,
  },
  andMoreText: {
    fontWeight: '500',
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 4,
  },

  // How to Pays
  howToHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  stepIconBox: {
    width: 26,
    height: 26,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: 'rgba(30,136,229,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontWeight: '700',
    fontSize: 8,
    color: '#000',
    marginTop: 2,
  },
  stepLabel: {
    fontWeight: '400',
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 2,
  },

  // Security Badge
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(129,199,132,0.5)',
    backgroundColor: 'rgba(129,199,132,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
  },
  securityText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#81C784',
    lineHeight: 14,
  },

  // Refresh Button
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1565C0',
    backgroundColor: '#FFF',
    paddingVertical: 5,
    marginHorizontal: 32,
    gap: 6,
  },
  refreshButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 22,
  },
});