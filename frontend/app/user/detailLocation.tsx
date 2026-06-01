import { COLORS } from '@/constants/theme';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import ButtonPrimary from '@/components/common/ButtonPrimary';
import InfoRow from '@/components/common/InfoRow';
import InputField from '@/components/common/InputField';
import { createBookingPengunjung } from '@/fetching/services/bookingPengunjungService';
import { getTempatParkir } from '@/fetching/services/tempatparkirService';
import { getDashboardLokasiMall } from '@/fetching/services/dashboardService';
import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { useDetailLokasiVM } from '@/viewmodels/useDetailLokasiVM';
import { useProfileVM } from '@/viewmodels/useProfileVM';

const PARKING_IMAGES = [
  require('../../assets/images/1.jpg'),
  require('../../assets/images/2.jpg'),
  require('../../assets/images/3.jpg'),
  require('../../assets/images/4.jpg'),
];

export default function DetailLocation() {
  const { data, loading, error } = useDetailLokasiVM();
  const { profile } = useProfileVM();
  const params = useLocalSearchParams<{
    slot?: string;
    floor?: string;
    mallId?: string;
  }>();

  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryImages, setGalleryImages] = useState<any[]>(PARKING_IMAGES);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [platNumber, setPlatNumber] = useState('');

  React.useEffect(() => {
    setUsername(profile.name || '');
    setPhone(profile.phone || '');
    setVehicleType(profile.vehicle || '');
    setPlatNumber(profile.plate || '');
  }, [profile]);

  React.useEffect(() => {
    const mallId = Number(params.mallId || 0);
    if (!mallId) {
      setGalleryImages(PARKING_IMAGES);
      return;
    }

    let isActive = true;
    getDashboardLokasiMall()
      .then((locations) => {
        if (!isActive) return;
        const matched = locations.find(
          (item) => Number(item?.LokasiMall?.IDLokasiMall) === mallId,
        );
        const imageSources = matched?.FotoLokasiMall?.filter(Boolean).map((foto) => ({
          uri: `${API_BASE_URL}/${String(foto.FotoLokasi).replace(/^\/+/, '')}`,
        })) ?? [];
        if (imageSources.length > 0) {
          setGalleryImages(imageSources);
        } else {
          setGalleryImages(PARKING_IMAGES);
        }
      })
      .catch(() => {
        setGalleryImages(PARKING_IMAGES);
      });

    return () => {
      isActive = false;
    };
  }, [params.mallId]);

  React.useEffect(() => {
    if (selectedImage >= galleryImages.length) {
      setSelectedImage(0);
    }
  }, [galleryImages, selectedImage]);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const normalizeSlotCode = (rawCode: string) => {
    const trimmed = String(rawCode || '').trim();
    if (!trimmed) return '';

    const collapsed = trimmed.replace(/\s+/g, ' ');
    const parts = collapsed.split(/\s*[-–—/]\s*|\s+/).filter(Boolean);
    const normalized = parts.length > 0 ? parts[parts.length - 1] : collapsed;
    return normalized.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  };

  const handlePressNext = async () => {
    if (isSubmitting) return;

    const loadingStartedAt = Date.now();
    setIsSubmitting(true);

    try {
      const slotCode = params.slot || data?.TempatParkir?.KodeTempat || '';
      const mallId = Number(params.mallId || 0);

      if (!mallId) {
        throw new Error('ID lokasi mall tidak ditemukan');
      }

      const payload = await getTempatParkir(mallId);
      const slots = Array.isArray((payload as any)?.tempat_parkir)
        ? (payload as any).tempat_parkir
        : Array.isArray((payload as any)?.TempatParkir)
          ? (payload as any).TempatParkir
          : [];

      const normalizedSlotCode = normalizeSlotCode(slotCode);
      const matchedSlot = slots.find((slot: any) => normalizeSlotCode(slot.KodeTempat || '') === normalizedSlotCode);

      if (!matchedSlot?.IDTempatParkir) {
        throw new Error('Slot parkir tidak ditemukan');
      }

      const bookingResult = await createBookingPengunjung({
        IDTempatParkir: Number(matchedSlot.IDTempatParkir),
        NamaPengguna: username || profile.name || '',
        NoPengguna: phone || profile.phone || '',
        KendaraanPengguna: vehicleType || profile.vehicle || '',
        PlatPengguna: platNumber || profile.plate || '',
      });

      const elapsed = Date.now() - loadingStartedAt;
      const minimumLoadingMs = 650;
      if (elapsed < minimumLoadingMs) {
        await new Promise((resolve) => setTimeout(resolve, minimumLoadingMs - elapsed));
      }

      router.push({
        pathname: '/user/konfirmasiKedatangan',
        params: {
          bookingID: String(bookingResult.Booking.IDBooking),
          slot: bookingResult.TempatParkir.KodeTempat || slotCode,
          floor: params.floor || 'Ground Floor',
          mallId: String(mallId),
          bookingTimeIso: bookingResult.Booking.WaktuBooking,
          bookingName: username || profile.name || '',
          phone: phone || profile.phone || '',
          vehicleType: vehicleType || profile.vehicle || '',
          platNumber: platNumber || profile.plate || '',
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal membuat booking';
      Alert.alert('Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePressBack = () => {
    try {
      if (router.canGoBack?.()) {
        router.back();
      } else {
        router.replace('/user/selectParkingSpot');
      }
    } catch (_error) {
      router.replace('/user/selectParkingSpot');
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
            <Ionicons name="chevron-back" size={26} color="#1565C0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Lokasi</Text>
        </View>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
            <Ionicons name="chevron-back" size={26} color="#1565C0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Lokasi</Text>
        </View>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="alert-circle-outline" size={48} color="#d32f2f" />
          <Text style={{ marginTop: 10, fontSize: 16, color: '#d32f2f', textAlign: 'center', paddingHorizontal: 20 }}>
            {error || 'Parking data not found'}
          </Text>
          <TouchableOpacity 
            style={[styles.confirmButton, { marginTop: 20, width: 120 }]} 
            onPress={handlePressBack}
          >
            <Text style={styles.confirmText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const hasActiveHistory = Boolean(data);
  const parkingCode = params.slot || data?.TempatParkir?.KodeTempat?.split(' ').pop() || data?.TempatParkir?.KodeTempat || '';
  const parkingFloor = params.floor || 'Ground Floor';
  const locationAddress = data?.LokasiMall?.AlamatLokasi || 'Alamat tidak tersedia';
  const bookingTime = data?.Booking?.WaktuBooking
    ? new Date(data.Booking.WaktuBooking).toLocaleString('id-ID')
    : 'Belum ada riwayat aktif';

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
          <Ionicons name="chevron-back" size={26} color="#1565C0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Lokasi</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!hasActiveHistory && (
          <View style={styles.emptyNoticeBox}>
            <Ionicons name="information-circle-outline" size={18} color="#1565C0" />
            <Text style={styles.emptyNoticeText}>
              Belum ada riwayat aktif. Kamu bisa membuat booking baru atau kembali.
            </Text>
          </View>
        )}
        <Image
          source={galleryImages[selectedImage]}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <View style={styles.thumbnailRowContainer}>
          {galleryImages.map((imgRequire, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(index)}
              style={[
                styles.thumbnailWrapper,
                selectedImage === index && styles.thumbnailSelected,
              ]}
            >
              <Image
                source={imgRequire}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* CARD DETAIL */}
        <View style={styles.card}>
          {/* AREA PARKIR */}
          <Text style={styles.sectionTitle}>Area Parkir {parkingFloor}</Text>

          <View style={styles.parkingInfoRow}>
            <View style={styles.slotBadge}>
              <Text style={styles.slotText}>{parkingCode}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Lokasi</Text>
              <Text style={styles.descriptionText}>
                {locationAddress}
              </Text>
              <Text style={[styles.descriptionTitle, { marginTop: 8 }]}>Waktu Booking</Text>
              <Text style={styles.descriptionText}>
                {bookingTime}
              </Text>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.sectionDivider} />

          {/* INFORMASI HEADER */}
          <View style={styles.infoHeader}>
            <Text style={styles.sectionTitle}>Informasi Penggunaan</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Ionicons name="create-outline" size={22} color="#1565C0" />
              </TouchableOpacity>
            )}
          </View>

          {/* USERNAME */}
          <InfoRow
            icon={<Ionicons name="person-outline" size={20} color="#141B34" />}
            label="Username"
            value={username}
            showDivider={false}
          />
          {isEditing && (
            <InputField label="" placeholder="Masukkan Username" value={username} onChangeText={setUsername} />
          )}

          {/* PHONE */}
          <InfoRow
            icon={<Ionicons name="call-outline" size={20} color="#141B34" />}
            label="No.HP"
            value={phone}
          />
          {isEditing && (
            <InputField label="" placeholder="Masukkan Nomor HP" value={phone} onChangeText={setPhone} />
          )}

          {/* VEHICLE */}
          <InfoRow
            icon={<Ionicons name="car-outline" size={20} color="#141B34" />}
            label="Jenis Kendaraan"
            value={vehicleType}
          />
          {isEditing && (
            <InputField label="" placeholder="Masukkan Kendaraan" value={vehicleType} onChangeText={setVehicleType} />
          )}

          {/* PLAT */}
          <InfoRow
            icon={<Ionicons name="car-sport-outline" size={20} color="#141B34" />}
            label="Plat Kendaraan"
            value={platNumber}
          />
          {isEditing && (
            <InputField label="" placeholder="Masukkan Plat" value={platNumber} onChangeText={setPlatNumber} />
          )}

          {/* SAVE BUTTON */}
          {isEditing && (
            <View style={styles.editActions}>
              <ButtonPrimary title="Simpan" onPress={handleSaveEdit} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* FIXED BOTTOM BUTTON */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]} 
          activeOpacity={0.85} 
          disabled={isSubmitting}
          onPress={handlePressNext}
        >
          {isSubmitting ? (
            <View style={styles.buttonLoadingRow}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.confirmText}>Memproses...</Text>
            </View>
          ) : (
            <Text style={styles.confirmText}>Selanjutnya</Text>
          )}
        </TouchableOpacity>
      </View> 

      {isSubmitting && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#1565C0" />
            <Text style={styles.loadingTitle}>Menyiapkan booking...</Text>
            <Text style={styles.loadingSubtitle}>
              Mohon tunggu sebentar, kami sedang membuka halaman konfirmasi.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const CARD_PADDING = 16;

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
    paddingBottom: 140,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
    marginBottom: 5,
  },
  backButton: {
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
  mainImage: {
    marginHorizontal: 16,
    height: 197,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(155,155,155,0.2)',
    resizeMode: 'cover',
  },

  thumbnailContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  thumbnailScrollContent: {
    gap: 8,
    paddingRight: 16, // Memberi ruang ekstra di akhir geseran
  },
  thumbnailWrapper: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  thumbnailSelected: {
    borderWidth: 2,
    borderColor: '#1E88E5',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },

  thumbnailRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 8,
  },
  
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: '#FFF',
    padding: CARD_PADDING,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
    marginBottom: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  parkingInfoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    marginTop: 8,
  },
  slotBadge: {
    width: 51,
    minHeight: 70,
    borderRadius: 8,
    backgroundColor: 'rgba(30,136,229,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.3)',
  },
  slotText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 22,
    color: '#1565C0',
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionTitle: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  descriptionText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 11,
    color: '#555',
    lineHeight: 17,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(140,140,140,0.2)',
    marginBottom: 12,
  },
  editActions: {
    marginTop: 16,
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 10,
    marginBottom: 20,
    backgroundColor: '#EEF4FA', // Menyelaraskan warna bawah agar seamless
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
  confirmButtonDisabled: {
    opacity: 0.85,
  },
  buttonLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(21,101,192,0.12)',
  },
  loadingTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#1565C0',
    textAlign: 'center',
  },
  loadingSubtitle: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#607080',
    textAlign: 'center',
  },
  emptyNoticeBox: {
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(21,101,192,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(21,101,192,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  emptyNoticeText: {
    flex: 1,
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
});