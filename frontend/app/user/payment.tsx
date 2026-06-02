import { COLORS } from '@/constants/theme';
import { getPembayaranByBooking, initiatePembayaran, type PembayaranByBookingResponse } from '@/fetching/services/pembayaranService';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // 🌟 FIKS 1: Import library QR Code pesanan dosen

const PAYMENT_LOGOS = {
  ovo: require('../../assets/images/payment/ovo.jpeg'),
  gopay: require('../../assets/images/payment/gopay.jpeg'),
  dana: require('../../assets/images/payment/dana.jpeg'),
  shopeepay: require('../../assets/images/payment/shopee.jpeg'),
  bca: require('../../assets/images/payment/bca.jpeg'),
  bni: require('../../assets/images/payment/bni.jpeg'),
};

// 🌟 Hapus QR_IMAGE statis lama karena sudah diganti QR otomatis

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
  const params = useLocalSearchParams<{ bookingID?: string; slot?: string; floor?: string; arrivedAt?: string; mallId?: string; bookingName?: string; phone?: string; vehicleType?: string; platNumber?: string; bookingTimeIso?: string }>();
  const bookingID = Number(params.bookingID);
  const [detailExpanded, setDetailExpanded] = useState(true);
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [countdown, setCountdown] = useState(PAYMENT_COUNTDOWN_SECONDS);
  const [paymentInfo, setPaymentInfo] = useState<PembayaranByBookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [qrPayload, setQrPayload] = useState<string>(() =>
    JSON.stringify({
      bookingID: Number.isFinite(bookingID) ? bookingID : 0,
      amount: 20000,
      slot: params.slot || 'Unknown',
      floor: params.floor || 'Unknown',
      createdAt: new Date().toISOString(),
    }),
  );

  const paymentAmount = paymentInfo?.Pembayaran.TotalPembayaran ?? 20000;
  const paymentStatus = paymentInfo?.Pembayaran.StatusPembayaran ?? 'MemprosesPembayaran';
  const expiresIn = paymentInfo?.MetodePembayaran.ExpiresIn ?? countdown;
  const qrisValue = paymentInfo?.MetodePembayaran?.QRCodeBase64?.trim()
    ? paymentInfo.MetodePembayaran.QRCodeBase64
    : qrPayload;

  function base64Encode(value: string) {
    if (typeof globalThis.btoa === 'function') {
      return globalThis.btoa(value);
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = value;
    let output = '';
    let i = 0;

    while (i < str.length) {
      const chr1 = str.charCodeAt(i++);
      const chr2 = str.charCodeAt(i++);
      const chr3 = str.charCodeAt(i++);

      const enc1 = chr1 >> 2;
      const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      const enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      const enc4 = chr3 & 63;

      if (Number.isNaN(chr2)) {
        output += chars.charAt(enc1) + chars.charAt(enc2) + '==';
      } else if (Number.isNaN(chr3)) {
        output += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + '=';
      } else {
        output +=
          chars.charAt(enc1) +
          chars.charAt(enc2) +
          chars.charAt(enc3) +
          chars.charAt(enc4);
      }
    }

    return output;
  }

  const buildQrPayload = useCallback(() => {
    return JSON.stringify({
      bookingID: Number.isFinite(bookingID) ? bookingID : 0,
      amount: paymentAmount,
      slot: params.slot || 'Unknown',
      floor: params.floor || 'Unknown',
      generatedAt: new Date().toISOString(),
    });
  }, [bookingID, paymentAmount, params.floor, params.slot]);

  const createPayment = useCallback(async () => {
    if (!Number.isFinite(bookingID) || bookingID <= 0) {
      setPaymentError('Booking ID tidak valid.');
      setIsLoading(false);
      return;
    }

    setIsSubmitting(true);
    setPaymentError(null);

    const payload = buildQrPayload();
    setQrPayload(payload);

    try {
      const response = await initiatePembayaran(bookingID, 'QRIS', base64Encode(payload));
      setPaymentInfo(response);
      setPaymentError(null);
      setQrPayload(response.MetodePembayaran.QRCodeBase64 || payload);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Gagal memulai pembayaran.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  }, [bookingID, buildQrPayload]);

  const refreshPaymentInfo = useCallback(async () => {
    if (!Number.isFinite(bookingID) || bookingID <= 0) {
      setPaymentError('Booking ID tidak valid.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const info = await getPembayaranByBooking(bookingID);
      setPaymentInfo(info);
      setPaymentError(null);
      setQrPayload(info.MetodePembayaran.QRCodeBase64 || buildQrPayload());
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        await createPayment();
        return;
      }
      setPaymentError(error instanceof Error ? error.message : 'Gagal memuat informasi pembayaran.');
    } finally {
      setIsLoading(false);
    }
  }, [bookingID, buildQrPayload, createPayment]);

  useEffect(() => {
    if (!Number.isFinite(bookingID) || bookingID <= 0) {
      setPaymentError('Booking ID tidak ditemukan.');
      setIsLoading(false);
      return;
    }

    refreshPaymentInfo();
  }, [bookingID, refreshPaymentInfo]);

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
    router.replace('/user/home');
  };

  return (
    <View style={styles.container}>
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

        {paymentError ? (
          <Text style={styles.errorText}>{paymentError}</Text>
        ) : null}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#1565C0" />
            <Text style={styles.loadingText}>Memuat informasi pembayaran...</Text>
          </View>
        ) : null}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Countdown Timer Card */}
        <View style={styles.timerCard}>
          <View style={styles.timerLeft}>
            <Ionicons name="time-outline" size={36} color="#FEAB42" />
            <View style={styles.timerTextBlock}>
              <Text style={styles.timerLabel}>Masa berlaku QR Pembayaran</Text>
              <Text style={styles.timerValue}>{minutes}:{seconds}</Text>
            </View>
          </View>
        </View>

        {/* Total Payment Card */}
        <View style={styles.card}>
          <View style={styles.paymentHeaderRow}>
            <View>
              <Text style={styles.paymentLabel}>Total Pembayaran</Text>
              <Text style={styles.paymentAmount}>Rp {paymentAmount.toLocaleString('id-ID')}</Text>
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

          {/* 🌟 FIKS 4: Ganti Image statis menjadi komponen QRCode dinamis library */}
          <TouchableOpacity 
            style={styles.qrWrapper}
            onPress={() => router.replace({
              pathname: '/user/paymentProcessing',
              params: {
                bookingID: params.bookingID || '',
                slot: params.slot || '',
                floor: params.floor || '',
                arrivedAt: params.arrivedAt || '',
                mallId: params.mallId || '',
                bookingName: params.bookingName || '',
                phone: params.phone || '',
                vehicleType: params.vehicleType || '',
                platNumber: params.platNumber || '',
                bookingTimeIso: params.bookingTimeIso || '',
              },
            })}
            activeOpacity={0.9}
          >
            {qrisValue ? (
              <QRCode
                value={qrisValue}
                size={140}
                backgroundColor="#FFF"
                color="#000"
              />
            ) : (
              <Text style={styles.qrPlaceholderText}>QR belum tersedia, silakan refresh pembayaran.</Text>
            )}
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.paymentMethodsRow}
            >
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
            </ScrollView>
          </View>
          <Text style={styles.expiryText}>Masa berlaku QR: {expiresIn > 0 ? `${expiresIn} detik` : 'Kadaluarsa'}</Text>
          <Text style={styles.paymentStatusNote}>Metode: {paymentInfo?.MetodePembayaran?.MetodePembayaran ?? 'QRIS'}</Text>
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
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.alertBanner}>
          <MaterialCommunityIcons name="shield-check-outline" size={24} color="#81C784" />
          <Text style={styles.alertText}>
            Pembayaran aman, terenkripsi dan terverifikasi.
          </Text>
        </View>

        {/* Refresh QR Button */}
        <TouchableOpacity
          style={[styles.refreshButton, isSubmitting && styles.refreshButtonDisabled]}
          onPress={createPayment}
          disabled={isSubmitting}
        >
          <Ionicons name="refresh-outline" size={20} color="#1565C0" />
          <Text style={styles.refreshButtonText}>{isSubmitting ? 'Memperbarui...' : 'Refresh QR'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 8,
  },
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
  subtitle: {
    fontWeight: '400',
    fontSize: 11,
    color: '#1E88E5',
    lineHeight: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
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
    marginTop: 1, 
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
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    color: '#9D6C23',
    lineHeight: 14,
  },
  timerValue: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    color: '#FEAB42',
    lineHeight: 22,
  },
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
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  paymentAmount: {
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  feeValue: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
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
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
    color: '#000',
    lineHeight: 15,
  },
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
    fontFamily: 'Poppins',
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
    paddingVertical: 4,
  },
  paymentMethodItem: {
    alignItems: 'center',
    minWidth: 65,
    marginRight: 8,
    paddingVertical: 4,
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
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 7,
    color: '#000',
    textAlign: 'center',
    marginTop: 1,
  },
  andMoreText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 4,
  },
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
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 8,
    color: '#000',
    marginTop: 2,
  },
  stepLabel: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 2,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1565C0',
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 32,
    gap: 8,
    marginBottom: 20,
  },
  refreshButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  errorText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: '#D32F2F',
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  loadingText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 16,
  },
  apiStatusText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#2E7D32',
    lineHeight: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  paymentMetaText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#1E88E5',
    lineHeight: 16,
    marginTop: 4,
  },
  paymentStatusText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 16,
    marginTop: 4,
  },
  expiryText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#000',
    lineHeight: 16,
    marginTop: 10,
  },
  paymentStatusNote: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#545454',
    lineHeight: 16,
    marginTop: 4,
  },
  qrPlaceholderText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#D32F2F',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  refreshButtonDisabled: {
    opacity: 0.6,
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 16,
    gap: 10,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'rgba(129,199,132,0.2)',
    borderColor: 'rgba(129,199,132,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 8,
    marginTop: 10,
  },
  alertText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 12,
    color: '#81C784',
    lineHeight: 14,
  },
});