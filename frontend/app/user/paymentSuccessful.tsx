import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  FeBlend,
  FeFlood,
  FeGaussianBlur,
  Filter,
  G,
  Path,
} from 'react-native-svg';
import { router } from 'expo-router';

const TRANSACTION = {
  noOrder: '1876543234567876',
  lokasi: 'Trans Studio Mall Makassar',
  area: 'Basement',
  slot: 'C4',
  platKendaraan: 'DD 2605 TA',
  waktuTiba: '20 Mar 2024, 19:28',
  durasi: '4 Jam',
  totalBiaya: 'Rp 100.000',
  waktuTransaksi: '20 Mar 2024, 19:29',
  totalPembayaran: 'Rp20.000',
};

const DETAIL_ROWS = [
  { label: 'No. Order', value: TRANSACTION.noOrder },
  { label: 'Lokasi', value: TRANSACTION.lokasi },
  { label: 'Area', value: TRANSACTION.area },
  { label: 'Slot', value: TRANSACTION.slot },
  { label: 'Plat Kendaraan', value: TRANSACTION.platKendaraan },
  { label: 'Waktu Tiba', value: TRANSACTION.waktuTiba },
  { label: 'Durasi', value: TRANSACTION.durasi },
  { label: 'Total Biaya', value: TRANSACTION.totalBiaya },
  { label: 'Waktu Transaksi', value: TRANSACTION.waktuTransaksi },
];

function SuccessIcon() {
  return (
    <Svg width={140} height={140} viewBox="0 0 140 140" fill="none">
      <Defs>
        <Filter id="blur" x="-4" y="-4" width="147.462" height="147.462" filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
        </Filter>
      </Defs>
      <G filter="url(#blur)">
        <Circle cx="69.731" cy="69.731" r="69.731" fill="#2E7D32" />
      </G>
      <Circle cx="69.731" cy="69.731" r="68.357" fill="#2E7D32" />
      <Circle cx="70.075" cy="70.075" r="51.525" fill="#43A047" />
      <Circle cx="69.836" cy="69.836" r="35.381" fill="white" />
      <Path
        d="M57.4255 71.3717L64.8088 78.755L82.0365 61.5273"
        stroke="#2E7D32"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StarIcon({ size = 40 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M36.6667 15.4002L24.6834 14.3668L20 3.3335L15.3167 14.3835L3.33337 15.4002L12.4334 23.2835L9.70004 35.0002L20 28.7835L30.3 35.0002L27.5834 23.2835L36.6667 15.4002ZM20 25.6668L13.7334 29.4502L15.4 22.3168L9.86671 17.5168L17.1667 16.8835L20 10.1668L22.85 16.9002L30.15 17.5335L24.6167 22.3335L26.2834 29.4668L20 25.6668Z"
        fill="#64B5E4"
      />
    </Svg>
  );
}

function DownloadIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3L12 3L12.75 3ZM11.25 14C11.25 14.4142 11.5858 14.75 12 14.75C12.4142 14.75 12.75 14.4142 12.75 14H12H11.25ZM16.5303 12.5303C16.8232 12.2374 16.8232 11.7626 16.5303 11.4697C16.2374 11.1768 15.7626 11.1768 15.4697 11.4697L16 12L16.5303 12.5303ZM12.7071 15.2929L12.1768 14.7626V14.7626L12.7071 15.2929ZM11.2929 15.2929L11.8232 14.7626H11.8232L11.2929 15.2929ZM8.53033 11.4697C8.23744 11.1768 7.76256 11.1768 7.46967 11.4697C7.17678 11.7626 7.17678 12.2374 7.46967 12.5303L8 12L8.53033 11.4697ZM3.75 16C3.75 15.5858 3.41421 15.25 3 15.25C2.58579 15.25 2.25 15.5858 2.25 16H3H3.75ZM21.75 16C21.75 15.5858 21.4142 15.25 21 15.25C20.5858 15.25 20.25 15.5858 20.25 16H21H21.75ZM12 3L11.25 3L11.25 14H12H12.75L12.75 3L12 3ZM16 12L15.4697 11.4697L12.1768 14.7626L12.7071 15.2929L13.2374 15.8232L16.5303 12.5303L16 12ZM11.2929 15.2929L11.8232 14.7626L8.53033 11.4697L8 12L7.46967 12.5303L10.7626 15.8232L11.2929 15.2929ZM12.7071 15.2929L12.1768 14.7626C12.0791 14.8602 11.9209 14.8602 11.8232 14.7626L11.2929 15.2929L10.7626 15.8232C11.446 16.5066 12.554 16.5066 13.2374 15.8232L12.7071 15.2929ZM3 16H2.25V16.2H3H3.75V16H3ZM7.8 21V21.75H16.2V21V20.25H7.8V21ZM21 16.2H21.75V16H21H20.25V16.2H21ZM16.2 21V21.75C17.0277 21.75 17.6936 21.7506 18.2315 21.7066C18.7781 21.662 19.2582 21.5676 19.7025 21.3413L19.362 20.673L19.0215 20.0048C18.824 20.1054 18.5632 20.1745 18.1093 20.2116C17.6467 20.2494 17.0525 20.25 16.2 20.25V21ZM21 16.2H20.25C20.25 17.0525 20.2494 17.6467 20.2116 18.1093C20.1745 18.5632 20.1054 18.824 20.0048 19.0215L20.673 19.362L21.3413 19.7025C21.5676 19.2582 21.662 18.7781 21.7066 18.2315C21.7506 17.6936 21.75 17.0277 21.75 16.2H21ZM19.362 20.673L19.7025 21.3413C20.4081 20.9818 20.9817 20.4081 21.3413 19.7025L20.673 19.362L20.0048 19.0215C19.789 19.4448 19.4448 19.789 19.0215 20.0048L19.362 20.673ZM3 16.2H2.25C2.25 17.0277 2.24942 17.6936 2.29336 18.2315C2.33803 18.7781 2.43238 19.2582 2.65873 19.7025L3.32698 19.362L3.99524 19.0215C3.8946 18.824 3.82546 18.5632 3.78838 18.1093C3.75058 17.6467 3.75 17.0525 3.75 16.2H3ZM7.8 21V20.25C6.94755 20.25 6.35331 20.2494 5.89068 20.2116C5.4368 20.1745 5.17604 20.1054 4.97852 20.0048L4.63803 20.673L4.29754 21.3413C4.74175 21.5676 5.22189 21.662 5.76853 21.7066C6.30641 21.7506 6.9723 21.75 7.8 21.75V21ZM3.32698 19.362L2.65873 19.7025C3.01825 20.4081 3.59193 20.9818 4.29754 21.3413L4.63803 20.673L4.97852 20.0048C4.55516 19.789 4.21095 19.4448 3.99524 19.0215L3.32698 19.362Z"
        fill="#1565C0"
      />
    </Svg>
  );
}

function HomeIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.625 22V13.9614C8.625 13.3271 9.12868 12.813 9.75 12.813H14.25C14.8713 12.813 15.375 13.3271 15.375 13.9614V22M3 19.7032V11.0226C3 9.64488 3.60582 8.33989 4.65043 7.46745L10.5752 2.51916C11.404 1.82695 12.596 1.82694 13.4248 2.51916L19.3496 7.46745C20.3942 8.33989 21 9.64488 21 11.0226V19.7032C21 20.9717 19.9926 22 18.75 22H16.5H7.5H5.25C4.00736 22 3 20.9717 3 19.7032Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function PaymentSuccessful() {
  const handleDownloadReceipt = () => {
    // Download receipt logic
  };

  const handleBackToHome = () => {
    router.replace('/user/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Hero Section */}
        <View style={styles.heroSection}>
          {/* Decorative stars */}
          <View style={[styles.starDecor, { top: 0, left: '35%' }]}>
            <StarIcon size={35} />
          </View>
          <View style={[styles.starDecor, { top: 29, left: '55%' }]}>
            <StarIcon size={25} />
          </View>
          <View style={[styles.starDecor, { top: 35, left: '65%' }]}>
            <StarIcon size={39} />
          </View>
          <View style={[styles.starDecor, { top: 44, left: '20%' }]}>
            <StarIcon size={20} />
          </View>
          <View style={[styles.starDecor, { top: 63, left: 6 }]}>
            <StarIcon size={37} />
          </View>
          <View style={[styles.starDecor, { top: '40%', left: 24 }]}>
            <StarIcon size={20} />
          </View>
          <View style={[styles.starDecor, { top: '38%', left: '70%' }]}>
            <StarIcon size={40} />
          </View>

          {/* Success circle icon */}
          <View style={styles.successIconWrapper}>
            <SuccessIcon />
          </View>

          {/* Success texts */}
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>Parkir Anda telah berhasil dipesan.</Text>
        </View>

        {/* Transaction Detail Card */}
        <View style={styles.transactionCard}>
          <Text style={styles.detailSectionTitle}>Detail Transaksi</Text>

          <View style={styles.detailDivider} />

          {DETAIL_ROWS.map((row) => (
            <View key={row.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}

          <View style={styles.totalDivider} />

          <Text style={styles.totalPaymentLabel}>Total Pembayaran</Text>
          <Text style={styles.totalPaymentAmount}>{TRANSACTION.totalPembayaran}</Text>
          <Text style={styles.taxNote}>(Termasuk pajak &amp; biaya layanan)</Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadReceipt}>
          <DownloadIcon />
          <Text style={styles.downloadButtonText}>Download Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <HomeIcon />
          <Text style={styles.homeButtonText}>Back to Home</Text>
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
    paddingHorizontal: 23,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    position: 'relative',
    minHeight: 280,
  },
  starDecor: {
    position: 'absolute',
  },
  successIconWrapper: {
    marginTop: 64,
    marginBottom: 16,
    zIndex: 1,
  },
  successTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#2E7D32',
    lineHeight: 22,
    textAlign: 'center',
  },
  successSubtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },

  // Transaction Card
  transactionCard: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#64B5E4',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  detailSectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
    marginBottom: 8,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#EBF7FF',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailLabel: {
    fontWeight: '600',
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 22,
  },
  detailValue: {
    fontWeight: '400',
    fontSize: 13,
    color: '#000',
    lineHeight: 22,
    textAlign: 'right',
    flex: 1,
    paddingLeft: 8,
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#EBF7FF',
    marginTop: 8,
    marginBottom: 10,
  },
  totalPaymentLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
  },
  totalPaymentAmount: {
    fontWeight: '700',
    fontSize: 20,
    color: '#FF383C',
    lineHeight: 22,
    marginTop: 2,
  },
  taxNote: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 22,
    marginTop: 2,
  },

  // Buttons
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#1565C0',
    backgroundColor: '#FFF',
    paddingVertical: 6,
    marginBottom: 10,
    gap: 8,
  },
  downloadButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#1565C0',
    paddingVertical: 6,
    gap: 8,
  },
  homeButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
  },
});