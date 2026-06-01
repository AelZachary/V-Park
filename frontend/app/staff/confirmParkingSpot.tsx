import DropdownButton from '@/components/booking/DropdownButton';
import LegendItem from '@/components/booking/LegendItem';
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
import { Ionicons } from '@expo/vector-icons';
import { toggleMonitoringPetugas, type ToggleMonitoringPetugasResponse } from '../../fetching/services/monitoringPetugasService';
import { getTempatParkir } from '@/fetching/services/tempatparkirService';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface SlotInfo {
  code: string;
  floor: string;
}

interface ConfirmSlotsPopupProps {
  visible: boolean;
  slots: SlotInfo[];
  onClose: () => void;
  onConfirmSubmit: () => void;
  mode: 'isi' | 'hapus'; // 🌟 TAMBAHAN: Untuk menentukan wujud pop-up (Isi atau Hapus)
}

function ConfirmSlotsPopup({ visible, slots = [], onClose, onConfirmSubmit, mode }: ConfirmSlotsPopupProps) {
  const isModeIsi = mode === 'isi';

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Tombol Silang (X) */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>

        {/* Lingkaran Icon Tengah (Dinamis: Biru untuk isi, Hijau/Merah-Muda untuk Hapus) */}
        <View style={[styles.iconCircleList, !isModeIsi && { backgroundColor: '#E8F5E9' }]}>
          <Ionicons 
            name={isModeIsi ? "clipboard-outline" : "trash-bin-outline"} 
            size={32} 
            color={isModeIsi ? "#1565C0" : "#4CAF50"} 
          />
        </View>

        {/* Teks Judul Utama Dinamis */}
        <Text style={styles.titleTerisi}>
          {isModeIsi ? "Konfirmasi Slot Terisi" : "Konfirmasi Kosongkan Slot"}
        </Text>
        
        {/* Deskripsi Subtitle Dinamis */}
        <Text style={styles.subtitleTerisi}>
          {isModeIsi ? (
            <Text>Anda akan menandai slot berikut sebagai <Text style={{ fontWeight: '700', color: '#FF5C46' }}>TERISI</Text> (Manual)</Text>
          ) : (
            <Text>Anda akan menandai slot berikut sebagai <Text style={{ fontWeight: '700', color: '#7BC67B' }}>TERSEDIA</Text> (Kosong)</Text>
          )}
        </Text>

        {/* Container Grid Kartu Slot */}
        <ScrollView style={{ maxHeight: 160, marginVertical: 15 }} showsVerticalScrollIndicator={false}>
          <View style={styles.slotRowGrid}>
            {slots.map((slot, i) => (
              <View 
                key={i} 
                style={[styles.slotCardTerisi, !isModeIsi && { borderColor: '#A5D6A7', backgroundColor: '#E8F5E9' }]}
              >
                <Text style={styles.slotCodeTerisi}>{slot.code}</Text>
                <Text style={styles.slotFloorTerisi}>{slot.floor}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Badge Pengingat */}
        <View style={[styles.reminderBadgeRow, !isModeIsi && { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
          <Ionicons 
            name="shield-checkmark-outline" 
            size={18} 
            color={isModeIsi ? "#1565C0" : "#43A047"} 
          />
          <Text style={[styles.reminderBadgeText, !isModeIsi && { color: '#43A047' }]}>
            {isModeIsi ? "Pastikan slot terisi sudah sesuai" : "Pastikan slot yang dikosongkan sudah sesuai"}
          </Text>
        </View>

        {/* Tombol Utama */}
        <TouchableOpacity 
          style={[styles.slotTerisiBtn, !isModeIsi && { backgroundColor: '#43A047', shadowColor: '#43A047' }]} 
          onPress={onConfirmSubmit} 
          activeOpacity={0.85}
        >
          <Ionicons 
            name={isModeIsi ? "checkmark-circle-outline" : "refresh-circle-outline"} 
            size={23} 
            color="#FFF" 
          />
          <Text style={styles.slotTerisiBtnText}>
            {isModeIsi ? "Slot Terisi" : "Kosongkan Slot"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

type SlotDetail = {
  id: number;
  rawStatus: string;
  mappedStatus: 'available' | 'occupied' | 'online' | 'manual';
  kodeTempat: string;
};

export default function ConfirmParkingSpot() {
  const params = useLocalSearchParams<{ slot?: string; floor?: string; mallId?: string }>();
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<string[]>([]);
  const [backendSlots, setBackendSlots] = useState<Record<string, SlotDetail>>({});
  const [activeMallId, setActiveMallId] = useState<number>(Number(params.mallId || 0));
  const [isSlotDataLoading, setIsSlotDataLoading] = useState(true);
  const [slotDataError, setSlotDataError] = useState<string | null>(null);

  const [justConfirmedSlots, setJustConfirmedSlots] = useState<string[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.floor) {
      setSelectedFloor(String(params.floor));
    }
    if (params.slot) {
      setSelectedSlots([String(params.slot)]);
    }
  }, [params.floor, params.slot]);

  const floorToLocationId: Record<string, number> = {
    'Ground Floor': 1,
    'Ground Floor - Area A': 2,
    'Lantai P1': 3,
    'Lantai P1 - Area A': 4,
    'Lantai P2': 5,
    'Lantai P2 - Area A': 6,
    'Lantai P3': 7,
    'Lantai P3 - Area A': 8,
    'Lantai P4': 9,
    'Lantai P4 - Area A': 10,
    'Lantai P5': 11,
  };

  useEffect(() => {
    if (selectedFloor && floorToLocationId[selectedFloor]) {
      setActiveMallId(floorToLocationId[selectedFloor]);
    }
  }, [selectedFloor]);

  const normalizeSlotCode = (rawCode: string) => {
    const trimmed = String(rawCode || '').trim();
    if (!trimmed) return '';

    const collapsed = trimmed.replace(/\s+/g, ' ');
    const parts = collapsed.split(/\s*[-–—/\\]\s*|\s+/).filter(Boolean);
    const normalized = parts.length > 0 ? parts[parts.length - 1] : collapsed;
    return normalized.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  };

  const normalizeStatusLabel = (rawStatus: string) =>
    String(rawStatus || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

  const mapBackendStatus = (rawStatus: string): SlotDetail['mappedStatus'] => {
    switch (normalizeStatusLabel(rawStatus)) {
      case 'tersedia':
      case 'kosong':
      case 'available':
      case 'empty':
        return 'available';
      case 'terisi':
      case 'occupied':
      case 'penuh':
        return 'occupied';
      case 'dipesan':
      case 'booked':
      case 'bookingonline':
        return 'online';
      case 'bookingmanual':
      case 'manual':
      case 'perawatan':
        return 'manual';
      default:
        return 'manual';
    }
  };

  useEffect(() => {
    let isActive = true;

    async function loadBackendSlots() {
      if (!activeMallId) {
        setSlotDataError('ID lokasi parkir tidak ditemukan');
        setBackendSlots({});
        setIsSlotDataLoading(false);
        return;
      }

      setIsSlotDataLoading(true);
      setSlotDataError(null);

      try {
        const payload = await getTempatParkir(activeMallId);
        if (!isActive) return;

        const source = payload as any;
        const slots = Array.isArray(source?.tempat_parkir)
          ? source.tempat_parkir
          : Array.isArray(source?.TempatParkir)
          ? source.TempatParkir
          : Array.isArray(source?.data?.tempat_parkir)
          ? source.data.tempat_parkir
          : [];

        const mapped: Record<string, SlotDetail> = {};

        slots.forEach((slot: any) => {
          const rawKode = String(slot.KodeTempat || slot.kode_tempat || '').trim();
          const code = normalizeSlotCode(rawKode);
          if (!code) return;

          const rawStatus = String(slot.StatusTempatParkir || slot.status_tempat_parkir || '');
          mapped[code] = {
            id: Number(slot.IDTempatParkir || slot.id_tempat_parkir || 0),
            rawStatus,
            mappedStatus: mapBackendStatus(rawStatus),
            kodeTempat: rawKode,
          };
        });

        setBackendSlots(mapped);
      } catch (error) {
        console.log('❌ Error loading backend slot data:', error);
        setSlotDataError(error instanceof Error ? error.message : String(error));
        setBackendSlots({});
      } finally {
        if (isActive) {
          setIsSlotDataLoading(false);
        }
      }
    }

    loadBackendSlots();

    return () => {
      isActive = false;
    };
  }, [activeMallId]);

  const isSlotActionAllowed = (slotCode: string) => {
    const detail = backendSlots[normalizeSlotCode(slotCode)];
    return detail?.mappedStatus === 'available' || detail?.mappedStatus === 'occupied';
  };

  const getSlotDetail = (slotCode: string) => backendSlots[normalizeSlotCode(slotCode)];

  // State untuk melacak mode pop-up yang aktif ('isi' untuk nambah mobil, 'hapus' untuk buang mobil)
  const [popupMode, setPopupMode] = useState<'isi' | 'hapus'>('isi');

  // State pencatat slot merah yang aslinya bawaan peta tapi mau kita paksa balik jadi hijau
  const [clearedManualSlots, setClearedManualSlots] = useState<string[]>([]);

  // State bantuan untuk mendeteksi apakah slot kuning yang diklik staff asalnya dari slot merah
  const [originIsOccupied, setOriginIsOccupied] = useState<Record<string, boolean>>({});

  const floorOptions = [
    'Ground Floor',
    'Ground Floor - Area A',
    'Lantai P1',
    'Lantai P1 - Area A',
    'Lantai P2',
    'Lantai P2 - Area A',
    'Lantai P3',
    'Lantai P3 - Area A',
    'Lantai P4',
    'Lantai P4 - Area A',
    'Lantai P5'
  ];

  const slotStatuses = useMemo(() => {
    const statuses: Record<string, 'available' | 'selected' | 'manual' | 'online' | 'occupied'> = {};

    Object.entries(backendSlots).forEach(([code, detail]) => {
      statuses[code] = detail.mappedStatus;
    });

    confirmedSlots.forEach((slot) => {
      statuses[slot] = 'occupied';
    });

    clearedManualSlots.forEach((slot) => {
      statuses[slot] = 'available';
    });

    selectedSlots.forEach((slot) => {
      statuses[slot] = 'selected';
    });

    return statuses;
  }, [backendSlots, selectedSlots, confirmedSlots, clearedManualSlots]);

  // Logika Saklar Estafet Cerdas
  const handleSelectSlot = (slotId: string, currentStatus: string) => {
    if (isSlotDataLoading || isSubmitting) return;

    // Enforce mutual-exclusive selection: if already have selections originating from occupied (hapus),
    // prevent selecting available slots, and vice versa.
    const hasOriginOccupied = Object.values(originIsOccupied).some((v) => v === true) || selectedSlots.some((s) => originIsOccupied[s]);
    const hasOriginAvailable = selectedSlots.length > 0 && !hasOriginOccupied;

    if (currentStatus === 'occupied' || currentStatus === 'manual') {
      if (hasOriginAvailable) return; // cannot mix
      setOriginIsOccupied((prev) => ({ ...prev, [slotId]: true }));
      if (!selectedSlots.includes(slotId)) setSelectedSlots((prev) => [...prev, slotId]);
      return;
    }

    if (currentStatus === 'selected') {
      setSelectedSlots((prev) => prev.filter((slot) => slot !== slotId));
      if (originIsOccupied[slotId]) {
        setOriginIsOccupied((prev) => ({ ...prev, [slotId]: false }));
      }
      return;
    }

    // JIKA SLOT HIJAU DIKLIK -> Berubah jadi Kuning (Antrean Isi)
    if (currentStatus === 'available') {
      if (hasOriginOccupied) return; // cannot mix
      setOriginIsOccupied((prev) => ({ ...prev, [slotId]: false })); // Asalnya murni dari hijau
      if (!selectedSlots.includes(slotId)) setSelectedSlots((prev) => [...prev, slotId]);
      return;
    }
  };

  // Tombol Bottom Ditekan -> Cek apakah ini antrean ISI atau antrean HAPUS
  const handleConfirmStage = () => {
    if (!selectedSlots.length || isSlotDataLoading || isSubmitting) return;

    const invalidSlots = selectedSlots.filter((slotCode) => !isSlotActionAllowed(slotCode));
    if (invalidSlots.length > 0) {
      Alert.alert(
        'Slot tidak dapat diproses',
        `Slot ${invalidSlots.join(', ')} tidak dapat diproses karena statusnya tidak mendukung perubahan.`
      );
      return;
    }

    const sampleSlot = selectedSlots[0];
    const isHapusMode = originIsOccupied[sampleSlot] === true;

    setPopupMode(isHapusMode ? 'hapus' : 'isi');
    setJustConfirmedSlots([...selectedSlots]);
    setPopupVisible(true);
  };

  // Tombol di dalam Pop-up Ditekan -> Eksekusi Final simpan ke database state
  const handleSubmitFinal = () => {
    (async () => {
      setIsSubmitting(true);
      try {
        const results = await Promise.all<ToggleMonitoringPetugasResponse>(
          justConfirmedSlots.map(async (kode) => {
            const detail = getSlotDetail(kode);
            if (!detail || !detail.id) {
              throw new Error(`IDTempatParkir not found for ${kode}`);
            }

            if (detail.mappedStatus !== 'available' && detail.mappedStatus !== 'occupied') {
              throw new Error(`Slot ${kode} memiliki status tidak valid: ${detail.rawStatus}`);
            }

            return await toggleMonitoringPetugas(detail.id);
          })
        );

        if (popupMode === 'isi') {
          const newly = results
            .map((r) => normalizeSlotCode(String(r.TempatParkir.KodeTempat || '')))
            .filter(Boolean) as string[];
          setConfirmedSlots((prev) => Array.from(new Set([...prev, ...newly])));
          setClearedManualSlots((prev) => prev.filter((slot) => !justConfirmedSlots.includes(slot)));
        } else {
          const newlyCleared = results
            .map((r) => normalizeSlotCode(String(r.TempatParkir.KodeTempat || '')))
            .filter(Boolean) as string[];
          setConfirmedSlots((prev) => prev.filter((slot) => !justConfirmedSlots.includes(slot)));
          setClearedManualSlots((prev) => Array.from(new Set([...prev, ...newlyCleared])));
        }

        setSelectedSlots([]);
        setOriginIsOccupied({});
        setPopupVisible(false);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.log('❌ Failed to persist monitoring actions:', err);
        Alert.alert('Gagal menyimpan perubahan', errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setJustConfirmedSlots([]); 
  };

  const renderFloorLayout = () => {
    const selectedSlot = selectedSlots.length > 0 ? selectedSlots[selectedSlots.length - 1] : null;

    switch (selectedFloor) {
      case 'Ground Floor':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <GroundFloor
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Ground Floor - Area A':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <GroundFloorA
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P1':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P1
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P1 - Area A':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P1A
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P2':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P2
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P2 - Area A':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P2A
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P3':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P3
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P3 - Area A':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P3A
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P4':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P4
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P4 - Area A':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P4A
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
        );
      case 'Lantai P5':
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <P5
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              slotStatuses={slotStatuses}
            />
          </ScrollView>
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

  // Menentukan teks dinamis tombol konfirmasi bawah layar
  const getBottomButtonText = () => {
    if (!selectedSlots.length) return 'Pilih slot';
    const isHapus = originIsOccupied[selectedSlots[0]] === true;
    return isHapus ? `Konfirmasi Hapus (${selectedSlots.length})` : `Konfirmasi (${selectedSlots.length})`;
  };

  return (
    <View style={styles.container}>
      {/* HEADER UTAMA */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/V-Park.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>V-Park Staff</Text>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity 
            style={styles.avatarWrapper} 
            activeOpacity={0.7} 
            onPress={() => router.push('/staff/StaffProfile')} 
          >
            <Image 
              source={require('../../assets/images/ProfileKucing.jpg')} 
              style={styles.avatarImage} 
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* INFO CARD */}
      <View style={styles.infoCard}>
        <View style={styles.leftSection}>
          <Image source={require('../../assets/images/1.jpg')} style={styles.cardImage} />
          <Text style={styles.availableText}>{selectedSlots.length} slot terpilih</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.locationTitle}>{selectedFloor}</Text>
          <Text style={styles.locationDesc}>
            Klik slot hijau untuk menempatkan mobil, atau klik mobil merah untuk mengosongkan area parkir kembali menjadi tersedia.
          </Text>
          <DropdownButton
            options={floorOptions}
            selectedValue={selectedFloor}
            onValueChange={(value) => {
              setSelectedFloor(value);
              setSelectedSlots([]);
              setOriginIsOccupied({});
            }}
          />
        </View>
      </View>

      {/* LEGEND CONTAINER */}
      <View style={styles.legendContainer}>
        <LegendItem color="#7BC67B" label="Tersedia" />
        <LegendItem color="#F5C542" label="Terpilih" />
        <LegendItem color="#FF5C46" label="Terisi" />
        <LegendItem color="#2E8BEF" label="Booking Online" />
      </View>

      {/* MAP CONTEN SECTION */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          selectedSlots.length ? { paddingBottom: 180 } : { paddingBottom: 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mapContainer, isSlotDataLoading && styles.loadingMapContainer]}>
          {isSlotDataLoading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>Memuat status slot parkir...</Text>
            </View>
          ) : slotDataError ? (
            <View style={styles.loadingState}>
              <Text style={styles.loadingText}>Terjadi kesalahan: {slotDataError}</Text>
            </View>
          ) : (
            renderFloorLayout()
          )}
        </View>
      </ScrollView>

      {/* BOTTOM CONFIRM CONTAINER */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.confirmButton, 
            (!selectedSlots.length || isSlotDataLoading || isSubmitting) && styles.disabledButton,
            selectedSlots.length > 0 && originIsOccupied[selectedSlots[0]] && { backgroundColor: '#D32F2F' } // Berubah jadi merah jika mendeteksi hapus bokingan
          ]}
          activeOpacity={0.8}
          onPress={handleConfirmStage}
          disabled={!selectedSlots.length || isSlotDataLoading || isSubmitting}
        >
          <Text style={styles.confirmText}>{getBottomButtonText()}</Text>
        </TouchableOpacity>
        <Text style={styles.confirmSubtitle}>
          Kamu bisa memilih beberapa slot sekaligus dengan kategori aksi yang sama sebelum melakukan konfirmasi final.
        </Text>
      </View>

      {/* POP-UP MODAL SHEET DENGAN MODE DINAMIS */}
      <ConfirmSlotsPopup
        visible={popupVisible}
        slots={justConfirmedSlots.map((slot) => ({ code: slot, floor: selectedFloor }))}
        onClose={handleClosePopup}
        onConfirmSubmit={handleSubmitFinal}
        mode={popupMode} // 🌟 OPER STATE MODE NYA DI SINI
      />

      {isSubmitting && (
        <View style={styles.submittingOverlay} pointerEvents="auto">
          <View style={styles.submittingCard}>
            <ActivityIndicator size="large" color="#1565C0" />
            <Text style={styles.submittingTitle}>Menyimpan perubahan...</Text>
            <Text style={styles.submittingSubtitle}>Tunggu sebentar sampai aksi berhasil diproses.</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F3F8FD', 
        paddingTop: 50 
    },
    header: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingHorizontal: 15, 
      paddingTop: 10, 
      paddingBottom: 15, 
      backgroundColor: '#F3F8FD', 
        
    },
    headerTitle: { 
        fontSize: 20, 
        fontWeight: '800', 
        color: '#1565C0', 
        textAlign: 'center', 
        flex: 1 
    },
    logo: { 
      width: 57,
      height: 66,
      resizeMode: 'contain' 
    },
    avatarWrapper: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    avatarImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 29, 
        borderWidth: 4, 
        borderColor: '#1565C0', 
        backgroundColor: '#fff' 
    },
    infoCard: { 
        backgroundColor: '#fff', 
        marginHorizontal: 20, 
        marginTop: 5, 
        borderRadius: 24, 
        borderWidth: 1.5, 
        borderColor: '#2E8BEF', 
        padding: 12, 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 5, 
        elevation: 3 
    },
    leftSection: { 
        width: 120, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 15 
    },
    cardImage: { 
        width: 115, 
        height: 100, 
        borderRadius: 15 
    },
    availableText: { 
        color: '#81C784', 
        fontWeight: '700', 
        fontSize: 12, 
        marginTop: 8 
    },
    rightSection: { 
        flex: 1, 
        marginLeft: 10, 
        justifyContent: 'space-between' 
    },
    locationTitle: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: '#1565C0' 
    },
    locationDesc: { 
        fontSize: 11, 
        marginTop: 5, 
        lineHeight: 16, 
        color: '#555', 
        flexWrap: 'wrap', 
        width: '100%' 
    },
    legendContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 15,
        marginHorizontal: 20, 
        marginBottom: 5 
    },
    mapContainer: { 
        backgroundColor: '#5C656E', 
        marginTop: 5, 
        borderRadius: 20, 
        paddingVertical: 15, 
        alignItems: 'center', 
        alignSelf: 'center', 
        width: 'auto', 
        minWidth: 300 
    },
    loadingMapContainer: {
      minHeight: 320,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingState: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 24,
    },
    loadingText: {
      marginTop: 14,
      color: '#FFFFFF',
      fontSize: 14,
      textAlign: 'center',
      maxWidth: '80%',
    },
    submittingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99,
    },
    submittingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 24,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    submittingTitle: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: '700',
      color: '#1565C0',
      textAlign: 'center',
    },
    submittingSubtitle: {
      marginTop: 8,
      fontSize: 13,
      color: '#444',
      textAlign: 'center',
      lineHeight: 18,
    },
    scrollContent: { 
        paddingHorizontal: 17, 
        gap: 12 
    },
    bottomSection: { 
        paddingHorizontal: 17, 
        paddingBottom: 30, 
        paddingTop: 8 
    },
    confirmButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#1565C0', 
        borderRadius: 24, 
        height: 52
    },
    disabledButton: { 
        backgroundColor: '#B0BEC5' 
    },
    confirmText: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: '#fff' 
    },
    confirmSubtitle: { 
        fontSize: 12, 
        color: '#555', 
        marginTop: 10, 
        textAlign: 'center' 
    },
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.3)' 
    },
    sheet: { 
        backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 34, position: 'absolute', bottom: 0, left: 0, right: 0, elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 8 },
    closeBtn: { 
        position: 'absolute', top: 20, right: 20, zIndex: 10 },
    iconCircleList: { 
        width: 70, height: 70, borderRadius: 35, backgroundColor: '#E3F2FD', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 15 },
    titleTerisi: { 
        fontSize: 18, fontWeight: '800', color: '#000', textAlign: 'center', marginBottom: 6 },
    subtitleTerisi: { 
        fontSize: 12, fontWeight: '500', color: '#1E88E5', textAlign: 'center', lineHeight: 20, paddingHorizontal: 20, marginBottom: 1 },
    slotRowGrid: { 
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, paddingVertical: 5 },
    slotCardTerisi: { 
        width: 76, height: 76, borderRadius: 10, borderWidth: 1.5, borderColor: '#90CAF9', backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center' },
    slotCodeTerisi: { 
        fontSize: 24, fontWeight: '800', color: '#000' },
    slotFloorTerisi: { 
        fontSize: 11, fontWeight: '500', color: '#333', marginTop: 2 },
    reminderBadgeRow: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E3F2FD', borderRadius: 20, height: 30, gap: 8, marginBottom: 12, borderWidth: 1, borderColor: '#BBDEFB' },
    reminderBadgeText: { 
        fontSize: 13, fontWeight: '700', color: '#1565C0' },
    slotTerisiBtn: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, height: 38, borderRadius: 26, backgroundColor: '#2E6BC6', shadowColor: '#1565C0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
    slotTerisiBtnText: { 
        fontSize: 14, fontWeight: '700', color: '#FFF' },
});