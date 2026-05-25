import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LegendItemProps = {
  color?: string;       // Dibuat opsional dengan tanda ?
  label: string;
  isTextMode?: boolean; // Tambahan properti baru untuk mendeteksi mode tulisan
  textColor?: string;   // Tambahan properti warna teks kustom
};

export default function LegendItem({ 
  color, 
  label, 
  isTextMode = false, 
  textColor 
}: LegendItemProps) {
  return (
    <View style={styles.container}>
      {/* Jika BUKAN mode tulisan, tampilkan dot bulat seperti biasa */}
      {!isTextMode && (
        <View style={[styles.dot, { backgroundColor: color }]} />
      )}
      
      {/* Tampilkan teks label */}
      <Text style={[
        styles.label, 
        isTextMode && { color: textColor || '#7BC67B', fontWeight: '700' }
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Jarak antara dot/tulisan dengan item sebelah jika berjejer
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  label: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});