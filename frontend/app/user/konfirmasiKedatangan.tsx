import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { savePendingBooking } from '@/fetching/viewmodels/bookingStorage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Modal, // 🌟 Menggunakan Modal bawaan untuk Pop-up
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback, // Supaya bisa klik di luar untuk menutup pop-up
  View
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

// Impor komponen denah lokasi parkir untuk setiap lantai
import GroundFloor from '@/components/booking/floors/GroundFloor';
import GroundFloorA from '@/components/booking/floors/GroundFloorA';
import P1 from '@/components/booking/floors/P1';
import P1A from '@/components/booking/floors/P1A';
import P2 from '@/components/booking/floors/P2';
import P2A from '@/components/booking/floors/P2A';
import P3 from '@/components/booking/floors/P3';
import P3A from '@/components/booking/floors/P3A';
import P4 from '@/components/booking/floors/P4';
import P4A from '@/components/booking/floors/P4A';
import P5 from '@/components/booking/floors/P5';

const INITIAL_SECONDS = 30 * 60 + 0;

function formatCountdown(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function ShieldCheckIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M18.75 12.5L14.1919 17.0581C13.9479 17.3021 13.5521 17.3021 13.3081 17.0581L11.25 15M9.47917 3.75H20.5208C20.9235 3.75 21.25 4.07646 21.25 4.47917C21.25 6.4927 22.8823 8.125 24.8958 8.125H25.4167C25.8769 8.125 26.25 8.4981 26.25 8.95833V10.0316C26.25 16.9557 22.4961 23.3355 16.4433 26.6981L15.9706 26.9608C15.367 27.2961 14.633 27.2961 14.0294 26.9608L13.5567 26.6981C7.50392 23.3355 3.75 16.9557 3.75 10.0316V8.95833C3.75 8.4981 4.1231 8.125 4.58333 8.125H5.10417C7.1177 8.125 8.75 6.4927 8.75 4.47917C8.75 4.07646 9.07646 3.75 9.47917 3.75Z"
        stroke="#81C784"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function SandclockIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M6.66675 2.6665H25.3334M6.66675 29.3332H25.3334M8.00008 2.6665V7.99984C8.00008 12.4181 11.5818 15.9998 16.0001 15.9998M24.0001 29.3332V23.9998C24.0001 19.5816 20.4184 15.9998 16.0001 15.9998M16.0001 15.9998C11.5818 15.9998 8.00008 19.5816 8.00008 23.9998V29.3332M16.0001 15.9998C20.4184 15.9998 24.0001 12.4181 24.0001 7.99984V2.6665M20.0001 7.99984C20.0001 10.209 18.2092 11.9998 16.0001 11.9998C13.7909 11.9998 12.0001 10.209 12.0001 7.99984M12.0001 25.3332H20.0001"
        stroke="#FEAB42"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Circle cx={15} cy={15} r={12.5} stroke="#1565C0" strokeWidth={2} />
      <Path
        d="M15 10V15L17.5 17.5"
        stroke="#1565C0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ParkingAreaIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.08325 10.0002C2.08325 6.47539 2.08325 4.713 3.08156 3.54413C3.22332 3.37815 3.3779 3.22357 3.54389 3.0818C4.71275 2.0835 6.47514 2.0835 9.99992 2.0835C13.5247 2.0835 15.2871 2.0835 16.456 3.0818C16.6219 3.22357 16.7765 3.37815 16.9183 3.54413C17.9166 4.713 17.9166 6.47539 17.9166 10.0002C17.9166 13.5249 17.9166 15.2873 16.9183 16.4562C16.7765 16.6222 16.6219 16.6222 16.456 16.9185C15.2871 17.9168 13.5247 17.9168 9.99992 17.9168C6.47514 17.9168 4.71275 17.9168 3.54389 16.9185C3.3779 16.7768 3.22332 16.6222 3.08156 16.4562C2.08325 15.2873 2.08325 13.5249 2.08325 10.0002Z"
        stroke="#141B34"
        strokeWidth={1.15}
      />
      <Path
        d="M7.5 10.8335V7.00016C7.5 6.68995 7.5 6.53484 7.54079 6.40932C7.62322 6.15562 7.82212 5.95671 8.07582 5.87428C8.20135 5.8335 8.35645 5.8335 8.66667 5.8335H10.8333C12.214 5.8335 13.3333 6.95278 13.3333 8.3335C13.3333 9.71421 12.214 10.8335 10.8333 10.8335H7.5ZM7.5 10.8335V15.0002"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CarIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.0001 9.1665H16.6667C17.5872 9.1665 18.3334 9.9127 18.3334 10.8332V11.6665C18.3334 12.587 17.5872 13.3332 16.6667 13.3332M15.0001 9.1665L13.7133 5.30612C13.4864 4.62555 12.8495 4.1665 12.1321 4.1665H8.33341M15.0001 9.1665H8.33341M3.33341 9.1665L4.62021 5.30612C4.84706 4.62555 5.48396 4.1665 6.20135 4.1665H8.33341M3.33341 9.1665H8.33341M3.33341 9.1665C2.41294 9.1665 1.66675 9.9127 1.66675 10.8332V11.6665C1.66675 12.587 2.41294 13.3332 3.33341 13.3332M8.33341 9.1665V4.1665M6.66675 13.3332H13.3334M6.66675 13.3332C6.66675 14.2536 5.92056 14.9998 5.00008 14.9998C4.07961 14.9998 3.33341 14.2536 3.33341 13.3332M6.66675 13.3332C6.66675 12.4127 5.92056 11.6665 5.00008 11.6665C4.07961 11.6665 3.33341 12.4127 3.33341 13.3332M13.3334 13.3332C13.3334 14.2536 14.0796 14.9998 15.0001 14.9998C15.9206 14.9998 16.6667 14.2536 16.6667 13.3332M13.3334 13.3332C13.3334 12.4127 14.0796 11.6665 15.0001 11.6665C15.9206 11.6665 16.6667 12.4127 16.6667 13.3332"
        stroke="black"
        strokeWidth={1.15}
      />
    </Svg>
  );
}

function PlatCarIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.08325 10L3.74992 10.8333"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9167 10.417L16.2501 10.8337"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.75 7.5H16.25"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinejoin="round"
      />
      <Path
        d="M3.75008 7.5H16.2501C17.0478 8.3446 18.3334 9.52079 18.3334 10.833V13.7252C18.3334 14.2005 18.0171 14.6007 17.5974 14.6562L15.0001 15H5.00008L2.40271 14.6562C1.98304 14.6007 1.66675 14.2005 1.66675 13.7252V10.833C1.66675 9.52079 2.9524 8.3446 3.75008 7.5Z"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinejoin="round"
      />
      <Path
        d="M1.66675 14.167V16.5686C1.66675 16.8843 1.86738 17.1728 2.18499 17.314C2.39107 17.4056 2.5879 17.5003 2.82556 17.5003H4.25793C4.49559 17.5003 4.69243 17.4056 4.89851 17.314C5.21612 17.1728 5.41675 16.8843 5.41675 16.5686V16.5686M14.5833 15.0003V16.5686C14.5833 16.8843 14.7839 17.1728 15.1015 17.314C15.3076 17.4056 15.5044 17.5003 15.7421 17.5003H17.1744C17.4121 17.5003 17.6089 17.4056 17.815 17.314C18.1326 17.1728 18.3333 16.8843 18.3333 16.5686V14.167"
        stroke="#141B34"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


