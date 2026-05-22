import { COLORS } from '@/constants/theme';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import ButtonPrimary from '@/components/common/ButtonPrimary';
import InfoRow from '@/components/common/InfoRow';
import InputField from '@/components/common/InputField';

const PARKING_IMAGES = [
  require('../../assets/images/1.jpg'),
  require('../../assets/images/2.jpg'),
  require('../../assets/images/3.jpg'),
  require('../../assets/images/4.jpg'),
];

export default function DetailLocation() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState('Pinky Pie');
  const [phone, setPhone] = useState('+628213456789');
  const [vehicleType, setVehicleType] = useState('Mobil Creta');
  const [platNumber, setPlatNumber] = useState('DD 1234 TNF');

  const handlePressNext = () => {
    router.push('/user/konfirmasiKedatangan');
  };

  const handlePressBack = () => {
    router.back();
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

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
        <Image
          source={PARKING_IMAGES[selectedImage]}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <View style={styles.thumbnailRowContainer}>
          {PARKING_IMAGES.map((imgRequire, index) => (
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
          <Text style={styles.sectionTitle}>Area Parkir Basement</Text>

          <View style={styles.parkingInfoRow}>
            <View style={styles.slotBadge}>
              <Text style={styles.slotText}>L4</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Deskripsi</Text>
              <Text style={styles.descriptionText}>
                Kendaraan Anda telah berhasil diparkir di area Basement Lantai 2, pada slot B1. 
                Gunakan informasi ini sebagai panduan untuk menuju lokasi kendaraan Anda dengan lebih cepat dan efisien.
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
          style={styles.confirmButton} 
          activeOpacity={0.85} 
          onPress={handlePressNext}
        >
          <Text style={styles.confirmText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View> 
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
    width: 380,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(155,155,155,0.2)',
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
    width: 85,
    height: 65,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderWidth: 1,
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
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
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
  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});