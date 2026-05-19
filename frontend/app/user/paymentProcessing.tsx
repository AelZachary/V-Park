import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TRANSACTION = {
  lokasi: 'Trans Studio Mall Makassar',
  slotParkir: 'Ground Floor',
  totalPembayaran: 'Rp 20.000',
};

function ProgressRing({ currentProgress }: { currentProgress: Animated.Value }) {
  const radius = 72;
  const strokeDasharray = 2 * Math.PI * radius;

  const strokeDashoffset = currentProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [strokeDasharray, 0],
  });

  return (
    <Svg width={171} height={171} viewBox="0 0 171 171" fill="none">
      <Circle
        cx={85.5}
        cy={85.5}
        r={radius}
        stroke="#1565C0"
        strokeWidth={13.68}
        opacity={0.3}
      />
      <AnimatedCircle
        cx={85.5}
        cy={85.5}
        r={radius}
        stroke="#1565C0"
        strokeWidth={13.68}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 85.5 85.5)"
      />
    </Svg>
  );
}

function SpinnerIcon() {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
      <Path d="M7.5 1.875V3.75" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7.5 11.25V13.125" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13.125 7.5L11.25 7.5" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3.75 7.5L1.875 7.5" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M11.4772 3.52246L10.1514 4.84829" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4.84877 10.1514L3.52295 11.4772" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M11.4772 11.4772L10.1514 10.1514" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4.84877 4.84829L3.52295 3.52246" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 15 15" fill="none">
      <Path
        d="M3 7.5L6 10.5L12 4.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
      <Path
        d="M21.25 14.1667L16.0842 19.3325C15.8076 19.6091 15.3591 19.6091 15.0825 19.3325L12.75 17M10.7431 4.25H23.2569C23.7133 4.25 24.0833 4.61999 24.0833 5.07639C24.0833 7.3584 25.9333 9.20833 28.2153 9.20833H28.8056C29.3272 9.20833 29.75 9.63118 29.75 10.1528V11.3691C29.75 19.2164 25.4956 26.4469 18.6358 30.2579L18.1 30.5556C17.4159 30.5556 16.5841 30.5556 15.9 30.5556L15.3642 30.2579C8.50444 26.4469 4.25 19.2164 4.25 11.3691V10.1528C4.25 9.63118 4.67284 9.20833 5.19444 9.20833H5.78472C8.06673 9.20833 9.91667 7.3584 9.91667 5.07639C9.91667 4.61999 10.2867 4.25 10.7431 4.25Z"
        stroke="#1565C0"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function StepIcon({ status }: { status: 'pending' | 'loading' | 'success' }) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation | undefined;
    if (status === 'loading') {
      animation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      animation.start();
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [spinAnim, status]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (status === 'success') {
    return (
      <View style={[styles.stepCircle, { backgroundColor: '#4CAF50' }]}>
        <CheckIcon />
      </View>
    );
  }

  if (status === 'loading') {
    return (
      <View style={[styles.stepCircle, { backgroundColor: '#1565C0' }]}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <SpinnerIcon />
        </Animated.View>
      </View>
    );
  }

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Circle cx={10.5} cy={10.5} r={10} fill="white" fillOpacity={0.5} stroke="#1565C0" />
    </Svg>
  );
}

