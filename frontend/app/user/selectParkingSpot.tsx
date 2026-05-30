import DropdownButton from '@/components/booking/DropdownButton';
import LegendItem from '@/components/booking/LegendItem';

// 1. IMPORT KOMPONEN LANTAI BARU KAMU DI SINI
import GroundFloor from '@/components/booking/floors/GroundFloor';
import P2 from '@/components/booking/floors/P2';
import P3 from '@/components/booking/floors/P3';
import P4 from '@/components/booking/floors/P4';
import P4A from '@/components/booking/floors/P4A';
import P5 from '@/components/booking/floors/P5';

import GroundFloorA from '@/components/booking/floors/GroundFloorA';
import P1 from '@/components/booking/floors/P1';
import P1A from '@/components/booking/floors/P1A';
import P2A from '@/components/booking/floors/P2A';
import P3A from '@/components/booking/floors/P3A';
import { getTempatParkir } from '@/fetching/services/tempatparkirService';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SelectParkingSpot() {
  const params = useLocalSearchParams<{
    initialFloor?: string;
    mallId?: string;
    idlokasimall?: string;
    id_lokasi_mall?: string;
    id_lokasi?: string;
  }>();
  const initialFloor = params?.initialFloor ?? 'Ground Floor';

  const [selectedFloor, setSelectedFloor] = useState<string>(initialFloor);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotStatuses, setSlotStatuses] = useState<Record<string, 'available' | 'occupied' | 'online' | 'manual' | 'selected'>>({});

  const mallId = Number(
    params?.mallId || params?.idlokasimall || params?.id_lokasi_mall || params?.id_lokasi || 0
  );

  // dropdown dan layout di dalam sini ikut ter-update secara otomatis.
  useEffect(() => {
    if (params.initialFloor) {
      setSelectedFloor(params.initialFloor as string);
      setSelectedSlot(null); // Reset slot terpilih jika lantai berubah dari luar
    }
  }, [params.initialFloor]);

  useEffect(() => {
    async function loadSlotStatuses() {
      if (!mallId) return;

      try {
        const payload = await getTempatParkir(mallId);
        const slots = Array.isArray((payload as any)?.tempat_parkir)
          ? (payload as any).tempat_parkir
          : [];

        const mappedStatuses: Record<string, 'available' | 'occupied' | 'online' | 'manual'> = {};

        slots.forEach((slot: any) => {
          const code = String(slot.KodeTempat || '').trim();
          if (!code) return;

          switch (String(slot.StatusTempatParkir).toLowerCase()) {
            case 'tersedia':
              mappedStatuses[code] = 'available';
              break;
            case 'terisi':
              mappedStatuses[code] = 'occupied';
              break;
            case 'dipesan':
            case 'bookingonline':
            case 'booking online':
              mappedStatuses[code] = 'online';
              break;
            case 'perawatan':
              mappedStatuses[code] = 'manual';
              break;
            default:
              mappedStatuses[code] = 'occupied';
              break;
          }
        });

        setSlotStatuses(mappedStatuses);
      } catch (error) {
        setSlotStatuses({});
      }
    }

    loadSlotStatuses();
  }, [mallId]);

  const handleSelectSlot = (slotId: string, currentStatus: string) => {
    if (currentStatus === 'available') {
      if (selectedSlot === slotId) {
        setSelectedSlot(null);
      } else {
        setSelectedSlot(slotId);
      }
    }
  };

  const handlePressBack = () => {
    router.back();
  };

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
    'Lantai P5',
  ];

  const renderFloorLayout = () => {
    switch (selectedFloor) {
      case 'Ground Floor':
        return (
          <GroundFloor 
            selectedSlot={selectedSlot} 
            onSelectSlot={handleSelectSlot} 
            slotStatuses={slotStatuses}
          />
        );

      case 'Ground Floor - Area A':
        return (
          <GroundFloorA 
            selectedSlot={selectedSlot} 
            onSelectSlot={handleSelectSlot} 
            slotStatuses={slotStatuses}
          />
        );

      case 'Lantai P1':
        return (
          <P1
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P1 - Area A':
        return (
          <P1A
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P2':
        return (
          <P2
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P2 - Area A':
        return (
          <P2A
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P3':
        return (
          <P3
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P3 - Area A':
        return (
          <P3A
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P4':
        return (
          <P4
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P4 - Area A':
        return (
          <P4A
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );

      case 'Lantai P5':
        return (
          <P5
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
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

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
          <Ionicons name="chevron-back" size={26} color="#1565C0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Parking Spot</Text>
      </View>

      {/* INFO CARD ATAS */}
      <View style={styles.infoCard}>
        <View style={styles.leftSection}>
          <Image source={require('../../assets/images/G.jpg')} style={styles.cardImage} />
          <Text style={styles.availableText}>Tersedia 120 Slot</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.locationTitle}>{selectedFloor}</Text>
          <Text style={styles.locationDesc}>
            Area parkir yang dipilih melalui menu dropdown di bawah ini. Pastikan memilih slot yang tersedia (berwarna hijau).
          </Text>
          <DropdownButton
            options={floorOptions}
            selectedValue={selectedFloor}
            onValueChange={(value) => {
              setSelectedFloor(value);
              setSelectedSlot(null);
            }}
          />
        </View>
      </View>

      {/* LEGEND */}
      <View style={styles.legendContainer}>
        <LegendItem color="#7BC67B" label="Tersedia" />
        <LegendItem color="#F5C542" label="Terpilih" />
        <LegendItem color="#FF5C46" label="Terisi" />
        <LegendItem color="#2E8BEF" label="Booking Online" />
      </View>

      {/* MAP VIEW SCROLL */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          selectedSlot ? { paddingBottom: 180 } : { paddingBottom: 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>{renderFloorLayout()}</View>
      </ScrollView>

      {/* DYNAMIC CARD POP-UP */}
      {selectedSlot && (
        <View style={styles.popupContainer}>
          <View style={styles.popupHeaderRow}>
            <Text style={styles.popupTitle}>Slot Terpilih</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{selectedSlot}</Text>
            </View>
          </View>

          <View style={styles.popupDividerLine} />

          <Text style={styles.popupSubDesc}>{selectedFloor} • Dekat Lift & Pintu Keluar</Text>

          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/user/detailLocation',
                params: { slot: selectedSlot, floor: selectedFloor },
              })
            }
          >
            <Text style={styles.confirmText}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      )}

      {!selectedSlot && (
        <View style={styles.bottomSection}>
          <TouchableOpacity style={[styles.confirmButton, { backgroundColor: '#B0BEC5' }]} disabled={true}>
            <Text style={styles.confirmText}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  confirmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: '#ECEFF1',
  },
  popupHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A237E',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#7BC67B',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7BC67B',
  },
  popupDividerLine: {
    height: 1.5,
    backgroundColor: '#B0BEC5',
    width: '100%',
    marginVertical: 10,
  },
  popupSubDesc: {
    fontSize: 15,
    color: '#1565C0',
    fontWeight: '500',
    marginBottom: 20,
  },
});
