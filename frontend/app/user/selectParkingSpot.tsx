import DropdownButton from '@/components/booking/DropdownButton';
import LegendItem from '@/components/booking/LegendItem';

// 1. IMPORT KOMPONEN LANTAI BARU KAMU DI SINI
import GroundFloor from '@/components/booking/floors/GroundFloor';
import P2 from '@/components/booking/floors/P2';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SelectParkingSpot() {
  const handlePressBack = () => {
    router.back();
  };

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');

  const handleSelectSlot = (slotId: string, currentStatus: string) => {
    if (currentStatus === 'available') {
      if (selectedSlot === slotId) {
        setSelectedSlot(null); 
      } else { 
        setSelectedSlot(slotId); 
      } 
    } 
  }; 

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
    'Lantai 5'
  ];

  // 2. FUNGSI UNTUK MENENTUKAN KOMPONEN BERDASARKAN LANTAI YANG DIPILIH
  const renderFloorLayout = () => {
    switch (selectedFloor) {
      case 'Ground Floor':
        return (
          <GroundFloor 
            selectedSlot={selectedSlot} 
            onSelectSlot={handleSelectSlot} 
          />
        );
      case 'Lantai 2':
      case 'Lantai 2 - Area A':
        return (
          <P2
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        );
      // Nanti untuk lantai lain tinggal tambahkan case baru di sini:
      // case 'Lantai 1':
      //   return <Lantai1 selectedSlot={selectedSlot} onSelectSlot={handleSelectSlot} />;
      default:
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Layout untuk {selectedFloor} belum dibuat.</Text>
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
              setSelectedSlot(null); // Reset pilihan slot saat ganti lantai
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
          selectedSlot ? { paddingBottom: 180 } : { paddingBottom: 40 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          
          {/* 👇 PANGGIL LOGIKA RENDER DINAMISNYA DI SINI */}
          {renderFloorLayout()}
          
        </View>
      </ScrollView>

      {/* DYNAMIC CARD POP-UP */}
      {selectedSlot && (
        <View style={styles.popupContainer}>
          {/* Baris Atas: Judul & Status Tersedia */}
          <View style={styles.popupHeaderRow}>
            <Text style={styles.popupTitle}>Slot Terpilih</Text>
            <View style={styles.statusBadge}>
              {/* Bulatan Dot Hijau */}
              <View style={styles.statusDot} />
              {/* Tulisan Tersedia */}
              <Text style={styles.statusText}>Tersedia</Text>
            </View>
          </View>
          
          {/* Garis Abu Pembatas Tipis */}
          <View style={styles.popupDividerLine} />

          {/* Sub Deskripsi Lokasi */}
          <Text style={styles.popupSubDesc}>{selectedFloor} • Dekat Lift & Pintu Keluar</Text>
          
          {/* Tombol Lanjutkan */}
          <TouchableOpacity 
            style={styles.confirmButton} 
            activeOpacity={0.85} 
            onPress={() => router.push({
              pathname: '/user/detailLocation',
              params: { slot: selectedSlot, floor: selectedFloor }
            })}
          >
            <Text style={styles.confirmText}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Default footer jika belum memilih slot */}
      {!selectedSlot && (
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.confirmButton, { backgroundColor: '#B0BEC5' }]} 
            disabled={true}
          >
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
    gap: 6, // Jarak antara bulatan hijau dengan tulisan "Tersedia"
  },
  statusDot: {
    width: 20, // Ukuran dot hijau bulat pas sesuai gambar figma
    height: 20,
    borderRadius: 10,
    backgroundColor: '#7BC67B', // Hijau indikator tersedia
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7BC67B', // Tulisan "Tersedia" berwarna hijau tebal
  },
  popupDividerLine: {
    height: 1.5,
    backgroundColor: '#B0BEC5', // Garis abu-abu pembatas horizontal tengah
    width: '100%',
    marginVertical: 10,
  },
  popupSubDesc: {
    fontSize: 15,
    color: '#1565C0', // Warna biru soft untuk sub deskripsi lokasi
    fontWeight: '500',
    marginBottom: 20,
  },
});