import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import ButtonPrimary from '@/components/common/ButtonPrimary';
import ButtonSecondary from '@/components/common/ButtonSecondary';
import InfoRow from '@/components/common/InfoRow';
import InputField from '@/components/common/InputField';
import {
  BackIcon,
  CarIcon,
  CarOutlineIcon,
  PhoneIcon,
  UserIcon,
} from '@/components/icons/ParkingDetailIcons';

// Dummy image URLs - Replace these with actual images
const DUMMY_IMAGES = {
  main: 'https://via.placeholder.com/400x250?text=Parking+Location',
  thumbnail1: 'https://via.placeholder.com/100x80?text=Thumb1',
  thumbnail2: 'https://via.placeholder.com/100x80?text=Thumb2',
  thumbnail3: 'https://via.placeholder.com/100x80?text=Thumb3',
  thumbnail4: 'https://via.placeholder.com/100x80?text=Thumb4',
};

const PARKING_IMAGES = [
  DUMMY_IMAGES.main,
  DUMMY_IMAGES.thumbnail1,
  DUMMY_IMAGES.thumbnail2,
  DUMMY_IMAGES.thumbnail3,
  DUMMY_IMAGES.thumbnail4,
];

export default function DetailLocation() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');
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

  const getFieldValue = (field: string) => {
    switch (field) {
      case 'username':
        return username;
      case 'phone':
        return phone;
      case 'vehicleType':
        return vehicleType;
      case 'platNumber':
        return platNumber;
      default:
        return '';
    }
  };

  const setFieldValue = (field: string, value: string) => {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'vehicleType':
        setVehicleType(value);
        break;
      case 'platNumber':
        setPlatNumber(value);
        break;
    }
  };

  const handleEditInfo = (type: string) => {
    setEditingField(type);
    setDraftValue(getFieldValue(type));
  };

  const handleSaveEdit = () => {
    if (!editingField) return;
    setFieldValue(editingField, draftValue.trim());
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const getValueComponent = (field: string) =>
    editingField === field ? (
      <InputField
        label=""
        placeholder="Masukkan nilai"
        value={draftValue}
        onChangeText={setDraftValue}
      />
    ) : undefined;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Detail Lokasi</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Main Image */}
          <Image
            source={{ uri: PARKING_IMAGES[selectedImage] }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Thumbnail Gallery */}
          <View style={styles.thumbnailRow}>
            {PARKING_IMAGES.slice(1).map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index + 1)}
                style={[
                  styles.thumbnailWrapper,
                  selectedImage === index + 1 && styles.thumbnailSelected,
                ]}
              >
                <Image
                  source={{ uri }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Card */}
          <View style={styles.card}>
            {/* Area Parkir Section */}
            <Text style={styles.sectionTitle}>Area Parkir Basment</Text>

            <View style={styles.parkingInfoRow}>
              <View style={styles.slotBadge}>
                <Text style={styles.slotText}>C4</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Deskripsi</Text>
                <Text style={styles.descriptionText}>
                  Kendaraan Anda telah berhasil diparkir di area Basement Lantai
                  2, pada slot Bl. Gunakan informasi ini sebagai panduan untuk
                  menuju lokasi kendaraan Anda dengan lebih cepat dan efisien.
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.sectionDivider} />

            {/* Informasi Penggunaan */}
            <Text style={styles.sectionTitle}>Informasi Penggunaan</Text>

            <InfoRow
              icon={<UserIcon />}
              label="Username"
              value={username}
              valueComponent={getValueComponent('username')}
              showDivider={false}
              onEdit={() => handleEditInfo('username')}
            />
            <InfoRow
              icon={<PhoneIcon />}
              label="No. HP"
              value={phone}
              valueComponent={getValueComponent('phone')}
              onEdit={() => handleEditInfo('phone')}
            />
            <InfoRow
              icon={<CarIcon />}
              label="Jenis Kendaraan"
              value={vehicleType}
              valueComponent={getValueComponent('vehicleType')}
              onEdit={() => handleEditInfo('vehicleType')}
            />
            <InfoRow
              icon={<CarOutlineIcon />}
              label="Plat Kendaraan"
              value={platNumber}
              valueComponent={getValueComponent('platNumber')}
              onEdit={() => handleEditInfo('platNumber')}
            />
            {editingField && (
              <View style={styles.editActions}>
                <ButtonSecondary
                  title="Batal"
                  onPress={handleCancelEdit}
                  style={styles.editCancelButton}
                />
                <ButtonPrimary
                  title="Simpan"
                  onPress={handleSaveEdit}
                  style={styles.editSaveButton}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <ButtonPrimary
            title="Selanjutnya"
            onPress={handlePressNext}
            style={styles.buttonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_PADDING = 16;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
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
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 20,
    color: '#1565C0',
    lineHeight: 22,
  },
  headerSpacer: {
    width: 35,
  },

  // Main Image
  mainImage: {
    marginHorizontal: 16,
    height: 197,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(155,155,155,0.2)',
  },

  // Thumbnails
  thumbnailRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    gap: 8,
  },
  thumbnailWrapper: {
    flex: 1,
    height: 85,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#FFF',
  },
  thumbnailSelected: {
    borderWidth: 2,
    borderColor: '#1E88E5',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

  // Card
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.5)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    padding: CARD_PADDING,
  },

  // Section titles
  sectionTitle: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
    marginBottom: 10,
  },

  // Parking info row (slot badge + description)
  parkingInfoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  slotBadge: {
    width: 51,
    minHeight: 70,
    borderRadius: 5,
    backgroundColor: 'rgba(30,136,229,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
    lineHeight: 26,
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
    color: '#000',
    lineHeight: 17,
  },

  // Section divider
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(140,140,140,0.5)',
    marginBottom: 12,
  },

  buttonWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },

  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  editCancelButton: {
    flex: 1,
    marginRight: 8,
  },

  editSaveButton: {
    flex: 1,
  },

  // Button container
  buttonContainer: {
    marginTop: 0,
  },
});
