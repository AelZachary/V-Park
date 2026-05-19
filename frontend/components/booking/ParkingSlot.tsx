import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

type ParkingSlotStatus = 'available' | 'selected' | 'manual' | 'online' | 'occupied';

type ParkingSlotProps = {
  slot: string;
  status: ParkingSlotStatus;
  side?: 'left' | 'right';
  onPress?: () => void;
  disabled?: boolean;
};

export default function ParkingSlot({
  status,
  side = 'left',
  onPress,
  disabled,
}: ParkingSlotProps) {

  const getBackgroundColor = () => {
    switch (status) {
      case 'available':
        return '#7BC67B'; // Hijau
      case 'selected':
        return '#F5C542'; // Kuning (Terpilih)
      case 'manual':
        return '#FF5C46';
      case 'online':
        return '#2E8BEF'; // Biru (Opsional)
      case 'occupied':
        return '#4E4E4E'; // Gelap saat terisi setelah konfirmasi
      default:
        return 'transparent';
    }
  };

  const getCarImage = () => {
    switch (status) {
      case 'selected':
        return require('../../assets/images/MobilKuning.jpeg');
      case 'manual':
      case 'occupied':
        return require('../../assets/images/MobilMerah.jpeg');
      case 'online':
        return require('../../assets/images/MobilBiru.jpeg');
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.slot,
        { backgroundColor: getBackgroundColor() },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled !== undefined ? disabled : status === 'online' || status === 'manual' || status === 'occupied'}
    >

      {status !== 'available' && (
        <Image
          source={getCarImage()}
          style={[
            styles.carIcon,
            side === 'right' && styles.flipCar,
          ]}
        />
      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: 52,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginVertical: 3,
    overflow: 'hidden', 
  },
  carIcon: {
    width: 52,
    height: 27,
    resizeMode: 'cover', 
  },
  flipCar: {
    transform: [{ scaleX: -1 }],
  },
});