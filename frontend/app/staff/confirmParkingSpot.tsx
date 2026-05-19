import DropdownButton from '@/components/booking/DropdownButton';
import LegendItem from '@/components/booking/LegendItem';
import GroundFloor from '@/components/booking/floors/GroundFloor';
import P2 from '@/components/booking/floors/P2';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
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
}

function ConfirmSlotsPopup({ visible, slots = [], onClose }: ConfirmSlotsPopupProps) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={8}>
          <CloseIcon />
        </TouchableOpacity>

        <View style={styles.iconCircle}>
          <CarIcon />
        </View>

        <Text style={styles.title}>Mobil ditempatkan</Text>
        <Text style={styles.subtitle}>Slot terpilih sekarang terisi dan mobil tampil di area yang dipilih</Text>

        <View style={styles.slotRow}>
          {slots.map((slot, i) => (
            <View key={i} style={styles.slotCard}>
              <Text style={styles.slotCode}>{slot.code}</Text>
              <Text style={styles.slotFloor}>{slot.floor}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.konfirmasiBtn} onPress={onClose} activeOpacity={0.8}>
          <CheckCircleIcon />
          <Text style={styles.konfirmasiBtnText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default function ConfirmParkingSpot() {
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<string[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const floorOptions = [
    'Ground Floor',
    'Ground Floor - Area A',
    'Lantai 1',
    'Lantai 1 - Area A',
    'Lantai 2',
    'Lantai 2 - Area A',
    'Lantai 3',
    'Lantai 3 - Area A',
    'Lantai 4',
    'Lantai 4 - Area A',
    'Lantai 5',
  ];

  const slotStatuses = useMemo(() => {
    const statuses: Record<string, 'available' | 'selected' | 'manual' | 'online' | 'occupied'> = {};
    selectedSlots.forEach((slot) => {
      statuses[slot] = 'selected';
    });
    confirmedSlots.forEach((slot) => {
      statuses[slot] = 'occupied';
    });
    return statuses;
  }, [selectedSlots, confirmedSlots]);

  const handleSelectSlot = (slotId: string, currentStatus: string) => {
    if (currentStatus === 'available' || currentStatus === 'selected') {
      setSelectedSlots((prev) =>
        prev.includes(slotId) ? prev.filter((slot) => slot !== slotId) : [...prev, slotId]
      );
    }
  };

  const handleConfirm = () => {
    if (!selectedSlots.length) {
      return;
    }

    setConfirmedSlots((prev) => Array.from(new Set([...prev, ...selectedSlots])));
    setSelectedSlots([]);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const renderFloorLayout = () => {
    switch (selectedFloor) {
      case 'Ground Floor':
        return <GroundFloor onSelectSlot={handleSelectSlot} slotStatuses={slotStatuses} />;
      case 'Lantai 2':
      case 'Lantai 2 - Area A':
        return <P2 onSelectSlot={handleSelectSlot} slotStatuses={slotStatuses} />;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#1565C0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Parking Spot</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.leftSection}>
          <Image source={require('../../assets/images/G.jpg')} style={styles.cardImage} />
          <Text style={styles.availableText}>{selectedSlots.length} slot terpilih</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.locationTitle}>{selectedFloor}</Text>
          <Text style={styles.locationDesc}>
            Klik beberapa slot hijau di area ini untuk memilih banyak sekaligus. Setelah dikonfirmasi, mobil akan muncul di area terpilih.
          </Text>
          <DropdownButton
            options={floorOptions}
            selectedValue={selectedFloor}
            onValueChange={(value) => {
              setSelectedFloor(value);
              setSelectedSlots([]);
            }}
          />
        </View>
      </View>

      <View style={styles.legendContainer}>
        <LegendItem color="#7BC67B" label="Tersedia" />
        <LegendItem color="#F5C542" label="Terpilih" />
        <LegendItem color="#4E4E4E" label="Terisi" />
        <LegendItem color="#2E8BEF" label="Booking Online" />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          selectedSlots.length ? { paddingBottom: 180 } : { paddingBottom: 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>{renderFloorLayout()}</View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedSlots.length && styles.disabledButton]}
          activeOpacity={0.8}
          onPress={handleConfirm}
          disabled={!selectedSlots.length}
        >
          <Text style={styles.confirmText}>
            {selectedSlots.length ? `Konfirmasi (${selectedSlots.length})` : 'Pilih slot hijau'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.confirmSubtitle}>
          {selectedSlots.length
            ? `Kamu dapat pilih beberapa slot sekaligus sebelum konfirmasi.`
            : 'Pilih minimal satu slot hijau untuk menempatkan mobil.'}
        </Text>
      </View>

      <ConfirmSlotsPopup
        visible={popupVisible}
        slots={confirmedSlots?.map((slot) => ({ code: slot, floor: selectedFloor })) ?? []}
        onClose={handleClosePopup}
      />
    </View>
  );
}

function CloseIcon() {
  const { Svg, Path } = require('react-native-svg');
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M18 18L6 6.00001" stroke="black" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function CarIcon() {
  const { Svg, Path } = require('react-native-svg');
  return (
    <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
      <Path d="M3.5415 17L6.37484 18.4167" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M30.4585 17.7085L27.6252 18.4168" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.3335 24.7917L11.6815 23.9216C12.1991 22.6277 12.4579 21.9807 12.9975 21.6154C13.5372 21.25 14.234 21.25 15.6276 21.25H18.3728C19.7664 21.25 20.4632 21.25 21.0028 21.6154C21.5424 21.9807 21.8012 22.6277 22.3188 23.9216L22.6668 24.7917" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.8335 24.0835V28.1663C2.8335 28.7029 3.17456 29.1934 3.7145 29.4334C4.06484 29.5891 4.39946 29.7502 4.80348 29.7502H7.23851C7.64253 29.7502 7.97716 29.5891 8.32749 29.4334C8.86743 29.1934 9.2085 28.7029 9.2085 28.1663V25.5002" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M24.7915 25.5002V28.1663C24.7915 28.7029 25.1326 29.1934 25.6725 29.4334C26.0228 29.5891 26.3575 29.7502 26.7615 29.7502H29.1965C29.6005 29.7502 29.9352 29.5891 30.2855 29.4334C30.8254 29.1934 31.1665 28.7029 31.1665 28.1663V24.0835" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28.3335 12.0418L29.7502 11.3335" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.6665 12.0418L4.24984 11.3335" stroke="#FF6249" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.375 12.75L7.91676 8.12471C8.54011 6.25465 8.85179 5.31963 9.59381 4.78481C10.3358 4.25 11.3214 4.25 13.2926 4.25H20.7074C22.6786 4.25 23.6642 4.25 24.4062 4.78481C25.1482 5.31963 25.4599 6.25465 26.0832 8.12471L27.625 12.75" stroke="#FF6249" strokeWidth={2} strokeLinejoin="round" />
      <Path d="M6.37516 12.75H27.6252C28.9812 14.1858 31.1668 16.1853 31.1668 18.4161V23.3328C31.1668 24.1409 30.6291 24.8212 29.9157 24.9156L25.5002 25.5H8.50016L4.08464 24.9156C3.37119 24.8212 2.8335 24.1409 2.8335 23.3328V18.4161C2.8335 16.1853 5.01911 14.1858 6.37516 12.75Z" stroke="#FF6249" strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldCheckIcon() {
  const { Svg, Path } = require('react-native-svg');
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path d="M8.75 5.83333L6.62291 7.96043C6.509 8.07433 6.32433 8.07433 6.21043 7.96043L5.25 7M4.42361 1.75H9.57639C9.76432 1.75 9.91667 1.90235 9.91667 2.09028C9.91667 3.02993 10.6784 3.79167 11.6181 3.79167H11.8611C12.0759 3.79167 12.25 3.96578 12.25 4.18056V4.68141C12.25 7.91265 10.4982 10.8899 7.67356 12.4591L7.45293 12.5817C7.17125 12.7382 6.82875 12.7382 6.54707 12.5817L6.32644 12.4591C3.50183 10.8899 1.75 7.91265 1.75 4.68141V4.18056C1.75 3.96578 1.92411 3.79167 2.13889 3.79167H2.38194C3.3216 3.79167 4.08333 3.02993 4.08333 2.09028C4.08333 1.90235 4.23568 1.75 4.42361 1.75Z" stroke="#1565C0" strokeLinecap="round" />
    </Svg>
  );
}

function CheckCircleIcon() {
  const { Svg, Path } = require('react-native-svg');
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none">
      <Path d="M15.3332 9.58341L10.3847 14.0821C10.2019 14.2482 9.92278 14.2482 9.74001 14.0821L7.6665 12.1971M21.0832 11.5001C21.0832 16.7928 16.7926 21.0834 11.4998 21.0834C6.20711 21.0834 1.9165 16.7928 1.9165 11.5001C1.9165 6.20735 6.20711 1.91675 11.4998 1.91675C16.7926 1.91675 21.0832 6.20735 21.0832 11.5001Z" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8FD',
    paddingTop: 50,
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
    elevation: 3,
  },
  leftSection: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  cardImage: {
    width: 115,
    height: 100,
    borderRadius: 15,
  },
  availableText: {
    color: '#81C784',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 8,
  },
  rightSection: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
  },
  locationDesc: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
    color: '#555',
    flexWrap: 'wrap',
    width: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  mapContainer: {
    backgroundColor: '#5C656E',
    marginTop: 5,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    width: 'auto',
    minWidth: 300,
  },
  scrollContent: {
    paddingHorizontal: 17,
    gap: 12,
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 30,
    paddingTop: 8,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1565C0',
    borderRadius: 24,
    height: 52,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  confirmSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.50)',
    paddingHorizontal: 17,
    paddingTop: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 17,
    zIndex: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 98, 73, 0.20)',
    borderWidth: 1,
    borderColor: 'rgba(255, 98, 73, 0.50)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#1E88E5',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 10,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 39,
  },
  slotCard: {
    width: 65,
    height: 65,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.50)',
    backgroundColor: 'rgba(30, 136, 229, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotCode: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
    lineHeight: 26,
  },
  slotFloor: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    color: '#000',
    lineHeight: 14,
  },
  konfirmasiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#1565C0',
  },
  konfirmasiBtnText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 14,
    color: '#FFF',
  },
});