export default function KonfirmasiKedatangan() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialRemainingSeconds = Number(params.remainingSeconds ?? NaN);
  const [secondsLeft, setSecondsLeft] = useState(
    Number.isFinite(initialRemainingSeconds) && initialRemainingSeconds > 0
      ? initialRemainingSeconds
      : INITIAL_SECONDS
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const customerName = Array.isArray(params.customerName)
    ? params.customerName.join(' ')
    : params.customerName ?? 'Guest';
  const customerPhone = Array.isArray(params.customerPhone)
    ? params.customerPhone.join(' ')
    : params.customerPhone ?? '-';
  const vehicleType = Array.isArray(params.vehicleType)
    ? params.vehicleType.join(' ')
    : params.vehicleType ?? 'Mobil Creta';
  const plateNumber = Array.isArray(params.plateNumber)
    ? params.plateNumber.join(' ')
    : params.plateNumber ?? 'DD 1234 TNF';
  const targetSlotId = String(params.slot || 'L4');
  const selectedFloor = String(params.floor || 'Ground Floor');
  const selectedSlotStatuses = { [targetSlotId]: 'selected' as const };

  useEffect(() => {
    const remainingSeconds = Number(params.remainingSeconds ?? NaN);
    if (Number.isFinite(remainingSeconds) && remainingSeconds > 0) {
      setSecondsLeft(remainingSeconds);
    }
  }, [params.remainingSeconds, targetSlotId]);

  const renderFloorLayout = () => {
    switch (selectedFloor) {
      case 'Ground Floor':
        return (
          <GroundFloor
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Ground Floor - Area A':
        return (
          <GroundFloorA
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P1':
        return (
          <P1
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P1 - Area A':
        return (
          <P1A
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P2':
        return (
          <P2
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P2 - Area A':
        return (
          <P2A
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P3':
        return (
          <P3
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P3 - Area A':
        return (
          <P3A
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P4':
        return (
          <P4
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P4 - Area A':
        return (
          <P4A
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      case 'Lantai P5':
        return (
          <P5
            selectedSlot={targetSlotId}
            slotStatuses={selectedSlotStatuses}
            onSelectSlot={() => {}}
          />
        );
      default:
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Layout untuk {selectedFloor} belum dibuat.
            </Text>
          </View>
        );
    }
  };

  // 🌟 STATES KONTROL UNTUK KEDUA POP-UP MODAL DIALOG
  const [popupVisible, setPopupVisible] = useState(false);       // Pop-up Tiba di Mall
  const [cancelPopupVisible, setCancelPopupVisible] = useState(false); // Pop-up Batal Booking

  const bookingDetails = [
    {
      icon: <Ionicons name="person-outline" size={20} color="#141B34" />,
      label: 'Nama',
      value: customerName,
    },
    {
      icon: <Ionicons name="call-outline" size={20} color="#141B34" />,
      label: 'No.HP',
      value: customerPhone,
    },
    {
      icon: <CarIcon />,
      label: 'Jenis Kendaraan',
      value: vehicleType,
    },
    {
      icon: <PlatCarIcon />,
      label: 'Plat Kendaraan',
      value: plateNumber,
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Handler jika klik 'Ya, Saya Tiba' di Pop-up Kedatangan
  const handleConfirmArrival = () => {
    setPopupVisible(false);
    const now = Date.now();
    savePendingBooking({
      id: now,
      mall: 'Mall Ratu Indah',
      area: selectedFloor,
      slot: targetSlotId,
      customerName,
      customerPhone,
      vehicleType,
      plateNumber,
      status: 'active',
      startAt: now,
      createdAt: now,
      expiresAt: now + INITIAL_SECONDS * 1000,
    });

    router.push({
      pathname: '/user/KonfirmasiSelesaiParkir',
      params: {
        customerName,
        customerPhone,
        vehicleType,
        plateNumber,
        slot: targetSlotId,
        floor: selectedFloor,
        startAt: String(now),
      },
    });
  };

  // Handler jika klik 'Yes' di Pop-up Pembatalan
  const handleCancelBooking = () => {
    setCancelPopupVisible(false);
    router.push('/user/activityCancelled');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/user/activity')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1565C0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi Kedatangan</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://api.builder.io/api/v1/image/assets/TEMP/98f1b0cad281935f3def159832d8ca1473bb9b9f?width=738',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Title & subtitle */}
        <Text style={styles.pageTitle}>Sudah tiba di Mall?</Text>
        <Text style={styles.pageSubtitle}>
          Konfirmasi kedatangan Anda untuk memulai waktu parkir
        </Text>

        {/* Green info banner */}
        <View style={styles.greenBanner}>
          <ShieldCheckIcon />
          <Text style={styles.greenBannerText}>
            With confirming attendance, the system will record the arrival time of your vehicle.
          </Text>
        </View>

        {/* Slot timer banner */}
        <View style={styles.timerBanner}>
          <SandclockIcon />
          <View style={styles.timerBannerContent}>
            <View style={styles.timerBannerLeft}>
              <Text style={styles.timerBannerTitle}>Slot Anda sedang ditahan</Text>
              <Text style={styles.timerBannerSub}>
                Silahkan tiba di mall sebelum waktu habis
              </Text>
            </View>
            <View style={styles.timerBannerRight}>
              <Text style={styles.timerBannerSisaLabel}>Sisa Waktu</Text>
              <Text style={styles.timerBannerTime}>
                {formatCountdown(secondsLeft)}
              </Text>
            </View>
          </View>
        </View>

        {/* Detail Lokasi Tempat Parkir */}
        <View style={styles.locationMapCard}>
          <Text style={styles.locationMapHeading}>Detail Lokasi Tempat Parkir</Text>
          <Text style={styles.locationMapSubtext}>Lantai: {selectedFloor} • Slot: {targetSlotId}</Text>
          <View style={styles.miniMapFrame}>
            <ScrollView 
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.miniMapVerticalContent}
            >
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {renderFloorLayout()}
              </ScrollView>
            </ScrollView>
          </View>
        </View>

        {/* Detail Booking Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Detail Booking</Text>
          {bookingDetails.map((item, index) => (
            <View key={index}>
              <View style={styles.detailRow}>
                <View style={styles.iconBox}>{item.icon}</View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              </View>
              {index < bookingDetails.length - 1 && (
                <View style={styles.rowDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Perhatian banner */}
        <View style={styles.perhatianBanner}>
          <ClockIcon />
          <View style={styles.perhatianContent}>
            <Text style={styles.perhatianTitle}>Perhatian</Text>
            <Text style={styles.perhatianText}>
              Pastikan Anda sudah berada di area mall.{'\n'}Waktu parkir akan
              dimulai setelah konfirmasi.
            </Text>
          </View>
        </View>

        {/* Batalkan Booking */}
        {/* 🌟 FIKS: Hubungkan tombol ini ke pemicu pop-up pembatalan */}
        <TouchableOpacity 
          style={styles.batalkanBtn} 
          activeOpacity={0.8}
          onPress={() => setCancelPopupVisible(true)}
        >
          <Ionicons name="close-circle-outline" size={23} color="#FF6249" />
          <Text style={styles.batalkanText}>Batalkan Booking</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          activeOpacity={0.85} 
          onPress={() => setPopupVisible(true)}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
          <Text style={styles.confirmText}>Ya, Saya sudah Tiba di Mall</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          onPress={async () => {
            const now = Date.now();
            await savePendingBooking({
              id: now,
              mall: 'Mall Ratu Indah',
              area: selectedFloor,
              slot: targetSlotId,
              customerName,
              customerPhone,
              vehicleType,
              plateNumber,
              status: 'pending',
              createdAt: now,
              expiresAt: now + INITIAL_SECONDS * 1000,
            });
            router.push('/user/activity');
          }}
        >
          <Text style={styles.secondaryText}>Belum, Nanti Saja</Text>
        </TouchableOpacity>
      </View>

      {/* ============================================================== */}
      {/* 🌟 MODAL 1: POP-UP KONFIRMASI KEDATANGAN TIBA DI MALL          */}
      {/* ============================================================== */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.popupOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.popupWrapper}>
          <View style={styles.popupBox}>
            <View style={styles.popupIconCircle}>
              <Ionicons name="location-outline" size={38} color="#1565C0" />
            </View>

            <Text style={styles.popupTitle}>Konfirmasi Kedatangan?</Text>
            <Text style={styles.popupDesc}>
              Apakah Anda yakin sudah berada di lokasi mall? Waktu perhitungan argo parkir Anda untuk slot <Text style={{ fontWeight: '700', color: '#1565C0' }}>{targetSlotId}</Text> akan langsung berjalan otomatis.
            </Text>

            <View style={styles.popupActionRow}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setPopupVisible(false)}>
                <Text style={styles.btnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirmArrival}>
                <Text style={styles.btnConfirmText}>Ya, Saya Tiba</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ============================================================== */}
      {/* 🌟 MODAL 2: POP-UP KONFIRMASI PEMBATALAN (SESUAI GAMBAR KAMU)   */}
      {/* ============================================================== */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={cancelPopupVisible}
        onRequestClose={() => setCancelPopupVisible(false)}
      >
        {/* Sisi Luar Gelap Semitransparan */}
        <TouchableWithoutFeedback onPress={() => setCancelPopupVisible(false)}>
          <View style={styles.popupOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.popupWrapper}>
          {/* Kotak Box Putih Bersih */}
          <View style={[styles.popupBox, { paddingVertical: 28, paddingHorizontal: 16, borderRadius: 24 }]}>
            
            {/* Teks Judul Kembar Sesuai Gambar Referensi */}
            <Text style={styles.cancelBoxTitle}>
              Are you sure you want to cancel?
            </Text>

            {/* Tombol Aksi Berdampingan Sesuai Bentuk Gambar */}
            <View style={styles.cancelActionRow}>
              {/* Tombol YES (Kiri) -> Pindah ke Halaman ActivityCancelled */}
              <TouchableOpacity 
                style={styles.cancelBtnBlue} 
                onPress={handleCancelBooking}
                activeOpacity={0.85}
              >
                <Text style={styles.cancelBtnText}>Yes</Text>
              </TouchableOpacity>

              {/* Tombol NO (Kanan) -> Tutup Pop-up saja */}
              <TouchableOpacity 
                style={styles.cancelBtnBlue} 
                onPress={() => setCancelPopupVisible(false)}
                activeOpacity={0.85}
              >
                <Text style={styles.cancelBtnText}>No</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
    marginBottom: 5,
  },
  backBtn: {
    position: 'absolute',
    left: 12,
    top: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1565C0',
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 16,
    gap: 12,
  },
  heroContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(155,155,155,0.20)',
  },
  heroImage: {
    width: '100%',
    height: 164,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: -5,
  },
  pageSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E88E5',
    textAlign: 'center',
    marginTop: -8,
  },
  greenBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(129,199,132,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(129,199,132,0.50)',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
    marginTop: -4,
  },
  greenBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#81C784',
    lineHeight: 18,
  },
  timerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF7EA',
    borderWidth: 1,
    borderColor: 'rgba(254,247,234,0.50)',
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    marginTop: -4,
  },
  timerBannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerBannerLeft: {
    flex: 1,
  },
  timerBannerTitle: {
    fontSize: 10,
    fontWeight: '400',
    color: '#9D6C23',
    lineHeight: 15,
  },
  timerBannerSub: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000',
    lineHeight: 16,
  },
  timerBannerRight: {
    alignItems: 'flex-end',
  },
  timerBannerSisaLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: '#9D6C23',
    lineHeight: 14,
  },
  timerBannerTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FEAB42',
    lineHeight: 22,
  },
  locationMapCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.50)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
    marginTop: -4,
  },
  locationMapHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 6,
  },
  locationMapSubtext: {
    fontSize: 13,
    color: '#4B4B4B',
    marginBottom: 10,
  },
  miniMapFrame: {
    height: 330,
    backgroundColor: '#54595F', 
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  miniMapVerticalContent: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.50)',
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
    marginTop: -4,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#CCE9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1565C0',
    letterSpacing: 0.12,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    letterSpacing: 0.12,
    lineHeight: 19,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginLeft: 38,
  },
  perhatianBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(30,136,229,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.50)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    marginTop: -4,
  },
  perhatianContent: {
    flex: 1,
  },
  perhatianTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1565C0',
    letterSpacing: 0.12,
    lineHeight: 19,
  },
  perhatianText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E88E5',
    letterSpacing: 0.12,
    lineHeight: 19,
  },
  batalkanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6249',
    borderRadius: 20,
    height: 44,
    gap: 8,
    backgroundColor: '#fff',
    marginTop: -4,
  },
  batalkanText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6249',
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 10,
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
    marginBottom: 20,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1565C0',
  },

  // STYLING SHARED POP-UP LAYOUT
  popupOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  popupBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 20,
  },
  popupIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  popupDesc: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
    paddingHorizontal: 6,
  },
  popupActionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btnCancel: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  btnCancelText: {
    color: '#1565C0',
    fontSize: 14,
    fontWeight: '700',
  },
  btnConfirm: {
    flex: 1,
    height: 46,
    backgroundColor: '#1565C0',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConfirmText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  cancelBoxTitle: {
    fontFamily: 'System', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000', 
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  cancelActionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    marginBottom: 5,
  },
  cancelBtnBlue: {
    width: 90,
    height: 48,
    backgroundColor: '#1565C0', 
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});