export default function MemprosesPembayaran() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [stepOneStatus, setStepOneStatus] = useState<'pending' | 'loading' | 'success'>('loading');
  const [stepTwoStatus, setStepTwoStatus] = useState<'pending' | 'loading' | 'success'>('pending');

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const listenerId = progressAnim.addListener(({ value }) => {
      if (value >= 0.5 && value < 1) {
        setStepOneStatus('success');
        setStepTwoStatus('loading');
      }
      else if (value >= 1) {
        setStepOneStatus('success');
        setStepTwoStatus('success');
      }
    });

    return () => {
      progressAnim.removeListener(listenerId);
    };
  }, [progressAnim]);

  useEffect(() => {
    if (stepTwoStatus === 'success') {
      router.push('/user/paymentSuccessful');
    }
  }, [stepTwoStatus, router]);

  const isAllDone = stepTwoStatus === 'success';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Text style={styles.pageHeader}>Memproses Pembayaran</Text>

        {/* Progress Ring */}
        <View style={styles.ringWrapper}>
          <ProgressRing currentProgress={progressAnim} />
        </View>

        {/* Section Title & Subtitle */}
        <Text style={styles.sectionTitle}>
          {isAllDone ? 'Booking Berhasil!' : 'Memproses Pembayaran'}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {isAllDone 
            ? 'Slot parkir Anda telah berhasil disiapkan.'
            : 'Mohon tunggu sebentar, kami sedang memproses transaksi Anda'
          }
        </Text>

        {/* Steps Card */}
        <View style={styles.stepsCard}>
          {/* Step 1 */}
          <View style={styles.stepRow}>
            <StepIcon status={stepOneStatus} />
            <View style={styles.stepTextBlock}>
              <Text style={[styles.stepTitle, stepOneStatus === 'success' && { color: '#4CAF50' }]}>
                Memverifikasi Transaksi
              </Text>
              <Text style={styles.stepDesc}>
                {stepOneStatus === 'success' ? 'Pembayaran berhasil diverifikasi' : 'Sedang memeriksa Pembayaran Anda'}
              </Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.stepRow}>
            <StepIcon status={stepTwoStatus} />
            <View style={styles.stepTextBlock}>
              <Text style={[
                styles.stepTitle, 
                stepTwoStatus === 'loading' && { color: '#1565C0' },
                stepTwoStatus === 'success' && { color: '#4CAF50' }
              ]}>
                Menyelesaikan Booking Slot
              </Text>
              <Text style={styles.stepDesc}>
                {stepTwoStatus === 'success' 
                  ? 'Slot parkir siap digunakan' 
                  : stepTwoStatus === 'loading' 
                    ? 'Sedang mengalokasikan slot parkir untuk Anda' 
                    : 'Menyiapkan slot parkir untuk Anda'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Rincian Biaya Card */}
        <View style={styles.biayaCard}>
          <Text style={styles.biayaTitle}>Rincian Biaya</Text>

          <View style={styles.biayaRow}>
            <Text style={styles.biayaLabel}>Lokasi</Text>
            <Text style={styles.biayaValue}>{TRANSACTION.lokasi}</Text>
          </View>

          <View style={styles.biayaRow}>
            <Text style={styles.biayaLabel}>Area</Text>
            <Text style={styles.biayaValue}>{TRANSACTION.slotParkir}</Text>
          </View>

          <View style={styles.biayaRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{TRANSACTION.totalPembayaran}</Text>
          </View>
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <ShieldIcon />
          <View style={styles.securityTextBlock}>
            <Text style={styles.securityTitle}>Transaksi Anda aman dan terenkripsi</Text>
            <Text style={styles.securitySubtitle}>
              Jangan tutup aplikasi selama proses berlangsung
            </Text>
          </View>
        </View>
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
    paddingHorizontal: 17,
    paddingBottom: 32,
    alignItems: 'center',
  },
  pageHeader: {
    fontWeight: '700',
    fontSize: 20,
    color: '#1565C0',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  ringWrapper: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#1E88E5',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  stepsCard: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.50)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    gap: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepCircle: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTextBlock: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: '600',
    fontSize: 12,
    color: '#9E9E9E',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  stepDesc: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  biayaCard: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.50)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  biayaTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
    marginBottom: 4,
  },
  biayaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  biayaLabel: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  biayaValue: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
    textAlign: 'right',
    flex: 1,
    paddingLeft: 8,
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  totalValue: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
    textAlign: 'right',
    flex: 1,
    paddingLeft: 8,
  },
  securityBadge: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.50)',
    backgroundColor: 'rgba(30, 136, 229, 0.20)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 12,
    paddingVertical: 15,
    gap: 10,
  },
  securityTextBlock: {
    flex: 1,
  },
  securityTitle: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  securitySubtitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#1E88E5',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
});